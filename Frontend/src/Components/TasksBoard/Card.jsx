import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LiaCommentSolid } from "react-icons/lia";
import { AssignTask, CardMenu } from "../Modals";
import { useGetCommnetsQuery } from "../../Redux/apis/commentsApi";
import { useGetAssignedDevsQuery } from "../../Redux/apis/taskApi";

const Card = ({ title, id, status, description, editable }) => {
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [isCardMenuOpen, setIsCardMenuOpen] = useState(false);
  const [isAssignTaskMenuOpen, setIsAssignTaskMenuOpen] = useState(false);

  const { data: allCommentsData, isSuccess } = useGetCommnetsQuery(+id);
  const { data: assignedDevs, isSuccess: isAssignedDevsSuccess } = useGetAssignedDevsQuery(+id);

  const AssignedMenuRef = useRef(null);

  const TransferData = (e, cardData) => {
    e.dataTransfer.setData("cardId", cardData.id);
    e.dataTransfer.setData("cardStatus", cardData.status);
  };

  // Assigned developers to each task
  let firstFive;
  let restCount;
  if (isAssignedDevsSuccess) {
    firstFive = assignedDevs.slice(0, 5);
    restCount = assignedDevs.slice(5).reduce((acc) => acc + 1, 0);
  }

  const handleOpenMenus = (e) => {
    if (AssignedMenuRef.current && e.target === AssignedMenuRef.current) {
      setIsAssignTaskMenuOpen(true);
    } else {
      editable && setIsCardMenuOpen(true);
    }
  };

  return (
    <>
      <motion.div
        layout
        layoutId={id}
        onClick={handleOpenMenus}
        onDragStart={(e) => TransferData(e, { id, status })}
        draggable={editable}
        className={`${
          editable
            ? "cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing mb-2"
            : "cursor-not-allowed rounded border border-red-900 bg-neutral-800 p-3  mb-2"
        }`}
      >
        <p className='text-sm text-neutral-100'>{title}</p>
        <div className='flex justify-between mt-1'>
          <div className='flex ml-2'>
            {isAssignedDevsSuccess &&
              firstFive.map((developer) => (
                <span
                  key={developer.id}
                  title={developer.userName}
                  className={`w-5 h-5 shadow-icons -ml-2 bg-neutral-50 text-neutral-950 rounded-full grid place-content-center text-xs hover:z-50 hover:scale-105 transition duration-200`}
                >
                  {developer.userName[0].toUpperCase()}
                </span>
              ))}

            <span
              ref={AssignedMenuRef}
              className={`w-5 h-5 shadow-icons -ml-2  bg-violet-600/95 hover:bg-violet-500 cursor-pointer text-neutral-50 rounded-full grid place-content-center text-xs`}
            >
              {`+${isAssignedDevsSuccess && restCount}`}
            </span>
          </div>
          <div
            className='relative cursor-pointer'
            onMouseEnter={() => setIsCommentMenuOpen(true)}
            onMouseLeave={() => setIsCommentMenuOpen(false)}
          >
            <LiaCommentSolid
              className={`border border-neutral-100/40 w-6 h-6 p-1 rounded-sm text-neutral-200 transition-all duration-100 ${
                isCommentMenuOpen && "bg-neutral-100 text-neutral-900 scale-125"
              }`}
            />
            <AnimatePresence>
              {isCommentMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  style={{ x: "-50%" }}
                  className='rounded border border-neutral-700 bg-neutral-800 px-3 py-1.5 absolute text-neutral-100 text-sm left-1/2 top-8 z-10 w-max'
                >
                  {isSuccess && `${allCommentsData.length} Comments`}
                  <div className='w-full h-4 bg-transparent absolute -top-4 left-0' />{" "}
                  {/*Just for the hover effect to work properly*/}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      {isCardMenuOpen && (
        <CardMenu
          taskId={id}
          title={title}
          description={description}
          status={status}
          setIsCardMenuOpen={setIsCardMenuOpen}
        />
      )}
      {isAssignTaskMenuOpen && <AssignTask setIsMenuOpen={setIsAssignTaskMenuOpen} taskId={id} />}
    </>
  );
};

export default Card;
