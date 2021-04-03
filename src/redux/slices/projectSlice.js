import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { IDLE, LOADING, SUCCEEDED, FAILED } from '../../constant';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  projects: [],
  fetchStatus: IDLE, // 'idle' | 'loading' | 'succeeded' | 'failed'
  fetchError: null,
  formStatus: 'idle',
  submitError: null,
  current_page: 1,
  total_page: 1,
  // filter: {
  //   name: '',
  //   code: '',
  // },
  // sortBy: 'name',
  // sortType: 'asc',
};

const projectsSlice = createSlice({
  name: 'project_page',
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
      state.fetchStatus = LOADING;
      state.fetchError = null;
    },
    setFetchProjectsError: (state, action) => {
      state.fetchStatus = FAILED;
      state.fetchError = action.payload;
    },
    setFormProjectsLoading: (state) => {
      state.formStatus = LOADING;
      state.fetchError = null;
    },
    setFormProjectsSuccess: (state) => {
      state.formStatus = SUCCEEDED;
      state.fetchError = null;
    },
    setFormProjectsError: (state, action) => {
      state.formStatus = FAILED;
      state.fetchError = action.payload;
    },
    resetFormProjects: (state) => {
      state.formStatus = IDLE;
      state.fetchError = null;
    },
  },
});

export const {
  setProjects,
  setFetchProjectsLoading,
  setFetchProjectsError,
  setFormProjectsLoading,
  setFormProjectsSuccess,
  setFormProjectsError,
  resetFormProjects,
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

export const saveProject = (project) => {
  return async (dispatch) => {
    try {
      dispatch(setFormProjectsLoading());
      const response = await axios.post(`${baseUrl}/api/project`, project, setConfig());
      dispatch(setFormProjectsSuccess());
    } catch (e) {
      dispatch(setFormProjectsError(e?.response?.data?.message));
    }
  }
}

export default projectsSlice.reducer;