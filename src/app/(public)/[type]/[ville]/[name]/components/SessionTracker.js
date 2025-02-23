'use client'

import { useEffect } from 'react'
import { useCreateWebsiteSession } from '@/services/website-session/useCreateWebsiteSession'

export default function SessionTracker({ websiteId }) {
  const { mutate: createWebsiteSession } = useCreateWebsiteSession({
    websiteId,
  })

  const handleCreateSession = async () => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json')
      const ipData = await ipResponse.json()

      await createWebsiteSession({
        ip_address: ipData.ip,
        user_agent: window.navigator.userAgent,
        location: '',
      })
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error)
    }
  }

  useEffect(() => {
    handleCreateSession()

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleCreateSession()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null
}
