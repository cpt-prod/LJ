import type { Video } from "@/lib/types";
import YouTubeEmbed from "./YouTubeEmbed";
import Mp4Player from "./Mp4Player";
import VimeoEmbed from "./VimeoEmbed";

type Props = { video: Video };

export default function VideoEmbed({ video }: Props) {
  switch (video.kind) {
    case "youtube":
      return <YouTubeEmbed youtubeId={video.youtubeId} title={video.title} />;
    case "mp4":
      return <Mp4Player src={video.src} poster={video.poster} title={video.title} />;
    case "vimeo":
      return <VimeoEmbed vimeoId={video.vimeoId} title={video.title} />;
  }
}
