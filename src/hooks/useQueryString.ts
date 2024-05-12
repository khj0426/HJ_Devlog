'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

export default function useQueryString(
  key: string,
  defaultValue: string | (() => string)
): [string, Dispatch<SetStateAction<string>>] {
  const queryString = useSearchParams();

  const queryStringValue =
    queryString?.get(key) ??
    (typeof defaultValue === 'function' ? defaultValue() : defaultValue);

  const [queryStringState, setQueryStringState] = useState(queryStringValue);

  useEffect(() => {
    setQueryStringState(
      queryString.get(key) ??
        (typeof defaultValue === 'function' ? defaultValue() : defaultValue)
    );
  }, [defaultValue, key, queryString]);

  return [queryStringState, setQueryStringState];
}
