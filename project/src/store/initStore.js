import CommonReducer from './reducer/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { enableES5 } from 'immer'
enableES5()

const middleWare = [thunk]
const middleWareEnhancer = applyMiddleware(...middleWare)
const enhasers = [middleWareEnhancer]

const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...enhasers)
  : compose([...enhasers])

const persistConfig = {
  key: 'root',
  storage,
  version: 0,
}
const persisterRootReducer = persistReducer(persistConfig, CommonReducer)

export const store = createStore(
  persisterRootReducer,
  undefined,
  composedEnhancers
)
export const persist = persistStore(store)
