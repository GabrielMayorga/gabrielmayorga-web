import type { MetadataRoute } from 'next'
import { visibleProjects } from '@/content/projects'
import { site } from '@/content/site'

/* Sin lastModified: con cacheComponents, new Date() rompería el prerender. */
export default function sitemap(): MetadataRoute.Sitemap {
  const demos = visibleProjects.flatMap((project) =>
    project.demo ? [{ url: `${site.url}${project.demo}`, priority: 0.6 }] : [],
  )
  return [{ url: site.url, priority: 1 }, ...demos]
}
