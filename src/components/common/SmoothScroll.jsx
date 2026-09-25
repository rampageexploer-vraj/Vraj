import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = () => {
    useEffect(() => {
        // Initialize Lenis smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 1.5,
        })

        // Synchronize Lenis scroll with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Integrate Lenis RAF loop with GSAP ticker for frame-perfect sync
        const updateTicker = (time) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(updateTicker)
        gsap.ticker.lagSmoothing(0)

        // Expose globally for components like ScrollToTop and navigation
        window.lenis = lenis

        // Intercept internal anchor links for smooth scrolling via Lenis
        const handleAnchorClick = (e) => {
            const anchor = e.target.closest('a[href^="#"]')
            if (!anchor) return

            const href = anchor.getAttribute('href')
            if (!href || href === '#') return

            if (href === '#top') {
                e.preventDefault()
                lenis.scrollTo(0, { duration: 1.2 })
                return
            }

            const targetElement = document.querySelector(href)
            if (targetElement) {
                e.preventDefault()
                lenis.scrollTo(targetElement, { offset: 0, duration: 1.2 })
            }
        }

        document.addEventListener('click', handleAnchorClick)

        return () => {
            document.removeEventListener('click', handleAnchorClick)
            gsap.ticker.remove(updateTicker)
            lenis.destroy()
            delete window.lenis
        }
    }, [])

    return null
}

export default SmoothScroll
