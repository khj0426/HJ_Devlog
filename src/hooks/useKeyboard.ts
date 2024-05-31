import {
  useEffect,
  useRef,
  MutableRefObject,
  useCallback,
  KeyboardEvent,
} from 'react';

interface UseKeyboardProps {
  keys: {
    [key: string]: (_e: KeyboardEvent) => void;
  };

  event?: 'keyup' | 'keypress' | 'keydown';
  ref?: MutableRefObject<HTMLElement | null>;
}

export default function useKeyboard(props: UseKeyboardProps) {
  const { ref, keys, event = 'keydown' } = props;
  const element = useRef<HTMLElement | Document>(document);

  const handleKeyEvent = useCallback(
    (e: Event | KeyboardEvent) => {
      if ('key' in e) {
        keys[e.key](e);
      }
    },
    [keys]
  );

  useEffect(() => {
    if (ref && ref.current) {
      element.current = ref.current;
    }

    element.current.addEventListener(event, handleKeyEvent);
  }, [event, handleKeyEvent, ref]);
}
