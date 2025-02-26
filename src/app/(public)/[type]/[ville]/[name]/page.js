import Image from 'next/image'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import Link from 'next/link'
import ShareButton from './components/ShareButton'
import SessionTracker from './components/SessionTracker'
import {
    getFirstMenuByRestaurantId,
    getPublicWebsiteBySlug,
} from '@/utils/api-requests'
import { Badge } from '@/shadcn-components/ui/badge'

const RESTAURANT_TYPES = [
    { label: 'Fast-food', value: 'fast-food' },
    { label: 'Pizzeria', value: 'pizzeria' },
    { label: 'Kebab', value: 'kebab' },
    { label: 'Burger', value: 'burger' },
    { label: 'Italien', value: 'italien' },
    { label: 'Chinois', value: 'chinois' },
    { label: 'Japonais', value: 'japonais' },
    { label: 'Libanais', value: 'libanais' },
    { label: 'Indien', value: 'indien' },
    { label: 'Grillades/Barbecue', value: 'grillades-barbecue' },
    { label: 'Buffet à volonté', value: 'buffet-a-volonte' },
    { label: 'Bistrot', value: 'bistrot' },
    { label: 'Gastronomique', value: 'gastronomique' },
    { label: 'Healthy', value: 'healthy' },
]

export async function generateMetadata({ params }) {
    const { data: website } = await getPublicWebsiteBySlug(
        params.type,
        params.ville,
        params.name,
    )

    const type = RESTAURANT_TYPES.find(type => type.value === params.type)

    return {
        title: `${website?.title?.fr} - ${website?.restaurant?.city}`,
        description:
            website?.description?.fr +
            ' | ' +
            type?.label +
            ' • ' +
            website?.restaurant?.city +
            ' • ' +
            website?.restaurant?.postal_code +
            ' • ' +
            website?.title?.fr,
        openGraph: {
            images: [
                website?.presentation_image?.url || '/images/restaurant.jpg',
            ],
        },
        icons: {
            icon: website?.restaurant?.logo?.url || '/favicon.ico',
            apple: website?.restaurant?.logo?.url || '/favicon.ico',
        },
    }
}

export default async function PublicWebsite({ params }) {
    const { data: website } = await getPublicWebsiteBySlug(
        params.type,
        params.ville,
        params.name,
    )

    if (!website) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center text-gray-600">Site web non trouvé</p>
            </div>
        )
    }

    let menu = null
    try {
        menu = (await getFirstMenuByRestaurantId(website.restaurant.id)).data
    } catch (error) {
        console.error('Erreur lors de la récupération du menu:', error)
    }

    const description = website.description?.fr || ''
    const descriptionLines = description ? description.split('\n') : []

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

    const type = RESTAURANT_TYPES.find(type => type.value === params.type)

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <SessionTracker websiteId={website.id} />
            <div className="flex justify-end p-1">
                <ShareButton websiteTitle={website.title?.fr} />
            </div>
            <div className="relative h-72">
                <div className="absolute inset-0 bg-black/70 z-10" />
                <Image
                    src={
                        website.presentation_image?.url ||
                        '/images/restaurant.jpg'
                    }
                    alt="Présentation"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white z-20">
                    {website.restaurant.logo?.url && (
                        <div className="flex items-center justify-center w-20 h-20 mb-4 bg-white rounded-full overflow-hidden p-3">
                            <Image
                                src={
                                    website.restaurant.logo?.url ||
                                    '/images/logo.png'
                                }
                                alt="Logo"
                                className="w-full h-full object-contain"
                                width={100}
                                height={100}
                            />
                        </div>
                    )}
                    <Badge>{type?.label}</Badge>
                    <h1 className="text-2xl font-bold mb-2 text-center">
                        {website.title?.fr || 'Restaurant'}
                    </h1>
                    <p className="text-sm opacity-90 mb-4 text-center">
                        {descriptionLines.map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>
                    {menu ? (
                        <Link
                            href={`/restaurant/${website.restaurant.id}/menu/${menu.id}`}
                            className="w-full max-w-md bg-white text-black py-3 px-4 rounded-lg text-center font-medium">
                            Consulter notre menu
                        </Link>
                    ) : (
                        <Skeleton className="h-12 w-full max-w-md" />
                    )}
                </div>
            </div>

            <div className="p-6 space-y-8">
                <section>
                    {website.restaurant?.phone && (
                        <>
                            <h2 className="text-xl font-bold mb-4">
                                Nous contacter
                            </h2>
                            <a
                                href={`tel:${website.restaurant?.phone}`}
                                className="text-lg text-blue-600 underline">
                                {website.restaurant?.phone}
                            </a>
                        </>
                    )}
                </section>
                <section>
                    <h2 className="text-xl font-bold mb-4">Nous retrouver</h2>
                    {website.restaurant.address && (
                        <div>
                            <h3 className="font-medium mb-2">Adresse</h3>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                                href={`https://www.google.fr/maps/place/${encodeURIComponent(
                                    `${website.restaurant.address}, ${website.restaurant.postal_code} - ${website.restaurant.city}`,
                                )}`}>
                                {`${website.restaurant.address}, ${website.restaurant.postal_code} - ${website.restaurant.city}`}
                            </a>
                        </div>
                    )}
                </section>

                {website.opening_hours && (
                    <section>
                        <h2 className="text-xl font-bold mb-4">
                            Horaires d'ouverture
                        </h2>
                        <div className="space-y-2">{renderOpeningHours()}</div>
                    </section>
                )}

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
