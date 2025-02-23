import { outfitFont } from '@/ui/fonts'

export default function CGV() {
    return (
        <div className="w-full">
            <h1
                className={`${outfitFont.className} text-slate-50 text-3xl font-bold text-center md:text-5xl md:text-left mb-12`}>
                Conditions Générales de Vente (CGV)
            </h1>

            <p className="text-slate-400 mb-8">
                Dernière mise à jour : 15/02/2025
            </p>

            <p className="text-slate-400 mb-8">
                Les présentes Conditions Générales de Vente (CGV) régissent
                l'utilisation du site EatsUp.fr et les prestations de services
                proposées par Issa DRICI, micro-entrepreneur, immatriculé sous
                le numéro SIRET 84849431600039, dont le siège social est situé
                au 3 rue des Sœurs Franciscaines, 76620 Le Havre, France.
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    1. Objet
                </h2>
                <p className="text-slate-400">
                    Les présentes CGV définissent les droits et obligations des
                    parties dans le cadre de la souscription et de l'utilisation
                    des services de digitalisation de menus proposés par EatsUp
                    en mode SaaS.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    2. Acceptation des CGV
                </h2>
                <p className="text-slate-400">
                    L'utilisation des services EatsUp implique l'acceptation
                    pleine et entière des présentes CGV par l'utilisateur. En
                    validant son abonnement, l'utilisateur reconnaît avoir pris
                    connaissance et accepté ces conditions sans réserve.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    3. Services proposés
                </h2>
                <p className="text-slate-400">
                    EatsUp fournit une solution de digitalisation de menus sous
                    forme d'un abonnement mensuel sans engagement, permettant
                    aux restaurants de générer et gérer leurs menus numériques
                    accessibles via QR Code.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    4. Abonnements et tarifs
                </h2>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>
                        Formule d'abonnement : Service proposé sur la base d'un
                        abonnement mensuel renouvelable automatiquement.
                    </li>
                    <li>
                        Tarification : Le prix de l'abonnement est affiché sur
                        le site EatsUp.fr et peut être modifié à tout moment.
                        Toute modification sera communiquée à l'utilisateur
                        avant la prochaine échéance.
                    </li>
                    <li>
                        Facturation : Les paiements sont prélevés
                        automatiquement chaque mois via Stripe.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    5. Modalités de paiement
                </h2>
                <p className="text-slate-400 mb-4">
                    Les paiements sont effectués par carte bancaire via la
                    plateforme sécurisée Stripe. EatsUp ne stocke aucune donnée
                    bancaire des utilisateurs.
                </p>
                <p className="text-slate-400">
                    En cas d'échec du paiement, un email de relance est envoyé
                    et l'accès aux services peut être suspendu jusqu'à la
                    régularisation du paiement.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    6. Droit de rétractation
                </h2>
                <p className="text-slate-400 mb-4">
                    Conformément à l'article L.221-28 du Code de la
                    consommation, les services fournis par EatsUp étant des
                    services numériques exécutés immédiatement après validation
                    de l'abonnement, aucun droit de rétractation ne peut être
                    exercé après activation du service.
                </p>
                <p className="text-slate-400">
                    Cependant, EatsUp accorde une période de rétractation
                    volontaire de 30 jours à compter de la souscription,
                    permettant au client de demander un remboursement intégral
                    en cas d'insatisfaction.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    7. Résiliation et annulation
                </h2>
                <p className="text-slate-400 mb-4">
                    L'utilisateur peut résilier son abonnement à tout moment via
                    son espace client. La résiliation prend effet à la fin de la
                    période d'abonnement en cours. Aucun remboursement n'est
                    effectué pour la période entamée.
                </p>
                <p className="text-slate-400">
                    EatsUp se réserve le droit de suspendre ou résilier un
                    compte en cas de non-respect des CGV, de fraude ou de
                    tentative d'accès non autorisé aux services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    8. Responsabilité
                </h2>
                <p className="text-slate-400 mb-4">
                    EatsUp s'engage à fournir ses services dans le respect des
                    standards de qualité et de sécurité. Toutefois, l'éditeur ne
                    saurait être tenu responsable en cas de :
                </p>
                <ul className="list-disc ml-6 text-slate-400 mb-4">
                    <li>
                        Dysfonctionnements techniques indépendants de sa volonté
                    </li>
                    <li>Mauvaise utilisation des services par l'utilisateur</li>
                    <li>Perte de données due à des causes externes</li>
                </ul>
                <p className="text-slate-400">
                    En aucun cas EatsUp ne pourra être tenu responsable des
                    dommages indirects tels que pertes de clientèle, perte de
                    chiffre d'affaires ou atteinte à la réputation.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    9. Propriété intellectuelle
                </h2>
                <p className="text-slate-400">
                    Tous les éléments présents sur EatsUp.fr (textes, logos,
                    images, code source) sont protégés par le droit de la
                    propriété intellectuelle et restent la propriété exclusive
                    de EatsUp. Toute reproduction ou exploitation sans
                    autorisation est strictement interdite.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    10. Données personnelles
                </h2>
                <p className="text-slate-400">
                    Les données personnelles collectées sont traitées
                    conformément à la Politique de Confidentialité.
                    L'utilisateur dispose d'un droit d'accès, de rectification
                    et de suppression de ses données conformément au RGPD.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    11. Modification des CGV
                </h2>
                <p className="text-slate-400">
                    EatsUp se réserve le droit de modifier les présentes CGV à
                    tout moment. Les utilisateurs seront informés par email des
                    mises à jour, qui entreront en vigueur immédiatement après
                    publication.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    12. Droit applicable et juridiction compétente
                </h2>
                <p className="text-slate-400 mb-4">
                    Les présentes CGV sont régies par le droit français. Tout
                    litige sera soumis aux tribunaux compétents de Le Havre.
                </p>
                <p className="text-slate-400">
                    Pour toute question ou réclamation, vous pouvez contacter
                    EatsUp à l'adresse suivante : contact@eatsup.fr
                </p>
            </section>
        </div>
    )
}
