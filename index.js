import { copyText } from './components/copy-text.js'
import { Encryptor } from './utils/encryptor.js'
import { sleep } from './utils/sleep.js'

function insertCopyButton() {
	let resultBox = document.querySelector('.encrypt__result_box')
	let existingButton = document.getElementById('copy-btn')

	if (existingButton) {
		existingButton.remove()
	}

	const button = document.createElement('button')
	button.classList.add('encrypt__copy-btn')
	button.id = 'copy-btn'
	button.innerHTML = 'Copiar'

	button.addEventListener('click', e => {
		copyText({ target: '.encrypt__result_box__content' })
	})

	resultBox.insertAdjacentElement('beforeend', button)
}

let key = await Encryptor.generateKey()
let iv = null

let resultBox = document.querySelector('.encrypt__result_box')
let text = document.getElementById('text')
let notFoundBox = document.querySelector('.encrypt__result_box__not-found')
let resultContent = document.createElement('div')
resultContent.classList.add('encrypt__result_box__content')
resultBox.appendChild(resultContent)

let message = null

document.addEventListener('click', async e => {
	if (e.target.matches('#encrypt')) {
		e.preventDefault()

		if (text.value.trim().length === 0) {
			if (message) {
				message.remove()
			}
			message = document.createElement('span')
			message.classList.add('message')
			message.innerText = 'Please, enter some text to encrypt'

			sleep({ seconds: 1 }).then(() => message.remove())

			e.target.parentElement.insertAdjacentElement('afterend', message)
			return
		}

		let { iv: givenIV, encryptedData } = await Encryptor.encrypt({
			key,
			text: text.value
		})

		iv = givenIV

		resultContent.innerText = encryptedData.toString()
		insertCopyButton()
		toggleResultDisplay(true)
	}

	if (e.target.matches('#decrypt')) {
		e.preventDefault()

		if (text.value.trim().length === 0) {
			if (message) {
				message.remove()
			}
			message = document.createElement('span')
			message.classList.add('message')
			message.innerText = 'Please, enter some text to decrypt'

			sleep({ seconds: 1 }).then(() => message.remove())

			e.target.parentElement.insertAdjacentElement('afterend', message)
			return
		}

		let decryptedText = await Encryptor.decrypt({
			key,
			encryptedText: text.value,
			iv
		})

		resultContent.innerText = decryptedText.toString()
		insertCopyButton()
		toggleResultDisplay(true)
	}

	// if (e.target.matches('#copy_btn') || e.target.matches('#copy_btn *')) {
	// }
})

document.addEventListener('DOMContentLoaded', e => {
	toggleResultDisplay(false)
})

function toggleResultDisplay(hasResult) {
	if (hasResult) {
		notFoundBox.classList.add('inactive')
		resultContent.classList.add('active')
	} else {
		notFoundBox.classList.remove('inactive')
		resultContent.classList.remove('active')
	}
}
