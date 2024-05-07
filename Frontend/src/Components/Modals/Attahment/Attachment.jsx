import { useRef, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FaFileUpload } from "react-icons/fa";
import { listVariants, itemVariants } from "./animationVariants";
import { Message } from "../../Helpers";
import { useAssignAttachmentMutation } from "../../../Redux/apis/taskApi";
import { useSelector } from "react-redux";

const Attachment = ({ setIsMenuOpen, taskId }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(["", "", false]);
  const containerRef = useRef(null);

  const [assignAttachment] = useAssignAttachmentMutation();

  const { userData } = useSelector((state) => state.user);

  const handleMenuClose = (e) => {
    //If clicked outside the container borders closes the modal
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage(["No file selected", "error", true]);
    }

    try {
      await assignAttachment({ userId: userData.id, taskId: taskId, attachment: file }).unwrap();
      setMessage(["File Uploaded Successfully", "success", true]);
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 1000);
    } catch (err) {
      setMessage(["Error Happend While uploading you file", "error", true]);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      setMessage(["Only add One File is allowed", "error", true]);
      return;
    }
    setFile(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      onClick={handleMenuClose}
      className='fixed top-1/2 left-1/2 inset-0 -translate-x-[50%] -translate-y-[50%] grid place-content-center backdrop-blur-sm  h-screen w-screen z-50'
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        ref={containerRef}
        className='bg-neutral-800 border border-neutral-700 shadow-xl rounded-md text-neutral-100 p-10 w-[600px] max-h-[600px]'
      >
        <h1 className='border-b mb-8 text-2xl pb-1'>Add Attachment</h1>
        {file !== null ? (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={listVariants}
            className='max-h-[400px] overflow-y-scroll scroll-bar-webkit'
          >
            <motion.div
              variants={itemVariants}
              className='bg-neutral-700/30 border border-neutral-600 w-full py-1.5 rounded-sm px-2 mt-2'
            >
              {file}
            </motion.div>
          </motion.div>
        ) : (
          <>
            <div
              {...getRootProps()}
              className={`border border-neutral-500 bg-neutral-500/20 h-72 rounded-md grid place-content-center hover:bg-violet-400/20 hover:border-violet-400 group transition duration-100 cursor-pointer ${
                isDragActive && "border-violet-400 bg-violet-400/20"
              }`}
            >
              <input {...getInputProps()} />
              <FaFileUpload
                className={`text-6xl text-neutral-500/50 group-hover:text-violet-500/50 transition duration-100 group-hover:animate-bounce ${
                  isDragActive && "animate-bounce text-violet-500/50"
                }`}
              />
            </div>
          </>
        )}
        <div className='flex justify-between place-items-center mt-4'>
          <button
            onClick={handleUpload}
            className='bg-green-800 text-neutral-100 py-1.5 w-[40%] rounded-md hover:bg-green-700 hover:scale-95 transition duration-200'
          >
            Submit
          </button>
          <button
            onClick={() => setIsMenuOpen(false)}
            className='bg-red-800 text-neutral-100 px-2 py-1.5 w-[40%] rounded-md hover:bg-red-700 hover:scale-95 transition duration-200'
          >
            Cancel
          </button>
        </div>
      </motion.div>
      {message[2] && <Message message={message[0]} status={message[1]} setMessage={setMessage} />}
    </div>
  );
};

export default Attachment;
