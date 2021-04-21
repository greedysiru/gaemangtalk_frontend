import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";



const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
    MessageWrite,
    loading,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={13}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  // 메시지 작성 폼
  if (MessageWrite) {
    return (
      <React.Fragment>
        {loading ? (
          <ElMessageWrite
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          ></ElMessageWrite>
        ) : (
          <ElMessageWrite
            value="메시지 전송중 ..."

          >

          </ElMessageWrite>
        )}

      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {is_submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  MessageWrite: false,
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  is_submit: false,
  onSubmit: () => { },
  _onChange: () => { },
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

// 메시지 입력 폼
const ElMessageWrite = styled.input`
  background-color: ${(props) => props.theme.main_color_thick};
  border: none;
  width: 90%;
  margin-left: 10px;
  padding: 12px 4px;
  box-sizing: border-box;
  color: whitesmoke;
  font-size: 18px;
 
`

export default Input;
