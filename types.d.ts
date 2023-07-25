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

export type FlowGenerator<Type, Return> = Generator<
  Promise<Response>,
  Return,
  T
>;
