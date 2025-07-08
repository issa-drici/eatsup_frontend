'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/shadcn-components/ui/button'
import { ArrowLeft, Save, X } from 'lucide-react'

const FormNavigation = ({
    title,
    subtitle,
    onSave,
    onCancel,
    saveLabel = "Enregistrer",
    cancelLabel = "Annuler",
    showBackButton = true,
    backUrl,
    isLoading = false,
    isDirty = false
}) => {
    const router = useRouter()

    const handleBack = () => {
        if (backUrl) {
            router.push(backUrl)
        } else {
            router.back()
        }
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        } else {
            handleBack()
        }
    }

    return (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
                {showBackButton && (
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
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="gap-2"
                >
                    <X size={16} />
                    {cancelLabel}
                </Button>
                <Button
                    onClick={onSave}
                    disabled={isLoading || !isDirty}
                    className="gap-2"
                >
                    <Save size={16} />
                    {isLoading ? "Enregistrement..." : saveLabel}
                </Button>
            </div>
        </div>
    )
}

export default FormNavigation
