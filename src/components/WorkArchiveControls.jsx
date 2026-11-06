export default function WorkArchiveControls({
  projects,
  technology,
  onTechnologyChange,
  order,
  onOrderChange,
  count,
}) {
  const technologies = [...new Set(projects.flatMap((project) => project.tags))];
  return (
    <div className="work-archive-controls">
      <fieldset className="archive-filters">
        <legend className="mono">FILTER BY STACK</legend>
        <div className="archive-filter-options">
          {["", ...technologies].map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={technology === tag}
              onClick={() => onTechnologyChange(tag)}
            >
              {tag || "All projects"}
              <span className="mono" aria-hidden="true">
                {String(
                  tag
                    ? projects.filter((project) => project.tags.includes(tag))
                        .length
                    : projects.length,
                ).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="archive-summary">
        <p className="mono" role="status" aria-live="polite" aria-atomic="true">
          {count} of {projects.length} projects
          {technology ? ` / ${technology}` : " / the full collection"}
        </p>
        <label className="archive-sort">
          <span className="mono">Sort by</span>
          <select
            value={order}
            onChange={(event) => onOrderChange(event.target.value)}
          >
            <option value="archive">Archive order</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
    </div>
  );
}
