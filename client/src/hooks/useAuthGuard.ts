import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectMyData } from '@/store/selectors';

export const useAuthGuard = (isAllowed: boolean = true) => {
  const { push } = useRouter();

  const me = useAppSelector(selectMyData);
  useEffect(() => {
    if (isAllowed && me) {
      push('/main');
    }

    if (!isAllowed && !me) {
      push('/auth');
    }
  }, [me, isAllowed, push]);
};
