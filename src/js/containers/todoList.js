import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from 'component/todoList/action'

class TodoList extends Component {
  constructor() {
    super()
  }

  addItem() {
    this.props.dispatch(actions.addItem())
  }

  delItem(index) {
    this.props.dispatch(actions.delItem(index))
  }

  toogleItemDone(index) {
    this.props.dispatch(actions.toogleItemDone(index))
  }

  render() {
    const { todoList } = this.props
    return (
      <div>
        <ul>
          {todoList && todoList.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={`item-${index}`}
                checked={item.complete}
                onClick={this.toogleItemDone.bind(this, index)} />
              <label htmlFor={`item-${index}`}>
                {item.description}
              </label>
              <button onClick={this.delItem.bind(this, index)}>
                删除
              </button>
            </li>
          ))}
        </ul>
        <button onClick={this.addItem.bind(this)}>
          添加
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { todo } = state       // global state
  return { todoList: todo.todoList }
}

TodoList = connect(mapStateToProps)(TodoList)
export default TodoList
