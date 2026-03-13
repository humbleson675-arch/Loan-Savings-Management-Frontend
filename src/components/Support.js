import React from "react";

function Support() {
  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Support Us</h1>
        <p style={styles.heroText}>
          Your support helps us strengthen transparency, accountability, and
          financial empowerment in community groups.
        </p>
      </section>

      {/* CONTENT */}
      <section style={styles.content}>
        <div style={styles.card}>
          <h3 style={styles.title}>🤲 Why Support DLSMS?</h3>
          <p style={styles.text}>
            DLSMS is built to help community savings and loan groups manage their
            finances digitally. Your support helps us maintain the system,
            improve features, and reach more people.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.title}>💳 Ways You Can Support</h3>
          <ul style={styles.list}>
            <li>Financial contributions</li>
            <li>Technical support & development</li>
            <li>Training and awareness</li>
            <li>Community partnerships</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h3 style={styles.title}>🌍 Impact of Your Support</h3>
          <p style={styles.text}>
            With your help, we empower refugee and community groups to manage
            loans and savings transparently, reducing conflicts and promoting
            trust.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.title}>📩 Get Involved</h3>
          <p style={styles.text}>
            Interested in supporting or partnering with us? Reach out through
            our contact page or email us directly to learn how you can help.
          </p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={styles.cta}>
        <p style={styles.ctaText}>
          Together, we can build stronger and more transparent financial
          communities.
        </p>
        
      </section>
    </div>
  );
}

export default Support;

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#bbc5bc",
    minHeight: "100vh",
  },

  hero: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    padding: "40px 20px",
    textAlign: "center",
    marginTop: "100px",
  },

  heroTitle: {
    marginBottom: "10px",
    fontSize: "30px",
  },

  heroText: {
    maxWidth: "720px",
    margin: "0 auto",
    fontSize: "20px",
    lineHeight: "1.8",
    color: "#cbd5f5",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    padding: "30px 20px",
    maxWidth: "100%",
    margin: "0 auto",
    marginTop: "100px",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  title: {
    marginBottom: "8px",
    color: "#0f172a",
    fontSize: "30px",
  },

  text: {
    fontSize: "20px",
    color: "#374151",
    lineHeight: "1.8",
  },

  list: {
    paddingLeft: "18px",
    color: "#374151",
    fontSize: "20px",
    lineHeight: "1.8",
  },

  cta: {
    backgroundColor: "#193f8d",
    textAlign: "center",
    padding: "15px 10px",
    height: "200px",
    marginTop: "200px",
  },

  ctaText: {
     fontSize: "20px",
    color: "#d5dce7",
    marginTop: "50px",
    
  },
};