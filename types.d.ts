export type Task = {
  id: number;
  userId: number;
  title: string;
  description: string;
  completed: boolean;
};

export type User = {
  id: number;
  username: string;
  password: string;
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
  confirmPassword?: string;
};

export type FlowGenerator<Type, Return> = Generator<
  Promise<Response>,
  Return,
  T
>;

export type LoaderProps = {
  taskAction?: boolean;
  signAction?: boolean;
  taskFormAction?: boolean;
};

export type TaskFormProps = {
  taskId?: number;
};

export type CheckIfRequiredFieldsAreFilled = {
  title: string | null;
  description: string | null;
};

export type SignFormProps = {
  signIn?: boolean;
};

export type HandleSignFormClick = {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  push: (href: string, options?: NavigateOptions | undefined) => void;
  signIn?: boolean;
};

export type CheckIfUserAlreadyLoggedIn = {
  push: (href: string, options?: NavigateOptions | undefined) => void;
  route: string;
  mainRoute?: boolean;
};

export type HandleLogoutClick = {
  push: (href: string, options?: NavigateOptions | undefined) => void;
};

export type HandleTaskForm<T> = {
  e: T;
  taskId?: number;
};

export type SignFormInputProps = {
  label: string;
  type: string;
  nameAndIdAndHtmlFor: 'username' | 'password' | 'confirmPassword';
  placeholder: string;
  onChangeName: 'updateUsername' | 'updatePassword' | 'updateConfirmPassword';
};
