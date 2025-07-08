import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refreshAccessToken,
} from "../api/auth.api.js";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.error = null;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const userData = action.payload.data;
        ``;
        state.loading = false;
        state.user = userData.user;
        state.accessToken = userData.accessToken;
        state.refreshToken = userData.refreshToken;

        // ✅ Save tokens in localStorage (optional)
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || // from backend
          action.payload || // if just a string
          action.error.message || // fallback
          "Login failed. Please try again.";
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const userData = action.payload.data;
        state.loading = false;
        state.user = userData.user;
        state.accessToken = userData.accessToken;
        state.refreshToken = userData.refreshToken;

        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error.message ||
          "Registration failed.";
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;

        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });

    builder
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });

    // Change Password
    // builder
    //   .addCase(changePassword.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(changePassword.fulfilled, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(changePassword.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload || action.error.message;
    //   });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
