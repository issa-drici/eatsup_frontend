'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div>
            {user ? (
                <Link
                    href={user.role === 'admin' ? '/superadmin/dashboard' : '/admin/dashboard'}
                    className="ml-4 text-sm text-gray-700 underline"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-sm text-gray-700 hover:text-gray-500 underline"
                    >
                        Connexion
                    </Link>

                    <Link
                        href="/register"
                        className="ml-4 text-sm bg-slate-900 hover:bg-slate-700 py-2 px-4 rounded-md text-white font-medium"
                    >
                        Inscription
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks
