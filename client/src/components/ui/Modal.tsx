import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from './Button';
import { cn } from '@/utils/cn';

interface ModalProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>>, VariantProps<typeof modalVariants> {
  asChild?: boolean;
  title: string;
  isConfirmButton?: boolean;
  handleConfirm?: () => void;
}

const modalVariants = cva('relative overflow-hidden flex-col justify-center rounded-xl w-full h-auto', {
  variants: {
    variant: {
      primary: 'bg-violet-100 border-2 border-violet-950',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, variant, isConfirmButton, title, children, ...props }, ref) => {
    return (
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center overflow-y-auto bg-violet-950 bg-opacity-50">
        <div className={cn(modalVariants({ variant, className }))} ref={ref} {...props}>
          <div className="g-auto flex min-h-16 items-center justify-center border-b-2 border-violet-950 bg-violet-500 px-3 py-3">
            <h2 className="translate-y-1 text-4xl text-stroke-md">{title}</h2>
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-6 px-3 py-6">
            {children}
            {isConfirmButton && <Button className="max-w-80">OK</Button>}
          </div>
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';

export { Modal, modalVariants };
