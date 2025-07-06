import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "@storybook/test";

import RainbowText from "./RainbowText";

const meta: Meta<typeof RainbowText> = {
  title: "Shared/RainbowText",
  component: RainbowText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Компонент для отображения текста с радужной анимацией.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Rainbow Text! 🌈",
  },
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие текста
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что текст отображается
    expect(textElement).toHaveTextContent("Rainbow Text! 🌈");

    // Проверяем анимацию
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.animation).toBeDefined();
    expect(computedStyle.animation).toContain("rainbow");
  },
};

export const LongText: Story = {
  args: {
    text: "This is a very long rainbow text that should demonstrate the animation effect across multiple words and characters!",
  },
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем длинный текст
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что весь текст отображается
    expect(textElement).toHaveTextContent("This is a very long rainbow text");

    // Проверяем анимацию для длинного текста
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.animation).toBeDefined();
  },
};

export const ShortText: Story = {
  args: {
    text: "Hi!",
  },
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем короткий текст
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что короткий текст отображается
    expect(textElement).toHaveTextContent("Hi!");

    // Проверяем анимацию для короткого текста
    const computedStyle = window.getComputedStyle(textElement!);
    expect(computedStyle.animation).toBeDefined();
  },
};

export const EmptyText: Story = {
  args: {
    text: "",
  },
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем пустой текст
    const textElement = canvasElement.querySelector('[class*="rainbow"]');
    expect(textElement).toBeInTheDocument();

    // Проверяем, что элемент существует даже с пустым текстом
    expect(textElement).toBeInTheDocument();
  },
};

export const WithEmojis: Story = {
  args: {
    text: "🌈 Радужный текст с эмодзи 🎨",
  },
};
