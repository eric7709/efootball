"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/admin", label: "Overview", icon: "⌂", exact: true },
  { href: "/admin/competitions", label: "Competitions", icon: "◈" },
  { href: "/admin/teams", label: "Teams", icon: "♙" },
  { href: "/admin/matches", label: "Matches", icon: "◌" },
  { href: "/admin/reports", label: "Reports", icon: "▤" },
  { href: "/admin/notifications", label: "Notifications", icon: "◔" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-brand">
        <span className="admin-brand-mark">e</span>
        <span><strong>eFootball</strong><small>ADMIN CONSOLE</small></span>
      </Link>
      <nav className="admin-nav" aria-label="Admin navigation">
        <p>WORKSPACE</p>
        {navigation.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return <Link key={item.href} href={item.href} className={active ? "active" : ""}><span>{item.icon}</span>{item.label}</Link>;
        })}
      </nav>
      <div className="admin-sidebar-footer"><span className="admin-avatar">A</span><div><strong>Administrator</strong><small>Platform management</small></div></div>
    </aside>
  );
}
