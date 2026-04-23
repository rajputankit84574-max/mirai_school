from django.contrib import admin
from django.utils.html import format_html
from .models import (
    SiteSettings, Program, Testimonial, Facility,
    BlogCategory, BlogPost, Enquiry, AdmissionStep,
    FeeStructure, Stat, GalleryImage, FAQ
)

# ── Branded admin site header ────────────────────────────────────────
admin.site.site_header = "🏫 Mirai Experiential School"


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Brand Identity', {
            'fields': ('site_name', 'tagline', 'hero_tagline', 'logo', 'favicon')
        }),
        ('Brand Colors', {
            'fields': ('primary_color', 'secondary_color', 'accent_color'),
            'description': 'Hex color codes e.g. #AA4A44',
        }),
        ('Contact Information', {
            'fields': ('phone', 'email', 'address', 'established_year')
        }),
        ('SEO', {
            'fields': ('meta_description',)
        }),
    ]

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False  # Singleton — cannot delete


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display  = ['program_type', 'age_range', 'icon_preview', 'order', 'is_active']
    list_editable = ['order', 'is_active']

    @admin.display(description='Icon')
    def icon_preview(self, obj):
        return format_html('<span style="font-size:1.4rem">{}</span>', obj.icon)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ['name', 'role', 'rating_stars', 'order', 'is_active']
    list_editable = ['order', 'is_active']

    @admin.display(description='Rating')
    def rating_stars(self, obj):
        return '★' * obj.rating + '☆' * (5 - obj.rating)


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display  = ['name', 'icon_preview', 'category', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter   = ['category', 'is_active']

    @admin.display(description='Icon')
    def icon_preview(self, obj):
        return format_html('<span style="font-size:1.4rem">{}</span>', obj.icon)


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display        = ['name', 'slug', 'color_swatch', 'post_count']
    prepopulated_fields = {'slug': ('name',)}

    @admin.display(description='Color')
    def color_swatch(self, obj):
        return format_html(
            '<span style="display:inline-block;width:20px;height:20px;'
            'border-radius:4px;background:{};border:1px solid #ddd"></span>',
            obj.color
        )

    @admin.display(description='Published Posts')
    def post_count(self, obj):
        count = obj.posts.filter(is_published=True).count()
        return format_html('<b style="color:#77966D">{}</b>', count)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display        = ['title_short', 'category', 'author',
                           'is_published', 'is_featured', 'published_date', 'views']
    list_filter         = ['is_published', 'is_featured', 'category']
    list_editable       = ['is_published', 'is_featured']
    prepopulated_fields = {'slug': ('title',)}
    search_fields       = ['title', 'excerpt', 'content']
    date_hierarchy      = 'published_date'
    readonly_fields     = ['views']

    @admin.display(description='Title')
    def title_short(self, obj):
        return obj.title[:55] + '…' if len(obj.title) > 55 else obj.title


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display    = ['student_full_name', 'father_name', 'applying_for_program',
                       'father_email', 'status_badge', 'submitted_at']
    list_filter     = ['status', 'applying_for_program', 'boarding_type']
    readonly_fields = ['submitted_at', 'updated_at', 'inquiry_no']
    search_fields   = ['student_full_name', 'father_name', 'mother_name',
                       'father_email', 'mother_email', 'father_mobile']
    ordering        = ['-submitted_at']
    date_hierarchy  = 'submitted_at'
    fieldsets = [
        ('§1 Student Information', {
            'fields': (
                'academic_session',
                ('student_full_name', 'student_preferred_name'),
                ('gender', 'date_of_birth'),
                ('nationality', 'aadhaar_passport_no'),
                ('applying_for_program', 'applying_for_grade'),
                ('current_school_name', 'current_curriculum', 'current_curriculum_other'),
            )
        }),
        ('§2a Father Details', {
            'fields': (
                'father_name', 'father_qualification', 'father_occupation',
                'father_organization', 'father_income_bracket',
                ('father_mobile', 'father_email'),
            )
        }),
        ('§2b Mother Details', {
            'classes': ('collapse',),
            'fields': (
                'mother_name', 'mother_qualification', 'mother_occupation',
                'mother_organization',
                ('mother_mobile', 'mother_email'),
            )
        }),
        ('§2c Residential Address', {
            'fields': (
                'address_street',
                ('address_city', 'address_state', 'address_pin'),
            )
        }),
        ('§3 Sibling Information', {
            'classes': ('collapse',),
            'fields': (
                ('sibling1_name', 'sibling1_grade', 'sibling1_school'),
                ('sibling2_name', 'sibling2_grade', 'sibling2_school'),
            )
        }),
        ('§4 Boarding Requirement', {
            'fields': ('boarding_type', 'boarding_special_considerations')
        }),
        ('§5 Student Profile & Interests', {
            'fields': (
                'student_strengths_interests', 'awards_recognitions',
                ('learning_support_required', 'learning_support_details'),
                'medical_conditions_allergies',
            )
        }),
        ('§6 Why Mirai?', {
            'fields': ('why_mirai_reasons', 'why_mirai_other', 'school_expectations')
        }),
        ('§7 Transport', {
            'fields': ('transport_required', 'transport_pickup_location')
        }),
        ('§8 IB Awareness & Source', {
            'fields': ('ib_awareness', 'heard_via', 'heard_via_other')
        }),
        ('§9 Declaration', {
            'fields': ('declaration_accepted', 'declaration_date')
        }),
        ('For Office Use Only', {
            'classes': ('collapse',),
            'fields': (
                'inquiry_no', 'counsellor_assigned',
                ('interaction_date', 'follow_up_date'),
                'status',
            )
        }),
        ('Metadata', {
            'classes': ('collapse',),
            'fields': ('submitted_at', 'updated_at')
        }),
    ]

    @admin.display(description='Status')
    def status_badge(self, obj):
        colours = {
            'pending':               '#AA4A44',
            'interaction_done':      '#77966D',
            'assessment_scheduled':  '#5C7854',
            'offered':               '#AFBFAA',
            'closed':                '#A8A29E',
        }
        c = colours.get(obj.status, '#A8A29E')
        return format_html(
            '<span style="background:{};color:white;padding:2px 10px;'
            'border-radius:99px;font-size:0.75rem;font-weight:700">{}</span>',
            c, obj.get_status_display()
        )


@admin.register(AdmissionStep)
class AdmissionStepAdmin(admin.ModelAdmin):
    list_display  = ['step_number', 'title', 'icon_preview', 'is_active']
    list_editable = ['is_active']
    ordering      = ['step_number']

    @admin.display(description='Icon')
    def icon_preview(self, obj):
        return format_html('<span style="font-size:1.4rem">{}</span>', obj.icon)


@admin.register(FeeStructure)
class FeeStructureAdmin(admin.ModelAdmin):
    list_display  = ['program', 'grade_range', 'annual_fee_fmt', 'boarding_fee_fmt', 'order']
    list_editable = ['order']

    @admin.display(description='Annual Fee')
    def annual_fee_fmt(self, obj):
        return format_html('₹{:,.0f}', obj.annual_fee)

    @admin.display(description='Boarding Fee')
    def boarding_fee_fmt(self, obj):
        return format_html('₹{:,.0f}', obj.boarding_fee) if obj.boarding_fee else '—'


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display  = ['label', 'value', 'suffix', 'icon', 'order']
    list_editable = ['value', 'suffix', 'order']


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display  = ['title', 'thumbnail', 'category', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter   = ['category', 'is_active']

    @admin.display(description='Preview')
    def thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:40px;width:60px;object-fit:cover;border-radius:6px;"/>',
                obj.image.url
            )
        return '—'

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display  = ['question_short', 'category', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter   = ['category', 'is_active']
    search_fields = ['question', 'answer']

    @admin.display(description='Question')
    def question_short(self, obj):
        return obj.question[:70] + '…' if len(obj.question) > 70 else obj.question

