import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import profilePlaceholder from '@/assets/profile-placeholder.png';
import { ReadyStatus, UserRank } from '@/types/userInfo.types';
import { cn } from '@/utils/cn';
import getCrownImage from '@/utils/getCrownImage';

const userInfoCardVariants = cva('flex duration-200 gap-2 sm:transition-colors', {
  variants: {
    status: {
      // 대기 상태 - 기본 상태
      notReady: 'bg-transparent sm:bg-eastbay-400 text-white',
      // 준비 완료 상태
      ready: 'bg-transparent sm:bg-violet-500 text-white',
      // 게임 진행 중 상태
      gaming: 'bg-transparent sm:bg-eastbay-400 text-white',
    },
  },
  defaultVariants: {
    status: 'notReady',
  },
});

interface UserInfoCardProps extends VariantProps<typeof userInfoCardVariants> {
  /// 공통 필수
  // 사용자 이름
  username: string;

  /// 게임방 필수
  // 사용자 순위 (1~3등일 경우 왕관 표시)
  rank?: UserRank;
  // 사용자 점수 (게임 중일 때만 표시)
  score?: number;
  // 사용자 역할 (그림꾼, 방해꾼 등)
  role?: string;

  /// 공통 선택
  // 추가 스타일링을 위한 className
  className?: string;
  // 프로필 이미지 URL (없을 경우 기본 이미지 사용)
  profileImage?: string;
}

/**
 * 사용자 정보를 표시하는 카드 컴포넌트입니다.
 *
 * @component
 * @example
 * // 대기 상태의 사용자
 * <UserInfoCard
 *   username="Player1"
 *   status="notReady"
 * />
 *
 * // 게임 중인 1등 사용자
 * <UserInfoCard
 *   username="Player1"
 *   role="그림꾼"
 *   score={100}
 *   rank={1}
 *   status="gaming"
 * />
 */
const UserInfoCard = ({
  username,
  rank,
  score,
  role = '???',
  profileImage,
  status = 'notReady',
  className,
}: UserInfoCardProps) => {
  // 순위에 따른 Crown Image 렌더링 로직
  const showCrown = rank !== undefined && rank <= 3;
  const crownImage = showCrown ? getCrownImage(rank) : null;

  // 준비 상태 표시 섹션 재료, 추후 픽셀아트로 디자인 할 예정
  const READY_STATUS_CONFIG: Record<
    ReadyStatus,
    {
      text: string;
      className: string;
    }
  > = {
    ready: {
      text: '준비완료',
      className: 'text-white bg-violet-400',
    },
    notReady: {
      text: '대기중',
      className: 'bg-white/10 text-white/60',
    },
  } as const;

  return (
    <div
      className={cn(
        userInfoCardVariants({ status }),
        'sm:h-[5.5rem] sm:w-[18.25rem] sm:items-center sm:justify-between sm:rounded-lg sm:border-2 sm:border-violet-950 sm:p-3',
        'h-20 w-12 items-center justify-between p-2',
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-3">
        {/* 프로필 이미지 섹션 */}
        <div className="relative">
          <div className="bg-white/20 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-violet-950 sm:h-14 sm:w-14 sm:rounded-xl">
            <img src={profileImage || profilePlaceholder} alt="사용자 프로필" />
            {/* 모바일 상태 오버레이 */}
            {status !== 'gaming' ? (
              <div
                className={clsx(
                  'absolute inset-0 flex items-center justify-center rounded-full transition-all duration-300 sm:hidden',
                  {
                    'bg-violet-500/80 opacity-100': status === 'ready',
                    'bg-transparent opacity-0': status !== 'ready',
                  },
                )}
              >
                {status === 'ready' && <span className="text-xs text-stroke-sm">준비</span>}
              </div>
            ) : (
              <div className="bg-black/50 absolute inset-0 flex items-center justify-center rounded-full sm:hidden">
                <span className="text-white text-xl font-bold text-stroke-sm">{score}</span>
              </div>
            )}
            {/* 왕관 이미지 */}
            {crownImage && (
              <img
                src={crownImage}
                alt={`${rank}등 사용자`}
                className="absolute -right-1 -top-3 h-7 w-auto rotate-[30deg] sm:-right-5 sm:-top-7 sm:h-12"
              />
            )}
          </div>
        </div>

        {/* 사용자 정보 섹션 */}
        <div className="flex -translate-y-1 flex-col items-center sm:translate-y-0 sm:items-start">
          <div className="h-3 text-stroke-sm sm:h-auto">
            <span className="text-xs text-chartreuseyellow-400 sm:text-2xl">{username}</span>
          </div>
          <div className="h-3 text-stroke-sm sm:h-auto">
            <span className="text-gray-50 text-[0.625rem] sm:text-base">{role}</span>
          </div>
        </div>
      </div>

      {/* 데스크탑 점수/상태 표시 섹션 */}
      <div className="hidden items-center gap-2 sm:flex">
        {score !== undefined && (
          <div
            className={clsx(
              'flex h-10 items-center justify-center rounded-lg border-2 border-violet-950 bg-halfbaked-200',
              {
                'px-3': score < 10,
                'px-1.5': score >= 10,
              },
            )}
          >
            <div className="translate-x-[0.05rem] text-2xl leading-5 text-eastbay-950">{score}</div>
          </div>
        )}

        {status !== 'gaming' && (
          <div
            className={cn(
              'rounded-md px-3 py-1 text-sm font-medium',
              READY_STATUS_CONFIG[status || 'notReady'].className,
            )}
          >
            {READY_STATUS_CONFIG[status || 'notReady'].text}
          </div>
        )}
      </div>
    </div>
  );
};

export { UserInfoCard, userInfoCardVariants };
