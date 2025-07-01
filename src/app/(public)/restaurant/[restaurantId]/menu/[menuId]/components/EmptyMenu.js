'use client'

import { Button } from '@/shadcn-components/ui/button'
import { useRouter } from 'next/navigation'
import { translations } from '../config/translations'

const EmptyMenu = ({ activeLanguage }) => {
    const router = useRouter()

    return (
        <div className="flex flex-col h-[calc(100vh_-_88px)] justify-center items-center text-base p-14 gap-3">
            <p className="text-center">
                {translations.emptyMenu[activeLanguage] || translations.emptyMenu.fr}
            </p>
            <p className="text-center">
                {translations.ownerQuestion[activeLanguage] || translations.ownerQuestion.fr}
            </p>
            <Button
                className=""
                onClick={() => router.push('/login')}>
                {translations.fillMenu[activeLanguage] || translations.fillMenu.fr}
            </Button>
        </div>
    )
}

export default EmptyMenu
