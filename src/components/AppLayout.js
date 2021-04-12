import React from 'react';
import styled from 'styled-components';
import Header from './Header';
function AppLayout(props) {
  return (
    <Container>
      <Header />
      <Main>{props.children}</Main>
    </Container>
  );
}

const Container = styled.div``;
const Main = styled.div``;

export default AppLayout;
