import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import 'uiStyle/modal'

class ModalComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			position: 'center',
			maskAnimateClass: 'fade-in',
			animateClass: '',
		}
	}

	componentWillMount() {
		const { position } = this.props;
		const animateClass = this.getAnimateClass()

		this.setState({
			position: position || 'center',
			animateClass
		})
	}

	componentWillUnmount() {
		this.onClose()
	}

	onClose() {
		const { animateClass } = this.state

		this.setState({
			maskAnimateClass: 'fade-in-reverse',
			animateClass: `${animateClass}-reverse`
		})
	}

	getAnimateClass() {
		switch (this.props.position) {
			case 'top':
				return 'slide-down'
			case 'right':
				return 'slide-left'
			case 'bottom':
				return 'slide-up'
			case 'left':
				return 'slide-right'
			default:
				return 'fade-in'
		}
	}

	render() {
		const { customClass, content } = this.props
		const { position, animateClass, maskAnimateClass } = this.state

		const modalClass = `modal modal-${position} ${maskAnimateClass} ${customClass || ''}`
		const containerClass = `modal-container ${animateClass}`

		return (
			<div className={modalClass}>
				<div className={containerClass}>
					<div className="modal-content">
						{content}
					</div>
				</div>
			</div>
		)
	}
}

ModalComponent.propTypes = {
	customClass : PropTypes.string,
	style       : PropTypes.object,
	content     : PropTypes.any,
	position    : PropTypes.oneOf(['center', 'top', 'right', 'bottom', 'left'])
}

class Modal{
	constructor() {
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	openModal(options={}) {
		this.wrapper = document.createElement('div')
		document.body.appendChild(this.wrapper)

		ReactDom.render(
			<ModalComponent {...options} />,
			this.wrapper
		)

		document.body.style.overflowY = 'hidden'
	}

	closeModal() {
		ReactDom.unmountComponentAtNode(this.wrapper)

		setTimeout(() => {
			document.body.removeChild(this.wrapper)
		}, 200)   // delay for the animation of close

		document.body.style.overflowY = 'initial'
	}
}

export default Modal
