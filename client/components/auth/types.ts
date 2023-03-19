export type Auth = {
  nextPage: () => void;
  data: UserData;
  changeData: (data: Partial<UserData>) => void;
};

export type UserData = {
  password: string;
  name: string;
  photo: File | null;
};
