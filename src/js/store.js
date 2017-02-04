import { combineReducers, createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import todoReducer from 'component/todoList/reducer'

const reducers = combineReducers({
  todo: todoReducer
})

const loggerMiddleware = createLogger()

const store = createStore(
  reducers,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
)

export default store
