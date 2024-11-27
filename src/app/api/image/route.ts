import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: Request) {
  console.log('[IMAGE API] Starting request processing')
  try {
    const { prompt } = await request.json()
    console.log('[IMAGE API] Received prompt:', prompt)

    if (!process.env.OPENAI_API_KEY) {
      console.error('[IMAGE API] OpenAI API key is missing')
      return NextResponse.json(
        { 
          error: 'OpenAI API key is not configured',
          details: 'Please set the OPENAI_API_KEY environment variable'
        },
        { status: 500 }
      )
    }

    console.log('[IMAGE API] Initializing OpenAI client')
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    console.log('[IMAGE API] Sending request to OpenAI')
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural",
    })

    console.log('[IMAGE API] Received response from OpenAI')

    return NextResponse.json({
      url: response.data[0].url
    })
  } catch (error: any) {
    console.error('[IMAGE API] Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    })
    return NextResponse.json(
      { 
        error: 'Failed to generate image',
        details: error.message
      },
      { status: 500 }
    )
  }
}
