export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatStat(value: number): string {
  if (value >= 1000) {
    return `${Math.floor(value / 1000)}K`;
  }
  return value.toString();
}
