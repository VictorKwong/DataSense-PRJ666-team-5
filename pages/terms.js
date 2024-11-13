// pages/terms.js
import styles from "../styles/Terms.module.css";
import Link from "next/link";
import React from "react";

export default function Terms() {
  return (
    <div className={styles.container}>
      <h1>Terms and Conditions</h1>
      <p>Last updated: 2024-11-12</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to DataSense! These Terms and Conditions govern your use of
          the DataSense platform, located at [DataSense URL]. By accessing or
          using DataSense, you agree to comply with and be bound by these terms.
          If you do not agree with these terms, please do not use our platform.
        </p>
      </section>

      <section>
        <h2>2. Account and Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          DataSense account and password. You agree to notify us immediately of
          any unauthorized access to your account. We reserve the right to
          terminate accounts that violate these terms or engage in unauthorized
          access.
        </p>
      </section>

      <section>
        <h2>3. Data Collection and Usage</h2>
        <p>
          DataSense collects and monitors sensor data to provide real-time
          insights. By using our platform, you consent to the collection,
          storage, and processing of data collected from connected sensors.
          DataSense may use aggregated data for analytics, research, and
          improvement of the platform, but individual data will not be shared
          without explicit permission unless required by law.
        </p>
      </section>

      <section>
        <h2>4. User Responsibilities</h2>
        <p>
          You agree to use DataSense only for lawful purposes. You are
          responsible for the accuracy and legality of the data you provide or
          collect through the platform. Misuse of DataSense, including but not
          limited to data manipulation, unauthorized access, or illegal data
          usage, may result in termination of your account and legal action.
        </p>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          All intellectual property rights for the DataSense platform,
          including but not limited to software, graphics, and logos, are the
          exclusive property of DataSense or its licensors. You may not use,
          copy, or distribute any part of the platform without prior written
          consent from DataSense.
        </p>
      </section>

      <section>
        <h2>6. Limitation of Liability</h2>
        <p>
          DataSense strives to provide accurate and reliable data. However, we
          do not guarantee the accuracy, completeness, or timeliness of
          information provided on our platform. DataSense is not liable for any
          direct, indirect, or consequential damages resulting from the use or
          inability to use the platform, including but not limited to data loss,
          unauthorized access, or interruption of service.
        </p>
      </section>

      <section>
        <h2>7. Privacy and Data Protection</h2>
        <p>
          We are committed to protecting your privacy and data security.
          DataSense will take all reasonable measures to safeguard personal data
          and comply with applicable data protection laws. Please review our{" "}
          <Link href="/privacy">Privacy Policy</Link> for detailed information on how we handle your data.
        </p>
      </section>

      <section>
        <h2>8. Changes to Terms</h2>
        <p>
          DataSense may update these Terms and Conditions periodically. When we
          do, we will revise the Last updated date at the top of this page. We
          encourage you to review these terms periodically to stay informed
          about any changes.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding these Terms and
          Conditions, please <Link href="/contact">contact us</Link>.
        </p>
      </section>
    </div>
  );
}
