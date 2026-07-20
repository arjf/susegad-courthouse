import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { getUser } from "@/lib/supabase/server";
import { CsrfTokenProvider } from "@/components/admin/CsrfTokenProvider";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  if (!host.startsWith("adm.") && !host.startsWith("localhost") && !host.includes("vercel.app")) {
    redirect("/");
  }

  const user = await getUser();

  if (!user) {
    redirect("/adm/login");
  }

  return (
    <CsrfTokenProvider>
      <div className="min-h-screen bg-stone-50">
        <nav className="border-b border-stone-200 bg-white px-6 py-3">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <a href="/adm" className="font-heading text-lg font-bold text-stone-800">
              Susegad Admin
            </a>
            <div className="flex items-center gap-4">
              <a href="/adm/debug" className="font-body text-sm text-stone-500 hover:text-stone-800">
                Debug
              </a>
              <form action="/adm/logout" method="post">
                <CsrfHiddenInput />
                <button
                  type="submit"
                  className="rounded-md bg-stone-800 px-4 py-1.5 font-body text-sm text-white hover:bg-stone-700"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-6xl px-6 py-8">
          {children}
        </main>
      </div>
    </CsrfTokenProvider>
  );
}

async function CsrfHiddenInput() {
  const { generateCsrfToken } = await import("@/lib/csrf");
  const token = await generateCsrfToken();
  return <input type="hidden" name="_csrf" value={token} />;
}
