import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand">
            <span className="brand-mark" aria-hidden="true" />
            LJ
          </div>
          <p className="footer-tagline">
            DJ, music, and community work — all in one place.
          </p>
        </div>
        <div>
          <h4>Site</h4>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/videos">Videos</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Find LJ</h4>
          <ul>
            <li>
              <a
                href="https://www.youtube.com/@LJ_THE_DJ"
                target="_blank"
                rel="noreferrer"
              >
                YouTube — @LJ_THE_DJ
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@Ljthedjinthemix"
                target="_blank"
                rel="noreferrer"
              >
                YouTube — @Ljthedjinthemix
              </a>
            </li>
            <li>
              <a
                href="https://soundcloud.com"
                target="_blank"
                rel="noreferrer"
              >
                SoundCloud
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 LJ. All rights reserved.</span>
        <span>Built by cpt-prod</span>
      </div>
    </footer>
  );
}
