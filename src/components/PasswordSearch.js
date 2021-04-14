import React from 'react';
import styled from 'styled-components';

const PasswordSearch = (props) => {
  return (
    <Container>
      <Input _onChange={onChangeSearchId}></Input>
      비밀번호 찾기
      <Button _onClick={searchPassword}>찾기</Button>
    </Container>
  );
};

PasswordSearch.propTypes = {};

export default PasswordSearch;
