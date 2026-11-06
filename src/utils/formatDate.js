export function formatDate(date) {
  const monthOnly = /^\d{4}-\d{2}$/.test(date);
  return date
    ? new Intl.DateTimeFormat("en", {
        ...(monthOnly ? {} : { day: "numeric" }),
        month: monthOnly ? "long" : "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(date))
    : "Undated";
}
