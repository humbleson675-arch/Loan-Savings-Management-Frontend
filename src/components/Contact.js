import React, {useState} from "react";

function Contact() {
  const styles = {
    container: {
      minHeight: "100vh",
      padding: "30px 15px",
      backgroundColor: "#bbc5bc",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      fontFamily: "Arial, sans-serif",
    },

    card: {
      width: "100%",
      maxWidth: "900px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      padding: "25px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },

    title: {
      textAlign: "center",
      fontSize: "28px",
      color: "#1f2933",
      marginBottom: "10px",
    },

    subtitle: {
      textAlign: "center",
      fontSize: "15px",
      color: "#555",
      marginBottom: "25px",
    },

    section: {
      marginBottom: "25px",
    },

    sectionTitle: {
      fontSize: "18px",
      color: "#111827",
      marginBottom: "10px",
      borderBottom: "2px solid #e5e7eb",
      paddingBottom: "5px",
    },

    text: {
      fontSize: "14px",
      color: "#374151",
      margin: "6px 0",
      lineHeight: "1.6",
    },

    link: {
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: "500",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    input: {
      padding: "10px",
      fontSize: "14px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      outline: "none",
      width: "100%",
    },

    textarea: {
      padding: "10px",
      fontSize: "14px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      outline: "none",
      width: "100%",
      minHeight: "120px",
      resize: "vertical",
    },

    button: {
      backgroundColor: "#2563eb",
      color: "#ffffff",
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      fontSize: "15px",
      cursor: "pointer",
    },

    footerNote: {
      textAlign: "center",
      fontSize: "13px",
      color: "#6b7280",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          We’re here to help. Reach out to us anytime for support, feedback, or collaboration.
        </p>

        {/* Contact Details */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📞 Contact Information</h3>
          <p style={styles.text}>
            <strong>Email:</strong>{" "}
            <a href="mailto:gatluakgatkuoth2@gmail.com" style={styles.link}>
              gatluakgatkuoth2@gmail.com
            </a>
          </p>
          <p style={styles.text}>
            <strong>WhatsApp:</strong>{" "}
            <a href="https://wa.me/254112590503" style={styles.link}>
              0112 590 503
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🌐 Social Media</h3>
          <p style={styles.text}>
            <strong>Facebook:</strong> Peter Gatkuothjr Son Dengjoklual
          </p>
          <p style={styles.text}>
            <strong>TikTok:</strong> Peter Gatkuothjr Son Dengjoklual
          </p>
        </div>

        {/* Location */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📍 Location</h3>
          <p style={styles.text}>
            Turkana County, Kakuma Refugee Camp
          </p>
          <p style={styles.text}>
            Zone 3, Block 5, Group 20
          </p>
        </div>

        {/* Contact Form */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>✉ Send Us a Message</h3>
          <form style={styles.form}>
            <input
              type="text"
              placeholder="Your Full Name"
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Your Email Address"
              style={styles.input}
            />
            <textarea
              placeholder="Write your message here..."
              style={styles.textarea}
            ></textarea>
            <button type="button" style={styles.button}>
              Send Message
            </button>
          </form>
        </div>

        <p style={styles.footerNote}>
          We value your communication and will respond as soon as possible.
        </p>
      </div>
    </div>
  );
}

export default Contact;