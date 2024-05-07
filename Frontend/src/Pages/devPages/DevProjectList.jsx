import { useSelector } from "react-redux";
import {
  useGetPendingProjectsQuery,
  useUpdateProjectStatusMutation,
} from "../../Redux/apis/projectsApi";

const DevProjectList = () => {
  const { userData } = useSelector((state) => state.user);
  const { data: pendingProjects, isSuccess } = useGetPendingProjectsQuery(userData.id);
  const [UpdateProjectStatus] = useUpdateProjectStatusMutation();

  console.log(pendingProjects);
  return (
    <div>
      <h1 className='text-neutral-100 text-3xl font-bold'>Projects Lists</h1>
      <table className='text-neutral-100 w-[70%] mx-auto border border-neutral-700 rounded-2xl mt-10'>
        <thead className='text-left bg-neutral-800 rounded-md'>
          <tr>
            <th className='p-2 text-lg'>Project Name</th>
            <th className='p-2 text-lg'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            pendingProjects.map((project, index) => (
              <tr key={index} className='border-b border-neutral-700'>
                <td className='p-2'>{project.title}</td>
                <td className='p-2 flex gap-2'>
                  <button
                    onClick={() =>
                      UpdateProjectStatus({
                        userId: +userData.id,
                        projectId: +project.projectId,
                        status: "accepted",
                      })
                    }
                    className='bg-green-700 px-4 py-0.5 rounded-sm'
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      UpdateProjectStatus({
                        userId: +userData.id,
                        projectId: +project.projectId,
                        status: "rejected",
                      })
                    }
                    className='bg-red-700 px-4 py-0.5 rounded-sm'
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DevProjectList;
