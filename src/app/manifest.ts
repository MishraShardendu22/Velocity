import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Velocity - Development Club of IIIT Dharwad',
    short_name: 'Velocity',
    description: 'Velocity is the Development Club of IIIT Dharwad, a community-driven initiative focused on fostering innovation and collaboration among students.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#1a1a1a', // Dark background matching your site
    theme_color: '#ff6b35', // Orange theme matching your branding
    categories: ['education', 'kids', 'learning', 'coding'],
    lang: 'en',
    dir: 'ltr',
    scope: '/',
    
    icons: [
      { 
        src: '/icon-48x48.png', 
        sizes: '48x48', 
        type: 'image/png',
        purpose: 'any'
      },
      { 
        src: '/icon-72x72.png', 
        sizes: '72x72', 
        type: 'image/png',
        purpose: 'any'
      },
      { 
        src: '/icon-96x96.png', 
        sizes: '96x96', 
        type: 'image/png',
        purpose: 'any'
      },
      { 
        src: '/icon-144x144.png', 
        sizes: '144x144', 
        type: 'image/png',
        purpose: 'any'
      },
      { 
        src: '/icon-152x152.png', 
        sizes: '152x152', 
        type: 'image/png',
        purpose: 'any'
      },
      { 
        src: '/icon-180x180.png', 
        sizes: '180x180', 
        type: 'image/png',
        purpose: 'any'
      },
      { 
        src: '/icon-192x192.png', 
        sizes: '192x192', 
        type: 'image/png',
      },
      { 
        src: '/icon-256x256.png', 
        sizes: '256x256', 
        type: 'image/png',
        purpose: 'any'
      },
      { 
        src: '/icon-384x384.png', 
        sizes: '384x384', 
        type: 'image/png',
        purpose: 'any'
      },
      { 
        src: '/icon-512x512.png', 
        sizes: '512x512', 
        type: 'image/png',
      },
    ],
    
    screenshots: [
      {
        src: '/screenshot-desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Velocity Desktop - Code. Create. Conquer.'
      },
      {
        src: '/screenshot-mobile.png',
        sizes: '720x1280',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Velocity Mobile - Code. Create. Conquer.'
      }
    ],
    
    prefer_related_applications: false,
  }
}
