# Just Popup – Легкая библиотека для модальных окон

**Just Popup** – это простая и легковесная библиотека для создания **модальных окон** на чистом JavaScript, без зависимостей.

## 🚀 Возможности
✅ Открытие и закрытие попапов по клику  
✅ Поддержка клавиши `Escape` для закрытия  
✅ Закрытие при клике вне окна  
✅ Блокировка/разблокировка прокрутки страницы  
✅ Поддержка `<dialog>` для лучшей семантики  
✅ **Работает без зависимостей** и **поддерживает все современные браузеры** 

---

## 📥 Установка

### 📌 1. **Подключение через CDN**
Добавьте этот код в `<head>` страницы:

```html
<script src="https://cdn.jsdelivr.net/gh/baujaasd/just-popup@latest/popup.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/baujaasd/just-popup@latest/popup.min.css">
```

### 📌 2. **Подключение вручную**

```html
<script src="popup.js"></script>
<link rel="stylesheet" href="popup.css">
```

## 🔧 Использование

### 1. Добавьте кнопку для открытия попапа

```html
<button data-popup="myPopup" type="button">Открыть</button>
```

### 📌 2. Создайте модальное окно

```html
<dialog aria-label="Диалоговое окно" id="myPopup" class="popup">
	<div role="document" class="popup__content">
		<button aria-label="Закрыть диалоговое окно" class="popup__close-btn" type="button" title="Закрыть">×</button>
		<p class="padding">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> 
	</div> 
</dialog>
```

## ⚙ Управление вручную с помощью `togglePopup()`

###  📌 Открытие попапа вручную

```js
togglePopup("myPopup");
```

### 📌 Закрытие попапа вручную

```js
togglePopup("myPopup");
```

### 📌 Открытие с коллбеками

Можно передать функции, которые выполнятся при открытии и закрытии:

```js
togglePopup("myPopup", 
  () => console.log("Окно открыто!"), 
  () => console.log("Окно закрыто!")
);
```


## 🛠 Поддержка браузеров

✅ Chrome, Firefox, Edge, Opera, Safari  
✅ Поддержка `<dialog>` для лучшей семантики  
✅ **Автоматически работает в Safari и старых браузерах (через встроенный полифилл)**

❌ **Internet Explorer не поддерживается** (но можно добавить полифилл).

