from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.utils import timezone
from .models import Enquiry

class EnquiryTest(TestCase):
    """
    Audit fix §3.1: Fundamental test suite for lead generation funnel.
    Ensures that the inquiry form can be submitted correctly and validation works.
    """
    def setUp(self):
        self.client = APIClient()
        self.enquiry_url = '/api/admissions/enquiry/'

    def test_enquiry_submission_success(self):
        """Test successful submission with valid data."""
        data = {
            'student_full_name': 'Test Student',
            'father_name': 'Test Father',
            'father_mobile': '9876543210',
            'father_email': 'father@test.com',
            'address_street': 'Test Street',
            'address_city': 'Test City',
            'address_state': 'Test State',
            'address_pin': '123456',
            'nationality': 'Indian',
            'applying_for_program': 'EYP',
            'declaration_accepted': True
        }
        response = self.client.post(self.enquiry_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Enquiry.objects.count(), 1)
        self.assertEqual(Enquiry.objects.get().student_full_name, 'Test Student')

    def test_enquiry_submission_missing_required(self):
        """Test failure when required fields are missing."""
        data = {
            'student_full_name': 'Test Student'
            # Missing father_name, email, etc.
        }
        response = self.client.post(self.enquiry_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('father_name', response.data)

    def test_enquiry_invalid_pin(self):
        """Test custom field validation for PIN code."""
        data = {
            'student_full_name': 'Test Student',
            'father_name': 'Test Father',
            'father_mobile': '9876543210',
            'father_email': 'father@test.com',
            'address_street': 'Test Street',
            'address_city': 'Test City',
            'address_state': 'Test State',
            'address_pin': '12345', # 5 digits — should fail
            'nationality': 'Indian',
            'applying_for_program': 'EYP',
            'declaration_accepted': True
        }
        response = self.client.post(self.enquiry_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('address_pin', response.data)
