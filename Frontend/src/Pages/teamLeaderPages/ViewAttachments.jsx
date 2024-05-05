import { useGetAttachmentsQuery } from "../../Redux/apis/taskApi";

const ViewAttachments = () => {
  const { data, isSuccess } = useGetAttachmentsQuery();

  return (
    <div>
      <h1 className='text-neutral-100 text-3xl font-bold'>View Attachments</h1>
      <table className='text-neutral-100 w-[70%] mx-auto border border-neutral-700 rounded-2xl mt-10'>
        <thead className='text-left bg-neutral-800 rounded-md'>
          <tr>
            <th className='p-2 text-lg'>Developer</th>
            <th className='p-2 text-lg'>Task</th>
            <th className='p-2 text-lg'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data.map((task, index) => (
              <tr key={index} className='border-b border-neutral-700'>
                <td className='p-2 capitalize'>{task.userName}</td>
                <td className='p-2'>{task.task}</td>
                <td className='p-2 flex gap-2'>
                  <a
                    href={task.attachment}
                    target='_blank'
                    className='bg-green-700 px-4 py-0.5 rounded-sm w-[90%] hover:bg-green-800 hover:scale-95 transition duration-100 text-center'
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttachments;
