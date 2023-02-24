import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service'
import { renderPost } from '../templates/post.template'

export class PostsComponent extends Component {
	constructor(id, { loader }) {
		super(id)
		this.loader = loader
	}
	init() {
		this.$el.addEventListener('click', buttonHandler.bind(this))
	}

	async onshow() {
		this.loader.show()
		const fbData = await apiService.fetchPosts()
		const posts = TransformService.fbObjectToArray(fbData)
		const html = posts.map(post => renderPost(post, { withButton: true }))
		this.loader.hide()
		this.$el.insertAdjacentHTML('afterbegin', html.reverse().join(' '))
	}
	onHide() {
		this.$el.innerHTML = ''

	}
}

function buttonHandler(event) {
	const $el = event.target
	const id = $el.dataset.id
	const postName = $el.parentNode.parentNode.querySelector('.panel-title').textContent
	if (id) {
		let favorites = JSON.parse(localStorage.getItem('favorites')) || []

		if (favorites.includes(id)) {
			//remove element
			$el.textContent = 'Сохранить'
			$el.classList.add('button-primary')
			$el.classList.remove('button-danger')
			favorites = favorites.filter(fId => fId !== id)
		} else {
			//add element
			$el.textContent = 'Удалить'
			$el.classList.remove('button-primary')
			$el.classList.add('button-danger')
			favorites.push(id)
		}


		localStorage.setItem('favorites', JSON.stringify(favorites))
	}
	if (postName) {
		let favoritesNamePost = JSON.parse(localStorage.getItem('favoritesNamePost')) || []

		if (favoritesNamePost.includes(postName)) {
			favoritesNamePost = favoritesNamePost.filter(fName => fName !== postName)
		} else {
			favoritesNamePost.push(postName)
		}

		localStorage.setItem('favoritesNamePost', JSON.stringify(favoritesNamePost))
	}
}