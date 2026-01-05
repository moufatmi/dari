import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqgzyschkjgwejvrpgvw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZ3p5c2Noa2pnd2VqdnJwZ3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzM3OTAsImV4cCI6MjA4MzE0OTc5MH0.E-xdCc2LzDGGvzThajRL9sdBXtny6tvKQGToSI6IZIw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
