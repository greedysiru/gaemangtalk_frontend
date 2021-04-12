import React from 'react';

import styled from 'styled-components';

// elements
import { Input, Button } from '../elements';

// 채팅방 생성 창
const Popup = (props) => {
  const { closePopup } = props;

  const popupInside = React.useRef();
  //  바깥 클릭시 팝업 끄기
  const clickOutside = ({ target }) => {
    console.log('함수')
    if (!popupInside.current.contains(target)) {
      closePopup()
    }
  }

  React.useEffect(() => {
    console.log('마운트')
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, []);

  return (

    <PopupOverlay>
      <PopupInner ref={popupInside}>
        <Input
        ></Input>
        <PopupButtons>
          <Button
            width="40%"
          >생성</Button>
          <Button
            width="40%"
            _onClick={closePopup}
          >취소</Button>
        </PopupButtons>
      </PopupInner>
    </PopupOverlay >
  )

}


const PopupOverlay = styled.div`
  ${(props) => props.theme.border_box};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`
const PopupWrapper = styled.div`
${(props) => props.theme.border_box}
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
width: 50%;
height: 50%;
z-index: 3;
`

const PopupInner = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  width: 50%;
  height: 50%;
  background-color: whitesmoke;
  border-radius: 10px;
  top: 50%;
  margin: 0 auto;
  transform: translateY(-50%);

`

const PopupButtons = styled.div`
${(props) => props.theme.flex_row}
width: 90%;
margin: 0px 0px 20px 0px;
`


export default Popup;