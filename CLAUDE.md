# TRex

## Em-Based Scaling System

**Never use `px` for spacing, font sizes, padding, margins, gaps, or border-radius.** Use `em` units and the design tokens in `:root` of `src/style.css` (`--text-*`, `--space-*`, `--radius-*`).

The only allowed `px` values: `border-width` (e.g. `1px solid`), viewport units (`100svh`), and the single `body { font-size }` declaration (the scaling knob).

`letter-spacing` uses `em`. `line-height` is unitless.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
