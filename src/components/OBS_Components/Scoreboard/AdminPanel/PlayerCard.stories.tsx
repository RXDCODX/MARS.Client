import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import PlayerCard from "./PlayerCard";

const meta: Meta<typeof PlayerCard> = {
  title: "Admin Panel/Player Card",
  component: PlayerCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Карточка игрока для панели администратора. Позволяет редактировать имя, спонсора, счет, тег, флаг и статус игрока.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onName: { action: "name changed" },
    onSponsor: { action: "sponsor changed" },
    onScore: { action: "score changed" },
    onWin: { action: "win clicked" },
    onLose: { action: "lose clicked" },
    onTag: { action: "tag changed" },
    onFlag: { action: "flag changed" },
    onClearFinal: { action: "clear final clicked" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
          padding: "20px",
          background: "#f8f9fa",
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
  args: {
    player: {
      name: "Player Name",
      sponsor: "Team Sponsor",
      score: 0,
      tag: "Player Tag",
      flag: "us",
      final: "none",
    },
    label: "Player 1",
    accent: "#0dcaf0",
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие основных элементов
    const card = canvasElement.querySelector('[class*="player-card"]');
    expect(card).toBeInTheDocument();
  },
};

export const Winner: Story = {
  args: {
    player: {
      name: "Winner Player",
      sponsor: "Champion Team",
      score: 3,
      tag: "The Champion",
      flag: "jp",
      final: "winner",
    },
    label: "Player 1",
    accent: "#198754",
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка игрока-победителя с соответствующим статусом.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие статуса победителя
    const winButton = canvasElement.querySelector('[class*="btn-success"]');
    expect(winButton).toBeInTheDocument();
  },
};

export const Loser: Story = {
  args: {
    player: {
      name: "Loser Player",
      sponsor: "Underdog Team",
      score: 1,
      tag: "The Challenger",
      flag: "kr",
      final: "loser",
    },
    label: "Player 2",
    accent: "#dc3545",
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка игрока-проигравшего с соответствующим статусом.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие статуса проигравшего
    const loseButton = canvasElement.querySelector('[class*="btn-danger"]');
    expect(loseButton).toBeInTheDocument();
  },
};

export const HighScore: Story = {
  args: {
    player: {
      name: "High Score Player",
      sponsor: "Score Team",
      score: 99,
      tag: "Score Master",
      flag: "cn",
      final: "none",
    },
    label: "Player 1",
    accent: "#ffc107",
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка игрока с высоким счетом.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие поля счета
    const scoreInput = canvasElement.querySelector('input[type="number"]');
    expect(scoreInput).toBeInTheDocument();
  },
};

export const NoTag: Story = {
  args: {
    player: {
      name: "Player Without Tag",
      sponsor: "Simple Team",
      score: 2,
      tag: "",
      flag: "ru",
      final: "none",
    },
    label: "Player 2",
    accent: "#6c757d",
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка игрока без тега.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие поля тега
    const tagInput = canvasElement.querySelector('input[placeholder*="tag"]');
    expect(tagInput).toBeInTheDocument();
  },
};

export const NoFlag: Story = {
  args: {
    player: {
      name: "Player Without Flag",
      sponsor: "International Team",
      score: 1,
      tag: "International",
      flag: "",
      final: "none",
    },
    label: "Player 1",
    accent: "#6610f2",
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка игрока без флага страны.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие селектора флага
    const flagSelect = canvasElement.querySelector('select');
    expect(flagSelect).toBeInTheDocument();
  },
}; 