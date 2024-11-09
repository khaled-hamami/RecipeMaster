
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
  const { email } = await req.json();

  try {
    await prisma.user.delete({
      where: { email },
    });
    return NextResponse.json({ message: 'User profile deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete user profile', error);
    return NextResponse.json({ error: 'Failed to delete user profile' }, { status: 500 });
  }
}