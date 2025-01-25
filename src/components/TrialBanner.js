import { useSubscription } from '@/hooks/useSubscription'
import { Button } from '@/shadcn-components/ui/button'
import Link from 'next/link'

export const TrialBanner = () => {
    const { isTrialing, trialDaysLeft } = useSubscription()

    if (!isTrialing) return null

    return (
        <div className="bg-violet-600 text-white p-3 rounded-lg mt-4 relative">
            <div className="flex flex-col gap-2 sm:flex-row justify-between sm:items-center sm:gap-4">
                <div className="flex items-center gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium hidden sm:block">Période d'essai en cours</p>
                            <span className="absolute bottom-3 right-3 sm:static bg-violet-200 text-violet-900 text-xs font-medium px-2 py-0.5 rounded-full">
                                {trialDaysLeft}j restants
                            </span>
                        </div>
                        <p className="sm:hidden text-sm font-bold sm:text-violet-200">
                            🎁 Recevez une affiche QR code offerte !
                        </p>
                        <p className="hidden sm:block text-sm sm:text-violet-200">
                            🎁 Souscrivez maintenant et recevez une affiche QR code offerte !
                        </p>
                    </div>
                </div>
                <Link href="/admin/subscription" asChild>
                    <Button
                        variant="secondary"
                        className="whitespace-nowrap hover:bg-white hover:text-violet-600 transition-colors">
                        Profiter de l'offre
                    </Button>
                </Link>
            </div>
        </div>
    )
} 