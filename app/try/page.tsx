"use client";

import { useState } from "react";
import Link from "next/link";

type Country = "India" | "Philippines" | "Mexico" | "Nigeria" | "Vietnam";

interface CountryInfo {
  currency: string;
  symbol: string;
  rate: number;
  wuFeeBase: number;
  wuFeePct: number;
  wuDays: string;
}

const COUNTRIES: Record<Country, CountryInfo> = {
  India: {
    currency: "INR",
    symbol: "\u20B9",
    rate: 84.97,
    wuFeeBase: 4.5,
    wuFeePct: 0.039,
    wuDays: "1-3 days",
  },
  Philippines: {
    currency: "PHP",
    symbol: "\u20B1",
    rate: 56.12,
    wuFeeBase: 5.0,
    wuFeePct: 0.042,
    wuDays: "1-3 days",
  },
  Mexico: {
    currency: "MXN",
    symbol: "$",
    rate: 17.15,
    wuFeeBase: 4.0,
    wuFeePct: 0.035,
    wuDays: "1-2 days",
  },
  Nigeria: {
    currency: "NGN",
    symbol: "\u20A6",
    rate: 1580.0,
    wuFeeBase: 6.0,
    wuFeePct: 0.045,
    wuDays: "2-4 days",
  },
  Vietnam: {
    currency: "VND",
    symbol: "\u20AB",
    rate: 25430.0,
    wuFeeBase: 5.5,
    wuFeePct: 0.04,
    wuDays: "2-3 days",
  },
};

const COUNTRY_NAMES: Country[] = ["India", "Philippines", "Mexico", "Nigeria", "Vietnam"];
const FLAT_FEE = 0.5;

export default function TryPage() {
  const [amount, setAmount] = useState("");
  const [country, setCountry] = useState<Country>("India");
  const [showResult, setShowResult] = useState(false);

  const info = COUNTRIES[country];
  const usd = parseFloat(amount) || 0;
  const received = usd * info.rate;
  const srFee = FLAT_FEE;
  const wuFee = info.wuFeeBase + usd * info.wuFeePct;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (usd <= 0) return;
    setShowResult(true);
  }

  function handleReset() {
    setAmount("");
    setShowResult(false);
  }

  const srTotal = usd + srFee;
  const wuTotal = usd + wuFee;
  const savings = wuTotal - srTotal;
  const maxBar = Math.max(srTotal, wuTotal);

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-500" />
          SendRail
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-600">
            Cost comparison
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            See how much you save with SendRail.
          </h1>
        </div>

        {!showResult ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-neutral-500">Amount (USD)</label>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold">$</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent text-3xl font-bold focus:outline-none placeholder-neutral-300"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500">Destination country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as Country)}
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
                >
                  {COUNTRY_NAMES.map((c) => (
                    <option key={c} value={c}>
                      {c} ({COUNTRIES[c].currency})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-neutral-900 px-4 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Compare costs
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Recipient receives */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-yellow-600">
                Recipient receives
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-yellow-700">
                  {info.symbol}
                  {received.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
                <span className="text-sm text-neutral-500">{info.currency}</span>
              </div>
              <p className="mt-1 text-sm text-neutral-500">
                Rate: 1 USD = {info.rate.toLocaleString()} {info.currency}
              </p>
            </div>

            {/* Comparison */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Cost comparison
              </div>

              <div className="mt-5 space-y-5">
                {/* SendRail bar */}
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">SendRail</span>
                    <span className="text-yellow-700 font-medium">
                      ${srFee.toFixed(2)} fee &middot; ~3 seconds
                    </span>
                  </div>
                  <div className="mt-2 h-4 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-4 rounded-full bg-yellow-500 transition-all"
                      style={{ width: `${(srTotal / maxBar) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    Total: ${srTotal.toFixed(2)}
                  </p>
                </div>

                {/* Western Union bar */}
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-neutral-500">Western Union</span>
                    <span className="text-neutral-400">
                      ${wuFee.toFixed(2)} fee &middot; {info.wuDays}
                    </span>
                  </div>
                  <div className="mt-2 h-4 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-4 rounded-full bg-neutral-300 transition-all"
                      style={{ width: `${(wuTotal / maxBar) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    Total: ${wuTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              {savings > 0 && (
                <div className="mt-6 rounded-xl bg-yellow-50 p-4 text-center">
                  <p className="text-sm text-yellow-800">
                    You save{" "}
                    <span className="font-bold">${savings.toFixed(2)}</span> and get it there in
                    seconds instead of {info.wuDays}.
                  </p>
                </div>
              )}
            </div>

            {/* Summary table */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Side by side
              </div>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-left text-xs text-neutral-400">
                    <th className="pb-2 font-medium" />
                    <th className="pb-2 font-medium">SendRail</th>
                    <th className="pb-2 font-medium">Western Union</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-2 text-neutral-500">Fee</td>
                    <td className="py-2 font-medium text-yellow-700">${srFee.toFixed(2)}</td>
                    <td className="py-2 text-neutral-500">${wuFee.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-500">Delivery</td>
                    <td className="py-2 font-medium text-yellow-700">~3 seconds</td>
                    <td className="py-2 text-neutral-500">{info.wuDays}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-500">Recipient gets</td>
                    <td className="py-2 font-medium">
                      {info.symbol}
                      {received.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-2 text-neutral-500">
                      {info.symbol}
                      {received.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Try another amount
              </button>
              <Link
                href="/#waitlist"
                className="rounded-full border border-neutral-300 px-7 py-3.5 text-center font-medium text-neutral-900 transition hover:border-neutral-900"
              >
                Get early access
              </Link>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with mocked rates.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for real-time pricing.
        </p>
      </div>
    </div>
  );
}
