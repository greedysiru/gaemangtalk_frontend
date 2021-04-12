import React from 'react';
import styled from 'styled-components';

const Wrapper = (props) => {
  return <Container {...props}>{props.children}</Container>;
};

const Container = styled.div`
  width: ${(props) => (props.width ? props.width : '')};
  display: flex;
  height: ${(props) => (props.height ? props.height : '')};
  flex-direction: ${(props) => (props.is_column ? 'column' : 'row')};
  justify-content: ${(props) => (props.jc ? props.jc : 'center')};
  align-items: ${(props) => (props.ai ? props.ai : 'center')};
  background-color: ${(props) => props.bg};
`;

export default Wrapper;
