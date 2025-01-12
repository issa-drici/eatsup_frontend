import LoginLinks from '@/app/LoginLinks'
import AnimatedBeamFicheRestaurant from '@/components/AnimatedBeamFicheRestaurant'
import ApplicationLogo from '@/components/ApplicationLogo'
import Image from 'next/image'

export const metadata = {
    title: 'Eatsup - votre menu qui propulse vos ventes',
}

const Home = () => {
    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-white sm:pt-0">
                <div className="max-w-6xl mx-auto px-6 w-full lg:px-8">
                    <div className="flex justify-between items-center pt-4 ">
                        <ApplicationLogo className="h-3 w-auto fill-current text-gray-500" />
                        <LoginLinks />
                    </div>

                    <div className="flex flex-col mt-10">
                        <div className="text-5xl font-bold">
                            Augmentez vos ventes
                        </div>
                        <div className="text-lg">
                            Gagnez du temps en salle, offrez un accès continu au
                            menu pour stimuler les ventes, et partagez
                            l'excellence de votre établissement.
                        </div>
                        <Image
                            src="/images/eatsy/hello.png"
                            alt="eatsy-hello"
                            className="w-60 h-60 mx-auto mt-10"
                            width={351}
                            height={325}
                        />
                        <AnimatedBeamFicheRestaurant />
                        <div className="p-10 text-center">
                            Footer avec les liens vers les pages de contact et
                            les mentions légales
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
