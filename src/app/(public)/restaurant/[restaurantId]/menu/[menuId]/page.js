import Footer from './components/Footer'
import MenuDataFetcher from './components/MenuDataFetcher'
import { LanguageProvider } from './context/LanguageContext'

// export async function generateMetadata({ params }) {
//     const { data: website } = await getPublicWebsiteByRestaurantId(
//         params.restaurantId,
//     )

//     return {
//         title: `${website?.title?.fr} - Menu`,
//         description: `Découvrez le menu de ${website?.title?.fr} à ${website?.restaurant?.city}`,
//         openGraph: {
//             images: [
//                 website?.presentation_image?.url || '/images/restaurant.jpg',
//             ],
//         },
//         icons: {
//             icon: website?.restaurant?.logo?.url || '/favicon.ico',
//             apple: website?.restaurant?.logo?.url || '/favicon.ico',
//         },
//     }
// }

const MenuPage = async ({ params }) => {
    const { restaurantId, menuId } = params

    return (
        <LanguageProvider>
            <div className="relative bg-slate-100 min-h-[100dvh] md:bg-white  md:mx-auto">
                <div className="text-xs h-full pb-5">
                    <MenuDataFetcher
                        restaurantId={restaurantId}
                        menuId={menuId}
                    />
                </div>
                <Footer />
            </div>
        </LanguageProvider>
    )
}

export default MenuPage
