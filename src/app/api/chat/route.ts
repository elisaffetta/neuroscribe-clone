import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: Request) {
  console.log('[CHAT API] Starting request processing')
  try {
    const { messages } = await request.json()
    console.log('[CHAT API] Received messages:', messages)

    if (!process.env.OPENAI_API_KEY) {
      console.log('[CHAT API] Error: OpenAI API key not configured')
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    console.log('[CHAT API] Initializing OpenAI client')
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    console.log('[CHAT API] Sending request to OpenAI')
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    })
    console.log('[CHAT API] Received response from OpenAI:', response.choices[0].message)

    return NextResponse.json(response.choices[0].message)
  } catch (error: any) {
    console.error('[CHAT API] Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    })
    return NextResponse.json(
      { error: `Error: ${error.message}` },
      { status: 500 }
    )
  }
}
