import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { IDLE, LOADING, SUCCEEDED, FAILED } from '../../constant';
import { per_page, MAX_FETCH } from '../../constant';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  tasks: [],
  project: {},
  fetchStatus: IDLE, // 'idle' | 'loading' | 'succeeded' | 'failed'
  fetchError: null,
  formStatus: IDLE,
  submitError: null,
  current_page: 1,
  total_page: 1,
  task: {},
  // filter: {
  //   name: '',
  //   code: '',
  // },
  // sortBy: 'name',
  // sortType: 'asc',
};

const taskSlice = createSlice({
  name: 'tasks_page',
  initialState: initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.data;
      state.current_page = action.payload.current_page;
      state.total_page = action.payload.last_page;
      state.fetchStatus = SUCCEEDED;
      state.fetchError = null;
    },
    setTask: (state, action) => {
      state.task = action.payload.data;
    },
    setProject: (state, action) => {
      state.project = action.payload.data;
    },
    setFetchTasksLoading: (state) => {
      state.fetchStatus = LOADING;
      state.fetchError = null;
    },
    setFetchTasksError: (state, action) => {
      state.fetchStatus = FAILED;
      state.fetchError = action.payload;
    },
    setFormTaskLoading: (state) => {
      state.formStatus = LOADING;
      state.fetchError = null;
    },
    setFormTaskSuccess: (state) => {
      state.formStatus = SUCCEEDED;
      state.fetchError = null;
    },
    setFormTaskError: (state, action) => {
      state.formStatus = FAILED;
      state.fetchError = action.payload;
    },
    resetFormTask: (state) => {
      state.formStatus = IDLE;
      state.fetchError = null;
    },
  }
});

export const {
  setTasks,
  setTask,
  setProject,
  setFetchTasksLoading,
  setFetchTasksError,
  setFormTaskLoading,
  setFormTaskSuccess,
  setFormTaskError,
  resetFormTask
} = taskSlice.actions;

export const fetchInitial = (project_id) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchTasksLoading());

      let postData = { page: 1, per_page: per_page, project_id: project_id };
      const response = await axios.post(`${baseUrl}/api/task/search`, postData, setConfig());
      const arrTasks = response.data;

      postData.per_page = MAX_FETCH;
      const projectResponse = await axios.get(`${baseUrl}/api/project/${project_id}`, setConfig());
      const project = projectResponse.data;
      dispatch(setTasks(arrTasks));
      dispatch(setProject(project));
    } catch (e) {
      dispatch(setFetchTasksError(e?.response?.data?.message));
    }
  }
};

export const fetchTasks = (page, per_page, filter) => {
  return async (dispatch) => {
    try {
      let postData = { page, per_page, ...filter };
      dispatch(setFetchTasksLoading());
      const response = await axios.post(`${baseUrl}/api/task/search`, postData, setConfig());
      const arrTasks = response.data;
      dispatch(setTasks(arrTasks));
    } catch (e) {
      dispatch(setFetchTasksError(e?.response?.data?.message));
    }
  }
};

export const saveTask = (task) => {
  return async (dispatch) => {
    try {
      dispatch(setFormTaskLoading());
      await axios.post(`${baseUrl}/api/task`, task, setConfig());
      dispatch(setFormTaskSuccess());
    } catch (e) {
      dispatch(setFormTaskError(e?.response?.data?.message));
    }
  }
}

export const updateTask = (id, task) => {
  return async (dispatch) => {
    try {
      dispatch(setFormTaskLoading());
      await axios.post(`${baseUrl}/api/task/${id}`, task, setConfig());
      dispatch(setFormTaskSuccess());
    } catch (e) {
      dispatch(setFormTaskError(e?.response?.data?.message));
    }
  }
}

export const deleteTask = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setFormTaskLoading());
      await axios.delete(`${baseUrl}/api/task/${id}`, setConfig());
      dispatch(setFormTaskSuccess());
    } catch (e) {
      dispatch(setFormTaskError(e?.response?.data?.message));
    }
  }
}

export const fetchTask = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/api/task/${id}`, setConfig());
      const task = response.data;
      dispatch(setTask(task));
    } catch (e) {
    }
  }
};

export default taskSlice.reducer;