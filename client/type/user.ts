export type User = {
  photo?: string;
  id: string;
  name: string;
};

export type UserBD = {
  createdAt: string;
  id: string;
  name: string;
  photo: string | null;
  updatedAt: string;
  online: boolean;
};
