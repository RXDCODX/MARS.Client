import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={theme === 'light' ? 'outline-dark' : 'outline-light'}
      size="sm"
      onClick={toggleTheme}
      className={styles.themeToggle}
      title={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
    >
      {theme === 'light' ? (
        <>
          <i className="bi bi-moon-fill"></i>
          <span className="ms-1 d-none d-sm-inline">Темная</span>
        </>
      ) : (
        <>
          <i className="bi bi-sun-fill"></i>
          <span className="ms-1 d-none d-sm-inline">Светлая</span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggle; 