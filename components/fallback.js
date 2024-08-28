export function fallback() {
	const fallbackElement = document.querySelector('.not_found_text_container')

	if (!show) {
		fallbackElement.classList.remove('active')
	}

	fallbackElement.classList.add('active')
}
