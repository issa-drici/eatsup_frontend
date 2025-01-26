import { Outfit } from 'next/font/google'

const outfitFont = Outfit({
    subsets: ['latin'],
})

export default function MentionsLegales() {
    return (
        <div>
            <h1 className={`${outfitFont.className} text-slate-50 text-3xl font-bold text-center md:text-5xl md:text-left mb-12`}>
                Mentions Légales
            </h1>
            
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">1. Édition du site</h2>
                <p className="text-slate-400 mb-4">
                    Le site eatsup.fr est édité par la société [Nom de votre société], SAS au capital de [montant] euros,
                    immatriculée au RCS de [ville] sous le numéro [numéro RCS].
                </p>
                <p className="text-slate-400 mb-4">
                    Siège social : [Adresse complète]<br />
                    N° de TVA intracommunautaire : [Numéro]<br />
                    Directeur de la publication : [Nom du directeur]
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">2. Hébergement</h2>
                <p className="text-slate-400 mb-4">
                    Le site est hébergé par [Nom de l'hébergeur]<br />
                    Adresse : [Adresse de l'hébergeur]<br />
                    Contact : [Email/téléphone]
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">3. Contact</h2>
                <p className="text-slate-400 mb-4">
                    Email : contact@eatsup.fr<br />
                    Téléphone : [Numéro]<br />
                    Adresse : [Adresse]
                </p>
            </section>
        </div>
    )
} 