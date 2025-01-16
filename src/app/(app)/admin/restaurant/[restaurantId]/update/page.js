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
import { Skeleton } from "@/shadcn-components/ui/skeleton"
import { Search } from 'lucide-react'
import Image from 'next/image'

const RestaurantUpdate = () => {
    const { restaurantId } = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        logo_url: '',
        social_links: {},
        google_info: {}
    })
    const [googleSearchQuery, setGoogleSearchQuery] = useState('')
    const [googleSearchResults, setGoogleSearchResults] = useState([])
    const [logoPreview, setLogoPreview] = useState(null)
    const [logoFile, setLogoFile] = useState(null)

    const { data: restaurant, isLoading, isFetching } = useFindRestaurantById(restaurantId)

    useEffect(() => {
        if (restaurant) {
            setFormData({
                name: restaurant.name || '',
                address: restaurant.address || '',
                phone: restaurant.phone || '',
                logo_url: restaurant.logo?.url || '',
                social_links: restaurant.social_links || {},
                google_info: restaurant.google_info || {}
            })
        }
    }, [restaurant])

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['restaurants', restaurantId])
        router.back()
    }

    const { mutate: updateRestaurant } = useUpdateRestaurant({
        handleCallbackSuccess,
        restaurantId,
    })

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const formDataToSend = new FormData()
            
            // Ajout des champs textuels
            formDataToSend.append('name', formData.name)
            formDataToSend.append('address', formData.address)
            formDataToSend.append('phone', formData.phone)
            formDataToSend.append('social_links', JSON.stringify(formData.social_links))
            
            // Gestion du logo
            if (logoFile instanceof File) {  // Vérification explicite que c'est bien un fichier
                formDataToSend.append('logo', logoFile, logoFile.name)  // Ajout du nom du fichier
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

    const handleSelectGooglePlace = (place) => {
        setFormData(prev => ({
            ...prev,
            google_info: {
                place_id: place.place_id,
                name: place.name,
                url: place.url, // URL pour laisser un avis
            }
        }))
        setGoogleSearchResults([])
        setGoogleSearchQuery('')
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoFile(file)
            const previewUrl = URL.createObjectURL(file)
            setLogoPreview(previewUrl)
            // On ne met pas à jour formData.logo_url car ce sera géré par le backend
        }
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
                        {(isLoading || isFetching) ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={e => handleChange('name', null, e.target.value)}
                                className="mt-1 w-full"
                                required
                                autoFocus
                            />
                        )}
                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="address">Adresse</Label>
                        {(isLoading || isFetching) ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="address"
                                type="text"
                                value={formData.address}
                                onChange={e => handleChange('address', null, e.target.value)}
                                className="mt-1 w-full"
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        {(isLoading || isFetching) ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={e => handleChange('phone', null, e.target.value)}
                                className="mt-1 w-full"
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="logo">Logo du restaurant</Label>
                        {(isLoading || isFetching) ? (
                            <Skeleton className="h-40 w-full mt-1" />
                        ) : (
                            <div className="mt-2">
                                <div className="space-y-4">
                                    <label 
                                        htmlFor="logo" 
                                        className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        {(logoPreview || formData.logo_url) ? (
                                            <div className="absolute inset-0 w-full h-full">
                                                <Image
                                                    src={logoPreview || formData.logo_url}
                                                    alt="Logo preview"
                                                    fill
                                                    className="object-contain p-4"
                                                />
                                                {/* Overlay desktop uniquement */}
                                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-all items-center justify-center hidden md:flex rounded-lg">
                                                    <div className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <p className="font-semibold">Cliquez pour changer</p>
                                                        <p className="text-sm">ou glissez une nouvelle image</p>
                                                    </div>
                                                </div>
                                                {/* Bouton supprimer desktop uniquement */}
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        setLogoPreview(null)
                                                        setLogoFile(null)
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            logo_url: ''
                                                        }))
                                                    }}
                                                >
                                                    Supprimer
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-6">
                                                <svg className="w-10 h-10 mb-4 text-gray-500 group-hover:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 group-hover:text-gray-600">
                                                    <span className="font-semibold">
                                                        <span className="hidden md:inline">Cliquez pour uploader</span>
                                                        <span className="md:hidden">Touchez pour uploader</span>
                                                    </span>
                                                    <span className="hidden md:inline"> ou glissez-déposez</span>
                                                </p>
                                                <p className="text-xs text-gray-500 group-hover:text-gray-600">PNG, JPG (MAX. 2MB)</p>
                                            </div>
                                        )}
                                        <Input
                                            id="logo"
                                            type="file"
                                            onChange={handleLogoChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </label>

                                    {/* Contrôles mobile uniquement */}
                                    {(logoPreview || formData.logo_url) && (
                                        <div className="flex flex-col gap-2 md:hidden">
                                            <p className="text-sm text-slate-600 text-center">
                                                Touchez l'image pour la changer
                                            </p>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="w-full"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    setLogoPreview(null)
                                                    setLogoFile(null)
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        logo_url: ''
                                                    }))
                                                }}
                                            >
                                                Supprimer le logo
                                            </Button>
                                        </div>
                                    )}
                                    
                                    {logoFile && (
                                        <p className="text-sm text-gray-500">
                                            Fichier sélectionné : {logoFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Réseaux sociaux</h3>
                        <div>
                            <Label htmlFor="facebook">Facebook</Label>
                            {(isLoading || isFetching) ? (
                                <Skeleton className="h-10 w-full mt-1" />
                            ) : (
                                <Input
                                    id="facebook"
                                    type="url"
                                    value={formData.social_links?.facebook || ''}
                                    onChange={e => handleChange('social_links', 'facebook', e.target.value)}
                                    className="mt-1 w-full"
                                    placeholder="https://facebook.com/votre-page"
                                />
                            )}
                        </div>

                        <div>
                            <Label htmlFor="instagram">Instagram</Label>
                            {(isLoading || isFetching) ? (
                                <Skeleton className="h-10 w-full mt-1" />
                            ) : (
                                <Input
                                    id="instagram"
                                    type="url"
                                    value={formData.social_links?.instagram || ''}
                                    onChange={e => handleChange('social_links', 'instagram', e.target.value)}
                                    className="mt-1 w-full"
                                    placeholder="https://instagram.com/votre-compte"
                                />
                            )}
                        </div>

                        <div>
                            <Label htmlFor="tiktok">TikTok</Label>
                            {(isLoading || isFetching) ? (
                                <Skeleton className="h-10 w-full mt-1" />
                            ) : (
                                <Input
                                    id="tiktok"
                                    type="url"
                                    value={formData.social_links?.tiktok || ''}
                                    onChange={e => handleChange('social_links', 'tiktok', e.target.value)}
                                    className="mt-1 w-full"
                                    placeholder="https://tiktok.com/@votre-compte"
                                />
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Fiche Google Business</h3>
                        <div className="relative">
                            <Label htmlFor="google-search">Rechercher votre établissement</Label>
                            {(isLoading || isFetching) ? (
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
                                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-50" size={20} />
                                    </div>
                                    
                                    {googleSearchResults.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                                            {googleSearchResults.map((place) => (
                                                <button
                                                    key={place.place_id}
                                                    type="button"
                                                    onClick={() => handleSelectGooglePlace(place)}
                                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                                >
                                                    <div className="font-medium">{place.name}</div>
                                                    <div className="text-sm text-gray-500">{place.formatted_address}</div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {formData.google_info?.name && (
                            <div className="p-4 bg-gray-50 rounded-md">
                                <h4 className="font-medium">Fiche sélectionnée :</h4>
                                <p>{formData.google_info.name}</p>
                                <p className="text-sm text-gray-500">ID: {formData.google_info.place_id}</p>
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
                    <Button type="submit">Mettre à jour le restaurant</Button>
                </div>
            </form>
        </>
    )
}

export default RestaurantUpdate
