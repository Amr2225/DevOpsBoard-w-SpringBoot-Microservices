import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commnetsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8084/api/Comment/",
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
