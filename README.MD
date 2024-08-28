# Encriptador de Texto

Este proyecto es un encriptador de texto que permite a los usuarios encriptar y desencriptar texto de manera sencilla y segura. Además, cuenta con la funcionalidad de copiar el texto encriptado o desencriptado con solo un clic.

## Características

- **Encriptación de Texto**: Utiliza el algoritmo de cifrado AES-GCM para encriptar el texto ingresado por el usuario, proporcionando un nivel de seguridad robusto.
- **Desencriptación de Texto**: Permite desencriptar el texto previamente encriptado utilizando la misma clave y vector de inicialización (IV).
- **Copiado de Texto**: Una vez que el texto ha sido encriptado o desencriptado, se puede copiar fácilmente al portapapeles usando un botón.

## Uso

1. **Encriptar un Texto**:

   - Escribe el texto que deseas encriptar en el área de entrada.
   - Haz clic en el botón "Encriptar".
   - El texto encriptado aparecerá en el área de resultados.

2. **Desencriptar un Texto**:

   - Escribe o pega el texto encriptado en el área de entrada.
   - Haz clic en el botón "Desencriptar".
   - El texto desencriptado aparecerá en el área de resultados.

3. **Copiar el Texto**:
   - Una vez que el texto ha sido encriptado o desencriptado, puedes copiarlo al portapapeles haciendo clic en el botón "Copiar".

## Código Principal

El proceso de encriptación y desencriptación se maneja mediante la clase `Encryptor`, que utiliza la API de criptografía nativa del navegador (`crypto.subtle`) para realizar las operaciones de cifrado y descifrado.

### Métodos Clave

- **`generateKey()`**: Genera una clave AES-GCM de 256 bits que se utiliza para la encriptación y desencriptación.
- **`encrypt({ key, text })`**: Encripta el texto proporcionado utilizando la clave generada y un vector de inicialización (IV) aleatorio.
- **`decrypt({ key, encryptedText, iv })`**: Desencripta el texto encriptado utilizando la misma clave y IV.

### Ejemplo de Uso

```javascript
const key = await Encryptor.generateKey()

const { iv, encryptedData } = await Encryptor.encrypt({
	key,
	text: 'Texto de ejemplo'
})

const decryptedText = await Encryptor.decrypt({
	key,
	encryptedText: encryptedData,
	iv: iv
})

console.log('Texto encriptado:', encryptedData)
console.log('Texto desencriptado:', decryptedText)
```

## Instalación y Configuración

Este proyecto está desarrollado utilizando HTML, CSS y JavaScript. Para ejecutarlo localmente, simplemente clona este repositorio y abre el archivo index.html en tu navegador.

```bash
git clone https://github.com/tu-usuario/encriptador-de-texto.git
cd encriptador-de-texto
```
