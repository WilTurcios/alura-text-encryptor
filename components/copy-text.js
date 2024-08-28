export function copyText({ target }) {
	const elementText = document.querySelector(target).innerText

	const temporalElement = document.createElement('textarea')
	temporalElement.value = elementText

	document.body.appendChild(temporalElement)

	temporalElement.select()
	temporalElement.setSelectionRange(0, 99999)

	document.execCommand('copy')
	document.body.removeChild(temporalElement)
}
