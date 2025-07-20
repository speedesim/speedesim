'use server'

import prisma from '@/lib/prisma';

interface DynamicProductsOptions {
  country?: string;
  region?: string[];
  productId?: string;
  provider?: string;
  category?: string;
}

export async function getDynamicProducts(options: DynamicProductsOptions = {}) {
  try {
    const { country, region, productId, provider, category } = options;
    
    // Filtreleri oluştur
    const filters: any = {};
    
    if (productId) {
      return await prisma.product.findMany({
        where: {
          product_id: productId
        },
        include: {
          provider: true
        }
      });
    }
    
    if (country) {
      filters.countries = {
        contains: country
      };
    }
    
    if (region && region.length > 0) {
      // Bölge filtresini ekle
      const regionFilters = region.map(r => ({
        regions: {
          contains: r
        }
      }));
      
      filters.OR = regionFilters;
    }
    
    if (provider) {
      // Provider ID'yi bul
      const providerRecord = await prisma.provider.findFirst({
        where: {
          name: {
            contains: provider
          }
        }
      });
      
      if (providerRecord) {
        filters.provider_id = providerRecord.id;
      }
    }
    
    if (category) {
      filters.category = category;
    }
    
    // Filtrelere göre ürünleri getir
    const products = await prisma.product.findMany({
      where: filters,
      include: {
        provider: true
      }
    });
    
    return products;
  } catch (error) {
    console.error('Ürünler getirilirken hata oluştu:', error);
    return [];
  }
}
