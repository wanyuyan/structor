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

		this.closeModal = this.closeModal.bind(this)
	}

	componentWillMount() {
		const { position } = this.props;
		const animateClass = this.getAnimateClass()

		this.setState({
			position: position || 'center',
			animateClass
		})

		document.body.style.overflow = 'hidden'
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

	closeModal() {
		const { animateClass } = this.state

		this.setState({
			maskAnimateClass: 'fade-in-reverse',
			animateClass: `${animateClass}-reverse`
		})

		setTimeout(() => {
			document.body.removeChild(this.props.container)
		}, 200)

		document.body.style.overflow = 'auto'
	}

	renderContent() {
		const { Component, contentFunc } = this.props
		return Component ?
			<Component closeModal={this.closeModal} />
		: contentFunc(this.closeModal)
	}

	render() {
		const { maskClosable, style, customClass } = this.props
		const { position, animateClass, maskAnimateClass } = this.state
		const modalClass = `modal modal-${position} ${animateClass} ${customClass || ''}`

		return (
			<div>
				<div className={`mask ${maskAnimateClass}`}
					onClick={maskClosable && this.closeModal}></div>
				<div className={modalClass} style={style}>
					<div className="modal-container">
						<div className="closer" onClick={this.closeModal}></div>
						<div className="modal-content">
							{this.renderContent()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ModalComponent.propTypes = {
	Component: PropTypes.any,
	contentFunc: PropTypes.func,
	maskClosable: PropTypes.bool,
	position: PropTypes.oneOf(['center', 'top', 'right', 'bottom', 'left']),
	style: PropTypes.object,
	customClass: PropTypes.string
}

const Modal = {}
Modal.openModal = (options = {}) => {
	const container = document.createElement('div')
	document.body.appendChild(container)

	ReactDom.render(
		<ModalComponent {...options} container={container} />,
		container
	)
}

export default Modal
