import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '../elements';
import { BiUser } from 'react-icons/bi';
//import { actionCreators as imageActions } from '../redux/modules/image';
//import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

const Upload = () => {
  const dispatch = useDispatch();
  //const { uploading, preview } = useSelector((state) => state.image);
  const uploading = null;
  const preview = null;
  const imageInput = useRef();

  const onClickImageUpload = () => {
    console.log('힝');
    imageInput.current.click();
  };

  const onChangeImages = (e) => {
    const reader = new FileReader();
    const file = imageInput.current.files[0];
    if (!file) return;
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      //dispatch(imageActions.setPreview(reader.result));
    };
  };

  const deletePreview = (e) => {
    e.stopPropagation();
    //dispatch(imageActions.setPreview(null));
  };
  return (
    <Wrapper>
      <Avatar onClick={onClickImageUpload}>
        {/* <Image
          src={
            'https://firebasestorage.googleapis.com/v0/b/my-taste-e6d3f.appspot.com/o/noImage.png?alt=media&token=fc22498a-b954-42db-9683-5a958795adb0'
          }
        /> */}
        <BiUser />
      </Avatar>

      <input
        type="file"
        name="image"
        multiple
        hidden
        disabled={uploading}
        ref={imageInput}
        onChange={onChangeImages}
      />
    </Wrapper>
  );
};

const Btn = styled.div`
  position: relative;
  left: 23vh;
`;

const Wrapper = styled.div`
  cursor: pointer;
`;

const Image = styled.img``;

const Avatar = styled.div``;
export default Upload;
