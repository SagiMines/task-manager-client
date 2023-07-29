'use client';
import tasksStore from '@/mobx/tasksStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import Loader from './Loader';
import {
  getUserTasks,
  handleTaskListDelete,
  handleTaskListEdit,
} from '@/utils/globalFunctions';
import styles from '@/styles/TaskList.module.css';

const TasksList = () => {
  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <div
      className={`${styles.mainContainer} ${
        tasksStore.tasks && tasksStore.tasks.length
          ? styles.mainContainerShadow
          : ''
      }`}
    >
      {!tasksStore.tasks && <Loader />}
      {tasksStore.tasks && !tasksStore.tasks.length && (
        <div className={styles.noTasksContainer}>No tasks available.</div>
      )}
      {tasksStore.tasks && tasksStore.tasks?.length !== 0 && (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeading}>Title</th>
              <th className={styles.tableHeading}>Description</th>
              <th className={styles.tableHeading}>Completed</th>
              <th className={styles.tableHeading}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasksStore.tasks?.map(task => (
              <tr key={task.id} className={styles.tableRow}>
                <th className={styles.tableHeadingEmphasised}>{task.title}</th>
                <td className={styles.tableHeading}>{task.description}</td>
                <td className={styles.tableHeading}>
                  {task.completed ? 'Yes' : 'No'}
                </td>
                <td className={styles.tableDataAction}>
                  <span
                    onClick={() => handleTaskListEdit(task.id)}
                    className={styles.editButton}
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => handleTaskListDelete(task.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </span>
                  {tasksStore.whichTaskClicked === task.id && (
                    <span>
                      <Loader taskAction />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default observer(TasksList);
