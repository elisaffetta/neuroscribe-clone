import { NextResponse } from 'next/server'
import { templates } from '@/data/templates'

export async function GET() {
  try {
    return NextResponse.json(templates)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}
