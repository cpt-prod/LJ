type Props = { src: string; poster?: string; title: string };

export default function Mp4Player({ src, poster, title }: Props) {
  return (
    <div className="embed">
      <video controls preload="metadata" poster={poster} title={title}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
