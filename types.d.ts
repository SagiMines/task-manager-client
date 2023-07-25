export type Task = {
  id: number;
  userId: number;
  title: string;
  description: string;
  completed: boolean;
};

export type UserCredentials = {
  username: string;
  password: string;
};
