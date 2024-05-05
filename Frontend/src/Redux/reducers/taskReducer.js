import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    taskData: [],
  },
  reducers: {
    setTasksData: (state, action) => {
      state.taskData = action.payload;
    },
  },
});

export const { setTasksData, setAssignedDevelopers } = taskSlice.actions;
export default taskSlice.reducer;
