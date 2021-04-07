export const API_URL = process.env.REACT_APP_API_URL;
export const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

export const sortTypeOptions = [
  { id: 'asc', name: 'Asc' },
  { id: 'desc', name: 'Desc' },
];

export const per_page = 5;
export const MAX_FETCH = 1000;
// 'idle' | 'loading' | 'succeeded' | 'failed'
export const IDLE = 'idle';
export const LOADING = 'loading';
export const SUCCEEDED = 'succeeded';
export const FAILED = 'failed';

export const TASK_TYPES = ['Bug'];
export const PRIORITY_TYPES = ['Low', 'Normal', 'High'];
export const STATUS_TYPES = ['Back Log', 'In Progress', 'Done'];
export const PRIORITY_COLORS = ['bg-green-500', 'bg-gray-500', 'bg-red-500'];