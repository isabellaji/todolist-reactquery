import React, { useEffect, useState } from 'react';
import { authAPI } from 'apis/auth';
import { authState } from 'store/atoms';
import { MainLayout } from 'layouts';
import { AuthInput } from 'components';
import { RequestSignin } from 'types/auth';
import { Container, Form, FormBox, SignupBtn } from './style';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const SigninPage = () => {
  const [signinError, setSigninError] = useState('');
  const setProfile = useSetRecoilState(authState);
  const navigate = useNavigate();
  const { handleSubmit } = useForm<RequestSignin>();

  const onClickSignup = () => {
    navigate('/auth/signup');
  };
  const onValid = async ({ email, password }: RequestSignin) => {
    setSigninError('');
    try {
      const user = await authAPI.signin({
        email,
        password,
      });
      localStorage.setItem('todos', user.token);
      setProfile({ email: email, userName: user.userName });
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        setSigninError(`❎ ${error.response?.data.details}`);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('todos');
    token && navigate('/');
  });

  return (
    <MainLayout>
      <Container>
        <FormBox>
          <Form onSubmit={handleSubmit(onValid)}>
            <AuthInput
              value="email"
              type="text"
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              pattern={/[\w-_.]+\@[\w]+\.[\w.]+/}
              patternMsg="이메일 형식에 맞게 입력해 주세요"
              autoFocus={true}
            />
            <AuthInput
              value="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              minLength={8}
              minLengthMsg="비밀번호는 8자 이상 입력해 주세요"
            />
            <p className="error__msg signin-err">{signinError}</p>
            <button className="submit__btn">로그인</button>
          </Form>
          <SignupBtn onClick={onClickSignup}>회원가입</SignupBtn>
        </FormBox>
      </Container>
    </MainLayout>
  );
};
