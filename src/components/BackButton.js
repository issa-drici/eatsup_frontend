'use client'

import Button from './Button'

const BackButton = () => {
    return (
        <Button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium transition-transform hover:scale-105 hover:shadow-lg"
        >
            <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
            Retour
        </Button>
    )
}

export default BackButton
