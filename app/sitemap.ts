import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://expert8academy.com',
      lastModified: new Date(),
    },
    {
      url: 'https://expert8academy.com/blog',
      lastModified: new Date(),
    },
    {
      url: 'https://expert8academy.com/about',
      lastModified: new Date(),
    },
    {
      url: 'https://expert8academy.com/ebook',
      lastModified: new Date(),
    },
  ]
}