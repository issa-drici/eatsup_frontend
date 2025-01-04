'use client'

import { useAuth } from '@/hooks/auth'

const Header = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 76%), url(/images/preview_website.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '130px',
            }}
            className="text-white p-8 flex justify-between items-end">
            <div>
                <p className="text-xl font-semibold">✌️</p>
                <p className="text-xl font-semibold">
                    Hello {user?.restaurant?.name}
                </p>
                <p className="text-sm">Bienvenue sur Eatsup</p>
            </div>
        </div>
    )
}

export default Header
