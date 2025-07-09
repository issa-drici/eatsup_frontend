'use client'

import { Button } from '@/shadcn-components/ui/button'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AIGeneratorButton = ({ variant = "default", size = "default", className = "" }) => {
    const router = useRouter()

    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            onClick={() => router.push('/admin/ai-menu-generator')}
        >
            <Sparkles className="w-4 h-4 mr-2" />
            Générer avec l'IA
        </Button>
    )
}

export default AIGeneratorButton
