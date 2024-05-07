import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { BiPencil } from "react-icons/bi";

import Comments from "./Comments";
import Attachment from "./Attahment/Attachment";
import { Error, LoadingSpinner } from "../Helpers";

import { useUpdateTaskMutation } from "../../Redux/apis/taskApi";
import { useAddCommentMutation, useGetCommnetsQuery } from "../../Redux/apis/commentsApi";
import { useGetAllUsersQuery } from "../../Redux/apis/userApi";

const CardMenu = ({ title, taskId, status, description, setIsCardMenuOpen }) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isAttachmentMenuActive, setIsAttachmentMenuActive] = useState(false);

  const [descriptionData, setDescriptionData] = useState(description);
  const [titleData, setTitleData] = useState(title);
  const [commentData, setCommentData] = useState();

  const [updateTask] = useUpdateTaskMutation();
  const [addComment] = useAddCommentMutation();
  const { data: CommentsData, isSuccess, isError, isLoading } = useGetCommnetsQuery(+taskId);
  const { data: allUsersData, isSuccess: usersDataSuccess } = useGetAllUsersQuery();

  const { userData } = useSelector((state) => state.user);
  const containerRef = useRef(null);
  const params = useParams();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error />;
  }

  let allCommentsData;
  if (isSuccess && usersDataSuccess) {
    allCommentsData = CommentsData.map((commentData) => {
      const foundUser = allUsersData.find((user) => user.id === commentData.userId);
      if (foundUser) {
        return {
          ...commentData,
          userName: foundUser.name,
          role: foundUser.role === "2" ? "Team Leader" : "Developer",
        };
      }
    });
  }

  const handleMenuClose = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsCardMenuOpen(false);
    }
  };

  const handleUpdateTask = (e, data) => {
    e.preventDefault();
    if (data === "title") {
      setIsEditingTitle(false);

      //Only Update the title with the new title
      updateTask({
        id: taskId,
        title: titleData,
        status: status,
        description: description,
        projectId: params.projectId,
      });
    } else {
      setIsEditingDescription(false);

      //Only Update the description with the new description
      updateTask({
        id: taskId,
        title: title,
        status: status,
        description: descriptionData,
        projectId: params.projectId,
      });
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    addComment({
      userId: userData.id,
      taskId: taskId,
      comment: commentData,
    });

    setCommentData("");
  };

  const handleAttachmentMenuOpen = (e) => {
    e.preventDefault();
    setIsAttachmentMenuActive(true);
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
        className='bg-neutral-800 border border-neutral-700 shadow-xl rounded-md text-neutral-100 p-10 w-[600px] h-[600px] overflow-scroll overflow-x-hidden scroll-bar-webkit'
      >
        {/* Editing Title Logic */}
        {usersDataSuccess && isSuccess && console.log(allCommentsData)}
        {!isEditingTitle ? (
          <>
            <span className='border-b mb-8 pb-1 flex items-center gap-4'>
              <h1 className=' text-2xl '>{title}</h1>
              {/* Just the team leader can edit the title */}
              {userData.role === "2" && (
                <BiPencil
                  className=' hover:text-neutral-400 cursor-pointer'
                  onClick={() => setIsEditingTitle(true)}
                />
              )}
            </span>
          </>
        ) : (
          <span className='border-b mb-8 pb-1 flex items-center justify-between w-full gap-4'>
            <input
              className='bg-violet-400/20 border border-violet-400 rounded-md p-2 block w-full focus:outline-none focus:border-violet-500 '
              type='text'
              value={titleData}
              onChange={(e) => setTitleData(e.target.value)}
            />
            <span className=' flex gap-3'>
              <button
                onClick={(e) => handleUpdateTask(e, "title")}
                className='bg-neutral-50 text-neutral-900 rounded-md px-3 py-1.5 text-sm hover:bg-neutral-300 hover:scale-95 transition duration-200'
              >
                Update
              </button>
              <button
                className='bg-red-700 text-neutral-100 px-3 py-1.5 hover:bg-red-800 hover:scale-95 transition duration-200 rounded-md text-sm'
                onClick={() => setIsEditingTitle(false)}
              >
                Cancel
              </button>
            </span>
          </span>
        )}

        {/* Editing the Description Logic */}
        {!isEditingDescription ? (
          <div className='mb-16'>
            <h4 className=' rounded-md w-full'>{description}</h4>
            {/* Just the team leader can edit the description */}
            {userData.role === "2" && (
              <BiPencil
                className=' hover:text-neutral-400 cursor-pointer'
                onClick={() => setIsEditingDescription(true)}
              />
            )}
          </div>
        ) : (
          <>
            <textarea
              onChange={(e) => setDescriptionData(e.target.value)}
              className={`bg-violet-400/20 border border-violet-400 w-full resize-none overflow-hidden rounded-md px-2 py-2  scroll-bar-hidden overflow-y-scroll focus:outline-none focus:border-violet-500  h-[150px]`}
              defaultValue={descriptionData}
            />
            <button
              onClick={(e) => handleUpdateTask(e, "description")}
              className='px-6 py-1 bg-neutral-50 text-neutral-900 hover:bg-neutral-300 hover:scale-95 transition duration-200 rounded-md mb-12 mt-1 text-sm'
            >
              Submit
            </button>
            <button
              onClick={() => setIsEditingDescription(false)}
              className='px-6 py-1 ml-3 bg-red-700 text-neutral-100 hover:bg-red-800 hover:scale-95 transition duration-200 rounded-md mb-12 mt-1 text-sm'
            >
              Cancel
            </button>
          </>
        )}
        {/* End of the Editing Description Logic */}

        {/* Comments Section */}
        {isSuccess &&
          usersDataSuccess &&
          allCommentsData.map((comment) => <Comments key={comment.id} {...comment} />)}
        {/* End of Comments Section */}

        {/* Add Comment Section */}
        <form>
          <textarea
            placeholder='Add Comment..'
            className='border bg-neutral-700 border-neutral-600 focus:border-violet-400 focus:bg-violet-400/20 resize-none rounded-md mt-2 w-full focus:outline-none py-3 px-3'
            value={commentData}
            onChange={(e) => setCommentData(e.target.value)}
          />
          <div className='mt-1 flex justify-between items-center'>
            <button
              onClick={handleAddComment}
              type='submit'
              className='bg-neutral-50 hover:bg-neutral-300 hover:scale-95 transition duration-200 text-neutral-950 rounded-md px-6 py-1'
            >
              Add Comment
            </button>
            {userData.role === "1" && (
              <button
                disabled={status !== "done"}
                onClick={handleAttachmentMenuOpen}
                className={` text-neutral-50 rounded-md px-6 py-1 bg-opacity-60  transition duration-200 ${
                  status !== "done"
                    ? "cursor-not-allowed bg-green-900 text-neutral-500"
                    : "hover:scale-95 hover:bg-green-800 bg-green-700"
                }`}
              >
                Add Attachment
              </button>
            )}
          </div>
        </form>
        {/* End of Add Comment Section */}
        {isAttachmentMenuActive && (
          <Attachment setIsMenuOpen={setIsAttachmentMenuActive} taskId={taskId} />
        )}
      </motion.div>
    </div>
  );
};

export default CardMenu;
