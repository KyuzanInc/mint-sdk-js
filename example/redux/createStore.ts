import { Store, combineReducers } from 'redux'
import logger from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterSlice, { initialState as counterState } from './counter/slice'

const rootReducer = combineReducers({
  app: combineReducers({
    counter: counterSlice.reducer,
  }),
  ui: combineReducers({}),
})

const preloadedState = () => {
  return {
    app: { counter: counterState },
    ui: {},
  }
}

export type StoreState = ReturnType<typeof preloadedState>

export type ReduxStore = Store<StoreState>

export const createStore = () => {
  const middlewareList = [...getDefaultMiddleware(), logger]
  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  })
}
