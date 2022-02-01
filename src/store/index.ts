import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersAPI } from 'store/usersService';
import authSlice from './authSlice';
import usersSlice from './usersSlice';
import loadingSlice from './loadingSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  users: usersSlice,
  loading: loadingSlice,
  [usersAPI.reducerPath]: usersAPI.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'users'],
  blacklist: [usersAPI.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(usersAPI.middleware),
});

export const persistor = persistStore(store);
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
