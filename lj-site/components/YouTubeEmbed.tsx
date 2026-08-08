type Props = { youtubeId: string; title: string };

export default function YouTubeEmbed({ youtubeId, title }: Props) {
  return (
    <div className="embed">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
