'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/shadcn-components/ui/button'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            {user ? (
                <>
                    <Link
                        href={
                            user.role === 'admin'
                                ? '/superadmin/dashboard'
                                : '/admin/dashboard'
                        }
                        className="hidden md:block">
                        <Button>Mon espace</Button>
                    </Link>
                    <Link
                        href={
                            user.role === 'admin'
                                ? '/superadmin/dashboard'
                                : '/admin/dashboard'
                        }
                        className="md:hidden">
                        <Button size='sm'>Mon espace</Button>
                    </Link>
                </>
            ) : (
                <>
                    <div className="flex flex-row md:hidden">
                        <Link href="/login">
                            <Button variant="link" size='sm'>Se connecter</Button>
                        </Link>

                        <Link href="/register">
                            <Button size='sm'>Essai gratuit ✨</Button>
                        </Link>
                    </div>
                    <div className="md:flex flex-row hidden">
                        <Link href="/login">
                            <Button variant="link">Se connecter</Button>
                        </Link>

                        <Link href="/register">
                            <Button>Essai gratuit ✨</Button>
                        </Link>
                    </div>
                </>
            )}
        </>
    )
}

export default LoginLinks
