import { FlowGenerator, Task } from '@/types';
import { getTasksFromAPI } from '@/utils/tasksFunctions';
import { computed, flow, makeAutoObservable, observable } from 'mobx';

class TasksStore {
  _tasks: Task[] = [];
  _newTask: Task | null = null;

  constructor() {
    makeAutoObservable(this, {
      _tasks: observable,
      _newTask: observable,
      tasks: computed,
      getTasks: flow,
    });
  }

  //   createTask() {

  //   }

  //   updateTask() {

  //   }

  //   deleteTask() {

  //   }

  get tasks() {
    return this._tasks;
  }

  *getTasks(): FlowGenerator<Task[], void> {
    const res = yield getTasksFromAPI();
    this._tasks = res;
  }
}
const tasksStore = new TasksStore();
export default tasksStore;
