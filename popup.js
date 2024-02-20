let bodyLock, bodyUnlock;

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body,
    html = document.documentElement,
    lockPadding = document.querySelectorAll(".lock_padding"),
    screenDelta = window.innerWidth - html.offsetWidth;

  bodyLock = function () {
    lockPadding.forEach(item => {
      item.style.paddingRight = `${screenDelta}px`;
    });
    body.style.paddingRight = `${screenDelta}px`;
    body.classList.add("lock");
    html.classList.add("lock");
  };

  bodyUnlock = function () {
    setTimeout(() => {
      lockPadding.forEach(item => {
        item.style.paddingRight = '0px';
      });
      body.style.paddingRight = '0px';
      body.classList.remove("lock");
      html.classList.remove("lock");
    }, 10);
  };

  document.addEventListener("click", (e) => {
    if (e.target.dataset.popup) {
      e.preventDefault();
      togglePopup(e.target.dataset.popup.replace("#", ""), () => {
        // Callback при открытии попапа
        // Добавьте сюда свой код
      }, () => {
        // Callback при закрытии попапа
        // Добавьте сюда свой код
      });
    } else if (e.target.classList.contains("close_popup") || e.target.classList.contains("popup_wrapper")) {
      e.preventDefault();
      togglePopup(e.target.closest(".popup_wrapper.active").id, () => {
        // Callback при открытии попапа
        // Добавьте сюда свой код
      }, () => {
        // Callback при закрытии попапа
        // Добавьте сюда свой код
      });
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      const popupWrp = document.querySelector(".popup_wrapper.active");
      if (popupWrp) {
        togglePopup(popupWrp.id, () => {
          // Callback при открытии попапа
          // Добавьте сюда свой код
        }, () => {
          // Callback при закрытии попапа
          // Добавьте сюда свой код
        });
      }
    }
  });

})

function togglePopup(id, onOpenCallback, onCloseCallback) {
  closeAllPopups(id);
  const popupWrp = document.getElementById(id);
  if (!popupWrp) return false;

  const popup = popupWrp.querySelector(".popup");
  const isActive = popupWrp.classList.contains("active");

  if (!isActive) {
    bodyLock();
    if (onOpenCallback) onOpenCallback();
  } else {
    bodyUnlock();
    if (onCloseCallback) onCloseCallback();
  }

  popupWrp.classList.toggle("active");
  popup.classList.toggle("active");
  popup.setAttribute('aria-hidden', String(!isActive));

  return true;
}

function closeAllPopups(exceptId) {
  const allPopups = document.querySelectorAll('.popup_wrapper.active');
  allPopups.forEach(popupWrp => {
    if (popupWrp.id !== exceptId) {
      const popup = popupWrp.querySelector('.popup');
      popupWrp.classList.remove('active');
      popup.classList.remove('active');
      popup.setAttribute('aria-hidden', 'true');
      bodyUnlock();
    }
  });
}
