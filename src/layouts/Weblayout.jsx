import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Weblayout = ({children}) => {
  return (
    <>
     <div className="container mx-auto p-2">
       <Navbar /> 
       {children} 
       <Footer /> 
     </div>
    </>
  )
}

export default Weblayout