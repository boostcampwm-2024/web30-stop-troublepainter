import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import mainLogo from '@/assets/logo/main-logo.png';
import sideLogo from '@/assets/logo/side-logo.png';
import { cn } from '@/utils/cn';

export type LogoVariant = 'main' | 'side';

interface LogoConfig {
  src: string;
  alt: string;
  description: string;
}

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

const LOGO_CONFIG: Record<LogoVariant, LogoConfig> = {
  main: {
    src: mainLogo,
    alt: '메인 로고',
    description: '우리 프로젝트를 대표하는 메인 로고 이미지입니다',
  },
  side: {
    src: sideLogo,
    alt: '보조 로고',
    description: '우리 프로젝트를 대표하는 보조 로고 이미지입니다',
  },
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
    const config = LOGO_CONFIG[variant || 'main'];

    return (
      <img
        src={config.src}
        alt={config.alt}
        aria-label={ariaLabel ?? config.description}
        className={cn(logoVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Logo.displayName = 'Logo';

export { Logo, logoVariants };
