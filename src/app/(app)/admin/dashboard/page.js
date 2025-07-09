'use client'

import { useAuth } from '@/hooks/auth'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { Button } from '@/shadcn-components/ui/button'
import { ChefHat, Eye } from 'lucide-react'
import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import { useFindFirstMenuByRestaurantId } from '@/services/menu/useFindFirstMenuByRestaurantId'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import AIGeneratorButton from '@/components/AIGeneratorButton'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const restaurant = user?.restaurant
    const restaurantId = restaurant?.id

    // Utiliser le hook API pour récupérer le menu
    const { data: menu, isLoading: isLoadingMenu } = useFindFirstMenuByRestaurantId(restaurantId)

    // État de chargement
    if (isLoadingMenu) {
        return (
            <PageContainer>
                <div className="space-y-6">
                    <div className="text-center">
                        <Skeleton className="h-8 w-48 mx-auto mb-2" />
                        <Skeleton className="h-4 w-64 mx-auto" />
                    </div>
                    <Skeleton className="h-64 w-full" />
                </div>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <div className="space-y-6">
                {/* En-tête simple */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Bonjour {user?.name} 👋
                    </h1>
                    <p className="text-gray-600">
                        Gérez votre menu digital
                    </p>
                </div>

                {/* Action principale - Toujours visible et claire */}
                <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                    <CardContent className="p-6">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                                <ChefHat size={32} className="text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {menu ? 'Gérer mon menu' : 'Créer mon menu'}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {menu
                                        ? 'Ajoutez de nouveaux plats ou modifiez vos existants'
                                        : 'Commencez par ajouter vos premiers plats'
                                    }
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href={menu ? `/admin/restaurant/${restaurant?.id}/menu/${menu?.id}` : '/admin/menus'}>
                                    <Button
                                        size="lg"
                                        className="bg-orange-600 hover:bg-orange-700 gap-2"
                                    >
                                        {menu ? 'Gérer mon menu' : 'Créer mon menu'}
                                        <ChefHat size={20} />
                                    </Button>
                                </Link>
                                {!menu && (
                                    <AIGeneratorButton
                                        variant="outline"
                                        size="lg"
                                        className="border-orange-300 text-orange-700 hover:bg-orange-50"
                                    />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Voir le menu si il existe */}
                {menu && (
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center">
                                <h3 className="font-semibold text-gray-900 mb-2">Voir mon menu</h3>
                                <p className="text-gray-600 mb-4">Prévisualisez comment vos clients voient votre menu</p>
                                <Link href={`/restaurant/${restaurant?.id}/menu/${menu?.id}`} target="_blank">
                                    <Button variant="outline" className="gap-2">
                                        <Eye size={20} />
                                        Voir mon menu
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Aide simple */}
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">?</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-blue-900 mb-1">Comment ça marche ?</h4>
                                <p className="text-sm text-blue-800">
                                    {menu
                                        ? 'Cliquez sur "Gérer mon menu" pour ajouter des catégories et des plats à votre carte.'
                                        : 'Cliquez sur "Créer mon menu" pour commencer manuellement, ou utilisez notre générateur IA pour créer automatiquement votre menu à partir d\'une image ou d\'un PDF.'
                                    }
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    )
}

export default Dashboard
