"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCsrfToken } from "@/components/admin/CsrfTokenProvider";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const getCsrf = useCsrfToken();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoggingIn(true);

    const csrf = await getCsrf();
    if (!csrf) {
      setError("Session expired. Please refresh the page.");
      setIsLoggingIn(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setIsLoggingIn(false);
        return;
      }

      if (data.passwordResetRequired) {
        setIsResetMode(true);
        setMessage("Please set a new password before continuing.");
        setIsLoggingIn(false);
        return;
      }

      router.push("/adm");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setIsLoggingIn(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
      data: { password_reset_required: false },
    });

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/adm");
    router.refresh();
  };

  const handleGenerateAdmin = async () => {
    if (!confirm(
      "This will create a new admin account. The credentials will be printed to the server logs (Vercel Runtime Logs). Continue?"
    )) return;

    setIsGenerating(true);
    setError("");

    const csrf = await getCsrf();
    if (!csrf) {
      setError("Session expired. Please refresh the page.");
      setIsGenerating(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/setup-admin", {
        method: "POST",
        headers: { "X-CSRF-Token": csrf },
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Admin account created! Check Vercel Runtime Logs for credentials. ${data.hint}`);
      } else if (res.status === 409) {
        setMessage("Admin account already exists. Use your credentials to sign in.");
      } else {
        setError(data.error || "Failed to create admin account.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-6">
      <div className="w-full max-w-sm rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="font-heading text-2xl font-bold text-stone-800">Admin Login</h1>
        <p className="mt-1 font-body text-sm text-stone-500">
          Sign in to the Susegad Courtyard admin panel.
        </p>

        {error && (
          <p className="mt-4 rounded-md bg-red-50 p-3 font-body text-sm text-red-700">{error}</p>
        )}
        {message && (
          <p className="mt-4 rounded-md bg-blue-50 p-3 font-body text-sm text-blue-700">{message}</p>
        )}

        {!isResetMode ? (
          <>
            <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="mb-1 block font-body text-sm font-medium text-stone-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-4 py-2.5 font-body text-sm focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block font-body text-sm font-medium text-stone-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-4 py-2.5 font-body text-sm focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
                />
              </div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="rounded-lg bg-stone-800 px-6 py-2.5 font-body text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
              >
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 border-t border-stone-200 pt-6">
              <p className="font-body text-xs text-stone-400">
                First time? Generate admin credentials. They will be printed to the Vercel Runtime Logs.
              </p>
              <button
                onClick={handleGenerateAdmin}
                disabled={isGenerating}
                className="mt-3 w-full rounded-lg border border-stone-300 px-4 py-2 font-body text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-50"
              >
                {isGenerating ? "Generating..." : "Generate Admin Credentials"}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleReset} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="new-password" className="mb-1 block font-body text-sm font-medium text-stone-700">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-lg border border-stone-300 px-4 py-2.5 font-body text-sm focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-accent1 px-6 py-2.5 font-body text-sm font-medium text-white hover:bg-accent1/90"
            >
              Set Password &amp; Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
