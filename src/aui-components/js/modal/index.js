import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import 'uiStyle/modal'

class Modal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			position: 'center',
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

		this.addEventHandler()
		document.body.style.overflowY = 'hidden'
	}

	componentWillUnmount() {
		this.removeEventHandler()
	}

	addEventHandler() {
		window.addEventListener('popstate', this.closeModal, false)
	}

	removeEventHandler() {
		window.removeEventListener('popstate', this.closeModal, false)
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

	openModal() {
		if (!this.wrapper) {
			this.wrapper = document.createElement('div')
			document.body.appendChild(this.wrapper)
		}
		ReactDom.render(this.renderModal(), this.wrapper)
	}

	closeModal() {
		this.setState({animateClass: `${this.state.animateClass}-reverse`})

		setTimeout(() => {
			ReactDom.unmountComponentAtNode(wrapper)
			document.body.removeChild(wrapper)
		}, 200)

		document.body.style.overflowY = 'scroll'
	}

	renderModal() {
		const { customClass, customStyle, content, maskClosable } = this.props
		const { position, animateClass } = this.state

		const wrapperClass = `modal-wrapper ${customClass || ''}`
		const modalClass = `modal-${position} ${animateClass}`

		return (
			<div className={wrapperClass}>
				<div className="modal">
					<div className="modal-mask" onClick={maskClosable && this.closeModal}></div>
					<div className={modalClass}>
						<div className="modal-container" style={customStyle}>
							{showClose ? (
								<i className="icon-cross" onClose={this.close} />
							) : null}
							{content(this.closeModal)}
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return null
	}
}

Modal.propTypes = {
	customClass : PropTypes.string,     // 弹出框样式终极自定义，可覆盖任何样式的默认定义
	customStyle : PropTypes.object,			// 弹出框容器样式快捷自定义
	content     : PropTypes.func,
	maskClosable: PropTypes.bool,
	position    : PropTypes.oneOf(['center', 'top', 'right', 'bottom', 'left'])
}

export default Modal
