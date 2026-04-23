from rest_framework import serializers
from .models import (
    SiteSettings, Program, Testimonial, Facility,
    BlogCategory, BlogPost, Enquiry, AdmissionStep,
    FeeStructure, Stat, GalleryImage, FAQ, ProspectusDownload
)


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo_url    = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()

    class Meta:
        model  = SiteSettings
        fields = [
            'site_name', 'tagline', 'hero_tagline',
            'primary_color', 'secondary_color', 'accent_color',
            'phone', 'email', 'address', 'established_year',
            'logo_url', 'favicon_url', 'meta_description',
        ]

    def get_logo_url(self, obj):
        request = self.context.get('request')
        if obj.logo and request:
            return request.build_absolute_uri(obj.logo.url)
        return None

    def get_favicon_url(self, obj):
        request = self.context.get('request')
        if obj.favicon and request:
            return request.build_absolute_uri(obj.favicon.url)
        return None


class ProgramSerializer(serializers.ModelSerializer):
    program_type_display = serializers.CharField(
        source='get_program_type_display', read_only=True
    )
    highlights_list = serializers.SerializerMethodField()

    class Meta:
        model  = Program
        fields = [
            'id', 'program_type', 'program_type_display',
            'age_range', 'description', 'highlights_list',
            'icon', 'color_accent', 'order'
        ]

    def get_highlights_list(self, obj):
        return obj.highlights_list


class TestimonialSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model  = Testimonial
        fields = ['id', 'name', 'role', 'content', 'initials', 'rating', 'photo_url']

    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)
        return None


class FacilitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model  = Facility
        fields = ['id', 'name', 'description', 'icon', 'image_url', 'category', 'order']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model  = BlogCategory
        fields = ['id', 'name', 'slug', 'color']


class BlogPostListSerializer(serializers.ModelSerializer):
    category  = BlogCategorySerializer(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model  = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'author',
            'excerpt', 'image_url', 'is_featured', 'published_date', 'views'
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.featured_image and request:
            return request.build_absolute_uri(obj.featured_image.url)
        return None


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category  = BlogCategorySerializer(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model  = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'author', 'excerpt',
            'content', 'image_url', 'is_featured', 'published_date', 'views',
            'meta_title', 'meta_description'
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.featured_image and request:
            return request.build_absolute_uri(obj.featured_image.url)
        return None


# ── ENQUIRY — Full form matching uploaded document ───────────────────

class EnquirySerializer(serializers.ModelSerializer):
    """
    Matches the 9-section Mirai Experiential School Inquiry Form exactly:
      §1 Student Information
      §2 Parent/Guardian Details (Father + Mother + Address)
      §3 Sibling Information
      §4 Boarding Requirement
      §5 Student Profile & Interests
      §6 Why Mirai?
      §7 Transport Requirement
      §8 IB Awareness + How Did You Hear About Us
      §9 Declaration
    """
    # Read-only helpers that parse comma-separated multi-select fields
    why_mirai_reasons_list = serializers.SerializerMethodField(read_only=True)
    heard_via_list         = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model  = Enquiry
        fields = [
            'id',
            # §1 Student Information
            'academic_session',
            'student_full_name', 'student_preferred_name',
            'gender', 'date_of_birth',
            'nationality', 'aadhaar_passport_no',
            'applying_for_program', 'applying_for_grade',
            'current_school_name', 'current_curriculum', 'current_curriculum_other',
            # §2a Father
            'father_name', 'father_qualification', 'father_occupation',
            'father_organization', 'father_income_bracket',
            'father_mobile', 'father_email',
            # §2b Mother
            'mother_name', 'mother_qualification', 'mother_occupation',
            'mother_organization', 'mother_mobile', 'mother_email',
            # §2c Residential Address
            'address_street', 'address_city', 'address_state', 'address_pin',
            # §3 Siblings
            'sibling1_name', 'sibling1_grade', 'sibling1_school',
            'sibling2_name', 'sibling2_grade', 'sibling2_school',
            # §4 Boarding
            'boarding_type', 'boarding_special_considerations',
            # §5 Student Profile
            'student_strengths_interests', 'awards_recognitions',
            'learning_support_required', 'learning_support_details',
            'medical_conditions_allergies',
            # §6 Why Mirai
            'why_mirai_reasons', 'why_mirai_reasons_list',
            'why_mirai_other', 'school_expectations',
            # §7 Transport
            'transport_required', 'transport_pickup_location',
            # §8 IB + Source
            'ib_awareness',
            'heard_via', 'heard_via_list', 'heard_via_other',
            # §9 Declaration
            'declaration_accepted', 'declaration_date',
            # Metadata
            'submitted_at', 'status', 'priority',
        ]
        read_only_fields = [
            'id', 'submitted_at', 'status', 'priority',
            'why_mirai_reasons_list', 'heard_via_list',
        ]

    def get_why_mirai_reasons_list(self, obj):
        return obj.why_mirai_list()

    def get_heard_via_list(self, obj):
        return obj.heard_via_list()

    # ── Field-level validators ────────────────────────────────────────

    def validate_father_mobile(self, value):
        digits = ''.join(filter(str.isdigit, value))
        if len(digits) < 10:
            raise serializers.ValidationError(
                "Enter a valid 10-digit mobile number."
            )
        return value

    def validate_mother_mobile(self, value):
        if value:
            digits = ''.join(filter(str.isdigit, value))
            if len(digits) < 10:
                raise serializers.ValidationError(
                    "Enter a valid 10-digit mobile number."
                )
        return value

    def validate_address_pin(self, value):
        digits = ''.join(filter(str.isdigit, value))
        if len(digits) != 6:
            raise serializers.ValidationError("PIN code must be exactly 6 digits.")
        return value

    def validate_declaration_accepted(self, value):
        if not value:
            raise serializers.ValidationError(
                "You must accept the declaration to submit the inquiry."
            )
        return value

    # ── Cross-field validators ────────────────────────────────────────

    def validate(self, data):
        # Transport pickup required if transport is requested
        if data.get('transport_required') and not data.get('transport_pickup_location', '').strip():
            raise serializers.ValidationError({
                'transport_pickup_location':
                    'Please provide pickup location when transport is required.'
            })
        # Learning support details required if support is requested
        if data.get('learning_support_required') and not data.get('learning_support_details', '').strip():
            raise serializers.ValidationError({
                'learning_support_details':
                    'Please specify the learning support requirements.'
            })
        return data


class AdmissionStepSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AdmissionStep
        fields = ['id', 'step_number', 'title', 'description', 'icon']


class FeeStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model  = FeeStructure
        fields = [
            'id', 'program', 'grade_range',
            'annual_fee', 'boarding_fee', 'description', 'order'
        ]


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Stat
        fields = ['id', 'label', 'value', 'suffix', 'icon', 'order']


class GalleryImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model  = GalleryImage
        fields = ['id', 'title', 'image_url', 'category', 'alt_text', 'order']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

class FAQSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model  = FAQ
        fields = ['id', 'question', 'answer', 'category', 'category_display', 'order']


class ProspectusDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ProspectusDownload
        fields = ['id', 'full_name', 'email', 'mobile', 'current_city', 'requested_at']
        read_only_fields = ['id', 'requested_at']

