'use client'

import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useUpdateRestaurant } from '@/services/restaurant/useUpdateRestaurant'
import { useFindRestaurantById } from '@/services/restaurant/useFindRestaurantById'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/shadcn-components/ui/button'

const AddressPage = () => {
    const { user } = useAuth({
        middleware: 'auth',
    })

    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postal_code: '',
    })

    const { data: restaurant } = useFindRestaurantById(user?.restaurant?.id)

    useEffect(() => {
        if (restaurant) {
            setFormData({
                address: restaurant.address || '',
                city: restaurant.city || '',
                postal_code: restaurant.postal_code || '',
            })
        }
    }, [restaurant])

    const handleCallbackSuccess = () => {
        router.push(`/register/type`)
    }

    const { mutate: updateRestaurant } = useUpdateRestaurant({
        handleCallbackSuccess,
        restaurantId: user?.restaurant?.id,
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if (!formData.address || !formData.city || !formData.postal_code) {
            setErrors({
                address: !formData.address ? ['L\'adresse est requise'] : [],
                city: !formData.city ? ['La ville est requise'] : [],
                postal_code: !formData.postal_code ? ['Le code postal est requis'] : [],
            })
            return
        }

        const formDataToSend = new FormData()
        formDataToSend.append('address', formData.address)
        formDataToSend.append('postal_code', formData.postal_code)
        formDataToSend.append('city', formData.city)

        if (restaurant) {
            formDataToSend.append('name', restaurant.name || '')
            formDataToSend.append('name_slug', restaurant.name_slug || '')
            formDataToSend.append('phone', restaurant.phone || '')
            formDataToSend.append('restaurant_type', restaurant.restaurant_type || '')
            formDataToSend.append('social_links', JSON.stringify(restaurant.social_links || {}))
        }

        try {
            await updateRestaurant(formDataToSend)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const handleChange = (field, value) => {
        setErrors(prev => ({
            ...prev,
            [field]: [],
        }))
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="address">Adresse*</Label>
                <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    className="block mt-1 w-full"
                    onChange={e => handleChange('address', e.target.value)}
                    required
                    autoFocus
                />
                <InputError messages={errors.address} className="mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="postal_code">Code postal*</Label>
                    <Input
                        id="postal_code"
                        type="text"
                        value={formData.postal_code}
                        className="block mt-1 w-full"
                        onChange={e => handleChange('postal_code', e.target.value)}
                        required
                    />
                    <InputError messages={errors.postal_code} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="city">Ville*</Label>
                    <Input
                        id="city"
                        type="text"
                        value={formData.city}
                        className="block mt-1 w-full"
                        onChange={e => handleChange('city', e.target.value)}
                        required
                    />
                    <InputError messages={errors.city} className="mt-2" />
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit">
                    Continuer
                </Button>
            </div>
        </form>
    )
}

export default AddressPage 