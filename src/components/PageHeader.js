import { Button } from '@/shadcn-components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Breadcrumb from './Breadcrumb'

const PageHeader = ({
    title,
    description,
    onBack,
    backUrl,
    showBack = true,
    breadcrumbItems = [],
    children
}) => {
    const router = useRouter()

    const handleBack = () => {
        if (onBack) {
            onBack()
        } else if (backUrl) {
            router.push(backUrl)
        } else {
            router.back()
        }
    }

    return (
        <div className="space-y-4">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* En-tête principal */}
            <div className="flex items-center gap-4">
                {showBack && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBack}
                        className="gap-2"
                    >
                        <ArrowLeft size={16} />
                        Retour
                    </Button>
                )}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {description && (
                        <p className="text-gray-600 mt-1">{description}</p>
                    )}
                </div>
                {children && (
                    <div className="flex items-center gap-2">
                        {children}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PageHeader
