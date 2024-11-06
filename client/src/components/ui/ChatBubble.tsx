import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const chatBubbleVariants = cva(
  'px-2.5 inline-flex items-center justify-center rounded-lg border-2 border-violet-950  text-violet-950',
  {
    variants: {
      variant: {
        default: 'bg-halfbaked-200',
        secondary: 'bg-chartreuseyellow-200',
      },
      size: {
        default: 'text-base min-h-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chatBubbleVariants> {
  asChild?: boolean;
  content: string;
  nickname?: string;
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant, size, content, nickname, ...props }, ref) => {
    const isLeftAligned = Boolean(nickname);

    return (
      <div className="bg-violet-400">
        <div className={cn('flex', isLeftAligned ? 'flex-col items-start gap-0.5' : 'justify-end')}>
          {nickname && <div className="text-xs text-eastbay-50">{nickname}</div>}
          <span className={cn(chatBubbleVariants({ variant, size, className }))} ref={ref} {...props}>
            {content}
          </span>
        </div>
      </div>
    );
  },
);
ChatBubble.displayName = 'ChatBubble';

export { ChatBubble, chatBubbleVariants };
