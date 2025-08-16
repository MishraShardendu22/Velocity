import { useEffect, useRef, useState } from 'react'
import './Team.css'

const Team = () => {
  const teamRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('Leads')

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

    if (teamRef.current) {
      observer.observe(teamRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const teamCategories = [
    {
      name: 'Leads',
      icon: '🛡️',
      members: [
        {
          name: 'John Smith',
          role: 'Club Lead',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          description: 'Visionary leader driving innovation and community growth',
          skills: ['Leadership', 'Strategy', 'Community Building', 'Innovation'],
          linkedin: 'https://linkedin.com/in/johnsmith',
          github: 'https://github.com/johnsmith',
          twitter: 'https://twitter.com/johnsmith'
        },
        {
          name: 'Emily Brown',
          role: 'Club Co-Lead',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
          description: 'Passionate about fostering collaboration and technical excellence',
          skills: ['Team Management', 'Project Planning', 'Technical Leadership', 'Mentoring'],
          linkedin: 'https://linkedin.com/in/emilybrown',
          github: 'https://github.com/emilybrown',
          twitter: 'https://twitter.com/emilybrown'
        }
      ]
    },
    {
      name: 'Frontend Development',
      icon: '🎨',
      members: [
        {
          name: 'Sarah Kim',
          role: 'Senior Frontend Developer',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
          description: 'React specialist with 5+ years building beautiful user interfaces',
          skills: ['React', 'TypeScript', 'CSS3', 'UI/UX'],
          linkedin: 'https://linkedin.com/in/sarahkim',
          github: 'https://github.com/sarahkim',
          twitter: 'https://twitter.com/sarahkim'
        },
        {
          name: 'Alex Chen',
          role: 'Frontend Engineer',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          description: 'Vue.js expert passionate about component architecture',
          skills: ['Vue.js', 'JavaScript', 'Sass', 'Webpack'],
          linkedin: 'https://linkedin.com/in/alexchen',
          github: 'https://github.com/alexchen',
          twitter: 'https://twitter.com/alexchen'
        },
        {
          name: 'Maria Garcia',
          role: 'UI/UX Designer',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
          description: 'Creating intuitive and beautiful user experiences',
          skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
          linkedin: 'https://linkedin.com/in/mariagarcia',
          github: 'https://github.com/mariagarcia',
          twitter: 'https://twitter.com/mariagarcia'
        },
        {
          name: 'Tom Wilson',
          role: 'Frontend Developer',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
          description: 'Angular expert with focus on performance optimization',
          skills: ['Angular', 'RxJS', 'Performance', 'Testing'],
          linkedin: 'https://linkedin.com/in/tomwilson',
          github: 'https://github.com/tomwilson',
          twitter: 'https://twitter.com/tomwilson'
        }
      ]
    },
    {
      name: 'Backend Development',
      icon: '⚙️',
      members: [
        {
          name: 'David Park',
          role: 'Backend Architect',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          description: 'Node.js and Python expert building scalable APIs',
          skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
          linkedin: 'https://linkedin.com/in/davidpark',
          github: 'https://github.com/davidpark',
          twitter: 'https://twitter.com/davidpark'
        },
        {
          name: 'Marcus Rodriguez',
          role: 'DevOps Engineer',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
          description: 'Infrastructure specialist ensuring smooth deployments',
          skills: ['AWS', 'Kubernetes', 'CI/CD', 'Monitoring'],
          linkedin: 'https://linkedin.com/in/marcusrodriguez',
          github: 'https://github.com/marcusrodriguez',
          twitter: 'https://twitter.com/marcusrodriguez'
        },
        {
          name: 'Anna Lee',
          role: 'Database Engineer',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
          description: 'Database optimization and data architecture expert',
          skills: ['MySQL', 'MongoDB', 'Redis', 'Data Modeling'],
          linkedin: 'https://linkedin.com/in/annalee',
          github: 'https://github.com/annalee',
          twitter: 'https://twitter.com/annalee'
        },
        {
          name: 'Carlos Mendez',
          role: 'Backend Developer',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          description: 'Java and Spring Boot specialist',
          skills: ['Java', 'Spring Boot', 'Microservices', 'REST APIs'],
          linkedin: 'https://linkedin.com/in/carlosmendez',
          github: 'https://github.com/carlosmendez',
          twitter: 'https://twitter.com/carlosmendez'
        }
      ]
    },
    {
      name: 'Full-Stack Development',
      icon: '🚀',
      members: [
        {
          name: 'Emma Watson',
          role: 'Full-Stack Developer',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
          description: 'Versatile developer building end-to-end solutions',
          skills: ['React', 'Node.js', 'MongoDB', 'GraphQL'],
          linkedin: 'https://linkedin.com/in/emmawatson',
          github: 'https://github.com/emmawatson',
          twitter: 'https://twitter.com/emmawatson'
        },
        {
          name: 'Lisa Chang',
          role: 'Senior Full-Stack Engineer',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
          description: 'Experienced developer leading complex projects',
          skills: ['Angular', 'Java', 'MySQL', 'Microservices'],
          linkedin: 'https://linkedin.com/in/lisachang',
          github: 'https://github.com/lisachang',
          twitter: 'https://twitter.com/lisachang'
        },
        {
          name: 'Ryan Johnson',
          role: 'Full-Stack Developer',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          description: 'Building scalable web applications',
          skills: ['Vue.js', 'Express', 'PostgreSQL', 'Docker'],
          linkedin: 'https://linkedin.com/in/ryanjohnson',
          github: 'https://github.com/ryanjohnson',
          twitter: 'https://twitter.com/ryanjohnson'
        },
        {
          name: 'Sophia Kim',
          role: 'Full-Stack Engineer',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
          description: 'Modern web technologies enthusiast',
          skills: ['Next.js', 'TypeScript', 'Prisma', 'Vercel'],
          linkedin: 'https://linkedin.com/in/sophiakim',
          github: 'https://github.com/sophiakim',
          twitter: 'https://twitter.com/sophiakim'
        }
      ]
    },
    {
      name: 'App Development',
      icon: '📱',
      members: [
        {
          name: 'James Wilson',
          role: 'Mobile App Developer',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
          description: 'React Native and Flutter expert building cross-platform apps',
          skills: ['React Native', 'Flutter', 'iOS', 'Android'],
          linkedin: 'https://linkedin.com/in/jameswilson',
          github: 'https://github.com/jameswilson',
          twitter: 'https://twitter.com/jameswilson'
        },
        {
          name: 'Sophie Brown',
          role: 'iOS Developer',
          image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
          description: 'Swift specialist creating native iOS experiences',
          skills: ['Swift', 'SwiftUI', 'Core Data', 'ARKit'],
          linkedin: 'https://linkedin.com/in/sophiebrown',
          github: 'https://github.com/sophiebrown',
          twitter: 'https://twitter.com/sophiebrown'
        },
        {
          name: 'Mike Chen',
          role: 'Android Developer',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          description: 'Kotlin expert building native Android apps',
          skills: ['Kotlin', 'Android SDK', 'Jetpack', 'Material Design'],
          linkedin: 'https://linkedin.com/in/mikechen',
          github: 'https://github.com/mikechen',
          twitter: 'https://twitter.com/mikechen'
        },
        {
          name: 'Jessica Davis',
          role: 'Cross-Platform Developer',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
          description: 'Building apps that work everywhere',
          skills: ['Flutter', 'Dart', 'Firebase', 'State Management'],
          linkedin: 'https://linkedin.com/in/jessicadavis',
          github: 'https://github.com/jessicadavis',
          twitter: 'https://twitter.com/jessicadavis'
        }
      ]
    }
  ]

  const activeTeam = teamCategories.find(cat => cat.name === activeCategory)

  return (
    <section id="team" className="team" ref={teamRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Meet Our Incredible Team</h2>
          <p className="section-subtitle">
            The brilliant minds behind Velocity Club's success, organized by expertise
          </p>
        </div>
        
        <div className="category-tabs">
          {teamCategories.map((category) => (
            <button
              key={category.name}
              className={`category-tab ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.name)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-name">{category.name}</span>
            </button>
          ))}
        </div>
        
        <div className="team-members-container">
          <div className="team-members-scroll">
            {activeTeam?.members.map((member, memberIndex) => (
              <div key={memberIndex} className="team-member-card">
                <div className="member-photo-container">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="member-photo"
                    loading="lazy"
                  />
                  <div className="member-overlay">
                    <div className="social-links">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link github">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="member-info">
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-description">{member.description}</p>
                  <div className="member-skills">
                    {member.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
