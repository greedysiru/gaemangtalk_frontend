//패스워드 체크 정규식
export const testPwValid = (pw) => {
  const _reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{10,}$/;
  return _reg.test(pw) && pw.search(/\s/) == -1 ? true : false;
};

export const testRepatNumber = (pw) => {
  const _reg = /(\d)\1\1/;
  return !_reg.test(pw);
};

//이메일 체크 정규식
export const testEmailValid = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return _reg.test(email);
};
