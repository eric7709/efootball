export function CompetitionPlatformBadge({ platform }: { platform: string }) {
  return (
    <span
      className={`competition-platform-badge competition-platform-${platform.toLowerCase()}`}
    >
      {platform}
    </span>
  );
}
