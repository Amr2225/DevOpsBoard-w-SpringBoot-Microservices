import { useRef } from "react";
import { motion } from "framer-motion";

import { useAssignTasksMutation, useGetAssignedDevsQuery } from "../../../Redux/apis/taskApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "../../../Redux/apis/userApi";
import { useGetAssignedProjectsQuery } from "../../../Redux/apis/projectsApi";

const AssignTask = ({ setIsMenuOpen, taskId }) => {
  const { projectsData } = useSelector((state) => state.projects);
  const { userData } = useSelector((state) => state.user);
  const params = useParams();
  const containerRef = useRef(null);

  const [assignTask] = useAssignTasksMutation();
  const { data: users, isSuccess: usersSuccess } = useGetUsersQuery();
  const { data: assignedProjectsData, isSuccess: isProjectDataSuccess } =
    useGetAssignedProjectsQuery();
  const { data: assignedDevsData, isSuccess: isAssignedDevsSuccess } = useGetAssignedDevsQuery(
    +taskId
  );

  const project = projectsData.find((project) => project.projectId === +params.projectId);

  let assignedDevs;
  let unassignedDevs;
  if (usersSuccess && isAssignedDevsSuccess && isProjectDataSuccess) {
    //logic to get the username from the assigned devs apis
    assignedDevs = assignedDevsData.map((assignedDev) => {
      const foundUser = users.find((user) => user.id === assignedDev.userId);
      if (foundUser) {
        return { id: foundUser.id, userName: foundUser.name };
      }
    });
  }

  if (usersSuccess && isAssignedDevsSuccess && isProjectDataSuccess) {
    //logic to get the username from the assigned devs apis

    unassignedDevs = users.filter((user) => {
      const isAssigned = assignedDevsData.some((dev) => +dev.userId === +user.id);
      const isAccepeted = assignedProjectsData.some(
        (project) =>
          +project.projectId === +params.projectId &&
          project.status === "accepted" &&
          +project.userId === user.id
      );
      // const isAccepeted = acceptedUsers.includes(user.id);
      return !isAssigned && isAccepeted;
    });
  }

  const handleMenuClose = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const assignDev = (userId) => {
    assignTask({
      userId: userId,
      taskId: taskId,
      attachments: "",
    });
  };

  return (
    <div
      onClick={handleMenuClose}
      className='fixed top-1/2 left-1/2 inset-0 -translate-x-[50%] -translate-y-[50%] grid place-content-center backdrop-blur-sm  h-screen w-screen z-50'
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        ref={containerRef}
        className='bg-neutral-800 border border-neutral-700 shadow-xl rounded-md text-neutral-100 p-10 w-[600px] max-h-[600px] overflow-scroll overflow-x-hidden scroll-bar-webkit'
      >
        <h1 className='border-b mb-8 text-2xl pb-1'>{project.title}</h1>
        <h3 className='mb-4 text-lg font-bold text-green-500'>Assigned Developers</h3>
        <ol className='ml-10 mb-5 flex gap-3 flex-col'>
          {isAssignedDevsSuccess && usersSuccess && console.log(assignedDevs)}
          {isAssignedDevsSuccess &&
            usersSuccess &&
            isProjectDataSuccess &&
            assignedDevs.map((dev) => (
              <li key={dev.id} className='list-decimal text-lg capitalize'>
                {dev.userName}
              </li>
            ))}
        </ol>
        {userData.role === "2" && (
          <>
            <h3 className='mb-4 text-lg font-bold text-red-600'>Assign Developers</h3>
            <ol className='ml-5 flex gap-3 flex-col'>
              {usersSuccess &&
                usersSuccess &&
                isProjectDataSuccess &&
                unassignedDevs.map((dev, index) => (
                  <li
                    key={dev.id}
                    className='list-decimal text-lg capitalize flex gap-2 justify-between w-[90%] items-center '
                  >
                    <span>
                      {`${index + 1}. `}
                      {dev.name}
                    </span>
                    <button
                      onClick={() => assignDev(dev.id)}
                      className='bg-neutral-50 text-neutral-900 py-0.5 px-5 rounded-md text-md hover:bg-neutral-300 hover:scale-95 transition duration-200'
                    >
                      Assign
                    </button>
                  </li>
                ))}
            </ol>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AssignTask;
