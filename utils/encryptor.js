export class Encryptor {
	static _arrayBufferToBase64(buffer) {
		let binary = ''
		let bytes = new Uint8Array(buffer)
		let len = bytes.byteLength
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i])
		}
		return window.btoa(binary)
	}

	static _base64ToArrayBuffer(base64) {
		let binary_string = window.atob(base64)
		let len = binary_string.length
		let bytes = new Uint8Array(len)
		for (let i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i)
		}
		return bytes
	}

	static async generateKey() {
		const key = await crypto.subtle.generateKey(
			{
				name: 'AES-GCM',
				length: 256
			},
			true,
			['encrypt', 'decrypt']
		)
		return key
	}

	static async encrypt({ key, text }) {
		const encoder = new TextEncoder()
		const data = encoder.encode(text)
		const iv = crypto.getRandomValues(new Uint8Array(12))

		const encrypted = await crypto.subtle.encrypt(
			{
				name: 'AES-GCM',
				iv: iv
			},
			key,
			data
		)

		return {
			iv: iv,
			encryptedData: this._arrayBufferToBase64(new Uint8Array(encrypted))
		}
	}

	static async decrypt({ key, encryptedText, iv }) {
		const decrypted = await crypto.subtle.decrypt(
			{
				name: 'AES-GCM',
				iv: iv
			},
			key,
			this._base64ToArrayBuffer(encryptedText)
		)

		const decoder = new TextDecoder()
		return decoder.decode(decrypted)
	}
}
