import { useRecoilState, useRecoilValue } from 'recoil';

import {
  queryObjectAtom,
  queryObjectSelector,
} from '@/app/Providers/Recoil/globalAtom';

export const useQueryString = () => {
  const [queryObject, setQueryObject] = useRecoilState(queryObjectAtom);
  const queryString = useRecoilValue(queryObjectSelector);

  return {
    queryObject,
    setQueryObject,
    queryString,
  };
};
