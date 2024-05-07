import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    taskData: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    setTasksData: (state, action) => {
      state.taskData = action.payload;
    },
  },
});

export const { setTasksData, setAssignedDevelopers } = taskSlice.actions;
export default taskSlice.reducer;
