import tasksStore from '@/mobx/tasksStore';
import styles from '@/styles/TasksViewButtons.module.css';
import { observer } from 'mobx-react';

const TasksViewButtons = () => {
  return (
    <div className={styles.mainContainer} role="group">
      <button
        type="button"
        className={`${
          tasksStore.tasksViewClick
            ? styles.controlButtonsClicked
            : styles.controlButtonsUnClicked
        } ${styles.roundedLeft}`}
        onClick={() => tasksStore.updateTasksViewClick()}
      >
        Tasks List
      </button>
      <button
        type="button"
        className={`${
          tasksStore.createTaskClick
            ? styles.controlButtonsClicked
            : styles.controlButtonsUnClicked
        } ${styles.roundedRight}`}
        onClick={() => tasksStore.updateCreateTaskClick()}
      >
        {tasksStore.whichEditClicked ? 'Edit Task' : 'Create Task'}
      </button>
    </div>
  );
};

export default observer(TasksViewButtons);
