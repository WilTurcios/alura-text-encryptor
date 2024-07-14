import { Encryptor } from './utils/encryptor.js'
import { sleep } from './utils/sleep.js'

let key = await Encryptor.generateKey()
let iv = null

let resultBox = document.getElementById('result_box')
let text = document.getElementById('text')
let message = null

document.addEventListener('click', async e => {
	if (e.target.matches('#encrypt')) {
		e.preventDefault()

		if (text.value.trim().length === 0) {
			if (message) {
				message.remove()
			}
			message = document.createElement('span')

			message.innerText = 'Please, enter some text to encrypt'

			sleep({ seconds: 1 }).then(() => message.remove())

			e.target.insertAdjacentElement('beforebegin', message)
		}

		let { iv: givenIV, encryptedData } = await Encryptor.encrypt({
			key,
			text: text.value
		})

		iv = givenIV

		resultBox.innerText = encryptedData.toString()
	}

	if (e.target.matches('#decrypt')) {
		e.preventDefault()

		if (text.value.trim().length === 0) {
			if (message) {
				message.remove()
			}
			message = document.createElement('span')

			message.innerText = 'Please, enter some text to decrypt'

			sleep({ seconds: 1 }).then(() => message.remove())

			e.target.insertAdjacentElement('beforebegin', message)
		}

		let decryptedText = await Encryptor.decrypt({
			key,
			encryptedText: text.value,
			iv
		})

		resultBox.innerText = decryptedText.toString()
	}
})
