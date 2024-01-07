import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    url: "",
    auth: {},
    zones: [],
    bins: [],
    binList: [],
    markers: [],
  },
  reducers: {
    addUserAuth: (state, { payload }) => {
      state.auth = payload;
    },
    addZones: (state, { payload }) => {
      state.zones = payload;
    },
    modifyZone: (state, { payload }) => {
      state.url = payload;
    },
    getBins: (state, { payload }) => {
      state.bins = payload;
    },
    addBins: (state, { payload }) => {
      state.binList = payload;
    },
    getMarkers: (state, { payload }) => {
      state.markers = payload;
    },
  },
});
export const {
  addUserAuth,
  addZones,
  modifyZone,
  getBins,
  addBins,
  getMarkers,
} = authSlice.actions;
export default authSlice.reducer;
