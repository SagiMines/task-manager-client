import tasksStore from '@/mobx/tasksStore';
import userStore from '@/mobx/userStore';
import {
  CheckIfUserAlreadyLoggedIn,
  HandleLogoutClick,
  HandleSignFormClick,
  HandleTaskForm,
  User,
} from '@/types';
import { flowResult } from 'mobx';

// Checks if we received a user or an error from the server
const isUser = (user: Record<'error', string> | User): user is User => {
  return (user as User).id !== undefined;
};

// Generic API fetcher
export const callAPI = async (
  route: RequestInfo,
  options?: RequestInit | undefined
) => {
  const req = await fetch(route, options);
  return req;
};

// Handle user's sign in/up click action
export const handleSignFormClick = async ({
  e,
  push,
  signIn,
}: HandleSignFormClick) => {
  e.preventDefault();
  userStore.setError('');
  userStore.setIsSignButtonClicked(true);
  if (signIn) {
    const res = await flowResult(userStore.verifyUser());
    if (res.error && typeof res.error === 'string') {
      userStore.setIsSignButtonClicked(false);
      userStore.setError(res.error);
    } else {
      if (typeof res.userId === 'number') {
        userStore.setUserId(res.userId);
        userStore.setIsSignButtonClicked(false);
        userStore.updateUsername('');
        userStore.updatePassword('');
        userStore.updateConfirmPassword('');
        push('/');
      }
    }
  } else {
    const res = await flowResult(userStore.createUser());
    if (isUser(res)) {
      userStore.setUserId(res.id);
      userStore.setIsSignButtonClicked(false);
      userStore.updateUsername('');
      userStore.updatePassword('');
      userStore.updateConfirmPassword('');
      push('/');
    } else {
      userStore.setIsSignButtonClicked(false);
      userStore.setError(res.error);
    }
  }
};

// If a user is already logged in the page will redirect to the main app
export const checkIfUserAlreadyLoggedIn = async ({
  push,
  route,
  mainRoute,
}: CheckIfUserAlreadyLoggedIn) => {
  const res = await flowResult(userStore.checkToken());
  userStore.setUserId(res.userId);
  if ((!mainRoute && res.userId) || (mainRoute && !res.userId)) {
    push(route);
  }
};

// Triggered when clicking the 'Log Out' button at the top right of the screen
export const handleLogoutClick = async ({ push }: HandleLogoutClick) => {
  const res = await flowResult(userStore.logout());
  if (res.done) {
    userStore.setUserId(null);
    push('/login');
  }
};

// Triggered when clicking the 'Edit' button: Sets the current task details that we are editing
export const getSpecificTask = (taskId: number) => {
  const res = tasksStore.tasks?.find(task => task.id === taskId);
  if (res) {
    tasksStore.setCurrentTask(res);
  }
};

// Triggered when changing the values in the task edit/create form
export const handleTaskFormChange = ({
  e,
  taskId,
}: HandleTaskForm<React.FormEvent<HTMLInputElement>>) => {
  const whichAttributeChanged = (e.target as HTMLInputElement).id;
  const value = (e.target as HTMLInputElement).value;
  const checked = (e.target as HTMLInputElement).checked;
  // If we are at the edit task section than the current task will be altered
  if (taskId && tasksStore.currentTask) {
    tasksStore.setCurrentTask({
      ...tasksStore.currentTask,
      [whichAttributeChanged]:
        whichAttributeChanged === 'completed' ? checked : value,
    });
  }
  // If we are at the create new task section than we will create a new task
  else {
    if (!tasksStore.newTask && userStore.userId) {
      tasksStore.updateNewTask({
        userId: userStore.userId,
        title: null,
        description: null,
        completed: false,
      });
    }
    if (tasksStore.newTask) {
      tasksStore.updateNewTask({
        ...tasksStore.newTask,
        [whichAttributeChanged]:
          whichAttributeChanged === 'completed' ? checked : value,
      });
    }
  }
};

// Triggered when subminting the create/edit task form
export const handleTaskFormClick = async ({
  e,
  taskId,
}: HandleTaskForm<React.FormEvent<HTMLButtonElement>>) => {
  e.preventDefault();
  tasksStore.updateTaskFormClick(true);
  tasksStore.setTaskDetailsError(null);
  // If we edit a task
  if (taskId && tasksStore.currentTask) {
    if (!tasksStore.currentTask.description || !tasksStore.currentTask.title) {
      const error = 'Title and description cannot be empty!';
      tasksStore.setTaskDetailsError(error);
      tasksStore.updateTaskFormClick(false);
    } else {
      const updatedTask = await flowResult(tasksStore.updateTask(taskId));
      if (tasksStore.tasks && updatedTask) {
        for (let i = 0; i < tasksStore.tasks.length; i++) {
          if (tasksStore.tasks[i].id === taskId) {
            tasksStore.tasks[i] = updatedTask;
            break;
          }
        }
      }
    }
  }
  // If we create a new task
  else if (tasksStore.newTask) {
    if (!tasksStore.newTask.description || !tasksStore.newTask.title) {
      const error = 'Title and description cannot be empty!';
      tasksStore.setTaskDetailsError(error);
      tasksStore.updateTaskFormClick(false);
    } else {
      const res = await flowResult(tasksStore.createTask());
      if (res) {
        if (!tasksStore.tasks) {
          tasksStore.updateTasks([res]);
        } else {
          tasksStore.updateTasks([...tasksStore.tasks, res]);
        }
      }
    }
  }
  if (!tasksStore.taskDetailsError) {
    tasksStore.updateTaskFormClick(false);
    tasksStore.updateTasksViewClick();
  }
};

// Triggered when clicking the 'Delete' button on the task list view: Deletes the selected task
export const handleTaskListDelete = async (taskId: number) => {
  // Delete the specific task
  await flowResult(tasksStore.deleteTask(taskId));
  // Get the updated task list
  if (userStore.userId) {
    const res = await flowResult(tasksStore.getTasks(userStore.userId));
    if (res instanceof Array) {
      tasksStore.updateTasks(res);
    } else {
      tasksStore.updateTasks([]);
    }
    tasksStore.setWhichTaskClicked(null);
  }
};

// Triggered when clicking the 'Edit' button on the task view: Shows the edit task form
export const handleTaskListEdit = (taskId: number) => {
  tasksStore.setWhichEditClicked(taskId);
};

// Triggered before loading the TaskList component via UseEffect: Update the tasks state from the database
export const getUserTasks = async () => {
  if (userStore.userId) {
    const res = await flowResult(tasksStore.getTasks(userStore.userId));
    if (res instanceof Array) {
      tasksStore.updateTasks(res);
    } else {
      tasksStore.updateTasks([]);
    }
  }
};

// Triggered when clicking on the sign up/sign in buttons in the login/register route
export const switchRoutes = () => {
  userStore.setIsSignButtonClicked(false);
  userStore.updateUsername('');
  userStore.updatePassword('');
  userStore.updateConfirmPassword('');
  userStore.setError('');
};
