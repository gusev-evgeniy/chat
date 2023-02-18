import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectMyData } from '../store/selectors';

export const useNotAuth = () => {
  const { id } = useAppSelector(selectMyData) || {};

  const { push } = useRouter();

  useEffect(() => {
    !id && push('/auth');
  }, [id]);
};
