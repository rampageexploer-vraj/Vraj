import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../../Data/projects'

gsap.registerPlugin(ScrollTrigger)

const GitHubIcon = () => (
    <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4' aria-hidden='true'>
        <path d='M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2.03c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.68.42.36.79 1.07.79 2.16v3.19c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z' />
    </svg>
)

const ExternalLinkIcon = () => (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='w-4 h-4' aria-hidden='true'>
        <path d='M7 17 17 7M9 7h8v8' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
)

const Projects = () => {
    const sectionRef = useRef(null)
    const listRef = useRef(null)
    const previewRef = useRef(null)
    const quickX = useRef(null)
    const quickY = useRef(null)
    const [activeProject, setActiveProject] = useState(null)
    const [expandedId, setExpandedId] = useState(null)
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

    const toggleProject = (id) => {
        setExpandedId(expandedId === id ? null : id)
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
                        Selected work shaped through strategy, identity and digital craft. Click any case to open the details.
                    </p>
                </div>
                <p className='text-gray-600 text-2xl md:text-3xl font-[font2] uppercase tracking-tight'>
                    {String(projects.length).padStart(2, '0')} cases
                </p>
            </div>

            {/* Project Index */}
            <div ref={listRef}>
                {projects.map((project, i) => {
                    const isExpanded = expandedId === project.id
                    return (
                        <div key={project.id} className='project-row border-b border-gray-800 first:border-t group'>
                            <button
                                type='button'
                                onClick={() => toggleProject(project.id)}
                                onMouseEnter={() => setActiveProject(project)}
                                onMouseLeave={() => setActiveProject(null)}
                                onFocus={() => setActiveProject(project)}
                                onBlur={() => setActiveProject(null)}
                                aria-expanded={isExpanded}
                                className='w-full flex items-center gap-4 md:gap-8 py-6 md:py-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E] rounded-sm'
                            >
                                <span className={`text-[10px] md:text-xs font-[font2] tracking-widest uppercase w-10 md:w-14 shrink-0 transition-colors duration-500 ${isExpanded ? 'text-[#E8364E]' : 'text-gray-500'}`}>
                                    0{i + 1}
                                </span>

                                {/* Inline thumbnail — only surface on touch/mobile where hover preview doesn't apply */}
                                <div className='md:hidden w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-900'>
                                    <img src={project.image} alt='' className='w-full h-full object-cover' loading='lazy' />
                                </div>

                                <span className={`flex-1 text-white text-2xl md:text-5xl lg:text-6xl font-[font2] uppercase tracking-tighter leading-none transition-colors duration-500 ${isExpanded ? 'text-[#E8364E]' : 'group-hover:text-[#E8364E]'}`}>
                                    {project.title}
                                </span>

                                <span className='hidden md:block text-gray-500 text-xs md:text-sm font-[font2] tracking-wider uppercase shrink-0'>
                                    {project.status || 'Project'}
                                </span>

                                <span className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full border shrink-0 transition-all duration-500 ${isExpanded ? 'border-[#E8364E] bg-[#E8364E] text-black rotate-45' : 'border-gray-800 text-gray-600 group-hover:border-[#E8364E] group-hover:text-[#E8364E] group-hover:rotate-45'}`}>
                                    →
                                </span>
                            </button>

                            {/* Expandable Detail Panel */}
                            <div
                                className='grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
                                style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                            >
                                <div className='overflow-hidden'>
                                    <div className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center pb-10 md:pb-14 pt-2 md:pt-6 ${isExpanded ? 'animate-[fadeUp_0.6s_ease_both]' : ''}`}>
                                        {/* Info */}
                                        <div>
                                            <p className='text-[#E8364E] text-[10px] md:text-xs uppercase tracking-widest font-[font2] mb-3'>0{i + 1} — {project.status || 'Project'}</p>
                                            <h3 className='text-white text-2xl md:text-4xl font-[font2] uppercase tracking-tighter leading-none mb-5'>
                                                {project.title}
                                            </h3>
                                            <p className='text-gray-400 font-[font1] leading-relaxed mb-6 max-w-lg'>
                                                {project.description}
                                            </p>

                                            <div className='flex flex-wrap gap-2 mb-8'>
                                                {(project.technologies || []).map((tech) => (
                                                    <span key={tech} className='px-3 py-1.5 rounded-full text-[10px] md:text-[11px] uppercase tracking-widest font-[font2] text-gray-300 bg-white/5 border border-white/10'>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className='flex flex-wrap gap-3'>
                                                {project.githubUrl && project.githubUrl !== '#' ? (
                                                    <a
                                                        href={project.githubUrl}
                                                        target='_blank'
                                                        rel='noreferrer'
                                                        className='inline-flex items-center gap-2.5 border border-gray-700 text-white px-5 md:px-6 py-3 rounded-full font-[font2] text-[11px] uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E]'
                                                    >
                                                        <GitHubIcon />
                                                        GitHub
                                                    </a>
                                                ) : (
                                                    <span className='inline-flex items-center gap-2.5 border border-dashed border-gray-700 text-gray-600 px-5 md:px-6 py-3 rounded-full font-[font2] text-[11px] uppercase tracking-widest cursor-not-allowed'>
                                                        <GitHubIcon />
                                                        GitHub Not Available
                                                    </span>
                                                )}
                                                {project.liveUrl ? (
                                                    <a
                                                        href={project.liveUrl}
                                                        target='_blank'
                                                        rel='noreferrer'
                                                        className='group/link inline-flex items-center gap-2.5 bg-[#E8364E] text-black px-5 md:px-6 py-3 rounded-full font-[font2] text-[11px] uppercase tracking-widest transition-all duration-300 hover:bg-white hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                                                    >
                                                        <span>View Live</span>
                                                        <ExternalLinkIcon />
                                                    </a>
                                                ) : (
                                                    <span className='inline-flex items-center gap-2.5 bg-gray-800 text-gray-600 px-5 md:px-6 py-3 rounded-full font-[font2] text-[11px] uppercase tracking-widest cursor-not-allowed'>
                                                        Live Not Available
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Visual */}
                                        <div className='relative'>
                                            <div className='relative rounded-2xl overflow-hidden aspect-[2/1] bg-gray-900'>
                                                <img src={project.image} alt={project.title} className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105' loading='lazy' />
                                                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent' />
                                                <div className='absolute bottom-0 left-0 p-5 md:p-6 w-full flex items-end justify-between gap-4'>
                                                    <p className='text-white text-sm md:text-base font-[font2] uppercase tracking-wider'>
                                                        {project.title}
                                                    </p>
                                                    <span className='hidden md:block text-white/60 text-[10px] uppercase tracking-widest font-[font2]'>
                                                        {String(projects.length - i).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Cursor-follow preview — desktop only, skipped for reduced-motion users */}
            {!reducedMotion && (
                <div
                    ref={previewRef}
                    className='hidden md:block fixed top-0 left-0 w-[28vw] max-w-[420px] aspect-video pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden transition-opacity duration-300 shadow-2xl shadow-black/50'
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
