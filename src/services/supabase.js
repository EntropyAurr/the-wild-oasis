import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zdsbgsebngbjyebyjsdp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkc2Jnc2VibmdianllYnlqc2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MzMwODksImV4cCI6MjA2MjUwOTA4OX0.CEzSo7uinMhWStuVqQoUbnQaXH8_BHun8Q3tIaQYXXQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
