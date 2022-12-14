import React, { useState } from 'react';
import { authAPI } from 'apis/auth';
import { authState } from 'store/atoms';
import { MainLayout } from 'layouts';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestSignup>();

  const onValid = async ({ email, password, userName }: RequestSignup) => {
    setSignupError('');
    try {
      const user = await authAPI.signup({
        email,
        password,
        userName,
      });

      localStorage.setItem('todos', user.token);
      setProfile({ userName: userName });
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
            <div className="form__list">
              <label>이름</label>
              <input
                {...register('userName', { required: true })}
                type="text"
                autoComplete="off"
                placeholder="이름을 입력해 주세요"
                autoFocus
              />
              <p className="error__msg">{errors?.userName?.message}</p>
            </div>
            <div className="form__list">
              <label>이메일</label>
              <input
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /[\w-_.]+@[\w]+\.[\w.]+/,
                    message: '이메일 형식에 맞게 입력해 주세요',
                  },
                })}
                type="text"
                autoComplete="off"
                placeholder="이메일을 입력해 주세요"
              />
              <p className="error__msg">{errors?.email?.message}</p>
            </div>
            <div className="form__list">
              <label>비밀번호</label>
              <input
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: '비밀번호는 8자 이상 입력해 주세요',
                  },
                })}
                type="password"
                autoComplete="off"
                placeholder="비밀번호를 입력해 주세요"
              />
              <p className="error__msg">{errors?.password?.message}</p>
            </div>
            <p className="error__msg signup-err">{signupError}</p>
            <button className="submit__btn">회원가입하기</button>
          </Form>
        </FormBox>
      </Container>
    </MainLayout>
  );
};
