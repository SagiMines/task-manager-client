import { Task } from '@/types';
import { getTasksFromAPI } from '@/utils/tasksFunctions';
import { makeAutoObservable } from 'mobx';

class Store {
  tasks: Task[] = [];
  newTask: Task | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  //   createTask() {

  //   }

  //   updateTask() {

  //   }

  //   deleteTask() {

  //   }

  async getTasks() {
    this.tasks = await getTasksFromAPI();
    console.log(this.tasks);
  }
}
const store = new Store();
export default store;
