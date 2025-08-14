'use client'
import { useEffect } from 'react'

export default function Page() {

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(e as any).prompt()
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  return (
    <div>

    </div>
  );
}
