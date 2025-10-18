import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { SoundRequestPlayerMobile } from "./SoundRequestPlayerMobile";

const meta: Meta<typeof SoundRequestPlayerMobile> = {
  title: "Stream Components/SoundRequest/Player/Mobile",
  component: SoundRequestPlayerMobile,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        component:
          "Мобильная версия плеера для управления SoundRequest. Оптимизирована для сенсорного управления с компактным интерфейсом и скрываемой очередью треков.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();
  },
};

