import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5164/api/User/",
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
        return res.value.map((user) => ({
          id: user.id,
          name: user.firstName + " " + user.lastName,
        }));
      },
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
export default userApi;
