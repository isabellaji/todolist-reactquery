import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 1em;
  margin: 0 auto;
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5em;
  padding: 2em 2em 3em;
  border-radius: 0.3rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.subBgColor};
`;

export const Form = styled.form`
  .form__list {
    display: flex;
    flex-direction: column;
    label {
      font-size: 1.4em;
      padding: 0.8em 0;
    }
    input {
      padding: 1em;
      border-radius: 0.3rem;
      background-color: transparent;
      color: ${(props) => props.theme.textColor};
      border: 1px solid ${(props) => props.theme.borderColor};
      background-color: ${(props) => props.theme.bgColor};
      ::placeholder {
        color: ${(props) => props.theme.borderColor};
      }
    }
  }
  .submit__btn {
    width: 100%;
    padding: 1em;
    margin-top: 0.4em;
    font-weight: 600;
    border-radius: 0.3rem;
    border: 0;
    color: #f5f6fa;
    background-color: ${(props) => props.theme.accentColor};
    transition: 0.1s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: #7668e4;
    }
  }
  .error__msg {
    font-size: 1.1em;
    height: 1.2rem;
    color: #ff003e;
    padding-top: 0.6rem;
  }
  .signup-err {
    padding-top: 0;
  }
`;
