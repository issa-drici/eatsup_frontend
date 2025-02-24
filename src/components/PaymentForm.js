import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/shadcn-components/ui/button'
import { useState } from 'react'

const PaymentForm = ({ onSubmit }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)
        setError(null)

        try {
            const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            })

            if (stripeError) {
                setError(stripeError.message)
                return
            }

            await onSubmit(paymentMethod)
        } catch (err) {
            setError("Une erreur est survenue lors du traitement du paiement")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="p-4 border rounded-lg bg-white">
                <h3 className="text-lg font-medium mb-4">Informations de paiement</h3>

                <div className="mb-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="w-full"
                >
                    {isProcessing ? 'Traitement en cours...' : 'Souscrire maintenant'}
                </Button>
            </div>
        </form>
    )
}

export default PaymentForm
