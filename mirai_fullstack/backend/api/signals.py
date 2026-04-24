import requests
import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import BlogPost, SiteSettings

logger = logging.getLogger(__name__)

def post_to_facebook(post, site_settings):
    """Posts a blog update to Facebook Page via Graph API."""
    if not all([site_settings.fb_page_id, site_settings.fb_access_token]):
        logger.warning("Facebook credentials missing in Site Settings.")
        return False

    url = f"https://graph.facebook.com/v19.0/{site_settings.fb_page_id}/feed"
    payload = {
        'message': f"New Blog: {post.title}\n\n{post.excerpt}",
        'link': f"{settings.SITE_URL}/blog/{post.slug}",
        'access_token': site_settings.fb_access_token
    }
    
    try:
        response = requests.post(url, data=payload)
        response.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Facebook Auto-post failed: {str(e)}")
        return False

def post_to_instagram(post, site_settings):
    """Posts a blog image to Instagram Business Account via Graph API."""
    if not all([site_settings.ig_user_id, site_settings.fb_access_token]):
        logger.warning("Instagram/Facebook credentials missing in Site Settings.")
        return False

    if not post.featured_image:
        logger.warning("Instagram post skipped: No featured image found.")
        return False

    # 1. Upload Media Container
    base_url = f"https://graph.facebook.com/v19.0/{site_settings.ig_user_id}"
    image_url = f"{settings.SITE_URL}{post.featured_image.url}"
    
    upload_payload = {
        'image_url': image_url,
        'caption': f"{post.title}\n\n{post.excerpt}\n\nRead more at: {settings.SITE_URL}/blog/{post.slug}",
        'access_token': site_settings.fb_access_token
    }

    try:
        # Step A: Create container
        res = requests.post(f"{base_url}/media", data=upload_payload)
        res.raise_for_status()
        creation_id = res.json().get('id')

        # Step B: Publish container
        publish_res = requests.post(f"{base_url}/media_publish", data={
            'creation_id': creation_id,
            'access_token': site_settings.fb_access_token
        })
        publish_res.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Instagram Auto-post failed: {str(e)}")
        return False

@receiver(post_save, sender=BlogPost)
def handle_blog_social_sharing(sender, instance, created, **kwargs):
    """
    Triggered when a BlogPost is saved. 
    Only posts to social media if 'is_published' is True and 'auto_post_social' is enabled.
    """
    site_settings = SiteSettings.get()
    
    # Only proceed if auto-post is enabled and the post is published
    if not site_settings.auto_post_social or not instance.is_published:
        return

    # Check if this is a newly published post or just an update to a published one
    # Note: For production, you might want to track if it was already shared to avoid duplicates.
    # For now, we rely on the user toggling 'is_published' or 'auto_post_social'.
    
    if instance.is_published:
        logger.info(f"Triggering social sharing for: {instance.title}")
        post_to_facebook(instance, site_settings)
        post_to_instagram(instance, site_settings)
