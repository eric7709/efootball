import Link from "next/link";

export function AuthBrand() {
  return (
    <Link href="/" className="auth-brand" aria-label="eFootball home">
      <span className="home-brand-mark">e</span>
      <span>
        <strong>eFootball</strong>
        <small>COMPETITIVE PLATFORM</small>
      </span>
    </Link>
  );
}
