import tasksStore from '@/mobx/tasksStore';
import TaskForm from './TaskForm';
import TasksList from './TasksList';
import TasksViewButtons from './TasksViewButtons';
import { observer } from 'mobx-react';

const App = () => {
  return (
    <>
      <section id="title">
        <div className="flex justify-center my-20">
          <h1 className="font-bold text-4xl from-stone-800">Task Manager</h1>
        </div>
      </section>

      <section id="view-buttons">
        <TasksViewButtons />
      </section>

      {/* Shows the tasks list view only when it is clicked or at the start of the app */}
      {tasksStore.tasksViewClick && (
        <section id="tasks-view">
          <TasksList />
        </section>
      )}

      {/* Shows the create task view only when it is clicked */}
      {tasksStore.createTaskClick && (
        <section id="create-edit-view">
          <TaskForm />
        </section>
      )}
    </>
  );
};

export default observer(App);
