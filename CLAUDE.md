# TRex

Single-page website built with Vite 8, GSAP (ScrollTrigger), and Lenis smooth scroll.

## Em-Based Scaling System

**Everything scales from one value: `body { font-size: 16px }`.**

All spacing, typography, gaps, padding, margins, and border-radii use `em` units so the entire page scales uniformly when the body font-size changes — like resizing an image. Changing `body { font-size: 20px }` scales the whole site up 25%.

### Rules

1. **Never use `px` for spacing, font sizes, padding, margins, gaps, or border-radius.** Always use `em` or the CSS custom property tokens defined in `:root`.
2. **The only allowed `px` values are:**
   - `border-width` (e.g. `1px solid`) — thin lines should stay thin at any scale.
   - Viewport units like `100svh` — these are not spacing values.
   - The single `body { font-size }` declaration — this is the scaling knob.
3. **Use the design tokens** from `src/style.css` instead of raw numbers:

   | Token          | Value    | ~px at 16px base |
   |----------------|----------|-------------------|
   | `--text-xs`    | 0.75em   | 12px              |
   | `--text-sm`    | 0.875em  | 14px              |
   | `--text-base`  | 1em      | 16px              |
   | `--text-lg`    | 1.125em  | 18px              |
   | `--text-xl`    | 1.5em    | 24px              |
   | `--text-2xl`   | 2em      | 32px              |
   | `--text-3xl`   | 3em      | 48px              |
   | `--text-display` | 5em    | 80px              |

   | Token          | Value    | ~px at 16px base |
   |----------------|----------|-------------------|
   | `--space-xs`   | 0.25em   | 4px               |
   | `--space-sm`   | 0.5em    | 8px               |
   | `--space-md`   | 1em      | 16px              |
   | `--space-lg`   | 1.5em    | 24px              |
   | `--space-xl`   | 2em      | 32px              |
   | `--space-2xl`  | 3em      | 48px              |
   | `--space-3xl`  | 5em      | 80px              |

   | Token          | Value    |
   |----------------|----------|
   | `--radius-sm`  | 0.25em   |
   | `--radius-md`  | 0.5em    |
   | `--radius-lg`  | 0.75em   |

4. **When adding new tokens**, follow the existing naming pattern and place them in the `:root` block in `src/style.css`.
5. **`letter-spacing`** should use `em` units (e.g. `-0.04em`).
6. **`line-height`** should be unitless (e.g. `1.5`, `1.6`) — these are relative by nature.

## Stack

- **Vite 8** — dev server and build
- **GSAP + ScrollTrigger** — animations
- **Lenis** — smooth scrolling (integrated with GSAP ticker in `src/main.js`)

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
