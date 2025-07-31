import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
  variant?: 'default' | 'admin';
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'default', 
  size = 'sm' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const getButtonVariant = () => {
    if (variant === 'admin') {
      return 'outline-secondary';
    }
    return theme === 'light' ? 'outline-dark' : 'outline-light';
  };

  const getButtonSize = () => {
    switch (size) {
      case 'md': return 'md';
      case 'lg': return 'lg';
      default: return 'sm';
    }
  };

  const getButtonClass = () => {
    return variant === 'admin' ? styles.adminThemeToggle : styles.themeToggle;
  };

  return (
    <Button
      variant={getButtonVariant()}
      size={getButtonSize()}
      onClick={toggleTheme}
      className={getButtonClass()}
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