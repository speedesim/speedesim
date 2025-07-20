'use server'

import prisma from '@/lib/prisma';

export async function getAdminRewards() {
  try {
    const rewardConfig = await prisma.dashboardConfig.findFirst({
      where: {
        id: 1
      }
    });
    
    return rewardConfig;
  } catch (error) {
    console.error('Ödül yapılandırması getirilirken hata oluştu:', error);
    return {
      reward: 5.00,
      cashbackpercent: 2.50,
      discountpercent: 5.00
    };
  }
}
