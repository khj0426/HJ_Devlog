import React, { useCallback, useState } from 'react';

const useInput = (
  initialState: string,
  prevConditionCallback: (_e: React.ChangeEvent<HTMLInputElement>) => boolean
) => {
  const [value, setValue] = useState(initialState);
  const [error, setError] = useState(false);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!prevConditionCallback(e)) {
        setError(true);
        return;
      }
      setError(false);
      setValue(e.target.value);
    },
    [prevConditionCallback]
  );

  return {
    value,
    onChange,
    error,
    setValue,
  };
};

export default useInput;
