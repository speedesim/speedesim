'use server'

import prisma from '@/lib/prisma';

export async function updateOrderState(orderId: string, newState: string) {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        orderid: orderId
      },
      data: {
        orderstate: newState,
        updatedtime: new Date().toISOString()
      }
    });
    
    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error('Sipariş durumu güncellenirken hata oluştu:', error);
    return { success: false, error: 'Sipariş durumu güncellenemedi' };
  }
}
