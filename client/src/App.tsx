import './App.css';
import { useState } from 'react';
import helpIcon from '@/assets/help-icon.svg';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { UserInfoCard } from '@/components/ui/UserInfoCard';


const App = () => {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <Logo />
      <Logo variant="side" />

      <h1 className="transition">Hello world!</h1>
      <Button className="font-neodgm-pro text-2xl font-normal">유미라</Button>
      <Button variant="transperent" size="icon">
        <img src={helpIcon} alt="도움말 보기 버튼" />
      </Button>
      {/* UserInfoCard 예시 */}
      <div className="space-y-8 p-4">
        {/* 대기방 예시 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">대기방</h2>
          <div className="space-y-2">
            <UserInfoCard username="미라" status={isReady ? 'ready' : 'notReady'} />
            <UserInfoCard username="친구" status={'notReady'} />
          </div>
          <Button onClick={() => setIsReady(!isReady)} variant={isReady ? 'secondary' : 'proimary'} className="w-full">
            {isReady ? '해제' : '준비'}
          </Button>
        </div>

        {/* 게임방 예시 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">게임방</h2>
          <div className="space-y-2">
            <UserInfoCard username="미라" status={'gaming'} role="그림꾼" score={80} rank={1} />
            <UserInfoCard username="친구1" status={'gaming'} role="방해꾼" score={8} rank={2} />
            <UserInfoCard username="친구2" status={'gaming'} role="그림꾼" score={6} rank={3} />
            <UserInfoCard username="친구3" status={'gaming'} role="구경꾼" score={4} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
