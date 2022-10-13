import React, { useState } from 'react';
import { authAPI } from 'apis/auth';
import { authState } from 'store/atoms';
import { MainLayout } from 'layouts';
import { AuthInput } from 'components';
import { RequestSignup } from 'types/auth';
import { Container, Form, FormBox } from './style';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const SignupPage = () => {
  const [signupError, setSignupError] = useState('');
  const setProfile = useSetRecoilState(authState);
  const navigate = useNavigate();
  const { handleSubmit } = useForm<RequestSignup>();

  const onValid = async ({ email, password, userName }: RequestSignup) => {
    setSignupError('');
    try {
      const user = await authAPI.signup({
        email,
        password,
        userName,
      });

      localStorage.setItem('todos', user.token);
      setProfile({ email: email, userName: userName });
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        setSignupError(`❎ ${error.response?.data.details}`);
      }
    }
  };

  return (
    <MainLayout>
      <Container>
        <FormBox>
          <Form onSubmit={handleSubmit(onValid)}>
            <AuthInput
              value="userName"
              type="text"
              label="이름"
              placeholder="이름을 입력해 주세요"
              autoFocus={true}
            />
            <AuthInput
              value="email"
              type="text"
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              pattern={/[\w-_.]+\@[\w]+\.[\w.]+/}
              patternMsg="이메일 형식에 맞게 입력해 주세요"
            />
            <AuthInput
              value="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              minLength={8}
              minLengthMsg="비밀번호는 8자 이상 입력해 주세요"
            />
            <p className="error__msg signup-err">{signupError}</p>
            <button className="submit__btn">회원가입하기</button>
          </Form>
        </FormBox>
      </Container>
    </MainLayout>
  );
};
