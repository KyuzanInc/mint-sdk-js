import { transactionSlice, initialTransactionState } from './transaction/index'
import { Store, combineReducers, AnyAction, CombinedState } from 'redux'
import {
  createRouterMiddleware,
  initialRouterState,
  routerReducer,
} from 'connected-next-router'
import logger from 'redux-logger'
import Router from 'next/router'
import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RouterState } from 'connected-next-router/types'
import { walletSlice, initialState } from './wallet'
import { initialItemsState, itemsSlice } from './items'
import { initialItemState, itemSlice } from './item'
import { historySlice, initialHistoryState } from './history'
import { initialMyItemsState, myItemsSlice } from './myItems'

const rootReducer = combineReducers({
  router: routerReducer,
  app: combineReducers({
    wallet: walletSlice.reducer,
    myItems: myItemsSlice.reducer,
    items: itemsSlice.reducer,
    item: itemSlice.reducer,
    history: historySlice.reducer,
    transaction: transactionSlice.reducer,
  }),
  // ui: combineReducers({
  // }),
})
const getInitialState = (asPath?: string) => {
  let preloadedState = {
    router: initialRouterState(),
    app: {
      wallet: initialState,
      myItems: initialMyItemsState,
      items: initialItemsState,
      item: initialItemState,
      history: initialHistoryState,
      transaction: initialTransactionState,
    },
    // ui: {},
  }
  if (asPath) {
    preloadedState = {
      ...preloadedState,
      router: initialRouterState(asPath),
    }
  }
  return preloadedState
}

// Using next-redux-wrapper's initStore
const reducer = (
  state:
    | CombinedState<{
        router: RouterState
        app: StoreState['app']
      }>
    | undefined,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.app.router = state.router
    }
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

export type StoreState = ReturnType<typeof getInitialState>
export type ReduxStore = Store<StoreState>
export type AppDispatch = ReturnType<typeof getStore>['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
const getStore: MakeStore<StoreState> = (context: any) => {
  const { asPath } = context.ctx || Router.router || {}
  const preloadedState = getInitialState(asPath)

  const middlewareList = [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    logger,
    createRouterMiddleware(),
  ]
  const store = configureStore({
    reducer: reducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState,
  })
  return store
}
export const wrapper = createWrapper(getStore)
