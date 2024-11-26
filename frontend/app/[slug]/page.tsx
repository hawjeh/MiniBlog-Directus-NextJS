import { graphBlog, restBlog } from "@/helper/connector";
import Link from "next/link";

type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  return {
    title: `${slug}`
  }
}

export default async function Blog({ params }: Props) {
  const { slug } = await params;
  const blog = await restBlog(slug);
  // const blog = await graphBlog(slug);
  // const blog = result[0];
  return (
    <div className="container my-3">
      {
        blog ? (
          <>
            <h1>{blog.title}</h1>
            {
              blog.type === 'news' ? (
                <p>
                  Published Date: {blog.published}
                </p>
              ) : (
                <p>
                  Campaign Date: {blog.start} to {blog.end}
                </p>
              )
            }
            <img src={'http://localhost:8055/assets/' + blog.image} className="card-img-top" style={{ height: "150px", objectFit: "cover" }} />
            <div className="my-3" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <Link href={'/'} className="btn btn-primary">Home</Link>
          </>
        ) : (
          <h1>Blog Not Found</h1>
        )
      }

    </div>
  )
}