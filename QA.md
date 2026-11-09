# Verification — distinct Work, Lab, and Life compositions

## Simplify Work and prepare SEO — 10 November 2026

Removed Work's stack filter and sort selector, their state, component and unused CSS. All five projects remain newest-first in the existing horizontal gallery; the homepage's featured project and supporting rail remain. Updated coverage for keyboard navigation, narrow screens and no-JavaScript use.

Added shared SEO generation for production prerendering and browser fallback: distinct descriptions and share titles, canonical URLs, robots directives, Open Graph/Twitter image metadata, and linked JSON-LD for Person, WebSite, pages, collections and breadcrumbs. The tab title stays exactly `Kautsar Rifqi Aditya`. All 19 routes contain metadata and content in the initial HTML. The 404 is noindex and omits canonical/schema; browser fallback removes inherited homepage metadata. Sitemap and robots use the same configured origin. Added a checked-in 1200 × 630 PNG social card, a local regeneration script, and `SEO.md` with domain and post-deployment instructions.

Lint, production build and `git diff --check` passed. Full desktop/mobile suite: **136 passed, four device-specific skips**. SEO checks read initial HTML for every public route, resolve graph references, verify collection membership, sitemap/robots and actual PNG dimensions, and check fallback/noindex metadata. Captured Work at 1440/390/320px under `artifacts/work-seo/`, with five projects and no document overflow; inspected desktop/mobile captures and the generated social card. Development server remains available at `http://127.0.0.1:5173`. No physical devices, deployed HTTP status behavior or search-engine indexing were verified. Nothing was deployed or submitted to Search Console.

## Warm, muted portrait treatment — 10 November 2026

Added a shared CSS filter to the actual portrait images in Hero and About: reduced saturation, a small sepia component, slightly softer contrast, and a small brightness lift. The original WebP files and transparency remain in use; technology logos and project/certificate images are outside the filter selectors. Changed only `src/refinements.css` for the UI.

Inspected before/after captures for both portrait placements at 1440/390px in `artifacts/portrait-grade/`. Computed styles confirm the same treatment on both images, existing source URLs, and no horizontal overflow. Lint, production build, and `git diff --check` passed. The application test suite was not rerun for this CSS-only color change. No physical phones were tested and nothing was deployed.

## Correct the About–Work boundary — 10 November 2026

The colored Work band inherited a zero top padding, leaving its label exactly on the color boundary on both desktop and mobile. Changed only `src/refinements.css`: About now uses a quieter neutral green (#eeefe9), its bottom padding is balanced at 72px/48px, and the homepage Work content starts 72px below the band edge on desktop and 48px on phones. Archive surfaces and existing section motion are unchanged.

Lint, build, and `git diff --check` passed. The focused editorial/section-navigation suite passed **15 checks with three device-specific skips**. Browser measurements at 1440/820/390/320px confirm the intended label inset, no section overlap, and no horizontal overflow. Inspected desktop/mobile boundary captures in `artifacts/about-work-boundary/`. The full suite and physical devices were not tested for this CSS correction. Nothing was deployed.

## Remove hero colophon and distinguish section surfaces — 9 November 2026

Removed the complete hero colophon containing “Based in Purwokerto, Indonesia” and “A little more about me”, including its unused CSS. Existing hero actions remain. Homepage About, Work, and Life now have full-width sage (#e4eadb), warm cream (#f5eee3), and ivory (#f0eee6) surfaces. Lab retains its dark green; the homepage footer uses a denser sage (#dfe5d6). Inner pages retain their existing surfaces. Muted text is darker on the two sage surfaces for legibility. These static color changes make section boundaries visible without adding scroll effects.

Changed `src/components/Sections.jsx`, `src/App.jsx`, and `src/refinements.css`. Lint, production build, and `git diff --check` passed. The focused desktop/mobile suite passed **35 checks with three device-specific skips**, covering section controls, natural touch scrolling, hero alignment/face clearance, stable content, reduced motion, project links, and existing no-JavaScript content. Captured and inspected the full homepage at 1440/820/390/320px under `artifacts/editorial/`; no horizontal overflow was measured. An additional 1920px check confirms all five colored surfaces span the viewport and the removed row is absent. The full suite was not rerun for this bounded presentation change. No physical phones were tested and nothing was deployed.

## Retain original direction, simplify tab identity, align portrait — 9 November 2026

Continued the existing warm/olive React/Vite design after the user chose it over the separate direction study. Browser titles now read only `Kautsar Rifqi Aditya` on every route, both during client rendering and in prerendered HTML. Open Graph site identity uses the same name. The tab icon is a simple cream K on an ink square, replacing the neon asterisk; the favicon URL is versioned to refresh cached icons. Header/footer branding and contact URLs remain as before.

Raised the portrait from a 44px top inset to 10px and tied its bottom edge to the backdrop's 7% inset. This lifts it roughly 34px and aligns the bottom across responsive sizes; the contact shadow follows the same baseline. Existing logo count, face clearance, and automatic cadence remain intact. Heading introductions are now opacity-only over 480ms. Desktop section-button journeys use a shorter 0.95–1.4-second duration with a longer deceleration; native mobile touch behavior is preserved.

Lint, production build, and `git diff --check` passed. The full Chrome suite passed **132 checks with four device-specific skips**, including every route's exact browser title, portrait/background alignment at 1440/820/390/320px, face clearance, gentle section-button movement, touch scrolling, lightbox/zoom, responsive layout, and no-JavaScript access. Inspected the icon at 16/32/64px (`artifacts/name-and-portrait/favicon.png`) and refreshed hero captures under `artifacts/editorial/`. No horizontal overflow was measured. Physical phones were not tested. Build: JS 278.36 kB (85.56 kB gzip), CSS 66.49 kB (13.72 kB gzip). Nothing was deployed.

## Remove disruptive transitions after visual feedback — 9 November 2026

Removed the previous section choreography after the user rejected its visual result. Re-entry no longer restarts section content, wipes/clip masks are gone, Lab cards stay aligned, and project screenshots no longer morph across documents. Life uses its direct native-dialog opening/closing again. Deleted `src/scene-motion.css` and `src/utils/imageTransition.js` and removed their names, flags, imports, and startup handling. The module entry and rendering path are restored to their ordinary behavior.

The existing editorial layout and native mobile scroll fix are retained. Only section headings get a short, once-only 12px/360ms introduction starting at 0.7 opacity; images, body text, and controls stay at their actual positions and fully opaque. There is no scroll-driven animation loop. Hero text enters as one unit without a line mask or multiple delays, and the dialog uses a short opacity-only entrance. Reduced motion and keyboard focus cancel heading introductions immediately.

Lint, build, and `git diff --check` passed. The focused desktop/mobile suite passed **40 checks with four device-specific skips** across editorial regression coverage, galleries, section navigation, mobile touch, hero behavior, and photo zoom. New regressions check rapid scrolling in both directions without image transforms or clipping, no repeat heading animation, reduced-motion cancellation, and photo opening without calling the document-transition API. The full suite was not rerun for this correction. Inspected Work and Lab just 50ms after section entry at 1440/390px; content is intact and no horizontal overflow was measured. Captures are in `artifacts/motion-correction/`. Build: JS 278.23 kB (85.57 kB gzip), CSS 66.38 kB (13.68 kB gzip). No physical phones were tested and nothing was deployed.

## Section scenes and continuous image transitions — 9 November 2026 (superseded)

Implemented the approved motion direction in the existing React/Vite app. Every homepage landmark now has timed choreography when entering from either scroll direction: masked text in About, an image/copy sequence in Work, staggered sheets in Lab, a filmstrip reveal in Life, and a staggered Contact entrance. Returning to Home also introduces its composition again. Section-label rules draw in with their scene. These sequences replay on re-entry; they replace the preceding once-only reveal policy.

The scroll listener schedules one measurement per animation frame and changes animation state only when crossing a section boundary. It does not drive element positions from scroll progress, snap sections, pin the page, or change the existing native mobile touch behavior. Reduced-motion changes cancel active animations and immediately restore visible content. Focusing a control cancels a reveal that would obscure it. Leaving a scene or hiding the tab cancels unfinished section animations.

Work screenshots now share native cross-document transition names with their detail screenshots, preserving ordinary links and browser history. Critical transition opt-in is available before the first frame in `index.html`; the development entry renders synchronously so its destination snapshot contains the actual page. Life images travel from the selected film frame into the native dialog and back on close. The image helper supports interruption and falls back to a normal update without the API, for reduced motion, or for an oversized zoomed image. A capture-phase outside-pointer handler preserves backdrop dismissal while Chromium retargets clicks to the transition root. Keyboard focus restoration, Escape, image zoom/pan, and story navigation remain available.

Implementation references: [MDN's View Transitions guide](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using), [`startViewTransition`](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition), and [render-blocking script semantics](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script). Unsupported cross-document transitions retain native navigation. No new design reference or dependency was added in this pass.

Primary changes: `src/hooks/useEditorialMotion.js`, `src/scene-motion.css`, `src/utils/imageTransition.js`, `src/components/LifeFilm.jsx`, `src/components/StoryLightbox.jsx`, `src/components/Visuals.jsx`, `src/components/ProjectGallery.jsx`, `src/main.jsx`, and `index.html`. Regression coverage is in `tests/editorial.spec.js`; the Lab row-geometry assertion in `tests/collections.spec.js` now waits for entrance motion to settle before measuring alignment.

Lint, production build, and `git diff --check` passed. The final full browser suite passed **134 checks with four device-specific skips**. Coverage includes every homepage section in both directions, replay and reduced-motion cancellation, a real project image-group morph and browser history, interrupted dialog closing, outside dismissal, API-unavailable fallback, touch scrolling, zoom/pan, keyboard navigation, all routes, responsive geometry, and no-JavaScript content. Build: 19 pages plus 404/sitemap/robots; JS 282.02 kB (86.58 kB gzip), CSS 68.10 kB (14.05 kB gzip).

Inspected entry/settled frames at 1440 and 390 px in `artifacts/scene-motion/`; reproduce with `node artifacts/capture-scene-motion.mjs http://127.0.0.1:5173`. The saved observations confirm actual native image-group geometry changes for both Life and project navigation in desktop/mobile Chrome, with no page errors in the final local capture. Video recording was unavailable because Playwright's ffmpeg binary is absent; entry and settled screenshots plus recorded animation keyframes were used instead. Physical phones and other browser engines were not tested. Nothing was deployed.

## Editorial composition and coordinated motion — 9 November 2026

Applied the approved reference direction to the existing React/Vite portfolio: warm paper and olive surfaces, stronger headline hierarchy, a larger portrait with a quiet arched backdrop, and a location/scroll colophon. The ten technology marks retain their existing automatic cadence, hover behavior, and face clearance. Background grid and pointer lighting are quieter.

The homepage now presents its newest Work project, Ngudi Laras, as a large screenshot beside concise project facts. The other four projects follow in the existing keyboard-accessible horizontal gallery. The complete Work archive retains all five projects, filtering, sorting, and its scrolling row. Original project images, descriptions, ordering, links, and the Life filmstrip remain in use.

Headline lines enter in a short stagger. An IntersectionObserver reveals selected compositions once, with cancellation when reduced motion is enabled and visible content when JavaScript is unavailable. Project images gain a small hover/focus zoom; controls gain press feedback; the story dialog has a brief scale/translate entrance. Native mobile touch scrolling from the preceding fix is preserved. No package was added.

References: [Dennis Snellenberg](https://dennissnellenberg.com/) for portrait/type hierarchy, [Studio Freight](https://studiofreight.com/) for image composition, [Rauno Craft](https://rauno.me/craft) and [Emil Kowalski](https://emilkowal.ski/ui/good-vs-great-animations) for interaction precision, and the targeted [21st Text Reveal](https://docs.21st.dev/@cnippet-dev/components/text-reveal) reference for headline sequencing. Source screenshots and original motion samples are in `artifacts/premium-references/`. External component source was not copied.

Changed `src/components/Sections.jsx`, `src/refinements.css`, `src/hero-portrait.css`, and `src/ambient.css`; added `src/hooks/useEditorialMotion.js`, connected it in `src/App.jsx`, and added `tests/editorial.spec.js`.

Lint, production build, and `git diff --check` passed. The full existing browser suite passed **124 tests with four device-specific skips**; the four new desktop/mobile feature and reveal tests also passed, for **128 passing checks and four skips**. These cover prominent-project navigation, supporting-gallery keyboard controls, reveal cancellation and no replay, existing routes/assets, responsive layouts, portrait behavior, touch scrolling, lightbox/zoom, and no-JavaScript content. Build: 19 prerendered pages plus 404/sitemap/robots; JS 277.99 kB (85.50 kB gzip), CSS 66.89 kB (13.79 kB gzip).

Inspected hero and featured-project captures at 1440, 820, 390, and 320 px, plus Work/Life at desktop and mobile widths. No horizontal overflow was measured. Captures: `artifacts/editorial/{width}-{hero,featured,home}.png`; reproduce with `node artifacts/capture-editorial.mjs`. Browser checks use Chrome emulation, not physical phones. Local development server: http://127.0.0.1:5173/. Nothing was deployed.

## Compact About, paired history, cropped ISC, newest-first content — 6 November 2026

Shortened About to one introductory paragraph and reduced its straight portrait frame to 360px on desktop / 280px on phones. Education and Activities use two equal desktop columns and stack below 760px, sharing one Background stop in section navigation. This pass retains the existing React/Vite visual system without external component inspiration.

Work defaults to newest first on home and archive; the explicit Archive order option retains source order. Life starts with ISC (5 October 2026), followed by Ruijie, BNSP Software Development, BNSP Telecommunications, Oracle, and the undated GitHub story. Unknown dates sort last; ties retain source order. Detail/lightbox navigation follows the same chronology, without mutating raw arrays. Lab order is unchanged.

ISC's regenerated preview is 1600×1067 (181658 bytes). The 3:2 crop removes the scanner footer while retaining certificate text and signatures. The linked 446634-byte original PDF is unchanged. Regenerate with `node scripts/prepare-isc-certificate.mjs`.

Lint, build, and `git diff --check` passed. The full production browser run passed 120 checks with four device-specific skips. Four tests failed because one still expected the previous first Work project and a new detail assertion used the wrong accessible link name. After updating those expectations, the focused desktop/mobile rerun passed all four: **124 passing checks in total, four skips**. Coverage includes default order on home/archive, detail navigation, About column geometry/copy/photo bounds, certificate image ratio/decode/metadata/PDF bytes, no-JavaScript output, keyboard/lightbox/zoom, all routes, and existing hero behavior. A Windows sandbox access error during Vite preview startup required an approved retry.

Inspected About at 1440/820/390/320px and cropped ISC film/lightbox screenshots. No horizontal overflow was measured. Captures: `artifacts/about-refined-{width}.png`, `artifacts/isc-frame-cropped-{width}.png`, `artifacts/isc-lightbox-cropped-{width}.png`, plus refreshed desktop/mobile pages under `artifacts/review-after/`. Build: 19 pages plus 404/sitemap/robots, JS 276.65kB (85.01kB gzip), CSS 63.59kB (13.19kB gzip). Physical devices were not tested. Nothing was deployed.

## Restore slower cadence, add ISC certificate, separate About history — 6 November 2026

Restored the previous 7–11.4-second logo cycles and phase offsets while retaining current movement range, Go/MySQL marks, lighting, hover effects, and the absence of controls. About now separates Education (the two schools) from Activities & experience (Database Lab Assistant and Staff Software Development at Catalyst, UNSOED). Removed the Catalyst GitHub weekly-meet link in About. Its existing Life story and global contact links remain unchanged. The two About sections reuse existing typography/list styling; the section navigator follows their separate landmarks.

Added the newly supplied scanned `sertif isc kautsar.pdf` to Life as “ISC — Database Speaker” at `/life/isc-database-speaker`. Read the actual rendered certificate: pemateri, Informatics Study Club, Basis Data — Teknik Komputer, 5 October 2026, HMIF UNSOED, ID 329/STF/PB/ISC/HMIF/X/2026. `pdftotext` yielded no text layer, so the metadata was transcribed from the image. The untouched 446634-byte PDF remains linked; Poppler and browser encoding produced the full 1600×1131, 178552-byte WebP. The entry is appended to preserve existing story order. Life now contains six entries. No professional certification or additional achievement was inferred from this speaker certificate.

Lint, production build, and `git diff --check` passed. **122 tests passed, 4 device-specific skips** in the full production browser suite. Checks include separated About content, exact supplied Catalyst role and removal of its old link, original footer contact, new certificate date/issuer/ID/PDF bytes/MIME, Life dialog opening/closing/focus restoration, direct detail route, no-JavaScript navigation, restored 7–11.4-second cadence with actual motion, all routes/assets, galleries, zoom, responsive layouts, and section navigation. Build now prerenders 19 pages plus 404/sitemap/robots; JS is 276.96kB (85.09kB gzip), CSS 62.42kB (13.00kB gzip).

Inspected desktop/mobile About captures under `artifacts/review-after/` and the certificate viewer in `artifacts/isc-lightbox-{desktop,mobile,narrow}.png`; detail captures use `artifacts/isc-detail-{desktop,mobile,narrow}.png`. No overflow was measured at 1440/390/320px for the new detail page; existing suite checks cover additional widths. Browser checks use Chrome emulation, not physical phones. Local preview remains on port 5173; nothing was deployed.

## Make idle animation visibly apparent — 6 November 2026

Investigated the report that no animation was visible. The local browser showed running Web Animations with advancing times and changing rendered bounds, but only about 8px of travel over 1.6 seconds for a sampled foreground mark. Increased automatic drift to 14px for rear marks and 26px for foreground marks, with 12px for bottom marks to preserve edge clearance, 8px lateral sway, and shorter 4.6–7-second cycles. Only `usePortraitMotion.js` changed in the UI source; layout, photograph size, logos, hover, and reduced-motion support are preserved.

Lint, build, and **12 desktop/mobile photograph checks passed**. A new rendered-bounds check waits for the entrance to finish, keeps the pointer outside the photo, then verifies that at least one logo visibly travels more than 12px over 1.1 seconds. It passed on both desktop and mobile. Existing face clearance, original copy/layout, hover, offscreen suspension, and reduced-motion checks passed. Verified on the local preview at port 5173; nothing was deployed.

## Go/MySQL and stronger photographic motion — 6 November 2026

Replaced the Node.js and Tailwind marks with Go's wordmark and MySQL's dolphin, using local original Devicon SVGs. The count remains ten and there are still no animation controls. The rest of the hero remains unchanged. Source-hash comparison again confirms that only `HeroPortrait.jsx`, `usePortraitMotion.js`, and `hero-portrait.css` changed among UI source files; no dependency or external component reference was added.

Strengthened the treatment within the photograph scene: staggered outward entrance from closer to the portrait, blur-to-sharp settling, 7–11px vertical drift on 7–11.4-second loops, deeper opposing parallax (-9px to +18px), stronger hover lift/scale/glow, and a diffuse moving cyan/sand light behind the portrait. The original photograph geometry, restrained 5px/3px pointer movement, original hero layout/type/copy, and clear face area remain intact. Hover hold, reduced motion, offscreen suspension, hidden-tab suspension, and no-JavaScript access remain supported.

Lint, production build, and `git diff --check` passed. **22 focused desktop/mobile checks passed in one run**, including decoded Go/MySQL marks and absence of Node/Tailwind, ten-logo count, no controls, unchanged page geometry, face clearance and containment at four widths, hover/phase behavior, offscreen/reduced motion, homepage assets, navigation, narrow layouts, and prerendered content without JavaScript. Inspected fresh desktop/mobile and hover-detail screenshots under `artifacts/hero-satellites/`; captures at 1440/820/390/320px had no page overflow. Browser checks use Chrome emulation, not physical phones. Build output: 275.81kB JS (84.84kB gzip), 62.39kB CSS (12.99kB gzip), 18 pages plus 404/sitemap/robots. Local preview responds on port 5173; no deployment was performed.

## Ten larger marks, hover effects, and no controls — 6 November 2026

Increased the original marks by about 20–30% and added JavaScript, Node.js, Git, and Python from the existing README. The ten marks use 32–46px desktop sizes and a 30px phone minimum, with responsive placement in the existing photograph scene. The photograph, hero copy, layout, type, and shared backgrounds are unchanged. Before/after source hashes again identify exactly three changed UI files: `HeroPortrait.jsx`, `usePortraitMotion.js`, and `hero-portrait.css`. Added four local Devicon SVGs; no dependency was added.

Removed the start/pause control, its state, and its CSS. Added a staggered focus-in appearance, slightly stronger shadows, independent 4–6px drift with gentle lateral/tilt movement, and a small hover lift/scale plus low-opacity brand-color glow. Hover freezes the targeted mark's phase; pointer exit resumes it. Offscreen/hidden-tab and reduced-motion behavior is preserved. No cards, extra captions, paths, or 3D renderer were introduced. Implementation remains React/Vite using the approved composition, without external component inspiration.

Lint, build, and `git diff --check` passed. The 22 focused desktop/mobile checks cover all ten decoded marks, a 30px minimum, absence of scene buttons, face clearance and containment at four widths, unchanged geometry of the rest of the page, pointer/hover behavior, hidden/offscreen and reduced-motion suspension, homepage assets, no-JavaScript content, navigation, and narrow layouts. The first run passed 21 checks; the desktop hover check targeted a rear logo under the photo's hit area. It was corrected to target a visible foreground mark and assert actual hover scale. The final desktop/mobile motion rerun passed both checks, resolving the remaining case. No application changes were needed after the build. Physical devices were not tested.

Fresh static, moving, and hover-detail images were inspected in `artifacts/hero-satellites/`. No page overflow was measured at 1440/820/390/320px. Production output: 275.62kB JS (84.78kB gzip), 61.69kB CSS (12.83kB gzip), 18 pages plus 404/sitemap/robots. Preview remains on port 5173; no deployment was performed.

## Asymmetric logo satellites; photograph-only scope — 6 November 2026

Implemented the brainstorm direction Kautsar approved: six original SVG marks arranged asymmetrically around the existing cutout, with small independent drifting motion and layered pointer response. Foreground and rear layers retain the photograph as the focal point. The marks are React, Next.js, Laravel, Vue.js, Tailwind CSS, and PostgreSQL, in 24–38px presentations; no cards, captions, text labels, connecting lines, or drawn orbit were added. Devicon originals and their license are hosted locally. The small icon-only animation control appears on hover/focus and is available on touch. Reduced motion/no-JavaScript show static arrangements; offscreen/hidden tabs pause drift, and pause/resume preserves phase.

Source hashes taken before and after implementation confirm that only **three UI source files** changed: `HeroPortrait.jsx`, `usePortraitMotion.js`, and `hero-portrait.css`. All other `src/` files are byte-for-byte unchanged, including the hero's copy/layout/type, shared backgrounds, navigation, and Work/Lab/Life/About components. No dependency was added. All new visual styles are scoped to the existing photograph scene, which retains its prior size and placement.

Lint, build, and `git diff --check` passed. Final photograph suite: **10 passed** across desktop/mobile. Checks include exactly six decoded SVGs, empty visible text content, logo containment and face clearance at 1440/820/390/320px, unchanged header/hero/photo/collections/footer geometry when marks are hidden, original type/copy/actions, bounded pointer motion, phase-preserving keyboard pause/resume, offscreen suspension, and reduced motion. The initial full suite passed the existing **108 checks**, with 4 device-specific skips; four new cases initially failed because their test locators stopped matching after deliberately hiding the list or changing Pause to Resume. The selectors were corrected; all ten photograph cases then passed. Physical devices were not tested.

Static and moving screenshots were inspected under `artifacts/hero-satellites/`, including tablet adjustments to keep the rear Tailwind mark partially visible. No page overflow was measured at any captured width. Build output: 274.96kB JS (84.49kB gzip), 61.43kB CSS (12.76kB gzip), 18 pages plus 404/sitemap/robots. Preview remains on port 5173; no deployment was performed. Earlier entries below record preceding iterations.

## Restore original hero; refine only the photograph — 6 November 2026

Restored the hero preceding the user's redesign request: full name and role, “Thoughtful work. Built for the web.” heading, original description and CTA pair, type scale, layout, visible grid/gradient background, and original copy entry animation. The subsequent oversized-name composition and the background-quieting overlay are gone. Work, Lab, Life, and About layouts were not changed in this pass.

The portrait now uses the supplied transparent WebP in `HeroPortrait.jsx`, positioned within the original photograph column, with a short bottom fade and quiet contact shadow. The photograph area has no text, frame, geometric backdrop, or logo orbit. `hero-portrait.css` styles only that area. `usePortraitMotion.js` limits pointer response to 5px/3px translation and at most two degrees of tilt; pointer exit returns it to rest. Frames stop once settled and for offscreen/hidden content. Touch and reduced motion are static. Three.js, its renderer/orbit code, added tech assets, and the extra control were removed. No external design references were used; the existing React/Vite composition is the reference.

Lint, build, and `git diff --check` passed. Full production suite: **108 passed, 4 device-specific skips**. Six photograph checks verify restored copy, original 22px/21px name sizes, exactly two hero links, no canvas/logos/photo text, real image decoding, bounded pointer motion, unchanged heading position during interaction, return to rest, and reduced-motion/offscreen behavior. All route, keyboard/navigation, no-JavaScript, collection, lightbox/zoom, and scrolling checks passed. Build output: 272.68kB JS (83.69kB gzip), 59.84kB CSS (12.46kB gzip), 18 pages plus 404/sitemap/robots; the separate 3D chunk is absent.

Fresh screenshots at 1440/820/390/320px are under `artifacts/hero-restored/`; desktop/mobile were visually checked against the original hero screenshot. The left-column content and original layout are restored, while only the photograph treatment changes. No overflow was measured. Checks use Chrome emulation, not physical phones. The following sections describe superseded iterations.

## Smaller portrait, restrained type, and solid 3D marks — 6 November 2026

Revised the hero after Kautsar rejected the oversized name/photo, long description, badge cards, and annotations. The name now caps at 64px (48px on phones; 44px at narrow widths), with a smaller 24px greeting. The portrait occupies about 310px of a 480px desktop scene rather than the preceding oversized composition. Copy is shortened to “Websites, apps, AI, and more.” The hero surface quiets the background grid. The photograph area has no visible text, badges, drawn orbit lines, caption, number labels, or motion-control text. The icon-only pause button sits beside the text CTAs.

Three.js 0.187.0 now renders actual extruded SVG geometry with bevels, separately shaded edges, physical materials, studio environment lighting, and a perspective camera. Eight logo objects follow one inclined circular path in 3D, passing before/behind the alpha-masked portrait. Pointer movement adjusts the ring and light position. The portrait material preserves the supplied photograph without lighting or tone-map changes. The source silhouettes are local Simple Icons assets with their CC0 license; colored Devicon marks remain in the HTML fallback. No external component inspiration was used. The framework remains React/Vite.

`createTechScene.js` is loaded only for the homepage hero through a dynamic import: 598.80kB (154.61kB gzip), separate from the 276.50kB (85.30kB gzip) application entry. Renderer pixel density caps at 1.75. Pause/resume preserves the same GPU scene, time, and pointer position. Offscreen/hidden-page animation stops; reduced motion renders a static scene. WebGL unavailability or context loss exposes the icon-only HTML fallback. Geometry, materials, textures, environment maps, renderer resources, and observers are disposed on unmount.

Lint, production build (18 pages plus 404/sitemap/robots), and `git diff --check` passed. Final focused hero suite: **8 passed** across desktop and mobile. It verifies real changing canvas output, identical paused canvas output, resume, pointer response, the empty text content of the photo area, smaller type/photo bounds, transparent image pixels, local assets, WebGL-disabled fallback, offscreen suspension, and dynamic reduced motion. Snapshot comparisons hide the independently animated background so it cannot change pixels beneath the transparent canvas. The broader run passed all **68 non-hero checks** covering routes, assets, overflow, keyboard/navigation, reduced motion, no-JavaScript output, recovery routes, and gallery controls. Two earlier hero checks were resolved before the final eight-check run.

Inspected fresh WebGL screenshots at 1440/820/390/320px and a moving desktop state in `artifacts/hero-orbit/`. No page overflow was measured; phone checks use Chrome emulation, not physical devices. Preview remains at http://127.0.0.1:5173 (HTTP 200). No deployment was performed. The following entries describe preceding designs.

## Portrait and dimensional tech orbit — 6 November 2026

Rebuilt the homepage hero around Kautsar's supplied transparent `erasebg-transformed.png`. The original 13,958,605-byte PNG is untouched. `scripts/prepare-hero-portrait.mjs` removes only fully transparent outer margins, resizes, and encodes a 1000×1921 WebP (203,896 bytes), retaining the supplied alpha and photograph. About continues using the existing portrait. Removed the old paper frame, arch, hatched panel, doodle component, and obsolete portrait parallax.

The React/Vite implementation uses the existing paper/olive palette and local typefaces, with a larger personal greeting and name. Eight locally hosted Devicon marks (React, Laravel, Next.js, PostgreSQL, Vue.js, Python, Tailwind CSS, Git) travel along two inclined elliptical paths with 36/46-second periods, depth-based scale/opacity and front/back layering around the portrait. Nearby badges on the same side share a small separation displacement at path crossings. Pointer tilt uses eased interpolation; the portrait and text enter in stages. No component inspiration or new runtime dependency was used. Devicon's license and source are included under `public/icons/tech/`.

The requestAnimationFrame controller writes transforms directly, stops offscreen and in hidden documents, and preserves phase/tilt on pause. Reduced motion shows a static arrangement and removes the pause control; no-JavaScript output contains the portrait, stack list, and static orbital positions. Mobile retains orbital movement with smaller marks and no pointer tilt.

Lint and production build passed (18 pages plus 404/sitemap/robots). The full browser run initially reported **106 passed, 4 device-specific skips, 2 failures** because recovery-page checks still expected the previous heading. Those expectations were updated; the final focused run passed **6 hero checks and 4 recovery/no-JavaScript checks** across desktop/mobile. The hero checks verify actual alpha values, optimized asset size, decoded icons, changing transforms, front/back layers, phase-preserving pause/resume, pointer response, offscreen suspension, and dynamic reduced motion. Earlier full-run route, gallery, zoom, keyboard, and narrow-layout checks passed. Physical devices were not tested.

Captured and inspected 1440/820/390/320px layouts and a moving desktop composition under `artifacts/hero-orbit/`; no page overflow was measured at those widths. `scripts/capture-hero.mjs` reproduces those screenshots. Local preview is available at http://127.0.0.1:5173; no deployment was performed.

## Mobile navigation refinement — 6 November 2026

Refined the existing React/Vite header using the ui-design skill. The paper/olive palette, local typography, and Life filmstrip remain the design direction; no external component inspiration was needed. Mobile navigation now has full-width link targets, an olive current-page surface, an inset focus outline, and a bounded scrollable panel for short viewports. The menu closes when keyboard focus leaves the header and resets when crossing the 760px breakpoint. Focus transfers to the toggle or the active desktop link when responsive CSS hides the previously focused control. Menu scrolling bypasses Lenis; no-JavaScript navigation remains expanded and unbounded.

Three regression scenarios reproduced the prior defects before implementation. Final production suite: **102 passed, 4 device-specific skips**, including six new desktop/mobile navigation checks. Lint, production build (18 pages plus 404/sitemap/robots), and `git diff --check` passed. Inspected `artifacts/navigation-desktop.png` at 390×844 and `artifacts/navigation-short-desktop.png` at 568×240. Checks include contact access from the short panel, keyboard focus leaving the header, and repeated breakpoint changes. Existing no-JavaScript navigation, reduced motion, galleries, zoom, routes, and narrow layouts passed. These are Chrome desktop/mobile emulation checks, not physical-device testing. Development preview is available at http://127.0.0.1:5173 (HTTP 200); no deployment was performed.

## More responsive mobile scroll and full Life frames — 2 November 2026

Adjusted mobile scrolling to a 0.9 wheel multiplier, 0.1 interpolation, 1:1 finger movement, and a moderate 1.4 inertia exponent. Life film previews now fill their frames with `cover`. The opened viewer preserves the full image and offers a 2.5x Zoom/Fit toggle with mouse dragging, touch panning, scrollbars, and keyboard arrow panning. Switching stories resets zoom. Original certificate links and close/focus behavior remain intact.

Build and lint passed. Focused browser suite: **15 passed, 1 device-specific skip**. Both desktop/mobile zoom checks passed again after adding an actual emulated touch-pan check. Verified crop/contain modes, zoom size, mouse/touch/keyboard panning, no dialog overflow, reset on story change, focus return, mobile scrolling, and reduced motion. Inspected desktop Life and both zoomed modal screenshots. Captures at 1440/820/390/320px have no page overflow. Dev server remains active on port 5173 (HTTP 200).

## Mobile scroll speed — 2 November 2026

Removed the viewport restriction that disabled Lenis on phones. Mobile uses gentler wheel interpolation with a 0.7 multiplier, synchronized touch at 0.85 movement, and a reduced inertia exponent of 1.25. The smoother reconfigures on breakpoint changes; reduced motion still disables it. Horizontal gestures, multi-touch zoom, and Shift+wheel bypass smoothing. Section controls remain hidden below 761px.

Build and lint passed. Focused browser suite: **18 passed, 4 device-specific skips**. Verified desktop-to-mobile resizing retains smoothing and lowers wheel travel. Chrome touch emulation verified bounded vertical momentum, horizontal Lab swipes without page drift, vertical scrolling over the gallery, reduced motion, and Life dialogs. These checks use emulation, not a physical phone. Development server remains active on port 5173 (HTTP 200).

## Softer section-button movement — 2 November 2026

Replaced the section buttons' fast-start easing with a symmetric sine ease-in/out. Duration now follows the actual clamped travel distance (1–1.65 seconds), so longer jumps have more time to settle and footer targets stay within the scroll range. Wheel scrolling and reduced-motion behavior are unchanged. Build and lint passed; the section-navigation suite passed 6 checks with 2 mobile-only skips. A frame-sampling browser check verifies that early movement stays gradual, motion continues through the middle, and the destination is reached accurately. Development server remains active on port 5173.

## Smooth scrolling and section controls — 2 November 2026

Added Lenis 1.3.27 for mouse-wheel smoothing and eased section jumps above 760px, with native touch and reduced-motion fallbacks. A frosted panel tracks the current section and provides keyboard-accessible previous/next controls across homepage and inner pages. It hides on mobile and behind Life dialogs; boundary buttons disable correctly. Dialog opening stops the smoother and closing resumes it. Added footer clearance and corrected an existing JSX icon lint warning in project pagination without changing its output.

`npm.cmd run build` and `npm.cmd run lint` passed. Full production browser suite: **92 passed, 2 device-specific skips**. New checks cover section order, active position after manual scroll, keyboard use, viewport changes, smooth wheel/section jumps, reduced motion changes, and Life dialog scroll isolation. Existing routes, prerendering, no-JavaScript access, gallery controls, touch gestures, and navigation passed. Captured 1440/820/390/320px views without overflow; inspected desktop/tablet panels. Dev server remains active at http://127.0.0.1:5173 (HTTP 200).

## Grid hover glow — 2 November 2026

Added a softly blurred sage glow behind the sharper cursor-following grid lines. Both layers fade out on pointer exit and stay disabled for touch/reduced motion. The resting grid and readable Work card surfaces are unchanged. Production build and 8 focused desktop/mobile checks passed. Inspected `artifacts/review-after/grid-hover.png`; the browser probe confirmed highlight opacity 1 on hover and 0 after leaving. Dev server remains on port 5173.

## Complete Work cards and softer grid — 2 November 2026

Work now encloses each browser preview, heading, description, metadata, and project link in one rounded card. A high-opacity frosted surface uses 14px backdrop blur, with a solid fallback for browsers without support. Hover moves the whole card; image links retain an inset keyboard focus outline. Copy padding and darker metadata improve readability. Background grid and gradient opacity are reduced while preserving the pointer highlight and existing collection structure.

Build passed (18 pages plus 404); 16 focused desktop/mobile browser checks passed for Work routes, filtering, keyboard/rail controls, background behavior, reduced motion, and narrow layouts. Inspected desktop/mobile Work and desktop hero captures; 1440/820/390/320px captures have no horizontal page overflow. The development server remains on port 5173.

## Square grid and calmer Lab — 2 November 2026

Removed the dotted background. A visible square grid sits over the existing gradients, with matching lines strengthened around the mouse and a fade when the pointer leaves. Touch and reduced-motion views remain static. Lab cards now use a softer paper surface, subtle rounding, consistent spacing, uncropped 16:9 previews, and quieter section lines. Decorative pins and unknown-date labels are removed. The three projects, descriptions, horizontal rail, links, and detail routes are preserved.

Production build passed (18 pages plus 404). All 20 focused desktop/mobile checks passed, covering background behavior, reduced motion, Lab routes and assets, collection links, rail controls, and narrow layouts. Captured 1440/820/390/320px views without page overflow and inspected desktop/mobile Lab and the hero. Development server remains active at http://127.0.0.1:5173 (HTTP 200).

## Earlier background composition — 2 November 2026

Increased dot/grid definition and added sage/sand gradients. Replaced the portrait's orbit lines with a softly graded arch and a hatched rectangular panel; straightened the photo frame. Gentle mouse parallax remains, with static touch/reduced-motion behavior. Copy and layout are preserved. Build passed; 8 focused desktop/mobile checks passed for pointer response, reduced motion, controls, and narrow layouts. Captured 1440/820/390/320px views with no horizontal overflow and visually inspected the desktop/mobile hero. Server remains active on port 5173.

## Interactive background — 2 November 2026

Added a decorative drafting-paper surface with faint dots, a local grid reveal that follows the mouse, and softly responsive orbit lines behind the hero portrait. Lab uses a subtle grid; the footer uses concentric line details. Copy and collection structure are preserved. The decoration does not capture clicks or appear in the accessibility tree. Touch/coarse input and reduced motion disable the cursor effect; requestAnimationFrame work stops when movement settles and when the tab is hidden. Portrait updates are suspended offscreen.

Build passed with 18 pages plus 404/sitemap/robots. **22 focused browser checks passed**, including actual pointer response, dynamic reduced-motion changes, touch fallback, unobstructed CTA clicks, keyboard navigation, lightbox behavior, galleries, no-JavaScript navigation, and narrow layouts. Screenshots at 1440, 820, 390, and 320px were captured; desktop/mobile hero backgrounds were visually inspected. No horizontal overflow was measured. `git diff --check` passed. The development server remains running at `http://127.0.0.1:5173`.

## Visual refinement — 2 November 2026

Refined the existing composition with warm paper/olive tones, restrained Space Grotesk headings, DM Sans body text, consistent metadata, quieter borders, and uniform controls. Work browser frames, Lab pinned papers, Life film, routes, and functionality remain intact. Copy is concise and professional across the hero, About, collections, project descriptions, certificates, and contact section. GitHub's entry is now titled “GitHub at Catalyst,” retaining its original route. Work/Lab cards stretch to a common height and align their actions.

Motion is limited to short entry animations on the hero/page introductions and lightbox, subtle hover elevation, and control transitions. Reduced motion disables these effects. No new library or remote font was added. Desktop (1440), tablet (820), mobile (390), and narrow (320) screenshots were reviewed in `artifacts/review-after/`; none showed horizontal page overflow. The full production suite passed **85 tests, 1 intentionally skipped** (desktop touch case). The final build passed with 18 pages plus 404/sitemap/robots. Final card alignment received a focused browser recheck. The local development server remains running at port 5173.

## Removal — 2 November 2026

Removed the Interactive Components entry from Life at Kautsar's request. Life now has five entries: the Catalyst GitHub weekly meet and four certificates. About links to the GitHub session. The old presentation route resolves to the recovery page and its generated HTML is absent after rebuilding. Original source assets are preserved. Build passed with 18 pages plus 404, sitemap, and robots; 24 focused desktop/mobile checks passed for Life/About routes, original certificate files, lightbox controls, rolling, and no-JavaScript navigation. The server remains active on port 5173.

## Life content — 2 November 2026

Life now contains six genuine entries: the existing Catalyst interactive-components presentation, a separate GitHub weekly meet for new students, Ruijie Switch Hands-On, BNSP Software Development, BNSP Telecommunications, and Oracle Academy Database Foundations final exam completion. The three placeholder slots were replaced. Dates, issuers, certificate titles, and BNSP numbers were transcribed from supplied documents; the GitHub session date remains unknown. All original files are preserved. The three PDF first pages and two JPEGs have WebP previews, with complete images contained without cropping. The lightbox and certificate details link to original documents; details show readable dates and issuer information.

Build passed with 19 prerendered pages plus 404, sitemap, and robots. The full production suite passed **87 tests, 1 intentionally skipped** (desktop native-touch case), including all six Life detail routes, image decoding, document HTTP responses and MIME types, navigation, galleries, reduced motion, and no-JavaScript content. After final spacing changes, the build passed again and both desktop/mobile lightbox checks passed, including the real Ruijie document link and date. The focused test's initial expectation used day-first formatting; it was corrected to the site's existing English month-first format. Life overview and certificate lightbox screenshots were inspected at desktop/mobile widths. `git diff --check` passed; the development server remains running on port 5173.

## Lab content — 2 November 2026

Lab now contains only Fuel Tracker, POS Warung, and Riu Logistik, in that order. Each entry uses Kautsar's supplied screenshot, a new project-specific description, and its supplied GitHub URL. The old next-project slot and its generated page were removed. Fuel/POS routes are preserved; Logistik is at `/lab/riu-logistik`. Real images are contained without cropping; optimized WebP previews total 156754 bytes. Fuel Tracker and Logistik stacks are verified from their public repositories. The POS repository returns 404 to unauthenticated visitors; its URL is retained without guessing a stack. Dates and live deployment URLs remain unset.

`npm.cmd run build` passed: 17 pages plus 404, sitemap, and robots. The focused production browser run passed **20 tests** across desktop/mobile, covering all Lab routes, real screenshots, GitHub linkage, collection navigation, narrow/tablet layouts, and content without JavaScript. Desktop and mobile Lab screenshots were inspected in `artifacts/desktop-lab.png` and `artifacts/mobile-lab.png`. `git diff --check` passed. The development server on port 5173 remains running.

## Archive and contact development — 2 November 2026

Added technology filters and date sorting to `/work`, Previous/Next navigation within Work and Lab details, and an accessible copy-email button with a manual fallback when clipboard access is denied. The homepage keeps its existing project order; the horizontal galleries and compact details are preserved. No dependencies or personal claims were added.

The full production browser suite passed with **83 passed, 1 intentionally skipped** (desktop native-touch case). Fourteen new desktop/mobile checks cover filter reset after scrolling, accurate rail boundary controls, filter/sort composition, navigation wraparound, actual clipboard contents, denied clipboard access, keyboard input at 320px, and no-JavaScript navigation. After the final footer spacing adjustment, the production build was regenerated and the new checks rerun. Build output: JS 242.10 KB (75.67 KB gzipped), CSS 46.91 KB (9.87 KB gzipped), 17 prerendered pages plus 404, sitemap, and robots. Lint was not rerun during this pass. The older results below describe previous development stages.

The Vite development server is running in a separate hidden process on `http://127.0.0.1:5173`, with logs at `artifacts/dev-server.log` and `artifacts/dev-server-error.log`. It is deliberately left running at the user's request.

## Previous verification

Verified locally on 28 October 2026. At the user's request, Work and Lab have returned to single horizontal scrolling rows, retaining browser frames and pinned-paper styling respectively. Both support mouse drag, native touch, buttons, and keyboard navigation. Life keeps its rolling filmstrip and accessible photo-story lightbox. Existing routes, content, palette, typography, portrait, and contacts are preserved.

| Check | Actual result |
| --- | --- |
| `npm.cmd run lint` | Passed, zero errors or warnings |
| `npm.cmd run build` | Passed; 17 prerendered pages plus 404, sitemap, and robots |
| `npm.cmd test -- --grep "Work and Lab use\|direct entry.*lab\|narrow phone"` | Latest focused run: 12 passed in 8.3 seconds. Previous full run: 69 passed, 1 intentionally skipped |
| `git diff --check` | Passed |
| Type checking | No type-check script or TypeScript configuration exists |

The skipped case is the native touch test in the desktop project. The same test passes in mobile Chrome emulation. Physical-device testing was not performed.

Build output: JavaScript 238.67 KB (74.54 KB gzipped), CSS 43.34 KB (9.30 KB gzipped). No dependency was added. The existing Browserslist dataset emits a non-blocking age warning.

## Behavior verified

Lab front cards were restored after Kautsar clarified that only the detail content should match Work. Checks confirm three EXP/status headings, three “Open notes” links, no browser-frame bars inside Lab, single-row alignment, and working links to the unchanged compact details. Those detail pages still show Date, URL, and Tech stack with the correct Lab breadcrumb and no long process sections. The Work title remains “Im Home Kontraktor,” and the previous removal of Life's “Open full story” links is preserved.

The suite covers all 17 routes, metadata, images, internal links, navigation/history, contact, keyboard navigation, reduced motion, no-JavaScript content, and the recovery page. Work and Lab are checked for single-row alignment and working project/experiment links. Work now contains exactly five real projects and screenshots. E-Voting was removed at the user's request; its old route opens the recovery page, and its HTML file is absent from the production build. The Work detail check verifies the user-supplied Idealibs URL, Next.js stack, and month-level date (`May 2024`, `datetime="2024-05"`). All three galleries pass button, keyboard, reduced-motion, boundary-state, and overflow checks on desktop and mobile.

Life checks cover continuous rolling and wraparound; hidden duplicate links; continued rolling on hover; pause on pointer interaction, drag, keyboard focus, and its Pause button; suspension offscreen and under reduced motion; mouse dragging without accidental story activation; Home/End and arrow navigation; native horizontal touch swiping alongside vertical page scrolling; lightbox opening, story navigation, Tab containment, Escape, close button, backdrop dismissal, return of focus, and scroll locking. Opening the lightbox pauses rolling. Without JavaScript, film-frame links still navigate to full story pages.

Initial tests exposed desktop drag snapping back and inconsistent modal focus behavior. Those issues were fixed in the implementation. The final complete production suite passes as recorded above.

## Rendered inspection

The latest Lab overview and Point of Sale detail were captured and inspected at 1440px and 390px in `artifacts/review-after/`. The front cards again show their original pinned-paper frames, EXP/status headings, and date/“Open notes” footers. Their horizontal layout is preserved. Only the detail retains Work's bounded two-column desktop layout and vertical mobile layout. Mobile placeholder labeling remains clear of the illustration. Previous Life lightbox screenshots confirm no horizontal dialog overflow after removing the story link.

Work details have been simplified to title, description, date, URL, tech stack, and an image gallery. Process sections, editorial disclaimers, sidebar notes, and next-project copy were removed from these pages. The old notes remain in the data. Missing factual values stay unset and display an em dash. New desktop/mobile production tests verify concise fields, absence of long sections, bounded image size, and that single-image projects do not show redundant thumbnails.

Additional real-page screenshots were captured and inspected for Idealibs and Soedirman Technophoria at 1440, 390, and 320 pixels. Image stages measured 641x360, 340x190, and 278x156 pixels respectively, with no page overflow. Files are `artifacts/work-detail-{desktop,mobile,narrow}-{idealibs,soedirman-technophoria}.png`.

Multi-image navigation was separately exercised through the real WorkDetail/ProjectGallery components in an isolated browser fixture at all three widths. The fixture uses the WebP and original PNG of the same supplied Idealibs screenshot; it does not alter published project content. Thumbnail selection, selected state, main image source, Left/Right wrapping, Home/End, date rendering, and URL behavior all passed. The fixture is not part of the production suite count. Each published project still has only its genuinely supplied image, with an editable `images` array ready for additional screenshots.

Fresh homepage and collection screenshots were captured and inspected at desktop 1440px and mobile 390px. Additional homepage captures cover 320px and 820px. The lightbox was captured at 1440, 820, 390, and 320 pixels. Its image sits beside the story on desktop and above it on mobile, with accessible close and navigation controls. No horizontal overflow was measured inside the dialog. Route tests also verify page containment at 320, 360, 768, and 1024 pixels.

Current screenshots are in ignored `artifacts/review-after/`. Lightbox screenshots are `artifacts/life-lightbox-{desktop,tablet,mobile,narrow}.png`. Production route screenshots are refreshed under `artifacts/desktop-*.png` and `artifacts/mobile-*.png`. Static captures use reduced motion for repeatability; rolling behavior is tested separately with motion enabled.

## Content limits

The local repository includes five user-supplied Work screenshots: Idealibs, Imhome, Catalyst, Ngudi Laras, and Soedirman Technophoria. Optimized WebP copies total 700350 bytes; original PNGs remain untouched. The homepage, Work gallery, and relevant detail pages show those real images in uncropped 16:9 frames. All five URLs, months/years, and stacks now come from Kautsar's explicit update. Month-only dates render without an invented day. E-Voting was removed from the data and generated routes. Case-study notes remain undocumented. Lab screenshots, additional journal photographs, the certificate, and experiment research notes still need supplying. No images or achievements were fabricated.

The original portrait JPEG remains untouched, with its existing optimized WebP used on the site. Certificates remain part of Life and Right Now remains removed. The local development server remains on port 5173. Nothing was deployed to Vercel.
