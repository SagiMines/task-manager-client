import TaskForm from './TaskForm';
import TasksList from './TasksList';
import TasksViewButtons from './TasksViewButtons';

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

      <section id="tasks-view">
        <TasksList />
      </section>

      <section id="create-edit-view">
        <TaskForm />
      </section>
    </>
  );
};

export default App;
