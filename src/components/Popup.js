import React from 'react';

import styled from 'styled-components';

// elements
import { Input, Button } from '../elements';

// 방 생성 API
import { chatActions } from '../redux/modules/chat';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

import Upload from '../components/Upload';

// 채팅방 생성 창
const Popup = (props) => {
  const { closePopup, visible } = props;
  const dispatch = useDispatch();
  // 프리뷰 가져오기
  const preview = useSelector((state) => state.util.preview);
  // 채팅방 이름
  const [chatRoomName, setRoomName] = React.useState();

  // 방 이름 입력받기
  const onChangeRoomName = (e) => {
    setRoomName(e.target.value);
  }

  // 방 생성하기
  const onClickCreateRoom = () => {
    const data = {
      chatRoomImg: preview,
      chatRoomName: chatRoomName
    }
    dispatch(chatActions.createRoom(data, closePopup));
  }

  const popupInside = React.useRef();
  //  바깥 클릭시 팝업 끄기
  const clickOutside = ({ target }) => {
    if (!popupInside.current.contains(target)) {
      closePopup()
    }
  }

  React.useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, []);

  return (

    <PopupOverlay>
      <PopupInner ref={popupInside}>
        <InputWrap>
          <Input
            _onChange={onChangeRoomName}
            placeholder='채팅방 제목을 입력해주세요.'
          ></Input>
        </InputWrap>
        <Upload />
        <PopupButtons>
          <Button
            width="40%"
            _onClick={(e) => {
              onClickCreateRoom();
              e.stopPropagation();
            }
            }
          >생성</Button>
          <Button
            width="40%"
            _onClick={(e) => {
              closePopup();
              e.stopPropagation();
            }
            }
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

const PopupInner = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  width: 50%;
  height: 60%;
  background-color: whitesmoke;
  border-radius: 10px;
  top: 50%;
  margin: 0 auto;
  transform: translateY(-50%);

`

const PopupButtons = styled.div`
${(props) => props.theme.flex_row}
width: 80%;
margin: 0px 0px 20px 0px;
`

const InputWrap = styled.div`
  width: 80%;
  margin: 20px 0px;
`


export default Popup;