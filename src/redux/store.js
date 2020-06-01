import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import reducer from './ducks'
import rootSaga from './sagas/websocket'
import createSagaMiddleware from 'redux-saga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  combineReducers(reducer),
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

export default store