import './style.css'

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

// Smooth scrolling — lazy-loaded (progressive enhancement)
if (!prefersReducedMotion) {
  Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ]).then(([gsapMod, scrollTriggerMod, lenisMod]) => {
    const { gsap } = gsapMod
    const { ScrollTrigger } = scrollTriggerMod
    const Lenis = lenisMod.default

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      if (anchor.classList.contains('js-book-online')) return
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href')
        if (href === '#') return
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          lenis.scrollTo(target)
        }
      })
    })
  })
}

// Before / after compare slider
document.querySelectorAll('.compare').forEach((el) => {
  const setPos = (pct) => {
    const clamped = Math.max(0, Math.min(100, pct))
    el.style.setProperty('--pos', `${clamped}%`)
    el.setAttribute('aria-valuenow', Math.round(clamped))
    el.setAttribute(
      'aria-valuetext',
      `${Math.round(clamped)} percent, showing ${Math.round(clamped)}% before and ${Math.round(100 - clamped)}% after`
    )
  }

  const updateFromPointer = (x) => {
    const rect = el.getBoundingClientRect()
    setPos(((x - rect.left) / rect.width) * 100)
  }

  el.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    el.setPointerCapture(e.pointerId)
    updateFromPointer(e.clientX)

    const onMove = (e) => updateFromPointer(e.clientX)
    const cleanup = () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', cleanup)
      el.removeEventListener('pointercancel', cleanup)
      el.removeEventListener('lostpointercapture', cleanup)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', cleanup)
    el.addEventListener('pointercancel', cleanup)
    el.addEventListener('lostpointercapture', cleanup)
  })

  // Keyboard support
  el.addEventListener('keydown', (e) => {
    const current = parseFloat(el.getAttribute('aria-valuenow')) || 50
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      setPos(current - step)
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      setPos(current + step)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPos(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPos(100)
    }
  })
})

// Book online buttons (CSP-safe, no inline handlers)
document.querySelectorAll('.js-book-online').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    if (typeof AutoOps !== 'undefined') {
      AutoOps.show()
    }
  })
})

// Dynamic copyright year
const yearEl = document.querySelector('.js-year')
if (yearEl) {
  yearEl.textContent = new Date().getFullYear()
}

// Mobile nav toggle
const toggle = document.querySelector('.header__toggle')
const nav = document.getElementById('main-nav')

if (toggle && nav) {
  const focusableSelector = 'a[href], button, [tabindex]:not([tabindex="-1"])'

  const openNav = () => {
    toggle.setAttribute('aria-expanded', 'true')
    nav.classList.add('is-open')
    const firstLink = nav.querySelector(focusableSelector)
    if (firstLink) firstLink.focus()
  }

  const closeNav = () => {
    toggle.setAttribute('aria-expanded', 'false')
    nav.classList.remove('is-open')
    toggle.focus()
  }

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true'
    if (open) closeNav()
    else openNav()
  })

  // Close nav when a link is tapped
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav)
  })

  // Focus trap and Escape key
  nav.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeNav()
      return
    }

    if (e.key !== 'Tab') return

    const focusable = [...nav.querySelectorAll(focusableSelector)]
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  })
}
