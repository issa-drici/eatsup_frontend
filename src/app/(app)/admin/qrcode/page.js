'use client'

import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import Image from 'next/image'

const Qrcode = () => {
    return (
        <>
            <div className="mb-4">
                <BreadcrumbCustom
                    items={[
                        {
                            title: 'Dashboard',
                            href: '/admin/dashboard',
                        },
                        {
                            title: 'QRCode',
                            href: `/admin/qrcode`,
                        },
                    ]}
                />
            </div>
            <div className="w-full flex flex-col items-center justify-center py-10 px-5 bg-slate-100 rounded-md">
                <Image
                    src="/images/eatsy/hello.png"
                    alt="eatsy-hello"
                    className="w-24 h-240"
                    width={351}
                    height={325}
                />
                <p className="text-slate-900 text-lg font-semibold text-center mt-4">
                    Votre commande de QRCode est en cours de préparation
                </p>
                <p className="text-slate-900 text-sm text-center">
                    Celle-ci sera bientôt livrée à votre restaurant
                </p>
            </div>
        </>
    )
}

export default Qrcode
