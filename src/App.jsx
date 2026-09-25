import { useState } from 'react'
import Loader from './components/home/Loader'
import Navbar from './components/Navigation/Navbar'
import FullScreenNav from './components/Navigation/FullScreenNav'
import HomeHeroText from './components/home/HomeHeroText'
import Projects from './components/projects/Projects'
import Skills from './components/skills/Skills'
import Services from './components/services/Services'
import Contact from './components/contact/Contact'
import Experience from './components/experience/Experience'
import About from './components/about/About'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <div className='bg-background-dark min-h-screen w-full relative overflow-hidden text-white'>
      <Navbar />
      <FullScreenNav />
      <HomeHeroText />
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