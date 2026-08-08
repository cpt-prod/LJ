type Props = { vimeoId: string; title: string };

export default function VimeoEmbed({ vimeoId, title }: Props) {
  return (
    <div className="embed">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}`}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        allowFullScreen
      />
    </div>
  );
}
