export class Component {
	constructor(id) {
		this.$el = document.getElementById(id)
		this.init()
	}

	hide() {
		this.$el.classList.add('hide')
		this.onHide()
	}
	show() {
		this.$el.classList.remove('hide')
		this.onshow()
	}

	init() { }
	onshow() { }
	onHide() { }
}