import React from "react";
import styles from "./Toast.module.scss";
import { useAuthContext } from "../../contexts/AuthContext";

export const Toasts: React.FC = () => {
  const { toasts, removeToast } = useAuthContext();

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${styles.toast} ${t.type === "success" ? styles.success : t.type === "error" ? styles.error : styles.info}`}
        >
          <div className={styles.msg}>{t.message}</div>
          <button className={styles.close} onClick={() => removeToast(t.id)} aria-label="Close">
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
