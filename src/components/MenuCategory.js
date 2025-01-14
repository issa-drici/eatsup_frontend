'use client'

import { Button } from '@/shadcn-components/ui/button'
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/shadcn-components/ui/alert-dialog'
import { EllipsisVertical, Trash } from 'lucide-react'
import CardButton from './CardButton'
import Link from 'next/link'
import { useState } from 'react'
import { useDeleteMenuCategoryById } from '@/services/menu-category/useDeleteMenuCategoryById'
import { Pen } from 'lucide-react'
import { useUpdateMenuCategoryMoveUp } from '@/services/menu-category/useUpdateMenuCategoryMoveUp'
import { useUpdateMenuCategoryMoveDown } from '@/services/menu-category/useUpdateMenuCategoryMoveDown'
import { ArrowUp } from 'lucide-react'
import { ArrowDown } from 'lucide-react'

const MenuCategory = ({ category, menuId, handleCallbackSuccess, categoriesLength }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        await deleteMenuCategory(category.id)
        setIsDeleteDialogOpen(false)
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
                url={`/admin/menu/${menuId}/category/${category.id}`}
                widthFull
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            'shadow-md border bg-white hover:shadow-inner hover:bg-white border-slate-200',
                            category.description?.fr ? 'h-[66px]' : 'h-[46px]',
                        )}>
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <Link
                        href={`/admin/menu/${menuId}/category/${category.id}/update`}
                        asChild>
                        <DropdownMenuItem>
                            Modifier
                            <DropdownMenuShortcut>
                                <Pen width={10} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={handleDeleteClick}>
                        Supprimer
                        <DropdownMenuShortcut>
                            <Trash width={10} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleMoveUpClick} disabled={category.sort_order === 1}>
                        Monter
                        <DropdownMenuShortcut>
                            <ArrowUp width={12} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMoveDownClick} disabled={category.sort_order === categoriesLength}>
                        Descendre
                        <DropdownMenuShortcut>
                            <ArrowDown width={12} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="max-w-xs rounded-lg md:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {category.items_count > 0
                                ? 'Vous ne pouvez pas supprimer cette catégorie'
                                : 'Êtes-vous sûr ?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {category.items_count > 0
                                ? "Cette catégorie contient des éléments. Vous ne pouvez pas la supprimer tant qu'ils ne sont pas supprimés."
                                : 'Cette action supprimera définitivement la catégorie'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        {category.items_count > 0 ? (
                            <AlertDialogAction>
                            <Link
                                href={`/admin/menu/${menuId}/category/${category.id}`}
                                asChild>
                                    Aller vers la catégorie
                            </Link>
                                </AlertDialogAction>
                        ) : (
                            <AlertDialogAction
                                onClick={handleConfirmDelete}
                                className="bg-red-500 hover:bg-red-600">
                                Supprimer
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default MenuCategory
