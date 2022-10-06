import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  font-size: 1.4em;
  background-color: ${(props) => props.theme.subBgColor};

  .list__section {
    width: 45%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${(props) => props.theme.borderColor};

    .list__wrapper {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
    li {
      padding: 1.5em 2em;
      margin: 1em 3em;
      border-radius: 0.5rem;
      background-color: ${(props) => props.theme.bgColor};
      border: 1px solid ${(props) => props.theme.borderColor};
      cursor: pointer;
    }
  }
  .detail {
    width: 55%;
    padding: 2em 2em 2em 0;
    border-left: 1px solid ${(props) => props.theme.borderColor};
    border-top: 1px solid ${(props) => props.theme.borderColor};
  }
`;

export const CreateBtn = styled.button`
  width: 81%;
  padding: 0.3rem;
  margin: 1em auto;
  font-size: 2em;
  border: 0;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    border: 1px solid ${(props) => props.theme.accentColor};
    transition: 0.1s ease-in-out;
  }
`;
