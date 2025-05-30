import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zdsbgsebngbjyebyjsdp.supabase.co";
// USER AUTHENTICATION - Github
// const ClientID = "Ov23liT2nUz2s8hlcHFj";
// const Client_secrets = "4b42c2018c2534075f15b0ce04f03d7e5a372af8";

// Sign-out:
// async function signOut() {
//   const { error } = await supabase.auth.signOut()
// }

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkc2Jnc2VibmdianllYnlqc2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MzMwODksImV4cCI6MjA2MjUwOTA4OX0.CEzSo7uinMhWStuVqQoUbnQaXH8_BHun8Q3tIaQYXXQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
