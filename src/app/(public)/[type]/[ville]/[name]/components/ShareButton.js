'use client'

import { Share } from 'lucide-react'
import { Button } from '@/shadcn-components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shadcn-components/ui/tooltip'
import { useState, useEffect } from 'react'

export default function ShareButton({ websiteTitle }) {
    const [isOpen, setIsOpen] = useState(false)
    const [canShare, setCanShare] = useState(false)

    useEffect(() => {
        setCanShare(typeof navigator !== 'undefined' && !!navigator.share)
    }, [])

    const handleShare = () => {
        const linkToShare = window.location.href
        const messageToShare = `J'ai trop aimé le restaurant ${websiteTitle}, hésites surtout pas à venir.\nJe te donne le lien avec toutes les infos pour y aller :`

        if (canShare) {
            navigator
                .share({
                    title: websiteTitle,
                    text: messageToShare,
                    url: linkToShare,
                })
                .catch(() => {
                    // Partage annulé ou erreur
                })
        } else {
            navigator.clipboard.writeText(linkToShare).then(
                () => {
                    setIsOpen(true)
                    setTimeout(() => {
                        setIsOpen(false)
                    }, 1500)
                },
                () => {
                    // Erreur lors de la copie du lien
                }
            )
        }
    }

    if (canShare) {
        return (
            <Button variant="link" size="icon" onClick={handleShare}>
                <Share className="w-4 h-4" />
            </Button>
        )
    }

    return (
        <TooltipProvider>
            <Tooltip open={isOpen}>
                <TooltipTrigger asChild>
                    <Button variant="link" size="icon" onClick={handleShare}>
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
