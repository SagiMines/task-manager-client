import { FlowGenerator, Task } from '@/types';
import { getTasksFromAPI } from '@/utils/tasksFunctions';
import { action, computed, flow, makeAutoObservable, observable } from 'mobx';

class TasksStore {
  _tasks: Task[] = [];
  _newTask: Task | null = null;
  _tasksViewClick = true;
  _createTaskClick = false;

  constructor() {
    makeAutoObservable(this, {
      _tasks: observable,
      _newTask: observable,
      _tasksViewClick: observable,
      _createTaskClick: observable,
      tasksViewClick: computed,
      createTaskClick: computed,
      tasks: computed,
      updateTasksViewClick: action,
      updateCreateTaskClick: action,
      getTasks: flow,
    });
  }

  updateTasksViewClick() {
    if (!this._tasksViewClick) {
      this._tasksViewClick = true;
      this._createTaskClick = false;
    }
  }

  updateCreateTaskClick() {
    if (!this._createTaskClick) {
      this._createTaskClick = true;
      this._tasksViewClick = false;
    }
  }

  get tasksViewClick() {
    return this._tasksViewClick;
  }

  get createTaskClick() {
    return this._createTaskClick;
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
