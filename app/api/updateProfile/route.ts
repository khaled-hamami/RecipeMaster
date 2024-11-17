
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { name },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Failed to update user profile', error);
    return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 });
  }
}