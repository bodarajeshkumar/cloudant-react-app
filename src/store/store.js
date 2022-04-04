import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { devToolsEnhancer } from 'redux-devtools-extension';
import usersSlice from './reducers/index'

export default configureStore({
  reducer: {
    userData: usersSlice,
  },
  devTools: true
})
