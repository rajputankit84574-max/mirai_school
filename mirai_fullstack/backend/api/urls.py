from django.urls import path
from . import views

urlpatterns = [
    # System
    path('health/',              views.health_check,               name='health-check'),
    # Branding
    path('settings/',            views.site_settings,              name='site-settings'),
    # Overview
    path('overview/',            views.site_overview,              name='overview'),
    # Programs
    path('programs/',            views.ProgramListView.as_view(),  name='programs'),
    path('programs/<str:program_type>/', views.ProgramDetailView.as_view(), name='program-detail'),
    # Testimonials
    path('testimonials/',        views.TestimonialListView.as_view(), name='testimonials'),
    # Facilities
    path('facilities/',          views.FacilityListView.as_view(),  name='facilities'),
    # Blog
    path('blog/categories/',     views.BlogCategoryListView.as_view(), name='blog-categories'),
    path('blog/posts/',          views.BlogPostListView.as_view(),     name='blog-posts'),
    path('blog/posts/<slug:slug>/', views.BlogPostDetailView.as_view(), name='blog-post-detail'),
    # Admissions
    path('admissions/steps/',    views.AdmissionStepListView.as_view(), name='admission-steps'),
    path('admissions/fees/',     views.FeeStructureListView.as_view(),  name='fees'),
    path('admissions/enquiry/',  views.EnquiryCreateView.as_view(),     name='enquiry'),
    path('admissions/prospectus-request/', views.ProspectusDownloadCreateView.as_view(), name='prospectus-request'),
    # Stats
    path('stats/',               views.StatListView.as_view(), name='stats'),
    # Gallery
    path('gallery/',             views.GalleryListView.as_view(), name='gallery'),
    # FAQ — Audit fix
    path('faqs/',                views.FAQListView.as_view(), name='faqs'),
]
