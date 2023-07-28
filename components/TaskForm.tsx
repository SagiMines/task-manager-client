'use client';
import userStore from '@/mobx/userStore';
import tasksStore from '@/mobx/tasksStore';
import { TaskFormProps } from '@/types';
import { flowResult } from 'mobx';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import Loader from './Loader';

const TaskForm = ({ taskId }: TaskFormProps) => {
  const getSpecificTask = () => {
    if (taskId) {
      const res = tasksStore.tasks?.find(task => task.id === taskId);
      if (res) {
        tasksStore.setCurrentTask(res);
        console.log(tasksStore.currentTask);
      }
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
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

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    tasksStore.updateTaskFormClick(true);
    tasksStore.setTaskDetailsError(null);
    if (taskId && tasksStore.currentTask) {
      if (
        !tasksStore.currentTask.description ||
        !tasksStore.currentTask.title
      ) {
        const error = 'Title and description cannot be empty!';
        tasksStore.setTaskDetailsError(error);
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
    } else if (tasksStore.newTask) {
      if (!tasksStore.newTask.description || !tasksStore.newTask.title) {
        const error = 'Title and description cannot be empty!';
        tasksStore.setTaskDetailsError(error);
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
    tasksStore.updateTaskFormClick(false);
    tasksStore.updateTasksViewClick();
  };

  useEffect(() => {
    getSpecificTask();
  }, []);
  return (
    <form className="m-5 w-fit mx-auto overflow-x-auto shadow-md rounded-2xl bg-gray-50">
      <div className="p-5">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>

        <input
          defaultValue={taskId ? tasksStore.currentTask?.title : ''}
          type="text"
          id="title"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
        />
      </div>
      <div className="p-5">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          defaultValue={taskId ? tasksStore.currentTask?.description : ''}
          id="description"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
        />
      </div>
      <div className="p-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Completed?
        </label>
        <label className="relative inline-flex items-center mb-4 cursor-pointer">
          <input
            key={Math.random()}
            id="completed"
            type="checkbox"
            defaultChecked={
              taskId
                ? tasksStore.currentTask?.completed
                : tasksStore.newTask?.completed === false ||
                  tasksStore.newTask?.completed === undefined
                ? false
                : true
            }
            className="sr-only peer"
            onChange={handleChange}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
        </label>
      </div>
      <div className="flex justify-center mb-5">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleClick}
        >
          {taskId ? `Edit Task` : 'Create Task'}
        </button>
        {tasksStore.taskDetailsError && (
          <p className="text-red-600 flex justify-center">
            {tasksStore.taskDetailsError}
          </p>
        )}
      </div>

      {tasksStore.taskFormClick && (
        <div className="m-5">
          <Loader taskFormAction />
        </div>
      )}
    </form>
  );
};

export default observer(TaskForm);
