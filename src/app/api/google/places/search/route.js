import { NextResponse } from 'next/server'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places:searchText`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
                    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.id,places.googleMapsUri'
                },
                body: JSON.stringify({
                    textQuery: query,
                    languageCode: 'fr'
                })
            }
        )

        const data = await response.json()
        
        // Ajout de logs pour déboguer
        console.log('Response status:', response.status)
        console.log('Raw API response:', data)

        if (!data.places) {
            console.error('No places data in response:', data)
            return NextResponse.json({ error: 'Invalid API response', details: data }, { status: 500 })
        }

        const formattedResults = data.places.map(place => ({
            place_id: place.id,
            name: place.displayName?.text || '',
            formatted_address: place.formattedAddress || '',
            url: place.googleMapsUri || ''
        }))

        return NextResponse.json(formattedResults)
    } catch (error) {
        console.error('Erreur détaillée lors de la recherche Google Places:', error)
        return NextResponse.json({ 
            error: 'Failed to fetch places', 
            message: error.message,
            details: error.response?.data 
        }, { status: 500 })
    }
} 