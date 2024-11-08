import './App.css';
import asdf from '@/assets/big-timer.gif';
import helpIcon from '@/assets/help-icon.svg';
import asd from '@/assets/small-timer.gif';
import as from '@/assets/small-timer.png';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

const App = () => {
  return (
    <>
      <Logo />
      <Logo variant="side" />

      <h1 className="transition">Hello world!</h1>
      <Button className="font-neodgm-pro text-2xl font-normal">유미라</Button>
      <Button variant="transperent" size="icon">
        <img src={helpIcon} alt="도움말 보기 버튼" />
      </Button>
      <img src={as} alt="as" />
      <img src={asd} alt="asd" />
      <img src={asdf} alt="asdf" />
    </>
  );
};

export default App;
