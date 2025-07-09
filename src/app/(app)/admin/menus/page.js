'use client'

import { useFindAllRestaurants } from '@/services/restaurant/useFindAllRestaurants'
import { useFindAllMenusByRestaurantId } from '@/services/menu/useFindAllMenusByRestaurantId'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { Button } from '@/shadcn-components/ui/button'
import { ChefHat, Plus, Eye } from 'lucide-react'
import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { useAuth } from '@/hooks/auth'
import AIGeneratorButton from '@/components/AIGeneratorButton'

const Menus = () => {
    const { user } = useAuth()
    const { data: menus, isLoading: isLoadingMenus } =
        useFindAllMenusByRestaurantId(user?.restaurant?.id)
    const menu = menus?.[0] // Prend le premier menu
    console.log({ menus })
    // État de chargement
    if (isLoadingMenus) {
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
                        Mes menus
                    </h1>
                    <p className="text-gray-600">Gérez vos menus digitaux</p>
                </div>

                {/* Menu existant ou création */}
                {menu ? (
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                        <CardContent className="p-6">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                    <ChefHat
                                        size={32}
                                        className="text-green-600"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {menu.name?.fr || 'Mon menu'}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        Votre menu digital est prêt à être
                                        utilisé
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link
                                        href={`/admin/restaurant/${user?.restaurant?.id}/menu/${menu?.id}`}>
                                        <Button
                                            size="lg"
                                            className="bg-green-600 hover:bg-green-700 gap-2 w-full sm:w-auto">
                                            <ChefHat size={20} />
                                            Gérer mon menu
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/restaurant/${user?.restaurant?.id}/menu/${menu?.id}`}
                                        target="_blank">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="gap-2 w-full sm:w-auto">
                                            <Eye size={20} />
                                            Voir mon menu
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                        <CardContent className="p-6">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                    <Plus size={32} className="text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        Créer mon premier menu
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        Commencez par créer votre menu digital
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 gap-2">
                                        <Plus size={20} />
                                        Créer un menu
                                    </Button>
                                    <AIGeneratorButton
                                        variant="outline"
                                        size="lg"
                                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Aide */}
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">
                                    ?
                                </span>
                            </div>
                            <div>
                                <h4 className="font-medium text-blue-900 mb-1">
                                    Comment ça marche ?
                                </h4>
                                <p className="text-sm text-blue-800">
                                    {menu
                                        ? 'Cliquez sur "Gérer mon menu" pour ajouter des catégories et des plats à votre carte.'
                                        : 'Cliquez sur "Créer un menu" pour commencer manuellement, ou utilisez notre générateur IA pour créer automatiquement votre menu à partir d\'une image ou d\'un PDF.'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    )
}

export default Menus
