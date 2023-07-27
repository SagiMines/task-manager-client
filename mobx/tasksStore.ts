import { FlowGenerator, NewTask, Task } from '@/types';
import {
  createNewTask,
  deleteSpecificTask,
  getUserSpecificTask,
  getUserTasksFromAPI,
  updateSpecificTask,
} from '@/utils/tasksFunctions';
import { makeAutoObservable } from 'mobx';

class TasksStore {
  _tasks: Task[] | null = null;
  _newTask: NewTask | null = null;
  _currentTask: Task | null = null;
  _whichTaskClicked: number | null = null;
  _whichEditClicked: number | null = null;
  _tasksViewClick = true;
  _createTaskClick = false;
  _taskDetailsError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateTasks(val: Task[]) {
    this._tasks = val;
  }
  updateTasksViewClick() {
    if (!this._tasksViewClick) {
      this._tasksViewClick = true;
      this._createTaskClick = false;
      this._whichEditClicked = null;
      this._currentTask = null;
    }
  }

  updateCreateTaskClick() {
    if (!this._createTaskClick) {
      this._createTaskClick = true;
      this._tasksViewClick = false;
      this._whichEditClicked = null;
    }
  }

  setWhichTaskClicked(val: number | null) {
    this._whichTaskClicked = val;
  }

  setWhichEditClicked(val: number | null) {
    this._whichEditClicked = val;
    this._tasksViewClick = false;
    this._createTaskClick = true;
  }

  setCurrentTask(val: Task) {
    this._currentTask = val;
  }

  updateNewTask(val: NewTask) {
    this._newTask = val;
  }

  setTaskDetailsError(val: string | null) {
    this._taskDetailsError = val;
  }

  get tasksViewClick() {
    return this._tasksViewClick;
  }

  get newTask() {
    return this._newTask;
  }

  get currentTask() {
    return this._currentTask;
  }

  get createTaskClick() {
    return this._createTaskClick;
  }

  get whichTaskClicked() {
    return this._whichTaskClicked;
  }
  get whichEditClicked() {
    return this._whichEditClicked;
  }

  get tasks() {
    return this._tasks;
  }

  get taskDetailsError() {
    return this._taskDetailsError;
  }

  *getTasks(userId: number): FlowGenerator<Task[], void> {
    const res = yield getUserTasksFromAPI(userId);
    this._tasks = res;
  }

  *getTask(userId: number): FlowGenerator<Task, Task> {
    const res = yield getUserSpecificTask(userId);
    return res;
  }

  *deleteTask(taskId: number): FlowGenerator<void, void> {
    this._whichTaskClicked = taskId;
    yield deleteSpecificTask(taskId);
  }

  *updateTask(taskId: number): FlowGenerator<Task | void, Task | void> {
    if (this._currentTask) {
      const res = yield updateSpecificTask(taskId, this._currentTask);
      this._currentTask = null;
      return res;
    }
  }

  *createTask(): FlowGenerator<Task | void, Task | void> {
    if (this._newTask) {
      const res = yield createNewTask(this._newTask);
      this._newTask = null;
      return res;
    }
  }
}
const tasksStore = new TasksStore();
export default tasksStore;
