'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Button } from '@/shadcn-components/ui/button'
import { useCreateMenuItem } from '@/services/menu-category/useCreateMenuItem'
import Label from '@/components/Label'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import InputError from '@/components/InputError'
import { useQueryClient } from '@tanstack/react-query'

const ItemCreate = () => {
    const { categoryId } = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name: {
            fr: '',
        },
        description: {
            fr: '',
        },
        price: '',
        allergens: '',
        images: [],
        is_active: true,
        sort_order: 0,
    })

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuCategoryItems', categoryId])
        // await queryClient.invalidateQueries(['menuItems', categoryId])
        router.back()
    }

    const { mutate: createMenuItem } = useCreateMenuItem({
        handleCallbackSuccess,
        categoryId,
    })

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await createMenuItem(formData)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
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
                            title: 'Catégorie',
                            href: `/admin/category/${categoryId}`,
                        },
                        {
                            title: 'Items',
                            href: `/admin/category/${categoryId}/items`,
                        },
                        {
                            title: 'Créer',
                            href: `/admin/category/${categoryId}/item/create`,
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

                    <div>
                        <Label htmlFor="price">Prix*</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={e =>
                                handleChange('price', null, e.target.value)
                            }
                            className="mt-1 w-full"
                            required
                        />
                        <InputError messages={errors.price} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="allergens">Allergènes</Label>
                        <Input
                            id="allergens"
                            type="text"
                            value={formData.allergens}
                            onChange={e =>
                                handleChange('allergens', null, e.target.value)
                            }
                            className="mt-1 w-full"
                        />
                    </div>

                    <div>
                        <Label htmlFor="is_active">Actif</Label>
                        <Input
                            id="is_active"
                            type="checkbox"
                            checked={formData.is_active}
                            onChange={e =>
                                handleChange(
                                    'is_active',
                                    null,
                                    e.target.checked,
                                )
                            }
                            className="mt-1"
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
                    <Button type="submit">Créer l'élément</Button>
                </div>
            </form>
        </>
    )
}

export default ItemCreate
