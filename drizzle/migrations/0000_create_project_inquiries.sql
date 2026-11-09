CREATE TABLE public.project_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  budget TEXT NOT NULL,
  goals TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.project_inquiries TO service_role;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;