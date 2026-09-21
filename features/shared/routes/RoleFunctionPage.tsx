"use client";

import Link from "next/link";

export function RoleFunctionPage({
  role,
  entity,
  functionName,
  description,
}: {
  role: string;
  entity: string;
  functionName: string;
  description?: string;
}) {
  return (
    <main className="page">
      <Link href={`/${role}/dashboard`}>← Dashboard</Link>
      <p
        style={{
          color: "var(--primary)",
          fontWeight: 700,
          textTransform: "uppercase",
          marginTop: 24,
        }}
      >
        {role} · {entity}
      </p>
      <h1>{functionName}</h1>
      <p>
        {description ??
          `This route is the ${functionName} use case for the ${entity} feature.`}
      </p>
      <div className="panel" style={{ marginTop: 20 }}>
        <strong>Route ready</strong>
        <p style={{ marginBottom: 0 }}>
          This page is intentionally thin. The actual UI belongs to the feature
          function folder and should consume the entity React Query hooks.
        </p>
      </div>
    </main>
  );
}
