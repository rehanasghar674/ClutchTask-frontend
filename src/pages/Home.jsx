import Features from "../components/Features"
import HeroSection from "../components/HeroSection"
import Weblayout from "../layouts/Weblayout"

const Home = () => {
  return (
    <Weblayout>
     <HeroSection />
     <Features />
    </Weblayout>
  )
}

export default Home