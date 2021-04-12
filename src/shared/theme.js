const theme = {
  // 메인 테마 컬러 세가지
  main_color: '#5D6E91',
  theme_yellow: '#F9964f',
  theme_gray: '#EEEDED',
  // 메시지 색상
  message_you: '#EEEDED',
  message_me: '#174090',

  mobile: `(max-width: 767px)`,
  tablet: `(max-width: 1024px)`,
  desktop: `(min-width: 1025px)`,
  flex_column:
    'display: flex; flex-direction:column; align-items: center; justify-content: space-between; ',
  flex_row:
    'display: flex; align-items: center; justify-content: space-between;',
  default_width:
    'width:100vw; max-width:768px; box-sizing:border-box; padding:0 1rem',
  max_width: `max-width:768px`,
  border_box: `box-sizing:border-box`,

  responsiveContainer: `
  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1280px;
  }
  @media (max-width: 1312px) {
    width: 912px;
  }
  @media (max-width: 944px) {
    width: calc(100% - 2rem);
  }
  @media (max-width: 767px) {
    width: calc(100% - 2rem);
  }
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  `
};

export default theme;
