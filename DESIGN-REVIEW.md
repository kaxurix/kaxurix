# KAXURIX — second art-direction review

**Latest Work detail refinement:** Work pages now use a concise two-column composition, with title, description, date, URL, and stack beside a screenshot about 640px wide on desktop. Mobile stacks the image beneath the facts. Long case-study sections and disclaimer text are no longer displayed; existing notes remain in the data. Additional screenshots are supported through optional thumbnail navigation. Current verification is in `QA.md`; older notes below describe preceding stages.

**Latest user preference:** Work and Lab have returned to single horizontally scrolling rows, sharing the drag, swipe, button, and keyboard controls used by Life. Work retains browser frames, Lab retains pinned paper on its dark surface, and Life retains its rolling filmstrip and lightbox. The discussion of vertical showcases and research-wall positioning below describes a superseded stage. Current checks: 63 passed, one intentionally skipped desktop touch case; lint and build passed.

**Current collection refinement:** The repeated hanging-print carousels have been replaced by three distinct compositions. Work is a vertical product showcase with one featured browser frame and two offset supporting case studies. Lab is a dark research wall with broad, tall, and note-sized pinned sheets, contextual captions, honest status/date metadata, and recorded research notes when available. Life alone retains the film roll, with continuous rolling, mouse dragging, native touch momentum, keyboard navigation, and an immersive native-dialog story viewer. The viewer pauses rolling, contains keyboard focus, supports Escape and backdrop dismissal, and restores focus on close. Missing screenshots, photographs, dates, and notes remain explicitly unprovided. Desktop/mobile screenshots and the final 59 passing browser checks are documented in `QA.md`. Earlier sections below record previous stages and are superseded where they describe shared carousels.

**Life filmstrip update:** Life’s hanging photos have been replaced with a continuous dark filmstrip, with perforations above/below the image row and small amber sequence labels. Captions stay on the paper canvas beneath it. Photos and certificates retain their original colors and are contained inside landscape frames. The horizontal scroll controls and keyboard/touch behavior are preserved.

**Life/certificate update:** Certificates now belong to the existing Life gallery and detail routes. One clearly labeled certificate slot is ready for a real file and its metadata. Right Now has been removed from the homepage and About, including its data and unused styles; Life now leads directly into the footer. Earlier notes about Now below describe a previous design stage.

**Latest hero update:** Kautsar has supplied a real portrait, now displayed in the hero and About frame through a lightweight WebP. The hero uses “Hello i'm” above his full name, followed by “Websites, Apps, AI, and more.” The former role/location header is removed, and a restrained loop, lilac stroke, and ink rays sit behind the photograph. Earlier notes about the missing portrait below describe the preceding review stage.

**Subsequent user-directed update:** Kautsar supplied his Database Lab Assistant role at Informatika UNSOED and clarified that Lab represents project explorations such as POS and BBM tracking. The current implementation therefore supersedes the collage and logbook arrangements discussed below: the hero now has one personal-photo slot, and Work/Lab/Life use horizontal galleries with hanging print frames. Captions have been shortened; fuller descriptions remain on detail pages. These changes follow the user’s newer direction. Current verification is recorded in `QA.md`; the review below records the preceding refinement stage.

Reviewed the implemented editorial redesign against the original creative brief on 28 October 2026. This pass changes presentation and usability only: no new routes, features, dependencies, personal claims, or generated photographs.

## Critical assessment

The first redesign had a custom foundation: a clear palette, authentic Indonesian copy, a real project archive, and different Work/Lab/Life surfaces. It still leaned on familiar editorial-template cues. Oversized slogans overshadowed the person, important labels were microscopic, almost every section received another large heading, and invented-looking paper fragments made the collage feel styled rather than collected. The full acid-green footer and empty journal frames carried more visual weight than their content justified.

The more important issue was hierarchy. At 390px, the IT role was 7px while the portrait placeholder occupied much of a 949px hero. Empty photo slots looked as substantial as the genuine Catalyst entry. The site had personality in its words, but its presentation needed more editing.

## Ten improvements, ordered by impact

| Priority | Concrete problem | Implemented refinement |
| --- | --- | --- |
| 1. Identity hierarchy | The name was 16px on desktop and 14px on mobile; the role was 9px and 7px. | Name increased to 22px/20px, role to 14px/13px at 1440px/390px. The handle remains the masthead; the real person leads the introduction. Removed the name underline that suggested an unavailable link. |
| 2. Typographic composition | Tight tracking, tiny uppercase labels, and small body copy privileged the poster over reading. | Loosened display tracking, raised body and supporting type, gave metadata a consistent readable scale, and used sentence case for the role and archive note. Retained serif emphasis selectively. |
| 3. Curated collage | A generic curiosity badge, interests slip, fake browser dots, coordinates, crosses, and annotation competed with two actual content pieces. | Reduced the composition to the portrait slot, real Catalyst artifact, and a contextual “Belajar bareng” annotation. Added readable captions. Corrected the final card overlap with the lower hero rule. |
| 4. Editorial rhythm | Repeated label/large heading/body stacks created a predictable page cadence. | Rebuilt the Human section as a horizontal editorial spread, reduced Work’s headline scale, and turned Now into a compact three-column set of notes. Empty detail sections are shorter rows rather than large repeated blank sections. |
| 5. Selected work proportions | Oversized placeholder covers and repeated arrows delayed actual project information. | Tightened featured/supporting cover ratios, enlarged descriptions and technology labels, kept one link arrow on the project title, and removed decorative cover arrows and hover-arrow bubbles. |
| 6. Lab honesty and clarity | The same unpublished state appeared in every badge, a header, and a footnote, alongside another asterisk. | Kept one honest publication notice and a plain “Unpublished topics” index label. Removed repeated default badges, asterisk, redundant footnote, and decorative question marker. Real non-default statuses remain supported. |
| 7. Meaningful Life hierarchy | Two invented-looking photo slots rivaled the one genuine entry. | The real Catalyst story now dominates the diary. Reserved slots become smaller supporting entries, explicitly labeled unpublished before their titles. They retain existing routes without promising published stories. Removed meaningless photo-corner marks. |
| 8. Intentional responsive composition | The mobile hero was 949px tall; the portrait collage and tiny labels stretched the opening. Navigation was a tall single-column overlay. | Compressed the collage and simplified its overlap, kept comfortable action sizes, made the menu a compact two-column disclosure, and tuned phone/tablet/desktop proportions independently. Kept no-JavaScript navigation usable. |
| 9. A quieter conclusion | A full acid-green footer, oversized type, decorative motto, and large orbit competed with the rest of the site. | Replaced the green field with warm paper and a simple top rule. Reduced headline/orbit scale, removed the motto, enlarged the email and social links, and reserved green for the functional email action. |
| 10. Consistent interaction | Expanding text-link gaps moved surrounding content, while hover and keyboard feedback varied. | Link geometry stays fixed; only small arrows transform. Applied corresponding hover/focus treatments, shortened transitions to 180ms, retained clear focus indicators and reduced-motion support. No continuous animation or hidden entrance state. |

## Rendered evidence

Before and after screenshots are in `artifacts/review-before/` and `artifacts/review-after/`. These include the homepage at 320, 390, 820, and 1440 pixels; Work, Lab, Life, About, and a project detail at desktop and mobile sizes. Open-menu screenshots are also available at 320, 390, and 760 pixels.

| Measurement | Before | After |
| --- | --- | --- |
| Homepage height, 1440px viewport | 5968px | 5127px |
| Homepage height, 390px viewport | 6802px | 6454px |
| Hero height, 390px viewport | 949px | 810px |
| Name size, 390px viewport | 14px | 20px |
| IT role size, 390px viewport | 7px | 13px |

The page is shorter while meaningful reading text is larger. Hero-card clearance was also measured at 320, 390, 760, 1440, and 1920 pixels: the card clears the lower rule by 16–28px. The “More about me” link retained exactly the same bounding box before and after hover.

## Remaining limits

Work, Lab, and Life are visually distinct, but their content depth is not equal. The repository contains three real project summaries, one real Catalyst presentation, no experiment write-ups, and no personal photographs. A design pass cannot supply those missing facts. Portraits and unpublished slots remain clearly labeled; project challenges and outcomes remain undocumented. Real photos and first-person notes are the most valuable future content additions.

The result is more composed and less dependent on generic scrapbook decoration. Authentic personal material is still necessary to make the collage fully Kautsar’s own. See `CONTENT.md` for editing the existing content fields.
