# core/models.py
from django.db import models

class Resume(models.Model):
    file = models.FileField(upload_to="resumes/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(blank=True, null=True)  # parsed text
