import { forwardRef, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const inputVariants = cva('px-4', {
  variants: {
    variant: {
      default: 'border-2 border-violet-950 rounded-lg',
    },
    size: {
      default: 'h-11 w-full text-base placeholder:text-eastbay-500 text-violet-950 ',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
  placeholder: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, variant, size, label, ...props }, ref) => {
  const inputId = useId();

  return (
    <>
      <label htmlFor={inputId} className="block text-violet-950">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    </>
  );
});
Input.displayName = 'Input';

export { Input, inputVariants };
