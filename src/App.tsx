import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhoWeWorkWith } from '@/components/WhoWeWorkWith'
import { About } from '@/components/About'
import { Reviews } from '@/components/Reviews'
import { Contact } from '@/components/Contact'
import { WorkGallery } from '@/components/WorkGallery'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WorkGallery />
        <WhoWeWorkWith />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
