'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Button } from '@/shadcn-components/ui/button'
import { useUpdateRestaurant } from '@/services/restaurant/useUpdateRestaurant'
import { useFindRestaurantById } from '@/services/restaurant/useFindRestaurantById'
import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useQueryClient } from '@tanstack/react-query'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { Search } from 'lucide-react'
import { FileUploadInput } from '@/components/FileUploadInput'

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

    // const handleGoogleSearch = async (query) => {
    //     try {
    //         // Appel à votre API pour rechercher les fiches Google Business
    //         const results = await searchGooglePlaces(query)
    //         setGoogleSearchResults(results)
    //     } catch (error) {
    //         console.error('Erreur lors de la recherche Google:', error)
    //     }
    // }

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
                            // href: `/admin/restaurant/${restaurantId}`,
                        },
                        {
                            title: 'Modifier',
                            href: `/admin/restaurant/${restaurantId}/update`,
                        },
                    ]}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nom du restaurant*</Label>
                        {isLoadingRestaurant || isFetchingRestaurant ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={e =>
                                    handleChange('name', null, e.target.value)
                                }
                                className="mt-1 w-full"
                                required
                                autoFocus
                            />
                        )}
                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="address">Adresse</Label>
                        {isLoadingRestaurant || isFetchingRestaurant ? (
                            <Skeleton className="h-10 w-full mt-1" />
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
                                className="mt-1 w-full"
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        {isLoadingRestaurant || isFetchingRestaurant ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={e =>
                                    handleChange('phone', null, e.target.value)
                                }
                                className="mt-1 w-full"
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="logo">Logo du restaurant</Label>
                        {isLoadingRestaurant || isFetchingRestaurant ? (
                            <Skeleton className="h-40 w-full mt-1" />
                        ) : (
                            <div className="mt-2">
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

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Réseaux sociaux</h3>
                        <div>
                            <Label htmlFor="facebook">Facebook</Label>
                            {isLoadingRestaurant || isFetchingRestaurant ? (
                                <Skeleton className="h-10 w-full mt-1" />
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
                                    className="mt-1 w-full"
                                    placeholder="https://facebook.com/votre-page"
                                />
                            )}
                        </div>

                        <div>
                            <Label htmlFor="instagram">Instagram</Label>
                            {isLoadingRestaurant || isFetchingRestaurant ? (
                                <Skeleton className="h-10 w-full mt-1" />
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
                                    className="mt-1 w-full"
                                    placeholder="https://instagram.com/votre-compte"
                                />
                            )}
                        </div>

                        <div>
                            <Label htmlFor="tiktok">TikTok</Label>
                            {isLoadingRestaurant || isFetchingRestaurant ? (
                                <Skeleton className="h-10 w-full mt-1" />
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
                                    className="mt-1 w-full"
                                    placeholder="https://tiktok.com/@votre-compte"
                                />
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                            Fiche Google Business
                        </h3>
                        <div className="relative">
                            <Label htmlFor="google-search">
                                Rechercher votre établissement
                            </Label>
                            {isLoadingRestaurant || isFetchingRestaurant ? (
                                <Skeleton className="h-10 w-full mt-1" />
                            ) : (
                                <>
                                    <div className="relative">
                                        <Input
                                            id="google-search"
                                            type="text"
                                            value={googleSearchQuery}
                                            disabled
                                            className="mt-1 w-full pr-10 opacity-50 cursor-not-allowed"
                                            placeholder="Nom de votre établissement..."
                                        />
                                        <Search
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-50"
                                            size={20}
                                        />
                                    </div>

                                    {googleSearchResults.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
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
                            <div className="p-4 bg-gray-50 rounded-md">
                                <h4 className="font-medium">
                                    Fiche sélectionnée :
                                </h4>
                                <p>{formData.google_info.name}</p>
                                <p className="text-sm text-gray-500">
                                    ID: {formData.google_info.place_id}
                                </p>
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
                    <Button isLoading={isLoading} type="submit">Mettre à jour le restaurant</Button>
                </div>
            </form>
        </>
    )
}

export default RestaurantUpdate
