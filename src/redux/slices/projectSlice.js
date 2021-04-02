import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  projects: [],
  fetchStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  fetchError: null,
  submitLoading: false,
  submitError: null,
  current_page: 1,
  total_page: 1,
  filter: {
    name: '',
    code: '',
  },
  sortBy: 'name',
  sortType: 'asc',
};

const projectsSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload.data;
      state.current_page = action.payload.current_page;
      state.total_page = action.payload.last_page;
      state.fetchStatus = 'succeeded';
      state.fetchError = null;
    },
    setFetchProjectsLoading: (state) => {
      state.fetchStatus = 'loading';
      state.fetchError = null;
    },
    setFetchProjectsError: (state, action) => {
      state.fetchStatus = 'error';
      state.fetchError = action.payload;
    },
  },
});

export const {
  setProjects,
  setFetchProjectsLoading,
  setFetchProjectsError,
} = projectsSlice.actions;

export const fetchProjects = (page, per_page, filter) => {
  return async (dispatch) => {
    try {
      let postData = { page, per_page, ...filter };
      dispatch(setFetchProjectsLoading());
      const response = await axios.post(`${baseUrl}/api/project/search`, postData, setConfig());
      const arrProjects = response.data;
      dispatch(setProjects(arrProjects));
    } catch (e) {
      dispatch(setFetchProjectsError(e?.response?.data?.message));
    }
  }
};

export default projectsSlice.reducer;