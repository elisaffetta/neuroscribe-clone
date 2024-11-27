import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

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

      return NextResponse.json(
        { error: openaiError.message || 'Failed to generate images' },
        { status: openaiError.status || 500 }
      )
    }
  } catch (error: any) {
    console.error('Request error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
