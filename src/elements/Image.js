import styled from 'styled-components';
import React from 'react';

const Image = (props) => {
  let { shape, src, size, width, height } = props;

  // porps로 가져온 사진이 null인 경우 기본 프로필로 설정
  if (src === null) {
    src = '/default_img.png';
  }
  const styles = {
    src: src,
    size: size,
    width: width,
    height: height
  };

  if (shape === 'circle') {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: 'circle',
  src: '/default_img.png',
  size: '30px'
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

const AspectOutter = styled.div`
  width: 100%;
  object-fit: cover;
`;

const AspectInner = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: center;
  padding-top: 75%;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-color: ${(props) => props.theme.main_color_blur};
  margin: 4px;
`;

export default Image;
