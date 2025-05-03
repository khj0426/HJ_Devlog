export const debounce = (callback: () => void, time: number) => {
  let timer: NodeJS.Timer | null = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, time);
  };
};
