import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSclice from "./slice/user_slice";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    user: userSclice
});

const persistedReducer = persistReducer({ key: 'root', version: 1, storage }, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
})


export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store