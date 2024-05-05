import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProjectData } from "../reducers/projectsReducer";

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5164/api/Project/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  tagTypes: ["projectData", "assignedProjects", "pendingProjects", "acceptedProjects"],
  endpoints: (builder) => ({
    //Dev APIS
    //SAVES THE DATA IN THE STORE TO BE EASLY ACCESSIBLE IN THE SIDEBAR FOR THE DEV
    getAcceptedProjects: builder.query({
      query: (id) => ({
        url: `GetAcceptedProjects?userId=${id}`,
        method: "GET",
      }),
      providesTags: ["acceptedProjects"],
      transformResponse: (res) => {
        console.log(res);
        return res.value.map((project) => ({
          projectId: project.projectId,
          userId: project.userId,
          status: project.status,
          title: project.projects.title,
        }));
      },
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProjectData(data));
        } catch (err) {
          console.error("Error ", err);
        }
      },
    }),

    getPendingProjects: builder.query({
      query: (id) => ({
        url: `GetPendingProjects?userId=${id}`,
        method: "GET",
      }),

      providesTags: ["pendingProjects"],
      transformResponse: (res) => {
        return res.value.map((project) => ({
          projectId: project.projectId,
          userId: project.userId,
          status: project.status,
          title: project.projects.title,
        }));
      },
    }),

    getRejectedProjects: builder.query({
      query: (id) => ({
        url: `GetRejectedProjects?userId=${id}`,
        method: "GET",
      }),
      transformResponse: (res) => {
        return res.value.map((project) => ({
          projectId: project.projectId,
          userId: project.userId,
          status: project.status,
          title: project.projects.title,
        }));
      },
    }),
    //DEV ACCPETS AND REJECTS A PROJECT
    updateProjectStatus: builder.mutation({
      query: (newAssignedProjectData) => ({
        url: "UpdateAssignedProject",
        method: "PUT",
        body: newAssignedProjectData,
      }),
      invalidatesTags: ["acceptedProjects", "pendingProjects"],
    }),

    //TEAM LEADER APIS
    //Get All assigned projects
    getAssignedProjects: builder.query({
      query: () => ({
        url: "GetAllAssignedProjects",
        method: "GET",
      }),

      providesTags: ["assignedProjects"],
      transformResponse: (res) => {
        console.log(res.value);
        return res.value.map((project) => ({
          projectId: project.projectId,
          userId: project.userId,
          status: project.status,
        }));
      },
    }),

    // Assign devs to projects
    assignDev: builder.mutation({
      query: (assignedProject) => ({
        url: "AssignProject",
        method: "POST",
        body: assignedProject,
      }),
      invalidatesTags: ["assignedProjects"],
    }),

    // Un Assign devs from projects
    unAssignDev: builder.mutation({
      query: ({ userId, projectId }) => ({
        url: `DeleteAssignedProject?userId=${userId}&projectId=${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assignedProjects"],
    }),

    //READ
    getProjects: builder.query({
      query: () => ({
        url: "GetAll",
        method: "GET",
      }),

      providesTags: ["projectData"],
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(
            setProjectData(data.map((project) => ({ projectId: project.id, title: project.title })))
          );
        } catch (err) {
          console.error("Error ", err);
        }
      },
    }),

    //CREATE
    addProject: builder.mutation({
      query: (newProject) => ({
        url: "Create",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["projectData"],
    }),

    //UPDATE
    updateProject: builder.mutation({
      query: (newProject) => ({
        url: `UpdateProject?id=${newProject.id}`,
        method: "PUT",
        body: { title: newProject.title },
      }),
      invalidatesTags: ["projectData"],
    }),

    //DELETE
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `DeleteProject?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projectData"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectStatusMutation,
  useAssignDevMutation,
  useUnAssignDevMutation,
  useGetProjectsQuery,
  useGetAssignedProjectsQuery,
  useGetPendingProjectsQuery,
  useGetAcceptedProjectsQuery,
  useGetRejectedProjectsQuery,
} = projectsApi;
export default projectsApi;
