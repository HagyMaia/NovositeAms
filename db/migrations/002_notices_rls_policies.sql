-- Migration: Enable RLS and add policies for `notices` table
-- Run this in Supabase SQL editor or via psql.

-- Ensure RLS is enabled
ALTER TABLE IF EXISTS public.notices ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public) to SELECT notices (so the homepage can read them)
DROP POLICY IF EXISTS public_select_notices ON public.notices;
CREATE POLICY public_select_notices
  ON public.notices
  FOR SELECT
  USING (true);

-- Allow authenticated users to INSERT notices
DROP POLICY IF EXISTS authenticated_insert_notices ON public.notices;
CREATE POLICY authenticated_insert_notices
  ON public.notices
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to UPDATE and DELETE notices
-- Create separate policies for UPDATE and DELETE (Postgres doesn't accept comma list)
DROP POLICY IF EXISTS authenticated_update_notices ON public.notices;
CREATE POLICY authenticated_update_notices
  ON public.notices
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS authenticated_delete_notices ON public.notices;
CREATE POLICY authenticated_delete_notices
  ON public.notices
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Notes:
-- 1) Run this in the Supabase SQL Editor after confirming the table exists.
-- 2) If you want only the admin account to modify/delete, replace the USING/WITH CHECK
--    conditions to check `auth.role()` or compare `auth.uid()` with an owner column.
