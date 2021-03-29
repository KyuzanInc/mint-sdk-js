import { Store, combineReducers } from 'redux'
import logger from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { walletSlice, initialState } from './wallet'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  app: combineReducers({
    wallet: walletSlice.reducer,
  }),
  ui: combineReducers({}),
})

const preloadedState = () => {
  return {
    app: { wallet: initialState },
    ui: {},
  }
}

export type StoreState = ReturnType<typeof preloadedState>
export type ReduxStore = Store<StoreState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
const middlewareList = [...getDefaultMiddleware(), logger]
const store = configureStore({
  reducer: rootReducer,
  middleware: middlewareList,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: preloadedState(),
})
export const getStore = () => {
  return store
}
