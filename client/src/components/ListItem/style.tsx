import styled from 'styled-components';

export const Container = styled.li<{ isClicked: boolean }>`
  width: 100%;
  margin: 1em auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.isClicked ? props.theme.accentColor : props.theme.bgColor)};
  color: ${(props) => (props.isClicked ? '#dcdde1' : props.theme.textColor)};
  border: 1px solid ${(props) => props.theme.borderColor};
  transition: 0.1s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    color: #dcdde1;
  }

  a {
    width: 80%;
    overflow: hidden;
    padding: 1.5em 2em;
    text-overflow: ellipsis;
  }

  .item__utils {
    width: 20%;
    margin: 0.5em 1em;
    button {
      background-color: transparent;
      border: 0;
      margin: 1em 0.2em;
      padding: 0.3em;
      cursor: pointer;
    }
  }
`;
