import { useEffect, useRef } from 'react'
import './Features.css'

const Features = () => {
  const featuresRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card')
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in')
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: '🤝',
      title: 'Community Building',
      description: 'Connect with like-minded individuals and build lasting relationships in our vibrant community.',
      color: 'var(--primary-color)'
    },
    {
      icon: '💡',
      title: 'Knowledge Sharing',
      description: 'Learn from experts and share your expertise through workshops, discussions, and collaborative projects.',
      color: 'var(--accent-color)'
    },
    {
      icon: '🚀',
      title: 'Project Collaboration',
      description: 'Work together on innovative projects and bring your ideas to life with team support.',
      color: 'var(--secondary-color)'
    },
    {
      icon: '🎯',
      title: 'Skill Development',
      description: 'Enhance your skills through hands-on projects, mentorship, and continuous learning opportunities.',
      color: 'var(--success-color)'
    },
    {
      icon: '🌟',
      title: 'Networking Events',
      description: 'Attend exclusive events, meet industry professionals, and expand your professional network.',
      color: 'var(--warning-color)'
    },
    {
      icon: '🔗',
      title: 'Resource Access',
      description: 'Get access to exclusive tools, libraries, and resources to accelerate your project development.',
      color: 'var(--info-color)'
    }
  ]

  return (
    <section id="features" className="features" ref={featuresRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Join Velocity Club?</h2>
          <p className="section-subtitle">
            Discover the unique benefits that make our community the perfect place for growth and collaboration
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ '--card-color': feature.color }}>
              <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                <span>{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
