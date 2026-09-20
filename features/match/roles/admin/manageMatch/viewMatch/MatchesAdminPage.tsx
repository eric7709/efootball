"use client";

import { useMemo, useState } from "react";

import { matchesDummy } from "@/features/match/dummydata/match.dummy";
import type { Match, MatchStatus } from "@/features/match/types.match";
import { AdminPageHeader } from "@/features/shared/admin/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/features/shared/admin/AdminTable";
import { teamsDummy } from "@/features/team/dummydata/team.dummy";

const statusLabels: Record<MatchStatus, string> = {
  SCHEDULED: "Scheduled",
  ONGOING: "Ongoing",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};
const pageSize = 5;

function formatScheduledAt(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Not scheduled"
    : new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export function MatchesAdminPage() {
  const [matches] = useState<Match[]>(matchesDummy);
  const [statusFilter, setStatusFilter] = useState<MatchStatus | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const teamNames = useMemo(
    () => new Map(teamsDummy.map((team) => [team.id, team.name])),
    [],
  );
  const getTeamName = (teamId: string) => teamNames.get(teamId) ?? "Unknown team";
  const filteredMatches = matches.filter((match) => {
    const matchesStatus = statusFilter === "ALL" || match.status === statusFilter;
    const searchableMatch = [
      getTeamName(match.homeTeamId),
      getTeamName(match.awayTeamId),
      match.stage,
      match.round,
    ].filter(Boolean).join(" ").toLowerCase();

    return matchesStatus && searchableMatch.includes(query.trim().toLowerCase());
  });
  const pageCount = Math.max(1, Math.ceil(filteredMatches.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paginatedMatches = filteredMatches.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleStatusChange = (value: MatchStatus | "ALL") => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const columns: AdminTableColumn<Match>[] = [
    {
      key: "fixture",
      label: "Fixture",
      render: (match) => (
        <div className="match-fixture">
          <strong>{getTeamName(match.homeTeamId)}</strong>
          <span>vs</span>
          <strong>{getTeamName(match.awayTeamId)}</strong>
        </div>
      ),
    },
    {
      key: "score",
      label: "Score",
      render: (match) => (
        <strong className="match-score">
          {match.homeScore ?? "-"} : {match.awayScore ?? "-"}
        </strong>
      ),
    },
    {
      key: "round",
      label: "Stage / round",
      render: (match) => (
        <span className="match-round">
          {match.stage ?? "-"}{match.round ? ` / ${match.round}` : ""}
        </span>
      ),
    },
    { key: "scheduledAt", label: "Scheduled", render: (match) => <span className="match-scheduled">{formatScheduledAt(match.scheduledAt)}</span> },
    {
      key: "status",
      label: "Status",
      render: (match) => <span className={`match-status match-status-${match.status.toLowerCase()}`}>{statusLabels[match.status]}</span>,
    },
  ];

  return (
    <>
      <AdminPageHeader eyebrow="MATCHES" title="Matches" description="Track fixtures, submitted scores, and match progress." />
      <section className="panel">
        <div className="match-table-toolbar">
          <div className="match-filter-field match-search-field">
            <label htmlFor="match-search">Search</label>
            <input id="match-search" type="search" placeholder="Team, stage, or round" value={query} onChange={(event) => handleQueryChange(event.target.value)} />
          </div>
          <div className="match-filter-field">
            <label htmlFor="match-status-filter">Status</label>
            <select id="match-status-filter" value={statusFilter} onChange={(event) => handleStatusChange(event.target.value as MatchStatus | "ALL")}>
              <option value="ALL">All statuses</option>
              {(Object.keys(statusLabels) as MatchStatus[]).map((status) => (
                <option key={status} value={status}>{statusLabels[status]}</option>
              ))}
            </select>
          </div>
        </div>
        <AdminTable columns={columns} data={paginatedMatches} emptyMessage="No matches match your filters." />
        <div className="match-pagination">
          <span>{filteredMatches.length} match{filteredMatches.length === 1 ? "" : "es"}</span>
          <div>
            <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {pageCount}</span>
            <button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={currentPage === pageCount}>Next</button>
          </div>
        </div>
      </section>
    </>
  );
}
