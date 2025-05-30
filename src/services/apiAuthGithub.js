import supabase from "./supabase";

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) throw new Error(error.message);

  return data;
}
