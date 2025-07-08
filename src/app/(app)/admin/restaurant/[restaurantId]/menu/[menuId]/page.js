'use client'

import { useParams } from 'next/navigation'
import { useFindMenuById } from '@/services/menu/useFindMenuById'
import { useFindAllMenuCategoriesByMenuId } from '@/services/menu-category/useFindAllMenuCategoriesByMenuId'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { Plus, ChefHat } from 'lucide-react'
import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import MenuCategory from '@/components/MenuCategory'
import { useQueryClient } from '@tanstack/react-query'

const Menu = () => {
    const { restaurantId, menuId } = useParams()
    const queryClient = useQueryClient()

    const { data: menu, isLoading: isLoadingMenu, isFetching: isFetchingMenu } = useFindMenuById(menuId)
    const { data: categories, isLoading: isLoadingCategories, isFetching: isFetchingCategories } = useFindAllMenuCategoriesByMenuId(menuId)

    const handleCallbackSuccess = () => {
        queryClient.invalidateQueries(['menuCategories', menuId])
    }

    if (isLoadingMenu || isFetchingMenu || isLoadingCategories || isFetchingCategories) {
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

    const menuName = typeof menu?.name === 'object' ? menu.name.fr || menu.name.en || 'Menu' : menu?.name

    return (
        <PageContainer>
            <div className="space-y-6">
                {/* En-tête simple */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{menuName}</h1>
                    <p className="text-gray-600">Gérez vos catégories et plats</p>
                </div>

                {/* Actions rapides */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Créer une catégorie */}
                    <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/create`}>
                        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <div className="text-center space-y-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                        <Plus size={24} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Nouvelle catégorie</h3>
                                        <p className="text-sm text-gray-600">Organisez vos plats</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Voir le menu */}
                    <Link href={`/restaurant/${restaurantId}/menu/${menuId}`} target="_blank">
                        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <div className="text-center space-y-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <ChefHat size={24} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Voir mon menu</h3>
                                        <p className="text-sm text-gray-600">Prévisualiser</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Liste des catégories */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Mes catégories</h2>
                    
                    {categories?.length === 0 ? (
                        <Card className="bg-gray-50 border-gray-200">
                            <CardContent className="p-8">
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                        <Plus size={32} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune catégorie</h3>
                                        <p className="text-gray-600 mb-4">Commencez par créer votre première catégorie</p>
                                        <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/create`}>
                                            <Button className="gap-2">
                                                <Plus size={20} />
                                                Créer une catégorie
                                            </Button>
                                        </Link>
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
                                    handleCallbackSuccess={handleCallbackSuccess}
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
