import React from 'react';

// Декоратор для добавления атрибута Storybook
export const withStorybookAttribute = (Story: any) => {
  React.useEffect(() => {
    document.documentElement.setAttribute('data-storybook', 'true');
    return () => {
      document.documentElement.removeAttribute('data-storybook');
    };
  }, []);
  
  return <Story />;
};

// Декоратор для полного экрана с градиентным фоном
export const withFullScreenGradient = (Story: any) => (
  <div style={{ 
    width: '100vw', 
    height: '100vh', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <Story />
  </div>
);

// Декоратор для темного фона
export const withDarkBackground = (Story: any) => (
  <div style={{ 
    width: '100vw', 
    height: '100vh', 
    background: '#000',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <Story />
  </div>
);

// Декоратор для центрированного контента
export const withCentered = (Story: any) => (
  <div style={{ 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px'
  }}>
    <Story />
  </div>
); 