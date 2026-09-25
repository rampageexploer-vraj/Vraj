import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import contactData from '../../Data/contact.json'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    const sectionRef = useRef(null)
    const emailWrapRef = useRef(null)
    const emailRef = useRef(null)
    const quickX = useRef(null)
    const quickY = useRef(null)
    const [reducedMotion] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        })

        tl.from('.contact-eyebrow', { opacity: 0, y: 12, duration: 0.6 })
            .from('.contact-line', { yPercent: 110, duration: 1, ease: 'power4.out', stagger: 0.1 }, '-=0.2')
            .from('.contact-sub', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
            .from('.contact-email', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
            .from('.contact-meta', { opacity: 0, duration: 0.6 }, '-=0.3')
            .from('.contact-footer', { opacity: 0, duration: 0.6 }, '-=0.3')

        if (emailRef.current) {
            quickX.current = gsap.quickTo(emailRef.current, 'x', { duration: 0.5, ease: 'power3' })
            quickY.current = gsap.quickTo(emailRef.current, 'y', { duration: 0.5, ease: 'power3' })
        }
    }, { scope: sectionRef })

    const handleEmailMove = (e) => {
        if (reducedMotion || !emailWrapRef.current) return
        const rect = emailWrapRef.current.getBoundingClientRect()
        const relX = e.clientX - (rect.left + rect.width / 2)
        const relY = e.clientY - (rect.top + rect.height / 2)
        quickX.current?.(relX * 0.25)
        quickY.current?.(relY * 0.35)
    }

    const handleEmailLeave = () => {
        quickX.current?.(0)
        quickY.current?.(0)
    }

    return (
        <div ref={sectionRef} id='contact' className='w-full bg-black px-6 md:px-12 pt-20 md:pt-32 pb-8 md:pb-10 flex flex-col justify-between min-h-screen'>
            {/* Main */}
            <div className='flex-grow flex flex-col items-center justify-center text-center w-full'>
                <p className='contact-eyebrow text-accent text-2xs md:text-xs uppercase tracking-widest font-font2 mb-3 md:mb-6'>
                    Contact
                </p>

                <h2 className='font-font2 text-4xl sm:text-5xl md:text-display-md leading-none tracking-tighter uppercase text-white mb-4 md:mb-8'>
                    <div className='overflow-hidden'>
                        <div className='contact-line'>Let&apos;s Build</div>
                    </div>
                    <div className='overflow-hidden'>
                        <div className='contact-line'>
                            Something <span className='text-accent font-serif italic lowercase font-normal px-1'>sharp.</span>
                        </div>
                    </div>
                </h2>

                <p className='contact-sub text-gray-500 text-sm md:text-base max-w-md font-font1 leading-relaxed mb-6 md:mb-12 px-2'>
                    Got a project in mind? I&apos;m currently available for freelance work and select collaborations.
                </p>

                {/* Magnetic email CTA */}
                <div
                    ref={emailWrapRef}
                    onMouseMove={handleEmailMove}
                    onMouseLeave={handleEmailLeave}
                    className='contact-email py-4 sm:py-6 md:py-10 px-2 sm:px-4 max-w-full'
                >
                    <a
                        ref={emailRef}
                        href={contactData.email ? `mailto:${contactData.email}` : contactData.mailto}
                        className='inline-block max-w-full text-white text-xl sm:text-3xl md:text-5xl lg:text-6xl font-font2 uppercase tracking-tight leading-tight border-b-2 border-gray-800 hover:border-accent hover:text-accent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm break-all sm:break-normal'
                    >
                        {contactData.email}
                    </a>
                </div>

                {/* Availability + socials */}
                <div className='contact-meta flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 mt-4 md:mt-8 w-full max-w-xl'>
                    <div className='flex items-center justify-center gap-2.5 text-gray-400 text-2xs md:text-xs uppercase tracking-widest font-font2 text-center'>
                        <span className='relative flex h-2 w-2 shrink-0'>
                            {!reducedMotion && (
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60' />
                            )}
                            <span className='relative inline-flex rounded-full h-2 w-2 bg-accent' />
                        </span>
                        <span>{contactData.availability}</span>
                    </div>

                    <div className='hidden md:block w-px h-4 bg-gray-800' />

                    <div className='flex items-center justify-center gap-5 sm:gap-6'>
                        {contactData.socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                className='text-gray-500 text-2xs md:text-xs uppercase tracking-widest font-font2 hover:text-accent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm'
                            >
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer meta row — closes the loop with the hero's top/bottom bars */}
            <footer className='contact-footer w-full border-t border-gray-800 pt-6 mt-12 md:mt-20 font-font2 text-2xs md:text-xs uppercase tracking-widest text-gray-500'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left'>
                    <span>{contactData.copyright}</span>
                    <span className='text-gray-600 sm:text-gray-500'>{contactData.builtWith}</span>
                    <button
                        type='button'
                        onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
                        className='inline-flex items-center gap-1.5 hover:text-accent transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1'
                    >
                        <span>Back to top</span>
                        <span aria-hidden='true'>↑</span>
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default Contact
