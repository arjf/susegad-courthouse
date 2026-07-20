import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { withCsrf } from "@/lib/csrf";

export const POST = withCsrf(async function () {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/adm/login");
});
