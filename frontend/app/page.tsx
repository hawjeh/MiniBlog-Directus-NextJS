import { graphBlogs, restBlogs } from '@/helper/connector';

export default async function Home() {
  const result = await graphBlogs();
  // const result2 = await restBlogs();
  // console.log(result2);
  const { blog } = result;
  return (
    <div className="container my-3">
      <h1>Mini Blog App</h1>
      <div className="row my-5">
        {
          blog && blog.filter(x => x.status === 'published').map(y => {
            return (
              <div className="mb-3 col col-lg-4" key={y.id}>
                <div className="card">
                  <img src={'http://localhost:8055/assets/' + y.image} className="card-img-top" style={{ height: "300px", objectFit: "cover" }} />
                  <div className="card-body">
                    <h5 className="card-title">{y.title}</h5>
                    {/* <div className="card-text" dangerouslySetInnerHTML={{ __html: y.content }}></div> */}
                    {
                      y.external ? (
                        <a href={y.external} target='_blank' className="btn btn-primary">
                          External
                        </a>
                      ) : (
                        <a href={'/' + y.slug} className="btn btn-primary">
                          Read More
                        </a>
                      )
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
