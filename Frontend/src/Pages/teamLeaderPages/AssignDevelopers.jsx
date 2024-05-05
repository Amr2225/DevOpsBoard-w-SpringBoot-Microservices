import { useParams } from "react-router-dom";
import {
  useAssignDevMutation,
  useGetAssignedProjectsQuery,
  useUnAssignDevMutation,
} from "../../Redux/apis/projectsApi";
import { useGetUsersQuery } from "../../Redux/apis/userApi";
import { useSelector } from "react-redux";

const AssignDevelopers = () => {
  const [assignDev] = useAssignDevMutation();
  const [unAssignDev] = useUnAssignDevMutation();
  const { projectsData } = useSelector((state) => state.projects);
  const { data: userData, isSuccess: isUserDataSuccess } = useGetUsersQuery();
  const { data: assignedProjectsData, isSuccess: isProjectDataSuccess } =
    useGetAssignedProjectsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const params = useParams();

  console.log(projectsData);

  const project = projectsData.find((project) => project.projectId === +params.projectId);

  //   const devs = [
  //     {
  //       id: 1,
  //       name: "Amr Mohamed",
  //     },
  //     {
  //       id: 2,
  //       name: "Amr Mohamed",
  //     },
  //     {
  //       id: 3,
  //       name: "Amr Mohamed",
  //     },
  //   ];

  //   const assignedProjects = [
  //     {
  //       userId: 1,
  //       projectId: 2,
  //     },
  //     {
  //       userId: 2,
  //       projectId: 2,
  //     },
  //     {
  //       userId: 2,
  //       projectId: 1,
  //     },
  //   ];

  const AssignDev = async (userId, checked) => {
    if (checked) {
      await assignDev({
        userId: userId,
        projectId: params.projectId,
        status: "pending",
      });
    } else {
      //remove assigned dev from project;
      await unAssignDev({
        userId: userId,
        projectId: params.projectId,
      });
    }
  };

  const makeChecked = (userId) => {
    if (isProjectDataSuccess) {
      const value = assignedProjectsData
        .filter((project) => project.projectId == +params.projectId)
        .findIndex((project) => project.userId === userId);

      if (value === -1) return false;
      return true;
    }
  };

  const makeDisabledRejected = (userId) => {
    if (isProjectDataSuccess) {
      const value = assignedProjectsData
        .filter(
          (project) => project.projectId === +params.projectId && project.status === "rejected"
        )
        .findIndex((x) => x.userId === userId);

      if (value === -1) return false;
      return true;
    }
  };
  const makeDisabledAccepted = (userId) => {
    if (isProjectDataSuccess) {
      const value = assignedProjectsData
        .filter(
          (project) => project.projectId === +params.projectId && project.status === "accepted"
        )
        .findIndex((x) => x.userId === userId);

      if (value === -1) return false;
      return true;
    }
  };

  return (
    <div className='  rounded-md text-neutral-100 p-10 w-full'>
      <h1 className='border-b mb-8 text-3xl pb-1'>
        Assign Developers To <span>{project.title}</span>
      </h1>
      <div className='ml-5'>
        {isUserDataSuccess &&
          userData.map((dev) => (
            <div
              key={dev.id}
              className={`flex justify-between w-[80%] mx-auto bg-neutral-800 mb-2 px-4 py-1 border border-neutral-700 rounded-md items-center ${
                makeDisabledRejected(dev.id) && "project-rejected"
              } ${makeDisabledAccepted(dev.id) && "project-accepted"}`}
            >
              <div className='flex gap-2 items-center mb-3 '>
                <span className='rounded-full border w-6 h-6 grid place-content-center'>
                  {dev.name[0].toUpperCase()}
                </span>
                <h2 className={`text-lg font-bold capitalize`}>{dev.name}</h2>
              </div>
              <input
                type='checkbox'
                className='w-6 h-6 cursor-pointer disabled:cursor-not-allowed'
                checked={makeChecked(dev.id)}
                disabled={makeDisabledRejected(dev.id) || makeDisabledAccepted(dev.id)}
                onChange={(e) => AssignDev(dev.id, e.target.checked)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AssignDevelopers;
