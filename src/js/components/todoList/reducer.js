import { handleActions } from 'redux-actions'

const initialState = {
  todoList: []
}

const addItem = (state = initialState) => {
  const { todoList } = state
  const newItem = {
    description: 'redux learning',
    complete: false
  }

  return {
    ...state,
    todoList: [...todoList, newItem]
  }
}

const delItem = (state = initialState, { payload }) => {
  const { todoList } = state
  const newList = todoList.filter((item, i) => i !== payload)

  return {
    ...state,
    todoList: newList
  }
}

const toogleItemDone = (state = initialState, { payload }) => {
  const { todoList } = state
  const newList = todoList.map((item, i) => {
    if (i === payload) {
      item.complete = !item.complete
    }
    return item
  })

  return {
    ...state,
    todoList: newList
  }
}

const todoReducer = handleActions({
  ADD_ITEM: addItem,
  DEL_ITEM: delItem,
  TOOGLE_ITEM_DONE: toogleItemDone
}, initialState)

export default todoReducer
