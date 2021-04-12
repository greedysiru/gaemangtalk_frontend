import React from 'react';
import styled from 'styled-components';
const Header = (props) => {
  return <Container>헤더</Container>;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.main_color};
  ${(props) => props.theme.border_box};
  width: 100%;
  height: 10%;
  padding: 1rem;

  ${(props) => props.theme.flex_column};
  justify-content: center;

  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
    align-items: flex-start;
    width: 10%;
    height: 100%;
  }
`;
export default Header;
