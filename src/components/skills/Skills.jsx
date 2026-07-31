import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills, expertise } from '../../Data/skills.json'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
    const sectionRef = useRef(null)
    const marqueeRef = useRef(null)
    const rowsRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useGSAP(() => {
        gsap.from('.idx-row', {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
                trigger: rowsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        })

        const track = marqueeRef.current
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (track && !prefersReducedMotion) {
            gsap.to(track, {
                xPercent: -50,
                duration: skills.length * 4,
                ease: 'none',
                repeat: -1,
            })
        }
    }, { scope: sectionRef })

    return (
        <div ref={sectionRef} id='skills' className='w-full bg-black px-6 md:px-12 py-20 md:py-32 overflow-hidden'>
            {/* Section Header */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-14 md:mb-20 gap-6 md:gap-0'>
                <div>
                    <p className='text-[#E8364E] text-[10px] md:text-xs uppercase tracking-widest font-[font2] mb-3 md:mb-4'>Skills</p>
                    <h2 className='text-white text-4xl md:text-6xl lg:text-[5vw] font-[font2] uppercase tracking-tighter leading-none mb-4 md:mb-6'>Expertise</h2>
                    <p className='text-gray-500 text-sm md:text-base max-w-md font-[font1] leading-relaxed'>
                        A deep understanding of the tools and technologies that bring digital products to life.
                    </p>
                </div>
                <p className='text-gray-600 text-2xl md:text-3xl font-[font2] uppercase tracking-tight'>
                    {String(expertise.length).padStart(2, '0')} capabilities
                </p>
            </div>

            {/* Kinetic tool strip — replaces the arbitrary % bars */}
            <div className='relative border-y border-gray-800 -mx-6 md:-mx-12 px-6 md:px-12 py-4 md:py-5 mb-16 md:mb-24'>
                <div className='pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10' />
                <div className='pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10' />
                <div ref={marqueeRef} className='flex w-max gap-10 md:gap-14 whitespace-nowrap'>
                    {[...skills, ...skills].map((skill, i) => (
                        <span key={i} className='flex items-center gap-10 md:gap-14 text-gray-600 text-lg md:text-2xl font-[font2] uppercase tracking-tight'>
                            {skill}
                            <span className='text-[#E8364E] text-xs md:text-sm'>◆</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Expandable capability index */}
            <div ref={rowsRef}>
                {expertise.map((item, i) => {
                    const isActive = activeIndex === i
                    return (
                        <div key={item.title} className='idx-row border-b border-gray-800 group'>
                            <button
                                onClick={() => setActiveIndex(isActive ? -1 : i)}
                                aria-expanded={isActive}
                                className='w-full flex items-center gap-4 md:gap-8 py-6 md:py-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E] rounded-sm'
                            >
                                <span className={`text-[10px] md:text-xs font-[font2] tracking-widest uppercase w-10 md:w-14 shrink-0 transition-colors duration-300 ${isActive ? 'text-[#E8364E]' : 'text-gray-500'}`}>
                                    0{i + 1}
                                </span>
                                <span className={`flex-1 text-2xl md:text-4xl lg:text-5xl font-[font2] uppercase tracking-tight transition-colors duration-300 ${isActive ? 'text-[#E8364E]' : 'text-white group-hover:text-gray-300'}`}>
                                    {item.title}
                                </span>
                                <span className={`text-2xl md:text-3xl font-[font1] shrink-0 transition-transform duration-300 ease-out ${isActive ? 'rotate-45 text-[#E8364E]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                    +
                                </span>
                            </button>

                            <div
                                className='grid transition-[grid-template-rows] duration-500 ease-in-out'
                                style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                            >
                                <div className='overflow-hidden'>
                                    <div className='pb-8 md:pb-10 pl-14 md:pl-24 pr-4 md:pr-16 flex flex-col md:flex-row md:items-end justify-between gap-6'>
                                        <p className='text-gray-500 text-sm md:text-base font-[font1] leading-relaxed max-w-lg'>
                                            {item.description}
                                        </p>
                                        <div className='flex flex-wrap gap-x-6 gap-y-2 shrink-0'>
                                            {item.tools.map((tool) => (
                                                <span key={tool} className='text-gray-400 text-xs md:text-sm font-[font2] tracking-wider uppercase border-b border-gray-700 pb-0.5'>
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Skills