import Link from "next/link";
import { ReferencePageShell } from "@/components/templates/supermarket5/pages/ReferencePageShell";
import { POSTS } from "@/lib/supermarket5/defaults";

const BASE_PATH = "/templates/supermarket-5/preview";

export default function BlogPage() {
  return (
    <ReferencePageShell title="Blog" subtitle="VividMart grocery tips, recipes, vendor stories, and fresh food ideas.">
      <div className="row g-4">
        {POSTS.slice(0, 9).map((post) => (
          <div key={post.id} className="col-lg-4 col-md-6">
            <article className="single-blog-area-start" style={{ height: "100%" }}>
              <Link href={`${BASE_PATH}/blog/${post.slug}`} className="thumbnail">
                <img src={`/templates/supermarket5/blog/${post.image}`} alt={post.title} />
              </Link>
              <div className="blog-body">
                <div className="top-area">
                  <span>{post.category}</span>
                  <span>{post.publishedDate}</span>
                </div>
                <Link href={`${BASE_PATH}/blog/${post.slug}`}>
                  <h4 className="title">{post.title}</h4>
                </Link>
                <p>{post.descripTion}</p>
                <Link href={`${BASE_PATH}/blog/${post.slug}`} className="shop-now-goshop-btn">
                  Read More <i className="fa-regular fa-arrow-right" />
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </ReferencePageShell>
  );
}
