import { NextResponse } from 'next/server'
import { templates } from '@/data/templates'
import OpenAI from 'openai'

console.log('[GENERATE API] Checking environment on startup')
if (!process.env.OPENAI_API_KEY) {
  console.error('[GENERATE API] OPENAI_API_KEY is not set in environment variables')
}

console.log('[GENERATE API] Initializing OpenAI client')
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  console.log('[GENERATE API] Starting request processing')
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('[GENERATE API] OpenAI API key is missing')
      return NextResponse.json(
        { 
          error: 'OpenAI API key is not configured',
          details: 'Please set the OPENAI_API_KEY environment variable'
        },
        { status: 500 }
      )
    }

    const { template: templateId, formData } = await request.json()
    console.log('[GENERATE API] Request data:', { templateId, formData })

    const template = templates.find(t => t.id === templateId)

    if (!template) {
      console.error(`[GENERATE API] Template not found: ${templateId}`)
      return NextResponse.json(
        { 
          error: 'Template not found',
          details: `Template with id ${templateId} does not exist`
        },
        { status: 404 }
      )
    }

    let systemPrompt = template.systemPrompt
    Object.entries(formData).forEach(([key, value]) => {
      systemPrompt = systemPrompt.replace(`{${key}}`, value as string)
    })

    console.log('[GENERATE API] Prepared system prompt:', systemPrompt)
    console.log('[GENERATE API] Sending request to OpenAI')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: template.userPrompt || 'Please generate the content.' }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    console.log('[GENERATE API] Received response from OpenAI:', completion.choices[0].message)

    return NextResponse.json({
      content: completion.choices[0].message.content
    })
  } catch (error: any) {
    console.error('[GENERATE API] Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    })
    return NextResponse.json(
      { 
        error: 'Failed to generate content',
        details: error.message
      },
      { status: 500 }
    )
  }
}
