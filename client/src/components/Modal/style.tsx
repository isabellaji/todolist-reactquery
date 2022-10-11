import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #353b48eb;
  .form__box {
    width: 50%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;

export const Form = styled.form`
  width: 100%;
  padding: 7em 5em 5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.theme.bgColor};

  input {
    padding: 1em;
    margin-bottom: 1em;
    font-family: 'Noto Sans KR', sans-serif;
  }

  textarea {
    padding: 1em;
    height: 200px;
    margin-bottom: 2em;
    font-family: 'Noto Sans KR', sans-serif;
  }

  .submit__btn {
    border: 0;
    padding: 1em;
    font-weight: 600;
    color: #dcdde1;
    background-color: ${(props) => props.theme.accentColor};
    font-family: 'Noto Sans KR', sans-serif;
    transition: 0.1s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: #7668e4;
    }
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 1.5em;
  right: 1.3em;
  border: 0;
  font-size: 1.5em;
  background-color: transparent;
  font-family: 'Noto Sans KR', sans-serif;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
