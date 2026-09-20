"use client";

import { useState } from "react";

import { AdminPageHeader } from "@/features/shared/admin/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/features/shared/admin/AdminTable";
import { CompetitionPlatformBadge } from "@/features/competition/shared/CompetitionPlatformBadge";
import { CompetitionStatusBadge } from "@/features/competition/shared/CompetitionStatusBadge";
import { CompetitionTypeBadge } from "@/features/competition/shared/CompetitionTypeBadge";
import { competitionsDummy } from "@/features/competition/dummydata/competition.dummy";
import { DeleteCompetitionModal } from "../deleteCompetition/DeleteCompetitionModal";
import { UpdateCompetitionModal } from "../updateCompetition/UpdateCompetitionModal";
import { useCompetitionStore } from "@/features/competition/store.competition";

import type { Competition, CompetitionStatus } from "@/features/competition/types.competition";

const pageSize = 5;

export function CompetitionAdminPage() {
  const [competitions, setCompetitions] = useState(competitionsDummy);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CompetitionStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const { openUpdateModal, openDeleteModal } = useCompetitionStore();
  const filteredCompetitions = competitions.filter((competition) => {
    const matchesStatus = statusFilter === "ALL" || competition.status === statusFilter;
    const searchableCompetition = [competition.name, competition.season, competition.year, competition.type, competition.platform, competition.location].filter(Boolean).join(" ").toLowerCase();

    return matchesStatus && searchableCompetition.includes(query.trim().toLowerCase());
  });
  const pageCount = Math.max(1, Math.ceil(filteredCompetitions.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paginatedCompetitions = filteredCompetitions.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const columns: AdminTableColumn<Competition>[] = [
    { key: "name", label: "Competition", render: (competition) => <><strong>{competition.name}</strong><br /><small className="muted">{competition.season ?? competition.year}</small></> },
    { key: "format", label: "Format", render: (competition) => <span className="competition-table-label"><CompetitionTypeBadge type={competition.type} /></span> },
    { key: "platform", label: "Platform", render: (competition) => <span className="competition-table-label"><CompetitionPlatformBadge platform={competition.platform} /></span> },
    { key: "teams", label: "Teams", render: (competition) => <span className="competition-table-label">{competition.numberOfTeams}</span> },
    { key: "status", label: "Status", render: (competition) => <span className="competition-table-label"><CompetitionStatusBadge status={competition.status} /></span> },
    {
      key: "actions",
      label: "Actions",
      render: (competition) => <div className="competition-table-actions"><button type="button" className="competition-admin-action edit" onClick={() => openUpdateModal(competition)}>Edit</button><button type="button" className="competition-admin-action delete" onClick={() => openDeleteModal(competition)}>Delete</button></div>,
    },
  ];

  return (
    <>
      <AdminPageHeader eyebrow="COMPETITIONS" title="Competitions" description="Manage tournament formats, registrations, and schedules." />
      <section className="panel">
        <div className="admin-table-toolbar">
          <div className="admin-filter-field admin-search-field"><label htmlFor="competition-search">Search</label><input id="competition-search" type="search" placeholder="Name, season, format, or platform" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /></div>
          <div className="admin-filter-field"><label htmlFor="competition-status-filter">Status</label><select id="competition-status-filter" value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value as CompetitionStatus | "ALL"); setPage(1); }}><option value="ALL">All statuses</option>{(["DRAFT", "REGISTRATION_OPEN", "REGISTRATION_CLOSED", "ONGOING", "COMPLETED", "CANCELLED"] as CompetitionStatus[]).map((status) => <option key={status} value={status}>{status.replace(/_/g, " ")}</option>)}</select></div>
        </div>
        <AdminTable columns={columns} data={paginatedCompetitions} emptyMessage="No competitions match your filters." />
        <div className="admin-table-pagination"><span>{filteredCompetitions.length} competition{filteredCompetitions.length === 1 ? "" : "s"}</span><div><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={currentPage === 1}>Previous</button><span>Page {currentPage} of {pageCount}</span><button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={currentPage === pageCount}>Next</button></div></div>
      </section>
      <UpdateCompetitionModal onUpdate={(updated) => setCompetitions((current) => current.map((competition) => competition.id === updated.id ? updated : competition))} />
      <DeleteCompetitionModal onDelete={(id) => setCompetitions((current) => current.filter((competition) => competition.id !== id))} />
    </>
  );
}
