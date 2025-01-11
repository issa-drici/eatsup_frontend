'use client'

import { useParams } from 'next/navigation'
import CardStats from '@/components/CardStats'

import { Skeleton } from '@/shadcn-components/ui/skeleton'

import { PaintRoller, TableProperties } from 'lucide-react'
import { CookingPot } from 'lucide-react'
import CardButton from '@/components/CardButton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { useCountMenuCategoriesByMenuId } from '@/services/menu-category/useCountMenuCategoriesByMenuId'
import { useCountMenuItemsByMenuId } from '@/services/menu-item/useCountMenuItemByMenuId'
import { Link } from 'lucide-react'
import { Eye } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/shadcn-components/ui/tooltip'
import { useState } from 'react'

const Menu = () => {
    const { menuId } = useParams()
    const [isOpenTooltipCopy, setIsOpenTooltipCopy] = useState(false)

    const {
        data: menuCategoriesCount,
        isLoading: isLoadingMenuCategoriesCount,
        isFetching: isFetchingMenuCategoriesCount,
    } = useCountMenuCategoriesByMenuId(menuId)

    const {
        data: menuItemsCount,
        isLoading: isLoadingMenuItemsCount,
        isFetching: isFetchingMenuItemsCount,
    } = useCountMenuItemsByMenuId(menuId)

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
                            title: 'Menu',
                            href: `/admin/menu/${menuId}`,
                        },
                    ]}
                />
            </div>
            <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                    {isLoadingMenuCategoriesCount ||
                    isFetchingMenuCategoriesCount ? (
                        <Skeleton className="h-20 w-full" />
                    ) : (
                        <CardStats
                            title="Catégories"
                            progression="30 derniers jours"
                            value={menuCategoriesCount?.count}
                            icon={
                                <TableProperties
                                    size={16}
                                    className="text-slate-400"
                                />
                            }
                        />
                    )}
                    {isLoadingMenuItemsCount || isFetchingMenuItemsCount ? (
                        <Skeleton className="h-20 w-full" />
                    ) : (
                        <CardStats
                            title="Éléments"
                            value={menuItemsCount?.count}
                            icon={
                                <CookingPot
                                    size={16}
                                    className="text-slate-400"
                                />
                            }
                        />
                    )}
                </div>
                <CardButton
                    title="Catégories"
                    subtitle="Gérer les catégories du menu"
                    url={`/admin/menu/${menuId}/categories`}
                    icon={
                        <TableProperties size={16} className="text-slate-900" />
                    }
                />
                <CardButton
                    title="Éléments"
                    subtitle="Gérer les éléments du menu"
                    url={`/admin/menu/${menuId}/items`}
                    icon={<CookingPot size={16} className="text-slate-900" />}
                />
                <CardButton
                    title="Apparence"
                    subtitle="Changer l'apparence du menu"
                    url={`/admin/menu/${menuId}/appearance`}
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
                                                `https://www.eatsup.fr/menu/${menuId}`,
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
                                                Copier le lien du menu
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
                    <CardButton
                        title="Afficher"
                        subtitle="Afficher le menu"
                        url={`/menu/${menuId}`}
                        icon={<Eye size={16} className="text-slate-900" />}
                        widthFull
                    />
                </div>
            </div>
        </>
    )
}

export default Menu
