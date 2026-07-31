import { useEffect, useState } from 'react'

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            type='button'
            aria-label='Scroll to top'
            onClick={scrollToTop}
            className={`group fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#E8364E] text-black transition-all duration-300 hover:bg-white hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0 translate-y-4'}`}
        >
            <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5'
                aria-hidden='true'
            >
                <path d='M12 19V5' />
                <path d='m5 12 7-7 7 7' />
            </svg>
        </button>
    )
}

export default ScrollToTop
