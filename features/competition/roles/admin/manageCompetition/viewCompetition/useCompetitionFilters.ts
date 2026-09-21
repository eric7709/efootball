"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { CompetitionStatus } from "@/features/competition/types.competition";

export type CompetitionFilterStatus = CompetitionStatus | "ALL";

export const competitionStatusOptions: CompetitionStatus[] = [
  "DRAFT",
  "REGISTRATION_OPEN",
  "REGISTRATION_CLOSED",
  "ONGOING",
  "COMPLETED",
  "CANCELLED",
];

function readPage(value: string | null) {
  const page = Number.parseInt(value ?? "", 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function readStatus(value: string | null): CompetitionFilterStatus {
  return value && competitionStatusOptions.includes(value as CompetitionStatus)
    ? (value as CompetitionStatus)
    : "ALL";
}

export function useCompetitionFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const statusFilter = readStatus(searchParams.get("status"));
  const page = readPage(searchParams.get("page"));

  function updateUrl(updates: {
    query?: string;
    status?: CompetitionFilterStatus;
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
    setStatusFilter: (value: CompetitionFilterStatus) =>
      updateUrl({ status: value, page: 1 }),
    setPage: (value: number) => updateUrl({ page: value }),
  };
}
