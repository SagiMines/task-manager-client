'use client';
import store from '@/store/tasks';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

const TasksList = () => {
  useEffect(() => {
    store.getTasks();
  }, []);

  return (
    <div>
      {store?.tasks.map(task => (
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
