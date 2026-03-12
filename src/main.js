import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

// Smooth scrolling (skip for reduced motion)
if (!prefersReducedMotion) {
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
}

// Before / after compare slider
document.querySelectorAll('.compare').forEach((el) => {
  const update = (x) => {
    const rect = el.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100))
    el.style.setProperty('--pos', `${pct}%`)
  }

  el.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    el.setPointerCapture(e.pointerId)
    update(e.clientX)

    const onMove = (e) => update(e.clientX)
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
})

// Mobile nav toggle
const toggle = document.querySelector('.header__toggle')
const nav = document.getElementById('main-nav')

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!open))
    nav.classList.toggle('is-open', !open)
  })

  // Close nav when a link is tapped
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false')
      nav.classList.remove('is-open')
    })
  })
}

