"use client";

import { useState } from "react";
import type { Video, VideoCategory } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/types";
import VideoCard from "./VideoCard";

type Filter = VideoCategory | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "dj", label: CATEGORY_LABEL.dj },
  { value: "music", label: CATEGORY_LABEL.music },
  { value: "community", label: CATEGORY_LABEL.community },
  { value: "other", label: CATEGORY_LABEL.other },
];

type Props = { videos: Video[] };

export default function CategoryFilter({ videos }: Props) {
  const [active, setActive] = useState<Filter>("all");

  const visible =
    active === "all" ? videos : videos.filter((v) => v.category === active);

  return (
    <>
      <div className="filter-bar" role="tablist" aria-label="Filter videos by category">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={active === f.value}
            className={`filter-btn${active === f.value ? " active" : ""}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p style={{ color: "var(--c-ink-soft)" }}>
          No videos in this category yet.
        </p>
      ) : (
        <div className="grid">
          {visible.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      )}
    </>
  );
}
