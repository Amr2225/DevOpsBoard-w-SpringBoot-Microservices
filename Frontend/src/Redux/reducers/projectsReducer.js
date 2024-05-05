import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projectsData: [],
  },
  reducers: {
    setProjectData: (state, action) => {
      state.projectsData = action.payload;
    },
  },
});

export const { setProjectData } = projectSlice.actions;
export default projectSlice.reducer;
