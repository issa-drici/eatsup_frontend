'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { useCreateMenuItem } from '@/services/menu-category/useCreateMenuItem'
import Label from '@/components/Label'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import { useQueryClient } from '@tanstack/react-query'
import { FileUploadInput } from '@/components/FileUploadInput'
import { ArrowLeft, ChefHat, Plus } from 'lucide-react'
import PageContainer from '@/components/PageContainer'

const ItemCreate = () => {
    const { restaurantId, menuId, categoryId } = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [imageFiles, setImageFiles] = useState([])
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
        is_active: true,
        sort_order: 0,
    })

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuCategoryItems', categoryId])
        router.push(
            `/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}`,
        )
    }

    const { mutateAsync: createMenuItem } = useCreateMenuItem({
        handleCallbackSuccess,
        categoryId,
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

            // Ajout des images
            if (imageFiles.length > 0) {
                imageFiles.forEach(file => {
                    formDataToSend.append('images[]', file)
                })
            }

            await createMenuItem(formDataToSend)
        } catch (error) {
            // Gérer l'erreur silencieusement
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
                            Nouvel article
                        </h1>
                        <p className="text-gray-600">
                            Ajoutez un nouveau plat à votre menu
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
                                    Créez votre nouveau plat
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Remplissez les informations pour attirer vos
                                    clients
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
                                </div>

                                {/* Description */}
                                <div>
                                    <Label className="text-lg font-medium">
                                        Description
                                    </Label>
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
                                </div>

                                {/* Prix */}
                                <div>
                                    <Label
                                        htmlFor="price"
                                        className="text-lg font-medium">
                                        Prix (€)*
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={e =>
                                            handleChange(
                                                'price',
                                                null,
                                                e.target.value,
                                            )
                                        }
                                        className="mt-3 text-lg h-12 border-2 focus:border-green-500"
                                        required
                                        placeholder="12.50"
                                    />
                                </div>

                                {/* Images */}
                                <div>
                                    <Label className="text-lg font-medium">
                                        Images du plat (optionnel)
                                    </Label>
                                    <div className="mt-3">
                                        <FileUploadInput
                                            id="images"
                                            multiple
                                            value={imageFiles}
                                            onChange={files => {
                                                setImageFiles(prev => [
                                                    ...prev,
                                                    ...files,
                                                ])
                                            }}
                                            onRemove={({ index }) => {
                                                setImageFiles(prev =>
                                                    prev.filter(
                                                        (_, i) => i !== index,
                                                    ),
                                                )
                                            }}
                                            accept="image/*"
                                            maxSize="5MB"
                                        />
                                    </div>
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
                                    <Plus size={20} />
                                    {isLoading
                                        ? 'Création...'
                                        : "Créer l'article"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    )
}

export default ItemCreate
