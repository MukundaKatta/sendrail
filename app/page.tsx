"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

const RATE = 84.97;

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState(500);

  const inr = (amount * RATE).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  const fee = Math.max(0.49, amount * 0.001).toFixed(2);
  const wuFee = (4.5 + amount * 0.039).toFixed(2);

  const handleAmount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value) || 0);
  }, []);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-500" />
          SendRail
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:border-neutral-900 hidden sm:inline-block"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-yellow-100 via-yellow-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-700">
            Fintech
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Send money home. Instantly. Cheaply.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Stablecoin rails from the US and GCC to India and the Philippines. Settles in seconds,
            not days.
          </p>

          {submitted ? (
            <p className="mt-12 text-sm font-medium text-yellow-700">
              Thanks. We will ping you the day we launch.
            </p>
          ) : (
            <form
              id="waitlist"
              onSubmit={handleWaitlist}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                Join the waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-yellow-600">
                Send money home
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-neutral-500">You send (USD)</label>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-bold">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={handleAmount}
                      className="w-full bg-transparent text-3xl font-bold focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500">They receive (INR)</label>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-bold">&#8377;</span>
                    <div className="text-3xl font-bold text-yellow-700">{inr}</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-1 border-t border-neutral-200 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Exchange rate</span>
                  <span>1 USD = {RATE} INR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Fee</span>
                  <span className="text-yellow-700 font-medium">${fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Arrives</span>
                  <span className="font-medium">In ~3 seconds</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Western Union (for comparison)</span>
                  <span>${wuFee} + 1-3 days</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/try"
              className="inline-block rounded-full bg-yellow-600 px-7 py-3.5 font-medium text-white transition hover:bg-yellow-700"
            >
              Try a full comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">&#9889;</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Seconds, not days</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                USDC under the hood. You see INR or PHP arrive on the other side.
              </p>
            </div>
            <div>
              <div className="text-3xl">&#128184;</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                A fraction of Western Union
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Fees measured in cents, not percents of your hard-earned money.
              </p>
            </div>
            <div>
              <div className="text-3xl">&#127760;</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Works from any phone</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                No crypto wallet needed. Debit card in, local bank account out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            {[
              {
                n: 1,
                title: "Download, verify once",
                body: "KYC takes five minutes. You only do it once, in your lifetime, with us.",
              },
              {
                n: 2,
                title: "Add a recipient",
                body: "Their name, phone number, and bank. We handle the rest of the paperwork.",
              },
              {
                n: 3,
                title: "Send in one tap",
                body: "Seconds to settle. Cents in fees. Actual peace of mind.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-sm font-bold text-yellow-700">
                  {n}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the
          doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-yellow-600 px-7 py-3.5 font-medium text-white transition hover:bg-yellow-700"
        >
          Reserve my spot
        </a>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
            SendRail
          </p>
          <p>&copy; 2026</p>
        </div>
      </footer>
    </>
  );
}
