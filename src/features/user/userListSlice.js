import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getPersonnel = createAsyncThunk(
  'users/getPersonnel',
  async ({ history }, thunkAPI) => {
    try {
      const response = await axios({
        url: 'api/get-personnel',
        method: 'GET'
      });
      if (response.data.status === 200) {
        return { ...response.data }
      } else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getUserList = createAsyncThunk(
  'users/getUserList',
  async ({ history, filter }, thunkAPI) => {
    try {
      const response = await axios({
        url: 'api/admin/get-user-list',
        method: 'GET',
        params: filter
      })
      if (response.data.status === 200) {
        return { ...response.data }
      } else {
        return thunkAPI.rejectWithValue(response.data.data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getUserListControls = createAsyncThunk(
  'users/getUserListsControls',
  async ({ history, filter }, thunkAPI) => {
    try {
      const response = await axios({
        url: 'api/admin/get-user-list-controls',
        method: 'GET',
        params: filter
      })
      if (response.data.status === 200) {
        return { ...response.data }
      } else {
        return thunkAPI.rejectWithValue(response.data.data)
      }
    } catch (error) {
      
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getDivision = createAsyncThunk(
  'users/getDivision',
  async ({ history }, thunkAPI) => {
    try {
      const response = await axios.get('api/get-division')
      if (response.data.status === 200) {
        return { ...response.data }
      }
      else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (error) {
      
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getUserRoles = createAsyncThunk(
  'users/getUserRoles',
  async ({ history }, thunkAPI) => {
    try {
      const response = await axios.get('api/admin/get-user-roles')
      if (response.data.status === 200) {
        return { ...response.data }
      }
      else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    users: [],
    divisions: [],
    userRoles: [],
    personnel: [],
    errors: '',
    isFetching: false,
  },
  reducers: {
    clearState: (state) => {
      state.users = [];
      state.divisions = [];
      state.userRoles = [];
      state.personnel = [];
      state.errors = '';
      state.isFetching = false
      return state
    },
    setListState: (state, action) => {
      state.users = action.payload;
      return state;
    },
    // addUser:(state,action)=>{
    //     state.users.data.pop();
    //     state.users.data.unshift(action.payload);
    //     return state;
    // }
  },
  extraReducers: {
    [getUserList.fulfilled]: (state, { payload }) => {
      state.users = payload.data;
      state.isFetching = false;
      state.errors = ''
    },
    [getUserList.rejected]: (state, { payload }) => {
      state.errors = payload
      state.isFetching = false;
    },
    [getUserList.pending]: (state) => {
      state.isFetching = true;
    },
    [getUserListControls.fulfilled]: (state, { payload }) => {
      state.users = payload.data;
      state.isFetching = false;
      state.errors = '';
    },
    [getUserListControls.rejected]: (state, { payload }) => {
      state.errors = payload;
      state.isFetching = false;
    },
    [getUserListControls.pending]: (state) => {
      state.isFetching = true;
    },
    [getDivision.pending]: (state) => {
      state.isFetching = true;
    },
    [getDivision.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.divisions = payload.data;
    },
    [getDivision.rejected]: (state, { payload }) => {
      state.isFetching = false;
    },
    [getUserRoles.pending]: (state) => {
      state.isFetching = true;
    },
    [getUserRoles.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.userRoles = payload.data;
    },
    [getUserRoles.rejected]: (state, { payload }) => {
      state.isFetching = false;
    },
    [getPersonnel.pending]: (state) => {
      state.isFetching = true;
    },
    [getPersonnel.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.personnel = payload.data;
    },
    [getPersonnel.rejected]: (state, { payload }) => {
      state.isFetching = false;
    },

  }
})