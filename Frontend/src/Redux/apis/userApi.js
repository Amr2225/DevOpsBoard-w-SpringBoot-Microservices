import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8082/api/User/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "GetAll",
        method: "GET",
      }),

      transformResponse: (res) => {
        const users = res.filter((user) => user.role === 1);
        return users.map((user) => ({
          id: user.id,
          name: user.userName,
        }));
      },
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "GetAll",
        method: "GET",
      }),

      transformResponse: (res) => {
        return res.map((user) => ({
          id: user.id,
          name: user.userName,
          role: user.role,
        }));
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetAllUsersQuery } = userApi;
export default userApi;
