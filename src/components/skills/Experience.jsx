import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import experience from '../../Data/experience.json'

gsap.registerPlugin(ScrollTrigger)

const Experience = () => {
    const sectionRef = useRef(null)
    const listRef = useRef(null)
    const lineFillRef = useRef(null)
    const [reducedMotion] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    useGSAP(() => {
        const rows = gsap.utils.toArray('.exp-row')

        if (reducedMotion) {
            gsap.set(lineFillRef.current, { scaleY: 1, transformOrigin: 'top' })
            return
        }

        rows.forEach((row) => {
            gsap.from(row, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            })
        })

        gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: 'top' })
        gsap.to(lineFillRef.current, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: listRef.current,
                start: 'top 70%',
                end: 'bottom 60%',
                scrub: 0.6,
            }
        })
    }, { scope: sectionRef })

    return (
        <div ref={sectionRef} id='experience' className='w-full bg-black px-6 md:px-12 py-20 md:py-32'>
            {/* Section Header */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6 md:gap-0'>
                <div>
                    <p className='text-[#E8364E] text-[10px] md:text-xs uppercase tracking-widest font-[font2] mb-3 md:mb-4'>Experience</p>
                    <h2 className='text-white text-4xl md:text-6xl lg:text-[5vw] font-[font2] uppercase tracking-tighter leading-none mb-4 md:mb-6'>Where I&apos;ve Worked</h2>
                    <p className='text-gray-500 text-sm md:text-base max-w-md font-[font1] leading-relaxed'>
                        A timeline of roles, teams, and the kind of work each one demanded.
                    </p>
                </div>
                <p className='text-gray-600 text-2xl md:text-3xl font-[font2] uppercase tracking-tight'>
                    {String(experience.length).padStart(2, '0')} roles
                </p>
            </div>

            {/* Timeline */}
            <div ref={listRef} className='relative'>
                <div className='absolute left-0 top-0 bottom-0 w-px bg-gray-800' />
                <div ref={lineFillRef} className='absolute left-0 top-0 w-px h-full bg-[#E8364E]' />

                {experience.map((job) => (
                    <div key={job.role} className='exp-row relative pl-10 md:pl-14 pb-14 md:pb-16 last:pb-0'>
                        <span className='absolute left-0 -translate-x-1/2 top-2'>
                            {job.current ? (
                                <span className='relative flex h-2.5 w-2.5'>
                                    {!reducedMotion && (
                                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8364E] opacity-60' />
                                    )}
                                    <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8364E]' />
                                </span>
                            ) : (
                                <span className='block w-2.5 h-2.5 rounded-full border-2 border-gray-700 bg-black' />
                            )}
                        </span>

                        <p className={`text-[10px] md:text-xs font-[font2] tracking-widest uppercase mb-2 md:mb-3 ${job.current ? 'text-[#E8364E]' : 'text-gray-500'}`}>
                            {job.period}
                        </p>
                        <h3 className='text-white text-2xl md:text-4xl font-[font2] uppercase tracking-tight leading-none mb-1.5 md:mb-2'>
                            {job.role}
                        </h3>
                        <p className='text-gray-500 text-sm md:text-base font-[font1] mb-3 md:mb-4'>
                            {job.company}
                        </p>
                        <p className='text-gray-500 text-sm md:text-base font-[font1] leading-relaxed max-w-xl mb-4 md:mb-5'>
                            {job.description}
                        </p>
                        <div className='flex flex-wrap gap-x-5 gap-y-2'>
                            {job.tags.map((tag) => (
                                <span key={tag} className='text-gray-400 text-xs md:text-sm font-[font2] tracking-wider uppercase border-b border-gray-700 pb-0.5'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Experience