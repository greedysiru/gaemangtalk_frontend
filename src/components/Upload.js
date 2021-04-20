import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '../elements';
import { BiUser, BiCamera } from 'react-icons/bi';
import { utilActions } from '../redux/modules/util';

import styled from 'styled-components';

const Upload = ({ img }) => {
  const dispatch = useDispatch();
  //const { uploading, preview } = useSelector((state) => state.image);
  const userId = useSelector((state) => state.user.userInfo?.id);

  const uploading = null;
  const preview = null;
  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeImages = (e) => {
    //const reader = new FileReader();
    const formData = new FormData();

    const file = imageInput.current.files[0];
    console.log(file);
    formData.append('data', file);

    if (!file) return;

    dispatch(utilActions.uploadImage(userId, formData));
  };

  const deletePreview = (e) => {
    e.stopPropagation();
    //dispatch(imageActions.setPreview(null));
  };
  return (
    <Container onClick={onClickImageUpload}>
      {img ? (
        <Image src={img} />
      ) : (
        <Avatar>
          <BiUser />
        </Avatar>
      )}
      <BiCamera className="icon" />
      <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
        <input
          type="file"
          name="data"
          multiple
          hidden
          disabled={uploading}
          ref={imageInput}
          onChange={onChangeImages}
        />
      </form>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  &:hover {
    & .icon {
      //visibility: visible;
      opacity: 1;
    }
  }
  & .icon {
    position: relative;
    display: block;
    //visibility: hidden;
    opacity: 0;
    top: -30px;
    left: 80%;
    background-color: white;
    border-radius: 50%;
    padding: 4px;
    ${(props) => props.theme.border_box}
    width:30px;
    height: 30px;
    transition: 0.15s;
  }
`;

const Btn = styled.div`
  position: relative;
  left: 23vh;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 70px;
`;

const Avatar = styled.div`
  background-color: pink;
  width: 200px;
  height: 200px;
  border-radius: 80%;
  ${(props) => props.theme.flex_row};
  justify-content: center;
  color: white;
  font-size: 80px;
`;
export default Upload;
