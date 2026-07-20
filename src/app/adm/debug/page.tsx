"use client";

import { useState } from "react";

export default function AdminDebug() {
  const [sentryResult, setSentryResult] = useState("");
  const [emailResult, setEmailResult] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const triggerSentryError = async () => {
    setSentryResult("Triggering...");
    try {
      const res = await fetch("/api/debug/sentry-test", { method: "POST" });
      if (res.ok) {
        setSentryResult("Sentry test error sent! Check your Sentry dashboard.");
      } else {
        setSentryResult(`Failed: ${res.status} ${res.statusText}`);
      }
    } catch {
      setSentryResult("Network error");
    }
  };

  const sendTestEmail = async () => {
    if (!emailSubject) return;
    setEmailResult("Sending...");
    try {
      const res = await fetch("/api/debug/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: emailSubject, body: emailBody }),
      });
      const data = await res.json();
      setEmailResult(data.success ? "Email sent! Check your inbox." : `Failed: ${data.error}`);
    } catch {
      setEmailResult("Network error");
    }
  };

  const sendTestPosthog = async () => {
    try {
      const res = await fetch("/api/debug/posthog-test", { method: "POST" });
      if (res.ok) {
        setSentryResult("PostHog test event sent!");
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-bold text-stone-800">Debug Tools</h1>

      {/* Sentry test */}
      <section className="rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="font-heading text-xl font-semibold text-stone-800">Sentry Test Error</h2>
        <p className="mt-1 font-body text-sm text-stone-500">
          Trigger a test error to verify Sentry is capturing correctly.
        </p>
        <button
          onClick={triggerSentryError}
          className="mt-4 rounded-lg bg-red-600 px-6 py-2.5 font-body text-sm font-medium text-white hover:bg-red-500"
        >
          Trigger Sentry Error
        </button>
        {sentryResult && (
          <p className="mt-3 font-body text-sm text-stone-600">{sentryResult}</p>
        )}
      </section>

      {/* PostHog test */}
      <section className="rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="font-heading text-xl font-semibold text-stone-800">PostHog Test Event</h2>
        <p className="mt-1 font-body text-sm text-stone-500">
          Send a test event to PostHog.
        </p>
        <button
          onClick={sendTestPosthog}
          className="mt-4 rounded-lg bg-purple-600 px-6 py-2.5 font-body text-sm font-medium text-white hover:bg-purple-500"
        >
          Send PostHog Event
        </button>
      </section>

      {/* Test email */}
      <section className="rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="font-heading text-xl font-semibold text-stone-800">Send Test Email</h2>
        <p className="mt-1 font-body text-sm text-stone-500">
          Send a test email via Resend to your admin address.
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <input
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            placeholder="Email subject"
            className="rounded-lg border border-stone-300 px-4 py-2.5 font-body text-sm focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
          />
          <textarea
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            placeholder="Email body (plain text)"
            rows={4}
            className="rounded-lg border border-stone-300 px-4 py-2.5 font-body text-sm focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
          />
          <button
            onClick={sendTestEmail}
            disabled={!emailSubject}
            className="w-fit rounded-lg bg-accent1 px-6 py-2.5 font-body text-sm font-medium text-white hover:bg-accent1/90 disabled:opacity-50"
          >
            Send Test Email
          </button>
          {emailResult && (
            <p className="font-body text-sm text-stone-600">{emailResult}</p>
          )}
        </div>
      </section>
    </div>
  );
}
