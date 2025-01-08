import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shadcn-components/ui/dialog"
import QRCodeScanner from './QRCodeScanner'

export function AssociateQRDialog({ open, onOpenChange, onScanSuccess }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Scanner un QR Code</DialogTitle>
                </DialogHeader>
                <QRCodeScanner onScanSuccess={onScanSuccess} />
            </DialogContent>
        </Dialog>
    )
} 