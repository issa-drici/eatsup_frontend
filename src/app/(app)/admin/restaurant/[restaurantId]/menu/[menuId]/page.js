'use client'

import { useParams } from 'next/navigation'
import { useFindMenuById } from '@/services/menu/useFindMenuById'
import { useFindAllMenuCategoriesByMenuId } from '@/services/menu-category/useFindAllMenuCategoriesByMenuId'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { Plus, ChefHat, Sparkles, Cog } from 'lucide-react'
import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import MenuCategory from '@/components/MenuCategory'
import { useQueryClient } from '@tanstack/react-query'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/shadcn-components/ui/tooltip'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/shadcn-components/ui/accordion'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

const Menu = () => {
    const { restaurantId, menuId } = useParams()
    const queryClient = useQueryClient()

    const isMobile = useIsMobile()

    const {
        data: menu,
        isLoading: isLoadingMenu,
        isFetching: isFetchingMenu,
    } = useFindMenuById(menuId)
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isFetching: isFetchingCategories,
    } = useFindAllMenuCategoriesByMenuId(menuId)

    const handleCallbackSuccess = () => {
        queryClient.invalidateQueries(['menuCategories', menuId])
    }

    useEffect(() => {
        // Accordéon fermé par défaut sur mobile, ouvert sur desktop
        const handleResize = () => {
            if (window.innerWidth < 640) {
                // setAccordionOpen(false) // This line is removed
            } else {
                // setAccordionOpen(true) // This line is removed
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (
        isLoadingMenu ||
        isFetchingMenu ||
        isLoadingCategories ||
        isFetchingCategories
    ) {
        return (
            <PageContainer>
                <div className="space-y-6">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                    <Skeleton className="h-48 w-full" />
                </div>
            </PageContainer>
        )
    }

    const menuName =
        typeof menu?.name === 'object'
            ? menu.name.fr || menu.name.en || 'Menu'
            : menu?.name
    const hasCategories = categories && categories.length > 0

    return (
        <PageContainer>
            <div className="space-y-6">
                {/* En-tête simple */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {menuName}
                    </h1>
                    <p className="text-gray-600">
                        Gérez vos catégories et plats
                    </p>
                </div>

                {/* Actions rapides dans un accordéon */}
                <Accordion
                    type="single"
                    collapsible
                    defaultValue={!isMobile && 'actions'}
                    className="mb-4">
                    <AccordionItem value="actions">
                        <AccordionTrigger
                            hideIcons={true}
                            className={cn(
                                'group flex items-center justify-between w-full px-6 py-4 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-100 border border-orange-200 shadow hover:shadow-lg transition-all cursor-pointer text-lg font-bold text-orange-900 mb-2 hover:no-underline',
                            )}>
                            <span>⚡ Actions rapides</span>
                            <svg
                                className="ml-2 h-5 w-5 text-orange-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Créer une catégorie */}
                                <Link
                                    href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/create`}>
                                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
                                        <CardContent className="p-6">
                                            <div className="text-center space-y-3">
                                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                                    <Plus
                                                        size={24}
                                                        className="text-blue-600"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        Nouvelle catégorie
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Organisez vos plats
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>

                                {/* Voir le menu */}
                                <Link
                                    href={`/restaurant/${restaurantId}/menu/${menuId}`}
                                    target="_blank">
                                    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:shadow-md transition-shadow cursor-pointer">
                                        <CardContent className="p-6">
                                            <div className="text-center space-y-3">
                                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                                    <ChefHat
                                                        size={24}
                                                        className="text-green-600"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        Voir mon menu
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Prévisualiser
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>

                                {/* Générer avec l'IA */}
                                <TooltipProvider>
                                    <Tooltip delayDuration={200}>
                                        <TooltipTrigger asChild>
                                            {hasCategories ? (
                                                <div className="opacity-60 cursor-not-allowed">
                                                    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                                                        <CardContent className="p-6">
                                                            <div className="text-center space-y-3">
                                                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                                                                    <Sparkles
                                                                        size={
                                                                            24
                                                                        }
                                                                        className="text-yellow-600"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-900">
                                                                        Générer
                                                                        avec
                                                                        l'IA
                                                                    </h3>
                                                                    <p className="text-sm text-gray-600">
                                                                        Importer
                                                                        une
                                                                        image ou
                                                                        un PDF
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={`/admin/restaurant/${restaurantId}/menu/${menuId}/ai-menu-generator`}>
                                                    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-md transition-shadow cursor-pointer">
                                                        <CardContent className="p-6">
                                                            <div className="text-center space-y-3">
                                                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                                                                    <Sparkles
                                                                        size={
                                                                            24
                                                                        }
                                                                        className="text-yellow-600"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-900">
                                                                        Générer
                                                                        avec
                                                                        l'IA
                                                                    </h3>
                                                                    <p className="text-sm text-gray-600">
                                                                        Importer
                                                                        une
                                                                        image ou
                                                                        un PDF
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            )}
                                        </TooltipTrigger>
                                        {hasCategories && (
                                            <TooltipContent
                                                side="top"
                                                align="center">
                                                <span>
                                                    Pour utiliser à nouveau le
                                                    générateur IA, supprimez
                                                    toutes les catégories de
                                                    votre menu.
                                                    <br />
                                                    <span className="text-xs text-muted-foreground">
                                                        Vous pouvez ensuite
                                                        importer une nouvelle
                                                        image ou PDF pour
                                                        régénérer votre menu.
                                                    </span>
                                                </span>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </TooltipProvider>

                                {/* Paramètres du menu */}
                                <Link
                                    href={`/admin/restaurant/${restaurantId}/menu/${menuId}/update`}>
                                    <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                                        <CardContent className="p-6">
                                            <div className="text-center space-y-3">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                                                    <Cog
                                                        size={24}
                                                        className="text-gray-600"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        Paramètres du menu
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Modifier le nom, les
                                                        bannières, etc.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* Liste des catégories */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Mes catégories
                    </h2>

                    {categories?.length === 0 ? (
                        <Card className="bg-gray-50 border-gray-200">
                            <CardContent className="p-8">
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                        <Plus
                                            size={32}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            Aucune catégorie
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Commencez par créer votre première
                                            catégorie ou générez votre menu avec
                                            l'IA.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {categories?.map(category => (
                                <MenuCategory
                                    key={category.id}
                                    category={category}
                                    menuId={menuId}
                                    restaurantId={restaurantId}
                                    handleCallbackSuccess={
                                        handleCallbackSuccess
                                    }
                                    categoriesLength={categories.length}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageContainer>
    )
}

export default Menu
