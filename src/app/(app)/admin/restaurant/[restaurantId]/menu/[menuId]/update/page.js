'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Button } from '@/shadcn-components/ui/button'
import Label from '@/components/Label'
// import Input from '@/components/Input'
// import InputError from '@/components/InputError'
import { useQueryClient } from '@tanstack/react-query'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { FileUploadInput } from '@/components/FileUploadInput'
import { useFindMenuById } from '@/services/menu/useFindMenuById'
import { useUpdateMenu } from '@/services/menu/useUpdateMenu'

const MenuUpdate = () => {
    const { restaurantId, menuId } = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()
    // const [errors, setErrors] = useState([])
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
        isLoading,
        isFetching,
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

    const { mutate: updateMenu } = useUpdateMenu({
        handleCallbackSuccess,
        menuId,
        restaurantId,
    })

    const handleSubmit = async e => {
        e.preventDefault()

        // try {
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
        // } catch (error) {
        //     if (error.response?.status === 422) {
        //         setErrors(error.response.data.errors)
        //     }
        // }
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
                            title: 'Restaurant',
                            href: `/admin/restaurant/${restaurantId}`,
                        },
                        {
                            title: 'Menu',
                            href: `/admin/restaurant/${restaurantId}/menu/${menuId}`,
                        },
                        {
                            title: 'Modifier',
                            href: `/admin/restaurant/${restaurantId}/menu/${menuId}/update`,
                        },
                    ]}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {/* <div>
                        <Label htmlFor="name">Nom*</Label>
                        {isLoading || isFetching ? (
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
                    </div> */}

                    {/* <div>
                        <Label htmlFor="status">Statut</Label>
                        {isLoading || isFetching ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <select
                                id="status"
                                value={formData.status}
                                onChange={e => handleChange('status', null, e.target.value)}
                                className="mt-1 w-full border rounded-md p-2">
                                <option value="active">Actif</option>
                                <option value="inactive">Inactif</option>
                            </select>
                        )}
                    </div> */}

                    <div>
                        <Label htmlFor="banners">Publicités sur le menu</Label>
                        {isLoading || isFetching ? (
                            <Skeleton className="h-40 w-full mt-1" />
                        ) : (
                            <div className="mt-2">
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

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={event => {
                            event.preventDefault()
                            router.back()
                        }}>
                        Annuler
                    </Button>
                    <Button type="submit">Mettre à jour le menu</Button>
                </div>
            </form>
        </>
    )
}

export default MenuUpdate
