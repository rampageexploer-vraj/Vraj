import React, { useRef, useState } from 'react'
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
        <div ref={sectionRef} id='contact' className='w-full bg-black px-6 md:px-12 pt-24 md:pt-32 pb-10 flex flex-col justify-between min-h-screen'>
            {/* Main */}
            <div className='flex-grow flex flex-col items-center justify-center text-center'>
                <p className='contact-eyebrow text-[#E8364E] text-[10px] md:text-xs uppercase tracking-widest font-[font2] mb-4 md:mb-6'>
                    Contact
                </p>

                <h2 className='font-[font2] text-[11vw] md:text-[6.5vw] leading-[0.9] tracking-tighter uppercase text-white mb-6 md:mb-8'>
                    <div className='overflow-hidden'>
                        <div className='contact-line'>Let&apos;s Build</div>
                    </div>
                    <div className='overflow-hidden'>
                        <div className='contact-line'>
                            Something <span className='text-[#E8364E]'>Sharp.</span>
                        </div>
                    </div>
                </h2>

                <p className='contact-sub text-gray-500 text-sm md:text-base max-w-md font-[font1] leading-relaxed mb-10 md:mb-14'>
                    Got a project in mind? I&apos;m currently available for freelance work and select collaborations.
                </p>

                {/* Magnetic email CTA */}
                <div
                    ref={emailWrapRef}
                    onMouseMove={handleEmailMove}
                    onMouseLeave={handleEmailLeave}
                    className='contact-email py-6 md:py-10 px-4'
                >
                    <a
                        ref={emailRef}
                        href={contactData.mailto}
                        className='inline-block max-w-full break-words text-white text-[5vw] md:text-[3.2vw] font-[font2] uppercase tracking-tight leading-none border-b-2 border-gray-800 hover:border-[#E8364E] hover:text-[#E8364E] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E] rounded-sm'
                    >
                        {contactData.email}
                    </a>
                </div>

                {/* Availability + socials */}
                <div className='contact-meta flex flex-col md:flex-row items-center gap-6 md:gap-10 mt-4 md:mt-6'>
                    <div className='flex items-center gap-2.5 text-gray-400 text-[10px] md:text-xs uppercase tracking-widest font-[font2]'>
                        <span className='relative flex h-2 w-2'>
                            {!reducedMotion && (
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8364E] opacity-60' />
                            )}
                            <span className='relative inline-flex rounded-full h-2 w-2 bg-[#E8364E]' />
                        </span>
                        Available for freelance — {contactData.availability}
                    </div>

                    <div className='hidden md:block w-px h-4 bg-gray-800' />

                    <div className='flex items-center gap-5 md:gap-6'>
                        {contactData.socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                className='text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-[font2] hover:text-[#E8364E] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E] rounded-sm'
                            >
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer meta row — closes the loop with the hero's top/bottom bars */}
            <div className='contact-footer flex flex-col sm:flex-row flex-wrap justify-between items-center gap-x-6 gap-y-3 text-center sm:text-left text-[10px] text-gray-500 border-t border-gray-800 pt-6 mt-16 md:mt-20 uppercase tracking-widest font-[font2] w-full'>
                <span>{contactData.copyright}</span>
                <span className='order-last sm:order-none w-full sm:w-auto'>{contactData.builtWith}</span>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
                    className='hover:text-[#E8364E] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8364E] rounded-sm'
                >
                    Back to top ↑
                </button>
            </div>
        </div>
    )
}

export default Contact