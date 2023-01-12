// (!) lightbox_onMouseover
function lightbox_onMouseover(eVent) {
	if (eVent.target.tagName === "IMG") {
		if (eVent.target.classList.contains('zoom-in')) {
			eVent.target.src = "icon/zoom-in.png";
			// eVent.target.setAttribute('src', 'icon/zoom-in.png');
		} else if (eVent.target.classList.contains('zoom-out')) {
			// eVent.target.setAttribute('src', 'icon/zoom-out.png');
			eVent.target.src = "icon/zoom-out.png";
		}
	}
}
// (!) lightbox_onMouseout
function lightbox_onMouseout(eVent) {
	if (eVent.target.tagName === "IMG") {
		if (eVent.target.classList.contains('zoom-in') || eVent.target.classList.contains('zoom-out')) {
			// eVent.target.setAttribute('src', 'icon/zoom.png');
			eVent.target.src = "icon/zoom.png";
		}
	}
}
// (!) lightbox_onKeydown
function lightbox_onKeydown(eVent) {
	if (eVent.key === "Escape" || eVent.code === "Escape" || eVent.keyCode === 27 || eVent.which === 27) {
		if (window === top || window.name === "") {
			setRemoveLightbox(eVent.target); // - удаление DOM-элемента - узел lightbox в гл.окне
		}
		// else if (window === self || self !== top && window.name === "hmcontent") {
		// 	setHideLightbox(eVent.target); // скрыть окно просмотра изо - текущий lightbox
		// }
	} else if (eVent.key === "Home" || eVent.code === "Home" || eVent.keyCode === 36 || eVent.which === 36) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в слайдере
		if (window.name === "hmcontent") {
			eVent.preventDefault(); // 'отменяем действия браузера по умолчанию
		}
	} else if (eVent.key === "End" || eVent.code === "End" || eVent.keyCode === 35 || eVent.which === 35) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в слайдере
		if (window.name === "hmcontent") {
			eVent.preventDefault(); // 'отменяем действия браузера по умолчанию
		}
	} else if (eVent.key === "ArrowLeft" || eVent.code === "ArrowLeft" || eVent.keyCode === 37 || eVent.which === 37) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в слайдере
		if (window.name === "hmcontent") {
			eVent.preventDefault(); // 'отменяем действия браузера по умолчанию
		}
	} else if (eVent.key === "ArrowUp" || eVent.code === "ArrowUp" || eVent.keyCode === 38 || eVent.which === 38) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в слайдере
		if (window.name === "hmcontent") {
			eVent.preventDefault(); // 'отменяем действия браузера по умолчанию
		}
	} else if (eVent.key === "ArrowRight" || eVent.code === "ArrowRight" || eVent.keyCode === 39 || eVent.which === 39) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в слайдере
		if (window.name === "hmcontent") {
			eVent.preventDefault(); // 'отменяем действия браузера по умолчанию
		}
	} else if (eVent.key === "ArrowDown" || eVent.code === "ArrowDown" || eVent.keyCode === 40 || eVent.which === 40) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в слайдере
		if (window.name === "hmcontent") {
			eVent.preventDefault(); // 'отменяем действия браузера по умолчанию
		}
	}
}
// (!) lightbox_onClick
function lightbox_onClick(eVent) {
	// console.log(`function lightbox_onClick(eVent): window."${window.name}", location.origin: ${location.origin}:\n eVent.target: ${eVent.target}\n eVent.target.classList: ${eVent.target.classList}\n---\n window.frameElement: ${window.frameElement}\n---\n window === self || self !== top && window.name === "hmcontent": ${window === self || self !== top && window.name === "hmcontent"}\n 1) window === self: ${window === self}\n 2) self !== top: ${self !== top}\n 3) window.${window.name} === "hmcontent"\n---\n 1) typeof(self) === "undefined": ${typeof(self) === "undefined"}\n 2) Object(self): ${Object(self)}\n 3) typeof(self): ${typeof(self)}\n---`); // X -

	if (eVent.target.tagName === "A") {
		if (eVent.target.parentElement.classList.contains('btn-box')) { // !!!получаем div через.target.tagName a
			// *просмотр/пролистывание изо.в lightbox
			if (eVent.target.parentElement.classList.contains('img-btn-prev')) {
				goToImage(eVent.target.parentElement, "");
			} else if (eVent.target.parentElement.classList.contains('img-btn-next')) {
				goToImage(eVent.target.parentElement, "");
			}
		} else if (eVent.target.parentElement.classList.contains('btn-slider')) { // !!!получаем div через.target.tagName a
			// *переключение по изо.в слайдере
			if (eVent.target.parentElement.classList.contains('slider-btn-prev')) {
				goToImage(eVent.target.parentElement, "");
			} else if (eVent.target.parentElement.classList.contains('slider-btn-next')) {
				goToImage(eVent.target.parentElement, "");
			}
		}
	} else if (eVent.target.tagName === "DIV") {
		if (eVent.target.classList.contains('lightbox-btn-close')) {
			if (window === top || window.name === "") {
				setRemoveLightbox(eVent.target); // - удаление DOM-элемента - узел lightbox в гл.окне
			} else if (window === self || self !== top && window.name === "hmcontent") {
				setHideLightbox(eVent.target); // - скрыть окно просмотра изо - текущий lightbox
			}
		}
	} else if (eVent.target.tagName === "IMG") {
		if (eVent.target.classList.contains('img-item')) {
			// *toggle image zoom
			toggleImageZoom(eVent.target); // - переключение масштабирования изо
		} else if (eVent.target.classList.contains('zoom-in')) {
			if (window === top || window.name === "") { // (i) окно элемента яв-ся главным, например, при запуске отдельной страницей или через ctrl+клик из общего проекта
				// *toggle image zoom
				toggleImageZoom(eVent.target); // - переключение масштабирования изо
			} else if (window === self || self !== top && window.name === "hmcontent") {
				// *image full screen - вывод текущего lightbox в гл.окне
				if (location.origin === "file://") { // - получаем элемент lightbox clone и передаем его в гл.окно
					let clone = getLightboxCopy(eVent.target); // - создать копию/клонирование DOM-элемента - узел lightbox
					if (clone) {
						console.log(`I) function lightbox_onClick(eVent: ${eVent.target.tagName} / ${eVent.target.classList}):\n clone.classList: ${clone.classList}\n 1) ${clone}\n 2) typeof(clone): ${typeof(clone)}\n 3) clone === Object(clone): ${clone === Object(clone)}`); // X -
					} else {
						let lbx = getLightbox(eVent.target);
						clone = getLightboxCopy(lbx); // - создать копию/клонирование DOM-элемента - узел lightbox

						console.log(`II) function lightbox_onClick(eVent: ${eVent.target.tagName} / ${eVent.target.classList}):\n clone = getLightboxCopy(eVent.target)\n clone.classList: ${clone.classList}\n 1) ${lbx}\n 2) typeof(lbx): typeof(lbx)\n 3) ${lbx === Object(lbx)}\n lbx.classList: ${lbx.classList}\n---\n clone: 1) ${clone}\n 2) typeof(clone): ${typeof(clone)}\n 3) clone === Object(clone): ${clone === Object(clone)}`); // X -
					}
					// (i) нельзя передать узел/копию DOM-элемента в другое окно/фрейм, см.спецификацию
					// X // let clone = getLightboxCopy(e.target);
					// clone = clone.innerHTML;
					// X // let clone = JSON.parse(JSON.stringify(getLightboxCopy(e.target))) // (i) JSON-форматированный и/или сериализованный объект
					// X let deepCopy = structuredClone(getLightboxCopy(e.target));
					// let clone = deepCopy.innerHTML;

					let msg = {
						value: "setImageFullScreen",
						clone: clone
					};
					window.top.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
				} else { // - вывод текущего lightbox в гл.окне
					window.top.setImageFullScreen(eVent.target); // - создать изо.во весь экран
				}
			}
		} else if (eVent.target.classList.contains('zoom-out')) {
			toggleImageZoom(eVent.target); // - переключение масштабирования изо
		} else if (eVent.target.parentElement.classList.contains('slider-item')) {
			// *установка на просмотр выбранного изо.из слайдера
			setImageCurrent(eVent.target); // - установить изо.текущим
		}
	}
}
// (!) setEventHandlersLightbox-создание/удаление обработчиков событий для узла lightbox
function setEventHandlersLightbox(elem, addRemove = "") {
	// 'elem - lightbox
	if (addRemove === "" && (addRemove !== String(addRemove) || typeof(addRemove) !== "string")) {
		console.error(`(!) Косяк: не удалось создать/удалить обработчик события - переменная аргумента не определена:\n function setEventHandlersLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, addRemove: "${addRemove}")`);
		alert(`(!) Косяк: не удалось создать/удалить обработчик события - переменная аргумента не определена, см.консоль.`);
		return;
	}
	let lbx;
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
		if (lbx === null) return;
	} else {
		if (elem.classList.contains('lightbox')) {
			lbx = elem;
		} else {
			lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
			if (lbx === null) return;
		}
	}
	// '
	if (addRemove === "add") { // - добавляем
		lbx.addEventListener("mouseover", lightbox_onMouseover);
		lbx.addEventListener("mouseout", lightbox_onMouseout);
		lbx.addEventListener("keydown", lightbox_onKeydown);
		lbx.addEventListener("click", lightbox_onClick);
	} else if (addRemove === "remove") { // - удаляем
		lbx.removeEventListener("mouseover", lightbox_onMouseover);
		lbx.removeEventListener("mouseout", lightbox_onMouseout);
		lbx.removeEventListener("keydown", lightbox_onKeydown);
		lbx.removeEventListener("click", lightbox_onClick);
	}
}
// (!) getLightbox-получить DOM-элемент - узел lightbox
function getLightbox(elem) {
	let lbx;
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		if (document.querySelectorAll('.lightbox').length !== 1) {
			console.error(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - элемент не определен или определен не однозначно:\n function getLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n document.querySelectorAll('.lightbox').length: ${document.querySelectorAll('.lightbox').length} !== 1: ${document.querySelectorAll('.lightbox').length !== 1}`);
			alert(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - элемент не определен или определен не однозначно, см.консоль.`);
			return null;
		} else { // - пытаемся определить элемент в документе, если он единичный
			lbx = document.querySelector('.lightbox');
			if (typeof(lbx) === "undefined" || lbx === null && (lbx === Object(lbx) || typeof(lbx) === "object")) {
				console.error(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - не найден элемент:\n function getLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)}) / ${lbx}\n lbx.tagName: ${lbx.tagName}, lbx.classList: ${lbx.classList}`);
				alert(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - не найден элемент, см.консоль.`);
				return null;
			}
		}
	} else { // *ситуации, если:
		// 'elem - DOM-элемент вне узла lightbox, например ссылка-переключатель
		if (elem.classList.contains('dropdown-toggle')) {
			let tgl = elem.parentElement.nextElementSibling;
			if (typeof(tgl) === "undefined" || tgl === null && (tgl === Object(tgl) || typeof(tgl) === "object")) {
				console.error(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - не найден элемент:\n function getLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n tgl: typeof(${typeof(tgl)}) / Object(${Object(tgl)}) / ${tgl}\n tgl.tagName: ${tgl.tagName}, tgl.classList: ${tgl.classList}`);
				alert(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - не найден элемент, см.консоль.`);
				return null;
			} else {
				if (tgl.tagName === "DIV" && tgl.classList.contains('toggle-content')) {
					if (elem.hasAttribute('num')) {
						for (let i = 0; i < tgl.children.length; i++) {
							if (+tgl.children[i].getAttribute('num') === +elem.getAttribute('num')) {
								return tgl.children[i];
							}
						}
					} else {
						if (tgl.children.length === 1) {
							return tgl.firstElementChild;
						} else { // перестраховка
							console.error(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - элемент определен не однозначно:\n function getLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n tgl: typeof(${typeof(tgl)}) / Object(${Object(tgl)}) / ${tgl}\n tgl.tagName: ${tgl.tagName}, tgl.classList: ${tgl.classList}\n tgl.children.length: ${tgl.children.length}`);
							alert(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - элемент определен не однозначно, см.консоль.`);
							return null;
						}
					}
				}
			}
		} else { // ''elem - дочерний DOM-элемент узла lightbox
			lbx = elem;
			while (!lbx.classList.contains('lightbox')) { // - всплываем
				if (lbx.tagName === "BODY" || lbx.id === "idContentText") {
					console.error(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - не найден элемент:\n function getLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)}) / ${lbx}\n lbx.tagName: ${lbx.tagName}, lbx.classList: ${lbx.classList}`);
					alert(`(!) Косяк: не удалось получить узел DOM-элемента lightbox - не найден элемент, см.консоль.`);
					return null;
				}
				lbx = lbx.parentElement;
			}
			return lbx;
		}
	}
}
// (!) getLightboxVisible-получить значение существования DOM-элемента - узел lightbox
function getLightboxVisible(elem) {
	// 'elem - toggle-content
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось получить значение существования DOM-элемента - узел lightbox - переменная аргумента не определена:\n function getLightboxVisible(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось получить значение существования DOM-элемента - узел lightbox - переменная аргумента не определена, см.консоль.`);
		return false;
	}
	for (let i = 0; i < elem.children.length; i++) {
		if (!elem.children[i].classList.contains('toggle-collapse')) {
			return true;
		}
	}
}
// (!) getLightboxCopy-создать копию/клонирование DOM-элемента - узел lightbox
function getLightboxCopy(elem) { // (i) нельзя передать узел/копию DOM-элемента в другое окно/фрейм, см.спецификацию
	if (typeof (elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось создать копию/клонировать элемент - узел для просмотра изо.во весь экран - переменная аргумента не определена:\n function getLightboxCopy(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось создать копию/клонировать элемент - узел для просмотра изображения во весь экран - переменная аргумента не определена, см.консоль.`);
		return null;
	}
	// 'elem - zoomer>zoom-in - tagName img
	// ''elem - lightbox - tagName div
	let lbx = null;
	if (elem.classList.contains('lightbox')) {
		lbx = elem;
	} else if (elem.classList.contains('zoom-in')) {
		lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
		if (lbx === null || typeof(lbx) === "undefined") {
			console.error(`(!) Косяк: не удалось создать копию/клонировать элемент - узел для просмотра изо.во весь экран - не найден элемент:\n function getLightboxCopy(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)}) / ${lbx}`);
			alert(`(!) Косяк: не удалось создать копию/клонировать элемент - узел для просмотра изо.во весь экран - не найден элемент, см.консоль.`);
			return null;
		}
	}
	// *варианты клонирования - копия узла lightbox:
	// '.cloneNode() - для копирования внутри того же документа (для клонирования узла из текущего document)
	// ''.importNode() - для копирования узлов из других документов (для клонирования узла из другого документа) importNode() копирует исходный элемент, не удаляя его
	// '''.adoptNode() - это еще один метод, который очень похож на importNode() с той разницей, что он удаляет исходный элемент из его родительского DOM. adoptNode() полностью удаляет исходный элемент из его DOM
	// ''''Object.assign({}, e.target) - вариант клонирования объекта
	// '''''structuredClone() - глубокое копирование - структурированное клонирование
	// clone = document.importNode(lbx, true); // - создаем копию lightbox
	let clone = lbx.cloneNode(true); // - клонируем lightbox
	// *обрабатываем клон
	if (clone.hasAttribute('num')) {clone.removeAttribute('num');} // - убираем аттрибут "num"
	let imgZoom = clone.querySelector('.zoomer>img');
	if (typeof(imgZoom) !== "undefined" || imgZoom !== null && (imgZoom === Object(imgZoom) || typeof(imgZoom) === "object")) {
		// 'возвращаем иконку: zoom-in.png => zoom.png
		// imgZoom.setAttribute('src', "icon/zoom.png");
		imgZoom.src = "icon/zoom.png";
	}
	// ! в отличие от lightbox в теме топика, css правило срабатывает наоборот
	if (clone.querySelector('.img-zoom100') === null) {clone.querySelector('.img-item').classList.add('img-zoom100');}
	return clone;
}
// (!) setRemoveLightbox-удаление DOM-элемента - узел lightbox в гл.окне
function setRemoveLightbox(elem) {
	// 'elem - tagName div:
	// 'elem - lightbox-btn-close
	// ''elem - lightbox
	let lbx;
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		if (document.activeElement.classList.contains('lightbox')) {
			lbx = document.activeElement;
		} else if (document.activeElement.classList.contains('lightbox-btn-close')) {
			lbx = getLightbox(document.activeElement);
			if (lbx === null || typeof(lbx) === "undefined") {
				lbx = document.querySelector('.lightbox');
				if (typeof(lbx) === "undefined" || lbx === null && (lbx === Object(lbx) || typeof(lbx) === "object")) {
					let btn = document.querySelector('.lightbox-btn-close');
					if (typeof(btn) === "undefined" || btn === null && (btn === Object(btn) || typeof(btn) === "object")) {
						console.error(`(!) Косяк: не удалось закрыть окно просмотра изо.во весь экран - переменная аргумента не определена:\n function setRemoveLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n document.activeElement: ${document.activeElement}\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)}) / ${lbx}\n btn: typeof(${typeof(btn)}) / Object(${Object(btn)}) / ${btn}`);
						alert(`(!) Косяк: не удалось закрыть окно просмотра изображений во весь экран - переменная аргумента не определена, см.консоль.`);
						return;
					} else {
						lbx = getLightbox(btn); // - получить DOM-элемент - узел lightbox
						if (lbx === null || typeof(lbx) === "undefined") {return;}
					}
				}
			}
		}
	} else {
		if (elem.classList.contains('lightbox')) {
			lbx = elem;
		} else if (elem.classList.contains('lightbox-btn-close')) {
			lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
			if (lbx === null || typeof(lbx) === "undefined") {return;}
		} else {
			if (!elem.classList.contains('lightbox-btn-close') || !elem.classList.contains('lightbox')) {
				console.error(`(!) Косяк: не удалось закрыть окно просмотра изо.во весь экран - у элемента отсутствует класс, либо класс не установлен:\n function setRemoveLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n elem.classList.contains('lightbox-btn-close'): ${elem.classList.contains('lightbox-btn-close')}\n elem.classList.contains('lightbox'): ${elem.classList.contains('lightbox')}\n elem.classList: ${elem.classList}`);
				alert(`(!) Косяк: не удалось закрыть окно просмотра изображений во весь экран - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
				return;
			}
		}
	}
	// '
	lbx.remove(); // - удаляем узел lightbox
	setEventHandlersLightbox(lbx, "remove"); // - создание/удаление обработчиков событий для узла lightbox
}
// (!) setFocusLightbox-фокусировка
function setFocusLightbox(elem, focusInOut = "") {
	if (typeof (elem) === "undefined" || elem === null && (elem !== Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось установить фокус на элемент - переменная аргумента не определена:\n function setFocusLightbox(elem: typeof(${typeof(elem)}), Object(${Object(elem)}, ${elem}, focusInOut: "${focusInOut}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось установить фокус на элемент - переменная аргумента не определена, см.консоль.`);
		return;
	}
	if (typeof(focusInOut) === "undefined" || focusInOut === "" && (focusInOut === String(focusInOut) || typeof(elem) === "string")) {
		console.error(`(!) Косяк: не удалось установить фокус на элемент - переменная аргумента не определена:\n function setFocusLightbox(elem: typeof(${typeof(elem)}), Object(${Object(elem)}, ${elem}, focusInOut: "${focusInOut}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось установить фокус на элемент - переменная аргумента не определена, см.консоль.`);
		return;
	}
	if (focusInOut === "focusIn") {
		elem.scrollIntoView(); // - переход к элементу - не путать с фокусированием
		// (?) 'как снять визуальное выделение браузером
		elem.tabIndex = "0"; // (1)
		elem.focus(); // (2)
		// if (elem !== document.activeElement) {
		// 	document.activeElement.tabIndex = "-1"; // (3)
		// }


	} else if (focusInOut === "focusOut") {
		// elem.tabIndex = "-1";
		if (elem.hasAttribute('tabIndex')) {
			elem.removeAttribute('tabIndex');
		} else {
			elem.blur();
		}
	}
}
// (!) writeImageElement-создать элемент изо
function writeImageElement(elem) {
	// 'elem - div lightbox
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось создать элемент изо - переменная аргумента не определена:\n function writeImageElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось создать элемент изображения - переменная аргумента не определена, см.консоль.`);
		return null;
	}
	let imgItem = null; // img img-item
	let txt = elem.querySelector('.img-text'); // div img-text
	let img = elem.querySelector('.slider-current>img'); // img slider-item
	let imgViewer = elem.querySelector('.img-viewer'); // div img-viewer
	if (typeof(imgViewer) === "undefined" || imgViewer === null && (imgViewer === Object(imgViewer) || typeof(imgViewer) === "object")) {
		console.error(`(!) Косяк: не удалось создать элемент изо - не найден элемент:\n function writeImageElement(elem: typeof(${typeof(elem)}), Object(${Object(elem)}, ${elem}):\n imgViewer: typeof(${typeof(imgViewer)}), Object(${Object(imgViewer)}), ${imgViewer}`);
		alert(`(!) Косяк: не удалось создать элемент изображения - не найден элемент, см.консоль.`);
		return imgItem; // null
	}
	if (typeof(img) === "undefined" || img === null && (img === Object(img) || typeof(img) === "object")) {
		console.error(`(!) Косяк: не удалось создать элемент изо - не найден элемент:\n function writeImageElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n img: typeof(${typeof(img)}), Object(${Object(img)}), ${img}`);
		alert(`(!) Косяк: не удалось создать элемент изображения - не найден элемент, см.консоль.`);
		return null;
	}
	if (typeof(txt) === "undefined" || txt === null && (txt === Object(txt) || typeof(txt) === "object")) {
		console.error(`(!) Косяк: не удалось создать элемент изо - не найден элемент:\n function writeImageElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n txt: typeof(${typeof(txt)}), Object(${Object(txt)}), ${txt}`);
		alert(`(!) Косяк: не удалось создать элемент изображения - не найден элемент, см.консоль.`);
		return null;
	}
	if (imgViewer.children.length === 0) { // - img отсутствует, создаем его из слайдера
		if (txt.innerHTML !== img.alt) {
			txt.innerHTML = "";
			txt.innerHTML = img.alt;
		}
		imgViewer.insertAdjacentHTML('afterbegin', '<img class="img-item" src="' + img.src + '" alt="' + img.alt + '">');
		return imgItem = elem.querySelector('.img-item');
	}
}
// (!) zoomerShowHide-показать/скрыть элемент зуммер
function zoomerShowHide(elem) {
	// 'elem - img-item - tagName img
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изо - переменная аргумента не определена:\n function zoomerShowHide(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изображения - переменная аргумента не определена, см.консоль.`);
		return;
	} else if (!elem.classList.contains('img-item')) {
		console.error(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изо - у элемента отсутствует класс, либо класс не установлен:\n function zoomerShowHide(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n elem.classList.contains('img-item'): ${elem.classList.contains('img-item')}\n elem.classList: ${elem.classList}`);
		alert(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изображения - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return;
	}
	let lbx = getLightbox(elem);
	if (lbx === null || typeof(elem) === "undefined") {
		console.error(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изо - не найден элемент:\n function zoomerShowHide(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)}) / ${lbx}`);
		alert(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изображения - не найден элемент, см.консоль.`);
		return;
	}
	let zoomer = lbx.querySelector('.zoomer');
	if (typeof(zoomer) === "undefined" || zoomer === null && (zoomer === Object(zoomer) || typeof(zoomer) === "object")) {
		console.error(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изо - не найден элемент:\n function zoomerShowHide(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n zoomer: typeof(${typeof(zoomer)}) / Object(${Object(zoomer)}) / ${zoomer}`);
		alert(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изображения - не найден элемент, см.консоль.`);
		return;
	}
	if (elem.naturalWidth > 300) {
		if (zoomer.style.display === "none") {
			zoomer.removeAttribute('style');
		}
	} else {zoomer.style.display = "none"}
}
// (!) setCursorImageIcon-установить значок изо.курсора
function setCursorImageIcon(elem) {
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось установить значок изображения курсора - переменная аргумента не определена:\n function setCursorImageIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem} / ${Object(elem)})`);
		alert(`(!) Косяк: не удалось установить значок изображения курсора - переменная аргумента не определена, см.консоль.`);
		return;
	}
	// 'elem - img-item - tagName img
	if (elem.naturalWidth > 300) {
		if (elem.style.cursor === "default") {
			elem.style.removeProperty('cursor'); // - удалить css св-во
		}
	} else {
		if (elem.style.cursor !== "default") {elem.style.cursor = "default";}
	}
}
// (!) toggleInlineElement-переключить встроенный элемент
function toggleInlineElement(elem) {
	// 'elem - inline-toggle.toggle-hidden/toggle-shown - tagName a
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось переключить встроенный элемент - переменная аргумента не определена:\n function toggleInlineElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось переключить встроенный элемент - переменная аргумента не определена, см.консоль.`);
		return;
	} else if (!(elem.classList.contains('toggle-hidden') || elem.classList.contains('toggle-shown'))) {
		console.error(`(!) Косяк: не удалось переключить встроенный элемент - у элемента отсутствует класс, либо класс не установлен:\n function toggleInlineElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n elem.classList.contains('toggle-hidden'): ${elem.classList.contains('toggle-hidden')}\n elem.classList.contains('toggle-shown'): ${elem.classList.contains('toggle-shown')}`);
		alert(`(!) Косяк: не удалось переключить встроенный элемент - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return;
	}
	// *меняем состояние отображения toggle-content - tagName span
	if (typeof(elem.nextElementSibling) === "undefined" || elem.nextElementSibling === null && (elem.nextElementSibling === Object(elem.nextElementSibling) || typeof(elem.nextElementSibling) === "object")) {
		console.error(`(!) Косяк: не удалось переключить встроенный - не найден элемент:\n function toggleInlineElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n elem.nextElementSibling: ${typeof(elem.nextElementSibling)} / Object(${Object(elem.nextElementSibling)}) / ${elem.nextElementSibling}`);
		alert(`(!) Косяк: не удалось переключить встроенный - не найден элемент, см.консоль.`);
		return;
	}
	if (elem.nextElementSibling.tagName === "SPAN" && elem.nextElementSibling.classList.contains('toggle-content')) {
		elem.nextElementSibling.classList.toggle('toggle-collapse');
	}
}
// (!) toggleDropdownElement-переключить выпадающий элемент
function toggleDropdownElement(elem) {
	// 'elem - dropdown-toggle.toggle-hidden/toggle-shown - tagName a
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось переключить выпадающий скрытый контент - переменная аргумента не определена:\n function toggleDropdownElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось переключить выпадающий скрытый контент - переменная аргумента не определена, см.консоль.`);
		return;
	} else if (!(elem.classList.contains('toggle-hidden') || elem.classList.contains('toggle-shown'))) {
		console.error(`(!) Косяк: не удалось переключить выпадающий скрытый контент - у элемента отсутствует класс, либо класс не установлен:\n function toggleDropdownElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n elem.classList.contains('toggle-hidden'): ${elem.classList.contains('toggle-hidden')}\n elem.classList.contains('toggle-shown'): ${elem.classList.contains('toggle-shown')}\n elem.classList: ${elem.classList}`);
		alert(`(!) Косяк: не удалось переключить выпадающий скрытый контент - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return;
	}
	let tgl = elem.parentElement.nextElementSibling; // - div toggle-content
	if (typeof(tgl) === "undefined" || tgl === null && (tgl === Object(tgl) || typeof(tgl) === "object")) {
		console.error(`(!) Косяк: не удалось переключить выпадающий скрытый контент - не найден элемент:\n function toggleDropdownElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n tgl: typeof(${typeof(tgl)}) / Object(${Object(tgl)} / ${tgl}`);
		alert(`(!) Косяк: не удалось переключить выпадающий скрытый контент - не найден элемент, см.консоль.`);
		return;
	} else if (tgl.tagName === "DIV" && !tgl.classList.contains('toggle-content')) {
		console.error(`(!) Косяк: не удалось переключить выпадающий скрытый контент - у элемента отсутствует класс, либо класс не установлен:\n function toggleDropdownElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n tgl.classList.contains('toggle-content'): ${tgl.classList.contains('toggle-content')}\n tgl.classList: ${tgl.classList}`);
		alert(`(!) Косяк: не удалось переключить выпадающий скрытый контент - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return;
	}
	// 'проверяем существование (existence) элемента lightbox
	if (tgl.querySelector('.lightbox') === null) { // - если скрытый контент - это НЕ изо, а например какой-то текст...
		tgl.classList.toggle('toggle-collapse');
	} else { // *в lightbox's ищем аттрибут "num", сверяя его с аттрибутом элемента tagName a
		for (let i = 0; i < tgl.children.length; i++) {
			if (tgl.children[i].tagName === "DIV" && tgl.children[i].classList.contains('lightbox')) {
				let lbx = tgl.children[i];
				let imgItem = lbx.querySelector('.img-item');
				if (lbx.hasAttribute('num')) {
					if (+lbx.getAttribute('num') === +elem.getAttribute('num')) {
						if (lbx.classList.contains('toggle-collapse')) {
							// 'проверяем существование (existence) элемента img для просмотра изображений
							if (typeof(imgItem) === "undefined" || imgItem === null && (imgItem === Object(imgItem) || typeof(imgItem) === "object")) {
								imgItem = writeImageElement(lbx); // - создать элемент изо.в текущем lightbox
							}
							zoomerShowHide(imgItem); // - проверяем натуральный размер изо, чтобы отобразить/скрыть элемент лупа
							setCursorImageIcon(imgItem); // - установить значок изо.курсора
							lbx.classList.remove('toggle-collapse'); // - отображаем lightbox
						} else {
							lbx.classList.add('toggle-collapse'); // - скрываем lightbox
						}
						// *проверяем видимость др.lightbox's, кот.вложенны в toggle-content для текущего абзаца, если есть хотя бы 1 раскрытый lightbox, toggle-content остается видимым
						if (getLightboxVisible(tgl)) {
							tgl.classList.remove('toggle-collapse'); // - отображаем div toggle-content
							setFocusLightbox(lbx, "focusIn"); // - фокусировка на lightbox
							setEventHandlersLightbox(lbx, "add"); // - создание/удаление обработчиков событий для узла lightbox
						} else {
							setFocusLightbox(lbx, "focusOut"); // - фокусировка на lightbox
							tgl.classList.add('toggle-collapse'); // - скрываем div toggle-content
							setEventHandlersLightbox(lbx, "remove"); // - создание/удаление обработчиков событий для узла lightbox
						}
						break;
					}
				} else { // - одиночное изо
					if (lbx.classList.contains('toggle-collapse')) { // - отображаем
						zoomerShowHide(imgItem); // - проверяем натуральный размер изо, чтобы отобразить/скрыть элемент лупа
						setCursorImageIcon(imgItem); // - установить значок изо.курсора
						lbx.classList.remove('toggle-collapse');
						tgl.classList.remove('toggle-collapse');
						setFocusLightbox(lbx, "focusIn"); // - фокусировка на lightbox
						setEventHandlersLightbox(lbx, "add"); // - создание/удаление обработчиков событий для узла lightbox
					} else { // - скрываем
						setFocusLightbox(lbx, "focusOut"); // - фокусировка на lightbox
						lbx.classList.add('toggle-collapse');
						tgl.classList.add('toggle-collapse');
						setEventHandlersLightbox(lbx, "remove"); // - создание/удаление обработчиков событий для узла lightbox
					}
				}
			}
		}
	}
}
// (!) setToggleIcon-переключатель иконки в текущем абзаце для скрытого контента в теме топика
function setToggleIcon(elem, btnValue = null) {
	// 'elem - tagName img
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк - не удалось выполнить изменение иконки - переменная аргумента не определена:\n function setToggleIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnValue = ${btnValue})`);
		alert(`(!) Косяк - не удалось выполнить изменение иконки - переменная аргумента не определена, см.консоль.`);
		return;
	} else if (!elem.classList.contains('toggle-icon')) {
		console.error(`(!) Косяк: не удалось выполнить изменение иконки - у элемента отсутствует класс, либо класс не установлен:\n function setToggleIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnValue = ${btnValue}):\n elem.classList.contains('toggle-icon'): ${elem.classList.contains('toggle-icon')}\n elem.classList: ${elem.classList}`);
		alert(`(!) Косяк: не удалось выполнить изменение иконки - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return;
	}
	let el = elem.parentElement; // - tagName p
	if (typeof(el) === "undefined" || el === null && (el === Object(el) || typeof(el) === "object")) {
		console.error(`(!) Косяк - не удалось выполнить изменение иконки - не найден элемент:\n function setToggleIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnValue = ${btnValue})\n el: typeof(${typeof(el)}), Object(${Object(el)}), ${el}`);
		alert(`(!) Косяк - не удалось выполнить изменение иконки - не найден элемент, см.консоль.`);
		return;
	}
	if (btnValue === null) { // - переключатель текущего элемента
		// 'перебираем в абзаце все ссылки dropdown-toggle/inline-toggle
		for (let i = 0; i < el.children.length; i++) {
			if (el.children[i].tagName === "A" && el.children[i].classList.contains('dropdown-toggle') || el.children[i].classList.contains('inline-toggle')) {
				// *toggle-icon меняется, если имеется хотя бы одна ссылка с классом toggle-shown
				if (el.children[i].classList.contains('toggle-shown')) {
					if (elem.getAttribute('src') === "icon/tgl_gb0.png") {
						elem.setAttribute('src', 'icon/tgl_gb1.png');
					} else if (elem.getAttribute('src') === "icon/tgl_expand1.gif") {
						// elem.setAttribute('src', 'icon/tgl_collapse1.gif');
						elem.src = "icon/tgl_collapse1.gif";
					}
					break;
				} else {
					if (elem.getAttribute('src') === "icon/tgl_gb1.png") {
						elem.setAttribute('src', 'icon/tgl_gb0.png');
					} else if (elem.getAttribute('src') === "icon/tgl_collapse1.gif") {
						// elem.setAttribute('src', 'icon/tgl_expand1.gif');
						elem.src = "icon/tgl_expand1.gif";
					}
				}
			}
		}
	} else { // - переключатель каждого элемента - кнопка idTextExpandCollapse
		if (typeof(btnValue) !== "boolean" || btnValue !== Boolean(btnValue)) {
			console.error(`(!) Косяк - не удалось выполнить изменение иконки - переменная аргумента не определена:\n function setToggleIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnValue = ${btnValue})`);
			alert(`(!) Косяк - не удалось выполнить изменение иконки - переменная аргумента не определена, см.консоль.`);
			return;
		}
		if (btnValue) { // - контент скрыт, отображаем
			if (elem.getAttribute('src') === "icon/tgl_gb0.png") {
				elem.setAttribute('src', 'icon/tgl_gb1.png');
			} else if (elem.getAttribute('src') === "icon/tgl_expand1.gif") {
				// elem.setAttribute('src', 'icon/tgl_collapse1.gif');
				elem.src = "icon/tgl_collapse1.gif";
			}
		} else { // - контент раскрыт, скрываем
			if (elem.getAttribute('src') === "icon/tgl_gb1.png") {
				elem.setAttribute('src', 'icon/tgl_gb0.png');
			} else if (elem.getAttribute('src') === "icon/tgl_collapse1.gif") {
				// elem.setAttribute('src', 'icon/tgl_expand1.gif');
				elem.src = "icon/tgl_expand1.gif";
			}
		}
	}
}
// (!) setToggleElement-установить элемент переключения скрытого контента - развернуть/свернуть скрытый контент
function setToggleElement(elem = null, btnChecked = null) {
	// 'elem - tagName a
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) { // *работаем по всем элементам
		if (btnChecked === null || typeof(btnChecked) !== "boolean" || btnChecked !== Boolean(btnChecked)) {
			console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - переменная аргумента не определена:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked})`);
			alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - переменная аргумента не определена, см.консоль.`);
			return;
		}
		let elems; // 'toggle-content - tagName: div/span; lightbox's - tagName div; dropdown-toggle/inline-toggle - tagName a; toggle-icon - tagName img
		if (btnChecked) { // - отображаем
			elems = document.getElementById('idTopicContent').querySelectorAll('.toggle-content');
			if (elems.length < 1) {
				console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elems: typeof(${typeof(elems)}) / Object(${Object(elems)}) / ${elems}`);
				alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
			} else { // 'toggle-content: div/span
				elems.forEach(tgl => {
					if (tgl.tagName === "DIV") {
						let el = tgl.querySelectorAll('.lightbox'); // - lightbox's
						if (el.lengh < 1) {
							console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n el: typeof(${typeof(el)}) / Object(${Object(el)} / ${el})`);
							alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
						} else {
							el.forEach(lbx => {
								let imgItem = lbx.querySelector('.img-item');
								// 'проверяем существование (existence) элемента img для просмотра изображений
								if (typeof(imgItem) === "undefined" || imgItem === null && (imgItem === Object(imgItem) || typeof(imgItem) === "object")) {
									imgItem = writeImageElement(lbx); // - создать элемент изо
								}
								zoomerShowHide(imgItem); // - проверяем натуральный размер изо, чтобы отобразить/скрыть элемент лупа
								setCursorImageIcon(imgItem); // - установить значок изо.курсора
								lbx.classList.remove('toggle-collapse');
								setEventHandlersLightbox(lbx, "add"); // - создание/удаление обработчиков событий для узла lightbox
							});
						}
					}
					tgl.classList.remove('toggle-collapse'); // - div/span
				});
			}
			// 'link's - dropdown-toggle/inline-toggle - tagName a
			elems = document.getElementById('idTopicContent').querySelectorAll('.toggle-hidden');
			if (elems.length < 1) {
				console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elems: typeof(${typeof(elems)}) / Object(${Object(elems)}) / ${elems}`);
				alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
			} else {
				elems.forEach(lnk => {
					lnk.classList.remove('toggle-hidden');
					lnk.classList.add('toggle-shown');
				});
			}
		} else { // - скрываем
			// 'lightbox's - tagName div
			elems = document.getElementById('idTopicContent').querySelectorAll('.lightbox');
			if (elems.length < 1) {
				console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elems: typeof(${typeof(elems)}) / Object(${Object(elems)}) / ${elems}`);
				alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
			} else {
				elems.forEach(lbx => {
					lbx.classList.add('toggle-collapse');
					setEventHandlersLightbox(lbx, "remove"); // - создание/удаление обработчиков событий для узла lightbox
				});
			}
			// 'toggle-content - tagName: div/span
			elems = document.getElementById('idTopicContent').querySelectorAll('.toggle-content');
			if (elems.length < 1) {
				console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elems: typeof(${typeof(elems)}) / Object(${Object(elems)}) / ${elems}`);
				alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
			} else {
				elems.forEach(tgl => {
					tgl.classList.add('toggle-collapse');
				});
			}
			// 'link's - dropdown-toggle/inline-toggle - tagName a
			elems = document.getElementById('idTopicContent').querySelectorAll('.toggle-shown');
			if (elems.length < 1) {
				console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):`);
				alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
			} else {
				elems.forEach(lnk => {
					lnk.classList.remove('toggle-shown');
					lnk.classList.add('toggle-hidden');
				});
			}
		}
		// 'icon's - toggle-icon - tagName img
		elems = document.getElementById('idTopicContent').querySelectorAll('.toggle-icon');
		if (elems.length < 1) {
			console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elems: typeof(${typeof(elems)}) / Object(${Object(elems)}) / ${elems}`);
			alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
		} else {
			elems.forEach(icon => {
				setToggleIcon(icon, btnChecked); // - переключатель иконки в текущем абзаце для скрытого контента в теме топика
			});
		}
	} else { // *работаем с текущим элементом
		if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
			console.error(`(!) Косяк: не удалось выполнить переключение элемента(-ов) скрытого контента - переменная аргумента не определена:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked})`);
			alert(`(!) Косяк: не удалось выполнить переключение элемента(-ов) скрытого контента - переменная аргумента не определена, см.консоль.`);
			return;
		} else if (!(elem.classList.contains('toggle-hidden') || elem.classList.contains('toggle-shown'))) {
			console.error(`(!) Косяк: не удалось выполнить переключение элемента(-ов) скрытого контента - у элемента отсутствует класс, либо класс не установлен:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elem.classList.contains('toggle-hidden'): ${elem.classList.contains('toggle-hidden')}\n elem.classList.contains('toggle-shown'): ${elem.classList.contains('toggle-shown')}\n elem.classList: ${elem.classList}`);
			alert(`(!) Косяк: не удалось выполнить переключение элемента(-ов) скрытого контента - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
			return;
		}
		// 'elem - tagName a
		if (elem.classList.contains('inline-toggle')) { // - встроенный переключатель
			toggleInlineElement(elem);
		} else if (elem.classList.contains('dropdown-toggle')) { // - выпадающий переключатель
			toggleDropdownElement(elem);
		}
		// 'link - dropdown-toggle/inline-toggle - tagName a
		if (elem.classList.contains('toggle-hidden')) { // - отображаем
			elem.classList.remove('toggle-hidden');
			elem.classList.add('toggle-shown');
		} else if (elem.classList.contains('toggle-shown')) { // - скрываем
			elem.classList.remove('toggle-shown');
			elem.classList.add('toggle-hidden');
		}
		// *меняем в абзаце иконку, если она есть:
		// 'icon - toggle-icon - tagName img
		let icon = elem.parentElement.querySelector('.toggle-icon'); // - img
		if (icon !== null && icon === Object(icon)) {setToggleIcon(icon);} // - переключатель иконки в текущем абзаце для скрытого контента в теме топика
	}
}
// (!) toggleImageZoom-переключение масштабирования изо
function toggleImageZoom(elem) {
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось осуществить переключение масштабирования изо - переменная аргумента не определена:\n function toggleImageZoom(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}: window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось осуществить переключение масштабирования изображения - переменная аргумента не определена, см.консоль.`);
		return;
	}
	// 'elem - tagName img:
	// '.img-item <=>.img-item.img-zoom100
	// ''.zoomer>.zoom-in <=>.zoom-out
	let lbx = getLightbox(elem);
	if (lbx === null || typeof(lbx) === "undefined") {return;}
	setFocusLightbox(lbx, "focusIn"); // - фокусировка на lightbox
	let imgItem = null;
	if (elem.classList.contains('img-item')) {
		imgItem = elem;
	} else if (elem.classList.contains('zoom-in') || elem.classList.contains('zoom-out')) {
		imgItem = lbx.querySelector('.img-item');
		if (typeof(imgItem) === "undefined" || imgItem === null && (imgItem === Object(imgItem) || typeof(imgItem) === "object")) {
			console.error(`(!) Косяк: не удалось осуществить переключение масштабирования изо.во весь экран - не найден элемент:\n function toggleImageZoom(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n imgItem: typeof(${typeof(imgItem)}) / Object(${Object(imgItem)}) / ${imgItem}`);
			alert(`(!) Косяк: не удалось осуществить переключение масштабирования изображения во весь экран - не найден элемент, см.консоль.`);
			return;
		}
	}
	if (imgItem.naturalWidth > 300) { // - проверяем размер изо
		let zoom = lbx.querySelector('.zoomer>img');
		if (typeof(zoom) === "undefined" || zoom === null && (zoom === Object(zoom) || typeof(zoom) === "object")) {
			console.error(`(!) Косяк: не удалось осуществить переключение масштабирования изо.во весь экран - не найден элемент:\n function toggleImageZoom(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n zoom: typeof(${typeof(zoom)}) / Object(${Object(zoom)}) / ${zoom}`);
			alert(`(!) Косяк: не удалось осуществить переключение масштабирования изображения во весь экран - не найден элемент, см.консоль.`);
			return;
		}
		console.log(`function toggleImageZoom(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): location.origin: ${location.origin}:\n window."${window.name}" === top: ${window === top}\n window.frameElement: ${window.frameElement}\n window === self || self !== top && window.name === "hmcontent": ${window === self || self !== top && window.name === "hmcontent"}\n 1) window === self: ${window === self}\n 2) window.self !== window.top: ${window.self !== window.top}\n 3) window.${window.name} === "hmcontent": ${window.name === "hmcontent"}\n---\n 1) !imgItem.classList.contains('img-zoom100'): ${!imgItem.classList.contains('img-zoom100')}\n 2) imgItem.classList.contains('img-zoom100') !== null: ${imgItem.classList.contains('img-zoom100') !== null}\n 3) imgItem.classList.contains('img-zoom100') === null: ${imgItem.classList.contains('img-zoom100') === null}`); // X -

		imgItem.classList.toggle('img-zoom100');
		if (window === top || window.name === "") {
			if (imgItem.classList.contains('img-zoom100')) {
				zoom.classList.remove('zoom-out');
				zoom.classList.add('zoom-in');
			} else if (!imgItem.classList.contains('img-zoom100')) {
				zoom.classList.remove('zoom-in');
				zoom.classList.add('zoom-out');
			}
		} else if (window === self || self !== top && window.name === "hmcontent") {
			zoom.classList.remove('zoom-out');
			zoom.classList.add('zoom-in');
			// if (imgItem.classList.contains('img-zoom100')) {
			// 	zoom.classList.remove('zoom-in');
			// 	zoom.classList.add('zoom-out');
			// } else if (!imgItem.classList.contains('img-zoom100')) {
			// 	zoom.classList.remove('zoom-out');
			// 	zoom.classList.add('zoom-in');
			// }
		}
	}
	setCursorImageIcon(imgItem); // - установить значок изо.курсора
}
// (!) setImageCurrent-установить изо.текущим
function setImageCurrent(elem) {
	// 'elem - tagName img:.slider-item <=>.slider-item.slider-current
	let lbx;
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
		if (lbx === null) return;
	} else {
		if (elem.classList.contains('lightbox')) {
			lbx = elem;
		} else {
			lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
			if (lbx === null) return;
		}
	}
	setFocusLightbox(lbx, "focusIn"); // - фокусировка на lightbox
	let img = lbx.querySelector('.img-item');
	let txt = lbx.querySelector('.img-text');
	let sldr = lbx.querySelector('.slider-current');
	if (typeof(sldr) === "undefined" || sldr === null && (sldr === Object(sldr) || typeof(sldr) === "object")) {
		console.error(`(!) Косяк: не удалось установить изо.текущим - не найден элемент:\n function setImageCurrent(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n sldr: typeof(${typeof(sldr)}) / Object(${Object(sldr)}) / ${sldr}`);
		alert(`(!) Косяк: не удалось установить изображение текущим - не найден элемент, см.консоль.`);
		return;
	}
	if (typeof(txt) === "undefined" || txt === null && (txt === Object(txt) || typeof(txt) === "object")) {
		console.error(`(!) Косяк: не удалось установить изо.текущим - не найден элемент:\n function setImageCurrent(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n txt: typeof(${typeof(txt)}) / Object(${Object(txt)}) / ${txt}`);
		alert(`(!) Косяк: не удалось установить изображение текущим - не найден элемент, см.консоль.`);
		return;
	}
	if (typeof(img) === "undefined" || img === null && (img === Object(img) || typeof(img) === "object")) {
		console.error(`(!) Косяк: не удалось установить изо.текущим - не найден элемент:\n function setImageCurrent(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n img: typeof(${typeof(img)}) / Object(${Object(img)}) / ${img}`);
		alert(`(!) Косяк: не удалось установить изображение текущим - не найден элемент, см.консоль.`);
		return;
	}
	if (img.src !== elem.src && img.alt !== elem.alt) {
		img.src = elem.src;
		img.alt = txt.innerHTML = elem.alt;
		sldr.classList.remove('slider-current');
		elem.parentElement.classList.add('slider-current');
	}
	// 'проверяем натуральный размер изо, чтобы отобразить/скрыть элемент лупа
	let zoomer = lbx.querySelector('.zoomer');
	if (typeof(zoomer) !== "undefined" || zoomer !== null && (zoomer === Object(zoomer) || typeof(zoomer) === "object")) {
		if (elem.naturalWidth > 300) {
			if (zoomer.style.display === "none") {zoomer.removeAttribute('style');}
		} else {zoomer.style.display = "none"}
	}
}
// (!) goToImage-переключение по изо.в слайдере
function goToImage(elem, keyEvent = "") {
	// *elem - tagName div:
	// 'lightbox
	// ''lightbox-img:.img-btn-prev/.img-btn-next
	// '''img-slider:.slider-btn-prev/.slider-btn-next
	// **elem - tagName a:
	// 'dropdown-toggle
	// ''.img-btn-prev a/.img-btn-next a // (?) если придет ссылкой, то косяк
	// '''.slider-btn-prev a/.slider-btn-next a // (?) если придет ссылкой, то косяк
	// ***keyEvent - keyboardEvent:
	// 'event.code
	let lbx;
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
		if (lbx === null) {return;}
	} else {
		if (elem.classList.contains('lightbox')) {
			lbx = elem;
		} else {
			lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
			if (lbx === null) {return;}
		}
	}
	if (typeof(keyEvent) === "undefined" || keyEvent !== String(keyEvent) || typeof(keyEvent) !== "string") { // - может оставаться пустой строкой
		console.error(`(!) Косяк: не удалось осуществить переключение на другое изо - переменная аргумента не определена:\n function goToImage(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, keyEvent: "${keyEvent}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось осуществить переключение на другое изображение - переменная аргумента не определена, см.консоль.`);
		return;
	}
	setFocusLightbox(lbx, "focusIn"); // - фокусировка на lightbox
	let img = lbx.querySelector('.img-item'); // - img-viewer>img <=> аналогично slider-current
	let txt = lbx.querySelector('.img-text');
	let sldr = lbx.querySelector('.slider-track');
	if (typeof(sldr) === "undefined" || sldr === null && (sldr === Object(sldr) || typeof(sldr) === "object")) {
		console.error(`(!) Косяк: не удалось совершить переключение на др.изо - не найден элемент:\n function goToImage(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, keyEvent: "${keyEvent}"): window."${window.name}", location.origin: ${location.origin}:\n sldr: typeof(${typeof(sldr)}) / Object(${Object(sldr)}) / ${sldr}`);
		alert(`(!) Косяк: не удалось совершить переключение на другое изображение - не найден элемент, см.консоль.`);
		return;
	} else if (typeof(txt) === "undefined" || txt === null && (txt === Object(txt) || typeof(txt) === "object")) {
		console.error(`(!) Косяк: не удалось совершить переключение на др.изо - не найден элемент:\n function goToImage(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, keyEvent: "${keyEvent}"): window."${window.name}", location.origin: ${location.origin}:\n txt: typeof(${typeof(txt)}) / Object(${Object(txt)}) / ${txt}`);
		alert(`(!) Косяк: не удалось совершить переключение на другое изображение - не найден элемент, см.консоль.`);
		return;
	} else if (typeof(img) === "undefined" || img === null && (img === Object(img) || typeof(img) === "object")) {
		console.error(`(!) Косяк: не удалось совершить переключение на др.изо - не найден элемент:\n function goToImage(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, keyEvent: "${keyEvent}"): window."${window.name}", location.origin: ${location.origin}:\n img: typeof(${typeof(img)}) / Object(${Object(img)}) / ${img}`);
		alert(`(!) Косяк: не удалось совершить переключение на другое изображение - не найден элемент, см.консоль.`);
		return;
	}
	// *создаем обработчик события для slider-track, чтобы удалить css св-во "animation" по окончанию воспроизведения анимации для 1-ого/последнего слайда, иначе она больше не будет воспроизводиться
	sldr.addEventListener("animationend", (event) => {
		event.target.style.removeProperty('animation'); // - удаляем css св-во
	}, false); // false - фаза "всплытие"
	// *в slider-track перебираем slider-item ищем slider-current и переназначаем его в зависимости от условия перехода
	for (let i = 0; i < sldr.children.length; i++) {
		if (sldr.children[i].classList.contains('slider-current')) {
			if (keyEvent === "Home") {
				if (i === 0) { // - изо.первое
					animationOffset(sldr); // - анимационное смещение
				} else { // - изо.последнее или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[0].firstElementChild.src) {
						img.src = sldr.children[0].firstElementChild.src;
						img.alt = sldr.children[0].firstElementChild.alt;
						txt.innerHTML = sldr.children[0].firstElementChild.alt;
					}
					// 'переназначаем класс
					for (let n = 0; n < sldr.children.length; n++) {
						sldr.children[n].classList.remove('slider-current');
					}
					sldr.children[0].classList.add('slider-current');
				}
			} else if (keyEvent === "End") {
				if (i === sldr.children.length - 1) { // - изо.последнее
					animationOffset(sldr); // - анимационное смещение
				} else { // - изо.первое или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[sldr.children.length - 1].firstElementChild.src) {
						img.src = sldr.children[sldr.children.length - 1].firstElementChild.src;
						img.alt = sldr.children[sldr.children.length - 1].firstElementChild.alt;
						txt.innerHTML = sldr.children[sldr.children.length - 1].firstElementChild.alt;
					}
					// 'переназначаем класс
					for (let n = 0; n < sldr.children.length; n++) {
						sldr.children[n].classList.remove('slider-current');
					}
					sldr.children[sldr.children.length - 1].classList.add('slider-current');
				}
			} else if (elem.classList.contains('img-btn-prev') || keyEvent === "ArrowUp") {
				if (i === 0) { // - изо.первое
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[sldr.children.length - 1].firstElementChild.src) {
						img.src = sldr.children[sldr.children.length - 1].firstElementChild.src;
						img.alt = sldr.children[sldr.children.length - 1].firstElementChild.alt;
						txt.innerHTML = sldr.children[sldr.children.length - 1].firstElementChild.alt;
					}
					// 'переназначаем класс
					for (let n = 0; n < sldr.children.length; n++) {
						sldr.children[n].classList.remove('slider-current');
					}
					sldr.children[sldr.children.length - 1].classList.add('slider-current');
				} else { // - изо.последнее или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[i - 1].firstElementChild.src) {
						img.src = sldr.children[i - 1].firstElementChild.src;
						img.alt = sldr.children[i - 1].firstElementChild.alt;
						txt.innerHTML = sldr.children[i - 1].firstElementChild.alt;
					}
					// 'переназначаем класс
					for (let n = 0; n < sldr.children.length; n++) {
						sldr.children[n].classList.remove('slider-current');
					}
					sldr.children[i - 1].classList.add('slider-current');
				}
			} else if (elem.classList.contains('slider-btn-prev') || keyEvent === "ArrowLeft") {
				if (i === 0) { // - изо.первое
					animationOffset(sldr); // - анимационное смещение
				} else { // - изо.последнее или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[i - 1].firstElementChild.src) {
						img.src = sldr.children[i - 1].firstElementChild.src;
						img.alt = sldr.children[i - 1].firstElementChild.alt;
						txt.innerHTML = sldr.children[i - 1].firstElementChild.alt;
					}
					// 'переназначаем класс
					for (let n = 0; n < sldr.children.length; n++) {
						sldr.children[n].classList.remove('slider-current');
					}
					sldr.children[i - 1].classList.add('slider-current');
				}
			} else if (elem.classList.contains('img-btn-next') || keyEvent === "ArrowDown") {
				if (i === sldr.children.length - 1) { // - изо.последнее
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[0].firstElementChild.src) {
						img.src = sldr.children[0].firstElementChild.src;
						img.alt = sldr.children[0].firstElementChild.alt;
						txt.innerHTML = sldr.children[0].firstElementChild.alt;
					}
					// 'переназначаем класс
					for (let n = 0; n < sldr.children.length; n++) {
						sldr.children[n].classList.remove('slider-current');
					}
					sldr.children[0].classList.add('slider-current');
				} else { // - изо.первое или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[i + 1].firstElementChild.src) {
						img.src = sldr.children[i + 1].firstElementChild.src;
						img.alt = sldr.children[i + 1].firstElementChild.alt;
						txt.innerHTML = sldr.children[i + 1].firstElementChild.alt;
					}
					// 'переназначаем класс
					for (let n = 0; n < sldr.children.length; n++) {
						sldr.children[n].classList.remove('slider-current');
					}
					sldr.children[i + 1].classList.add('slider-current');
				}
			} else if (elem.classList.contains('slider-btn-next') || keyEvent === "ArrowRight") {
				if (i === sldr.children.length - 1) { // - изо.последнее
					animationOffset(sldr); // - анимационное смещение
				} else { // - изо.первое или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[i + 1].firstElementChild.src) {
						img.src = sldr.children[i + 1].firstElementChild.src;
						img.alt = sldr.children[i + 1].firstElementChild.alt;
						txt.innerHTML = sldr.children[i + 1].firstElementChild.alt;
					}
					// 'переназначаем класс
					for (let n = 0; n < sldr.children.length; n++) {
						sldr.children[n].classList.remove('slider-current');
					}
					sldr.children[i + 1].classList.add('slider-current');
				}
			}
			break;
		}
	}
	// 'проверяем натуральный размер изо, чтобы отобразить/скрыть элемент лупа
	let zoomer = lbx.querySelector('.zoomer');
	if (typeof(zoomer) !== "undefined" || zoomer !== null && (zoomer === Object(zoomer) || typeof(zoomer) === "object")) {
		if (img.naturalWidth > 300) {
			if (zoomer.style.display === "none") {zoomer.removeAttribute('style');}
		} else {zoomer.style.display = "none"}
	}
}
// (!) setImageFullScreen-создать изо.во весь экран - вывод текущего lightbox в гл.окне
function setImageFullScreen(elem) {
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось создать изо.во весь экран - переменная аргумента не определена:\n function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось создать изображение во весь экран - переменная аргумента не определена, см.консоль.`);
		return;
	} else if (!(elem.classList.contains('zoom-in') || elem.classList.contains('lightbox'))) {
		console.error(`(!) Косяк: не удалось создать изо.во весь экран - у элемента отсутствует класс, либо класс не установлен:\n function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n elem.classList.contains('zoom-in'): ${elem.classList.contains('zoom-in')} / elem.classList.contains('lightbox'): ${elem.classList.contains('lightbox')}\n elem.classList: ${elem.classList}`);
		alert(`(!) Косяк: не удалось создать изображение во весь экран - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return;
	}
	// 'elem - zoomer>zoom-in - tagName img
	// ''elem - lightbox - tagName div
	let clone = getLightboxCopy(elem); // - создать копию/клонирование DOM-элемента - узел lightbox

	console.log(`function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n elem.classList: ${elem.classList}\n---\n clone.classList: ${clone.classList}\n 1) clone: ${clone}\n 2) typeof(clone): ${typeof(clone)}\n 3) Object(clone): ${Object(clone)}\n---\n typeof(clone) === "undefined" || clone === null && (typeof(clone) === "object" || clone === Object(clone)): ${typeof(clone) === "undefined" || clone === null && (typeof(clone) === "object" || clone === Object(clone))}\n clone === null: ${clone === null}\n typeof(clone) === "undefined": ${typeof(clone) === "undefined"}\n clone === null && (typeof(clone) === "object" || clone === Object(clone)): ${clone === null && (typeof(clone) === "object" || clone === Object(clone))}\n clone === null && (typeof(clone) === "object": ${clone === null && typeof(clone) === "object"}\n clone === null && clone === Object(clone): ${clone === null && clone === Object(clone)}`); // X -

	if (typeof(clone) === "undefined" || clone === null && (clone === Object(clone) || typeof(clone) === "object")) {
		console.error(`(!) Косяк: не удалось создать изо.во весь экран - не найден элемент:\n function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n clone: typeof(${typeof(clone)}) / Object(${Object(clone)} / ${clone}`);
		alert(`(!) Косяк: не удалось создать изображение во весь экран - не найден элемент, см.консоль.`);
		return;
	}
	// *проверяем наличие DOM-элемента - узел lightbox в гл.окне
	let lbx = document.body.querySelector('.lightbox');
	console.log(`function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n 1) lbx: ${lbx}\n 2) typeof(lbx): ${typeof(lbx)}\n 3) Object(lbx): ${Object(lbx)}\n---\n 4) lbx !== null: ${lbx !== null}\n 5) typeof(lbx) !== "undefined": ${typeof(lbx) !== "undefined"}\n 6) lbx === Object(lbx): ${lbx === Object(lbx)}\n 7) typeof(lbx) === "object": ${typeof(lbx) === "object"}\n 8) lbx !== null && lbx === Object(lbx) ${lbx !== null && typeof(lbx) === "object"}\n 9) lbx !== null && typeof(lbx) === "object": ${lbx !== null && typeof(lbx) === "object"}\n---\n 10) lbx === null: ${lbx === null}\n 11) typeof(lbx) === "undefined": ${typeof(lbx) === "undefined"}\n---\n lbx !== null && (typeof(lbx) === "object" || lbx === Object(lbx)): ${lbx !== null && (typeof(lbx) === "object" || lbx === Object(lbx))}\n lbx !== null && typeof(lbx) === "object" || lbx === Object(lbx): ${lbx !== null && typeof(lbx) === "object" || lbx === Object(lbx)}`); // X -

	if (lbx !== null && (typeof(lbx) === "object" || lbx === Object(lbx))) {
		lbx.remove();
		lbx = null;
	}
	// *создаем клона lightbox в гл.окне
	document.body.prepend(clone); // - создаем DOM-элемент - узел lightbox
	lbx = document.body.querySelector('.lightbox');
	if (typeof(lbx) === "undefined" || lbx === null && (lbx === Object(lbx) || typeof(lbx) === "object")) {
		console.error(`(!) Косяк: не удалось создать изо.во весь экран - не найден элемент:\n function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n lbx.classList: ${lbx.classList}\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)})\n ${lbx}`);
		alert(`(!) Косяк: не удалось создать изображение во весь экран - не найден элемент, см.консоль.`);
		return;
	}
	setFocusLightbox(lbx, "focusIn"); // - фокусировка на lightbox
	setEventHandlersLightbox(lbx, "add"); // - создание/удаление обработчиков событий для узла lightbox
}