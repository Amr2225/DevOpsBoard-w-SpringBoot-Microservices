import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteProjectMutation } from "../../Redux/apis/projectsApi";
import { UpdateProject } from "../Modals";
import { Message } from "../Helpers";

const Projects = ({ projectId, title, link }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState(false);
  const [message, setMessage] = useState(["", "", false]);

  const { userData } = useSelector((state) => state.user);
  const [deleteProject] = useDeleteProjectMutation();
  const navigate = useNavigate();
  const params = useParams();

  const handleDelete = (e) => {
    e.preventDefault();

    if (+params.projectId === +projectId) {
      navigate("/TeamLeader");
    }
    try {
      deleteProject(projectId).unwrap();
    } catch (err) {
      setMessage(["Fatal Error Happend", "error", true]);
    }
  };

  return (
    <div className='flex justify-between items-center '>
      <NavLink
        to={link}
        className={({ isActive }) =>
          `hover:text-neutral-50 w-[80%] text-ellipsis overflow-hidden text-nowrap ${
            isActive && "text-neutral-50"
          }`
        }
        title={title}
      >
        {title}
      </NavLink>
      <div
        className='relative'
        onMouseEnter={() => setIsContextMenuOpen(true)}
        onMouseLeave={() => setIsContextMenuOpen(false)}
      >
        {/* This menu just appear for the team leader */}
        {userData.role === "2" && (
          <>
            <BsThreeDots className='text-neutral-100 hover:bg-neutral-600/40 ' />
            <AnimatePresence>
              {isContextMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className='bg-neutral-800 border border-neutral-700 text-neutral-100 flex flex-col gap-4 place-items-start p-4 rounded-md shadow-2xl shadow-neutral-900 absolute left-3 top-0 z-50'
                >
                  <button onClick={() => setIsUpdateMenuOpen(true)} className='hover:underline'>
                    Edit
                  </button>

                  <button
                    className='hover:underline'
                    onClick={() => navigate(`/teamleader/AssignDevs/${projectId}`)}
                  >
                    Assign
                  </button>

                  <button onClick={handleDelete} className='text-red-400 hover:underline'>
                    Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      {isUpdateMenuOpen && (
        <UpdateProject id={projectId} projectTitle={title} setIsMenuOpen={setIsUpdateMenuOpen} />
      )}
      {message[2] && <Message message={message[0]} status={message[1]} setMessage={setMessage} />}
    </div>
  );
};

export default Projects;
