import os
from decouple import config

# Switch based on ENV or DEBUG flag
env = config('DJANGO_ENV', default='dev')

if env == 'prod':
    from .prod import *
else:
    from .dev import *
