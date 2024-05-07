import { Error, LoadingSpinner } from "../../Components";
import { useGetAllTasksQuery, useGetAttachmentsQuery } from "../../Redux/apis/taskApi";
import { useGetUsersQuery } from "../../Redux/apis/userApi";

const ViewAttachments = () => {
  const { data, isSuccess, isError, isLoading } = useGetAttachmentsQuery();
  const { data: userData, isSuccess: userDataSuccess } = useGetUsersQuery();
  const { data: taskData, isSuccess: taskDataSuccess } = useGetAllTasksQuery();

  let attahmentsData;
  if (isSuccess && userDataSuccess && taskDataSuccess) {
    attahmentsData = data.map((attachmentData) => {
      const foundUser = userData.find((user) => user.id === attachmentData.userId);
      const foundTask = taskData.find((task) => task.id === attachmentData.taskId);
      if (foundUser && foundTask) {
        return {
          userName: foundUser.name,
          task: foundTask.title,
          attachment: attachmentData.attachment,
        };
      }
    });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div>
      <h1 className='text-neutral-100 text-3xl font-bold'>View Attachments</h1>
      <table className='text-neutral-100 w-[70%] mx-auto border border-neutral-700 rounded-2xl mt-10'>
        <thead className='text-left bg-neutral-800 rounded-md'>
          <tr>
            <th className='p-2 text-lg'>Developer</th>
            <th className='p-2 text-lg'>Task</th>
            <th className='p-2 text-lg'>Attachment</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            userDataSuccess &&
            taskDataSuccess &&
            attahmentsData.map((task, index) => (
              <tr key={index} className='border-b border-neutral-700'>
                <td className='p-2 capitalize'>{task.userName}</td>
                <td className='p-2'>{task.task}</td>
                <td className='p-2 flex gap-2 text-green-700'>{task.attachment}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttachments;
