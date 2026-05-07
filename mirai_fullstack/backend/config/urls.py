from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse
from django.views.decorators.cache import cache_control


@cache_control(max_age=86400)
def sitemap_xml(request):
    """Audit fix §1.4: XML sitemap for Google Search Console indexing."""
    base = 'https://miraischool.in'
    urls = [
        ('/', '1.0', 'daily'),
        ('/about', '0.8', 'monthly'),
        ('/programmes', '0.9', 'weekly'),
        ('/experiential-learning', '0.8', 'monthly'),
        ('/sports', '0.7', 'monthly'),
        ('/residential', '0.7', 'monthly'),
        ('/campus', '0.7', 'monthly'),
        ('/student-life', '0.6', 'monthly'),
        ('/global-exposure', '0.7', 'monthly'),
        ('/admissions', '0.9', 'weekly'),
        ('/blog', '0.8', 'daily'),
        ('/contact', '0.8', 'monthly'),
    ]
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for loc, priority, changefreq in urls:
        xml += f'  <url>\n'
        xml += f'    <loc>{base}{loc}</loc>\n'
        xml += f'    <changefreq>{changefreq}</changefreq>\n'
        xml += f'    <priority>{priority}</priority>\n'
        xml += f'  </url>\n'
    xml += '</urlset>'
    return HttpResponse(xml, content_type='application/xml')


@cache_control(max_age=86400)
def robots_txt(request):
    """Audit fix §1.4: robots.txt pointing to sitemap."""
    content = """User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/auth/

Sitemap: https://miraischool.in/sitemap.xml
"""
    return HttpResponse(content, content_type='text/plain')

from api import views as api_views

urlpatterns = [
    path('sitemap.xml', sitemap_xml, name='sitemap'),
    path('robots.txt',  robots_txt,  name='robots'),
    path('admin/', admin.site.urls),
    
    # ── Website (Inertia.js Monolith) ─────────────────────────────
    path('',                     api_views.inertia_home,           name='home'),
    path('about/',               api_views.inertia_about,          name='about'),
    path('blog/',                api_views.inertia_blog,           name='blog'),
    path('blog/<slug:slug>/',    api_views.inertia_blog_detail,    name='blog-detail'),
    path('admissions/',          api_views.inertia_admissions,     name='admissions'),
    path('programmes/',          api_views.inertia_programmes,     name='programmes'),
    path('sports/',              api_views.inertia_sports,         name='sports'),
    path('residential/',         api_views.inertia_residential,    name='residential'),
    path('campus/',              api_views.inertia_campus,         name='campus'),
    path('experiential-learning/', api_views.inertia_experiential, name='experiential'),
    path('student-life/',        api_views.inertia_student_life,   name='student-life'),
    path('global-exposure/',     api_views.inertia_global_exposure, name='global-exposure'),
    path('gallery/',             api_views.inertia_gallery,         name='gallery'),
    path('contact/',             api_views.inertia_contact,         name='contact'),
    path('student-inquiry/',     api_views.inertia_student_inquiry, name='student-inquiry'),
    path('news/',                api_views.inertia_news,            name='news'),

    # ── API (Data endpoints) ──────────────────────────────────────
    path('api/', include('api.urls')),
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
