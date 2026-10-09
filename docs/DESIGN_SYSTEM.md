# Design system — proposed

Reference identity takes precedence over generic styling. Verified brand anchors from brief: red `#CE181E`, pale `#F0F3F9`. White base, dark ink `#1F2937` and muted ink `#586174` are **proposed** tokens; tune against screenshots and contrast measurements. Existing Vite purple/dark-mode CSS is starter-only.

Typography: inspect loaded reference fonts before naming family; use readable sans fallback, body ≥16px with 1.5–1.7 line height, responsive heading scale ~24/32/40–56px, paragraph measure 65–75 characters. Layout: mobile-first 16–24px gutters, tablet ~32px, desktop centered container ~1200px **provisional** pending measurement; use 4/8px rhythm. Preserve hero artwork aspect ratio, numbered service layout, photo crops and restrained card borders/shadows. No unrelated gradients or glass effects.

Shared primitives: contact strip, logo/navigation with mobile toggle, hero with accessible controls if slider retained, section title, numbered service card, team/article cards, FAQ disclosure, CTA, footer. Provide hover, focus-visible, pressed and disabled states; one dominant action per section. FAQ button exposes `aria-expanded` and panel association. Icons supplement labels. Respect `prefers-reduced-motion`, avoid layout-shifting animations, use ~150–300ms functional transitions; autoplay requires pause control.

Check WCAG AA text contrast 4.5:1 (large text 3:1), visible focus, ≥44×44px touch targets, headings and image alt. Reserve image dimensions; prioritize hero and lazy-load below fold. Verify 375, 390, 430, 768, 1024, 1366, 1440, 1920px. Accessibility/layout guidance informed by `ui-ux-pro-max`; none of this implies UI built.
