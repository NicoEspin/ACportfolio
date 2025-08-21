import React from 'react'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import { Navbar } from '../components/Navbar'


const page = () => {
  return (
    <>
    <Navbar variant="glass" top={20} />
    <ContactSection />
    <Footer />
    
    </>
  )
}

export default page