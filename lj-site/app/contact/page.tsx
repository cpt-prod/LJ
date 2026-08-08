import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — LJ",
  description: "Get in touch with LJ.",
};

// Replace with LJ's real address when known.
const CONTACT_EMAIL = "hello@lj.example";

export default function ContactPage() {
  return (
    <section className="container">
      <div className="page-header">
        <h1>Contact</h1>
        <p>
          For bookings, collaborations, community work, or anything else.
          Submitting the form opens your mail client.
        </p>
      </div>

      <form
        className="form"
        action={`mailto:${CONTACT_EMAIL}`}
        method="post"
        encType="text/plain"
      >
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="topic">Topic</label>
          <select
            id="topic"
            name="topic"
            style={{
              width: "100%",
              padding: "0.65rem 0.8rem",
              border: "1px solid var(--c-line)",
              borderRadius: 8,
              background: "var(--c-surface)",
              color: "var(--c-ink)",
              font: "inherit",
            }}
          >
            <option>General</option>
            <option>Booking</option>
            <option>Collaboration</option>
            <option>Community project</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
