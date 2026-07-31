import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import stats from '../../Data/about.json'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const sectionRef = useRef(null)
    const panelRef = useRef(null)
    const statRefs = useRef([])
    const [reducedMotion] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    useGSAP(() => {
        gsap.from('.about-copy', {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        })

        if (reducedMotion) {
            statRefs.current.forEach((el, i) => {
                if (el) el.textContent = `${stats[i].value}${stats[i].suffix}`
            })
            return
        }

        // Panel parallax
        if (panelRef.current) {
            gsap.fromTo(panelRef.current,
                { yPercent: -6 },
                {
                    yPercent: 6,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.6,
                    }
                }
            )
        }

        // Count-up stats
        statRefs.current.forEach((el, i) => {
            if (!el) return
            const target = { val: 0 }
            gsap.to(target, {
                val: stats[i].value,
                duration: 1.4,
                ease: 'power2.out',
                onUpdate: () => {
                    el.textContent = `${Math.round(target.val)}${stats[i].suffix}`
                },
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            })
        })
    }, { scope: sectionRef })

    return (
        <div ref={sectionRef} id='about' className='w-full bg-black px-6 md:px-12 py-20 md:py-32 overflow-hidden'>
            {/* Section Header */}
            <div className='mb-14 md:mb-20'>
                <p className='text-[#E8364E] text-[10px] md:text-xs uppercase tracking-widest font-[font2] mb-3 md:mb-4'>About</p>
                <h2 className='text-white text-4xl md:text-6xl lg:text-[5vw] font-[font2] uppercase tracking-tighter leading-none'>Who I Am</h2>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-20 items-start'>
                {/* Portrait panel — monogram placeholder, swap for a real photo whenever ready */}
                <div className='relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-2xl md:rounded-3xl overflow-hidden border border-gray-800'>
                    <div
                        ref={panelRef}
                        className='absolute inset-[-8%] bg-gradient-to-br from-[#1a0508] via-black to-black flex items-center justify-center'
                    >
                        <span className='font-[font2] text-[9rem] md:text-[11rem] uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-gray-900 select-none'>
                            VM
                        </span>
                    </div>
                    <div className='absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl md:rounded-3xl' />
                    <div className='absolute bottom-0 left-0 w-full p-5 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent'>
                        <p className='text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-[font2]'>Vraj Makwana</p>
                        <p className='text-[10px] md:text-xs text-gray-600 uppercase tracking-widest font-[font2]'>Based Worldwide — Remote</p>
                        <a
                            href='/Vraj-2.pdf'
                            download='Vraj-Makwana-Resume.pdf'
                            className='group inline-flex items-center gap-3 mt-4 md:mt-5 bg-[#E8364E] text-black px-5 md:px-6 py-3 rounded-full font-[font2] text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                        >
                            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5' aria-hidden='true'>
                                <path d='M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                            Download Resume
                        </a>
                    </div>
                </div>

                {/* Bio + stats */}
                <div>
                    <p className='about-copy text-white text-2xl md:text-4xl font-[font2] uppercase tracking-tight leading-tight mb-6 md:mb-8 max-w-xl'>
                        I&apos;m Vraj — a web designer and frontend developer who believes good interfaces should feel as good as they look.
                    </p>

                    <p className='about-copy text-gray-500 text-sm md:text-base font-[font1] leading-relaxed max-w-xl mb-4 md:mb-5'>
                        For the last few Months I&apos;ve split my time between design and code, which means I don&apos;t just decide how something should look — I make sure it actually ships that way. I care about typography, restraint, and the small motion details most people never consciously notice but always feel.
                    </p>

                    <p className='about-copy text-gray-500 text-sm md:text-base font-[font1] leading-relaxed max-w-xl mb-10 md:mb-14'>
                       Outside of work, I spend my time exploring modern UI patterns, building React.js projects, learning new frontend technologies, and continuously improving my portfolio with better performance and user experience.
                    </p>

                    <div className='about-copy grid grid-cols-3 gap-6 md:gap-10 border-t border-gray-800 pt-8 md:pt-10 max-w-xl'>
                        {stats.map((stat, i) => (
                            <div key={stat.label}>
                                <p
                                    ref={(el) => (statRefs.current[i] = el)}
                                    className='text-[#E8364E] text-3xl md:text-5xl font-[font2] tracking-tight leading-none mb-2'
                                >
                                    0{stat.suffix}
                                </p>
                                <p className='text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-[font2] leading-snug'>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About