import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import registerReducer from './slices/registerSlice';
import projectReducer from './slices/projectSlice';
import taskReducer from './slices/taskSlice';

export default configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
    login: loginReducer,
    register: registerReducer,
  },
})