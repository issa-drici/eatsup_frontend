'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Button } from '@/shadcn-components/ui/button'
import { useUpdateWebsite } from '@/services/website/useUpdateWebsite'
import Label from '@/components/Label'
import Input from '@/components/Input'
import { useQueryClient } from '@tanstack/react-query'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { FileUploadInput } from '@/components/FileUploadInput'
import { useGetWebsiteByRestaurantId } from '@/services/website/useGetWebsiteByRestaurantId'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/shadcn-components/ui/accordion'
import TextArea from '@/components/TextArea'

const WebsiteUpdate = () => {
    const { restaurantId, websiteId } = useParams()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        domain: '',
        title: {
            fr: '',
        },
        description: {
            fr: '',
        },
        presentation_image_url: '',
        opening_hours: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        },
        theme_config: {
            primary_color: '#000000',
            secondary_color: '#ffffff',
        },
    })
    const [presentationImage, setPresentationImage] = useState(null)
    const [existingPresentationImage, setExistingPresentationImage] =
        useState(null)

    const {
        data: website,
        isLoading: isLoadingWebsite,
        isFetching: isFetchingWebsite,
    } = useGetWebsiteByRestaurantId(restaurantId)

    useEffect(() => {
        if (website) {
            setFormData({
                domain: website.domain || '',
                title: website.title || { fr: '' },
                description: website.description || { fr: '' },
                presentation_image_url: website.presentation_image?.url || '',
                opening_hours: website.opening_hours || {
                    monday: [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                    saturday: [],
                    sunday: [],
                },
                theme_config: website.theme_config || {
                    primary_color: '#000000',
                    secondary_color: '#ffffff',
                },
            })

            if (website.presentation_image?.url) {
                setExistingPresentationImage({
                    id: website.presentation_image.id,
                    url: website.presentation_image.url,
                })
            }
        }
    }, [website])

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['website', restaurantId])
        router.back()
    }

    const { mutateAsync: updateWebsite } = useUpdateWebsite({
        handleCallbackSuccess,
        restaurantId,
    })

    const handleSubmit = async e => {
        e.preventDefault()

        const formDataToSend = new FormData()

        formDataToSend.append('domain', formData.domain)
        formDataToSend.append('title', JSON.stringify(formData.title))
        formDataToSend.append(
            'description',
            JSON.stringify(formData.description),
        )
        formDataToSend.append(
            'opening_hours',
            JSON.stringify(formData.opening_hours),
        )
        formDataToSend.append(
            'theme_config',
            JSON.stringify(formData.theme_config),
        )

        if (presentationImage instanceof File) {
            formDataToSend.append('presentation_image', presentationImage)
        } else if (existingPresentationImage) {
            formDataToSend.append(
                'presentation_image_url',
                existingPresentationImage.url,
            )
        } else {
            formDataToSend.append('remove_presentation_image', 'true')
        }

        setIsLoading(true)

        try {
            await updateWebsite(formDataToSend)
        } catch (error) {
            // Gérer l'erreur silencieusement
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
                            title: 'Site web',
                            href: `/admin/restaurant/${restaurantId}/website/${websiteId}`,
                        },
                        {
                            title: 'Modifier',
                            href: `/admin/restaurant/${restaurantId}/website/${websiteId}/update`,
                        },
                    ]}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {/* <div>
                        <Label htmlFor="domain">Nom de domaine</Label>
                        {(isLoading || isFetching) ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="domain"
                                type="text"
                                value={formData.domain}
                                onChange={e => handleChange('domain', null, e.target.value)}
                                className="mt-1 w-full"
                                placeholder="mon-restaurant.com"
                            />
                        )}
                        <InputError messages={errors.domain} className="mt-2" />
                    </div> */}

                    <div>
                        <Label htmlFor="title">Titre du site</Label>
                        {isLoadingWebsite || isFetchingWebsite ? (
                            <Skeleton className="h-10 w-full mt-1" />
                        ) : (
                            <Input
                                id="title"
                                type="text"
                                value={formData.title.fr}
                                onChange={e =>
                                    handleChange('title', 'fr', e.target.value)
                                }
                                className="mt-1 w-full"
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        {isLoadingWebsite || isFetchingWebsite ? (
                            <Skeleton className="h-32 w-full mt-1" />
                        ) : (
                            <TextArea
                                id="description"
                                value={formData.description.fr}
                                onChange={e =>
                                    handleChange(
                                        'description',
                                        'fr',
                                        e.target.value,
                                    )
                                }
                                className="mt-1 w-full"
                                rows={4}
                            />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="presentation_image">
                            Image de présentation
                        </Label>
                        {isLoadingWebsite || isFetchingWebsite ? (
                            <Skeleton className="h-40 w-full mt-1" />
                        ) : (
                            <div className="mt-2">
                                <FileUploadInput
                                    id="presentation_image"
                                    value={presentationImage}
                                    existingImages={
                                        existingPresentationImage
                                            ? [existingPresentationImage]
                                            : []
                                    }
                                    onChange={file => {
                                        setPresentationImage(file)
                                    }}
                                    onRemove={() => {
                                        setPresentationImage(null)
                                        setFormData(prev => ({
                                            ...prev,
                                            presentation_image_url: null,
                                        }))
                                        setExistingPresentationImage(null)
                                    }}
                                    accept="image/*"
                                    maxSize="2MB"
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                            Horaires d'ouverture
                        </h3>
                        {isLoadingWebsite || isFetchingWebsite ? (
                            <Skeleton className="h-96 w-full mt-1" />
                        ) : (
                            <Accordion
                                type="multiple"
                                defaultValue={['monday']}
                                className="w-full">
                                {Object.entries({
                                    monday: 'Lundi',
                                    tuesday: 'Mardi',
                                    wednesday: 'Mercredi',
                                    thursday: 'Jeudi',
                                    friday: 'Vendredi',
                                    saturday: 'Samedi',
                                    sunday: 'Dimanche',
                                }).map(([day, label]) => {
                                    if (!formData.opening_hours[day]) {
                                        formData.opening_hours[day] = [
                                            {
                                                start: '',
                                                end: '',
                                                closed: false,
                                            },
                                            {
                                                start: '',
                                                end: '',
                                                closed: false,
                                            },
                                        ]
                                    }

                                    return (
                                        <AccordionItem key={day} value={day}>
                                            <AccordionTrigger className="hover:no-underline">
                                                {label}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col md:flex-row md:items-start gap-6 pt-4">
                                                    <div className="flex-1 space-y-2">
                                                        <Label
                                                            htmlFor={`${day}_morning_start`}
                                                            className="text-sm text-gray-500">
                                                            Matin
                                                        </Label>
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex flex-wrap gap-2 items-center">
                                                                <Input
                                                                    id={`${day}_morning_start`}
                                                                    type="time"
                                                                    disabled={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][0]
                                                                            ?.closed
                                                                    }
                                                                    value={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][0]
                                                                            ?.start ||
                                                                        ''
                                                                    }
                                                                    onChange={e => {
                                                                        const newHours =
                                                                            [
                                                                                ...formData
                                                                                    .opening_hours[
                                                                                    day
                                                                                ],
                                                                            ]
                                                                        newHours[0] =
                                                                            {
                                                                                ...newHours[0],
                                                                                start: e
                                                                                    .target
                                                                                    .value,
                                                                            }
                                                                        handleChange(
                                                                            'opening_hours',
                                                                            null,
                                                                            {
                                                                                ...formData.opening_hours,
                                                                                [day]: newHours,
                                                                            },
                                                                        )
                                                                    }}
                                                                    className="w-32"
                                                                />
                                                                <span>-</span>
                                                                <Input
                                                                    id={`${day}_morning_end`}
                                                                    type="time"
                                                                    disabled={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][0]
                                                                            ?.closed
                                                                    }
                                                                    value={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][0]
                                                                            ?.end ||
                                                                        ''
                                                                    }
                                                                    onChange={e => {
                                                                        const newHours =
                                                                            [
                                                                                ...formData
                                                                                    .opening_hours[
                                                                                    day
                                                                                ],
                                                                            ]
                                                                        newHours[0] =
                                                                            {
                                                                                ...newHours[0],
                                                                                end: e
                                                                                    .target
                                                                                    .value,
                                                                            }
                                                                        handleChange(
                                                                            'opening_hours',
                                                                            null,
                                                                            {
                                                                                ...formData.opening_hours,
                                                                                [day]: newHours,
                                                                            },
                                                                        )
                                                                    }}
                                                                    className="w-32"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Label
                                                                    htmlFor={`${day}_morning_closed`}
                                                                    className="text-sm">
                                                                    Fermé
                                                                </Label>
                                                                <input
                                                                    className="rounded-sm"
                                                                    type="checkbox"
                                                                    id={`${day}_morning_closed`}
                                                                    checked={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][0]
                                                                            ?.closed
                                                                    }
                                                                    onChange={e => {
                                                                        const newHours =
                                                                            [
                                                                                ...formData
                                                                                    .opening_hours[
                                                                                    day
                                                                                ],
                                                                            ]
                                                                        newHours[0] =
                                                                            {
                                                                                ...newHours[0],
                                                                                closed: e
                                                                                    .target
                                                                                    .checked,
                                                                                start: e
                                                                                    .target
                                                                                    .checked
                                                                                    ? ''
                                                                                    : newHours[0]
                                                                                          .start,
                                                                                end: e
                                                                                    .target
                                                                                    .checked
                                                                                    ? ''
                                                                                    : newHours[0]
                                                                                          .end,
                                                                            }
                                                                        handleChange(
                                                                            'opening_hours',
                                                                            null,
                                                                            {
                                                                                ...formData.opening_hours,
                                                                                [day]: newHours,
                                                                            },
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <Label
                                                            htmlFor={`${day}_evening_start`}
                                                            className="text-sm text-gray-500">
                                                            Soir
                                                        </Label>
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex flex-wrap gap-2 items-center">
                                                                <Input
                                                                    id={`${day}_evening_start`}
                                                                    type="time"
                                                                    disabled={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][1]
                                                                            ?.closed
                                                                    }
                                                                    value={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][1]
                                                                            ?.start ||
                                                                        ''
                                                                    }
                                                                    onChange={e => {
                                                                        const newHours =
                                                                            [
                                                                                ...formData
                                                                                    .opening_hours[
                                                                                    day
                                                                                ],
                                                                            ]
                                                                        newHours[1] =
                                                                            {
                                                                                ...newHours[1],
                                                                                start: e
                                                                                    .target
                                                                                    .value,
                                                                            }
                                                                        handleChange(
                                                                            'opening_hours',
                                                                            null,
                                                                            {
                                                                                ...formData.opening_hours,
                                                                                [day]: newHours,
                                                                            },
                                                                        )
                                                                    }}
                                                                    className="w-32"
                                                                />
                                                                <span>-</span>
                                                                <Input
                                                                    id={`${day}_evening_end`}
                                                                    type="time"
                                                                    disabled={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][1]
                                                                            ?.closed
                                                                    }
                                                                    value={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][1]
                                                                            ?.end ||
                                                                        ''
                                                                    }
                                                                    onChange={e => {
                                                                        const newHours =
                                                                            [
                                                                                ...formData
                                                                                    .opening_hours[
                                                                                    day
                                                                                ],
                                                                            ]
                                                                        newHours[1] =
                                                                            {
                                                                                ...newHours[1],
                                                                                end: e
                                                                                    .target
                                                                                    .value,
                                                                            }
                                                                        handleChange(
                                                                            'opening_hours',
                                                                            null,
                                                                            {
                                                                                ...formData.opening_hours,
                                                                                [day]: newHours,
                                                                            },
                                                                        )
                                                                    }}
                                                                    className="w-32"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Label
                                                                    htmlFor={`${day}_evening_closed`}
                                                                    className="text-sm">
                                                                    Fermé
                                                                </Label>
                                                                <input
                                                                    className="rounded-sm"
                                                                    type="checkbox"
                                                                    id={`${day}_evening_closed`}
                                                                    checked={
                                                                        formData
                                                                            .opening_hours[
                                                                            day
                                                                        ][1]
                                                                            ?.closed
                                                                    }
                                                                    onChange={e => {
                                                                        const newHours =
                                                                            [
                                                                                ...formData
                                                                                    .opening_hours[
                                                                                    day
                                                                                ],
                                                                            ]
                                                                        newHours[1] =
                                                                            {
                                                                                ...newHours[1],
                                                                                closed: e
                                                                                    .target
                                                                                    .checked,
                                                                                start: e
                                                                                    .target
                                                                                    .checked
                                                                                    ? ''
                                                                                    : newHours[1]
                                                                                          .start,
                                                                                end: e
                                                                                    .target
                                                                                    .checked
                                                                                    ? ''
                                                                                    : newHours[1]
                                                                                          .end,
                                                                            }
                                                                        handleChange(
                                                                            'opening_hours',
                                                                            null,
                                                                            {
                                                                                ...formData.opening_hours,
                                                                                [day]: newHours,
                                                                            },
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        )}
                    </div>

                    {/* <div className="space-y-4">
                        <h3 className="text-lg font-medium">Configuration du thème</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="primary_color">Couleur principale</Label>
                                {(isLoading || isFetching) ? (
                                    <Skeleton className="h-10 w-full mt-1" />
                                ) : (
                                    <Input
                                        id="primary_color"
                                        type="color"
                                        value={formData.theme_config.primary_color}
                                        onChange={e => setFormData(prev => ({
                                            ...prev,
                                            theme_config: {
                                                ...prev.theme_config,
                                                primary_color: e.target.value
                                            }
                                        }))}
                                        className="mt-1 h-10"
                                    />
                                )}
                            </div>

                            <div>
                                <Label htmlFor="secondary_color">Couleur secondaire</Label>
                                {(isLoading || isFetching) ? (
                                    <Skeleton className="h-10 w-full mt-1" />
                                ) : (
                                    <Input
                                        id="secondary_color"
                                        type="color"
                                        value={formData.theme_config.secondary_color}
                                        onChange={e => setFormData(prev => ({
                                            ...prev,
                                            theme_config: {
                                                ...prev.theme_config,
                                                secondary_color: e.target.value
                                            }
                                        }))}
                                        className="mt-1 h-10"
                                    />
                                )}
                            </div>
                        </div>
                    </div> */}
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={event => {
                            event.preventDefault()
                            router.back()
                        }}>
                        Annuler
                    </Button>
                    <Button isLoading={isLoading} type="submit">
                        Mettre à jour le site web
                    </Button>
                </div>
            </form>
        </>
    )
}

export default WebsiteUpdate
