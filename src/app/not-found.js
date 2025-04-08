import BackButton from '@/components/BackButton'

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg w-full text-center">
                <div className="animate-bounce mb-8">
                    <span className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        404
                    </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    Oups ! Page introuvable
                </h1>

                <p className="text-gray-600 mb-8">
                    Désolé, cette page n'existe pas
                </p>

                <BackButton />
            </div>
        </div>
    )
}

export default NotFoundPage
