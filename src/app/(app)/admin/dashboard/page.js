import CardStats from '@/components/CardStats'
import { ChefHat } from 'lucide-react'
import { ScanQrCode } from 'lucide-react'
import CardButton from '@/components/CardButton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { QrCode } from 'lucide-react'
import { Globe } from 'lucide-react'
import { Store } from 'lucide-react'
import { ChartColumnBig } from 'lucide-react'
import { Settings } from 'lucide-react'

// import { useAuth } from '@/hooks/auth'

const Dashboard = () => {
    // const { user } = useAuth({ middleware: 'auth' })

    return (
        <>
            <BreadcrumbCustom
                items={[
                    {
                        title: 'Dashboard',
                        href: '/admin/dashboard',
                    },
                ]}
            />

            <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                    <CardStats
                        title="Nombre de scans"
                        value="428"
                        icon={
                            <ScanQrCode size={16} className="text-slate-400" />
                        }
                        subtitle="30 derniers jours"
                    />
                    <CardStats
                        title="Nombre de scans"
                        value="12"
                        icon={
                            <ScanQrCode size={16} className="text-slate-400" />
                        }
                        subtitle="Aujourd'hui"
                    />
                </div>
                {/* <CardStats
                                    title="QR le + scanné"
                                    value="Table 12"
                                    icon={
                                        <ScanQrCode
                                            size={16}
                                            className="text-slate-400"
                                        />
                                    }
                                    subtitle="7 derniers jours"
                                /> */}
                <div className="flex gap-4 w-full">
                    <CardButton
                        widthFull
                        title="Menu"
                        subtitle="Gérer mon menu"
                        url="/admin/menus"
                        icon={<ChefHat size={16} className="text-slate-900" />}
                    />
                    <CardButton
                        widthFull
                        title="QRCode"
                        subtitle="Gérer mes QRCode"
                        url="/admin/qrcode"
                        icon={<QrCode size={16} className="text-slate-900" />}
                    />
                </div>
                <div className="flex gap-4 w-full">
                    <CardButton
                        widthFull
                        title="Restaurant"
                        subtitle="Gérer mon restaurant"
                        url="/admin/restaurant"
                        icon={<Store size={16} className="text-slate-900" />}
                    />
                    <CardButton
                        widthFull
                        title="Paramètres"
                        subtitle="Modifier les paramètres"
                        url="/admin/parametres"
                        icon={<Settings size={16} className="text-slate-900" />}
                    />
                </div>
                <div className="flex gap-4 w-full">
                    <CardButton
                        widthFull
                        disabled
                        title="Site internet"
                        subtitle="Gérer mon site internet"
                        url="/admin/site-internet"
                        icon={<Globe size={16} className="text-slate-600" />}
                    />
                    <CardButton
                        widthFull
                        disabled
                        title="Statistiques"
                        subtitle="Voir les statistiques"
                        url="/admin/statistiques"
                        icon={
                            <ChartColumnBig
                                size={16}
                                className="text-slate-600"
                            />
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default Dashboard
