import { useEffect, useRef, useState } from 'react';

import { InfiniteQueryObserverResult } from '@tanstack/react-query';

type observerProps = {
  threshold: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
};

export default function useInfiniteQueryObserver({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: observerProps) {
  const target = useRef<HTMLDivElement | null>(null);
  const [isUserScrolling, setUserScrolling] = useState(false);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage && isUserScrolling) {
        fetchNextPage().then(() => setUserScrolling(false));
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setUserScrolling(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!target || !target.current) {
      return;
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });
    observer.observe(target?.current);
    return () => observer.disconnect();
  }, [target, threshold, observerCallback, isUserScrolling]);

  return {
    target,
  };
}
