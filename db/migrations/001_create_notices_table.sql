-- Migration: Create notices table
-- Run this in Supabase SQL editor or via psql to create the table used by the admin panel.

CREATE TABLE IF NOT EXISTS public.notices (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  description text,
  media text NOT NULL,
  media_type text,
  created_at timestamptz DEFAULT now()
);

-- Optional: index by created_at for fast latest queries
CREATE INDEX IF NOT EXISTS idx_notices_created_at ON public.notices (created_at DESC);

-- Grant basic usage if needed (adjust role as appropriate)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON public.notices TO anon;
