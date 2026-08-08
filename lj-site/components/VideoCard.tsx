import type { Video } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/types";

type Props = { video: Video };

function thumbnailUrl(video: Video): string | undefined {
  if (video.kind === "youtube") {
    return `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
  }
  if (video.kind === "mp4") {
    return video.poster;
  }
  // Vimeo: no reliable thumbnail without an API call; show a CSS placeholder.
  return undefined;
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function VideoCard({ video }: Props) {
  const thumb = thumbnailUrl(video);

  return (
    <article className="card">
      <div
        className="embed"
        style={
          thumb
            ? undefined
            : {
                background:
                  "linear-gradient(135deg, var(--c-accent) 0%, var(--c-gold) 100%)",
              }
        }
      >
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={video.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className={`badge badge-${video.category}`}>
            {CATEGORY_LABEL[video.category]}
          </span>
          {formatDate(video.date) ? (
            <span>{formatDate(video.date)}</span>
          ) : null}
        </div>
        <h3 className="card-title">{video.title}</h3>
        {video.description ? (
          <p className="card-desc">{video.description}</p>
        ) : null}
      </div>
    </article>
  );
}
