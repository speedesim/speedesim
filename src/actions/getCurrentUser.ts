'use server'

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export default async function getCurrentUser() {
  try {
    const session = cookies().get('user_session')?.value;
    
    if (!session) {
      return null;
    }
    
    const currentUser = await prisma.mobiUser.findFirst({
      where: {
        verifytoken: session
      }
    });
    
    if (!currentUser) {
      return null;
    }
    
    // Hassas bilgileri kaldır
    const { password, ...userWithoutPassword } = currentUser;
    
    return userWithoutPassword;
  } catch (error) {
    return null;
  }
}
