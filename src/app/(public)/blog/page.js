import BlogCard from '@/components/BlogCard'
import CTABanner from '@/app/(public)/blog/components/CTABanner'
import { outfitFont } from '@/ui/fonts'

export default function Blog() {
    return (
        <>
            <div className="w-full flex flex-col items-center bg-slate-900 p-8 rounded-[28px] gap-10 mb-10 md:px-28 md:py-16 md:max-w-screen-xl md:mx-auto">
                <h1
                    className={`${outfitFont.className} text-slate-50 text-3xl font-bold text-center md:text-5xl md:text-left mb-12`}>
                    Blog pour les restaurateurs connectés
                </h1>
                <div className="flex flex-col gap-10">
                    <BlogCard
                        category="Technologie"
                        image="/images/blog/digitaliser.png"
                        title="Menus QR Code : Pourquoi et comment digitaliser votre carte en 2025 ?"
                        description="Avec l’évolution des habitudes de consommation et la montée en puissance du digital, les restaurants doivent s’adapter pour offrir une expérience client fluide, moderne et interactive. L’utilisation des menus QR Code s’impose désormais comme une solution incontournable."
                        date="2025-02-03"
                        slug="technologie/menus-qr-code-digitalisation-restaurant"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <BlogCard
                            category="Expérience client"
                            image="/images/blog/reduire-temps-attente.png"
                            title="Comment réduire le temps d’attente et fluidifier la prise de commande en restaurant ?"
                            date="2025-01-27"
                            slug="experience-client/reduire-temps-attente-commande-restaurant"
                            vertical
                        />
                        <BlogCard
                            category="Expérience client"
                            image="/images/blog/experience-client.png"
                            title="Menu digital restaurant : Comment booster vos ventes et améliorer l’expérience client ?"
                            date="2025-01-20"
                            slug="experience-client/menu-digital-restaurant-ventes-experience-client"
                            vertical
                        />
                        <BlogCard
                            category="Innovation"
                            image="/images/blog/innovation-digitalisation.png"
                            title="Innovation et digitalisation en restauration : Comment réussir sa transformation ?"
                            date="2025-01-13"
                            slug="innovation/innovation-digitalisation-restauration"
                            vertical
                        />
                        <BlogCard
                            category="Marketing"
                            image="/images/blog/strategie-marketing.png"
                            title="Comment augmenter les ventes de votre restaurant en 2025 ? Stratégies digitales et astuces marketing"
                            date="2025-01-06"
                            slug="marketing/augmenter-ventes-restaurant-strategies-digitales"
                            vertical
                        />
                    </div>
                </div>
            </div>
            <CTABanner />
        </>
    )
}
