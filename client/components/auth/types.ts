type Auth = {
  data: UserData;
  changeData: (data: Partial<UserData>) => void;
};

export type AuthName = Auth & {
  changePage: (num: 1 | -1) => void;
};

export type AuthPassword = AuthName & {
  submitHandler: () => void;
};

export type UserData = {
  password: string;
  name: string;
  photo: File | null;
  background: string;
};
