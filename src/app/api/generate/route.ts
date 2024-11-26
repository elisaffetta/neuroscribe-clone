import { NextResponse } from 'next/server'
import { templates } from '@/data/templates'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { template: templateId, formData } = await request.json()
    const template = templates.find(t => t.id === templateId)

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    // Replace placeholders in the system prompt with actual values
    let systemPrompt = template.systemPrompt
    Object.entries(formData).forEach(([key, value]) => {
      systemPrompt = systemPrompt.replace(`{${key}}`, value as string)
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const result = completion.choices[0]?.message?.content || ''

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
