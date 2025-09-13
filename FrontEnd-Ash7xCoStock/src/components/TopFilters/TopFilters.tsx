import React from "react";
import styles from "./TopFilters.module.scss";
import { FormControl, InputGroup } from "react-bootstrap";
const TopFilters: React.FC = () => {
  return (
    <div className={styles.filters}>
      <div className={styles.controls}>
        <InputGroup className={styles.search}>
          <FormControl placeholder="Search" />
        </InputGroup>

        <select className={styles.select}><option>Select Month</option></select>
        <select className={styles.select}><option>Select Year</option></select>
        <select className={styles.select}><option>Select Items</option></select>
        <select className={styles.select}><option>Select Country</option></select>
      </div>

      <div className={styles.actions}>
        <button className={styles.download}>Download</button>
        <div className={styles.avatar}> {/* small circle avatar */ }
          <img src="/public/profile-frame.svg" alt="user" />
        </div>
      </div>
    </div>
  );
};

export default TopFilters;
