from django.db import models
from django.utils.text import slugify
from django.utils import timezone
from django.core.files.base import ContentFile
import io
from PIL import Image


# ── HELPERS / MIXINS ──────────────────────────────────────────────
class CompressedImageMixin:
    """
    Audit fix §3.3: Image compression layer.
    Automatically converts images to WebP format and resizes to 
    maximum 1600px width for optimal Web Vitals (LCP reduction).
    """
    def compress_image(self, image_field):
        if not image_field:
            return
            
        img = Image.open(image_field)
        
        # 1. Convert to RGB (required for WebP/JPEG)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        # 2. Resize if too large
        MAX_WIDTH = 1600
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / float(img.width)
            new_height = int(float(img.height) * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
            
        # 3. Save as WebP
        output = io.BytesIO()
        img.save(output, format='WebP', quality=85, method=6)
        output.seek(0)
        
        # 4. Update file name and return content
        name = image_field.name.split('.')[0] + '.webp'
        return ContentFile(output.read(), name=name)

# ── Unchanged models kept exactly as-is ─────────────────────────────

class SiteSettings(models.Model, CompressedImageMixin):
    site_name        = models.CharField(max_length=100, default='Mirai Experiential School')
    tagline          = models.CharField(max_length=200, default='Where Learning Comes Alive')
    primary_color    = models.CharField(max_length=7, default='#AA4A44')
    secondary_color  = models.CharField(max_length=7, default='#77966D')
    accent_color     = models.CharField(max_length=7, default='#AFBFAA')
    phone            = models.CharField(max_length=30, default='+91 95999 31471')
    email            = models.EmailField(default='siddhant@nimt.ac.in')
    address          = models.TextField(default='NH-48, Gurugram, Haryana 122001')
    established_year = models.PositiveSmallIntegerField(default=2018)
    logo             = models.ImageField(upload_to='branding/', blank=True, null=True)
    favicon          = models.ImageField(upload_to='branding/', blank=True, null=True)
    hero_tagline     = models.CharField(max_length=300, default='Where Learning Comes Alive')
    meta_description = models.TextField(max_length=300, blank=True,
                        default='Mirai Experiential School — IB curriculum, experiential learning, and residential boarding.')

    # Social Media API Settings
    fb_page_id        = models.CharField(max_length=100, blank=True, help_text="Facebook Page ID")
    fb_access_token   = models.TextField(blank=True, help_text="Facebook Page Access Token")
    ig_user_id        = models.CharField(max_length=100, blank=True, help_text="Instagram Business Account ID")
    auto_post_social  = models.BooleanField(default=False, help_text="Enable auto-posting to FB/IG")

    class Meta:
        verbose_name        = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return self.site_name

    def save(self, *args, **kwargs):
        self.pk = 1
        # Audit fix §3.3: Image optimization for branding
        if self.logo and hasattr(self.logo, 'file'):
            self.logo = self.compress_image(self.logo)
        if self.favicon and hasattr(self.favicon, 'file'):
            self.favicon = self.compress_image(self.favicon)
        super().save(*args, **kwargs)

    @classmethod
    def get(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Program(models.Model):
    TYPES = [
        ('EYP', 'Early Years Programme'),
        ('PYP', 'Primary Years Programme'),
        ('MYP', 'Middle Years Programme'),
        ('DP',  'Diploma Programme'),
    ]
    program_type = models.CharField(max_length=10, choices=TYPES, unique=True)
    age_range    = models.CharField(max_length=50)
    description  = models.TextField()
    highlights   = models.TextField(help_text='One highlight per line')
    icon         = models.CharField(max_length=10, default='📚')
    color_accent = models.CharField(max_length=7, default='#AA4A44')
    order        = models.PositiveSmallIntegerField(default=0)
    is_active    = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.get_program_type_display()

    @property
    def highlights_list(self):
        return [h.strip() for h in self.highlights.splitlines() if h.strip()]


class Testimonial(models.Model, CompressedImageMixin):
    name      = models.CharField(max_length=100)
    role      = models.CharField(max_length=120)
    content   = models.TextField()
    initials  = models.CharField(max_length=3, blank=True)
    photo     = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    rating    = models.PositiveSmallIntegerField(default=5)
    order     = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} ({self.role})"

    def save(self, *args, **kwargs):
        if not self.initials:
            parts = self.name.split()
            self.initials = ''.join(p[0].upper() for p in parts[:2])
        # Audit fix §3.3: Image optimization for testimonials
        if self.photo and hasattr(self.photo, 'file'):
            self.photo = self.compress_image(self.photo)
        super().save(*args, **kwargs)


class Facility(models.Model, CompressedImageMixin):
    name        = models.CharField(max_length=200)
    description = models.TextField()
    icon        = models.CharField(max_length=10, default='🏢')
    image       = models.ImageField(upload_to='facilities/', blank=True, null=True)
    category    = models.CharField(max_length=100, blank=True)
    order       = models.PositiveSmallIntegerField(default=0)
    is_active   = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Facilities'

    def save(self, *args, **kwargs):
        # Audit fix §3.3: Image optimization for facilities
        if self.image and hasattr(self.image, 'file'):
            self.image = self.compress_image(self.image)
        super().save(*args, **kwargs)


class BlogCategory(models.Model):
    name  = models.CharField(max_length=100)
    slug  = models.SlugField(unique=True, db_index=True)
    color = models.CharField(max_length=7, default='#AA4A44')

    class Meta:
        verbose_name_plural = 'Blog Categories'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class BlogPost(models.Model, CompressedImageMixin):
    title            = models.CharField(max_length=300)
    slug             = models.SlugField(unique=True, max_length=300, db_index=True)
    category         = models.ForeignKey(
        BlogCategory, null=True, blank=True,
        on_delete=models.SET_NULL, related_name='posts'
    )
    author           = models.CharField(max_length=100, default='Mirai School Team')
    excerpt          = models.TextField(max_length=500)
    content          = models.TextField()
    featured_image   = models.ImageField(upload_to='blog/', blank=True, null=True)
    is_featured      = models.BooleanField(default=False)
    is_published     = models.BooleanField(default=False)
    published_date   = models.DateTimeField(default=timezone.now)
    views            = models.PositiveIntegerField(default=0)
    meta_title       = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(max_length=300, blank=True)

    class Meta:
        ordering = ['-published_date']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.meta_title:
            self.meta_title = self.title
        # Audit fix §3.3: Image optimization for blog content
        if self.featured_image and hasattr(self.featured_image, 'file'):
            self.featured_image = self.compress_image(self.featured_image)
        super().save(*args, **kwargs)


class AdmissionStep(models.Model):
    step_number = models.PositiveSmallIntegerField()
    title       = models.CharField(max_length=200)
    description = models.TextField()
    icon        = models.CharField(max_length=10, default='📋')
    is_active   = models.BooleanField(default=True)

    class Meta:
        ordering = ['step_number']

    def __str__(self):
        return f"Step {self.step_number}: {self.title}"


class FeeStructure(models.Model):
    program      = models.CharField(max_length=100)
    grade_range  = models.CharField(max_length=80)
    annual_fee   = models.DecimalField(max_digits=10, decimal_places=2)
    boarding_fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description  = models.TextField(blank=True)
    order        = models.PositiveSmallIntegerField(default=0)
    is_active    = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.program} — {self.grade_range}"


class Stat(models.Model):
    label  = models.CharField(max_length=100)
    value  = models.CharField(max_length=20)
    suffix = models.CharField(max_length=10, blank=True)
    icon   = models.CharField(max_length=10, blank=True)
    order  = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.value}{self.suffix} {self.label}"


class GalleryImage(models.Model, CompressedImageMixin):
    title     = models.CharField(max_length=200)
    image     = models.ImageField(upload_to='gallery/')
    category  = models.CharField(max_length=100, blank=True, db_index=True)
    alt_text  = models.CharField(max_length=200, blank=True)
    order     = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        # Audit fix §3.3: Image optimization for gallery
        if self.image and hasattr(self.image, 'file'):
            self.image = self.compress_image(self.image)
        super().save(*args, **kwargs)


# ── ENQUIRY — rebuilt to match uploaded form document exactly ────────

class Enquiry(models.Model):

    # ── Choices ──────────────────────────────────────────────────────

    GENDER_CHOICES = [
        ('male',   'Male'),
        ('female', 'Female'),
        ('other',  'Other'),
    ]

    PROGRAM_CHOICES = [
        ('EYP', 'Early Years Programme (EYP)'),
        ('PYP', 'Primary Years Programme (PYP)'),
        ('MYP', 'Middle Years Programme (MYP)'),
        ('DP',  'Diploma Programme (DP)'),
    ]

    CURRICULUM_CHOICES = [
        ('IB',          'IB'),
        ('CBSE',        'CBSE'),
        ('ICSE',        'ICSE'),
        ('IGCSE',       'IGCSE'),
        ('state_board', 'State Board'),
        ('other',       'Other'),
    ]

    INCOME_CHOICES = [
        ('below_5L', 'Below 5L'),
        ('5_10L',    '5–10L'),
        ('10_20L',   '10–20L'),
        ('above_20L','20L+'),
    ]

    BOARDING_CHOICES = [
        ('day',     'Day Scholar'),
        ('weekly',  'Weekly Boarding'),
        ('full',    'Full Boarding'),
    ]

    WHY_MIRAI_CHOICES = [
        ('ib_curriculum',       'IB Curriculum'),
        ('experiential_learning','Experiential Learning Model'),
        ('global_exposure',     'Global Exposure'),
        ('boarding_facilities', 'Boarding Facilities'),
        ('infrastructure',      'Infrastructure & Campus'),
        ('recommendation',      'Recommendation'),
        ('social_media',        'Social Media'),
        ('other',               'Other'),
    ]

    HEARD_CHOICES = [
        ('website',      'Website'),
        ('instagram',    'Instagram'),
        ('facebook',     'Facebook'),
        ('youtube',      'YouTube'),
        ('education_fair','Education Fair'),
        ('corporate_rwa','Corporate / RWA Outreach'),
        ('word_of_mouth','Word of Mouth'),
        ('advertisement','Advertisement'),
        ('other',        'Other'),
    ]

    STATUS_CHOICES = [
        ('pending',   'New Lead'),
        ('contacted', 'Contacted'),
        ('qualified', 'Qualified'),
        ('visited',   'School Visited'),
        ('admitted',  'Admitted'),
        ('dormant',   'No Response'),
        ('junk',      'Invalid/Spam'),
    ]

    PRIORITY_CHOICES = [
        ('low',    'Low'),
        ('medium', 'Medium'),
        ('high',   'High / Urgent'),
    ]

    # ── Section 1: Student Information ───────────────────────────────
    student_full_name      = models.CharField(max_length=200, verbose_name="Student's Full Name")
    student_preferred_name = models.CharField(max_length=100, blank=True, verbose_name="Preferred Name")
    gender                 = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male', verbose_name="Gender")
    date_of_birth          = models.DateField(null=True, blank=True, verbose_name="Date of Birth")
    nationality            = models.CharField(max_length=100, verbose_name="Nationality")
    aadhaar_passport_no    = models.CharField(max_length=50, blank=True, verbose_name="Aadhaar / Passport No.")
    applying_for_program   = models.CharField(max_length=10, choices=PROGRAM_CHOICES, default='EYP', verbose_name="Applying for Programme")
    applying_for_grade     = models.CharField(max_length=10, blank=True, verbose_name="Grade (within programme)")
    current_school_name    = models.CharField(max_length=200, blank=True, verbose_name="Current School Name")
    current_curriculum     = models.CharField(max_length=20, choices=CURRICULUM_CHOICES, blank=True, verbose_name="Current Curriculum")
    current_curriculum_other = models.CharField(max_length=100, blank=True, verbose_name="Current Curriculum (Other)")
    academic_session       = models.CharField(max_length=20, blank=True, verbose_name="Academic Session")

    # ── Section 2a: Father's Details ─────────────────────────────────
    father_name            = models.CharField(max_length=150, verbose_name="Father's Full Name")
    father_qualification   = models.CharField(max_length=150, blank=True, verbose_name="Father's Qualification")
    father_occupation      = models.CharField(max_length=150, blank=True, verbose_name="Father's Occupation / Designation")
    father_organization    = models.CharField(max_length=200, blank=True, verbose_name="Father's Organization / Business")
    father_income_bracket  = models.CharField(max_length=20, choices=INCOME_CHOICES, blank=True, verbose_name="Father's Annual Income Bracket")
    father_mobile          = models.CharField(max_length=20, verbose_name="Father's Mobile No.")
    father_email           = models.EmailField(verbose_name="Father's Email ID")

    # ── Section 2b: Mother's Details ─────────────────────────────────
    mother_name            = models.CharField(max_length=150, blank=True, verbose_name="Mother's Full Name")
    mother_qualification   = models.CharField(max_length=150, blank=True, verbose_name="Mother's Qualification")
    mother_occupation      = models.CharField(max_length=150, blank=True, verbose_name="Mother's Occupation / Designation")
    mother_organization    = models.CharField(max_length=200, blank=True, verbose_name="Mother's Organization / Business")
    mother_mobile          = models.CharField(max_length=20, blank=True, verbose_name="Mother's Mobile No.")
    mother_email           = models.EmailField(blank=True, verbose_name="Mother's Email ID")

    # ── Section 2c: Residential Address ──────────────────────────────
    address_street         = models.TextField(verbose_name="House No. / Street")
    address_city           = models.CharField(max_length=100, verbose_name="City")
    address_state          = models.CharField(max_length=100, verbose_name="State")
    address_pin            = models.CharField(max_length=10, verbose_name="PIN Code")

    # ── Section 3: Sibling Information ───────────────────────────────
    sibling1_name          = models.CharField(max_length=100, blank=True, verbose_name="Sibling 1 Name")
    sibling1_grade         = models.CharField(max_length=20,  blank=True, verbose_name="Sibling 1 Grade")
    sibling1_school        = models.CharField(max_length=200, blank=True, verbose_name="Sibling 1 School")
    sibling2_name          = models.CharField(max_length=100, blank=True, verbose_name="Sibling 2 Name")
    sibling2_grade         = models.CharField(max_length=20,  blank=True, verbose_name="Sibling 2 Grade")
    sibling2_school        = models.CharField(max_length=200, blank=True, verbose_name="Sibling 2 School")

    # ── Section 4: Boarding Requirement ──────────────────────────────
    boarding_type              = models.CharField(max_length=10, choices=BOARDING_CHOICES, default='day', verbose_name="Boarding Requirement")
    boarding_special_considerations = models.TextField(blank=True, verbose_name="Boarding Special Considerations")

    # ── Section 5: Student Profile & Interests ───────────────────────
    student_strengths_interests = models.TextField(blank=True, verbose_name="Strengths / Interests")
    awards_recognitions         = models.TextField(blank=True, verbose_name="Awards / Recognitions")
    learning_support_required   = models.BooleanField(default=False, verbose_name="Learning Support Required")
    learning_support_details    = models.TextField(blank=True, verbose_name="Learning Support Details")
    medical_conditions_allergies = models.TextField(blank=True, verbose_name="Medical Conditions / Allergies")

    # ── Section 6: Why Mirai ─────────────────────────────────────────
    # Stored as comma-separated keys from WHY_MIRAI_CHOICES
    why_mirai_reasons      = models.CharField(max_length=500, blank=True, verbose_name="Why Mirai — Reasons")
    why_mirai_other        = models.CharField(max_length=200, blank=True, verbose_name="Why Mirai — Other")
    school_expectations    = models.TextField(blank=True, verbose_name="Expectations from School")

    # ── Section 7: Transport ─────────────────────────────────────────
    transport_required     = models.BooleanField(default=False, verbose_name="Transport Required")
    transport_pickup_location = models.CharField(max_length=200, blank=True, verbose_name="Pickup Location")

    # ── Section 8a: IB Awareness ─────────────────────────────────────
    ib_awareness           = models.TextField(blank=True, verbose_name="How Much Do You Know About IB?")

    # ── Section 8b: How Did You Hear About Us ────────────────────────
    # Stored as comma-separated keys
    heard_via              = models.CharField(max_length=300, blank=True, verbose_name="How Did You Hear About Us?")
    heard_via_other        = models.CharField(max_length=100, blank=True, verbose_name="How Did You Hear (Other)")

    # ── Section 9: Declaration ────────────────────────────────────────
    declaration_accepted   = models.BooleanField(default=False, verbose_name="Declaration Accepted")
    declaration_date       = models.DateField(null=True, blank=True, verbose_name="Declaration Date")

    # ── Office Use Only ───────────────────────────────────────────────
    inquiry_no             = models.CharField(max_length=30, blank=True, verbose_name="Inquiry No.")
    counsellor_assigned    = models.CharField(max_length=100, blank=True, verbose_name="Counsellor Assigned")
    interaction_date       = models.DateField(null=True, blank=True, verbose_name="Interaction Date")
    follow_up_date         = models.DateField(null=True, blank=True, verbose_name="Follow-up Date")
    status                 = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending', verbose_name="Status")
    priority               = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium', verbose_name="Lead Priority")

    # ── Metadata ──────────────────────────────────────────────────────
    submitted_at           = models.DateTimeField(auto_now_add=True)
    updated_at             = models.DateTimeField(auto_now=True)

    class Meta:
        ordering            = ['-submitted_at']
        verbose_name        = 'Enquiry'
        verbose_name_plural = 'Enquiries'

    def __str__(self):
        return f"{self.student_full_name} — {self.get_applying_for_program_display()} (submitted {self.submitted_at:%d %b %Y})"

    def why_mirai_list(self):
        return [r.strip() for r in self.why_mirai_reasons.split(',') if r.strip()]

    def heard_via_list(self):
        return [h.strip() for h in self.heard_via.split(',') if h.strip()]

# ── FAQ — Audit fix: Add FAQ section for SEO + AI visibility ─────────
class FAQ(models.Model):
    CATEGORY_CHOICES = [
        ('general',    'General'),
        ('admissions', 'Admissions'),
        ('programmes', 'Programmes'),
        ('boarding',   'Boarding'),
        ('fees',       'Fees'),
        ('campus',     'Campus'),
    ]

    question   = models.CharField(max_length=400)
    answer     = models.TextField()
    category   = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general', db_index=True)
    order      = models.PositiveSmallIntegerField(default=0)
    is_active  = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question[:80]

# ── Prospectus — Audit fix §4.2: Lead Magnet Tracking ────────────────
class ProspectusDownload(models.Model):
    """
    Tracks users who requested the prospectus (Middle-of-funnel leads).
    """
    full_name    = models.CharField(max_length=150)
    email        = models.EmailField()
    mobile       = models.CharField(max_length=20)
    current_city = models.CharField(max_length=100, blank=True)
    requested_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name        = 'Prospectus Download'
        verbose_name_plural = 'Prospectus Downloads'
        ordering            = ['-requested_at']

    def __str__(self):
        return f"{self.full_name} ({self.email})"
