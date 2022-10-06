import styled from 'styled-components';

export const StyledHeader = styled.header`
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1<{ main: boolean }>`
  font-size: ${(props) => (props.main ? '2.6em' : '1.4rem')};
  font-weight: 600;
`;

export const Aside = styled.div`
  position: absolute;
  top: 1rem;
  right: 1em;
  display: flex;
  align-items: center;
  .theme__btn {
    border: 0;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.subBgColor};
    border: 1px solid ${(props) => props.theme.subBgColor};
    border-radius: 0.5rem;
    padding: 0.3em 1em;
    cursor: pointer;
    box-sizing: border-box;
    transition: 0.1s ease-in-out;
    .theme__text {
      color: ${(props) => props.theme.textColor};
      padding-left: 0.5em;
      font-family: 'Noto Sans KR', sans-serif;
    }
    &:hover {
      border: 1px solid ${(props) => props.theme.accentColor};
    }
  }
  .signout__btn {
    font-size: 1.4em;
    letter-spacing: -0.5px;
    margin-left: 0.3em;
    color: ${(props) => props.theme.textColor};
    border: 0;
    background-color: transparent;
    font-family: 'Noto Sans KR', sans-serif;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
