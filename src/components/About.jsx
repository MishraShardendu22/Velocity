import { useEffect, useRef } from 'react'
import './About.css'

const About = () => {
  const aboutRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.3 }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Velocity Club</h2>
            <p className="about-description">
              Velocity Club is more than just a platform – it's a revolution in how communities 
              connect, collaborate, and grow together. Founded on the principles of innovation, 
              speed, and excellence, we've created a space where ideas flourish and relationships thrive.
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <h3>10K+</h3>
                <p>Active Developers</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Tech Stack</p>
              </div>
              <div className="stat-item">
                <h3>99.9%</h3>
                <p>Uptime SLA</p>
              </div>
            </div>

            <div className="about-features">
              <div className="feature-item">
                <div className="feature-check">✓</div>
                <span>Real-time collaboration tools</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">✓</div>
                <span>Advanced security protocols</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">✓</div>
                <span>24/7 developer support</span>
              </div>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="about-image">
              <div className="image-placeholder">
                <span>🚀</span>
                <p>Velocity Club</p>
              </div>
            </div>
            <div className="floating-card card-1">
              <span>⚡</span>
              <p>Fast & Reliable</p>
            </div>
            <div className="floating-card card-2">
              <span>💻</span>
              <p>Developer First</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
