import React, { useContext, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { NavbarColorContext, NavbarContext } from '../../context/NavContext'
import vrajLogo from '../../assets/vraj.png'

const Navbar = () => {
    const fillRef = useRef(null)
    const [navOpen, setNavOpen] = useContext(NavbarContext)
    const [navColor] = useContext(NavbarColorContext)

    const isLight = navColor === 'light'

    useGSAP(() => {
        gsap.set(fillRef.current, { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' })
    }, [])

    const handleEnter = () => {
        gsap.to(fillRef.current, {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.45,
            ease: 'power3.out',
        })
    }

    const handleLeave = () => {
        gsap.to(fillRef.current, {
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            duration: 0.35,
            ease: 'power2.in',
        })
    }

    return (
        <div className='z-40 fixed top-0 w-full flex items-center justify-between pointer-events-none'>
            <a href='#top' className='pointer-events-auto pl-4 md:pl-8 py-3'>
                <img src={vrajLogo} alt='Vraj' className='h-10 md:h-12 w-auto' />
            </a>

            <button
                type='button'
                aria-expanded={navOpen}
                aria-label={navOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setNavOpen(!navOpen)}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                className={`group pointer-events-auto relative overflow-hidden lg:h-16 h-12 lg:w-[16vw] w-44 flex items-center justify-end gap-3 lg:gap-4 lg:px-8 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E] ${isLight ? 'bg-white' : 'bg-black'}`}
            >
                <div ref={fillRef} className='absolute inset-0 bg-[#E8364E]' />

                <span
                    className={`relative text-[10px] lg:text-xs uppercase tracking-widest font-[font2] transition-colors duration-300 group-hover:text-black ${isLight ? 'text-black' : 'text-white'}`}
                >
                    {navOpen ? 'Close' : 'Menu'}
                </span>

                <div className='relative flex flex-col items-end justify-center gap-1.5 lg:gap-2 w-6 lg:w-7 h-4 shrink-0'>
                    <span
                        className={`h-0.5 w-full transition-all duration-300 ease-out group-hover:bg-black ${isLight ? 'bg-black' : 'bg-white'} ${navOpen ? 'rotate-45 translate-y-[4px] lg:translate-y-[5px]' : ''}`}
                    />
                    <span
                        className={`h-0.5 transition-all duration-300 ease-out group-hover:bg-black ${isLight ? 'bg-black' : 'bg-white'} ${navOpen ? '-rotate-45 -translate-y-[4px] lg:-translate-y-[5px] w-full' : 'w-2/3'}`}
                    />
                </div>
            </button>
        </div>
    )
}

export default Navbar
