import { Outfit } from 'next/font/google'

const outfitFont = Outfit({
    subsets: ['latin'],
})

export default function PolitiqueConfidentialite() {
    return (
        <div className='w-full'>
            <h1 className={`${outfitFont.className} text-slate-50 text-3xl font-bold text-center md:text-5xl md:text-left mb-12`}>
                Politique de Confidentialité
            </h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">1. Collecte des données</h2>
                <p className="text-slate-400 mb-4">
                    Nous collectons les données suivantes :
                </p>
                <ul className="list-disc ml-6 text-slate-600 mb-4">
                    <li>Données d'identification (nom, email)</li>
                    <li>Données de connexion et cookies</li>
                    <li>Données de navigation et statistiques</li>
                    <li>Informations sur votre restaurant</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">2. Utilisation des cookies</h2>
                <p className="text-slate-400 mb-4">
                    Nous utilisons des cookies pour :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>Mémoriser vos préférences</li>
                    <li>Analyser l'utilisation du site</li>
                    <li>Sécuriser votre connexion</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">3. Vos droits</h2>
                <p className="text-slate-400 mb-4">
                    Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>Droit d'accès et de rectification</li>
                    <li>Droit à l'effacement</li>
                    <li>Droit à la portabilité</li>
                    <li>Droit d'opposition</li>
                </ul>
            </section>
        </div>
    )
} 