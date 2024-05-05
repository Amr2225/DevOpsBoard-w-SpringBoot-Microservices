import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commnetsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5164/api/Comment/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  tagTypes: ["comments"],
  endpoints: (builder) => ({
    // READ
    getCommnets: builder.query({
      query: (taskId) => ({
        url: `GetComments?taskId=${taskId}`,
        method: "GET",
      }),

      providesTags: ["comments"],
      transformResponse: (res) => {
        console.log(res);
        return res.map((comment) => ({
          id: comment.id,
          userId: comment.userId,
          taskId: comment.taskId,
          userName: comment.users.firstName + " " + comment.users.lastName,
          role: comment.users.roleId === 1 ? "Developer" : "Team Leader",
          comment: comment.comment,
        }));
      },
    }),

    //CREATE
    addComment: builder.mutation({
      query: (CommentData) => ({
        url: "Create",
        method: "POST",
        body: CommentData,
      }),

      invalidatesTags: ["comments"],
    }),
  }),
});

export const { useGetCommnetsQuery, useAddCommentMutation } = commnetsApi;

export default commnetsApi;
