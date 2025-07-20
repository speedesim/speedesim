'use server'

import prisma from '@/lib/prisma';

export async function cancelOrder(orderId: string) {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        orderid: orderId
      },
      data: {
        orderstate: 'CANCELLED'
      }
    });
    
    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error('Sipariş iptal edilirken hata oluştu:', error);
    return { success: false, error: 'Sipariş iptal edilemedi' };
  }
}
