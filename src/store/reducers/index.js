import { combineReducers } from 'redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import listAllUsers from './../api/client'
import { listAllUsers, deleteUser, createUser, editUser} from '../api/client';

const initialState =
  {
    headers: [{key: "id", header: "id" }, {key: "firstName", header: "FirstName"}, {key: "lastName", header: "LastName"}, {key: "email", header: "Email Address"}],
    rows: [],
    loading: false,
    registrationStatus: false,
    modificationStatus: false,
    showModal: false,
  };


export const fetchUsers = createAsyncThunk('userData/fetchUsers', async (thunkAPI) => {
  /*const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(
      (data) => data.json()
  )*/
  const client = await listAllUsers();
  return client;
});

export const deleteRow = createAsyncThunk('userData/deleteRow', async(userId) => {
  const client = await deleteUser(userId);
  return client;
})

export const registerUser = createAsyncThunk('userData/registerUser', async(userObj) => {
  const client = await createUser(userObj);
  return client;
})

export const modifyUser = createAsyncThunk('userData/modifyUser', async(userObj) => {
  return await editUser(userObj)
})

const reducer = (state  = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const usersSlice = createSlice({
  name: 'userData',
  initialState: initialState,
  reducers: {
    previewModal: (state, action) => {
      switch (action.type ) {
        case 'ON':
          return (
              {
                ...state,
                showModal: false
              }
          )
        default:
          return state;
      }
    }

  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = false
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.loading = true
      state.rows = payload.data
    },
    [fetchUsers.rejected]: (state) => {
      state.loading = false
    },
    [deleteRow.pending]: (state) => {
      state.loading = false
    },
    [deleteRow.fulfilled]: (state, {payload}) => {
      state.loading = true
      state.rows = payload.data
    },
    [deleteRow.rejected]: (state) => {
      state.loading = false
    },
    [registerUser.pending]: (state) => {
      state.loading = false;
    },
    [registerUser.fulfilled]: (state, {payload}) => {
      state.loading = true;
      console.log('ser response', payload.flag);
      state.registrationStatus = payload.flag
    },
    [registerUser.rejected]: (state) => {
      state.loading = false;
    },
    [modifyUser.pending]: (state) => {
      state.loading = false;
    },
    [modifyUser.fulfilled]: (state, {payload}) => {
      state.loading = true;
      state.modificationStatus = true;
      state.rows = payload.data
    },
    [modifyUser.rejected]: (state) => {
      state.loading = false;
    }
  }
})



//export const { deleteRow} =  usersSlice.actions;
export default usersSlice.reducer;
export const allRows = (state) => state.userData;
export const tableDataStatus = (state) => state.loading
export const showRegistrationStatus = (state) => state.show
export const showModal = (state) => state.showModal;
export const { previewModal } = usersSlice.actions


