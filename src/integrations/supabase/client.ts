// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ufrkkfvfcwvntqkrqfxv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcmtrZnZmY3d2bnRxa3JxZnh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMzY0MTIsImV4cCI6MjA2MTcxMjQxMn0.HMlUMryhorkIJDDes3GY2f2wm2w3N3Ve4g7AFR1C-pM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);