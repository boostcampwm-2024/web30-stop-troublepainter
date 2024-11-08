import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const chatBubbleVariants = cva(
  'px-2.5 inline-flex items-center justify-center rounded-lg border-2 border-violet-950 text-violet-950 text-base min-h-8',
  {
    variants: {
      variant: {
        default: 'bg-halfbaked-200',
        secondary: 'bg-chartreuseyellow-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof chatBubbleVariants> {
  content: string;
  nickname?: string;
}

const ChatBubble = ({ className, variant, content, nickname, ...props }: ChatBubbleProps) => {
  const isOtherUser = Boolean(nickname);
  const ariaLabel = isOtherUser ? `${nickname}님의 메시지: ${content}` : `내 메시지: ${content}`;

  return (
    <div
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn('flex', isOtherUser ? 'flex-col items-start gap-0.5' : 'justify-end')}
    >
      {isOtherUser && (
        <span className="text-xs text-eastbay-50" aria-hidden="true">
          {nickname}
        </span>
      )}
      <p className={cn(chatBubbleVariants({ variant, className }))} {...props}>
        {content}
      </p>
    </div>
  );
};

export { ChatBubble, chatBubbleVariants };
