'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Button } from '@/shadcn-components/ui/button'
import { useCreateMenuCategory } from '@/services/menu-category/useCreateMenuCategory'
import Label from '@/components/Label'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import InputError from '@/components/InputError'
import { useQueryClient } from '@tanstack/react-query'

const CategoryCreate = () => {
    const { restaurantId, menuId } = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: {
            fr: '',
        },
        description: {
            fr: '',
        },
    })

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuCategories', menuId])
        router.push(
            `/admin/restaurant/${restaurantId}/menu/${menuId}/categories`,
        )
    }

    const { mutateAsync: createMenuCategory } = useCreateMenuCategory({
        handleCallbackSuccess,
        menuId,
    })

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await createMenuCategory(formData)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (field, lang, value) => {
        if (lang) {
            setFormData(prev => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    [lang]: value,
                },
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value,
            }))
        }
    }

    return (
        <>
            <div className="mb-4">
                <BreadcrumbCustom
                    items={[
                        {
                            title: 'Dashboard',
                            href: '/admin/dashboard',
                        },
                        {
                            title: 'Menu',
                            href: `/admin/restaurant/${restaurantId}/menu/${menuId}`,
                        },
                        {
                            title: 'Catégories',
                            href: `/admin/restaurant/${restaurantId}/menu/${menuId}/categories`,
                        },
                        {
                            title: 'Créer',
                            href: `/admin/restaurant/${restaurantId}/menu/${menuId}/category/create`,
                        },
                    ]}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nom*</Label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name.fr}
                            onChange={e =>
                                handleChange('name', 'fr', e.target.value)
                            }
                            className="mt-1 w-full"
                            required
                            autoFocus
                        />
                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <TextArea
                            id="description"
                            value={formData.description.fr}
                            onChange={e =>
                                handleChange(
                                    'description',
                                    'fr',
                                    e.target.value,
                                )
                            }
                            className="mt-1 w-full"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={event => {
                            event.preventDefault()
                            router.back()
                        }}>
                        Annuler
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        Créer la catégorie
                    </Button>
                </div>
            </form>
        </>
    )
}

export default CategoryCreate
