'use client';
import tasksStore from '@/mobx/tasksStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { flowResult } from 'mobx';
import userStore from '@/mobx/userStore';
import Loader from './Loader';

const TasksList = () => {
  const handleDelete = async (taskId: number) => {
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

  const handleEdit = (taskId: number) => {
    tasksStore.setWhichEditClicked(taskId);
  };

  const getUserTasks = async () => {
    if (userStore.userId) {
      const res = await flowResult(tasksStore.getTasks(userStore.userId));
      if (res instanceof Array) {
        tasksStore.updateTasks(res);
      } else {
        tasksStore.updateTasks([]);
      }
    }
  };

  // Get the user's tasks
  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <div
      className={`m-5 w-fit sm:mx-auto overflow-x-auto rounded-lg ${
        tasksStore.tasks && tasksStore.tasks.length ? 'shadow-md' : ''
      }`}
    >
      {!tasksStore.tasks && <Loader />}
      {tasksStore.tasks && !tasksStore.tasks.length && (
        <div className="text-xl font-bold text-rose-600">
          No tasks available.
        </div>
      )}
      {tasksStore.tasks && tasksStore.tasks?.length !== 0 && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-5 sm:px-6 py-3">Title</th>
              <th className="px-5 sm:px-6 py-3">Description</th>
              <th className="px-5 sm:px-6 py-3">Completed</th>
              <th className="px-5 sm:px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasksStore.tasks?.map(task => (
              <tr
                key={task.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th className="px-5 sm:px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {task.title}
                </th>
                <td className="px-5 sm:px-6 py-3">{task.description}</td>
                <td className="px-5 sm:px-6 py-3">
                  {task.completed ? 'Yes' : 'No'}
                </td>
                <td className="flex gap-3 px-5 sm:px-6 py-3">
                  <span
                    onClick={() => handleEdit(task.id)}
                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => handleDelete(task.id)}
                    className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </span>
                  {tasksStore.whichTaskClicked === task.id && (
                    <span>
                      <Loader taskAction />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default observer(TasksList);
