'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { useUpdateMenuItem } from '@/services/menu-item/useUpdateMenuItem'
import { useFindMenuItemById } from '@/services/menu-item/useFindMenuItemById'
import Label from '@/components/Label'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import InputError from '@/components/InputError'
import { useQueryClient } from '@tanstack/react-query'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { FileUploadInput } from '@/components/FileUploadInput'
import { ArrowLeft, ChefHat, Save } from 'lucide-react'
import PageContainer from '@/components/PageContainer'

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
        router.push(
            `/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}`,
        )
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

    const handleCancel = () => {
        router.push(
            `/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}`,
        )
    }

    return (
        <PageContainer>
            <div className="space-y-6">
                {/* En-tête avec retour */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="gap-2">
                        <ArrowLeft size={16} />
                        Retour
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Modifier l'article
                        </h1>
                        <p className="text-gray-600">
                            Améliorez les informations de votre plat
                        </p>
                    </div>
                </div>

                {/* Formulaire principal */}
                <Card className="border-2 border-green-100 shadow-lg">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <ChefHat
                                        size={40}
                                        className="text-green-600"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    Modifiez votre plat
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Améliorez les informations pour attirer plus
                                    de clients
                                </p>
                            </div>

                            <div className="w-full space-y-6">
                                {/* Nom du plat */}
                                <div>
                                    <Label
                                        htmlFor="name"
                                        className="text-lg font-medium">
                                        Nom du plat*
                                    </Label>
                                    {isLoadingMenuItem || isFetchingMenuItem ? (
                                        <Skeleton className="h-12 w-full mt-3" />
                                    ) : (
                                        <Input
                                            id="name"
                                            type="text"
                                            value={formData.name.fr}
                                            onChange={e =>
                                                handleChange(
                                                    'name',
                                                    'fr',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-3 text-lg h-12 border-2 focus:border-green-500"
                                            required
                                            autoFocus
                                            placeholder="Ex: Burger Deluxe, Salade César..."
                                        />
                                    )}
                                    <InputError
                                        messages={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <Label className="text-lg font-medium">
                                        Description
                                    </Label>
                                    {isLoadingMenuItem || isFetchingMenuItem ? (
                                        <Skeleton className="h-24 w-full mt-3" />
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
                                            className="mt-3 text-base border-2 focus:border-green-500"
                                            placeholder="Description du plat..."
                                            rows={4}
                                        />
                                    )}
                                </div>

                                {/* Prix */}
                                <div>
                                    <Label
                                        htmlFor="price"
                                        className="text-lg font-medium">
                                        Prix (€)*
                                    </Label>
                                    {isLoadingMenuItem || isFetchingMenuItem ? (
                                        <Skeleton className="h-12 w-full mt-3" />
                                    ) : (
                                        <Input
                                            id="price"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="12.50"
                                            value={formData.price}
                                            onChange={e => {
                                                const value =
                                                    e.target.value.replace(
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
                                            className="mt-3 text-lg h-12 border-2 focus:border-green-500"
                                            required
                                        />
                                    )}
                                    <InputError
                                        messages={errors.price}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Images */}
                                <div>
                                    <Label className="text-lg font-medium">
                                        Images du plat
                                    </Label>
                                    {isLoadingMenuItem || isFetchingMenuItem ? (
                                        <Skeleton className="h-40 w-full mt-3" />
                                    ) : (
                                        <div className="mt-3">
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
                                                onRemove={({
                                                    type,
                                                    id,
                                                    index,
                                                }) => {
                                                    if (type === 'existing') {
                                                        setImagesToRemove(
                                                            prev => [
                                                                ...prev,
                                                                id,
                                                            ],
                                                        )
                                                        setExistingImages(
                                                            prev =>
                                                                prev.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index,
                                                                ),
                                                        )
                                                    } else {
                                                        setImageFiles(prev =>
                                                            prev.filter(
                                                                (_, i) =>
                                                                    i !== index,
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
                            </div>

                            <div className="flex flex-col-reverse md:flex-row gap-4 pt-6">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handleCancel}
                                    className="flex-1 h-12 text-lg">
                                    Annuler
                                </Button>
                                <Button
                                    isLoading={isLoading}
                                    type="submit"
                                    className="flex-1 h-12 text-lg gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                                    <Save size={20} />
                                    {isLoading
                                        ? 'Modification...'
                                        : 'Sauvegarder'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    )
}

export default ItemUpdate
