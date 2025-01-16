'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFindAllRestaurants } from '@/services/restaurant/useFindAllRestaurants'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Input } from "@/shadcn-components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn-components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn-components/ui/avatar"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shadcn-components/ui/pagination"
import { Skeleton } from "@/shadcn-components/ui/skeleton"
import debounce from 'lodash/debounce'

export default function SuperadminRestaurants() {
    const router = useRouter()
    const [searchName, setSearchName] = useState('')
    const [page, setPage] = useState(1)
    const [firstLoad, setFirstLoad] = useState(true)
    const perPage = 10

    const { data: restaurants, meta, isLoading } = useFindAllRestaurants({
        name: searchName,
        page,
        perPage
    })

    // Mettre à jour firstLoad après le premier chargement
    if (!isLoading && firstLoad) {
        setFirstLoad(false)
    }

    const debouncedSearch = debounce((value) => {
        setSearchName(value)
        setPage(1)
    }, 500)

    const handleSearch = (e) => {
        debouncedSearch(e.target.value)
    }

    const handleRowClick = (restaurantId) => {
        router.push(`/superadmin/restaurant/${restaurantId}`)
    }

    return (
        <div className="space-y-4">
            <BreadcrumbCustom
                items={[
                    {
                        title: 'Dashboard',
                        href: '/superadmin/dashboard',
                    },
                    {
                        title: 'Restaurants',
                        href: '/superadmin/restaurants/list',
                    },
                ]}
            />

            <Input
                placeholder="Rechercher un restaurant..."
                onChange={handleSearch}
                className="max-w-sm"
            />

            {(isLoading && firstLoad) ? (
                <Skeleton className="h-[400px] w-full" />
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead />
                                <TableHead>Nom</TableHead>
                                <TableHead>Adresse</TableHead>
                                <TableHead>Téléphone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Statut</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {restaurants?.map((restaurant) => (
                                <TableRow 
                                    key={restaurant.id}
                                    onClick={() => handleRowClick(restaurant.id)}
                                    className="cursor-pointer hover:bg-slate-100"
                                >
                                    <TableCell className='w-10'>
                                        <Avatar>
                                            <AvatarImage src={restaurant.logo?.url} alt={restaurant.name} />
                                            <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{restaurant.name}</TableCell>
                                    <TableCell>{restaurant.address}</TableCell>
                                    <TableCell>{restaurant.phone}</TableCell>
                                    <TableCell>{restaurant.owner.email}</TableCell>
                                    <TableCell className="capitalize">{restaurant.owner.user_plan}</TableCell>
                                    <TableCell className="capitalize">{restaurant.owner.user_subscription_status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="w-fit ml-auto">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                        disabled={page === 1}
                                    >
                                        Précédent
                                    </PaginationPrevious>
                                </PaginationItem>
                                {meta?.last_page && Array.from({length: meta.last_page}, (_, i) => (
                                    <PaginationItem key={i + 1}>
                                        <PaginationLink 
                                            onClick={() => setPage(i + 1)}
                                            isActive={page === i + 1}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => setPage(prev => Math.min(meta?.last_page || 1, prev + 1))}
                                        disabled={page === meta?.last_page}
                                    >
                                        Suivant
                                    </PaginationNext>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            )}
        </div>
    )
}