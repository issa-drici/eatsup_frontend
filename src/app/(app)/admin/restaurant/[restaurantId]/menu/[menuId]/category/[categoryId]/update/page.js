'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import Label from '@/components/Label'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import InputError from '@/components/InputError'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateMenuCategory } from '@/services/menu-category/useUpdateMenuCategory'
import { useFindMenuCategoryById } from '@/services/menu-category/useFindMenuCategoryById'
import { Skeleton } from "@/shadcn-components/ui/skeleton"
import { ArrowLeft, ChefHat, Save } from 'lucide-react'
import PageContainer from '@/components/PageContainer'

const CategoryUpdate = () => {
    const { restaurantId, menuId, categoryId } = useParams()
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

    const { data: menuCategory, isLoading: isLoadingMenuCategory, isFetching: isFetchingMenuCategory } = useFindMenuCategoryById(categoryId)

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
        router.push(`/admin/restaurant/${restaurantId}/menu/${menuId}`)
    }

    const { mutateAsync: updateMenuCategory } = useUpdateMenuCategory({
        handleCallbackSuccess,
        categoryId,
    })

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await updateMenuCategory(formData)
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
        router.push(`/admin/restaurant/${restaurantId}/menu/${menuId}`)
    }

    return (
        <PageContainer>
            <div className="w-full space-y-6">
                {/* En-tête avec retour */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="gap-2"
                    >
                        <ArrowLeft size={16} />
                        Retour
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Modifier la catégorie</h1>
                        <p className="text-gray-600">Améliorez les informations de votre catégorie</p>
                    </div>
                </div>

                {/* Formulaire principal */}
                <Card className="border-2 border-blue-100 shadow-lg">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <ChefHat size={40} className="text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    Modifiez votre catégorie
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Améliorez les informations pour une meilleure expérience client
                                </p>
                            </div>

                            <div className="w-full space-y-6">
                                {/* Nom de la catégorie */}
                                <div>
                                    <Label htmlFor="name" className="text-lg font-medium">
                                        Nom de la catégorie*
                                    </Label>
                                    {isLoadingMenuCategory || isFetchingMenuCategory ? (
                                        <Skeleton className="h-12 w-full mt-3" />
                                    ) : (
                                        <Input
                                            id="name"
                                            type="text"
                                            value={formData.name.fr}
                                            onChange={e => handleChange('name', 'fr', e.target.value)}
                                            className="mt-3 text-lg h-12 border-2 focus:border-blue-500"
                                            required
                                            autoFocus
                                            placeholder="Ex: Entrées, Plats principaux, Desserts..."
                                        />
                                    )}
                                    <InputError messages={errors.name} className="mt-2" />
                                </div>

                                {/* Description */}
                                <div>
                                    <Label className="text-lg font-medium">
                                        Description (optionnel)
                                    </Label>
                                    {isLoadingMenuCategory || isFetchingMenuCategory ? (
                                        <Skeleton className="h-24 w-full mt-3" />
                                    ) : (
                                        <TextArea
                                            id="description"
                                            value={formData.description.fr}
                                            onChange={e => handleChange('description', 'fr', e.target.value)}
                                            className="mt-3 text-base border-2 focus:border-blue-500"
                                            placeholder="Décrivez cette catégorie..."
                                            rows={4}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="flex-1 h-12 text-lg"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    isLoading={isLoading}
                                    type="submit"
                                    className="flex-1 h-12 text-lg gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                >
                                    <Save size={20} />
                                    {isLoading ? "Modification..." : "Sauvegarder"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    )
}

export default CategoryUpdate
