import { useRef } from "react";
import { motion } from "framer-motion";

import {
  useAssignTasksMutation,
  useGetAssignedDevsQuery,
  useGetUnassignedDevsQuery,
} from "../../../Redux/apis/taskApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AssignTask = ({ setIsMenuOpen, taskId }) => {
  const { projectsData } = useSelector((state) => state.projects);
  const { userData } = useSelector((state) => state.user);
  const params = useParams();
  const containerRef = useRef(null);

  const { data: assignedDevs, isSuccess: isAssignedDevsSuccess } = useGetAssignedDevsQuery(+taskId);
  const { data: unassignedDevs, isSuccess: isUnassignedDevsSuccess } = useGetUnassignedDevsQuery(
    +taskId
  );
  const [assignTask] = useAssignTasksMutation();

  const project = projectsData.find((project) => project.projectId === +params.projectId);

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
          {isAssignedDevsSuccess &&
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
              {isUnassignedDevsSuccess &&
                unassignedDevs.map((dev, index) => (
                  <li
                    key={dev.id}
                    className='list-decimal text-lg capitalize flex gap-2 justify-between w-[90%] items-center '
                  >
                    <span>
                      {`${index + 1}. `}
                      {dev.userName}
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
