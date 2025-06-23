import os
from supabase import create_client

# Supabase configuration
SUPABASE_URL = "https://mhsmbwxdqymfihcoludw.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc21id3hkcXltZmloY29sdWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NzYyMDAsImV4cCI6MjA2NjE1MjIwMH0.HCLGMlkFIbWab40YOQoJRpS6sY7uyR-vxqaVQkNgBgA"

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
