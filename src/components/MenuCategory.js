'use client'

import { Button } from '@/shadcn-components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import { EllipsisVertical, Trash, Pen, ArrowUp, ArrowDown } from 'lucide-react'
import CardButton from './CardButton'
import Link from 'next/link'
import { useDeleteMenuCategoryById } from '@/services/menu-category/useDeleteMenuCategoryById'
import { useUpdateMenuCategoryMoveUp } from '@/services/menu-category/useUpdateMenuCategoryMoveUp'
import { useUpdateMenuCategoryMoveDown } from '@/services/menu-category/useUpdateMenuCategoryMoveDown'

const MenuCategory = ({ category, menuId, restaurantId, handleCallbackSuccess, categoriesLength }) => {
    const { mutate: deleteMenuCategory } = useDeleteMenuCategoryById({
        handleCallbackSuccess,
    })

    const { mutate: moveUpMenuCategory } = useUpdateMenuCategoryMoveUp({
        handleCallbackSuccess,
        categoryId: category.id,
    })

    const { mutate: moveDownMenuCategory } = useUpdateMenuCategoryMoveDown({
        handleCallbackSuccess,
        categoryId: category.id,
    })

    const handleDeleteClick = async () => {
        // Si la catégorie contient des articles, rediriger vers la catégorie
        if (category.items_count > 0) {
            window.location.href = `/admin/restaurant/${restaurantId}/menu/${menuId}/category/${category.id}`
            return
        }

        // Sinon, supprimer directement
        await deleteMenuCategory(category.id)
    }

    const handleMoveUpClick = async () => {
        await moveUpMenuCategory()
    }

    const handleMoveDownClick = async () => {
        await moveDownMenuCategory()
    }

    return (
        <div className="flex items-center gap-2">
            <CardButton
                title={category.name?.fr}
                subtitle={category.description?.fr}
                url={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${category.id}`}
                widthFull
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shadow-md border bg-white hover:shadow-inner hover:bg-white border-slate-200 h-[66px] w-[66px]">
                        <EllipsisVertical className="w-5 h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <Link
                        href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${category.id}/update`}
                        asChild>
                        <DropdownMenuItem>
                            <Pen className="mr-2 h-4 w-4" />
                            Modifier
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleMoveUpClick}
                        disabled={category.sort_order === 1}
                    >
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Monter
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={handleMoveDownClick}
                        disabled={category.sort_order === categoriesLength}
                    >
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Descendre
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleDeleteClick}
                        className="text-red-600 focus:text-red-600"
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        {category.items_count > 0 ? 'Voir les articles' : 'Supprimer'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MenuCategory
