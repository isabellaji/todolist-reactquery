import React from 'react';
import { authState, themeState } from 'store/atoms';
import { Aside, StyledHeader, Title } from './style';
import { useRecoilState } from 'recoil';
import { useMatch, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isDark, setIsDark] = useRecoilState(themeState);
  const [profile, setProfile] = useRecoilState(authState);
  const signupPage = useMatch('/auth/signup');
  const signinPage = useMatch('/auth/signin');
  const mainPage = useMatch('/*');
  const navigate = useNavigate();

  const onToggleThemeMode = () => {
    setIsDark((prev) => !prev);
  };

  const onClickSignout = () => {
    localStorage.removeItem('todos');
    setProfile({ userName: '' });
    navigate('/auth/signin');
  };

  return (
    <StyledHeader>
      <Title main={mainPage ? true : false}>
        {signupPage ? '회원가입' : signinPage ? '로그인' : `📝 ${profile.userName}'s To Do List`}
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
    </StyledHeader>
  );
};
