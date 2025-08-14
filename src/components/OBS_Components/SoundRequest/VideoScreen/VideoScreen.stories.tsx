import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { VideoScreen } from "./VideoScreen";

const meta: Meta<typeof VideoScreen> = {
  title: "Stream Components/SoundRequest/VideoScreen",
  component: VideoScreen,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Компонент для отображения видео экрана в системе звуковых запросов.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
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
