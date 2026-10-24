import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import PersonalityModel from '@/models/Personality';
import ArticleModel from '@/models/Article';
import EventModel from '@/models/Event';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sindhconnect.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let personalityUrls: MetadataRoute.Sitemap = [];
  let articleUrls: MetadataRoute.Sitemap = [];

  try {
    await dbConnect();

    // Query only published and approved records
    const personalities = await PersonalityModel.find({ status: 'approved' })
      .select('slug updatedAt')
      .lean();

    const articles = await ArticleModel.find({})
      .select('slug updatedAt')
      .lean();

    personalityUrls = personalities.map((p: any) => ({
      url: `${SITE_URL}/personalities/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    articleUrls = articles.map((a: any) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: a.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error);
  }

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/personalities`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...personalityUrls,
    ...articleUrls,
  ];
}
