import styles from "../styles/LoadingPage.module.css";

export default function LoadingPage() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <h2>Loading...</h2>
    </div>
  );
}
