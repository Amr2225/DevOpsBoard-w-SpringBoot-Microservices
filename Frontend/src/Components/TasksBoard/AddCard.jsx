import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useCreateTaskMutation } from "../../Redux/apis/taskApi";
import { useParams } from "react-router-dom";

const AddCard = () => {
  const [text, setText] = useState("");
  const [active, setIsActive] = useState(false);
  const [createTask] = useCreateTaskMutation();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim().length) return;
    await createTask({
      title: text.trim(),
      status: "backlog",
      description: "",
      projectId: params.projectId,
    });

    setIsActive(false);
  };

  return (
    <>
      {active ? (
        <motion.form onSubmit={handleSubmit} layout>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder='Add new task...'
            className='w-full rounded border border-violet-400 bg-violet-400/20 text-sm text-neutral-50 placeholder-violet-400 focus:outline-0 p-3 resize-none'
          />
          <div className='mt-1.5 flex items-center justify-end gap-1 5'>
            <button
              onClick={() => setIsActive(false)}
              className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
            >
              Close
            </button>
            <button
              type='submit'
              className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setIsActive(true)}
          className='flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400
          transition-colors
          hover:text-neutral-50'
        >
          Add Card <FiPlus />{" "}
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
