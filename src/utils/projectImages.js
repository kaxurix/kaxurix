// coverImage remains the main preview; images contains additional screenshots.
export function getProjectImages(project) {
  return [
    ...(project.coverImage
      ? [
          {
            src: project.coverImage,
            alt: project.imageAlt || `${project.title} screenshot`,
          },
        ]
      : []),
    ...(project.images || []),
  ];
}
