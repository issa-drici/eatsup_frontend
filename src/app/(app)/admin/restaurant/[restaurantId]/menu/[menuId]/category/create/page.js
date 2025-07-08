'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { useCreateMenuCategory } from '@/services/menu-category/useCreateMenuCategory'
import Label from '@/components/Label'
import Input from '@/components/Input'
import { useQueryClient } from '@tanstack/react-query'
import { ChefHat, Plus } from 'lucide-react'
import PageContainer from '@/components/PageContainer'
import PageHeader from '@/components/PageHeader'

const CategoryCreate = () => {
    const { restaurantId, menuId } = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [categoryName, setCategoryName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuCategories', menuId])
        router.push(`/admin/restaurant/${restaurantId}/menu/${menuId}`)
    }

    const { mutateAsync: createMenuCategory } = useCreateMenuCategory({
        handleCallbackSuccess,
        menuId,
    })

    const handleSubmit = async () => {
        if (!categoryName.trim()) return

        try {
            setIsLoading(true)
            await createMenuCategory({
                name: { fr: categoryName.trim() },
                description: { fr: '' }
            })
        } catch (error) {
            console.error('Erreur création catégorie:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        router.push(`/admin/restaurant/${restaurantId}/menu/${menuId}`)
    }

    const breadcrumbItems = [
        {
            title: 'Menus',
            href: '/admin/menus'
        },
        {
            title: 'Mon menu',
            href: `/admin/restaurant/${restaurantId}/menu/${menuId}`
        },
        {
            title: 'Nouvelle catégorie'
        }
    ]

    return (
        <PageContainer>
            <PageHeader
                title="Nouvelle catégorie"
                description="Organisez vos plats par catégorie"
                backUrl={`/admin/restaurant/${restaurantId}/menu/${menuId}`}
                breadcrumbItems={breadcrumbItems}
            />

            {/* Formulaire principal */}
            <Card className="border-2 border-blue-100 shadow-lg">
                <CardContent className="p-8">
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <ChefHat size={40} className="text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Créez une nouvelle catégorie
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Organisez votre menu pour une meilleure expérience client
                            </p>
                        </div>

                        <div className="w-full max-w-lg mx-auto">
                            <Label htmlFor="categoryName" className="text-lg font-medium">
                                Nom de la catégorie
                            </Label>
                            <Input
                                id="categoryName"
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Ex: Entrées, Plats principaux, Desserts..."
                                className="mt-3 text-lg h-12 border-2 focus:border-blue-500"
                                autoFocus
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') handleSubmit()
                                }}
                            />
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
                                onClick={handleSubmit}
                                disabled={isLoading || !categoryName.trim()}
                                className="flex-1 h-12 text-lg gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                            >
                                <Plus size={20} />
                                {isLoading ? "Création..." : "Créer la catégorie"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </PageContainer>
    )
}

export default CategoryCreate
