import { useSelector } from "react-redux";
import { useGetRejectedProjectsQuery } from "../../Redux/apis/projectsApi";

const RejectProjects = () => {
  const { userData } = useSelector((state) => state.user);
  const { data, isSuccess } = useGetRejectedProjectsQuery(+userData.id);

  return (
    <div>
      <h1 className='text-neutral-100 text-3xl font-bold'>Rejected Projects</h1>
      <table className='text-neutral-100 w-[70%] mx-auto border border-neutral-700 rounded-2xl mt-10'>
        <thead className='text-left bg-neutral-800 rounded-md'>
          <tr>
            <th className='p-2 text-lg'>Project Name</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data.map((project, index) => (
              <tr key={index} className='border-b border-neutral-700'>
                <td className='p-2'>{project.title}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RejectProjects;
