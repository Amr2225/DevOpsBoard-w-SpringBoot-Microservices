import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setTasksData } from "../reducers/taskReducer";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/Task/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  tagTypes: ["tasks", "assignedDevs"],
  endpoints: (builder) => ({
    //Dev API
    //READ
    getAllTasks: builder.query({
      query: () => ({
        url: "getTaskss",
        method: "GET",
      }),
    }),

    //Assigned Task
    getTasks: builder.query({
      query: ({ id, role, projectId }) => ({
        url: `GetTasks?userId=${id}&role=${role}&projectId=${projectId}`,
        method: "GET",
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTasksData(data));
        } catch (e) {
          console.error(e);
        }
      },
      providesTags: ["tasks"],
    }),

    //Team Leader APIs
    //CREATE
    createTask: builder.mutation({
      query: (newTaskData) => ({
        url: "AddTask",
        method: "POST",
        body: newTaskData,
      }),
      invalidatesTags: ["tasks"],
    }),

    //UPDATE
    updateTask: builder.mutation({
      query: (updatedTask) => ({
        url: "UpdateTask",
        method: "PUT",
        body: updatedTask,
      }),
      invalidatesTags: ["tasks"],
    }),

    //DELETE
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `DeleteTask?taskId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),

    //ASSIGN TASKS
    assignTasks: builder.mutation({
      query: (newAssignedTask) => ({
        url: "AssignTask",
        method: "POST",
        body: newAssignedTask,
      }),
      invalidatesTags: ["assignedDevs"],
    }),

    //DEV AND TEAM LEADER API
    //GET ASSIGNED DEVS
    getAssignedDevs: builder.query({
      query: (taskId) => ({
        url: `GetAssignedDevs?taskId=${taskId}`,
        method: "GET",
      }),
      providesTags: ["assignedDevs"],
    }),

    //GET UNASSIGNED DEVS
    getUnassignedDevs: builder.query({
      query: (taskId) => ({
        url: `GetUnassignedDevs?taskId=${taskId}`,
        method: "GET",
      }),

      transformResponse: (res) => {
        return res.value;
      },

      providesTags: ["assignedDevs"],
    }),

    //ATTACHMENT API
    //GET ATTACHMENT
    getAttachments: builder.query({
      query: () => ({
        url: "GetAllAttachedTasks",
        method: "GET",
      }),
    }),

    //ASSIGN ATTACHMENT
    assignAttachment: builder.mutation({
      query: (data) => ({
        url: "AttachFile",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetTasksQuery,
  useGetAssignedDevsQuery,
  useGetUnassignedDevsQuery,
  useGetAttachmentsQuery,
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAssignTasksMutation,
  useAssignAttachmentMutation,
} = taskApi;
export default taskApi;
