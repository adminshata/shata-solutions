import { ReferencePageShell } from "@/components/templates/supermarket2/pages/ReferencePageShell";
import { POSTS } from "@/lib/supermarket2/defaults";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((item) => item.slug === slug) ?? POSTS[0];
  return (
    <ReferencePageShell title={post.title ?? "Blog detail"} subtitle={`${post.category} • ${post.publishedDate}`}>
      <article style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.06)" }}>
        <img src={`/templates/supermarket2/blog/${post.bannerImg ?? post.image}`} alt={post.title} style={{ width: "100%", maxHeight: 460, objectFit: "cover" }} />
        <div style={{ padding: 32, lineHeight: 1.9, fontSize: 18 }}>
          <p>{post.descripTion}</p>
          <p>QuickMart shares practical food ideas, seasonal shopping notes, vendor stories, and grocery tips for everyday home cooking.</p>
        </div>
      </article>
    </ReferencePageShell>
  );
}
