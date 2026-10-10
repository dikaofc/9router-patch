# 9Router workbench direction

This direction was drafted for the login redesign from the requested mood: a sharp, utilitarian workbench. The product owner approved extending that direction across every page.

## Reading

Gateway and dashboard for developers and operators managing a 9Router instance.

## Visual language

- **Identity:** a routing workbench, not a product-marketing page.
- **Palette:** the existing 9Router theme neutrals with its established blue primary accent; keep the brand area graphite in both themes.
- **Typography:** the existing system sans-serif for readable interface text; monospace is reserved for the real `/v1/*` endpoint.
- **Composition:** operational pages put the route-specific task and real data first. A narrow navigation rail and quiet page header frame the work without competing with it. The sign-in screen keeps its focused split workspace.
- **Surface:** solid, theme-driven neutrals with restrained borders; no ambient blur, decorative grid, or unmotivated gradient. Theme presets remain selectable.
- **Controls:** flat, high-contrast primary actions; neutral alternatives; clear focus, disabled, loading, empty, and error states.
- **Responsive behavior:** page composition reflows around the task, with reachable navigation, full-width controls, and no clipped data or obstructed sheets.
- **Motion:** short state transitions only; no ambient or looping motion.

## Dials

**ENERGY 2 / RHYTHM 2 / MOTION 1**

## Decision reasons

- Route-specific data and actions lead each screen because operators come to complete configuration and diagnose traffic, not to read decoration.
- A persistent compact navigation rail separates destinations from the active task while preserving room for the page itself.
- Theme-derived neutral surfaces support long operational sessions; blue is reserved for real actions and selected state.
- A system sans preserves familiar UI reading; monospace is reserved for actual endpoints, model IDs, and commands.
- Flat surfaces and selective borders keep configuration groups legible without making every element appear elevated.
- Motion is limited to control feedback because gateway configuration should feel direct and predictable.
- Existing selectable theme presets remain functional; action foregrounds are chosen from the selected primary color to keep button text legible.
