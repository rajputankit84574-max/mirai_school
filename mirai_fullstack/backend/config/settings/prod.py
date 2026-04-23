from .base import *

DEBUG = False
# ALLOWED_HOSTS will be taken from .env in base.py

# Add production-only security headers if not in base
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
