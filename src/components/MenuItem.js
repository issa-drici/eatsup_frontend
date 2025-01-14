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
} from "@/shadcn-components/ui/alert-dialog"
import { EllipsisVertical, Pen, Trash, ArrowUp, ArrowDown } from 'lucide-react'
import CardButton from './CardButton'
import Link from 'next/link'
import { useState } from 'react'
import { useDeleteMenuItemById } from '@/services/menu-item/useDeleteMenuItemById'
import { useUpdateMenuItemMoveUp } from '@/services/menu-item/useUpdateMenuItemMoveUp'
import { useUpdateMenuItemMoveDown } from '@/services/menu-item/useUpdateMenuItemMoveDown'

const MenuItem = ({ item, category, menuId, handleCallbackSuccess, itemsLength }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const { mutate: deleteMenuItem } = useDeleteMenuItemById({
        handleCallbackSuccess,
    })


    const { mutate: moveUpMenuItem } = useUpdateMenuItemMoveUp({
        handleCallbackSuccess,
        itemId: item.id,
    })

    const { mutate: moveDownMenuItem } = useUpdateMenuItemMoveDown({
        handleCallbackSuccess,
        itemId: item.id,
    })

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        await deleteMenuItem(item.id)
        setIsDeleteDialogOpen(false)
    }

    const handleMoveUpClick = async () => {
        await moveUpMenuItem()
    }

    const handleMoveDownClick = async () => {
        await moveDownMenuItem()
    }

    return (
        <div className="flex gap-2 items-center">
            <CardButton
                title={item.name.fr}
                subtitle={item.description.fr}
                rightLabel={`${item.price}€`}
                url={`/admin/menu/${menuId}/category/${category.id}/item/${item.id}/update`}
                widthFull
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            'shadow-md border bg-white hover:shadow-inner hover:bg-white border-slate-200',
                            item.description?.fr ? 'h-[66px]' : 'h-[46px]',
                        )}>
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link
                        href={`/admin/menu/${menuId}/category/${category.id}/item/${item.id}/update`}
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
                    <DropdownMenuItem onClick={handleMoveUpClick} disabled={item.sort_order === 1}>
                        Monter
                        <DropdownMenuShortcut>
                            <ArrowUp width={12} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMoveDownClick} disabled={item.sort_order === itemsLength}>
                        Descendre
                        <DropdownMenuShortcut>
                            <ArrowDown width={12} />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="max-w-xs rounded-lg md:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action supprimera définitivement l'élément "{item.name.fr}" de votre menu.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600">
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default MenuItem 