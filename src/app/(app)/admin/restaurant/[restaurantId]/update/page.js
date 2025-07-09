'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/shadcn-components/ui/button'
import { Card, CardContent } from '@/shadcn-components/ui/card'
import { useUpdateRestaurant } from '@/services/restaurant/useUpdateRestaurant'
import { useFindRestaurantById } from '@/services/restaurant/useFindRestaurantById'
import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useQueryClient } from '@tanstack/react-query'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { Search, ArrowLeft, Building2, Save } from 'lucide-react'
import { FileUploadInput } from '@/components/FileUploadInput'
import PageContainer from '@/components/PageContainer'

const RestaurantUpdate = () => {
    const { restaurantId } = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        logo_url: '',
        social_links: {},
        google_info: {},
    })
    const [googleSearchQuery, setGoogleSearchQuery] = useState('')
    const [googleSearchResults, setGoogleSearchResults] = useState([])
    const [logoFile, setLogoFile] = useState(null)

    const {
        data: restaurant,
        isLoading: isLoadingRestaurant,
        isFetching: isFetchingRestaurant,
    } = useFindRestaurantById(restaurantId)

    useEffect(() => {
        if (restaurant) {
            setFormData({
                name: restaurant.name || '',
                address: restaurant.address || '',
                phone: restaurant.phone || '',
                logo_url: restaurant.logo?.url || '',
                social_links: restaurant.social_links || {},
                google_info: restaurant.google_info || {},
            })
        }
    }, [restaurant])

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['restaurants', restaurantId])
        router.back()
    }

    const { mutateAsync: updateRestaurant } = useUpdateRestaurant({
        handleCallbackSuccess,
        restaurantId,
        withToast: true,
    })

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formDataToSend = new FormData()

            // Ajout des champs textuels
            formDataToSend.append('name', formData.name)
            formDataToSend.append('address', formData.address)
            formDataToSend.append('phone', formData.phone)
            formDataToSend.append(
                'social_links',
                JSON.stringify(formData.social_links),
            )

            // Gestion du logo
            if (logoFile instanceof File) {
                // Vérification explicite que c'est bien un fichier
                formDataToSend.append('logo', logoFile, logoFile.name) // Ajout du nom du fichier
            } else if (formData.logo_url) {
                formDataToSend.append('logo_url', formData.logo_url)
            } else {
                formDataToSend.append('remove_logo', 'true')
            }

            await updateRestaurant(formDataToSend)
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

    const handleSelectGooglePlace = place => {
        setFormData(prev => ({
            ...prev,
            google_info: {
                place_id: place.place_id,
                name: place.name,
                url: place.url, // URL pour laisser un avis
            },
        }))
        setGoogleSearchResults([])
        setGoogleSearchQuery('')
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
                            Modifier le restaurant
                        </h1>
                        <p className="text-gray-600">
                            Mettez à jour les informations de votre établissement
                        </p>
                    </div>
                </div>

                {/* Formulaire principal */}
                <Card className="border-2 border-green-100 shadow-lg">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <Building2
                                        size={40}
                                        className="text-green-600"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    Modifiez votre restaurant
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Mettez à jour vos informations pour améliorer votre visibilité
                                </p>
                            </div>

                            <div className="w-full space-y-6">
                                {/* Nom du restaurant */}
                                <div>
                                    <Label htmlFor="name" className="text-lg font-medium">
                                        Nom du restaurant*
                                    </Label>
                                    {isLoadingRestaurant || isFetchingRestaurant ? (
                                        <Skeleton className="h-12 w-full mt-3" />
                                    ) : (
                                        <Input
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={e =>
                                                handleChange('name', null, e.target.value)
                                            }
                                            className="mt-3 text-lg h-12 border-2 focus:border-green-500"
                                            required
                                            autoFocus
                                            placeholder="Nom de votre restaurant..."
                                        />
                                    )}
                                    <InputError messages={errors.name} className="mt-2" />
                                </div>

                                {/* Adresse */}
                                <div>
                                    <Label htmlFor="address" className="text-lg font-medium">
                                        Adresse
                                    </Label>
                                    {isLoadingRestaurant || isFetchingRestaurant ? (
                                        <Skeleton className="h-12 w-full mt-3" />
                                    ) : (
                                        <Input
                                            id="address"
                                            type="text"
                                            value={formData.address}
                                            onChange={e =>
                                                handleChange(
                                                    'address',
                                                    null,
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-3 text-lg h-12 border-2 focus:border-green-500"
                                            placeholder="Adresse complète..."
                                        />
                                    )}
                                </div>

                                {/* Téléphone */}
                                <div>
                                    <Label htmlFor="phone" className="text-lg font-medium">
                                        Téléphone
                                    </Label>
                                    {isLoadingRestaurant || isFetchingRestaurant ? (
                                        <Skeleton className="h-12 w-full mt-3" />
                                    ) : (
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e =>
                                                handleChange('phone', null, e.target.value)
                                            }
                                            className="mt-3 text-lg h-12 border-2 focus:border-green-500"
                                            placeholder="01 23 45 67 89"
                                        />
                                    )}
                                </div>

                                {/* Logo */}
                                <div>
                                    <Label className="text-lg font-medium">
                                        Logo du restaurant
                                    </Label>
                                    {isLoadingRestaurant || isFetchingRestaurant ? (
                                        <Skeleton className="h-40 w-full mt-3" />
                                    ) : (
                                        <div className="mt-3">
                                            <FileUploadInput
                                                id="logo"
                                                value={logoFile}
                                                existingImages={
                                                    formData.logo_url
                                                        ? [
                                                              {
                                                                  id: 'logo',
                                                                  url: formData.logo_url,
                                                              },
                                                          ]
                                                        : []
                                                }
                                                onChange={file => {
                                                    setLogoFile(file)
                                                }}
                                                onRemove={() => {
                                                    setLogoFile(null)
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        logo_url: null,
                                                    }))
                                                }}
                                                accept="image/*"
                                                maxSize="2MB"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Réseaux sociaux */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                                        Réseaux sociaux
                                    </h3>
                                    <div>
                                        <Label htmlFor="facebook" className="text-lg font-medium">
                                            Facebook
                                        </Label>
                                        {isLoadingRestaurant || isFetchingRestaurant ? (
                                            <Skeleton className="h-12 w-full mt-3" />
                                        ) : (
                                            <Input
                                                id="facebook"
                                                type="url"
                                                value={
                                                    formData.social_links?.facebook || ''
                                                }
                                                onChange={e =>
                                                    handleChange(
                                                        'social_links',
                                                        'facebook',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-3 text-lg h-12 border-2 focus:border-green-500"
                                                placeholder="https://facebook.com/votre-page"
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="instagram" className="text-lg font-medium">
                                            Instagram
                                        </Label>
                                        {isLoadingRestaurant || isFetchingRestaurant ? (
                                            <Skeleton className="h-12 w-full mt-3" />
                                        ) : (
                                            <Input
                                                id="instagram"
                                                type="url"
                                                value={
                                                    formData.social_links?.instagram || ''
                                                }
                                                onChange={e =>
                                                    handleChange(
                                                        'social_links',
                                                        'instagram',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-3 text-lg h-12 border-2 focus:border-green-500"
                                                placeholder="https://instagram.com/votre-compte"
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="tiktok" className="text-lg font-medium">
                                            TikTok
                                        </Label>
                                        {isLoadingRestaurant || isFetchingRestaurant ? (
                                            <Skeleton className="h-12 w-full mt-3" />
                                        ) : (
                                            <Input
                                                id="tiktok"
                                                type="url"
                                                value={formData.social_links?.tiktok || ''}
                                                onChange={e =>
                                                    handleChange(
                                                        'social_links',
                                                        'tiktok',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-3 text-lg h-12 border-2 focus:border-green-500"
                                                placeholder="https://tiktok.com/@votre-compte"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Fiche Google Business */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                                        Fiche Google Business
                                    </h3>
                                    <div className="relative">
                                        <Label htmlFor="google-search" className="text-lg font-medium">
                                            Rechercher votre établissement
                                        </Label>
                                        {isLoadingRestaurant || isFetchingRestaurant ? (
                                            <Skeleton className="h-12 w-full mt-3" />
                                        ) : (
                                            <>
                                                <div className="relative">
                                                    <Input
                                                        id="google-search"
                                                        type="text"
                                                        value={googleSearchQuery}
                                                        disabled
                                                        className="mt-3 text-lg h-12 border-2 pr-10 opacity-50 cursor-not-allowed"
                                                        placeholder="Nom de votre établissement..."
                                                    />
                                                    <Search
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-50"
                                                        size={20}
                                                    />
                                                </div>

                                                {googleSearchResults.length > 0 && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl shadow-lg">
                                                        {googleSearchResults.map(place => (
                                                            <button
                                                                key={place.place_id}
                                                                type="button"
                                                                onClick={() =>
                                                                    handleSelectGooglePlace(
                                                                        place,
                                                                    )
                                                                }
                                                                className="w-full px-4 py-2 text-left hover:bg-gray-100">
                                                                <div className="font-medium">
                                                                    {place.name}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {
                                                                        place.formatted_address
                                                                    }
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {formData.google_info?.name && (
                                        <div className="p-4 bg-gray-50 rounded-xl border-2 border-green-100">
                                            <h4 className="font-medium text-green-800">
                                                Fiche sélectionnée :
                                            </h4>
                                            <p className="text-green-700">{formData.google_info.name}</p>
                                            <p className="text-sm text-gray-500">
                                                ID: {formData.google_info.place_id}
                                            </p>
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

export default RestaurantUpdate
