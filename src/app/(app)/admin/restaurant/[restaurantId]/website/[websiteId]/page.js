'use client'

import { Skeleton } from '@/shadcn-components/ui/skeleton'

import { PaintRoller } from 'lucide-react'
import CardButton from '@/components/CardButton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Link } from 'lucide-react'
import { Eye } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/shadcn-components/ui/tooltip'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useGetWebsiteByRestaurantId } from '@/services/website/useGetWebsiteByRestaurantId'

const WebsiteDashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [isOpenTooltipCopy, setIsOpenTooltipCopy] = useState(false)

    const {
        data: website,
        isLoading: isWebsiteLoading,
        isFetching: isWebsiteFetching,
    } = useGetWebsiteByRestaurantId(user?.restaurant?.id)

    return (
        <>
            <div className="mb-4">
                <BreadcrumbCustom
                    items={[
                        {
                            title: 'Dashboard',
                            href: '/admin/dashboard',
                        },
                        {
                            title: 'Site web',
                            href: `/admin/restaurant/${user?.restaurant?.id}/website/${website?.id}`,
                        },
                    ]}
                />
            </div>
            <div className="flex flex-col flex-wrap gap-4">
                <CardButton
                    title="Apparence"
                    subtitle="Configurer mon site internet"
                    url={`/admin/restaurant/${user?.restaurant?.id}/website/${website?.id}/update`}
                    icon={<PaintRoller size={16} className="text-slate-900" />}
                />
                <div className="flex gap-4">
                    <div className="w-full">
                        <TooltipProvider>
                            <Tooltip open={isOpenTooltipCopy}>
                                <TooltipTrigger asChild>
                                    <div
                                        className="group relative overflow-hidden h-fit shadow-md border bg-white hover:shadow-inner border-slate-200 rounded-md p-3 flex flex-col gap-3 cursor-pointer"
                                        onClick={() => {
                                            setIsOpenTooltipCopy(true)
                                            navigator.clipboard.writeText(
                                                `https://www.eatsup.fr/${user?.restaurant?.type_slug}/${user?.restaurant?.city_slug}/${user?.restaurant?.name_slug}`,
                                            )
                                            setTimeout(() => {
                                                setIsOpenTooltipCopy(false)
                                            }, 2000)
                                        }}>
                                        <Link
                                            size={16}
                                            className="text-slate-900"
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-sm text-slate-900 font-semibold">
                                                Copier le lien
                                            </p>
                                            <p className="text-xs font-light text-slate-500 leading-5">
                                                Copier le lien du site internet
                                            </p>
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Lien copié ✨</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    {isWebsiteLoading || isWebsiteFetching ? (
                        <Skeleton className="h-20 w-full" />
                    ) : (
                        <CardButton
                            title="Afficher"
                            subtitle="Afficher le site internet"
                                url={`/${user?.restaurant?.type_slug}/${user?.restaurant?.city_slug}/${user?.restaurant?.name_slug}`}
                            icon={<Eye size={16} className="text-slate-900" />}
                            widthFull
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default WebsiteDashboard
