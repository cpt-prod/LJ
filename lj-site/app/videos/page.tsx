import type { Metadata } from "next";
import { videos } from "@/lib/data";
import CategoryFilter from "@/components/CategoryFilter";

export const metadata: Metadata = {
  title: "Videos — LJ",
  description: "LJ's video archive: DJ performances, music, community work.",
};

export default function VideosPage() {
  return (
    <section className="container">
      <div className="page-header">
        <h1>Videos</h1>
        <p>DJ sets, original music, and community work. Filter by category.</p>
      </div>
      <CategoryFilter videos={videos} />
    </section>
  );
}
