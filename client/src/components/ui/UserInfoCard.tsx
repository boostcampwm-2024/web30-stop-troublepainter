import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import crownFirst from '@/assets/crown-first.png';
import crownSecond from '@/assets/crown-first.png';
import crownThird from '@/assets/crown-first.png';
import profilePlaceholder from '@/assets/profile-placeholder.png';
import { cn } from '@/utils/cn';

const userInfoCardVariants = cva(
  'flex items-center justify-between w-[18.25rem] border-2 h-[5.5rem] border-violet-950 rounded-lg transition-colors duration-200 p-3 gap-2',
  {
    variants: {
      status: {
        // 대기 상태 - 기본 상태
        notReady: 'bg-eastbay-400 text-white',
        // 준비 완료 상태
        ready: 'bg-violet-500 text-white',
        // 게임 진행 중 상태
        gaming: 'bg-eastbay-400 text-white',
      },
    },
    defaultVariants: {
      status: 'notReady',
    },
  },
);

interface UserInfoCardProps extends VariantProps<typeof userInfoCardVariants> {
  /// 공통 필수
  // 사용자 이름
  username: string;

  /// 게임방 필수
  // 사용자 순위 (1~3등일 경우 왕관 표시)
  rank?: number;
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
  return (
    <div className={cn(userInfoCardVariants({ status }), className)}>
      <div className="flex items-center gap-3">
        {/* 프로필 이미지 섹션 */}
        <div className="bg-white/20 relative flex h-14 w-14 items-center justify-center rounded-full">
          <img src={profileImage || profilePlaceholder} alt="사용자 프로필" />
          {rank !== undefined && rank <= 3 && (
            <img
              src={rank === 1 ? crownFirst : rank === 2 ? crownSecond : crownThird}
              alt={`${rank}등 사용자`}
              className="absolute -right-5 -top-7 h-12 w-auto rotate-[30deg]"
            />
          )}
        </div>

        {/* 사용자 정보 섹션 */}
        <div className="flex flex-col items-start gap-1">
          <div className="text-stroke-sm">
            <span className="text-2xl text-chartreuseyellow-400">{username}</span>
          </div>
          <div className="text-stroke-sm">
            <span className="text-gray-50">{role}</span>
          </div>
        </div>
      </div>

      {/* 점수 표시 섹션 */}
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

      {/* 준비 상태 표시 섹션, 추후 픽셀아트로 디자인 할 예정 */}
      {status !== 'gaming' && (
        <div
          className={cn(
            'rounded-md px-3 py-1 text-sm font-medium',
            status === 'ready' ? 'text-white bg-violet-400' : 'bg-white/10 text-white/60',
          )}
        >
          {status === 'ready' ? '준비완료' : '대기중'}
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;
