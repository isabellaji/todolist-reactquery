import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  font-size: 1.4em;
  background-color: ${(props) => props.theme.subBgColor};
`;

export const ListSection = styled.section`
  width: 45%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${(props) => props.theme.borderColor};

  .list__wrapper {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
`;

export const ListItem = styled.li<{ isClicked: boolean }>`
  width: 80%;
  margin: 1em auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.isClicked ? props.theme.accentColor : props.theme.bgColor)};
  border: 1px solid ${(props) => props.theme.borderColor};
  transition: 0.1s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }

  a {
    padding: 1.5em 8em 1.5em 2em;
  }

  .item__utils {
    padding: 1.5em 2em;

    button {
      background-color: transparent;
      border: 0;
      cursor: pointer;
    }
  }
`;

export const CreateBtn = styled.button`
  width: 80%;
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

export const DescriptionSection = styled.section`
  width: 55%;
  padding-top: 2em;
  border-left: 1px solid ${(props) => props.theme.borderColor};
  border-top: 1px solid ${(props) => props.theme.borderColor};
  h2 {
    font-size: 1.2em;
    font-weight: 600;
    width: 80%;
    margin: 1.5em auto;
    color: ${(props) => props.theme.accentColor};
  }

  .description__item {
    min-height: 200px;
    width: 80%;
    margin: 1em auto;
    padding: 1.5em 2em;
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.borderColor};
  }
`;

export const Loader = styled.span`
  text-align: center;
  display: block;
`;
