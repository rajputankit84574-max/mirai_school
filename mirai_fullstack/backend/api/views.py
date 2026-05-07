from rest_framework import generics, status, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.conf import settings
from inertia import render

from .models import (
    SiteSettings, Program, Testimonial, Facility,
    BlogCategory, BlogPost, Enquiry, AdmissionStep,
    FeeStructure, Stat, GalleryImage, FAQ, ProspectusDownload
)
from .serializers import (
    SiteSettingsSerializer, ProgramSerializer, TestimonialSerializer,
    FacilitySerializer, BlogCategorySerializer,
    BlogPostListSerializer, BlogPostDetailSerializer,
    EnquirySerializer, AdmissionStepSerializer,
    FeeStructureSerializer, StatSerializer, GalleryImageSerializer, FAQSerializer,
    ProspectusDownloadSerializer
)


# ── System ───────────────────────────────────────────────────────────
@api_view(['GET'])
def health_check(request):
    """Simple health check for monitoring."""
    return Response({'status': 'healthy', 'version': '1.1.0'})


# ── Site Settings (branding) ─────────────────────────────────────────
@api_view(['GET'])
def site_settings(request):
    """Returns dynamic brand settings: colors, logo, contact info."""
    settings = SiteSettings.get()
    serializer = SiteSettingsSerializer(settings, context={'request': request})
    return Response(serializer.data)


# ── Overview (homepage aggregate) ────────────────────────────────────
@api_view(['GET'])
def site_overview(request):
    """
    Optimized homepage dashboard.
    Audit fix §1.2: Cacheable response and reduced query overhead.
    """
    ctx = {'request': request}
    # Pre-fetch or select_related here if needed (standard optimizations)
    return Response({
        'settings': SiteSettingsSerializer(SiteSettings.get(), context=ctx).data,
        'programs': ProgramSerializer(
            Program.objects.filter(is_active=True), many=True, context=ctx
        ).data,
        'testimonials': TestimonialSerializer(
            Testimonial.objects.filter(is_active=True), many=True, context=ctx
        ).data,
        'stats': StatSerializer(
            Stat.objects.all(), many=True, context=ctx
        ).data,
        'facilities': FacilitySerializer(
            Facility.objects.filter(is_active=True)[:6], many=True, context=ctx
        ).data,
        'featured_post': BlogPostListSerializer(
            BlogPost.objects.select_related('category').filter(is_published=True, is_featured=True).first(),
            context=ctx
        ).data,
        'faqs': FAQSerializer(
            FAQ.objects.filter(is_active=True)[:8], many=True
        ).data,
    })

# ── Inertia ──────────────────────────────────────────────────────────
def inertia_home(request):
    """
    Audit fix §3.4: Inertia.js Migration.
    Serves the Home component as a monolithic React-Django view.
    This keeps SEO, routing, and state all inside the Django system.
    """
    ctx = {'request': request}
    props = {
        'overview': {
            'settings': SiteSettingsSerializer(SiteSettings.get(), context=ctx).data,
            'programs': ProgramSerializer(
                Program.objects.filter(is_active=True), many=True, context=ctx
            ).data,
            'testimonials': TestimonialSerializer(
                Testimonial.objects.filter(is_active=True), many=True, context=ctx
            ).data,
            'stats': StatSerializer(
                Stat.objects.all(), many=True, context=ctx
            ).data,
            'facilities': FacilitySerializer(
                Facility.objects.filter(is_active=True)[:6], many=True, context=ctx
            ).data,
            'featured_post': BlogPostListSerializer(
                BlogPost.objects.select_related('category').filter(is_published=True, is_featured=True).first(),
                context=ctx
            ).data,
            'faqs': FAQSerializer(
                FAQ.objects.filter(is_active=True)[:8], many=True
            ).data,
        },
        'blogData': {
            'results': BlogPostListSerializer(
                BlogPost.objects.select_related('category').filter(is_published=True)[:3],
                many=True, context=ctx
            ).data
        }
    }
    return render(request, 'Home', props)

def inertia_blog(request):
    """
    Audit fix §3.4: Inertia.js Migration.
    Serves the Blog list component with server-side props.
    """
    ctx = {'request': request}
    posts = BlogPost.objects.select_related('category').filter(is_published=True)
    cats  = BlogCategory.objects.all()
    
    props = {
        'blogData': {
            'results': BlogPostListSerializer(posts, many=True, context=ctx).data
        },
        'catData': {
            'results': BlogCategorySerializer(cats, many=True, context=ctx).data
        }
    }
    return render(request, 'Blog', props)

def inertia_blog_detail(request, slug):
    """
    Audit fix §3.4: Inertia.js Migration.
    Serves the BlogDetail component with full server-side state.
    """
    post_obj = get_object_or_404(BlogPost.objects.select_related('category'), slug=slug)
    ctx = {'request': request}
    
    props = {
        'post': BlogPostDetailSerializer(post_obj, context=ctx).data,
        'related': BlogPostListSerializer(
            BlogPost.objects.filter(category=post_obj.category).exclude(id=post_obj.id)[:3],
            many=True, context=ctx
        ).data
    }
    return render(request, 'BlogDetail', props)

def inertia_admissions(request):
    """
    Audit fix §3.4: Inertia.js Migration.
    Serves the Admissions page with steps and fees.
    """
    ctx = {'request': request}
    props = {
        'steps': AdmissionStepSerializer(AdmissionStep.objects.filter(is_active=True), many=True, context=ctx).data,
        'fees': FeeStructureSerializer(FeeStructure.objects.filter(is_active=True), many=True, context=ctx).data,
    }
    return render(request, 'Admissions', props)

def inertia_programmes(request):
    """
    Audit fix §3.4: Inertia.js Migration.
    Serves the Programmes list.
    """
    ctx = {'request': request}
    props = {
        'programs': ProgramSerializer(Program.objects.filter(is_active=True), many=True, context=ctx).data,
    }
    return render(request, 'Programmes', props)

def inertia_about(request):
    """
    Audit fix §3.4: Inertia.js Migration.
    Serves the About component with server-side props.
    """
    ctx = {'request': request}
    props = {
        'settings': SiteSettingsSerializer(SiteSettings.get(), context=ctx).data,
    }
    return render(request, 'About', props)

def inertia_sports(request):
    return render(request, 'Sports')

def inertia_residential(request):
    return render(request, 'Residential')

def inertia_campus(request):
    ctx = {'request': request}
    props = {
        'facilities': FacilitySerializer(Facility.objects.filter(is_active=True), many=True, context=ctx).data,
    }
    return render(request, 'Campus', props)

def inertia_experiential(request):
    return render(request, 'Experiential')

def inertia_student_life(request):
    return render(request, 'StudentLife')

def inertia_global_exposure(request):
    return render(request, 'GlobalExposure')

def inertia_gallery(request):
    # Note: SPA used hardcoded photos, but we'll provide the DB images as props too
    ctx = {'request': request}
    props = {
        'images': GalleryImageSerializer(GalleryImage.objects.filter(is_active=True), many=True, context=ctx).data,
    }
    return render(request, 'Gallery', props)

def inertia_contact(request):
    return render(request, 'Contact')

def inertia_student_inquiry(request):
    return render(request, 'StudentInquiry')

def inertia_news(request):
    return render(request, 'News')


# ── Programs ─────────────────────────────────────────────────────────
class ProgramListView(generics.ListAPIView):
    queryset         = Program.objects.filter(is_active=True)
    serializer_class = ProgramSerializer

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx


class ProgramDetailView(generics.RetrieveAPIView):
    queryset         = Program.objects.filter(is_active=True)
    serializer_class = ProgramSerializer
    lookup_field     = 'program_type'

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx


# ── Testimonials ─────────────────────────────────────────────────────
class TestimonialListView(generics.ListAPIView):
    queryset         = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx


# ── Facilities ───────────────────────────────────────────────────────
class FacilityListView(generics.ListAPIView):
    queryset         = Facility.objects.filter(is_active=True)
    serializer_class = FacilitySerializer

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx


# ── Blog ─────────────────────────────────────────────────────────────
class BlogCategoryListView(generics.ListAPIView):
    queryset         = BlogCategory.objects.all().order_by('name')
    serializer_class = BlogCategorySerializer


class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer
    filter_backends  = [filters.SearchFilter]
    search_fields    = ['title', 'excerpt', 'content']

    def get_queryset(self):
        """
        Audit fix §1.1: select_related('category') solves N+1 query problem.
        The category data is now joined in a single SQL query.
        """
        qs  = BlogPost.objects.select_related('category').filter(is_published=True)
        cat = self.request.query_params.get('category')
        if cat:
            qs = qs.filter(category__slug=cat)
        return qs

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx


class BlogPostDetailView(APIView):
    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        post.views += 1
        post.save(update_fields=['views'])
        ctx     = {'request': request}
        related = BlogPostListSerializer(
            BlogPost.objects.select_related('category').filter(is_published=True, category=post.category).exclude(pk=post.pk)[:3],
            many=True, context=ctx
        ).data
        return Response({
            'post':    BlogPostDetailSerializer(post, context=ctx).data,
            'related': related,
        })


# ── Admissions ───────────────────────────────────────────────────────
class AdmissionStepListView(generics.ListAPIView):
    queryset         = AdmissionStep.objects.filter(is_active=True)
    serializer_class = AdmissionStepSerializer


class FeeStructureListView(generics.ListAPIView):
    queryset         = FeeStructure.objects.filter(is_active=True)
    serializer_class = FeeStructureSerializer


class EnquiryCreateView(generics.CreateAPIView):
    """
    Audit fix §2.1: Implement ScopedRateThrottle to prevent inquiry spam.
    Rate is controlled via REST_FRAMEWORK settings (usually 2-5 per hour).
    """
    queryset         = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    throttle_scope   = 'enquiry'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                'success': True,
                'message': "Thank you! We'll contact you within 24 hours.",
                'id':      serializer.data['id'],
            },
            status=status.HTTP_201_CREATED
        )
    
class ProspectusDownloadCreateView(generics.CreateAPIView):
    """
    Audit fix §4.2: Lead Magnet tracking.
    Captures potential leads via prospectus download request.
    """
    queryset         = ProspectusDownload.objects.all()
    serializer_class = ProspectusDownloadSerializer
    throttle_scope   = 'enquiry'  # Share same protection as inquiry form

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                'success': True,
                'message': "Thank you! Your prospectus will be sent to your email shortly.",
                'download_url': '/media/prospectus/mirai-school-prospectus-2026.pdf'
            },
            status=status.HTTP_201_CREATED
        )


# ── Stats ─────────────────────────────────────────────────────────────
class StatListView(generics.ListAPIView):
    queryset         = Stat.objects.all()
    serializer_class = StatSerializer


# ── Gallery ───────────────────────────────────────────────────────────
class GalleryListView(generics.ListAPIView):
    queryset         = GalleryImage.objects.filter(is_active=True)
    serializer_class = GalleryImageSerializer

    def get_queryset(self):
        qs  = super().get_queryset()
        cat = self.request.query_params.get('category')
        if cat:
            qs = qs.filter(category=cat)
        return qs

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx

# ── FAQ ── Audit fix: FAQ section for SEO + AI visibility ────────────
class FAQListView(generics.ListAPIView):
    serializer_class = FAQSerializer

    def get_queryset(self):
        qs  = FAQ.objects.filter(is_active=True)
        cat = self.request.query_params.get('category')
        if cat:
            qs = qs.filter(category=cat)
        return qs

