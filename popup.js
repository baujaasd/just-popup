let bodyLock, bodyUnlock;

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body,
    html = document.documentElement,
    lockPadding = document.querySelectorAll(".lock_padding");

  let screenDelta = window.innerWidth - html.offsetWidth;

  // 🛠️ Полифилл для <dialog>, если он не поддерживается
  if (!('HTMLDialogElement' in window)) {
    console.log("Добавляем полифилл для <dialog>");

    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute("open", ""); // Добавляем атрибут
      this.style.display = "block"; // Показываем окно
      this.style.position = "fixed"; // Фиксированное положение
      this.style.top = "50%";
      this.style.left = "50%";
      this.style.transform = "translate(-50%, -50%)";
      this.style.zIndex = "1000";
      document.body.appendChild(this);
      document.body.classList.add("dialog-open");
    };

    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute("open");
      this.style.display = "none"; // Скрываем окно
      document.body.classList.remove("dialog-open");
    };

    const style = document.createElement("style");
    style.innerHTML = `
      .dialog-open { overflow: hidden; }
      dialog[open] { display: block; }
    `;
    document.head.appendChild(style);
  }

  // 🔒 Блокировка скролла при открытии попапа
  bodyLock = function () {
    screenDelta = window.innerWidth - html.offsetWidth; // Пересчитываем отступ
    lockPadding.forEach(item => {
      item.style.paddingRight = `${screenDelta}px`;
    });
    body.style.paddingRight = `${screenDelta}px`;
    body.classList.add("lock");
    html.classList.add("lock");
  };

  // 🔓 Разблокировка скролла при закрытии попапа
  bodyUnlock = function () {
    setTimeout(() => {
      lockPadding.forEach(item => {
        item.style.paddingRight = "0px";
      });
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
      html.classList.remove("lock");
    }, 10);
  };

  // 📌 Открытие/закрытие попапов по клику
  document.addEventListener("click", (e) => {
    if (e.target.dataset.popup) {
      e.preventDefault();
      togglePopup(e.target.dataset.popup.replace("#", ""));
    } else if (e.target.classList.contains("popup__close-btn") || e.target.classList.contains("popup")) {
      e.preventDefault();
      togglePopup(e.target.closest(".popup.popup--active")?.id);
    }
  });

  // ⌨️ Закрытие попапа по ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      const popupWrp = document.querySelector(".popup.popup--active");
      if (popupWrp) {
        togglePopup(popupWrp.id);
      }
    }
  });

});

// 🔄 Функция переключения попапа
function togglePopup(id, onOpenCallback, onCloseCallback) {
  closeAllPopups(id);
  const popupWrp = document.getElementById(id);
  if (!popupWrp) return false;

  const popup = popupWrp.querySelector(".popup__content");
  const isActive = popupWrp.classList.contains("popup--active");

  if (!isActive) {
    // Если это <dialog> и оно поддерживается - используем showModal()
    if (popupWrp.showModal) {
      popupWrp.showModal();
    }
    bodyLock();
    if (onOpenCallback) onOpenCallback();
  } else {
    if (popupWrp.close) {
      popupWrp.close();
    }
    bodyUnlock();
    if (onCloseCallback) onCloseCallback();
  }

  popupWrp.classList.toggle("popup--active");
  popup.classList.toggle("popup--active");
  popup.setAttribute('aria-hidden', String(!isActive));

  return true;
}

// ❌ Закрытие всех попапов кроме переданного
function closeAllPopups(exceptId) {
  const allPopups = document.querySelectorAll('.popup.popup--active');
  allPopups.forEach(popupWrp => {
    if (popupWrp.id !== exceptId) {
      const popup = popupWrp.querySelector('.popup__content');
      if (popupWrp.close) {
        popupWrp.close();
      }
      popupWrp.classList.remove('popup--active');
      popup.classList.remove('popup--active');
      popup.setAttribute('aria-hidden', 'true');
      bodyUnlock();
    }
  });
}
