import { Button } from '@/shadcn-components/ui/button'
import { Share } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import LanguageSelector from '@/components/LanguageSelector'

const TitleBar = ({ restaurant, activeLanguage, setActiveLanguage }) => {
    useEffect(() => {
        const titleBar = document.getElementById('titleBar')
        if (titleBar) {
            document.documentElement.style.setProperty(
                '--titlebar-height',
                `${titleBar.offsetHeight}px`,
            )
        }
    }, [restaurant?.logo?.url])

    return (
        <div
            className={`flex justify-between items-center sticky top-0 z-50 bg-white ${
                restaurant?.logo?.url ? 'py-2' : 'py-1'
            } pl-3 pr-3`}
            id="titleBar">
            <div className="flex items-center gap-2">
                {restaurant?.logo?.url && (
                    <Image
                        src={restaurant.logo?.url}
                        alt={`Logo ${restaurant.name}`}
                        width={200}
                        height={200}
                        className="h-10 w-auto object-contain"
                    />
                )}
                <p className="text-lg font-semibold">
                    {restaurant?.name || 'Mon restaurant'}
                </p>
            </div>
            <div className="flex items-center gap-1">
                {activeLanguage && setActiveLanguage && (
                    <LanguageSelector
                        activeLanguage={activeLanguage}
                        setActiveLanguage={setActiveLanguage}
                    />
                )}
                <Link
                    href={`sms:&body=J'ai trop aimé le restaurant ${restaurant.name}, hésites surtout pas à venir.%0a%0aJe te donne le lien avec toutes les infos pour y aller : ${window.location.href}`}
                    asChild>
                    <Button variant="default" className="flex items-center gap-2 px-3 h-8">
                        Partager
                        <Share className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default TitleBar
