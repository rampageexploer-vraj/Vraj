import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useContext, useRef } from 'react'
import { NavbarContext } from '../../context/NavContext'
import navItems from '../../data/navigation.json'
import projects from '../../data/projects.json'

const FullScreenNav = () => {
    const fullScreenRef = useRef(null)
    const [navOpen, setNavOpen] = useContext(NavbarContext)

    function gsapAnimation() {
        const tl = gsap.timeline()
        tl.to(fullScreenRef.current, {
            display: 'flex',
            duration: 0.1
        })
        tl.to('.stairing', {
            delay: 0.2,
            height: '100%',
            stagger: {
                amount: -0.3
            },
            ease: "power3.inOut"
        })
        tl.to('.navlink-ui', {
            opacity: 1,
            duration: 0.3
        })
        tl.to('.nav-item', {
            opacity: 1,
            rotateX: 0,
            y: 0,
            stagger: {
                amount: 0.3
            },
            ease: "power2.out"
        }, "-=0.1")
    }

    function gsapAnimationReverse() {
        const tl = gsap.timeline()
        tl.to('.nav-item', {
            opacity: 0,
            rotateX: 90,
            y: 20,
            stagger: {
                amount: 0.1
            },
            ease: "power2.in"
        })
        tl.to('.navlink-ui', {
            opacity: 0,
            duration: 0.2
        }, "-=0.2")
        tl.to('.stairing', {
            height: 0,
            stagger: {
                amount: 0.1
            },
            ease: "power3.inOut"
        })
        tl.to(fullScreenRef.current, {
            display: 'none',
            duration: 0.1
        })
    }

    useGSAP(function () {
        if (navOpen) {
            gsapAnimation()
        } else {
            gsapAnimationReverse()
        }
    }, [navOpen])

    return (
        <div
            ref={fullScreenRef}
            className='fixed inset-0 text-white z-50 hidden flex-col justify-between overflow-hidden'
        >
            {/* Stairing Background Animation */}
            <div className='absolute inset-0 w-full h-full -z-10 flex'>
                <div className='stairing h-0 w-1/5 bg-[#0a0a0a]'></div>
                <div className='stairing h-0 w-1/5 bg-[#0a0a0a]'></div>
                <div className='stairing h-0 w-1/5 bg-[#0a0a0a]'></div>
                <div className='stairing h-0 w-1/5 bg-[#0a0a0a]'></div>
                <div className='stairing h-0 w-1/5 bg-[#0a0a0a]'></div>
            </div>

            {/* Top Bar */}
            <div className='navlink-ui opacity-0 flex justify-between items-center px-6 md:px-12 py-6 w-full border-b border-gray-800'>
                <div className='font-[font2] text-xl md:text-2xl font-bold uppercase tracking-widest'>VRAJ</div>
                <div className='absolute left-1/2 -translate-x-1/2 text-[10px] text-gray-400 uppercase tracking-widest font-[font2] hidden md:block'>
                    MENU / 04
                </div>
                {/* Close Button */}
                <div
                    onClick={() => setNavOpen(false)}
                    className='relative w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center cursor-pointer hover:border-white transition-colors group'
                >
                    <div className='w-6 h-[1px] bg-[#E8364E] absolute rotate-45 group-hover:rotate-[135deg] transition-transform duration-500'></div>
                    <div className='w-6 h-[1px] bg-[#E8364E] absolute -rotate-45 group-hover:rotate-[45deg] transition-transform duration-500'></div>
                </div>
            </div>

            {/* Main Links */}
            <div className='flex flex-col w-full flex-grow'>
                {navItems.map((item, index) => (
                    <div key={item.id} className='link flex-1 border-b border-gray-800 flex items-center group cursor-pointer transition-colors origin-top relative overflow-hidden' style={{ perspective: '1000px' }}>

                        <div className='w-full px-6 md:px-12 flex justify-between items-center relative z-10'>

                            <div className='nav-item w-1/4 text-[10px] md:text-xs text-gray-500 font-[font2] tracking-widest origin-bottom' style={{ transform: 'translateY(20px) rotateX(90deg)', opacity: 0 }}>
                                {item.id}
                            </div>

                            <div className='nav-item w-1/2 text-center text-4xl md:text-[8vw] font-[font2] uppercase tracking-tighter text-white group-hover:text-[#E8364E] transition-colors leading-none origin-bottom' style={{ transform: 'translateY(20px) rotateX(90deg)', opacity: 0 }}>
                                {item.title}
                            </div>

                            <div className='nav-item w-1/4 text-right text-[10px] md:text-xs text-gray-500 font-[font2] tracking-widest uppercase hidden md:block origin-bottom' style={{ transform: 'translateY(20px) rotateX(90deg)', opacity: 0 }}>
                                {item.desc}
                            </div>

                        </div>

                        {/* Marquee on Hover */}
                        <div className='moveLink absolute inset-0 text-black flex items-center bg-[#E8364E] z-20 pointer-events-none overflow-hidden'>
                            <div className='moveX flex items-center h-full'>
                                {projects.map((project) => (
                                    <div key={project.id} className='flex items-center h-full'>
                                        <h2 className='whitespace-nowrap font-[font2] text-4xl md:text-[6vw] uppercase px-4'>{item.title}</h2>
                                        <img className='h-12 md:h-20 rounded-full shrink-0 w-24 md:w-64 object-cover' src={project.image} alt='' loading='lazy' />
                                    </div>
                                ))}
                            </div>
                            <div className='moveX flex items-center h-full'>
                                {projects.map((project) => (
                                    <div key={project.id} className='flex items-center h-full'>
                                        <h2 className='whitespace-nowrap font-[font2] text-4xl md:text-[6vw] uppercase px-4'>{item.title}</h2>
                                        <img className='h-12 md:h-20 rounded-full shrink-0 w-24 md:w-64 object-cover' src={project.image} alt='' loading='lazy' />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* Bottom Bar */}
            <div className='navlink-ui opacity-0 flex justify-between items-center px-6 md:px-12 py-6 text-[10px] text-gray-500 uppercase tracking-widest font-[font2] w-full'>
                <span>VRAJ Makwana</span>
                <span className='hidden md:inline'>WEB DESIGNER & FRONTEND DEVELOPER</span>
                <span>REACT, TAILWIND, UI</span>
            </div>

        </div>
    )
}

export default FullScreenNav