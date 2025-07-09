'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import LanguageSelector from '@/components/LanguageSelector'
import ShareButton from '@/app/(public)/[type]/[ville]/[name]/components/ShareButton'
import { Button } from '@/shadcn-components/ui/button'
import Link from 'next/link'
import { Info } from 'lucide-react'
import { useLanguage } from '@/app/(public)/restaurant/[restaurantId]/menu/[menuId]/context/LanguageContext'
import { cn } from '@/lib/utils'

const TitleBar = ({ restaurant }) => {
    const { activeLanguage, setActiveLanguage } = useLanguage()

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
            className={cn(
                'flex justify-between items-center sticky top-0 z-50 md:z-10 bg-white md:bg-sidebar',
                restaurant?.logo?.url ? 'py-2' : 'py-1',
                'pl-3 pr-3',
            )}
            id="titleBar">
            <div className="flex items-center gap-2">
                {restaurant?.logo?.url && (
                    <Image
                        src={restaurant.logo.url}
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
                <LanguageSelector
                    activeLanguage={activeLanguage}
                    setActiveLanguage={setActiveLanguage}
                />
                <ShareButton websiteTitle={restaurant?.name} />
                <Link
                    href={`https://www.eatsup.fr/${restaurant?.type_slug}/${restaurant?.city_slug}/${restaurant?.name_slug}`}
                    asChild>
                    <Button variant="link" size="icon">
                        <Info className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default TitleBar
