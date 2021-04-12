import React from 'react';
import styled from 'styled-components';

const I = (props) => {
  const { size, color, children, _onClick } = props;
  const styles = { size, color };
  return (
    <Ic onClick={_onClick} {...styles}>
      {children}
    </Ic>
  );
};

I.defaultProps = {
  children: null,
  color: 'white',
  size: '1em',
  _onClick: () => {},
  border: '1px solid white',
  radius: '5px'
};

const Ic = styled.span`
  transition: 0.3s all;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.radius};
  margin: 2px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.is_hover ? 'rgb(223, 223, 223, 0.5)' : ''};
  }
  & > * {
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
  }
`;

export default I;
