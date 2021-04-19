import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Upload from '../components/Upload';
import { userActions } from '../redux/modules/user';

const UserInfo = (props) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Upload />
    </Container>
  );
};

const Container = styled.div`
  font-size: 100px;
`;

export default UserInfo;
