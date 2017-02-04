import React, { Component } from 'react'
import Modal from 'ui/modal'

export default class ModalTest extends Component {
  constructor(props) {
    super(props)
  }

  // 弹出内容为 Component
  openModal2() {
    Modal.openModal({
      maskClosable: true,
      Component: ModalContent
    })
  }

  // 弹出内容为 Dom
  openModal() {
    Modal.openModal({
      maskClosable: true,
      position: 'left',
      contentFunc: closeModal => this.renderContent(closeModal),
    })
  }

  renderContent(closeModal) {
    return (
      <div className="modal-test">
        <section>this is modal content dom</section>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    )
  }

  render() {
    return (
      <div className="page">
        <button onClick={this.openModal.bind(this)}>Open Modal Dom</button>
        <button onClick={this.openModal2.bind(this)}>Open Modal Component</button>
      </div>
    )
  }
}

const ModalContent = props => {
	return (
		<div>
			<section>this is modal content Component</section>
			<button onClick={props.closeModal}>closeModal</button>
		</div>
	)
}
