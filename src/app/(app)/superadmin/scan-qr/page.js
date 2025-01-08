'use client'

import QRCodeScanner from '@/components/QRCodeScanner'
import { useState } from 'react'

export default function ScannerPage() {
    const [scannedCodes, setScannedCodes] = useState([])

    const handleScanSuccess = (code) => {
        setScannedCodes(prev => [...prev, code])
    }

    return (
        <div>
            <QRCodeScanner onScanSuccess={handleScanSuccess} />
            <div>
                <h2>Codes scannés :</h2>
                <ul>
                    {scannedCodes.map((code, index) => (
                        <li key={index}>{code}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
