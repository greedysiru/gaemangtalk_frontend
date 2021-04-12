import React from 'react';


// History
import { withRouter } from 'react-router';
import { history } from '../redux/configureStore';


// 없는 경로에 들어오면 보여줄 컴포넌트
const NotFound = (props) => {
  return (
    <div>
      임시페이지입니다! 추후에 NotFound로 사용할 예정
    </div>
  )
}

export default NotFound;