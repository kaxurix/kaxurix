export function compareNewest(a, b) {
  if (!a.date) return b.date ? 1 : 0;
  if (!b.date) return -1;
  return b.date.localeCompare(a.date);
}

// Sort a copy. Unknown dates stay last; ties retain the supplied order.
export function newestFirst(items) {
  return [...items].sort(compareNewest);
}
