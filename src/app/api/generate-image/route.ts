import { NextResponse } from 'next/server'
import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { prompt, n = 1, size = '512x512' } = await req.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    console.log('Generating images with params:', { prompt, n, size })

    try {
      const response = await openai.images.generate({
        model: "dall-e-2", 
        prompt,
        n: Number(n),
        size: size as '256x256' | '512x512' | '1024x1024',
      })

      console.log('OpenAI response:', response)

      if (!response.data || response.data.length === 0) {
        throw new Error('No images generated')
      }

      return NextResponse.json({
        images: response.data.map(image => image.url)
      })
    } catch (openaiError: any) {
      console.error('OpenAI API error:', openaiError)
      
      if (openaiError.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        )
      }

      if (openaiError.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        )
      }

      throw openaiError
    }
  } catch (error: any) {
    console.error('Error generating images:', error)
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to generate images',
        details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
      },
      { status: 500 }
    )
  }
}
