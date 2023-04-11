import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './common.module.css';
import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const renderCreateNavLinks = () => {
    if (location.pathname === '/') {
      return (
        <NavLink
          to="/create"
          className={`${styles.createJobLink} btn btn-primary`}
        >
          Create Job
        </NavLink>
      );
    }
    if (location.pathname === '/create') {
      return (
        <NavLink
          to="/"
          className={`${styles.createJobLink} btn btn-primary`}
        >
          Home
        </NavLink>
      );
    }
    return null;
  };

  return (
    <header className={styles.header}>
      <h1>Workruit Job Posting</h1>
      {renderCreateNavLinks()}
    </header>
  );
};