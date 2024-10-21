import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : {
        uid: "",
        nama: "",
        email: "",
        password: "",
        no_hp: "",
      },
  isLoggedIn: localStorage.getItem("user") ? true : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload.userObj;
      const userInfo = {
        uid: +new Date(),
        nama: "user 1", //default value karena belom ada database / table user
        email: email,
        password: password,
        no_hp: "+621234567890", //default value karena belom ada database / table user
      };
      state.user = userInfo;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(userInfo));
    },
    register: (state, action) => {
      const { nama, email, password, no_hp } = action.payload.userObj;
      const userInfo = {
        uid: +new Date(),
        nama: nama,
        email: email,
        password: password,
        no_hp: no_hp,
      };
      state.user = userInfo;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(userInfo));
    },
    update: (state, action) => {
      const { nama, email, password, no_hp } = action.payload.userObj;
      const userInfo = {
        nama: nama,
        email: email,
        password: password,
        no_hp: no_hp,
      };
      state.user = { ...state.user, ...userInfo };
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(userInfo));
    },
    logout: (state) => {
      const userInfo = {
        uid: "",
        nama: "",
        email: "",
        password: "",
        no_hp: "",
      };
      state.user = userInfo;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("trx");
      localStorage.removeItem("course");
    },
  },
});

export const { login, register, update, logout } = userSlice.actions;
export default userSlice.reducer;
