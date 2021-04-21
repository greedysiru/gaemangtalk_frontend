import React from 'react';
import styled from 'styled-components';

const NoRoom = (props) => {
  return <Container></Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  //background-color: ${(props) => props.theme.main_color};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('miniproject-7.png');
  background-size: contain;
  background-position: center center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 100vh;
  }
`;

export default NoRoom;
