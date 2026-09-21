"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { MatchStatus } from "@/features/match/types.match";

export type MatchFilterStatus = MatchStatus | "ALL";

export const matchStatusOptions: MatchStatus[] = [
  "SCHEDULED",
  "ONGOING",
  "COMPLETED",
  "CANCELLED",
];

function readPage(value: string | null) {
  const page = Number.parseInt(value ?? "", 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function readStatus(value: string | null): MatchFilterStatus {
  return value && matchStatusOptions.includes(value as MatchStatus)
    ? (value as MatchStatus)
    : "ALL";
}

export function useMatchFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const statusFilter = readStatus(searchParams.get("status"));
  const page = readPage(searchParams.get("page"));

  function updateUrl(updates: {
    query?: string;
    status?: MatchFilterStatus;
    page?: number;
  }) {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.query !== undefined) {
      if (updates.query.trim()) {
        params.set("query", updates.query);
      } else {
        params.delete("query");
      }
    }

    if (updates.status !== undefined) {
      if (updates.status === "ALL") {
        params.delete("status");
      } else {
        params.set("status", updates.status);
      }
    }

    if (updates.page !== undefined) {
      if (updates.page <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(updates.page));
      }
    }

    const search = params.toString();
    router.replace(`${pathname}${search ? `?${search}` : ""}`, {
      scroll: false,
    });
  }

  return {
    query,
    statusFilter,
    page,
    setQuery: (value: string) => updateUrl({ query: value, page: 1 }),
    setStatusFilter: (value: MatchFilterStatus) =>
      updateUrl({ status: value, page: 1 }),
    setPage: (value: number) => updateUrl({ page: value }),
  };
}
