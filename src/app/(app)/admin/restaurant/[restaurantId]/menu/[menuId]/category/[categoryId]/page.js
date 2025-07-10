'use client'

import { useParams, useRouter } from 'next/navigation'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { useFindAllMenuItemsByMenuCategoryId } from '@/services/menu-item/useFindAllMenuItemsByMenuCategoryId'
import { useFindMenuCategoryById } from '@/services/menu-category/useFindMenuCategoryById'
import Link from 'next/link'
import {
    Plus,
    ChefHat,
    Pen,
    Trash,
    ArrowUp,
    ArrowDown,
    ArrowLeft,
} from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import PageContainer from '@/components/PageContainer'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import { useDeleteMenuItemById } from '@/services/menu-item/useDeleteMenuItemById'
import { useUpdateMenuItemMoveUp } from '@/services/menu-item/useUpdateMenuItemMoveUp'
import { useUpdateMenuItemMoveDown } from '@/services/menu-item/useUpdateMenuItemMoveDown'

const Category = () => {
    const { restaurantId, menuId, categoryId } = useParams()
    const router = useRouter()
    const queryClient = useQueryClient()

    const { data: menuCategory, isLoading: isLoadingMenuCategory } =
        useFindMenuCategoryById(categoryId)

    const {
        data: menuItems,
        isLoading: isLoadingMenuItems,
        isFetching: isFetchingMenuItems,
    } = useFindAllMenuItemsByMenuCategoryId(categoryId)

    const { mutate: deleteMenuItem } = useDeleteMenuItemById({
        handleCallbackSuccess: () => {
            queryClient.invalidateQueries(['menuItems', categoryId])
        },
    })

    const { mutate: moveUpMenuItem } = useUpdateMenuItemMoveUp({
        handleCallbackSuccess: () => {
            queryClient.invalidateQueries(['menuItems', categoryId])
        },
        itemId: null,
    })

    const { mutate: moveDownMenuItem } = useUpdateMenuItemMoveDown({
        handleCallbackSuccess: () => {
            queryClient.invalidateQueries(['menuItems', categoryId])
        },
        itemId: null,
    })

    const handleDeleteItem = itemId => {
        deleteMenuItem(itemId)
    }

    const handleMoveUp = itemId => {
        moveUpMenuItem({ itemId })
    }

    const handleMoveDown = itemId => {
        moveDownMenuItem({ itemId })
    }

    const handleBack = () => {
        router.push(`/admin/restaurant/${restaurantId}/menu/${menuId}`)
    }

    return (
        <PageContainer>
            <div className="space-y-6">
                {/* En-tête avec bouton de retour */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBack}
                        className="gap-2">
                        <ArrowLeft size={16} />
                        Retour
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isLoadingMenuCategory
                                ? 'Chargement...'
                                : menuCategory?.name?.fr}
                        </h1>
                        <p className="text-gray-600">
                            Gérez les articles de cette catégorie
                        </p>
                    </div>
                </div>

                {/* Actions rapides */}
                <div className="flex justify-center">
                    <Link
                        href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/item/create`}>
                        <Button size="lg" className="gap-2">
                            <Plus className="w-5 h-5" />
                            Nouvel article
                        </Button>
                    </Link>
                </div>

                {/* Liste des articles - Design simple et clair */}
                <div className="space-y-3">
                    {isLoadingMenuItems || isFetchingMenuItems ? (
                        <>
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </>
                    ) : menuItems?.length === 0 ? (
                        <Card className="bg-gray-50 border-gray-200">
                            <CardContent className="p-8">
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                        <ChefHat
                                            size={32}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            Aucun article
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Ajoutez votre premier article dans
                                            cette catégorie
                                        </p>
                                        <Link
                                            href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/item/create`}>
                                            <Button className="gap-2">
                                                <Plus className="w-4 h-4" />
                                                Ajouter un article
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {menuItems?.map(item => (
                                <Card
                                    key={item.id}
                                    className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            {/* Informations de l'article */}
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/item/${item.id}/update`}
                                                    className="block hover:no-underline">
                                                    <div className="flex items-center gap-4">
                                                        {/* Numéro de position */}
                                                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                                            {item.sort_order}
                                                        </div>

                                                        {/* Contenu principal */}
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-semibold text-gray-900 truncate">
                                                                {item.name?.fr}
                                                            </h3>
                                                            {item.description
                                                                ?.fr && (
                                                                <p className="text-sm text-gray-600 truncate mt-1">
                                                                    {
                                                                        item
                                                                            .description
                                                                            .fr
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Prix */}
                                                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
                                                            {item.price}€
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 ml-4">
                                                {/* Voir l'article */}
                                                {/* <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/item/${item.id}/update`}>
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link> */}

                                                {/* Menu d'actions */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0">
                                                            <Pen className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-48">
                                                        <Link
                                                            href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/item/${item.id}/update`}
                                                            asChild>
                                                            <DropdownMenuItem>
                                                                <Pen className="mr-2 h-4 w-4" />
                                                                Modifier
                                                            </DropdownMenuItem>
                                                        </Link>

                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleMoveUp(
                                                                    item.id,
                                                                )
                                                            }
                                                            disabled={
                                                                item.sort_order ===
                                                                1
                                                            }>
                                                            <ArrowUp className="mr-2 h-4 w-4" />
                                                            Monter
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleMoveDown(
                                                                    item.id,
                                                                )
                                                            }
                                                            disabled={
                                                                item.sort_order ===
                                                                menuItems.length
                                                            }>
                                                            <ArrowDown className="mr-2 h-4 w-4" />
                                                            Descendre
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDeleteItem(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="text-red-600 focus:text-red-600">
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Supprimer
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Aide simple */}
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-xs">
                                    ?
                                </span>
                            </div>
                            <div>
                                <h4 className="font-medium text-blue-900 mb-1">
                                    Conseils
                                </h4>
                                <p className="text-sm text-blue-800">
                                    Cliquez sur un article pour le modifier.
                                    Utilisez les flèches pour réorganiser
                                    l'ordre d'affichage.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    )
}

export default Category
