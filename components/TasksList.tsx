'use client';
import tasksStore from '@/mobx/tasksStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { flowResult } from 'mobx';

const TasksList = () => {
  useEffect(() => {
    flowResult(tasksStore.getTasks());
  }, []);

  return (
    <div className="m-5 w-fit sm:mx-auto overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-5 sm:px-6 py-3">Title</th>
            <th className="px-5 sm:px-6 py-3">Description</th>
            <th className="px-5 sm:px-6 py-3">Completed</th>
            <th className="px-5 sm:px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th className="px-5 sm:px-6 py-4 font-medium text-gray-900 dark:text-white">
              Intro to CSS
            </th>
            <td className="px-5 sm:px-6 py-3">Adam</td>
            <td className="px-5 sm:px-6 py-3">858</td>
            <td className="flex gap-3 px-5 sm:px-6 py-3">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Delete
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td className="px-5 sm:px-6 py-4 font-medium text-gray-900 dark:text-white">
              A Long and Winding
            </td>
            <td className="px-5 sm:px-6 py-3">Adam</td>
            <td className="px-5 sm:px-6 py-3">112</td>
            <td className="flex gap-3 px-5 sm:px-6 py-3">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Delete
              </a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th className="px-5 sm:px-6 py-4 font-medium text-gray-900 dark:text-white">
              Intro to JavaScript
            </th>
            <td className="px-5 sm:px-6 py-3">Chris</td>
            <td className="px-5 sm:px-6 py-3">1,280</td>
            <td className="flex gap-3 px-5 sm:px-6 py-3">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    //
    //   <table classNameName="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
    //     <thead classNameName="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //       <tr>
    //         <th scope="col" classNameName="px-6 py-3">
    //           Title
    //         </th>
    //         <th scope="col" classNameName="px-6 py-3">
    //           Description
    //         </th>
    //         <th scope="col" classNameName="px-6 py-3">
    //           Completed
    //         </th>
    //         <th scope="col" classNameName="px-6 py-3">
    //           Action
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr classNameName="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    //         <th
    //           scope="row"
    //           classNameName="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //         >
    //           Apple MacBookdssssssssssss ssssssssss sssssssssgdfgdfg
    //           dfgdfgdfgdfgdfg Pro 17"
    //         </th>
    //         <td classNameName="px-6 py-4">Silver</td>
    //         <td classNameName="px-6 py-4">Laptop</td>
    //         <td classNameName="px-6 py-4">
    //           <a
    //             href="#"
    //             classNameName="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //           >
    //             Edit
    //           </a>
    //         </td>
    //       </tr>
    //       <tr classNameName="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    //         <th
    //           scope="row"
    //           classNameName="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //         >
    //           Microsoft Surface Pro
    //         </th>
    //         <td classNameName="px-6 py-4">White</td>
    //         <td classNameName="px-6 py-4">Laptop PC</td>
    //         <td classNameName="px-6 py-4">
    //           <a
    //             href="#"
    //             classNameName="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //           >
    //             Edit
    //           </a>
    //         </td>
    //       </tr>
    //       <tr classNameName="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    //         <th
    //           scope="row"
    //           classNameName="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //         >
    //           Magic Mouse 2
    //         </th>
    //         <td classNameName="px-6 py-4">Black</td>
    //         <td classNameName="px-6 py-4">Accessories</td>
    //         <td classNameName="px-6 py-4">
    //           <a
    //             href="#"
    //             classNameName="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //           >
    //             Edit
    //           </a>
    //         </td>
    //       </tr>
    //       <tr classNameName="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    //         <th
    //           scope="row"
    //           classNameName="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //         >
    //           Google Pixel Phone
    //         </th>
    //         <td classNameName="px-6 py-4">Gray</td>
    //         <td classNameName="px-6 py-4">Phone</td>
    //         <td classNameName="px-6 py-4">
    //           <a
    //             href="#"
    //             classNameName="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //           >
    //             Edit
    //           </a>
    //         </td>
    //       </tr>
    //       <tr>
    //         <th
    //           scope="row"
    //           classNameName="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //         >
    //           Apple Watch 5
    //         </th>
    //         <td classNameName="px-6 py-4">Red</td>
    //         <td classNameName="px-6 py-4">Wearables</td>
    //         <td classNameName="px-6 py-4">
    //           <a
    //             href="#"
    //             classNameName="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //           >
    //             Edit
    //           </a>
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>

    // <div>
    //   {tasksStore?.tasks?.map(task => (
    //     <div key={task.id}>
    //       <p>{task.id}</p>
    //       <p>{task.title}</p>
    //       <p>{task.description}</p>
    //     </div>
    //   ))}
    // </div>
  );
};

export default observer(TasksList);
