"use client";

import { useState } from "react";

import { AdminPageHeader } from "@/features/shared/admin/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/features/shared/admin/AdminTable";
import { RowActions } from "@/features/shared/admin/RowActions";
import { teamsDummy } from "@/features/team/dummydata/team.dummy";
import { useTeamStore } from "@/features/team/store.team";
import { CreateTeamModal } from "../createTeam/CreateTeamModal";
import { DeleteTeamModal } from "../deleteTeam/DeleteTeamModal";
import { UpdateTeamModal } from "../updateTeam/UpdateTeamModal";

import type { Team } from "@/features/team/types.team";

export function TeamsAdminPage() {
  const [teams, setTeams] = useState(teamsDummy);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { openCreateModal, openUpdateModal, openDeleteModal } = useTeamStore();
  const filteredTeams = teams.filter((team) => [team.name, team.tag, team.country, team.region].filter(Boolean).join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(filteredTeams.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paginatedTeams = filteredTeams.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const columns: AdminTableColumn<Team>[] = [
    { key: "name", label: "Team", render: (team) => <><strong>{team.name}</strong><br /><small className="muted">{team.tag}</small></> },
    { key: "country", label: "Country", render: (team) => team.region ? `${team.country} · ${team.region}` : team.country },
    { key: "strength", label: "Strength", render: (team) => team.strength },
    { key: "actions", label: "Actions", render: (team) => <RowActions onEdit={() => openUpdateModal(team)} onDelete={() => openDeleteModal(team)} /> },
  ];
  return <><AdminPageHeader eyebrow="TEAMS" title="Teams" description="Create and manage competitive teams." actionLabel="Create team" onAction={openCreateModal} /><section className="panel"><div className="admin-table-toolbar"><div className="admin-filter-field"><label htmlFor="team-search">Search</label><input id="team-search" type="search" placeholder="Name, tag, country, or region" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /></div></div><AdminTable columns={columns} data={paginatedTeams} emptyMessage="No teams match your search." /><div className="admin-table-pagination"><span>{filteredTeams.length} team{filteredTeams.length === 1 ? "" : "s"}</span><div><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={currentPage === 1}>Previous</button><span>Page {currentPage} of {pageCount}</span><button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={currentPage === pageCount}>Next</button></div></div></section><CreateTeamModal onCreate={(team) => setTeams((current) => [...current, team])} /><UpdateTeamModal onUpdate={(updated) => setTeams((current) => current.map((team) => team.id === updated.id ? updated : team))} /><DeleteTeamModal onDelete={(id) => setTeams((current) => current.filter((team) => team.id !== id))} /></>;
}
