import { useState } from 'react';

export default function useBoolean() {
  const [state, setState] = useState(false);

  const toggle = () => {
    setState(!state);
  };

  const setTrue = () => {
    setState(true);
  };

  const setFalse = () => {
    setState(false);
  };

  return {
    state,
    toggle,
    setTrue,
    setFalse,
  };
}
