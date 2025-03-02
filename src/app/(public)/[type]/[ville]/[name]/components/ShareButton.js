'use client'

import { Share } from 'lucide-react'
import { Button } from '@/shadcn-components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shadcn-components/ui/tooltip'
import { useState } from 'react'

export default function ShareButton({ websiteTitle }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleShare = () => {
        const linkToShare = window.location.href
        const messageToShare = `J'ai trop aimé le restaurant ${websiteTitle}, hésites surtout pas à venir.\nJe te donne le lien avec toutes les infos pour y aller :`

        if (navigator.share) {
            navigator
                .share({
                    title: websiteTitle,
                    text: messageToShare,
                    url: linkToShare,
                })
                .catch(error =>
                    console.log('Partage annulé ou erreur : ', error),
                )
        } else {
            navigator.clipboard.writeText(linkToShare).then(
                () => {
                    setIsOpen(true)
                    setTimeout(() => {
                        setIsOpen(false)
                    }, 1500)
                },
                error =>
                    console.error('Erreur lors de la copie du lien :', error),
            )
        }
    }

    if (navigator.share) {
        return (
            <Button variant="link" onClick={handleShare}>
                Partager
                <Share className="w-4 h-4" />
            </Button>
        )
    }

    return (
        <TooltipProvider>
            <Tooltip open={isOpen}>
                <TooltipTrigger asChild>
                    <Button variant="link" onClick={handleShare}>
                        Partager
                        <Share className="w-4 h-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Lien copié ✨</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
