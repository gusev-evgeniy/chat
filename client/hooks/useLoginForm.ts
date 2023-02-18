import { useMemo, useState } from "react";
import { instance } from "../api";
import { useAppDispatch } from "../store/hooks";
import { setUserData } from "../store/slices/user";

const DEFAULT_DATA = {
  errorText: '',
  name: '',
  password: ''
}

export type LoginKeysData = keyof typeof DEFAULT_DATA;

export const useLoginForm = () => {
  const [data, setData] = useState(DEFAULT_DATA)

  const dispatch = useAppDispatch();

  const changeData = (type: LoginKeysData, value: string) => {
    setData(prev => ({...prev, [type]: value}));
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, password } = data;

    try {
      const res = await instance.get(
        `/user/login?name=${name}&password=${password}`
      );

      dispatch(setUserData(res.data.user));
    } catch (error: any) {
      changeData("errorText", error.response.data?.message as string)
    }
  };

  return useMemo(() => ({
    onSubmitHandler,
    data,
    changeData
  }), [data])
}