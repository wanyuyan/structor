import { createAction } from 'redux-actions'

export const addItem = createAction('ADD_ITEM')
export const delItem = createAction('DEL_ITEM', index => index)
