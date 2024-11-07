import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import mainLogo from '@/assets/logo/main-logo.png';
import sideLogo from '@/assets/logo/side-logo.png';
import { cn } from '@/utils/cn';

const logoVariants = cva('w-auto', {
  variants: {
    variant: {
      main: 'h-64',
      side: 'h-24',
    },
  },
  defaultVariants: {
    variant: 'main',
  },
});

export type LogoVariant = 'main' | 'side';

const logoSources: Record<LogoVariant, string> = {
  main: mainLogo,
  side: sideLogo,
};

const logoAlts: Record<LogoVariant, string> = {
  main: '메인 로고',
  side: '보조 로고',
};

const logoDescriptions: Record<LogoVariant, string> = {
  main: '우리 프로젝트를 대표하는 메인 로고 이미지입니다',
  side: '우리 프로젝트를 대표하는 보조 로고 이미지입니다',
};

export interface LogoProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'aria-label'>,
    VariantProps<typeof logoVariants> {
  /**
   * 로고 이미지 설명을 위한 사용자 정의 aria-label
   */
  ariaLabel?: string;
}

const Logo = React.forwardRef<HTMLImageElement, LogoProps>(
  ({ className, variant = 'main', ariaLabel, ...props }, ref) => {
    return (
      <img
        src={logoSources[variant as LogoVariant]}
        alt={logoAlts[variant as LogoVariant]}
        aria-label={ariaLabel ?? logoDescriptions[variant as LogoVariant]}
        className={cn(logoVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Logo.displayName = 'Logo';

export { Logo, logoVariants };
