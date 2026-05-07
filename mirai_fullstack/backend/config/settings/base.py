from pathlib import Path
from decouple import config
import os

BASE_DIR = Path(__file__).resolve().parent.parent.parent

# ── SECURITY ──────────────────────────────────────────
SECRET_KEY = config('SECRET_KEY', default='django-insecure-fallback-mirai-school-2026')
DEBUG = config('DEBUG', default=True, cast=bool)

# Fix: Dynamic ALLOWED_HOSTS from .env
_hosts = config('ALLOWED_HOSTS', default='miraischool.in,localhost,127.0.0.1').split(',')
ALLOWED_HOSTS = [h.strip() for h in _hosts if h.strip()]
INTERNAL_IPS = ['127.0.0.1']

# ── SOCIAL MEDIA & URLS ─────────────────────────────
SITE_URL = config('SITE_URL', default='https://miraischool.in')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'inertia',
    # Local
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'inertia.middleware.InertiaMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR.parent, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ── DATABASE (SQLite -> Supabase/Postgres) ────────────
# Default to SQLite if Supabase info isn't provided (for easy local dev)
if config('DB_HOST', default=None):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME':     config('DB_NAME'),
            'USER':     config('DB_USER'),
            'PASSWORD': config('DB_PASSWORD'),
            'HOST':     config('DB_HOST'),
            'PORT':     config('DB_PORT', default='5432'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# ── PRODUCTION HARDENING ──────────────────────────────────────────────
if not DEBUG:
    # SSL/HTTPS
    SECURE_SSL_REDIRECT     = True
    SESSION_COOKIE_SECURE   = True
    CSRF_COOKIE_SECURE      = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    
    # HSTS
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    
    # Browser features
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_BROWSER_XSS_FILTER   = True
    X_FRAME_OPTIONS = 'DENY'

# CSRF Trusted Origins (Required for Django 4.0+)
CSRF_TRUSTED_ORIGINS = [
    'https://miraischool.in',
    'https://www.miraischool.in',
    'http://localhost:5173',  # Vite dev server
]

# CORS
CORS_ALLOWED_ORIGINS = [
    'https://miraischool.in',
    'https://www.miraischool.in',
    'http://localhost:5173',
]
CORS_ALLOW_CREDENTIALS = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ── CORS ──────────────────────────────────────────────
CORS_ALLOW_CREDENTIALS = True
# Strict in prod, permissive in dev
CORS_ALLOW_ALL_ORIGINS = config('DEBUG', default=False, cast=bool) 

# ── REST FRAMEWORK ────────────────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon':    '300/day',
        'enquiry': '5/hour',  # Audit fix §2.1: Prevent lead spam
    },
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
    ],
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 12,
}

# ── JWT ───────────────────────────────────────────────
from datetime import timedelta
SIMPLE_JWT = {
    # Audit fix §2.2: Hardened token lifetimes
    'ACCESS_TOKEN_LIFETIME':  timedelta(minutes=60), 
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS':  True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# ── SECURITY POLICIES ─────────────────────────────────
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# ── EMAIL CONFIGURATION ───────────────────────────────
EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', cast=int, default=587)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', cast=bool, default=True)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='admissions@miraischool.in')

# Fix: Secure cookies based on DEBUG state
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
CSRF_TRUSTED_ORIGINS = config('CSRF_TRUSTED_ORIGINS', default='http://localhost:5173').split(',')