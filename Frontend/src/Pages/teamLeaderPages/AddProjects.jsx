import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import { Error, LoadingSpinner, Message } from "../../Components/Helpers/";
import { useRef, useState } from "react";
import { useAddProjectMutation } from "../../Redux/apis/projectsApi";

const AddProjects = () => {
  const { projectsData, isLoading, isError } = useSelector((state) => state.projects);
  const [showMessage, setShowMessage] = useState(["", "", false]);
  const [addProject] = useAddProjectMutation();
  const form = useRef({ title: "" });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProject({ title: form.current.title.value }).unwrap();
      setShowMessage(["project created successfully", "success", true]);
      form.current.title.value = "";
    } catch (err) {
      setShowMessage([`Error happend ${err.error}`, "error", true]);
      console.log(err);
    }
  };

  return (
    <div className='mt-3 p-5'>
      <h1 className='text-neutral-50 text-3xl w-full border-b border-neutral-500/80 mb-4 pb-1'>
        Add Projects
      </h1>
      <div className='grid justify-items-center bg-neutral-800 w-[50%]  mx-auto p-10 border-neutral-700 border shadow-lg rounded-md'>
        <div>
          {projectsData.map((project, idx) => {
            return (
              <li className='text-neutral-50 text-2xl mb-3' key={idx}>
                {project.title}
              </li>
            );
          })}
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className='w-full mt-2'>
          <input
            className='bg-neutral-900/40 border border-neutral-500/40 rounded-sm px-2 py-3 w-full outline-none focus:border-violet-400 focus:bg-neutral-800 transition duration-200 text-neutral-100 text-md'
            type='text'
            placeholder='Title'
            name='title'
            ref={(val) => {
              form.current.title = val;
            }}
          />

          <button
            type='submit'
            className='bg-neutral-50 hover:bg-neutral-300 hover:scale-95 text-neutral-950 px-3 py-2 mt-3 w-full rounded-md transition-all duration-200'
          >
            Add
          </button>
        </form>
        <AnimatePresence>
          {showMessage[2] && (
            <Message message={showMessage[0]} status={showMessage[1]} setMessage={setShowMessage} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddProjects;
