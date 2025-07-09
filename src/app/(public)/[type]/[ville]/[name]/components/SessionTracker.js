'use client'

import { useEffect, useCallback } from 'react'
import { useCreateWebsiteSession } from '@/services/website-session/useCreateWebsiteSession'

export default function SessionTracker({ websiteId }) {
  const { mutateAsync: createWebsiteSession } = useCreateWebsiteSession({
    websiteId,
  })

  const handleCreateSession = useCallback(async () => {
            if (!websiteId) {
            return
        }

    try {

      const ipResponse = await fetch('https://api.ipify.org?format=json')

      if (!ipResponse.ok) {
        throw new Error(`Erreur lors de la récupération de l'IP: ${ipResponse.status}`)
      }

              const ipData = await ipResponse.json()

              await createWebsiteSession({
        ip_address: ipData.ip,
        user_agent: window.navigator.userAgent,
        location: '',
      })

              // Session créée avec succès
    } catch (error) {
        // Gérer l'erreur silencieusement
    }
  }, [websiteId, createWebsiteSession])

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
  }, [handleCreateSession])

  return <div className='hidden'>SessionTracker</div>
}
