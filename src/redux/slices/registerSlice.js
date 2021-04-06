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

const registerSlice = createSlice({
  name: 'register_page',
  initialState: initialState,
  reducers: {
    setFormRegisterLoading: (state) => {
      state.formStatus = LOADING;
      state.submitError = null;
    },
    setFormRegisterSuccess: (state) => {
      state.formStatus = SUCCEEDED;
      state.submitError = null;
    },
    setFormRegisterError: (state, action) => {
      state.formStatus = FAILED;
      state.submitError = action.payload;
    },
    resetFormRegister: (state) => {
      state.formStatus = IDLE;
      state.submitError = null;
    },
  },
});

export const {
  setFormRegisterLoading,
  setFormRegisterSuccess,
  setFormRegisterError,
  resetFormRegister
} = registerSlice.actions;

export const doRegister = (data) => {
  return async (dispatch) => {
    try {
      dispatch(setFormRegisterLoading());
      const response = await axios.post(`${baseUrl}/api/register`, data, setConfig());
      await setTimeout(() => {  dispatch(setFormRegisterSuccess()); }, 100);
    } catch (e) {
      dispatch(setFormRegisterError(e?.response?.data?.error));
    }
  }
}

export default registerSlice.reducer;