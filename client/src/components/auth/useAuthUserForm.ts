import { ChangeEvent, FormEvent, useState } from 'react';
import { UserAPI } from '@/api/user';
import { AuthName } from './types';
import { IMG_TYPES_TEXT_ERROR, VALID_IMG_TYPES } from '@/utils/constants';

export const useAuthUserForm = ({ changePage, changeData, data }: AuthName) => {
  const [errorText, setErrorText] = useState('');

  const onSelectFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    if (!VALID_IMG_TYPES.includes(target.files[0].type)) {
      setErrorText(IMG_TYPES_TEXT_ERROR);
      changeData({ photo: undefined });
      return;
    }

    setErrorText('');
    changeData({ photo: target.files[0] });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await UserAPI.checkName(data.name);
      changePage(1);
    } catch (error: any) {
      setErrorText(error.response.data?.message as string);
    }
  };

  return {
    onSelectFile,
    onSubmit,
    errorText,
  };
};
