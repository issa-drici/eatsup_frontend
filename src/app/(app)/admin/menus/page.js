'use client'

import { useAuth } from '@/hooks/auth'
import { useFindFirstMenuByRestaurantId } from '@/services/menu/useFindFirstMenuByRestaurantId'

import { useFindOnboardingStatus } from '@/services/onboarding/useFindOnboardingStatus'
import { Button } from '@/shadcn-components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shadcn-components/ui/card'
import { Badge } from '@/shadcn-components/ui/badge'
import { ChefHat, Pen, Crown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import PageContainer from '@/components/PageContainer'

const MenusPage = () => {
    const { user } = useAuth()

    const { data: menu, isLoading: isLoadingMenu } =
        useFindFirstMenuByRestaurantId(user?.restaurant?.id)

    const { data: onboardingStatus } = useFindOnboardingStatus(
        user?.restaurant?.id,
    )

    const hasMenu = menu && menu.id

    return (
        <PageContainer>
            <div className="space-y-6">
                {/* En-tête */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Gestion du menu
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Gérez votre menu, ajoutez des catégories et des articles
                        pour optimiser l'expérience de vos clients
                    </p>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-600">
                                        Menu
                                    </p>
                                    <p className="text-2xl font-bold text-blue-900">
                                        {isLoadingMenu
                                            ? '...'
                                            : hasMenu
                                              ? 'Actif'
                                              : 'Inactif'}
                                    </p>
                                </div>
                                <ChefHat className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions principales */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Gestion du menu */}
                    <Card className="border-2 border-green-100 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-800">
                                <ChefHat className="w-5 h-5" />
                                Gestion du menu
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    {hasMenu
                                        ? 'Menu configuré'
                                        : 'Menu non configuré'}
                                </span>
                                <Badge
                                    variant={hasMenu ? 'default' : 'secondary'}>
                                    {hasMenu ? 'Actif' : 'Inactif'}
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                {hasMenu ? (
                                    <Link
                                        href={`/admin/restaurant/${user?.restaurant?.id}/menu/${menu.id}`}>
                                        <Button className="w-full gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                                            <Pen className="w-4 h-4" />
                                            Modifier le menu
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href="/admin/ai-menu-generator">
                                        <Button className="w-full gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                                            <Sparkles className="w-4 h-4" />
                                            Générer avec l'IA
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Onboarding */}
                {onboardingStatus && !onboardingStatus.is_completed && (
                    <Card className="border-2 border-yellow-200 bg-yellow-50">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Crown className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-yellow-900 mb-2">
                                        Finalisez votre configuration
                                    </h3>
                                    <p className="text-yellow-800 mb-4">
                                        Complétez les étapes restantes pour
                                        optimiser votre présence en ligne
                                    </p>
                                    <Link
                                        href={`/admin/restaurant/${user?.restaurant?.id}/menu/${menu.id}`}>
                                        <Button className="bg-yellow-600 hover:bg-yellow-700">
                                            Continuer la configuration
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </PageContainer>
    )
}

export default MenusPage

// 'use client'

// import { useAuth } from '@/hooks/auth'
// import { useFindAllMenusByRestaurantId } from '@/services/menu/useFindAllMenusByRestaurantId'
// import { useFindAllQrCodesByRestaurantId } from '@/services/qr-code/useFindAllQrCodesByRestaurantId'
// import { useCountQrCodeSessionsByRestaurantId } from '@/services/qr-code-session/useCountQrCodeSessionsByRestaurantId'
// import { useCountWebsiteSessionsByRestaurantId } from '@/services/website-session/useCountWebsiteSessionsByRestaurantId'
// import { useGetWebsiteByRestaurantId } from '@/services/website/useGetWebsiteByRestaurantId'
// import { useFindOnboardingStatus } from '@/services/onboarding/useFindOnboardingStatus'
// import { Button } from '@/shadcn-components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn-components/ui/card'
// import { Badge } from '@/shadcn-components/ui/badge'
// import { Plus, ChefHat, QrCode, Globe, Eye, Pen, Crown, Sparkles } from 'lucide-react'
// import Link from 'next/link'
// import PageContainer from '@/components/PageContainer'
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from '@/shadcn-components/ui/dropdown-menu'

// const MenusPage = () => {
//     const { user } = useAuth()

//     const {
//         data: menus,
//         isLoading: isLoadingMenus,
//     } = useFindAllMenusByRestaurantId(user?.restaurant?.id)

//     const {
//         data: qrCodes,
//         isLoading: isLoadingQrCodes,
//     } = useFindAllQrCodesByRestaurantId(user?.restaurant?.id)

//     const {
//         data: qrCodeSessions,
//         isLoading: isLoadingQrCodeSessions,
//     } = useCountQrCodeSessionsByRestaurantId(user?.restaurant?.id)

//     const {
//         data: websiteSessions,
//         isLoading: isLoadingWebsiteSessions,
//     } = useCountWebsiteSessionsByRestaurantId(user?.restaurant?.id)

//     const {
//         data: website,
//     } = useGetWebsiteByRestaurantId(user?.restaurant?.id)

//     const {
//         data: onboardingStatus,
//     } = useFindOnboardingStatus(user?.restaurant?.id)

//     const hasMenus = menus && menus.length > 0

//     return (
//         <PageContainer>
//             <div className="space-y-6">
//                 {/* En-tête */}
//                 <div className="text-center">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-4">
//                         Tableau de bord
//                     </h1>
//                     <p className="text-gray-600 max-w-2xl mx-auto">
//                         Gérez vos menus, QR codes et sites web pour optimiser l'expérience de vos clients
//                     </p>
//                 </div>

//                 {/* Statistiques rapides */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
//                         <CardContent className="p-4">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-blue-600">Menus</p>
//                                     <p className="text-2xl font-bold text-blue-900">
//                                         {isLoadingMenus ? '...' : menus?.length || 0}
//                                     </p>
//                                 </div>
//                                 <ChefHat className="w-8 h-8 text-blue-600" />
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
//                         <CardContent className="p-4">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-green-600">QR Codes</p>
//                                     <p className="text-2xl font-bold text-green-900">
//                                         {isLoadingQrCodes ? '...' : qrCodes?.length || 0}
//                                     </p>
//                                 </div>
//                                 <QrCode className="w-8 h-8 text-green-600" />
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
//                         <CardContent className="p-4">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-purple-600">Scans QR</p>
//                                     <p className="text-2xl font-bold text-purple-900">
//                                         {isLoadingQrCodeSessions ? '...' : (typeof qrCodeSessions === 'object' ? qrCodeSessions?.count || 0 : qrCodeSessions || 0)}
//                                     </p>
//                                 </div>
//                                 <Eye className="w-8 h-8 text-purple-600" />
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
//                         <CardContent className="p-4">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-orange-600">Visites Web</p>
//                                     <p className="text-2xl font-bold text-orange-900">
//                                         {isLoadingWebsiteSessions ? '...' : (typeof websiteSessions === 'object' ? websiteSessions?.count || 0 : websiteSessions || 0)}
//                                     </p>
//                                 </div>
//                                 <Globe className="w-8 h-8 text-orange-600" />
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>

//                 {/* Actions principales */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Gestion des menus */}
//                     <Card className="border-2 border-green-100 shadow-lg">
//                         <CardHeader>
//                             <CardTitle className="flex items-center gap-2 text-green-800">
//                                 <ChefHat className="w-5 h-5" />
//                                 Gestion des menus
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm text-gray-600">
//                                     {hasMenus ? `${menus.length} menu${menus.length > 1 ? 's' : ''} créé${menus.length > 1 ? 's' : ''}` : 'Aucun menu créé'}
//                                 </span>
//                                 <Badge variant={hasMenus ? "default" : "secondary"}>
//                                     {hasMenus ? 'Actif' : 'Inactif'}
//                                 </Badge>
//                             </div>

//                             <div className="space-y-2">
//                                 <Link href="/admin/ai-menu-generator">
//                                     <Button className="w-full gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
//                                         <Sparkles className="w-4 h-4" />
//                                         Générer avec l'IA
//                                     </Button>
//                                 </Link>

//                                 <Link href={`/admin/restaurant/${user?.restaurant?.id}/menu/create`}>
//                                     <Button variant="outline" className="w-full gap-2">
//                                         <Plus className="w-4 h-4" />
//                                         Créer manuellement
//                                     </Button>
//                                 </Link>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* QR Codes et Site Web */}
//                     <Card className="border-2 border-blue-100 shadow-lg">
//                         <CardHeader>
//                             <CardTitle className="flex items-center gap-2 text-blue-800">
//                                 <QrCode className="w-5 h-5" />
//                                 QR Codes & Site Web
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm text-gray-600">
//                                     {qrCodes?.length > 0 ? `${qrCodes.length} QR code${qrCodes.length > 1 ? 's' : ''} généré${qrCodes.length > 1 ? 's' : ''}` : 'Aucun QR code généré'}
//                                 </span>
//                                 <Badge variant={qrCodes?.length > 0 ? "default" : "secondary"}>
//                                     {qrCodes?.length > 0 ? 'Actif' : 'Inactif'}
//                                 </Badge>
//                             </div>

//                             <div className="space-y-2">
//                                 <Link href={`/admin/restaurant/${user?.restaurant?.id}/qr-code`}>
//                                     <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
//                                         <QrCode className="w-4 h-4" />
//                                         Gérer les QR codes
//                                     </Button>
//                                 </Link>

//                                 {website && (
//                                     <Link href={`/admin/restaurant/${user?.restaurant?.id}/website/${website.id}/update`}>
//                                         <Button variant="outline" className="w-full gap-2">
//                                             <Globe className="w-4 h-4" />
//                                             Modifier le site web
//                                         </Button>
//                                     </Link>
//                                 )}
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>

//                 {/* Liste des menus existants */}
//                 {hasMenus && (
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Vos menus</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="space-y-3">
//                                 {menus?.map((menu) => (
//                                     <div
//                                         key={menu.id}
//                                         className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
//                                     >
//                                         <div className="flex items-center gap-4">
//                                             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                                                 <ChefHat className="w-5 h-5 text-green-600" />
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-semibold text-gray-900">
//                                                     {menu.name?.fr}
//                                                 </h3>
//                                                 <p className="text-sm text-gray-600">
//                                                     {menu.categories?.length || 0} catégories, {menu.items?.length || 0} articles
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         <div className="flex items-center gap-2">
//                                             <Link href={`/admin/restaurant/${user?.restaurant?.id}/menu/${menu.id}`}>
//                                                 <Button variant="outline" size="sm" className="gap-2">
//                                                     <Eye className="w-4 h-4" />
//                                                     Voir
//                                                 </Button>
//                                             </Link>

//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger asChild>
//                                                     <Button variant="outline" size="sm">
//                                                         <Pen className="w-4 h-4" />
//                                                     </Button>
//                                                 </DropdownMenuTrigger>
//                                                 <DropdownMenuContent align="end">
//                                                     <Link
//                                                         href={`/admin/restaurant/${user?.restaurant?.id}/menu/${menu.id}/update`}
//                                                         asChild>
//                                                         <DropdownMenuItem>
//                                                             <Pen className="mr-2 h-4 w-4" />
//                                                             Modifier
//                                                         </DropdownMenuItem>
//                                                     </Link>
//                                                     <DropdownMenuSeparator />

//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {/* Onboarding */}
//                 {onboardingStatus && !onboardingStatus.is_completed && (
//                     <Card className="border-2 border-yellow-200 bg-yellow-50">
//                         <CardContent className="p-6">
//                             <div className="flex items-start gap-4">
//                                 <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
//                                     <Crown className="w-5 h-5 text-yellow-600" />
//                                 </div>
//                                 <div className="flex-1">
//                                     <h3 className="font-semibold text-yellow-900 mb-2">
//                                         Finalisez votre configuration
//                                     </h3>
//                                     <p className="text-yellow-800 mb-4">
//                                         Complétez les étapes restantes pour optimiser votre présence en ligne
//                                     </p>
//                                     <Link href="/admin/onboarding">
//                                         <Button className="bg-yellow-600 hover:bg-yellow-700">
//                                             Continuer la configuration
//                                         </Button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 )}
//             </div>
//         </PageContainer>
//     )
// }

// export default MenusPage
