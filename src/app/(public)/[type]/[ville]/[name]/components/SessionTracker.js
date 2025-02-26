'use client'

import { useEffect, useCallback } from 'react'
import { useCreateWebsiteSession } from '@/services/website-session/useCreateWebsiteSession'

export default function SessionTracker({ websiteId }) {
  const { mutateAsync: createWebsiteSession } = useCreateWebsiteSession({
    websiteId,
  })

  const handleCreateSession = useCallback(async () => {
    if (!websiteId) {
      console.error('Erreur: websiteId est manquant')
      return
    }

    try {
      console.log('Tentative de création de session pour le site web:', websiteId)
      const ipResponse = await fetch('https://api.ipify.org?format=json')

      if (!ipResponse.ok) {
        throw new Error(`Erreur lors de la récupération de l'IP: ${ipResponse.status}`)
      }

      const ipData = await ipResponse.json()
      console.log('IP récupérée:', ipData.ip)

      const result = await createWebsiteSession({
        ip_address: ipData.ip,
        user_agent: window.navigator.userAgent,
        location: '',
      })

      console.log('Session créée avec succès:', result)
    } catch (error) {
      console.error('Erreur détaillée lors de la création de la session:', error)
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
