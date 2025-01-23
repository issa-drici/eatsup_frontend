'use client'

import { useUpdateRestaurant } from '@/services/restaurant/useUpdateRestaurant'
import { useFindRestaurantById } from '@/services/restaurant/useFindRestaurantById'
import {
    UtensilsCrossed,
    Soup,
    Coffee,
    Beef,
    ChefHat,
    Pizza,
    Store,
    Sandwich,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/shadcn-components/ui/button'

const RESTAURANT_TYPES = [
    { label: 'Fast-food', value: 'fast-food', icon: Store },
    { label: 'Pizzeria', value: 'pizzeria', icon: Pizza },
    { label: 'Kebab', value: 'kebab', icon: Sandwich },
    { label: 'Burger', value: 'burger', icon: Sandwich },
    { label: 'Italien', value: 'italien', icon: UtensilsCrossed },
    { label: 'Chinois', value: 'chinois', icon: Sandwich },
    { label: 'Japonais', value: 'japonais', icon: ChefHat },
    { label: 'Libanais', value: 'libanais', icon: Soup },
    { label: 'Indien', value: 'indien', icon: Sandwich },
    { label: 'Grillades/Barbecue', value: 'grillades-barbecue', icon: Beef },
    {
        label: 'Buffet à volonté',
        value: 'buffet-a-volonte',
        icon: UtensilsCrossed,
    },
    { label: 'Bistrot', value: 'bistrot', icon: Coffee },
    { label: 'Gastronomique', value: 'gastronomique', icon: ChefHat },
    { label: 'Healthy', value: 'healthy', icon: Sandwich },
]

const RestaurantTypePage = () => {
    const { user } = useAuth({
        middleware: 'auth',
    })

    const router = useRouter()
    const [selectedType, setSelectedType] = useState('')

    const { data: restaurant } = useFindRestaurantById(user?.restaurant?.id)

    useEffect(() => {
        if (restaurant?.type_slug) {
            setSelectedType(restaurant.type_slug)
        }
    }, [restaurant])

    const handleCallbackSuccess = () => {
        router.push('/admin/dashboard')
    }

    const { mutate: updateRestaurant } = useUpdateRestaurant({
        handleCallbackSuccess,
        restaurantId: user?.restaurant?.id,
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if (!selectedType) return

        const formDataToSend = new FormData()
        formDataToSend.append('type_slug', selectedType)

        if (restaurant) {
            formDataToSend.append('name', restaurant.name || '')
            formDataToSend.append('name_slug', restaurant.name_slug || '')
            formDataToSend.append('address', restaurant.address || '')
            formDataToSend.append('postal_code', restaurant.postal_code || '')
            formDataToSend.append('city', restaurant.city || '')
            formDataToSend.append('phone', restaurant.phone || '')
            formDataToSend.append(
                'social_links',
                JSON.stringify(restaurant.social_links || {}),
            )
        }

        await updateRestaurant(formDataToSend)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-xl font-bold text-center mb-6">
                Quel type de restaurant gérez-vous ?
            </h2>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
                {RESTAURANT_TYPES.map(type => {
                    const Icon = type.icon
                    return (
                        <div
                            key={type.value}
                            onClick={() => setSelectedType(type.value)}
                            className={`
                                rounded-md cursor-pointer transition-all
                                ${
                                    selectedType === type.value
                                        ? 'text-primary bg-primary/10'
                                        : 'hover:text-primary'
                                }
                            `}>
                            <div className="flex items-center gap-2 md:gap-3">
                                <div
                                    className={`
                                    p-1.5 md:p-2 rounded-lg transition-all
                                    ${
                                        selectedType === type.value
                                            ? 'bg-primary text-white'
                                            : 'bg-primary/10 text-primary'
                                    }
                                `}>
                                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <span className="font-medium text-sm md:text-base">
                                    {type.label}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={!selectedType}>
                    Continuer
                </Button>
            </div>
        </form>
    )
}

export default RestaurantTypePage
