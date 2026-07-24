import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.singhjibikerental.com';

  const bikes = await prisma.bike.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  });

  const bikeUrls = bikes.map((bike) => ({
    url: `${baseUrl}/bikes/${bike.slug}`,
    lastModified: bike.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/bikes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...bikeUrls,
  ];
}
