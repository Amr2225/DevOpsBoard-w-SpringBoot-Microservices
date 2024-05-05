import { useState } from "react";
import { motion } from "framer-motion";
import { useUpdateProjectMutation } from "../../../Redux/apis/projectsApi";
import { Message } from "../../Helpers";

const UpdateProject = ({ id, projectTitle, setIsMenuOpen }) => {
  const [updateProject] = useUpdateProjectMutation();
  const [title, setTitle] = useState(projectTitle);
  const [showMessage, setShowMessage] = useState(["", "", false]);

  const handleOnClose = (e) => {
    if (e.target.id === "container") setIsMenuOpen(false);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim().length) return; //To Remove trailing spaces

    try {
      await updateProject({ id: id, title: title.trim() }).unwrap();
      setShowMessage(["Project Updated Successfully", "success", true]);
    } catch (err) {
      setShowMessage([`Error Happend ${err.data}`, "error", true]);
    }
  };

  return (
    <div
      id='container'
      onClick={handleOnClose}
      className='fixed top-1/2 left-1/2 inset-0 -translate-x-[50%] -translate-y-[50%] grid place-content-center backdrop-blur-sm  h-screen w-screen z-50'
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className='grid justify-items-center w-96 bg-neutral-800 border border-neutral-700 rounded-md py-7 shadow-xl shadow-neutral-950'
      >
        <h1 className='text-neutral-100 text-center pt-2 text-3xl font-bold border-b mb-7 pb-2'>
          Update Project
        </h1>
        <form onSubmit={(e) => handleUpdate(e)}>
          <input
            className='bg-neutral-900/40 border border-neutral-500/40 rounded-sm p-2 w-full outline-none focus:border-violet-400  focus:bg-neutral-800 transition duration-200 text-neutral-100 text-sm'
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            type='submit'
            className=' bg-neutral-50 hover:bg-neutral-300 hover:scale-95 text-neutral-950 px-3 py-1.5 mt-3 w-full mx-auto rounded-md transition-all duration-200'
          >
            Update
          </button>
        </form>
      </motion.div>
      {showMessage[2] && (
        <Message message={showMessage[0]} status={showMessage[1]} setMessage={setShowMessage} />
      )}
    </div>
  );
};

export default UpdateProject;
