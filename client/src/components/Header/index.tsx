import { authState, themeState } from 'store/atoms';
import { Aside, Title } from './style';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMatch, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isDark, setIsDark] = useRecoilState(themeState);
  const setProfile = useSetRecoilState(authState);
  const signupPage = useMatch('/auth/signup');
  const signinPage = useMatch('/auth/signin');
  const mainPage = useMatch('/');
  const navigate = useNavigate();

  const onToggleThemeMode = () => {
    setIsDark((prev) => !prev);
  };
  const onClickSignout = () => {
    window.localStorage.removeItem('todos');
    setProfile({ email: '', userName: '' });
    navigate('/auth/signin');
  };

  return (
    <header>
      <Title main={mainPage ? true : false}>
        {signupPage ? '회원가입' : signinPage ? '로그인' : '📝 To Do List'}
      </Title>
      <Aside>
        <button className="theme__btn" onClick={onToggleThemeMode}>
          <span className="theme__icon">{isDark ? '☀️' : '🌙'}</span>
          <span className="theme__text">{isDark ? 'Light' : 'Dark'}</span>
        </button>
        {mainPage && (
          <button className="signout__btn" onClick={onClickSignout}>
            로그아웃
          </button>
        )}
      </Aside>
    </header>
  );
};
