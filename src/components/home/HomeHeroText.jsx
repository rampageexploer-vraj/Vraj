import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const RotatingBadge = ({ className = '' }) => (
    <a href='#projects' className={`hero-badge relative ${className}`}>
        <svg viewBox='0 0 100 100' className='w-full h-full animate-[spin_14s_linear_infinite] motion-reduce:animate-none'>
            <defs>
                <path id='badgeCircle' d='M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0' />
            </defs>
            <text fill='#8a8a8a' fontSize='8.4' letterSpacing='2' className='uppercase font-[font2]'>
                <textPath href='#badgeCircle'>VIEW WORK • VIEW WORK •</textPath>
            </text>
        </svg>
        <div className='absolute inset-0 flex items-center justify-center'>
            <span className='flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#E8364E] text-black text-base md:text-lg'>
                &#8599;
            </span>
        </div>
    </a>
)

const HomeHeroText = ({ start = false }) => {
    const heroRef = useRef(null)
    const [reducedMotion] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    useGSAP(() => {
        if (reducedMotion) return
        if (!start) return

        gsap.from('.hero-line', {
            yPercent: 110,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.12,
            delay: 0.15,
        })
        gsap.from('.hero-meta', {
            opacity: 0,
            duration: 1,
            delay: 0.5,
        })
        gsap.from('.hero-badge', {
            opacity: 0,
            scale: 0.85,
            duration: 1,
            delay: 0.7,
            ease: 'back.out(1.7)',
        })
        gsap.from('.hero-cta', {
            opacity: 0,
            y: 12,
            duration: 0.8,
            delay: 0.9,
        })
    }, { scope: heroRef, dependencies: [start] })

    return (
        <div ref={heroRef} className='w-full min-h-screen flex flex-col justify-between pt-32 pb-10 px-6 md:px-12 bg-black'>
            {/* Top identity row */}
            <div className='hero-meta flex justify-between items-center text-[10px] text-gray-400 border-b border-gray-800 pb-4 uppercase tracking-widest font-[font2] w-full'>
                <span>Vraj Makwana</span>
                <span className='hidden sm:inline'>Web Designer &amp; Frontend Developer</span>
                <span>React, Tailwind, UI</span>
            </div>

            {/* Main */}
            <div className='relative flex flex-col items-center justify-center flex-grow py-8'>
                <p className='hero-meta text-[#E8364E] text-[10px] md:text-sm tracking-[0.15em] font-[font2] mb-4 md:mb-6 uppercase text-center max-w-2xl'>
                    I design premium web experiences with React, Tailwind, and motion-rich UI.
                </p>

                <h1 className='text-center font-[font2] text-[13vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase text-white'>
                    <div className='overflow-hidden'>
                        <div className='hero-line'>Web Designer</div>
                    </div>
                    <div className='overflow-hidden'>
                        <div className='hero-line flex items-baseline justify-center gap-3 md:gap-5 mt-1 md:mt-2'>
                            <span className='font-[font1] normal-case italic text-gray-500 text-[7vw] md:text-[4vw] tracking-normal'>creates</span>
                            <span>Bold</span>
                        </div>
                    </div>
                    <div className='overflow-hidden'>
                        <div className='hero-line mt-1 md:mt-2'>Digital Work</div>
                    </div>
                </h1>

                {/* Desktop: badge sits beside the headline */}
                <RotatingBadge className='hidden sm:block absolute right-0 lg:right-6 top-5 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32' />

                {/* Mobile: badge drops below, centered */}
                <RotatingBadge className='sm:hidden mt-10 w-20 h-20' />
            </div>

            {/* Bottom */}
            <div className='w-full'>
                <div className='hero-meta flex justify-between items-center text-[10px] text-gray-400 border-b border-gray-800 pb-4 mb-8 uppercase tracking-widest font-[font2]'>
                    <span>Premium Websites</span>
                    <span className='hidden sm:inline'>React + Tailwind UI</span>
                    <span>Smooth Animation</span>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0'>
                    <p className='hero-cta max-w-md text-gray-400 text-sm md:text-base leading-relaxed font-[font1]'>
                        I build powerful websites and frontend experiences that look premium, load fast, and make your work impossible to ignore.
                    </p>
                    <div className='hero-cta flex gap-4 font-[font2] uppercase tracking-wider text-xs md:text-sm whitespace-nowrap'>
                        <a
                            href='#projects'
                            className='bg-[#E8364E] text-black inline-block px-6 md:px-10 py-3 md:py-4 rounded-full font-bold hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                        >
                            View Work
                        </a>
                        <a
                            href='#about'
                            className='border border-gray-600 text-white inline-block px-6 md:px-10 py-3 md:py-4 rounded-full hover:bg-white hover:text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E]'
                        >
                            About Me
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeroText