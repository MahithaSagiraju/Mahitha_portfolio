# Portfolio Redesign TODO

## Phase 1 — Foundation (design system + motion)
- [x] Update `src/index.css` with a cohesive design system: tokens (colors/spacing/radius/shadows), typography scale, font loading, and premium interaction utilities.

- [x] Update `src/components/shared/ScrollReveal.tsx` to respect `prefers-reduced-motion`, unify animation behavior, and support stagger more cleanly.

- [x] Update `src/main.tsx` (and/or theme init) to ensure dark mode is default without flash.




## Phase 2 — Recruiter optimization + hero polish
- [x] Update `src/components/public/Hero.tsx` to strengthen above-the-fold trust messaging (impact first, fast-access CTAs).
- [ ] Add optional lightweight stats/counters block near hero (using existing `AnimatedCounter` patterns).


## Phase 3 — Projects case-study layout
- [x] Redesign `src/components/public/Projects.tsx` and its `ProjectCard` into a case-study layout (Problem → Approach → Impact → Tech).
- [ ] Ensure consistent hover/press micro-interactions and CTA button styling.


## Phase 4 — Consistency + component pass
- [ ] Standardize card/header typography across sections (`About`, `Skills`, `Experience`, `Certifications`, `Education`, `Contact`, `Footer`).
- [ ] Polish `Skills.tsx` interactive indicators.

## Phase 5 — Final QA
- [ ] Run `npm run dev` and `npm run build`.
- [ ] Validate responsiveness (mobile-first), reduced motion, and theme toggle behavior.
- [ ] Lighthouse/perf sanity checks.

