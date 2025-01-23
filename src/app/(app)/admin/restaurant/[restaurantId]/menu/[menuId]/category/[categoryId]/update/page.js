'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Button } from '@/shadcn-components/ui/button'
import Label from '@/components/Label'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import InputError from '@/components/InputError'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateMenuCategory } from '@/services/menu-category/useUpdateMenuCategory'
import { useFindMenuCategoryById } from '@/services/menu-category/useFindMenuCategoryById'
import { Skeleton } from "@/shadcn-components/ui/skeleton"

const CategoryUpdate = () => {
    const { menuId, categoryId } = useParams()
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
    })

    const { data: menuCategory, isLoading, isFetching } = useFindMenuCategoryById(categoryId)

    useEffect(() => {
        if (menuCategory) {
            setFormData({
                name: {
                    fr: menuCategory.name?.fr || '',
                },
                description: {
                    fr: menuCategory.description?.fr || '',
                },
            })
        }
    }, [menuCategory])

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuCategories', menuId])
        router.push(`/admin/menu/${menuId}/categories`)
    }

    const { mutate: updateMenuCategory } = useUpdateMenuCategory({
        handleCallbackSuccess,
        categoryId,
    })

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await updateMenuCategory(formData)
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
                            title: 'Menu',
                            href: `/admin/menu/${menuId}`,
                        },
                        {
                            title: 'Catégories',
                            href: `/admin/menu/${menuId}/categories`,
                        },
                        {
                            title: 'Modifier',
                            href: `/admin/menu/${menuId}/category/${categoryId}/update`,
                        },
                    ]}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nom*</Label>
                        {(isLoading || isFetching) ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="name"
                                type="text"
                                value={formData.name.fr}
                                onChange={e => handleChange('name', 'fr', e.target.value)}
                                className="mt-1 w-full"
                                required
                                autoFocus
                            />
                        )}
                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label>Description</Label>
                        {(isLoading || isFetching) ? (
                            <Skeleton className="h-24 w-full mt-1" />
                        ) : (
                            <TextArea
                                id="description"
                                value={formData.description.fr}
                                onChange={e => handleChange('description', 'fr', e.target.value)}
                                className="mt-1 w-full"
                            />
                        )}
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
                    <Button type="submit">Modifier la catégorie</Button>
                </div>
            </form>
        </>
    )
}

export default CategoryUpdate
