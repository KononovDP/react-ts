import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IUserItem } from 'interfaces';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUserItem[], number>({
      query: (limit = 20) => ({
        url: 'users/',
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ['Users'],
    }),
    fetchUser: build.query<IUserItem, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    addUser: build.mutation<IUserItem, IUserItem>({
      query: (user) => ({
        url: 'users/',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: build.mutation<IUserItem, IUserItem>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    removeUser: build.mutation<IUserItem, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useFetchAllUsersQuery,
  useFetchUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = usersAPI;
