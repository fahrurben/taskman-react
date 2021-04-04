import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { IDLE, LOADING, SUCCEEDED, FAILED, AUTH_TOKEN_KEY } from '../../constant';
import { setFormTaskError, setFormTaskLoading, setFormTaskSuccess } from './taskSlice';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  formStatus: IDLE,
  submitError: null,
};

const loginSlice = createSlice({
  name: 'login_page',
  initialState: initialState,
  reducers: {
    setFormLoginLoading: (state) => {
      state.formStatus = LOADING;
      state.fetchError = null;
    },
    setFormLoginSuccess: (state) => {
      state.formStatus = SUCCEEDED;
      state.fetchError = null;
    },
    setFormLoginError: (state, action) => {
      state.formStatus = FAILED;
      state.fetchError = action.payload;
    },
    resetFormLogin: (state) => {
      console.log('reset login');
      state.formStatus = IDLE;
      state.fetchError = null;
    },
  },
});

export const {
  setFormLoginLoading,
  setFormLoginSuccess,
  setFormLoginError,
  resetFormLogin
} = loginSlice.actions;

export const doLogin = (authData) => {
  return async (dispatch) => {
    try {
      dispatch(setFormLoginLoading());
      const response = await axios.post(`${baseUrl}/api/auth/login`, authData, setConfig());
      localStorage.setItem(AUTH_TOKEN_KEY, response?.data?.access_token);
      await setTimeout(() => {  dispatch(setFormLoginSuccess()); }, 100);
    } catch (e) {
      dispatch(setFormLoginError(e?.response?.data?.message));
    }
  }
}

export default loginSlice.reducer;