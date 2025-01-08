import CardStats from '@/components/CardStats'
import { ScanQrCode } from 'lucide-react'
import CardButton from '@/components/CardButton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { QrCode } from 'lucide-react'
import { Store } from 'lucide-react'

// import { useAuth } from '@/hooks/auth'

const SuperAdminDashboard = () => {
    // const { user } = useAuth({ middleware: 'auth' })

    return (
        <>
            <div className="mb-4">
                <BreadcrumbCustom
                    items={[
                        {
                            title: 'Dashboard',
                            href: '/admin/dashboard',
                        },
                    ]}
                />
            </div>

            <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                    <CardStats
                        title="Inscrits"
                        value="428"
                        icon={<Store size={16} className="text-slate-400" />}
                        subtitle="Restaurants"
                    />
                    <CardStats
                        title="Trialing"
                        value="12"
                        icon={<Store size={16} className="text-slate-400" />}
                        subtitle="Restaurants"
                    />
                </div>
                <div className="flex gap-4">
                    <CardStats
                        title="Attente"
                        value="428"
                        icon={
                            <ScanQrCode size={16} className="text-slate-400" />
                        }
                        subtitle="Pack QR"
                    />
                    <CardStats
                        title="Liés"
                        value="12"
                        icon={
                            <ScanQrCode size={16} className="text-slate-400" />
                        }
                        subtitle="Pack QR"
                    />
                </div>

                <div className="flex gap-4 w-full">
                    <CardButton
                        widthFull
                        title="QRCode"
                        subtitle="Configurer les QRCodes"
                        url="/superadmin/configurate-qr-code"
                        icon={<QrCode size={16} className="text-slate-900" />}
                    />
                    <CardButton
                        widthFull
                        title="Restaurants"
                        subtitle="Accéder aux restaurants"
                        url="/superadmin/restaurants"
                        icon={<Store size={16} className="text-slate-900" />}
                    />
                </div>
            </div>
        </>
    )
}

export default SuperAdminDashboard
