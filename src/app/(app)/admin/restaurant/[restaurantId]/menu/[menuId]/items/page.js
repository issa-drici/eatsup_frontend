'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { Plus, ChefHat, ArrowLeft } from 'lucide-react'
import { useFindAllMenuItemsByMenuIdGroupedByCategoryName } from '@/services/menu-item/useFindAllMenuItemsByMenuIdGroupedByCategoryName'
import { useCountMenuItemsByMenuId } from '@/services/menu-item/useCountMenuItemByMenuId'
import { useQueryClient } from '@tanstack/react-query'
import PageContainer from '@/components/PageContainer'
import MenuItem from '@/components/MenuItem'

const Items = () => {
    const { restaurantId, menuId } = useParams()
    const queryClient = useQueryClient()

    const { data: menuItems, isLoading: isLoadingMenuItems, isFetching: isFetchingMenuItems } = useFindAllMenuItemsByMenuIdGroupedByCategoryName(menuId)
    const { data: itemsCount } = useCountMenuItemsByMenuId(menuId)

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuItems', menuId])
    }

    return (
        <PageContainer>
            <div className="space-y-6">
                {/* En-tête simplifié */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}`}>
                            <Button variant="outline" size="sm" className="gap-2">
                                <ArrowLeft size={16} />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Mes articles</h1>
                            <p className="text-gray-600">
                                {itemsCount?.count || 0} article{itemsCount?.count !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/create`}>
                        <Button className="w-full sm:w-auto">
                            <Plus className="w-4 h-4 mr-2" />
                            Nouvelle catégorie
                        </Button>
                    </Link>
                </div>

                {/* Liste des articles par catégorie */}
                <div className="space-y-6">
                    {isLoadingMenuItems || isFetchingMenuItems ? (
                        <>
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </>
                    ) : menuItems?.length === 0 ? (
                        <Card className="border-dashed border-gray-300 bg-gray-50">
                            <CardContent className="p-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ChefHat className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article</h3>
                                <p className="text-gray-600 mb-6">Créez votre première catégorie pour ajouter des plats</p>
                                <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/create`}>
                                    <Button size="lg" className="gap-2">
                                        <Plus className="w-5 h-5" />
                                        Créer ma première catégorie
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        menuItems?.map(({ category, items }) => (
                            <Card key={category.id} className="border-gray-200">
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <ChefHat size={20} className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-semibold text-gray-900">
                                                        {category.name?.fr}
                                                    </h2>
                                                    <p className="text-sm text-gray-500">
                                                        {items.length} article{items.length > 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${category.id}/item/create`}>
                                                <Button size="sm" className="gap-2">
                                                    <Plus size={16} />
                                                    Ajouter
                                                </Button>
                                            </Link>
                                        </div>

                                        <div className="space-y-3">
                                            {items.map(item => (
                                                <MenuItem
                                                    key={item.id}
                                                    item={item}
                                                    category={category}
                                                    itemsLength={items.length}
                                                    menuId={menuId}
                                                    restaurantId={restaurantId}
                                                    handleCallbackSuccess={handleCallbackSuccess}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Aide */}
                {menuItems?.length > 0 && (
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-600 font-bold text-sm">💡</span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-900 mb-1">Conseil</h4>
                                    <p className="text-sm text-blue-800">
                                        Utilisez le bouton "Ajouter" dans chaque catégorie pour créer rapidement un nouveau plat.
                                        Vous pouvez aussi utiliser le bouton "Nouvel article" depuis la page principale de votre menu.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </PageContainer>
    )
}

export default Items
