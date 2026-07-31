import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    },
    {
        id: 2,
        title: 'Brand Identity',
        category: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
    },
    {
        id: 3,
        title: 'Mobile App Design',
        category: 'App Design',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80'
    },
    {
        id: 4,
        title: 'Dashboard UI',
        category: 'Web Application',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    }
]

const Projects = () => {
    const sectionRef = useRef(null)
    const listRef = useRef(null)
    const previewRef = useRef(null)
    const quickX = useRef(null)
    const quickY = useRef(null)
    const [activeProject, setActiveProject] = useState(null)
    const [reducedMotion] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    useGSAP(() => {
        gsap.from('.project-row', {
            opacity: 0,
            y: 32,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
                trigger: listRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        })

        if (previewRef.current && !reducedMotion) {
            quickX.current = gsap.quickTo(previewRef.current, 'x', { duration: 0.6, ease: 'power3' })
            quickY.current = gsap.quickTo(previewRef.current, 'y', { duration: 0.6, ease: 'power3' })
        }
    }, { scope: sectionRef })

    const handleMouseMove = (e) => {
        quickX.current?.(e.clientX)
        quickY.current?.(e.clientY)
    }

    return (
        <div
            ref={sectionRef}
            id='projects'
            className='w-full bg-black px-6 md:px-12 py-20 md:py-32'
            onMouseMove={reducedMotion ? undefined : handleMouseMove}
        >
            {/* Section Header */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-0'>
                <div>
                    <p className='text-[#E8364E] text-[10px] md:text-xs uppercase tracking-widest font-[font2] mb-3 md:mb-4'>Projects</p>
                    <h2 className='text-white text-4xl md:text-6xl lg:text-[5vw] font-[font2] uppercase tracking-tighter leading-none mb-4 md:mb-6'>Selected Work</h2>
                    <p className='text-gray-500 text-sm md:text-base max-w-md font-[font1] leading-relaxed'>
                        Selected work shaped through strategy, identity and digital craft.
                    </p>
                </div>
                <p className='text-gray-600 text-2xl md:text-3xl font-[font2] uppercase tracking-tight'>
                    {String(projects.length).padStart(2, '0')} cases
                </p>
            </div>

            {/* Project Index */}
            <div ref={listRef}>
                {projects.map((project, i) => (
                    <a
                        key={project.id}
                        href='#'
                        className='project-row group flex items-center gap-4 md:gap-8 py-6 md:py-10 border-b border-gray-800 first:border-t focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E] rounded-sm'
                        onMouseEnter={() => setActiveProject(project)}
                        onMouseLeave={() => setActiveProject(null)}
                        onFocus={() => setActiveProject(project)}
                        onBlur={() => setActiveProject(null)}
                    >
                        <span className='text-gray-500 text-[10px] md:text-xs font-[font2] tracking-widest uppercase w-10 md:w-14 shrink-0'>
                            0{i + 1}
                        </span>

                        {/* Inline thumbnail — only surface on touch/mobile where hover preview doesn't apply */}
                        <div className='md:hidden w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-900'>
                            <img src={project.image} alt='' className='w-full h-full object-cover' loading='lazy' />
                        </div>

                        <span className='flex-1 text-white text-2xl md:text-5xl lg:text-6xl font-[font2] uppercase tracking-tighter leading-none group-hover:text-[#E8364E] transition-colors duration-500'>
                            {project.title}
                        </span>

                        <span className='hidden md:block text-gray-500 text-xs md:text-sm font-[font2] tracking-wider uppercase shrink-0'>
                            {project.category}
                        </span>

                        <span className='hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-gray-800 text-gray-600 shrink-0 group-hover:border-[#E8364E] group-hover:text-[#E8364E] group-hover:rotate-45 transition-all duration-500'>
                            →
                        </span>
                    </a>
                ))}
            </div>

            {/* Cursor-follow preview — desktop only, skipped for reduced-motion users */}
            {!reducedMotion && (
                <div
                    ref={previewRef}
                    className='hidden md:block fixed top-0 left-0 w-[22vw] max-w-[340px] aspect-[4/5] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden transition-opacity duration-300 shadow-2xl shadow-black/50'
                    style={{ opacity: activeProject ? 1 : 0 }}
                >
                    {projects.map((project) => (
                        <img
                            key={project.id}
                            src={project.image}
                            alt=''
                            className='absolute inset-0 w-full h-full object-cover transition-opacity duration-300'
                            style={{ opacity: activeProject?.id === project.id ? 1 : 0 }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Projects