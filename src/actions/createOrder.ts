'use server'

import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

interface CreateOrderProps {
  productId: string;
}

export async function CreateOrder({ productId }: CreateOrderProps) {
  try {
    // Ürün bilgilerini al
    const product = await prisma.product.findUnique({
      where: {
        product_id: productId
      },
      include: {
        provider: true
      }
    });

    if (!product) {
      return { error: 'Ürün bulunamadı' };
    }

    // Benzersiz sipariş ID'si oluştur
    const orderId = `ORD-${uuidv4().substring(0, 8)}`;

    // Sipariş oluştur
    const order = await prisma.order.create({
      data: {
        orderid: orderId,
        orderstate: 'PENDING',
        productid: product.product_id,
        title: product.title,
        cost: product.price.toString(),
        provider: product.provider?.name || '',
        providerid: product.provider_id || 0,
        providername: product.provider?.name || '',
        providerlogo: product.provider?.logo || '',
        currencycode: product.currency_code || 'USD',
        createdtime: new Date().toISOString(),
        updatedtime: new Date().toISOString(),
        accesspointname: product.access_point_name || '',
        activationinstructions: product.instructions || ''
      }
    });

    return {
      success: true,
      orderId: orderId,
      order: order
    };
  } catch (error) {
    console.error('Sipariş oluşturulurken hata oluştu:', error);
    return { 
      success: false, 
      error: 'Sipariş oluşturulamadı'
    };
  }
}
