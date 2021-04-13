import React from 'react';
import { Text } from '../elements';

const ErrorMsg = (props) => {
  const { valid, children } = props;
  return valid ? (
    <Text size="12px" color="red">
      {children}
    </Text>
  ) : null;
};

ErrorMsg.defaultProps = {
  valid: false,
  children: null
};

export default ErrorMsg;
