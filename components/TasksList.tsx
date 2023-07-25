'use client';
import tasksStore from '@/mobx/tasksStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

const TasksList = () => {
  useEffect(() => {
    tasksStore.getTasks();
  }, []);

  return (
    <div>
      {tasksStore?.tasks.map(task => (
        <div key={task.id}>
          <p>{task.id}</p>
          <p>{task.title}</p>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default observer(TasksList);
