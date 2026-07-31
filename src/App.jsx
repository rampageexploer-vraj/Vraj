import React, { useContext, useState } from 'react'
import Loader from './components/home/loder'
import Navbar from './components/Navigation/Navbar'
import FullScreenNav from './components/Navigation/FullScreenNav'
import HomeHeroText from './components/home/HomeHeroText'
import Projects from './components/projects/Projects'
import Skills from './components/skills/Skills'
import { NavbarContext } from './context/NavContext'
import Services from './components/skills/Services'
import Contact from './components/skills/Contact'
import Experience from './components/skills/Experience'
import About from './components/skills/About'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <div className='bg-[#0f0f0f] min-h-screen w-full relative overflow-hidden text-white'>
      <Navbar />
      <FullScreenNav />
      <HomeHeroText start={loaded} />
      <About />
      <Services />
      <Experience />
     
      <Projects />
      <Skills />
      <Contact />
      <ScrollToTop />
      </div>
    </>
  )
}

export default App