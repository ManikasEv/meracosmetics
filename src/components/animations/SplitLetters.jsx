import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Letter-by-letter reveal. Use for headings only; pair with type-* classes on Tag.
 */
export function SplitLetters({
  text,
  as = 'span',
  className = '',
  immediate = false,
  stagger = 0.022,
  duration = 0.58,
  start = 'top 88%',
}) {
  const Component = as
  const ref = useRef(null)
  const chars = useMemo(() => Array.from(text ?? ''), [text])

  useLayoutEffect(() => {
    const root = ref.current
    if (!root || chars.length === 0) return undefined

    const targets = root.querySelectorAll('[data-split-char]')
    gsap.killTweensOf(targets)

    const toState = {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      ...(immediate
        ? {}
        : {
            scrollTrigger: {
              trigger: root,
              start,
              once: true,
            },
          }),
    }

    const tween = gsap.fromTo(
      targets,
      { yPercent: 108, opacity: 0 },
      toState,
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [text, immediate, stagger, duration, start, chars.length])

  return (
    <Component ref={ref} className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span key={`${i}-${ch}`} className="inline-block overflow-hidden align-baseline">
          <span data-split-char className="inline-block will-change-transform">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        </span>
      ))}
    </Component>
  )
}
