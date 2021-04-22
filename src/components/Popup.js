import React from 'react';

import styled from 'styled-components';

// elements
import { Input, Button } from '../elements';

// 방 생성 API
import chat, { chatActions } from '../redux/modules/chat';

// 유틸
import { utilActions } from '../redux/modules/util';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

import Upload from '../components/Upload';

// select
import { Select } from '@class101/ui';

// 채팅방 생성 창
const Popup = (props) => {
  const { closePopup, visible } = props;
  const dispatch = useDispatch();
  // 프리뷰 가져오기
  const preview = useSelector((state) => state.util.preview);
  // 채팅방 이름
  const [chatRoomName, setRoomName] = React.useState();
  // 사용자가 고른 카테고리(태그) 가져오기
  const Tags = useSelector((state) => state.chat.selectedCategory);

  // 방 이름 입력받기
  const onChangeRoomName = (e) => {
    setRoomName(e.target.value);
  }

  // 방 생성하기
  const onClickCreateRoom = () => {

    const data = {
      chatRoomImg: preview,
      chatRoomName: chatRoomName,
      category: Tags,
    }
    dispatch(utilActions.setPreview(null));
    dispatch(chatActions.createRoom(data, closePopup));
  }

  const popupInside = React.useRef();
  //  바깥 클릭시 팝업 끄기
  const clickOutside = ({ target }) => {
    if (!popupInside.current.contains(target)) {
      closePopup()
    }
  }

  // 카테고리 선택
  const selectCategory = (e) => {
    // 같은 카테고리가 있으면 선택하지 못하게 하기
    if (Tags.includes(e.target.value)) {
      window.alert('중복해서 고를 수 없습니다.');
      return
    }
    dispatch(chatActions.setCategory(e.target.value));
  }

  // 태그 삭제
  const deleteCategory = (value) => {
    dispatch(chatActions.deleteCategory(value));
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
        <InputWrap>
          <Select
            value=""
            placeholder="채팅방 카테고리를 골라주세요"
            options={['REACT', 'SPRING', 'RN', 'NODEJS']}
            onChange={(e) => { selectCategory(e) }}
          />
        </InputWrap>
        <InputWrap>
          {Tags.map((t, idx) => {
            return (
              <TagWrap key={idx}>
                {t}
                <span onClick={
                  (e) => {
                    deleteCategory(t)
                    e.stopPropagation();
                  }}
                >
                  X
                </span>
              </TagWrap>
            )
          })}
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
              setRoomName('');
              dispatch(chatActions.clearCategory());
              dispatch(utilActions.setPreview(null));
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
  height: 70%;
  background-color: whitesmoke;
  border-radius: 10px;
  top: 50%;
  margin: 0 auto;
  transform: translateY(-50%);
  @media ${(props) => props.theme.mobile} {
    width: 90%
  }

`

const PopupButtons = styled.div`
${(props) => props.theme.flex_row}
width: 80%;
margin: 0px 0px 20px 0px;
`

const InputWrap = styled.div`
${(props) => props.theme.flex_row}
justify-content: center;
  width: 80%;
  margin: 10px 0px 10px 0px;
`
const TagWrap = styled.div`
${(props) => props.theme.flex_row}
margin: 0px 5px;
  padding: 5px;
  font-size: 1rem;
  background-color: orange;
  border-radius: 10px;
  color: whitesmoke;
  & span{
    cursor: pointer;
    font-size: 10px;
    margin-left: 5px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 0.7rem;
  }
`


export default Popup;