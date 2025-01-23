import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/shadcn-components/ui/breadcrumb'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'

export function BreadcrumbCustom({ items }) {
    // Si un seul article, retourner directement le BreadcrumbPage
    if (items.length === 1) {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{items[0].title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        )
    }

    const firstItem = items[0]
    const lastItem = items[items.length - 1]
    const penultimateItem = items[items.length - 2]

    let middleItems = []
    let dropdownItems = []

    if (items.length === 3) {
        // Si exactement 3 items, afficher les trois sans ellipsis
        middleItems = items.slice(1, -1)
    } else if (items.length > 3) {
        // Si plus de 3 items, mettre tous les articles intermédiaires (sauf l'avant-dernier) dans le dropdown
        middleItems = [penultimateItem]
        dropdownItems = items.slice(1, -2)
    }

    return (
        <Breadcrumb className='h-9 flex items-center'>
            <BreadcrumbList className='gap-1'>
                {/* Premier article */}
                <BreadcrumbItem>
                    <BreadcrumbLink href={firstItem.href}>
                        {firstItem.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {/* Séparateur après le premier article */}
                {items.length > 1 && <BreadcrumbSeparator />}

                {/* DropdownMenu si plus de 4 items */}
                {dropdownItems.length > 0 && (
                    <>
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1">
                                    <BreadcrumbEllipsis className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {dropdownItems.map((item, index) => (
                                        <DropdownMenuItem key={index}>
                                            <BreadcrumbLink href={item.href}>
                                                {item.title}
                                            </BreadcrumbLink>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                )}

                {/* Affichage des articles intermédiaires visibles après l'ellipsis ou tous les articles si items.length <= 4 */}
                {middleItems.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbLink href={item.href}>
                            {item.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}

                {/* Séparateur si des articles intermédiaires existent */}
                {middleItems.length > 0 && <BreadcrumbSeparator />}

                {/* Dernier article sans lien */}
                <BreadcrumbItem>
                    <BreadcrumbPage>{lastItem.title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
