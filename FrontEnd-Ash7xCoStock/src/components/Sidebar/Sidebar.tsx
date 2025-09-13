import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoWrap}>
        <img src="/public/logo.svg" alt="CoStock" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          Dashboard
        </NavLink>
        <NavLink to="/cogs-report" className={styles.navItem}>COGS Report</NavLink>
        <NavLink to="/logs" className={styles.navItem}>Admin Logs</NavLink>
      </nav>

      <div className={styles.logoutWrap}>
        <button className={styles.logoutBtn} onClick={logout}>Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
