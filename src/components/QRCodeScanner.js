'use client'
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */


import { Html5QrcodeScanner } from 'html5-qrcode'
import { useEffect, useState } from 'react'

export default function QRCodeScanner({ onScanSuccess }) {
    const [cameraAllowed, setCameraAllowed] = useState(() => {
        return JSON.parse(localStorage.getItem('cameraPermission')) || null
    })

    useEffect(() => {
        // Vérifie d'abord si on a déjà une permission stockée
        const storedPermission = localStorage.getItem('cameraPermission')
        if (storedPermission === 'true') {
            setCameraAllowed(true)
            return
        }

        // Demande la permission uniquement si on n'a pas déjà l'autorisation
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => {
                setCameraAllowed(true)
                localStorage.setItem('cameraPermission', 'true')
            })
            .catch(() => {
                setCameraAllowed(false)
                localStorage.setItem('cameraPermission', 'false')
            })
    }, [])

    useEffect(() => {
        if (!cameraAllowed) return

        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            false,
        )

        const onSuccess = decodedText => {
            const uuid = decodedText.split('/qrcode/')[1]
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
