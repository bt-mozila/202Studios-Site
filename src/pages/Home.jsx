import Hero from '../components/home/Hero.jsx'
import About from '../components/home/About.jsx'
import Services from '../components/home/Services.jsx'
import Repairs from '../components/home/Repairs.jsx'
import Portfolio from '../components/home/Portfolio.jsx'
import Faq from '../components/home/Faq.jsx'
import Cta from '../components/home/Cta.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Repairs />
      <Portfolio />
      <Faq />
      <Cta />
    </>
  )
}
