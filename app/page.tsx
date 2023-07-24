import Login from '@/components/Login';
// import TasksList from '@/components/TasksList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50 dark:bg-gray-900">
      <Login />
      {/* <TasksList /> */}
    </main>
  );
}
