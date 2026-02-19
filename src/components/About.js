import React from "react";

function About() {
  return (
    <div style={styles.page}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>About DLSMS</h1>
        <p style={styles.heroText}>
          Digital Loan & Savings Management System (DLSMS) is built to empower
          community groups through transparency, accountability, and smart
          financial management.
        </p>
      </section>

      {/* CONTENT SECTION */}
      <section style={styles.content}>
        <div style={styles.card}>
          <h3 style={styles.title}>🎯 Our Mission</h3>
          <p style={styles.text}>
            To provide a simple, secure, and transparent platform that helps
            individuals and community groups manage savings and loans with
            confidence and discipline.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.title}>👁 Our Vision</h3>
          <p style={styles.text}>
            To become a trusted digital financial solution that promotes
            financial inclusion, accountability, and economic growth among
            underserved communities.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.title}>💡 What We Do</h3>
          <ul style={styles.list}>
            <li>Manage member savings records</li>
            <li>Track loans and repayments</li>
            <li>Improve financial transparency</li>
            <li>Support community financial growth</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h3 style={styles.title}>🤝 Who We Serve</h3>
          <p style={styles.text}>
            DLSMS is designed for community groups, savings groups, and refugee
            associations seeking a reliable digital system to manage finances
            fairly and efficiently.
          </p>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section style={styles.footerNote}>
        <p style={styles.noteText}>
          Together, we build trust, discipline, and a better financial future.
        </p>
      </section>
    </div>
  );
}

export default About;

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#bbc5bc",
    minHeight: "100vh",
    marginTop: "100px",
  },

  hero: {
    backgroundColor: "#1f2933",
    color: "#ffffff",
    padding: "40px 20px",
    textAlign: "center",
  },

  heroTitle: {
    marginBottom: "10px",
    fontSize: "30px",
  },

  heroText: {
    maxWidth: "700px",
    margin: "0 auto",
    fontSize: "20px",
    lineHeight: "1.6",
    color: "#dedef0",
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
    fontSize: "20px",
    backgroundColor: "hsl(139, 53%, 94%)",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  title: {
    marginBottom: "8px",
    color: "#0f171f",
    fontSize: "30px",
    spaceBetween: "auto",
  },

  text: {
    fontSize: "20px",
    color: "#272524",
    lineHeight: "1.6",
  },

  list: {
    paddingLeft: "18px",
    color: "#272524",
    fontSize: "20px",
    lineHeight: "1.8",
    Text
  },

  footerNote: {
    backgroundColor: "#193f8d",
    textAlign: "center",
    padding: "15px 10px",
    height: "200px",
    marginTop: "200px",
  },

  noteText: {
    fontSize: "20px",
    color: "#d5dce7",
    marginTop: "50px",
  },
};