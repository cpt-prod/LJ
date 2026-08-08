import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — LJ",
  description: "About LJ: DJ, music, and community work.",
};

export default function AboutPage() {
  return (
    <section className="container">
      <div className="page-header">
        <h1>About LJ</h1>
        <p>
          DJ. Producer. Volunteer. A short bio and a longer story.
        </p>
      </div>

      <div className="about-bio">
        <div className="about-photo" aria-hidden="true" />
        <div>
          <h2>Who</h2>
          <p>
            LJ is a DJ and music producer based in the Bay Area. Sets run
            from house and disco to breaks and ambient; mixes lean warm and
            textural.
          </p>
          <h2>What</h2>
          <p>
            Beyond the decks, LJ spends time at community gardens, food
            drives, and youth-music workshops. The videos here span both
            sides of the work.
          </p>
          <h2>Why a site</h2>
          <p>
            One place to watch what&rsquo;s been made and what&rsquo;s been
            done. No autoplay, no tracking, no infinite scroll. Just videos.
          </p>
        </div>
      </div>
    </section>
  );
}
