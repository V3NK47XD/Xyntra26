"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const move = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power3.out",
      })

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power3.out",
      })
    }

    const enter = () =>
      gsap.to(cursor, { scale: 1.6, duration: 0.25 })

    const leave = () =>
      gsap.to(cursor, { scale: 1, duration: 0.25 })

    window.addEventListener("mousemove", move)

    const elements = document.querySelectorAll("a, button, .interactive")
    elements.forEach(el => {
      el.addEventListener("mouseenter", enter)
      el.addEventListener("mouseleave", leave)
    })

    return () => {
      window.removeEventListener("mousemove", move)
      elements.forEach(el => {
        el.removeEventListener("mouseenter", enter)
        el.removeEventListener("mouseleave", leave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />

      {/* 🔥 Embedded CSS */}
      <style jsx global>{`
        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
        }

        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
        }

        body {
          cursor: none;
        }

        a,
        button,
        .interactive {
          cursor: none;
        }

        /* ❌ Disable on touch devices */
        @media (hover: none) {
          .custom-cursor,
          .custom-cursor-dot {
            display: none;
          }

          body {
            cursor: auto;
          }
        }
      `}</style>
    </>
  )
}
