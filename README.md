# The Museum — PM Portfolio

A museum-themed personal portfolio site: an Entrance Hall (about/intro), a Sculpture Hall
(career timeline, company logos behind glass), and a Gallery Wing (10 framed project
case studies).

## Files
- `index.html` — page structure and content
- `styles.css` — all styling (design tokens live in `:root` at the top)
- `script.js` — case-study overlay, mobile menu toggle, leaf cursor trail

## Notes for next steps
- Placeholder content to swap: name/role/bio in the ticket card, the 4 company
  logos in `.logo-monogram` (Sculpture Hall), and the 10 project "paintings"
  (currently CSS gradients in `.canvas` — replace with real screenshots).
- Each gallery frame currently opens the same placeholder case-study overlay;
  wire each one up to its own content (role/timeline/team/problem/approach/outcome).
- Responsive breakpoints: 860px (tablet), 600px (mobile), 400px (small phone).
- The museum-building illustration in the hero is a static SVG — swap paths/colors
  directly in `index.html` if you want to change it further.
