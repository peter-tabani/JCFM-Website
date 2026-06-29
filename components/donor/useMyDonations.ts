"use client";

import { useEffect, useState } from "react";

export type MyDonation = {
  id: string;
  amountCents: number;
  currency: string;
  provider: "stripe" | "paypal";
  status: "pending" | "succeeded" | "failed";
  designation: string;
  designationLabel: string;
  createdAt: string;
};

export type MyDonationsData = {
  memberSince: string;
  totals: { lifetimeCents: number; thisYearCents: number; count: number };
  donations: MyDonation[];
};

export function useMyDonations() {
  const [data, setData] = useState<MyDonationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/donations/mine")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load your donations.");
        return res.json();
      })
      .then((d: MyDonationsData) => active && setData(d))
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}

export function fmtUSD(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
