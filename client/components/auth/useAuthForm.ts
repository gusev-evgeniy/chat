import { useMemo, useState } from 'react';
import { instance } from '../../api';
import { Auth } from './types';

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const TEXT_ERROR = `
Invalid file type.
Please select .jpg, .jpeg or .png file. 
`;

export const useAuthForm = ({ nextPage, changeData, data }: Auth) => {
  const [errorText, setErrorText] = useState('');

  const onSelectFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    if (!VALID_TYPES.includes(target.files[0].type)) {
      setErrorText(TEXT_ERROR);
      changeData({ photo: undefined });
      return;
    }

    setErrorText('');
    changeData({ photo: target.files[0] });
  };

  const onKeyChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    changeData({ name: target.value.trim() });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await instance.post('/user/check_name', { name: data.name });
      nextPage();
    } catch (error: any) {
      setErrorText(error.response.data?.message as string);
    }
  };

  return useMemo(
    () => ({
      onSelectFile,
      onKeyChange,
      onSubmit,
      errorText
    }),
    [errorText]
  );
};
