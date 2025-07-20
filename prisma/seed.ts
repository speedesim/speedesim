import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Dashboard Config
  await prisma.dashboardConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      reward: 5.00,
      cashbackpercent: 2.50,
      discountpercent: 5.00
    },
  });

  // Site Title
  await prisma.siteTitle.create({
    data: {
      title: 'SpeedESim - Mobil eSIM Çözümleri'
    },
  });

  // Admin kullanıcısı (şifre: admin123)
  await prisma.mobiUser.create({
    data: {
      name: 'Admin User',
      email: 'admin@speedesim.com',
      password: '$2a$10$3w5bzJiRRrqj.JKdL/F0ke2ZlG1uKYO6nC7K8QVgkiivbLkV.gxl6',
      emailverify: true,
      rewardbalance: 0.00,
      referencecode: 'ADMN',
      firstpurchase: false,
      membership: 'admin'
    },
  });

  // Sağlayıcılar
  const mobimatter = await prisma.provider.create({
    data: {
      name: 'Mobimatter',
      logo: 'mobimatter-logo.png',
      api_endpoint: 'https://api.mobimatter.com/v2'
    },
  });
  
  const esimgo = await prisma.provider.create({
    data: {
      name: 'eSIM Go',
      logo: 'esimgo-logo.png',
      api_endpoint: 'https://api.esimgo.com/v1'
    },
  });
  
  const mayamobile = await prisma.provider.create({
    data: {
      name: 'Maya Mobile',
      logo: 'maya-logo.png',
      api_endpoint: 'https://api.mayamobile.com/api'
    },
  });

  // Ülkeler
  const countries = [
    { name: 'Türkiye', code: 'TR', region: 'Europe', is_popular: true },
    { name: 'Amerika Birleşik Devletleri', code: 'US', region: 'North America', is_popular: true },
    { name: 'Birleşik Krallık', code: 'GB', region: 'Europe', is_popular: true },
    { name: 'Almanya', code: 'DE', region: 'Europe', is_popular: true },
    { name: 'Fransa', code: 'FR', region: 'Europe', is_popular: true },
    { name: 'İtalya', code: 'IT', region: 'Europe', is_popular: true },
    { name: 'İspanya', code: 'ES', region: 'Europe', is_popular: true },
    { name: 'Japonya', code: 'JP', region: 'Asia', is_popular: true },
    { name: 'Çin', code: 'CN', region: 'Asia', is_popular: false },
    { name: 'Avustralya', code: 'AU', region: 'Oceania', is_popular: true }
  ];

  for (const country of countries) {
    await prisma.country.create({ data: country });
  }

  // Ürün Kategorileri
  const categories = [
    { name: 'eSIM', slug: 'esim' },
    { name: 'Global eSIM', slug: 'global-esim' },
    { name: 'Bölgesel eSIM', slug: 'regional-esim' },
    { name: 'Ülke eSIM', slug: 'country-esim' }
  ];

  for (const category of categories) {
    await prisma.productCategory.create({ data: category });
  }

  // Ürünler
  await prisma.product.create({
    data: {
      title: 'Türkiye eSIM 5GB',
      description: 'Türkiye seyahatleriniz için 5GB yüksek hızlı veri',
      product_id: 'TR-5GB-30D',
      provider_id: mobimatter.id,
      data_amount: '5GB',
      validity_days: 30,
      price: 19.99,
      discount_price: 15.99,
      countries: '["TR"]',
      type: 'country',
      featured: true,
      instructions: 'eSIM QR kodunu telefonunuza kurmak için, Ayarlar > Mobil Veri > eSIM Ekle yolunu izleyin ve size gönderilen QR kodu taratın.',
      access_point_name: 'internet'
    }
  });
  
  await prisma.product.create({
    data: {
      title: 'Avrupa eSIM 10GB',
      description: 'Tüm Avrupa ülkeleri için geçerli 10GB veri paketi',
      product_id: 'EU-10GB-15D',
      provider_id: esimgo.id,
      data_amount: '10GB',
      validity_days: 15,
      price: 29.99,
      discount_price: null,
      countries: '["DE", "FR", "IT", "ES", "GB"]',
      type: 'region',
      featured: true,
      instructions: 'QR kodu taradıktan sonra, kurulumu tamamlamak için telefonunuzun talimatlarını izleyin. Gerekirse şu APN bilgilerini manuel olarak girebilirsiniz: Adı: Internet, APN: internet',
      access_point_name: 'internet'
    }
  });
  
  await prisma.product.create({
    data: {
      title: 'Global eSIM 20GB',
      description: 'Dünya çapında 100+ ülkede geçerli 20GB veri',
      product_id: 'GLOBAL-20GB-30D',
      provider_id: mayamobile.id,
      data_amount: '20GB',
      validity_days: 30,
      price: 89.99,
      discount_price: 69.99,
      countries: null,
      type: 'global',
      featured: true,
      instructions: 'eSIM kurulumu için QR kodu taratın ve telefonunuzda görünen adımları takip edin. Sorun yaşarsanız destek ekibimizle iletişime geçin.',
      access_point_name: 'web.mayamobile.com'
    }
  });

  console.log('Veritabanı seeding işlemi tamamlandı');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
