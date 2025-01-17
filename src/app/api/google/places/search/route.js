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
        

        if (!data.places) {
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
        return NextResponse.json({ 
            error: 'Failed to fetch places', 
            message: error.message,
            details: error.response?.data 
        }, { status: 500 })
    }
} 