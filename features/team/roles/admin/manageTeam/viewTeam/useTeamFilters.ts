"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function readPage(value: string | null) {
  const page = Number.parseInt(value ?? "", 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function useTeamFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const page = readPage(searchParams.get("page"));

  function updateUrl(updates: { query?: string; page?: number }) {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.query !== undefined) {
      if (updates.query.trim()) {
        params.set("query", updates.query);
      } else {
        params.delete("query");
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
    page,
    setQuery: (value: string) => updateUrl({ query: value, page: 1 }),
    setPage: (value: number) => updateUrl({ page: value }),
  };
}
