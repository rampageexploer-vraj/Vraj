import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import services from '../../Data/services.json'

gsap.registerPlugin(ScrollTrigger)

const iconProps = { className: 'icon-path', pathLength: '1', strokeDasharray: '1', strokeDashoffset: '1' }

const icons = [
    // Web Design — browser frame
    <>
        <rect x='3.5' y='4.5' width='17' height='15' rx='1.2' {...iconProps} />
        <line x1='3.5' y1='9' x2='20.5' y2='9' {...iconProps} />
    </>,
    // Frontend Development — code brackets
    <>
        <polyline points='9,7 4,12 9,17' {...iconProps} />
        <polyline points='15,7 20,12 15,17' {...iconProps} />
    </>,
    // UI/UX Design — layered frames
    <>
        <rect x='4' y='4' width='13' height='13' rx='1' {...iconProps} />
        <rect x='7' y='7' width='13' height='13' rx='1' {...iconProps} />
    </>,
    // Motion & Interaction — waveform
    <>
        <polyline points='3,12 7,12 9,6 13,18 15,12 21,12' {...iconProps} />
    </>,
]

const Services = () => {
    const sectionRef = useRef(null)
    const listRef = useRef(null)
    const iconRef = useRef(null)
    const [active, setActive] = useState(0)
    const [reducedMotion] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    useGSAP(() => {
        gsap.from('.service-row', {
            opacity: 0,
            x: -24,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: listRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.service-panel', {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
                trigger: listRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        })
    }, { scope: sectionRef })

    useGSAP(() => {
        if (!iconRef.current) return
        const paths = iconRef.current.querySelectorAll('.icon-path')
        if (reducedMotion) {
            gsap.set(paths, { strokeDashoffset: 0 })
            return
        }
        gsap.fromTo(paths,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08 }
        )
    }, { dependencies: [active], scope: sectionRef })

    return (
        <div ref={sectionRef} id='services' className='w-full bg-black px-6 md:px-12 py-20 md:py-32'>
            {/* Section Header */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-14 md:mb-20 gap-6 md:gap-0'>
                <div>
                    <p className='text-[#E8364E] text-[10px] md:text-xs uppercase tracking-widest font-[font2] mb-3 md:mb-4'>Services</p>
                    <h2 className='text-white text-4xl md:text-6xl lg:text-[5vw] font-[font2] uppercase tracking-tighter leading-none mb-4 md:mb-6'>What I Do</h2>
                    <p className='text-gray-500 text-sm md:text-base max-w-md font-[font1] leading-relaxed'>
                        From first sketch to shipped interface — the parts of the process I own end to end.
                    </p>
                </div>
                <p className='text-gray-600 text-2xl md:text-3xl font-[font2] uppercase tracking-tight'>
                    {String(services.length).padStart(2, '0')} services
                </p>
            </div>

            {/* Selector + detail panel */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16'>
                {/* Left: index with a sliding rail indicator */}
                <div ref={listRef} className='relative pl-6 md:pl-8'>
                    <div className='absolute left-0 top-0 bottom-0 w-px bg-gray-800'>
                        <div
                            className='absolute left-0 w-px bg-[#E8364E] transition-all duration-500 ease-out'
                            style={{ top: `${(active / services.length) * 100}%`, height: `${100 / services.length}%` }}
                        />
                    </div>
                    {services.map((service, i) => (
                        <button
                            key={service.title}
                            onClick={() => setActive(i)}
                            onMouseEnter={() => setActive(i)}
                            aria-pressed={active === i}
                            className='service-row w-full text-left py-5 md:py-7 border-b border-gray-800 last:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E] rounded-sm'
                        >
                            <div className='flex items-center gap-4 md:gap-6'>
                                <span className={`text-[10px] md:text-xs font-[font2] tracking-widest uppercase w-8 shrink-0 transition-colors duration-300 ${active === i ? 'text-[#E8364E]' : 'text-gray-500'}`}>
                                    0{i + 1}
                                </span>
                                <span className={`text-2xl md:text-4xl font-[font2] uppercase tracking-tight transition-colors duration-300 ${active === i ? 'text-white' : 'text-gray-600'}`}>
                                    {service.title}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Right: detail panel driven by the active selection */}
                <div className='service-panel flex flex-col justify-between border border-gray-800 rounded-2xl md:rounded-3xl p-8 md:p-12 min-h-[300px] md:min-h-[380px]'>
                    <div>
                        <div ref={iconRef} className='w-11 h-11 md:w-14 md:h-14 text-[#E8364E] mb-6 md:mb-8'>
                            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round' className='w-full h-full'>
                                {icons[active]}
                            </svg>
                        </div>
                        <h3 className='text-white text-2xl md:text-3xl font-[font2] uppercase tracking-tight mb-4 md:mb-5'>
                            {services[active].title}
                        </h3>
                        <p className='text-gray-500 text-sm md:text-base font-[font1] leading-relaxed max-w-md'>
                            {services[active].description}
                        </p>
                    </div>
                    <div className='flex flex-wrap gap-x-6 gap-y-2 mt-8 md:mt-10 pt-6 border-t border-gray-800'>
                        {services[active].tags.map((tag) => (
                            <span key={tag} className='text-gray-400 text-xs md:text-sm font-[font2] tracking-wider uppercase'>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services