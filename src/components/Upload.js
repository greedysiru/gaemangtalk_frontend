import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '../elements';
import { BiUser, BiCamera } from 'react-icons/bi';
import { utilActions } from '../redux/modules/util';

import styled from 'styled-components';

const Upload = ({ img }) => {
  const dispatch = useDispatch();
  //const { uploading, preview } = useSelector((state) => state.image);
  const userId = useSelector((state) => state.user.userInfo?.id);
  const preview = useSelector((state) => state.util.preview);
  useEffect(() => {
    if (img) {
      dispatch(utilActions.setPreview(img));
    }
    return () => {
      dispatch(utilActions.setPreview(null));
    };
  }, []);

  useEffect(() => {}, [preview]);
  const uploading = null;
  const imageInput = useRef();

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeImages = (e) => {
    const formData = new FormData();

    const file = imageInput.current.files[0];

    formData.append('data', file);

    if (!file) return;

    dispatch(utilActions.uploadImage(userId, formData));
  };

  return (
    <Container onClick={onClickImageUpload}>
      {preview ? (
        <Image src={preview} />
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
      opacity: 1;
    }
  }
  & .icon {
    position: relative;
    display: block;
    opacity: 0;
    top: -30px;
    left: 80%;
    background-color: ${(props) => props.theme.main_color};
    color: ${(props) => props.theme.theme_gray};
    border-radius: 50%;
    padding: 4px;
    ${(props) => props.theme.border_box}
    width:30px;
    height: 30px;
    transition: 0.15s;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 70px;
`;

const Avatar = styled.div`
  background-color: ${(props) => props.theme.main_color_blur};
  width: 200px;
  height: 200px;
  border-radius: 70px;
  ${(props) => props.theme.flex_row};
  justify-content: center;
  color: ${(props) => props.theme.theme_yellow};
  font-size: 80px;
`;
export default Upload;
