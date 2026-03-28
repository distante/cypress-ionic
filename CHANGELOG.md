# Changelog

## [1.1.1] - 2026-03-28

### Fixed

- `ionRangeCypress.moveToValue()` now works with `@ionic/core >= 8.8.0`.
  Ionic 8.8.x renamed shadow-DOM knob classes (`range-knob-a` →
  `range-knob-handle-a`, `range-knob-b` → `range-knob-handle-b`).
  The library now uses a comma-separated CSS selector to match both old
  and new class names, so `@ionic/core 8.7.x` users are unaffected.
  The same selector was also updated in the hydration-check tests
  (`get-from-supported-selector.spec.ts`).
