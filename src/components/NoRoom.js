import React from 'react';
import styled from 'styled-components';

const NoRoom = (props) => {
  return <Container></Container>;
};

const Container = styled.div`
  width: 70%;
  height: 100%;
  background-color: ${(props) => props.theme.main_color};
  background-image: url('miniproject-7.png');
  background-size: cover;
  background-position: center center;
`;

export default NoRoom;
