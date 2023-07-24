import { callAPI } from './globalFunctions';

export const getTasksFromAPI = async () => {
  const req = await callAPI('http://localhost:8080/tasks');
  const res = await req.json();
  return res;
};
