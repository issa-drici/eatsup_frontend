import { Outfit } from 'next/font/google'

const outfitFont = Outfit({
    subsets: ['latin'],
})

export default function CGV() {
    return (
        <div>
            <h1 className={`${outfitFont.className} text-slate-50 text-3xl font-bold text-center md:text-5xl md:text-left mb-12`}>
                Conditions Générales de Vente
            </h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">1. Services proposés</h2>
                <p className="text-slate-400 mb-4">
                    Eatsup propose un service de menu digital incluant :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>Création et gestion de menu digital</li>
                    <li>QR code personnalisé</li>
                    <li>Affiche professionnelle (version Premium)</li>
                    <li>Site web inclus</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">2. Prix et paiement</h2>
                <p className="text-slate-400 mb-4">
                    Le service est proposé selon deux formules :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>Version Basic : Gratuite</li>
                    <li>Version Premium : 9,99€ HT/mois</li>
                </ul>
                <p className="text-slate-400 mb-4">
                    Le paiement est effectué mensuellement par carte bancaire.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">3. Durée et résiliation</h2>
                <p className="text-slate-400 mb-4">
                    L'abonnement est sans engagement et peut être résilié à tout moment.
                    La résiliation prendra effet à la fin de la période mensuelle en cours.
                </p>
            </section>
        </div>
    )
} 