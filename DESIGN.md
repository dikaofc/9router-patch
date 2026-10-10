# 9Router login direction

This direction was drafted by the assistant for the login redesign from the requested mood: a sharp, utilitarian workbench. AI-generated direction can still drift toward generic defaults; treat this as the working brief for this screen, not a broader brand guide.

## Reading

Authentication screen for developers and operators managing a 9Router instance.

## Visual language

- **Identity:** a routing workbench, not a product-marketing page.
- **Palette:** the existing 9Router theme neutrals with its established blue primary accent; keep the brand area graphite in both themes.
- **Typography:** the existing system sans-serif for readable interface text; monospace is reserved for the real `/v1/*` endpoint.
- **Composition:** one grounded split workspace on desktop. The brand side explains the actual client → endpoint → provider path; the form side is the only interactive focal point.
- **Surface:** solid, low-contrast-neutral canvas and a single framed workspace; no glass blur, glow, decorative grid, or gradient.
- **Controls:** flat, high-contrast primary action; neutral outlined SSO alternatives; clear focus, disabled, loading, and error states.
- **Responsive behavior:** stack the workspace at tablet widths, then remove secondary route detail on narrow phones so the sign-in action remains prominent and reachable.
- **Motion:** short state transitions only; no ambient or looping motion.

## Dials

**ENERGY 2 / RHYTHM 2 / MOTION 1**

## Decision reasons

- The actual request path is the visual motif because routing is the product's job.
- The split layout separates product context from the one decision required to sign in.
- Existing neutral surfaces and blue action color preserve continuity with the dashboard instead of inventing a new palette.
- A restrained system sans keeps the form easy to scan; `/v1/*` alone uses code styling because it is an endpoint.
- One contained workspace gives the login a boundary without turning each form element into a floating card.
- Motion is limited to control feedback because authentication should feel direct and predictable.
