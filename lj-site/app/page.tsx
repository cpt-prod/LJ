import Link from "next/link";
import { videos } from "@/lib/data";
import VideoEmbed from "@/components/VideoEmbed";
import VideoCard from "@/components/VideoCard";

export default function HomePage() {
  const [featured, ...rest] = videos;
  const recent = rest.slice(0, 3);
  const total = videos.length;
  const djCount = videos.filter((v) => v.category === "dj").length;
  const communityCount = videos.filter((v) => v.category === "community").length;

  return (
    <>
      <section className="container hero">
        <h1>DJ. Music. Community.</h1>
        <p className="hero-lede">
          A showcase of LJ&rsquo;s sets, original work, and time spent giving
          back. Watch the latest, browse the archive, or get in touch.
        </p>
        <div className="hero-actions">
          <Link href="/videos" className="btn btn-primary">
            Watch the videos
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </div>

        <div className="stat-row">
          <div className="stat">
            <span className="stat-num">{total}</span>
            <span className="stat-label">Videos</span>
          </div>
          <div className="stat">
            <span className="stat-num">{djCount}</span>
            <span className="stat-label">DJ sets</span>
          </div>
          <div className="stat">
            <span className="stat-num">{communityCount}</span>
            <span className="stat-label">Community</span>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="container hero-featured">
          <h2 style={{ marginBottom: "1rem" }}>Featured</h2>
          <VideoEmbed video={featured} />
          <div style={{ marginTop: "1rem" }}>
            <h3 style={{ marginBottom: "0.25rem" }}>{featured.title}</h3>
            {featured.description ? (
              <p style={{ color: "var(--c-ink-soft)", margin: 0 }}>
                {featured.description}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {recent.length > 0 ? (
        <section className="container section">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <h2 style={{ margin: 0 }}>Recent</h2>
            <Link href="/videos" className="btn btn-ghost">
              See all videos
            </Link>
          </div>
          <div className="grid">
            {recent.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="container section-tight">
        <div
          className="card"
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "1.5rem",
          }}
        >
          <div style={{ flex: 1, minWidth: 240 }}>
            <h3 style={{ marginBottom: "0.25rem" }}>Booking or collab?</h3>
            <p style={{ margin: 0, color: "var(--c-ink-soft)" }}>
              For sets, mixes, or community projects, send a note.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
