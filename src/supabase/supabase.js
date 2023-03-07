import { createClient } from "@supabase/supabase-js";

const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsY2ZwYXFiYmtjbnZoZnBiZnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQyOTA2NTIsImV4cCI6MTk4OTg2NjY1Mn0.IIAa3hE-VdZk14A44G1j3KXE4Zwnndksh5pNd3FLp10";
const url = "https://alcfpaqbbkcnvhfpbftp.supabase.co";

export const supabase = createClient(url, apikey);
