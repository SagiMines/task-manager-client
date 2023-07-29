'use client';
import tasksStore from '@/mobx/tasksStore';
import { TaskFormProps } from '@/types';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import Loader from './Loader';
import {
  getSpecificTask,
  handleTaskFormChange,
  handleTaskFormClick,
} from '@/utils/globalFunctions';
import styles from '@/styles/TaskForm.module.css';

const TaskForm = ({ taskId }: TaskFormProps) => {
  useEffect(() => {
    if (taskId) {
      getSpecificTask(taskId);
    }
  }, []);

  return (
    <form className={styles.form}>
      <div className={styles.innerContainer}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>

        <input
          defaultValue={taskId ? tasksStore.currentTask?.title : ''}
          type="text"
          id="title"
          className={styles.titleInput}
          onChange={e => handleTaskFormChange({ e, taskId })}
        />
      </div>
      <div className="p-5">
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <input
          type="text"
          defaultValue={taskId ? tasksStore.currentTask?.description : ''}
          id="description"
          className={styles.descriptionInput}
          onChange={e => handleTaskFormChange({ e, taskId })}
        />
      </div>
      <div className="p-5">
        <label className={styles.label}>Completed?</label>
        <label className={styles.completedLabel}>
          <input
            key={Math.random()}
            id="completed"
            type="checkbox"
            defaultChecked={
              taskId
                ? tasksStore.currentTask?.completed
                : tasksStore.newTask?.completed === false ||
                  tasksStore.newTask?.completed === undefined
                ? false
                : true
            }
            className="sr-only peer"
            onChange={e => handleTaskFormChange({ e, taskId })}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          <span className={styles.completedSpan} />
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.button}
          onClick={e => handleTaskFormClick({ e, taskId })}
        >
          {taskId ? `Edit Task` : 'Create Task'}
        </button>
        {tasksStore.taskDetailsError && (
          <p className="error">{tasksStore.taskDetailsError}</p>
        )}
      </div>

      {tasksStore.taskFormClick && (
        <div className="m-5">
          <Loader taskFormAction />
        </div>
      )}
    </form>
  );
};

export default observer(TaskForm);
