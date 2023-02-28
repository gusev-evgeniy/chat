import { useMemo, useState } from 'react';
import { UserAPI } from 'api/user';
import { Auth } from './types';

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const TEXT_ERROR = `
Invalid file type.
Please select .jpg, .jpeg or .png file. 
`;

export const useAuthUserForm = ({ nextPage, changeData, data }: Auth) => {
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await UserAPI.checkName(data.name);
      nextPage();
    } catch (error: any) {
      setErrorText(error.response.data?.message as string);
    }
  };

  return useMemo(
    () => ({
      onSelectFile,
      onSubmit,
      errorText,
    }),
    [errorText, data]
  );
};
