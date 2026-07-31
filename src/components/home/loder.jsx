import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/**
 * Fixed full-screen preloader. Mount it once at the root of the app, above
 * everything else (z-[100]). It disables body scroll while active, counts
 * 00 -> 100, then splits into two panels that slide apart to reveal the
 * page underneath. Calls `onComplete` right as it unmounts itself.
 *
 * Recommended usage in App.jsx:
 *
 *   const [loaded, setLoaded] = useState(false)
 *   return (
 *     <>
 *       <Loader onComplete={() => setLoaded(true)} />
 *       {loaded && <HomeHeroText />}   // mount hero only once the curtain lifts
 *       ...rest of the page, always mounted...
 *     </>
 *   )
 *
 * Gating the hero (or whatever sits first on the page) behind `loaded` means
 * its own entrance animation plays right as the curtain reveals it, instead
 * of finishing silently underneath the loader.
 */
const Loader = ({ onComplete, duration = 2.2 }) => {
    const wrapRef = useRef(null)
    const topPanelRef = useRef(null)
    const bottomPanelRef = useRef(null)
    const countRef = useRef(null)
    const barRef = useRef(null)
    const [visible, setVisible] = useState(true)
    const [reducedMotion] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    useEffect(() => {
        const original = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = original
        }
    }, [])

    useGSAP(() => {
        const counter = { val: 0 }

        const runExit = () => {
            const exit = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = ''
                    setVisible(false)
                    onComplete?.()
                }
            })
            exit.to('.loader-content', {
                opacity: 0,
                y: -16,
                duration: 0.5,
                ease: 'power2.in',
            })
            exit.to(topPanelRef.current, {
                yPercent: -100,
                duration: 0.9,
                ease: 'power4.inOut',
            }, '-=0.2')
            exit.to(bottomPanelRef.current, {
                yPercent: 100,
                duration: 0.9,
                ease: 'power4.inOut',
            }, '<')
        }

        if (reducedMotion) {
            if (countRef.current) countRef.current.textContent = '100'
            if (barRef.current) gsap.set(barRef.current, { scaleX: 1 })
            gsap.delayedCall(0.4, runExit)
            return
        }

        gsap.to(counter, {
            val: 100,
            duration,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (countRef.current) {
                    countRef.current.textContent = String(Math.floor(counter.val)).padStart(2, '0')
                }
                if (barRef.current) {
                    gsap.set(barRef.current, { scaleX: counter.val / 100 })
                }
            },
            onComplete: runExit,
        })
    }, { scope: wrapRef })

    if (!visible) return null

    return (
        <div ref={wrapRef} className='fixed inset-0 z-[100]'>
            <div ref={topPanelRef} className='absolute top-0 left-0 w-full h-1/2 bg-black' />
            <div ref={bottomPanelRef} className='absolute bottom-0 left-0 w-full h-1/2 bg-black' />

            <div className='loader-content absolute inset-0 flex flex-col items-center justify-center gap-6 md:gap-8'>
                <p className='text-[#E8364E] text-[10px] md:text-xs uppercase tracking-widest font-[font2]'>
                    Vraj Makvana
                </p>

                <div className='flex items-start font-[font2] text-white leading-none'>
                    <span ref={countRef} className='text-[16vw] md:text-[9vw] tracking-tighter'>00</span>
                    <span className='text-2xl md:text-4xl mt-2 md:mt-3 text-gray-500'>%</span>
                </div>

                <div className='w-48 md:w-64 h-px bg-gray-800 overflow-hidden'>
                    <div ref={barRef} className='h-full w-full bg-[#E8364E] origin-left' style={{ transform: 'scaleX(0)' }} />
                </div>

                <p className='text-gray-600 text-[10px] md:text-xs uppercase tracking-widest font-[font2]'>
                    Loading Experience
                </p>
            </div>
        </div>
    )
}

export default Loader