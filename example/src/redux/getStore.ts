import { Store, combineReducers } from 'redux'
import logger from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { walletSlice, initialState } from './wallet'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { initialItemState, itemsSlice } from './items'

const rootReducer = combineReducers({
  app: combineReducers({
    wallet: walletSlice.reducer,
  }),
  ui: combineReducers({
    items: itemsSlice.reducer,
  }),
})

const preloadedState = () => {
  return {
    app: { wallet: initialState },
    ui: { items: initialItemState },
  }
}

export type StoreState = ReturnType<typeof preloadedState>
export type ReduxStore = Store<StoreState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
const middlewareList = [
  ...getDefaultMiddleware({ serializableCheck: false }),
  logger,
]
const store = configureStore({
  reducer: rootReducer,
  middleware: middlewareList,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: preloadedState(),
})
export const getStore = () => {
  return store
}
