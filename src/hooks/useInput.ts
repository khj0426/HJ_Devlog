import React, { useCallback, useState } from 'react';

const useInput = (
  initialState: string,
  prevConditionCallback: (_e: React.ChangeEvent<HTMLInputElement>) => boolean,
  isControlled?: boolean
) => {
  const [value, setValue] = useState(initialState);
  const [error, setError] = useState(false);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof isControlled === 'undefined' || isControlled === false) {
        return;
      }
      if (!prevConditionCallback(e)) {
        setError(true);
        return;
      }
      setError(false);

      if (isControlled) {
        setValue(e.target.value);
      }
    },
    [prevConditionCallback, isControlled]
  );

  return {
    value,
    onChange,
    error,
    setValue,
  };
};

export default useInput;
