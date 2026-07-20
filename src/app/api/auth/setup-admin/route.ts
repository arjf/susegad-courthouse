import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import crypto from "node:crypto";

export async function POST() {
  const supabase = await createAdminClient();

  const { data: { users } } = await supabase.auth.admin.listUsers();
  const adminExists = users?.some((u) => u.email?.startsWith("jo@"));

  if (adminExists) {
    return NextResponse.json({ error: "Admin already exists" }, { status: 409 });
  }

  const randomHex = crypto.randomBytes(12).toString("hex");
  const email = `jo@${randomHex}`;
  const password = crypto.randomBytes(24).toString("hex");

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { password_reset_required: true, role: "admin" },
  });

  if (error) {
    console.error("[admin-setup] Failed to create admin:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("\n================================");
  console.log("  ADMIN CREDENTIALS");
  console.log("  Email:    " + email);
  console.log("  Password: " + password);
  console.log("  IMPORTANT: Save these now. They will not be shown again.");
  console.log("  The user will be prompted to reset the password on first login.");
  console.log("================================\n");

  return NextResponse.json({
    success: true,
    message: "Admin account created. Credentials have been printed to the server console.",
    hint: "Check your server logs (Vercel Runtime Logs) for the email and password.",
  });
}
