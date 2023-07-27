export type Task = {
  id: number;
  userId: number;
  title: string;
  description: string;
  completed: boolean;
};

export type NewTask = {
  userId: number | null;
  title: string | null;
  description: string | null;
  completed: boolean | null;
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

export type LoaderProps = {
  taskAction?: boolean;
};

export type TaskFormProps = {
  taskId?: number;
};

export type CheckIfRequiredFieldsAreFilled = {
  title: string | null;
  description: string | null;
};
