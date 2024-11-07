import UserInfoCard from './UserInfoCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Game/UserInfoCard',
  component: UserInfoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['notReady', 'ready', 'gaming'],
      description: '사용자의 현재 상태를 표시',
    },
    username: {
      control: 'text',
      description: '사용자 이름',
    },
    rank: {
      control: 'number',
      description: '사용자의 순위 (1-3등일 경우 왕관 표시)',
    },
    score: {
      control: 'number',
      description: '게임 중 획득한 점수',
    },
    role: {
      control: 'text',
      description: '게임에서의 역할 (그림꾼, 방해꾼 등)',
    },
  },
} satisfies Meta<typeof UserInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: 'Player1',
    status: 'notReady',
  },
};

export const Ready: Story = {
  args: {
    username: 'Player1',
    status: 'ready',
  },
};

export const Gaming: Story = {
  args: {
    username: 'Player1',
    status: 'gaming',
    role: '그림꾼',
    score: 100,
    rank: 1,
  },
};
