"use client";

import type { ReactNode } from "react";

export interface AdminTableColumn<T> {
  key: string;
  label: string;
  render: (item: T) => ReactNode;
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  data: T[];
  emptyMessage?: string;
}

export function AdminTable<T extends { id: string }>({
  columns,
  data,
  emptyMessage = "No records found.",
}: AdminTableProps<T>) {
  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty-cell">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render(item)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
