import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { IDLE, LOADING, SUCCEEDED, FAILED } from '../../constant';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  projects: [],
  fetchStatus: IDLE, // 'idle' | 'loading' | 'succeeded' | 'failed'
  fetchError: null,
  formStatus: IDLE,
  submitError: null,
  current_page: 1,
  total_page: 1,
  project: {},
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
      state.fetchStatus = SUCCEEDED;
      state.fetchError = null;
    },
    setProject: (state, action) => {
      state.project = action.payload.data;
    },
    setFetchProjectsLoading: (state) => {
      state.fetchStatus = LOADING;
      state.fetchError = null;
    },
    setFetchProjectsError: (state, action) => {
      state.fetchStatus = FAILED;
      state.fetchError = action.payload;
    },
    setFormProjectLoading: (state) => {
      state.formStatus = LOADING;
      state.fetchError = null;
    },
    setFormProjectSuccess: (state) => {
      state.formStatus = SUCCEEDED;
      state.fetchError = null;
    },
    setFormProjectError: (state, action) => {
      state.formStatus = FAILED;
      state.fetchError = action.payload;
    },
    resetFormProject: (state) => {
      state.formStatus = IDLE;
      state.fetchError = null;
    },
  },
});

export const {
  setProjects,
  setProject,
  setFetchProjectsLoading,
  setFetchProjectsError,
  setFormProjectLoading,
  setFormProjectSuccess,
  setFormProjectError,
  resetFormProject,
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
      dispatch(setFormProjectLoading());
      const response = await axios.post(`${baseUrl}/api/project`, project, setConfig());
      dispatch(setFormProjectSuccess());
    } catch (e) {
      dispatch(setFormProjectError(e?.response?.data?.message));
    }
  }
}

export const updateProject = (id, project) => {
  return async (dispatch) => {
    try {
      dispatch(setFormProjectLoading());
      const response = await axios.post(`${baseUrl}/api/project/${id}`, project, setConfig());
      dispatch(setFormProjectSuccess());
    } catch (e) {
      dispatch(setFormProjectError(e?.response?.data?.message));
    }
  }
}

export const deleteProject = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setFormProjectLoading());
      const response = await axios.delete(`${baseUrl}/api/project/${id}`, setConfig());
      dispatch(setFormProjectSuccess());
    } catch (e) {
      dispatch(setFormProjectError(e?.response?.data?.message));
    }
  }
}

export const fetchProject = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/api/project/${id}`, setConfig());
      const project = response.data;
      dispatch(setProject(project));
    } catch (e) {
    }
  }
};

export default projectsSlice.reducer;