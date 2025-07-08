'use client'

import { Button } from '@/shadcn-components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import { EllipsisVertical, Pen, Trash, ArrowUp, ArrowDown } from 'lucide-react'
import CardButton from './CardButton'
import Link from 'next/link'
import { useDeleteMenuItemById } from '@/services/menu-item/useDeleteMenuItemById'
import { useUpdateMenuItemMoveUp } from '@/services/menu-item/useUpdateMenuItemMoveUp'
import { useUpdateMenuItemMoveDown } from '@/services/menu-item/useUpdateMenuItemMoveDown'

const MenuItem = ({
    item,
    categoryId,
    menuId,
    restaurantId,
    handleCallbackSuccess,
    itemsLength,
}) => {
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

    const handleDeleteClick = async () => {
        // Supprimer directement sans confirmation
        await deleteMenuItem(item.id)
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
                url={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/item/${item.id}/update`}
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
                        href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/item/${item.id}/update`}
                        asChild>
                        <DropdownMenuItem>
                            <Pen className="mr-2 h-4 w-4" />
                            Modifier
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleMoveUpClick}
                        disabled={item.sort_order === 1}
                    >
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Monter
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={handleMoveDownClick}
                        disabled={item.sort_order === itemsLength}
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
                        Supprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MenuItem
