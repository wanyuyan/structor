import React, { Component } from 'react'
import Modal from 'ui/modal'

export default class ModalTest extends Component {
  constructor(props) {
    super(props)

    this.state={
      visible: false,
      des: 'initial description'
    }

    this.changeDes = this.changeDes.bind(this)
  }

  openModal() {
    const modal = new Modal()
    modal.openModal({
      content: <ModalContent
        closeModal={modal.closeModal}
        des={this.state.des}
        changeDes={this.changeDes} />
    })
  }

  changeDes() {
    this.setState({des: 'changed'})
  }

  render() {
    return (
      <div className="page">
        <button onClick={this.openModal.bind(this)}>Open Modal</button>
        {this.renderModal()}
      </div>
    )
  }
}

// const ModalContent = props => {
// 	return (
// 		<div>
// 			<section>{props.des}</section>
//       <button onClick={props.changeDes}>Change Des</button>
// 			<button onClick={props.closeModal}>closeModal</button>
// 		</div>
// 	)
// }

class ModalContent extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps() {
    console.log('will receive')
  }

  render() {
    const { des, changeDes, closeModal } = this.props
    return (
  		<div>
  			<section>{des}</section>
        <button onClick={changeDes}>Change Des</button>
  			<button onClick={closeModal}>closeModal</button>
  		</div>
  	)
  }
}
