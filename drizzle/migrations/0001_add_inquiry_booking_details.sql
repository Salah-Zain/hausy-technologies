ALTER TABLE public.project_inquiries
  ADD COLUMN inquiry_type TEXT NOT NULL DEFAULT 'project',
  ADD COLUMN preferred_time TEXT;