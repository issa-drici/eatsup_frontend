'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Button } from '@/shadcn-components/ui/button'
import { useUpdateMenuItem } from '@/services/menu-item/useUpdateMenuItem'
import { useFindMenuItemById } from '@/services/menu-item/useFindMenuItemById'
import Label from '@/components/Label'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import InputError from '@/components/InputError'
import { useQueryClient } from '@tanstack/react-query'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { FileUploadInput } from '@/components/FileUploadInput'

const ItemUpdate = () => {
    const { restaurantId, menuId, categoryId, itemId } = useParams()
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
        price: '',
        allergens: '',
        images: [],
        is_active: true,
        sort_order: 0,
    })
    const [imageFiles, setImageFiles] = useState([])
    const [imagesToRemove, setImagesToRemove] = useState([])
    const [existingImages, setExistingImages] = useState([])

    const {
        data: menuItem,
        isLoading: isLoadingMenuItem,
        isFetching: isFetchingMenuItem,
    } = useFindMenuItemById(itemId)

    useEffect(() => {
        if (menuItem) {
            setFormData({
                name: menuItem.name,
                description: menuItem.description,
                price: menuItem.price || '',
                allergens: menuItem.allergens || '',
                is_active: menuItem.is_active ?? true,
                sort_order: menuItem.sort_order || 0,
            })

            if (menuItem.images && menuItem.images.length > 0) {
                setExistingImages(menuItem.images)
            }
        }
    }, [menuItem])

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuCategoryItems', categoryId])
        router.back()
    }

    const { mutateAsync: updateMenuItem } = useUpdateMenuItem({
        handleCallbackSuccess,
        itemId,
    })

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formDataToSend = new FormData()

            // Ajout des champs textuels
            formDataToSend.append('name', JSON.stringify(formData.name))
            formDataToSend.append(
                'description',
                JSON.stringify(formData.description),
            )
            formDataToSend.append('price', formData.price)
            formDataToSend.append('allergens', formData.allergens)
            formDataToSend.append('is_active', formData.is_active)
            formDataToSend.append('sort_order', formData.sort_order)

            // Gestion des images à supprimer
            if (imagesToRemove.length > 0) {
                imagesToRemove.forEach(imageId => {
                    formDataToSend.append('remove_images[]', imageId)
                })
            }

            // Gestion des nouvelles images
            if (imageFiles.length > 0) {
                imageFiles.forEach(file => {
                    formDataToSend.append('images[]', file)
                })
            }

            await updateMenuItem(formDataToSend)
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
                            title: 'Catégorie',
                            href: `/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}`,
                        },
                        {
                            title: 'Articles',
                            href: `/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}`,
                        },
                        {
                            title: 'Modifier',
                            href: `/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/item/${itemId}`,
                        },
                    ]}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nom*</Label>
                        {isLoadingMenuItem || isFetchingMenuItem ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
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
                        )}
                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label>Description</Label>
                        {isLoadingMenuItem || isFetchingMenuItem ? (
                            <Skeleton className="h-24 w-full mt-1" />
                        ) : (
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
                        )}
                    </div>

                    <div>
                        <Label htmlFor="price">Prix*</Label>
                        {isLoadingMenuItem || isFetchingMenuItem ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="price"
                                type="text"
                                inputMode="decimal"
                                placeholder="10.00"
                                value={formData.price}
                                onChange={e => {
                                    const value = e.target.value.replace(
                                        /[^0-9.]/g,
                                        '',
                                    )
                                    if (/^\d*\.?\d*$/.test(value)) {
                                        handleChange(
                                            'price',
                                            null,
                                            e.target.value,
                                        )
                                    }
                                }}
                                onKeyPress={e => {
                                    if (!/[\d.]/.test(e.key)) {
                                        e.preventDefault()
                                    }
                                }}
                                className="mt-1 w-full"
                                required
                            />
                        )}
                        <InputError messages={errors.price} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="images">Images du plat</Label>
                        {isLoadingMenuItem || isFetchingMenuItem ? (
                            <Skeleton className="h-40 w-full mt-1" />
                        ) : (
                            <div className="mt-2">
                                <FileUploadInput
                                    id="images"
                                    multiple
                                    value={imageFiles}
                                    existingImages={existingImages}
                                    onChange={files => {
                                        setImageFiles(prev => [
                                            ...prev,
                                            ...files,
                                        ])
                                    }}
                                    onRemove={({ type, id, index }) => {
                                        if (type === 'existing') {
                                            setImagesToRemove(prev => [
                                                ...prev,
                                                id,
                                            ])
                                            setExistingImages(prev =>
                                                prev.filter(
                                                    (_, i) => i !== index,
                                                ),
                                            )
                                        } else {
                                            setImageFiles(prev =>
                                                prev.filter(
                                                    (_, i) => i !== index,
                                                ),
                                            )
                                        }
                                    }}
                                    accept="image/*"
                                    maxSize="5MB"
                                />
                            </div>
                        )}
                    </div>

                    <div className="hidden">
                        <Label htmlFor="allergens">Allergènes</Label>
                        {isLoadingMenuItem || isFetchingMenuItem ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="allergens"
                                type="text"
                                value={formData.allergens}
                                onChange={e =>
                                    handleChange(
                                        'allergens',
                                        null,
                                        e.target.value,
                                    )
                                }
                                className="mt-1 w-full"
                            />
                        )}
                    </div>

                    <div className="hidden">
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
                    <Button isLoading={isLoading} type="submit">Modifier l'article</Button>
                </div>
            </form>
        </>
    )
}

export default ItemUpdate
