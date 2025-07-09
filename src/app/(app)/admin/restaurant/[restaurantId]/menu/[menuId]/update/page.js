'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { useQueryClient } from '@tanstack/react-query'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { FileUploadInput } from '@/components/FileUploadInput'
import { useFindMenuById } from '@/services/menu/useFindMenuById'
import { useUpdateMenu } from '@/services/menu/useUpdateMenu'
import { ArrowLeft, Menu, Save } from 'lucide-react'
import PageContainer from '@/components/PageContainer'
import Label from '@/components/Label'

const MenuUpdate = () => {
    const { restaurantId, menuId } = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: {
            fr: '',
        },
        status: 'active',
        banners: []
    })
    const [bannerFiles, setBannerFiles] = useState([])
    const [bannersToRemove, setBannersToRemove] = useState([])
    const [existingBanners, setExistingBanners] = useState([])

    const {
        data: menu,
        isLoading: isLoadingMenu,
        isFetching: isFetchingMenu,
    } = useFindMenuById(menuId)

    useEffect(() => {
        if (menu) {
            setFormData({
                name: {
                    fr: menu.name?.fr || '',
                },
                status: menu.status || 'active',
            })

            if (menu.banners && menu.banners.length > 0) {
                setExistingBanners(menu.banners)
            }
        }
    }, [menu])

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menu', menuId])
        router.back()
    }

    const { mutateAsync: updateMenu } = useUpdateMenu({
        handleCallbackSuccess,
        menuId,
        restaurantId,
    })

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const formDataToSend = new FormData()

            formDataToSend.append('name', JSON.stringify(formData.name))
            formDataToSend.append('status', formData.status)
            formDataToSend.append('restaurant_id', restaurantId)

            if (bannersToRemove.length > 0) {
                bannersToRemove.forEach(bannerId => {
                    formDataToSend.append('remove_banners[]', bannerId)
                })
            }

            if (bannerFiles.length > 0) {
                bannerFiles.forEach(file => {
                    formDataToSend.append('banners[]', file)
                })
            }

            await updateMenu(formDataToSend)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        router.back()
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
                            Modifier le menu
                        </h1>
                        <p className="text-gray-600">
                            Personnalisez l'apparence de votre menu
                        </p>
                    </div>
                </div>

                {/* Formulaire principal */}
                <Card className="border-2 border-green-100 shadow-lg">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <Menu
                                        size={40}
                                        className="text-green-600"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    Modifiez votre menu
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Ajoutez des publicités pour attirer plus de clients
                                </p>
                            </div>

                            <div className="w-full space-y-6">
                                {/* Publicités */}
                                <div>
                                    <Label className="text-lg font-medium">
                                        Publicités sur le menu
                                    </Label>
                                    {isLoadingMenu || isFetchingMenu ? (
                                        <Skeleton className="h-40 w-full mt-3" />
                                    ) : (
                                        <div className="mt-3">
                                            <FileUploadInput
                                                id="banners"
                                                multiple
                                                value={bannerFiles}
                                                existingImages={existingBanners}
                                                onChange={files => {
                                                    setBannerFiles(prev => [...prev, ...files])
                                                }}
                                                onRemove={({ type, id, index }) => {
                                                    if (type === 'existing') {
                                                        setBannersToRemove(prev => [...prev, id])
                                                        setExistingBanners(prev => prev.filter((_, i) => i !== index))
                                                    } else {
                                                        setBannerFiles(prev => prev.filter((_, i) => i !== index))
                                                    }
                                                }}
                                                accept="image/*"
                                                maxSize="5MB"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
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

export default MenuUpdate
