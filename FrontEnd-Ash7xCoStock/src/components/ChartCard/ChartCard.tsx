import React from "react";
import styles from "./ChartCard.module.scss";

type Props = {
  title?: string;
  children: React.ReactNode;
};

const ChartCard: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.cardWrap} style={{ borderRadius: "8px", overflow: "hidden" }}>
      <div className={styles.cardInner}>
        {title && <div className={styles.cardHeader}><h6>{title}</h6><span className={styles.info}>i</span></div>}
        <div className={styles.cardBody}>{children}</div>
      </div>
    </div>
  );
};

export default ChartCard;
