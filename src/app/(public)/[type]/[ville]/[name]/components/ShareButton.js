'use client'

import { Share } from 'lucide-react'
import { Button } from '@/shadcn-components/ui/button'

export default function ShareButton({ websiteTitle }) {
  const handleShare = () => {
    const linkToShare = window.location.href
    const messageToShare = `J'ai trop aimé le restaurant ${websiteTitle}, hésites surtout pas à venir.\nJe te donne le lien avec toutes les infos pour y aller : ${linkToShare}`

    if (navigator.share) {
      navigator
        .share({
          title: 'Lien à partager',
          text: messageToShare,
          url: linkToShare,
        })
        .catch(error => console.log('Partage annulé ou erreur : ', error))
    } else {
      navigator.clipboard.writeText(linkToShare).then(
        () => {
          alert('Lien copié dans le presse-papiers !')
        },
        error => console.error('Erreur lors de la copie du lien :', error)
      )
    }
  }

  return (
    <Button variant="link" onClick={handleShare}>
      Partager
      <Share className="w-4 h-4" />
    </Button>
  )
}
