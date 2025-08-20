import { useEffect, useRef, useState } from 'react'
import './Hero.css'
import Logo3D from '../3D-Logo/logo'

const Hero = () => {
  const heroRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="tech-pattern"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <div className={`hero-title-container ${isLoaded ? 'loaded' : ''}`}>
            <h1 className="hero-title">
              <span className="title-line line-1">Welcome to</span>
              <span className="title-line line-2">
                <span className="brand-text">Velocity</span>
                <span className="brand-text">Club</span>
              </span>
            </h1>
          </div>
          
          <p className={`hero-subtitle ${isLoaded ? 'loaded' : ''}`}>
            Experience the future of community building with cutting-edge technology 
            and innovative solutions that bring people together.
          </p>
          
          <div className={`hero-buttons ${isLoaded ? 'loaded' : ''}`}>
            <button className="hero-btn primary">Upcoming Events</button>
            <button className="hero-btn secondary">Our Projects</button>
          </div>
        </div>
        <div>
          <Logo3D/>
        </div>
        {/* <div className={`hero-visual ${isLoaded ? 'loaded' : ''}`}>
          <div className="cards-row">
            <div className="hero-card card-1">
              <div className="card-icon">🎯</div>
              <h3>Community Focus</h3>
              <p>Building strong connections</p>
            </div>
            <div className="hero-card card-2">
              <div className="card-icon">🌟</div>
              <h3>Innovation Hub</h3>
              <p>Creative solutions & ideas</p>
            </div>
          </div>
          <div className="cards-row center">
            <div className="hero-card card-3">
              <div className="card-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>Working together</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Hero
