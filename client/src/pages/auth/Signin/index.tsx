import { authAPI } from 'apis/auth';
import { authState } from 'store/atoms';
import { Container, Form, FormBox, SignupBtn } from './style';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface FromData {
  email: string;
  password: string;
}

export const SigninPage = () => {
  const [signinError, setSigninError] = useState('');
  const setProfile = useSetRecoilState(authState);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FromData>();

  const onClickSignup = () => {
    navigate('/auth/signup');
  };
  const onValid = async ({ email, password }: FromData) => {
    setSigninError('');
    try {
      const user = await authAPI.signin({
        email,
        password,
      });
      window.sessionStorage.setItem('todos', user.token);
      setProfile({ email: email, userName: user.userName });
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        setSigninError(`❎ ${error.response?.data.details}`);
      }
    }
  };

  return (
    <Container>
      <h1>로그인</h1>
      <FormBox>
        <Form onSubmit={handleSubmit(onValid)}>
          <div className="form__list">
            <label>이메일</label>
            <input
              {...register('email', {
                required: true,

                pattern: {
                  value: /[\w-_.]+\@[\w]+\.[\w.]+/,
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
          <p className="error__msg signin-err">{signinError}</p>
          <button className="submit__btn">로그인</button>
        </Form>
        <SignupBtn onClick={onClickSignup}>회원가입</SignupBtn>
      </FormBox>
    </Container>
  );
};
