import { motion } from "framer-motion";
import { FaInfo } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

const Message = ({ message, status, setMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 1, type: "spring", damping: 12 } }}
      exit={{ opacity: 0, x: 15 }}
      onAnimationComplete={() => setMessage(["", "", false])}
      className={`text-neutral-100 absolute top-0 right-0 m-5  
      ${
        status === "success" ? "bg-green-600" : "bg-red-600"
      } p-3 rounded-md flex gap-1 place-items-center`}
    >
      {status === "success" && <FaInfo />}
      {status === "error" && <IoWarning />}
      {message}
    </motion.div>
  );
};

export default Message;
