import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <a href="#home" className="navbar-brand">
          Velocity Club
        </a>
        
        <div className="nav-links">
          <a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a>
          <a href="#features" className="nav-link" onClick={closeMobileMenu}>Features</a>
          <a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a>
          <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a>
        </div>

        <button className="nav-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-links">
          <a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a>
          <a href="#features" className="nav-link" onClick={closeMobileMenu}>Features</a>
          <a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a>
          <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
