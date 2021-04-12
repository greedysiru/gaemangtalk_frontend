import { useState, useCallback } from 'react';

// input 데이터를 다루는 custom hook
export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, setValue, handler];
};
