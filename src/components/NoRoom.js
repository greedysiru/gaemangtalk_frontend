import React from 'react';
import styled from 'styled-components';

const NoRoom = (props) => {
  return (
    <Container>
      <img src="miniproject-7.png"></img>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.main_color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default NoRoom;
