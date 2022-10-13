import styled from 'styled-components';

export const FormList = styled.div`
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
`;
