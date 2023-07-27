import { NewTask, Task } from '@/types';
import { callAPI } from './globalFunctions';

export const getUserTasksFromAPI = async (userId: number) => {
  const req = await callAPI(`http://localhost:8080/tasks?userId=${userId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const res = await req.json();
  return res;
};

export const getUserSpecificTask = async (taskId: number) => {
  const req = await callAPI(`http://localhost:8080/task/${taskId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const res = await req.json();
  return res;
};

export const deleteSpecificTask = async (taskId: number) => {
  const req = await callAPI(`http://localhost:8080/task/${taskId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  const res = await req.json();
  return res;
};

export const updateSpecificTask = async (taskId: number, updatedTask: Task) => {
  const req = await callAPI(`http://localhost:8080/task/${taskId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(updatedTask),
  });
  const res = await req.json();
  return res;
};

export const createNewTask = async (newTask: NewTask) => {
  const req = await callAPI(`http://localhost:8080/task`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(newTask),
  });
  const res = await req.json();
  return res;
};
