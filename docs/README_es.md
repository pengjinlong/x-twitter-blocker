# X/Twitter Bloqueador de Palabras Clave

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Tampermonkey-orange.svg)

**Idioma:**
[🇨🇳 中文](../README.md) · [🇺🇸 English](README_en.md) · [🇯🇵 日本語](README_ja.md) · [🇰🇷 한국어](README_ko.md) · [🇩🇪 Deutsch](README_de.md) · [🇪🇸 Español](README_es.md)

</div>

---

## 📖 Introducción

**X/Twitter Bloqueador de Palabras Clave** es una herramienta ligera para el navegador que oculta automáticamente tweets y comentarios en X (antes Twitter) que contengan palabras clave específicas. Compatible con **extensión de Chrome** y **script de Tampermonkey**.

> [!IMPORTANT]
> **La lista de palabras clave predeterminada está en chino** y está orientada a patrones de spam en chino. Antes de usar esta herramienta, **debes configurar tus propias palabras clave en tu idioma** — de lo contrario, el bloqueador no tendrá efecto sobre contenido que no sea en chino. (El filtrado de palabras clave admite tanto **el texto del tweet** como **el nombre de usuario**).
>
> - **Extensión de Chrome**: Haz clic en el ícono de extensión → agrega tus palabras clave (los cambios se guardan y aplican automáticamente)
> - **Tampermonkey**: Edita el array `BLOCKED_KEYWORDS` en el script y ajusta `MAX_EMOJI_COUNT` según tus necesidades

### ✨ Características

- 🚫 **Filtrado por palabras clave** — Oculta automáticamente tweets/comentarios y nombres de usuario con palabras bloqueadas
- 😶 **Detección de avalancha de Emoji** — Bloquea contenido o usuarios cuya cantidad de emojis supera el umbral configurado (por defecto: > 2)
- ⚡ **Tiempo real** — `MutationObserver` detecta contenido cargado dinámicamente al hacer scroll
- 💾 **Almacenamiento persistente** — La extensión de Chrome guarda las palabras clave localmente en el navegador
- 🎨 **Interfaz visual** — La extensión de Chrome ofrece un popup elegante para gestionar palabras clave y el umbral de emojis
- 🪶 **Sin dependencias** — JavaScript puro, sin impacto en el rendimiento
- 🔒 **Privacidad** — Todo se procesa localmente, sin envío de datos

---

## 🚀 Dos formas de uso

---

### Opción 1: Extensión de Chrome (Recomendada)

Gestiona las palabras clave desde un popup visual — sin necesidad de editar código.

#### Instalación

**1. Descargar el repositorio**

```bash
git clone https://github.com/pengjinlong/x-twitter-blocker.git
```

**2. Abrir la página de extensiones de Chrome**

En la barra de direcciones escribe:

```
chrome://extensions/
```

**3. Activar el modo desarrollador**

Activa el interruptor **«Modo de desarrollador»** en la esquina superior derecha.

**4. Cargar la extensión**

Haz clic en **«Cargar extensión sin empaquetar»** y selecciona la carpeta `chrome-extension/` del proyecto.

**5. ¡Listo!**

Visita [x.com](https://x.com) y haz clic en el ícono de la extensión en la barra de herramientas para gestionar las palabras clave.

#### Cómo usarla

| Acción | Descripción |
|--------|-------------|
| Clic en el ícono de extensión | Abre el popup de configuración |
| Escribe una palabra + clic en «Añadir» | Agrega una nueva palabra bloqueada (también con Enter; se guarda y aplica automáticamente) |
| Clic en `×` junto a una palabra | Elimina esa palabra clave (se guarda y aplica automáticamente) |
| Clic en «Borrar todo» | Elimina todas las palabras clave |
| Clic en `−` / `+` del umbral Emoji | Ajusta el umbral de detección de emoji (se guarda automáticamente; por defecto 2; 0 = desactivado) |

> **Detección de avalancha de Emoji**: Las cuentas spam en X/Twitter suelen llenar sus nombres o publicaciones con muchos emojis (🌸🔥💋✨🎀…). Esta función cuenta tanto las imágenes emoji renderizadas por Twitter como los caracteres Unicode emoji, ocultando el contenido que supera el umbral.

---

### Opción 2: Script de Tampermonkey

Ideal para usuarios que ya tienen Tampermonkey instalado y prefieren editar el código directamente.

#### Instalación

**1. Instalar Tampermonkey**

Instala [Tampermonkey](https://www.tampermonkey.net/) desde la tienda de extensiones de tu navegador.

**2. Instalar el script**

- Abre el panel de Tampermonkey
- Haz clic en **«+»** para crear un nuevo script
- Pega el contenido completo de [`index.js`](../index.js)
- Presiona `Ctrl + S` para guardar

**3. Configurar palabras clave y umbral de emoji**

Edita el array `BLOCKED_KEYWORDS` y el umbral de emoji al inicio del script:

```javascript
// Lista de palabras bloqueadas
const BLOCKED_KEYWORDS = [
    'spam',
    'otra palabra',
    // Añade aquí tus palabras
];

// Umbral de avalancha de emoji (0 = desactivado)
const MAX_EMOJI_COUNT = 2;
```

**4. ¡Listo!**

Recarga la página de X/Twitter y el script entrará en vigor inmediatamente.

---

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](../LICENSE).

---

<div align="center">

⭐ ¡Si te resulta útil, dale una estrella!

</div>
