'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import Link from 'next/link'
import { useFindWebsiteBySlugPublic } from '@/services/website/useFindWebsiteBySlugPublic'
import { useEffect } from 'react'
import { useCreateWebsiteSession } from '@/services/website-session/useCreateWebsiteSession'

const PublicWebsite = () => {
    const { type: typeSlug, ville: citySlug, name: nameSlug } = useParams()
    const { data: website, isLoading } = useFindWebsiteBySlugPublic(
        typeSlug,
        citySlug,
        nameSlug,
    )

    const renderOpeningHours = () => {
        if (!website?.opening_hours) return null

        const days = {
            monday: 'Lundi',
            tuesday: 'Mardi',
            wednesday: 'Mercredi',
            thursday: 'Jeudi',
            friday: 'Vendredi',
            saturday: 'Samedi',
            sunday: 'Dimanche',
        }

        return Object.entries(days).map(([day, label], index, array) => {
            const slots = website.opening_hours[day]
            const content = (
                <div key={day} className="flex justify-between py-2">
                    <span className="font-medium">{label}</span>
                    <div className="flex flex-col items-end">
                        {!slots ||
                        slots.length === 0 ||
                        slots.every(slot => slot.closed) ? (
                            <span>Fermé</span>
                        ) : (
                            slots.map((slot, idx) => {
                                if (slot.closed) return null
                                return (
                                    <span key={idx}>
                                        {idx === 0 ? 'Midi' : 'Soir'} :{' '}
                                        {slot.start} - {slot.end}
                                    </span>
                                )
                            })
                        )}
                    </div>
                </div>
            )

            // Ajoute un séparateur après chaque jour sauf le dernier
            if (index < array.length - 1) {
                return (
                    <div key={day}>
                        {content}
                        <div className="border-b border-gray-200" />
                    </div>
                )
            }

            return content
        })
    }

    const { mutate: createWebsiteSession } = useCreateWebsiteSession({
        websiteId: website?.id,
    })

    const handleCreateSession = async () => {
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json')
            const ipData = await ipResponse.json()

            await createWebsiteSession({
                ip_address: ipData.ip,
                user_agent: window.navigator.userAgent,
                location: '',
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Erreur lors de la création de la session:', error)
        }
    }

    useEffect(() => {
        // Création initiale de la session
        handleCreateSession()

        // Gestionnaire d'événement pour le focus
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                handleCreateSession()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            )
        }
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Skeleton className="h-64 w-full" />
                <div className="p-6 space-y-8">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        )
    }

    if (!website) {
        return <div>Site web non trouvé</div>
    }

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="relative h-72">
                <div className="absolute inset-0 bg-black/70 z-10" />
                <Image
                    src={
                        website.presentation_image?.url ||
                        '/images/default-restaurant.jpg'
                    }
                    alt="Présentation"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white z-20">
                    <h1 className="text-2xl font-bold mb-2 text-center">
                        {website.title?.fr}
                    </h1>
                    <p className="text-sm opacity-90 mb-4 text-center">
                        {website.description?.fr
                            .split('\n')
                            .map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                    </p>
                    <Link
                        href={`/restaurant/${website.restaurant?.id}/menu/${website.menu_id}`}
                        className="w-full max-w-md bg-white text-black py-3 px-4 rounded-lg text-center font-medium">
                        Consulter notre menu
                    </Link>
                </div>
            </div>

            <div className="p-6 space-y-8">
                <section>
                    <h2 className="text-xl font-bold mb-4">Nous contacter</h2>
                    {website.phone && (
                        <a
                            href={`tel:${website.phone}`}
                            className="text-lg hover:underline">
                            {website.phone}
                        </a>
                    )}
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">Nous retrouver</h2>
                    {website.address && (
                        <div>
                            <h3 className="font-medium mb-2">Adresse</h3>
                            <p>{website.address}</p>
                        </div>
                    )}
                    {/* Ici vous pourriez ajouter la carte Google Maps */}
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">
                        Horaires d'ouverture
                    </h2>
                    <div className="space-y-2">{renderOpeningHours()}</div>
                </section>

                {website.google_info?.url && (
                    <section className="bg-slate-900 text-white p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">
                                    Je profite de -5% de réduction
                                </p>
                                <p className="text-sm text-gray-300">
                                    Soutenez notre restaurant en laissant un
                                    avis Google
                                </p>
                            </div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <svg
                                        key={star}
                                        className="w-4 h-4 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default PublicWebsite
