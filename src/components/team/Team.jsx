import { useEffect, useMemo, useRef, useState } from 'react'
import './Team.css'
import { teamCategories } from '../../data/teamData'

const Team = () => {
  const teamRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('Leads')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

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

  

  const activeTeam = teamCategories.find(cat => cat.name === activeCategory)

  useEffect(() => {
    setQuery('')
  }, [activeCategory])

  const categoryNames = useMemo(() => teamCategories.map(c => c.name), [])

  const getIdFromName = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleTabKeyDown = (index) => (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      const delta = event.key === 'ArrowRight' ? 1 : -1
      const nextIndex = (index + delta + categoryNames.length) % categoryNames.length
      setActiveCategory(categoryNames[nextIndex])
    }
  }

  const filteredMembers = useMemo(() => {
    const members = activeCategory
      ? (activeTeam?.members || [])
      : teamCategories.flatMap((c) => c.members)
    const q = query.trim().toLowerCase()
    const filtered = q
      ? members.filter((m) => {
          const haystack = [
            m.name,
            m.role,
            m.description,
            ...(m.skills || [])
          ]
            .join(' ')
            .toLowerCase()
          return haystack.includes(q)
        })
      : members

    const sorted = [...filtered].sort((a, b) => {
      // Special handling for Leads section - keep lead first
      if (activeCategory === 'Leads') {
        if (a.role === 'Club Lead') return -1
        if (b.role === 'Club Lead') return 1
        if (a.role === 'Club Co-Lead') return -1
        if (b.role === 'Club Co-Lead') return 1
      }
      
      if (sortBy === 'role') {
        return a.role.localeCompare(b.role)
      }
      return a.name.localeCompare(b.name)
    })

    return sorted
  }, [activeTeam, query, sortBy])

  const updateScrollButtons = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollButtons()
    const onScroll = () => updateScrollButtons()
    el.addEventListener('scroll', onScroll, { passive: true })
    const onResize = () => updateScrollButtons()
    window.addEventListener('resize', onResize)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [activeTeam])

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section id="team" className="team" ref={teamRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Meet Our Incredible Team</h2>
          <p className="section-subtitle">
            The brilliant minds behind Velocity Club's success, organized by expertise
          </p>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Team categories">
          {teamCategories.map((category, idx) => {
            const isActive = activeCategory === category.name
            const tabId = `tab-${getIdFromName(category.name)}`
            const panelId = `panel-${getIdFromName(category.name)}`
            return (
              <button
                key={category.name}
                id={tabId}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                className={`category-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory((prev) => (prev === category.name ? null : category.name))}
                onKeyDown={handleTabKeyDown(idx)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
              </button>
            )
          })}
        </div>

        <div className="team-controls">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, role or skill..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search team members"
            />
          </div>
          <div className="sort-wrapper">
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort team members"
            >
              <option value="name">Name</option>
              <option value="role">Role</option>
            </select>
          </div>
          <div className="results-count" aria-live="polite">
            {filteredMembers.length} result{filteredMembers.length === 1 ? '' : 's'}
          </div>
        </div>

        <div
          className="team-members-container"
          role="tabpanel"
          id={`panel-${getIdFromName(activeCategory || 'all')}`}
          aria-labelledby={activeCategory ? `tab-${getIdFromName(activeCategory)}` : undefined}
        >
          <button
            className={`scroll-btn left ${canScrollLeft ? 'visible' : ''}`}
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-320)}
            type="button"
          >
            ◀
          </button>
          <div className="team-members-scroll" ref={scrollRef}>
            {filteredMembers.map((member, memberIndex) => (
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
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin" aria-label={`LinkedIn profile of ${member.name}`}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link github" aria-label={`GitHub profile of ${member.name}`}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter" aria-label={`Twitter profile of ${member.name}`}>
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
                      <button
                        key={skillIndex}
                        type="button"
                        className="skill-tag"
                        onClick={() =>
                          setQuery((prev) =>
                            prev.trim().toLowerCase() === skill.toLowerCase() ? '' : skill
                          )
                        }
                        aria-pressed={query.trim().toLowerCase() === skill.toLowerCase()}
                        aria-label={`Filter by skill ${skill}`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`scroll-btn right ${canScrollRight ? 'visible' : ''}`}
            aria-label="Scroll right"
            onClick={() => scrollByAmount(320)}
            type="button"
          >
            ▶
          </button>
          {filteredMembers.length === 0 && (
            <div className="no-results">No members match your search.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Team
