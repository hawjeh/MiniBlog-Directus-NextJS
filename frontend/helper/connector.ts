import { Schema, Blog } from '@/helper/schema';
import { createDirectus, staticToken, graphql, readItems, rest } from '@directus/sdk';

const DIRECTUS_URL = `${process.env.DIRECTUS_PROTOCOL}://${process.env.DIRECTUS_HOSTNAME}:${process.env.DIRECTUS_PORT}`
const client = createDirectus<Schema>(DIRECTUS_URL)
  .with(staticToken(process.env.DIRECTUS_TOKEN || ''))
  .with(graphql());

export async function graphBlogs() {
  return await client.query<Schema>(`
      query Blogs {
          blog {
              id
              status
              title
              type
              slug
              image
              external
              published
              start
              end
              content
          }
      }
    `);
}

export async function graphBlog(slug: string) {
  return await client.query<Blog[]>(`
      query Blog {
          blog(filter: { 
            status: { _eq: "published" }
            slug: { _eq: "${slug}" }
            external: { _null: true }
          }) {
              id
              status
              title
              type
              slug
              image
              external
              published
              start
              end
              content
          }
      }
    `);
}

const clientJson = createDirectus<Schema>(DIRECTUS_URL)
  .with(staticToken(process.env.DIRECTUS_TOKEN || ''))
  .with(rest());

export async function restBlogs() {
  return await clientJson.request<Blog>(readItems('blog'));
}

export async function restBlog(slug: string) {
  const result = await clientJson.request<Blog[]>(readItems('blog', {
    limit: 1,
    filter: {
      _and: [
        { "status": { "_eq": "published" } },
        { "external": { "_null": true } },
        { "slug": { "_eq": slug } }
      ]
    }
  }));

  return result.length > 0 ? result[0] : null;
}