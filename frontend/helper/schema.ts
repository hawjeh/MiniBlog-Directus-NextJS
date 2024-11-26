interface Blog {
  id: string;
  // sort: string;
  // user_created: string;
  // date_created: Date;
  // user_updated: string;
  // date_updated: Date;
  status: string;
  title: string;
  type: string;
  slug: string;
  external: string;
  image: string;
  start: string;
  end: string;
  published: string;
  content: string;
}

interface Schema {
  blog: Blog[];
}

export type { Blog, Schema }