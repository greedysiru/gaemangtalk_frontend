import React from 'react';
import styled from 'styled-components';
import { BiX, BiCheck } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';

const InputValid = ({ isStart, isValid, children }) => {
  return (
    <Container isValid color={isStart ? (isValid ? 'green' : 'red') : 'gray'}>
      {!isStart && <BsDot />}
      {isStart && isValid && <BiCheck />}
      {isStart && !isValid && <BiX />}

      {children}
    </Container>
  );
};

InputValid.defaultProps = {
  isStart: false,
  isValid: false
};

const Container = styled.span`
  ${(props) => props.theme.flex_row};
  justify-content: flex-start;
  font-size: 0.75rem;
  color: ${(props) => props.color};
`;

export default InputValid;
