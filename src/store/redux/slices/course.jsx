import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseApi from "../../../services/api/courseApi";

let initialState = {
  paidCourse: localStorage.getItem("course") ? JSON.parse(localStorage.getItem("course")) : [],
  classes: localStorage.getItem("kelas") ? JSON.parse(localStorage.getItem("kelas")) : [],
  classPackage: [
    {
      id: 1,
      content: (
        <>
          <i className="fa-regular fa-file"></i>
          Ujian Akhir
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          <i className="fa-solid fa-video"></i>
          49 Video
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          <i className="fa-regular fa-file-word"></i>7 Dokumen
        </>
      ),
    },
    {
      id: 4,
      content: (
        <>
          <i className="fa-regular fa-newspaper"></i>
          Sertifikat
        </>
      ),
    },
    {
      id: 5,
      content: (
        <>
          <i className="fa-regular fa-pen-to-square"></i>
          Pretest
        </>
      ),
    },
  ],
};

export const getAllCourse = createAsyncThunk("course/getAllCourse", async () => {
  const courseData = await courseApi.getAllCourseList();
  return courseData;
});

export const addToPaidCourse = createAsyncThunk("course/addToPaidCourse", async ({ course }) => {
  const paidCourse = await courseApi.addCourseToPaidCourse(course.courseId);
  return paidCourse;
});

export const getAllPaidCourse = createAsyncThunk("course/getAllPaidCourse", async () => {
  const paidCourseData = await courseApi.getAllPaidCourse();
  return paidCourseData;
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    filteredClass: (state, action) => {
      const courses = state.classes;
      let category = action.payload?.category || "";
      if (category !== "") {
        const filtered = courses.filter((c) => c.category == category);
        state.classes = [...filtered];
      }
    },
    resetFilter: (state) => {
      const storedData = JSON.parse(localStorage.getItem("kelas"));
      state.classes = [...storedData];
    },
    filteredCourse: (state, action) => {
      const courses = state.classes;
      let keyword = action.payload?.keyword || "";
      if (keyword !== "") {
        const filtered = courses.filter((c) => c.title.toLowerCase().includes(keyword.toLowerCase()));
        state.paidCourse = [...filtered];
      }
    },
    resetCourseFilter: () => {
      const storedData = JSON.parse(localStorage.getItem("course"));
      state.paidCourse = [...storedData];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCourse.fulfilled, (state, action) => {
      state.classes = action.payload;
    });
    builder.addCase(getAllPaidCourse.fulfilled, (state, action) => {
      state.paidCourse = action.payload;
    });
    builder.addCase(addToPaidCourse.fulfilled, (state, action) => {
      state.paidCourse.push(action.payload);
    });
  },
});

export const { filteredClass, resetFilter, filteredCourse, resetCourseFilter } = courseSlice.actions;
export default courseSlice.reducer;
