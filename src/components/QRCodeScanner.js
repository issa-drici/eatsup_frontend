'use client'
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */


import { Html5QrcodeScanner } from 'html5-qrcode'
import { useEffect, useState } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export default function QRCodeScanner({ onScanSuccess }) {
    const { canUseStorage } = useCookieConsent()
    
    const [cameraAllowed, setCameraAllowed] = useState(() => {
        if (canUseStorage()) {
            return JSON.parse(localStorage.getItem('cameraPermission')) || null
        }
        return null
    })

    useEffect(() => {
        const initializeScanner = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true })
                setCameraAllowed(true)
                if (canUseStorage()) {
                    localStorage.setItem('cameraPermission', 'true')
                }
            } catch (error) {
                setCameraAllowed(false)
                if (canUseStorage()) {
                    localStorage.setItem('cameraPermission', 'false')
                }
            }
        }

        if (cameraAllowed === null) {
            initializeScanner()
        }
    }, [canUseStorage])

    useEffect(() => {
        if (!cameraAllowed) return

        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                showTorchButtonIfSupported: true,
                rememberLastUsedCamera: true,
            },
            /* start scanner automatically */ true
        )

        const onSuccess = decodedText => {
            const uuid = decodedText.split('/qr-code/')[1]
            onScanSuccess?.(uuid)
        }

        const onError = errorMessage => {
            console.warn('Erreur :', errorMessage)
        }

        scanner.render(onSuccess, onError)

        return () => scanner.clear()
    }, [cameraAllowed, onScanSuccess])

    if (cameraAllowed === false) {
        return (
            <p>
                Veuillez autoriser l'accès à la caméra pour scanner un QR code.
            </p>
        )
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Scanner un QR Code</h1>
            <div id="reader" style={{ width: '300px', margin: '0 auto' }}></div>
        </div>
    )
}
