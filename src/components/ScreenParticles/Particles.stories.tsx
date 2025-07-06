import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Confettyv2 } from './Confetty';
import EmojiParticles from './EmojiParticles';
import Firework from './Firework';

// Wrapper компонент с кнопкой для тестирования
const TestWrapper = ({ children, onActivate }: { children: React.ReactNode; onActivate: () => void }) => (
  <div style={{ 
    width: '100vw', 
    height: '100vh', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <button 
      id="activate-button"
      onClick={onActivate}
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      Активировать эффект
    </button>
    {children}
  </div>
);

const meta: Meta = {
  title: 'Particles/Effects',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Компоненты для создания различных визуальных эффектов частиц.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

// Confetty Stories
export const ConfettyEffect: StoryObj = {
  render: () => {
    const [isActive, setIsActive] = useState(false);
    
    return (
      <TestWrapper onActivate={() => setIsActive(true)}>
        {isActive && (
          <Confettyv2 
            callback={() => setIsActive(false)} 
          />
        )}
      </TestWrapper>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Проверяем, что кнопка существует
    const activateButton = canvas.getByRole('button', { name: /активировать эффект/i });
    expect(activateButton).toBeInTheDocument();
    
    // Проверяем, что эффект не активен изначально
    const confettiCanvas = canvasElement.querySelectorAll('canvas');
    expect(confettiCanvas.length).toBe(0);
    
    // Нажимаем кнопку активации
    await userEvent.click(activateButton);
    
    // Ждем появления эффекта
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Проверяем, что эффект активировался
    const activeConfettiCanvas = canvasElement.querySelectorAll('canvas');
    expect(activeConfettiCanvas.length).toBeGreaterThan(0);
    
    // Ждем завершения эффекта
    await new Promise(resolve => setTimeout(resolve, 10500));
    
    // Проверяем, что эффект завершился
    const finalCanvas = canvasElement.querySelectorAll('canvas');
    expect(finalCanvas.length).toBe(0);
  },
  parameters: {
    docs: {
      description: {
        story: 'Эффект конфетти с радужными цветами. Активируется кнопкой и автоматически завершается через 10 секунд.',
      },
    },
  },
};

// Firework Stories
export const FireworkEffect: StoryObj = {
  render: () => {
    const [isActive, setIsActive] = useState(false);
    
    return (
      <TestWrapper onActivate={() => setIsActive(true)}>
        {isActive && (
          <Firework 
            callback={() => setIsActive(false)} 
          />
        )}
      </TestWrapper>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Проверяем, что кнопка существует
    const activateButton = canvas.getByRole('button', { name: /активировать эффект/i });
    expect(activateButton).toBeInTheDocument();
    
    // Проверяем, что эффект не активен изначально
    const fireworkCanvas = canvasElement.querySelectorAll('canvas');
    expect(fireworkCanvas.length).toBe(0);
    
    // Нажимаем кнопку активации
    await userEvent.click(activateButton);
    
    // Ждем появления эффекта
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Проверяем, что эффект активировался
    const activeFireworkCanvas = canvasElement.querySelectorAll('canvas');
    expect(activeFireworkCanvas.length).toBeGreaterThan(0);
    
    // Ждем завершения эффекта
    await new Promise(resolve => setTimeout(resolve, 10500));
    
    // Проверяем, что эффект завершился
    const finalCanvas = canvasElement.querySelectorAll('canvas');
    expect(finalCanvas.length).toBe(0);
  },
  parameters: {
    docs: {
      description: {
        story: 'Эффект фейерверка. Активируется кнопкой и автоматически завершается через 10 секунд.',
      },
    },
  },
};

// EmojiParticles Stories
export const EmojiParticlesEffect: StoryObj = {
  render: () => {
    const [isActive, setIsActive] = useState(false);
    
    return (
      <TestWrapper onActivate={() => setIsActive(true)}>
        {isActive && (
          <EmojiParticles 
            input="🎉🎊🎈" 
          />
        )}
      </TestWrapper>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Проверяем, что кнопка существует
    const activateButton = canvas.getByRole('button', { name: /активировать эффект/i });
    expect(activateButton).toBeInTheDocument();
    
    // Проверяем, что эффект не активен изначально
    const emojiCanvas = canvasElement.querySelectorAll('canvas');
    expect(emojiCanvas.length).toBe(0);
    
    // Нажимаем кнопку активации
    await userEvent.click(activateButton);
    
    // Ждем появления эффекта (эмодзи требуют больше времени для загрузки)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Проверяем, что эффект активировался
    const activeEmojiCanvas = canvasElement.querySelectorAll('canvas');
    expect(activeEmojiCanvas.length).toBeGreaterThan(0);
    
    // Ждем завершения эффекта
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Проверяем, что эффект завершился
    const finalCanvas = canvasElement.querySelectorAll('canvas');
    expect(finalCanvas.length).toBe(0);
  },
  parameters: {
    docs: {
      description: {
        story: 'Эффект частиц эмодзи. Активируется кнопкой и автоматически завершается через 10 секунд. Использует эмодзи из текста.',
      },
    },
  },
}; 