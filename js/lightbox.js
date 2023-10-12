// (!) lightbox_window_onReSize
function lightbox_window_onReSize(eVent) {
	// 'eVent.target - window
	// *перебираем и ищем все lightbox's и корректируем высоту каждого, даже когда окно яв-ся гл.
	let lbxList = eVent.target.document.querySelectorAll('.lightbox');
	if (lbxList.length === 0) {
		console.error(`(!) Косяк: не удалось изменить размер окна просмотра изо - не найден элемент:\n function lightbox_window_onReSize(eVent: type: ${eVent.type}, target: ${eVent.target}, name: «${eVent.target.name}»):\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)} / ${lbx}`);
		alert(`(!) Косяк: не удалось изменить размер окна просмотра изображения - не найден элемент, см.консоль.`);
		return;
	}
	lbxList.forEach(lbx => {
		if (!lbx.classList.contains('toggle-collapse')) {
			setReSizeViewerImg(lbx); // - переустановить размер элемента просмотра изо
		}
	});
}
// (!) lightbox_onMouseover
function lightbox_onMouseover(eVent) {
	if (eVent.target.tagName === "IMG") {
		if (eVent.target.classList.contains('zoom-in') || eVent.target.classList.contains('zoom-out')) {
			toggleZoomerIcon(eVent.target, eVent.type); // - переключить (+/-) иконку масштабирования
		}
	}
}
// (!) lightbox_onMouseout
function lightbox_onMouseout(eVent) {
	if (eVent.target.tagName === "IMG") {
		if (eVent.target.classList.contains('zoom-in') || eVent.target.classList.contains('zoom-out')) {
			toggleZoomerIcon(eVent.target, eVent.type); // - переключить (+/-) иконку масштабирования
		}
	}
}
// (!) lightbox_onKeydown
function lightbox_onKeydown(eVent) {
	if (eVent.key === "Escape" || eVent.code === "Escape" || eVent.keyCode === 27 || eVent.which === 27) {
		if (window === top || window.name === "") {
			setLightboxRemove(eVent.target); // - удаление DOM-элемента - узел lightbox в гл.окне
		}
		// else if (window === self || self !== top && window.name === "hmcontent") { // 'вариант проверки яв-ся ли окно фреймом: (window.frameElement && window.frameElement.nodeName === "IFRAME")
		// 	setLightboxHide(eVent.target); // скрыть окно просмотра изо - текущий lightbox
		// }
	} else if (eVent.key === "Home" || eVent.code === "Home" || eVent.keyCode === 36 || eVent.which === 36) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в lightbox
	} else if (eVent.key === "End" || eVent.code === "End" || eVent.keyCode === 35 || eVent.which === 35) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в lightbox
	} else if (eVent.key === "ArrowLeft" || eVent.code === "ArrowLeft" || eVent.keyCode === 37 || eVent.which === 37) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в lightbox
	} else if (eVent.key === "ArrowUp" || eVent.code === "ArrowUp" || eVent.keyCode === 38 || eVent.which === 38) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в lightbox
	} else if (eVent.key === "ArrowRight" || eVent.code === "ArrowRight" || eVent.keyCode === 39 || eVent.which === 39) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в lightbox
	} else if (eVent.key === "ArrowDown" || eVent.code === "ArrowDown" || eVent.keyCode === 40 || eVent.which === 40) {
		goToImage(eVent.target, eVent.code); // - переключение по изо.в lightbox
	}
	eVent.preventDefault(); // 'отменяем действия браузера по умолчанию
}
// (!) lightbox_onClick
function lightbox_onClick(eVent) {
	if (eVent.target.tagName === "A") {
		if (eVent.target.parentElement.classList.contains('btn-box')) { // (!) получаем div через.target.tagName a
			// *просмотр/пролистывание изо.в lightbox
			if (eVent.target.parentElement.classList.contains('img-btn-prev')) {
				goToImage(eVent.target.parentElement, "");
			} else if (eVent.target.parentElement.classList.contains('img-btn-next')) {
				goToImage(eVent.target.parentElement, "");
			}
		} else if (eVent.target.parentElement.classList.contains('btn-slider')) { // (!) получаем div через.target.tagName a
			// *переключение по изо.в lightbox
			if (eVent.target.parentElement.classList.contains('slider-btn-prev')) {
				goToImage(eVent.target.parentElement, "");
			} else if (eVent.target.parentElement.classList.contains('slider-btn-next')) {
				goToImage(eVent.target.parentElement, "");
			}
		}
	} else if (eVent.target.tagName === "DIV") {
		if (eVent.target.classList.contains('lightbox-btn-close')) {
			if (window === top || window.name === "") {
				setLightboxRemove(eVent.target); // - удаление DOM-элемента - узел lightbox в гл.окне
			} else if (window === self || self !== top && window.name === "hmcontent") { // 'вариант проверки яв-ся ли окно фреймом: (window.frameElement && window.frameElement.nodeName === "IFRAME")
				setLightboxHide(eVent.target); // - скрыть окно просмотра изо - текущий lightbox
			}
		}
	} else if (eVent.target.tagName === "IMG") {
		if (eVent.target.classList.contains('img-item')) {
			// *toggle image zoom
			toggleZoomerIcon(eVent.target, ""); // - переключить (+/-) иконку масштабирования
		} else if (eVent.target.classList.contains('zoom-in')) {
			if (window === top || window.name === "") { // (i) окно элемента яв-ся главным, например, при запуске отдельной страницей или через ctrl+клик из общего проекта
				// *toggle image zoom
				toggleZoomerIcon(eVent.target, ""); // - переключить (+/-) иконку масштабирования
			} else if (window === self || self !== top && window.name === "hmcontent") { // 'вариант проверки яв-ся ли окно фреймом: (window.frameElement && window.frameElement.nodeName === "IFRAME")
				// *image full screen - вывод текущего lightbox в гл.окне
				if (location.origin === "file://") { // - получаем элемент lightbox clone и передаем его в гл.окно
					alert(`(!) Не удалось осуществить image full screen - вывод текущего lightbox в гл.окне.\n (i) Нельзя передать узел/копию DOM-элемента в другое окно/фрейм, см.спецификацию.\n function lightbox_onClick(eVent.target: ${eVent.target}\n ${eVent})\n window.«${window.name}»\n location.origin: ${location.origin}`);

					let clone = getLightboxCopy(eVent.target); // - создать и получить копию/клона DOM-элемента - узел lightbox
					if (clone) { // TODO: (!)
						console.log(`I) function lightbox_onClick(eVent: ${eVent.target.tagName} / ${eVent.target.classList}):\n clone.classList: ${clone.classList}\n 1) ${clone}\n 2) typeof(clone): ${typeof(clone)}\n 3) clone === Object(clone): ${clone === Object(clone)}`); // x -
					} else {
						let lbx = getLightbox(eVent.target);
						clone = getLightboxCopy(lbx); // - создать и получить копию/клона DOM-элемента - узел lightbox

						console.log(`II) function lightbox_onClick(eVent: ${eVent.target.tagName} / ${eVent.target.classList}):\n clone = getLightboxCopy(eVent.target)\n clone.classList: ${clone.classList}\n 1) ${lbx}\n 2) typeof(lbx): typeof(lbx)\n 3) ${lbx === Object(lbx)}\n lbx.classList: ${lbx.classList}\n---\n clone: 1) ${clone}\n 2) typeof(clone): ${typeof(clone)}\n 3) clone === Object(clone): ${clone === Object(clone)}`); // x -
					}
					// (i) нельзя передать узел/копию DOM-элемента в другое окно/фрейм, см.спецификацию
					// x // let clone = getLightboxCopy(e.target);
					// clone = clone.innerHTML;
					// x // let clone = JSON.parse(JSON.stringify(getLightboxCopy(e.target))) // (i) JSON-форматированный и/или сериализованный объект
					// x let deepCopy = structuredClone(getLightboxCopy(e.target));
					// let clone = deepCopy.innerHTML;

					let msg = {
						value: "setImageFullScreen",
						clone: clone
					};
					window.top.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
				} else { // - вывод текущего lightbox в гл.окне
					let lbx = getLightboxLink(window.top); // - получить скрипт - ссылка на lightbox.js и вернуть DOM-элемент lightbox
					if (lbx === null) { // (i) если еще ни разу не было ни одного раскрытия скрытого контента на стр.
						lbx = setLightboxLink(window.top); // - создать скрипт - ссылка на lightbox.js и вернуть DOM-элемент lightbox
						if (lbx) {
							lbx.addEventListener("load", function (e) {
								window.top.setImageFullScreen(eVent.target); // - вывод текущего lightbox в гл.окне
							}, {once: true});
						}
					} else {
						window.top.setImageFullScreen(eVent.target); // - вывод текущего lightbox в гл.окне
					}
				}
			}
		} else if (eVent.target.classList.contains('zoom-out')) {
			toggleZoomerIcon(eVent.target, ""); // - переключить (+/-) иконку масштабирования
		} else if (eVent.target.parentElement.classList.contains('slider-item')) {
			// *установка на просмотр выбранного изо.из слайдера
			setImageCurrent(eVent.target); // - установить изо.текущим
		}
	}
}
// (!) lightbox_onAnimationend - удаляем css св-во "animation" по окончанию воспроизведения анимации, иначе она больше не будет воспроизводиться:
// 'slider-track - для 1-ого/последнего слайда
// ''img-viewer>.img-item: img-item-center/img-item-left/img-item-right/img-item-up/img-item-down
function lightbox_onAnimationend(eVent) {
	eVent.target.style.removeProperty('animation');
}
// (!) setEventHandlersLightbox - создание/удаление обработчиков событий для узла lightbox
function setEventHandlersLightbox(elem, addOrRemove = "") {
	// 'elem - lightbox/дочерние элементы
	// if (addOrRemove === "" && (addOrRemove !== String(addOrRemove) || typeof(addOrRemove) !== "string")) {
	if (addOrRemove !== "add" && addOrRemove !== "remove") {
		console.error(`(!) Косяк: не удалось создать/удалить обработчик события - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function setEventHandlersLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, addOrRemove: "${addOrRemove}")`);
		alert(`(!) Косяк: не удалось создать/удалить обработчик события - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return false;
	}
	let lbx;
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
		if (lbx === null) {return false;}
	} else {
		if (elem.classList.contains('lightbox')) {
			lbx = elem;
		} else {
			lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
			if (lbx === null) {return false;}
		}
	}
	// *добавляем/удаляем обработчики событий
	if (addOrRemove === "add") {
		window.addEventListener("resize", lightbox_window_onReSize);
		lbx.addEventListener("animationend", lightbox_onAnimationend);
		lbx.addEventListener("mouseover", lightbox_onMouseover);
		lbx.addEventListener("mouseout", lightbox_onMouseout);
		lbx.addEventListener("keydown", lightbox_onKeydown);
		lbx.addEventListener("click", lightbox_onClick);
	} else if (addOrRemove === "remove") {
		window.removeEventListener("resize", lightbox_window_onReSize);
		lbx.removeEventListener("animationend", lightbox_onAnimationend);
		lbx.removeEventListener("mouseover", lightbox_onMouseover);
		lbx.removeEventListener("mouseout", lightbox_onMouseout);
		lbx.removeEventListener("keydown", lightbox_onKeydown);
		lbx.removeEventListener("click", lightbox_onClick);
	}
	return true;
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
// (!) hasLightboxVisible-получить значение существования DOM-элемента - узел lightbox
function hasLightboxVisible(elem) {
	// 'elem - toggle-content
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось получить значение существования DOM-элемента - узел lightbox - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function hasLightboxVisible(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось получить значение существования DOM-элемента - узел lightbox - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return false;
	}
	for (let i = 0; i < elem.children.length; i++) {
		if (!elem.children[i].classList.contains('toggle-collapse')) {
			return true;
		}
	}
	return false;
}
// (!) getLightboxCopy - создать и получить копию/клона DOM-элемента - узел lightbox
function getLightboxCopy(elem) { // (i) нельзя передать узел/копию DOM-элемента в другое окно/фрейм, см.спецификацию
	if (typeof (elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось создать копию/клонировать элемент - узел для просмотра изо.во весь экран - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function getLightboxCopy(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось создать копию/клонировать элемент - узел для просмотра изображения во весь экран - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
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
	clone.style.removeProperty('height'); // убираем стили в элементе
	clone.querySelector('.lightbox-img').style.removeProperty('height'); // убираем стили в дочерних элементах
	// 'возвращаем иконку: zoom-in.png => zoom.png
	let imgZoom = clone.querySelector('.zoomer>img');
	if (typeof(imgZoom) !== "undefined" || imgZoom !== null && (imgZoom === Object(imgZoom) || typeof(imgZoom) === "object")) {
		// imgZoom.setAttribute('src', "icon/zoom.png");
		imgZoom.src = "icon/zoom.png";
	}
	let imgItem = clone.querySelector('.img-item');
	if (imgItem) {
		if (!imgItem.classList.contains('img-zoom100')) {
			imgItem.classList.add('img-zoom100');
		}
		// *анимируем появление/переключение по изо
		imgItem.style.setProperty('animation-name', 'img-item-center'); // или так
		// imgItem.style.animationName = "img-item-center"; // или так
		// imgItem.setAttribute('style', 'animation-name: img-item-center');
	}
	return clone;
}
// (!) setLightboxRemove - удаление DOM-элемента - узел lightbox в гл.окне
function setLightboxRemove(elem) {
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
						console.error(`(!) Косяк: не удалось закрыть окно просмотра изо.во весь экран - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function setLightboxRemove(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n document.activeElement: ${document.activeElement}\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)}) / ${lbx}\n btn: typeof(${typeof(btn)}) / Object(${Object(btn)}) / ${btn}`);
						alert(`(!) Косяк: не удалось закрыть окно просмотра изображений во весь экран - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
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
				console.error(`(!) Косяк: не удалось закрыть окно просмотра изо.во весь экран - у элемента отсутствует класс, либо класс не установлен:\n function setLightboxRemove(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n elem.classList.contains('lightbox-btn-close'): ${elem.classList.contains('lightbox-btn-close')}\n elem.classList.contains('lightbox'): ${elem.classList.contains('lightbox')}\n elem.classList: ${elem.classList}`);
				alert(`(!) Косяк: не удалось закрыть окно просмотра изображений во весь экран - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
				return;
			}
		}
	}
	// '
	lbx.remove(); // - удаляем узел lightbox
	setEventHandlersLightbox(lbx, 'remove'); // - создание/удаление обработчиков событий для узла lightbox
}
// (!) writeImageElement - создать дочерний элемент изо
function writeImageElement(elem) {
	// 'elem - div lightbox
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось создать дочерний элемент изо - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function writeImageElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось создать дочерний элемент изображения - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return null;
	} else if (elem.tagName === "DIV" && !elem.classList.contains('lightbox')) {
		console.error(`(!) Косяк: не удалось создать дочерний элемент изо - у элемента отсутствует класс, либо класс не установлен:\n function writeImageElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось создать дочерний элемент изображения - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return null;
	}
	let imgItem = null; // img img-item
	let txt = elem.querySelector('.img-text'); // div img-text
	let img = elem.querySelector('.slider-current>img'); // img slider-item
	let imgViewer = elem.querySelector('.img-viewer'); // div img-viewer
	if (txt === null || img === null || imgViewer === null) {
		console.error(`(!) Косяк: не удалось создать дочерний элемент изо - не найден элемент:\n function writeImageElement(elem: typeof(${typeof(elem)}), Object(${Object(elem)}, ${elem}):\n window.«${window.name}», location.origin: ${location.origin}\n 1) txt: typeof(${typeof(txt)}), Object(${Object(txt)}), ${txt}\n 2) img: typeof(${typeof(img)}), Object(${Object(img)}), ${img}\n 3) imgViewer: typeof(${typeof(imgViewer)}), Object(${Object(imgViewer)}), ${imgViewer}`);
		alert(`(!) Косяк: не удалось создать дочерний элемент изображения - не найден элемент, см.консоль.`);
		return null
	}
	if (imgViewer.children.length === 0) { // - img отсутствует, создаем его из слайдера
		imgViewer.insertAdjacentHTML('afterbegin', '<img class="img-item" src="' + img.src + '" alt="' + img.alt + '"style="animation-name:img-item-center";>');
		// *проверяем наличие пользовательского аттрибута « cap »
		if (img.hasAttribute('cap')) {
			txt.innerHTML = img.getAttribute('cap');
		} else {
			txt.innerHTML = img.alt;
		}
		return imgItem = elem.querySelector('.img-item');
	} return imgItem;
}
// (!) toggleZoomer - скрыть/отобразить кнопку масштабирование
function toggleZoomer(elem) {
	// 'elem - img-item - tagName img
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось скрыть/отобразить кнопку масштабирование элемента в окне просмотра изо - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function toggleZoomer(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изображения - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return;
	} else if (!elem.classList.contains('img-item')) {
		console.error(`(!) Косяк: не удалось скрыть/отобразить кнопку масштабирование элемента в окне просмотра изо - у элемента отсутствует класс, либо класс не установлен:\n function toggleZoomer(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n elem.classList.contains('img-item'): ${elem.classList.contains('img-item')}\n elem.classList: ${elem.classList}`);
		alert(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изображения - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return;
	}
	let lbx = getLightbox(elem);
	if (lbx === null || typeof(elem) === "undefined") {
		console.error(`(!) Косяк: не удалось скрыть/отобразить кнопку масштабирование элемента в окне просмотра изо - не найден элемент:\n function toggleZoomer(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)}) / ${lbx}`);
		alert(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изображения - не найден элемент, см.консоль.`);
		return;
	}
	let zoomer = lbx.querySelector('.zoomer');
	if (typeof(zoomer) === "undefined" || zoomer === null && (zoomer === Object(zoomer) || typeof(zoomer) === "object")) {
		console.error(`(!) Косяк: не удалось скрыть/отобразить кнопку масштабирование элемента в окне просмотра изо - не найден элемент:\n function toggleZoomer(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n zoomer: typeof(${typeof(zoomer)}) / Object(${Object(zoomer)}) / ${zoomer}`);
		alert(`(!) Косяк: не удалось показать/скрыть кнопку мастабирование элемента в окне просмотра изображения - не найден элемент, см.консоль.`);
		return;
	}
	if (elem.naturalWidth > 300) {
		if (zoomer.style.display === "none") {
			zoomer.removeAttribute('style');
		}
	} else {zoomer.style.display = "none"}
}
// (!) toggleZoomerIcon - переключить (+/-) иконку масштабирования
function toggleZoomerIcon(elem, typeEvent = "") {
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось переключить (+/-) иконку масштабирования - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function toggleZoomerIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}: window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось переключить (+/-) иконку масштабирования - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return;
	}
	if (typeof(typeEvent) === "undefined" || typeEvent !== String(typeEvent) || typeof(typeEvent) !== "string") {
		console.error(`(!) Косяк: не удалось переключить (+/-) иконку масштабирования - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function toggleZoomerIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}: window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось переключить (+/-) иконку масштабирования - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return;
	}
	// 'elem - tagName img:
	// '.img-item <=>.img-item.img-zoom100 фрейма hmcontent
	// ''.zoomer>.zoom-in <=>.zoom-out гл.окна
	let lbx = getLightbox(elem); // - lightbox гл.окна
	if (lbx === null || typeof(lbx) === "undefined") {return;}
	if (typeEvent !== "mouseover" && typeEvent !== "mouseout") {
		lbx.scrollIntoView(); // - переход к элементу - не путать с фокусированием
		if (!(elem.classList.contains('zoom-in') || elem.classList.contains('zoom-out'))) {
			setFocus(lbx, 'focusIn'); // - фокусировка на lightbox
		}
	}
	let imgItem = null;
	if (elem.classList.contains('img-item')) {
		imgItem = elem;
	} else if (elem.classList.contains('zoom-in') || elem.classList.contains('zoom-out')) {
		imgItem = lbx.querySelector('.img-item');
		if (typeof(imgItem) === "undefined" || imgItem === null && (imgItem === Object(imgItem) || typeof(imgItem) === "object")) {
			console.error(`(!) Косяк: не удалось переключить (+/-) иконку масштабирования - не найден элемент:\n function toggleZoomerIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n imgItem: typeof(${typeof(imgItem)}) / Object(${Object(imgItem)}) / ${imgItem}`);
			alert(`(!) Косяк: не удалось переключить (+/-) иконку масштабирования - не найден элемент, см.консоль.`);
			return;
		}
	}
	if (imgItem.naturalWidth > 300) { // - проверяем размер изо
		let zoom = lbx.querySelector('.zoomer>img');
		if (typeof(zoom) === "undefined" || zoom === null && (zoom === Object(zoom) || typeof(zoom) === "object")) {
			console.error(`(!) Косяк: не удалось переключить (+/-) иконку масштабирования - не найден элемент:\n function toggleZoomerIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n zoom: typeof(${typeof(zoom)}) / Object(${Object(zoom)}) / ${zoom}`);
			alert(`(!) Косяк: не удалось переключить (+/-) иконку масштабирования - не найден элемент, см.консоль.`);
			return;
		}
		if (window === top || window.name === "") {
			if (typeEvent === "mouseover") { // - меняется только иконка
				if (zoom.classList.contains('zoom-in')) {
					// zoom.setAttribute('src', 'icon/zoom-in.png'); // или так
					zoom.src = "icon/zoom-in.png";
				} else if (zoom.classList.contains('zoom-out')) {
					// zoom.setAttribute('src', 'icon/zoom-out.png'); // или так
					zoom.src = "icon/zoom-out.png";
				}
			} else if (typeEvent === "mouseout") { // - меняется только иконка
				// zoom.setAttribute('src', 'icon/zoom.png'); // или так
				zoom.src = "icon/zoom.png";
			} else { // - меняется и правило, и иконка
				// tmp: (?) как различить 2 случая, когда окно яв-ся гл.
				// 'Косяк наблюдается, если открыть стр.в отд.вкладке или отд.окном, по ск-ку css правило img-zoom100 для lightbox в гл.окне работает противоположно правилу img-zoom100 для lightbox в теме топика
				imgItem.classList.toggle('img-zoom100');
				if (imgItem.classList.contains('img-zoom100')) {
					zoom.classList.remove('zoom-out');
					zoom.classList.add('zoom-in');
					if (elem.classList.contains('zoom-in') || elem.classList.contains('zoom-out')) {
						// zoom.setAttribute('src', 'icon/zoom-in.png'); // или так
						zoom.src = "icon/zoom-in.png";
					}
				} else {
					zoom.classList.remove('zoom-in');
					zoom.classList.add('zoom-out');
					if (elem.classList.contains('zoom-in') || elem.classList.contains('zoom-out')) {
						// zoom.setAttribute('src', 'icon/zoom-out.png'); // или так
						zoom.src = "icon/zoom-out.png";
					}
				}
			}
		} else if (window === self || self !== top && window.name === "hmcontent") { // 'вариант проверки яв-ся ли окно фреймом: (window.frameElement && window.frameElement.nodeName === "IFRAME")
			if (typeEvent === "mouseover") { // - меняется только иконка
				// zoom.setAttribute('src', 'icon/zoom-in.png'); // или так
				zoom.src = "icon/zoom-in.png";
			} else if (typeEvent === "mouseout") { // - меняется только иконка
				// zoom.setAttribute('src', 'icon/zoom.png'); // или так
				zoom.src = "icon/zoom.png";
			} else { // - меняется только правило
				// (!) css правило img-zoom100 для lightbox в гл.окне работает противоположно правилу img-zoom100 для lightbox в теме топика
				imgItem.classList.toggle('img-zoom100');
				if (imgItem.classList.contains('img-zoom100')) {
					zoom.classList.remove('zoom-out');
					zoom.classList.add('zoom-in');
				} else {
					zoom.classList.remove('zoom-out');
					zoom.classList.add('zoom-in');
				}
			}
		}
	}
}
// (!) setCursorIcon - установить значок курсора
function setCursorIcon(elem) {
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось установить значок изображения курсора - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function setCursorIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось установить значок изображения курсора - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
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
// (!) setToggleIcon-переключатель иконки в текущем абзаце для скрытого контента в теме топика
function setToggleIcon(elem, btnValue = null) {
	// 'elem - tagName img
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк - не удалось выполнить изменение иконки - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function setToggleIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnValue = ${btnValue})`);
		alert(`(!) Косяк - не удалось выполнить изменение иконки - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
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
			console.error(`(!) Косяк - не удалось выполнить изменение иконки - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function setToggleIcon(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnValue = ${btnValue})`);
			alert(`(!) Косяк - не удалось выполнить изменение иконки - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
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
// (!) toggleInlineElement - переключить встроенный элемент
function toggleInlineElement(elem) {
	// 'elem - inline-toggle.toggle-hidden/toggle-shown - tagName a
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось переключить встроенный элемент - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function toggleInlineElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось переключить встроенный элемент - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
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
// (!) setReSizeViewerImg - переустановить размер элемента просмотра изо
function setReSizeViewerImg(elem) {
	// 'elem - tagName div lightbox
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось переустановить размер элемента просмотра изо - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function setReSizeViewerImg(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n window.«${window.name}», location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось переустановить размер элемента просмотра изображения - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return;
	} else if (elem.tagName === "DIV" && !elem.classList.contains('lightbox')) {
		console.error(`(!) Косяк: не удалось переустановить размер элемента просмотра изо - у элемента отсутствует класс, либо класс не установлен:\n function setReSizeViewerImg(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n window.«${window.name}», location.origin: ${location.origin}:\n elem.tagName: ${elem.tagName}\n elem.classList.contains('lightbox'): ${elem.classList} = ${elem.classList.contains('lightbox')}`);
		alert(`(!) Косяк: не удалось переустановить размер элемента просмотра изображения - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return;
	}
	let lbxImg = elem.querySelector('.lightbox-img');
	let txt = elem.querySelector('.img-text');
	let sldr = elem.querySelector('.img-slider');
	if (lbxImg === null || txt === null) {
		console.error(`(!) Косяк: не удалось переустановить размер элемента просмотра изо - не найден элемент:\n function setReSizeViewerImg(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}):\n window.«${window.name}», location.origin: ${location.origin}:\n 1) lbxImg: typeof(${typeof(lbxImg)}) / Object(${Object(lbxImg)}) / ${lbxImg}, lbxImg.classList: ${lbxImg.classList}\n 2) txt: typeof(${typeof(txt)}) / Object(${Object(txt)}) / ${txt}, txt.classList: ${txt.classList}`);
		alert(`(!) Косяк: не удалось переустановить размер элемента просмотра изображения - не найден элемент, см.консоль.`);
		return;
	}
	// *определяем высоту lightbox
	let lbxHeight = null;
	// *отталкиваемся от высоты видимой части контента, т.е.высота lightbox = высоте idTopicBody.clientHeight - видимая часть контента на стр.
	let idTpCnt = document.getElementById('idTopicBody');
	if (idTpCnt === null) { // - копия lightbox создана в глобальном окне, а не открыта отд.окном
		lbxHeight = getValueFullSizeProperty(elem).height; // - получить полноразмерное значение св-ва
	} else { // - lightbox во фрейме или стр.открыта отд.окном
		lbxHeight = getValueFullSizeProperty(idTpCnt).height; // - получить полноразмерное значение св-ва
	}
	// *минусуем padding lightbox
	// (i) не понятно почему не хочет воспринимать строку сразу с присвоением элементу значение стиля - ему как буд-то бы мешает: « + "px"» ???
	lbxHeight = lbxHeight - (parseInt(getComputedStyle(elem, null).paddingTop, 10) + parseInt (getComputedStyle(elem, null).paddingBottom, 10));
	elem.style.height = lbxHeight + "px";
	// *определяем высоту у остальных элементов с учетом margin, padding, border, кот.не будут учитываться, т.к.box-sizing для.lightbox-img изменяет алгоритм расчета ширины и высоты элемента
	let txtHeight = getValueFullSizeProperty(txt).height; // - получить полноразмерное значение св-ва
	// *если изо.одиночное, чтобы вместо узла DOM элемента не получить « NAN »
	if (sldr === null) {
		lbxImg.style.height = lbxHeight - txtHeight + "px";
	} else {
		let sldrHeight = getValueFullSizeProperty(sldr).height; // - получить полноразмерное значение св-ва
		lbxImg.style.height = lbxHeight - (txtHeight + sldrHeight) + "px";
	}
}
// (!) toggleDropdownElement - переключить выпадающий элемент
function toggleDropdownElement(elem) {
	// 'elem - tagName a: dropdown-toggle.toggle-hidden/.toggle-shown
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось переключить выпадающий скрытый контент - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function toggleDropdownElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк: не удалось переключить выпадающий скрытый контент - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
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
								imgItem = writeImageElement(lbx); // - создать дочерний элемент изо.в текущем lightbox
							} else {
								// *анимируем появление/переключение по изо
								imgItem.style.setProperty('animation-name', 'img-item-center'); // или так
								// imgItem.style.animationName = "img-item-center"; // или так
								// imgItem.setAttribute('style', 'animation-name: img-item-center');
							}
							toggleZoomer(imgItem); // - скрыть/отобразить кнопку масштабирование
							setCursorIcon(imgItem); // - установить значок курсора
							lbx.classList.remove('toggle-collapse'); // - отображаем lightbox
							tgl.classList.remove('toggle-collapse'); // - отображаем div toggle-content
							setReSizeViewerImg(lbx); // - переустановить размер элемента просмотра изо
							setFocus(lbx, 'focusIn'); // - фокусировка на lightbox
							setEventHandlersLightbox(lbx, 'add'); // - создание/удаление обработчиков событий для узла lightbox
						} else {
							setFocus(lbx, 'focusOut'); // - фокусировка на lightbox
							lbx.classList.add('toggle-collapse'); // - скрываем lightbox
							setEventHandlersLightbox(lbx, 'remove'); // - создание/удаление обработчиков событий для узла lightbox
							// *проверяем видимость др.lightbox's, кот.вложенны в toggle-content для текущего абзаца, если есть хотя бы 1 раскрытый lightbox, toggle-content остается видимым
							if (hasLightboxVisible(tgl)) {
								tgl.classList.remove('toggle-collapse'); // - отображаем div toggle-content
							} else {
								tgl.classList.add('toggle-collapse'); // - скрываем div toggle-content
							}
						} break;
					}
				} else { // - одиночное изо
					if (lbx.classList.contains('toggle-collapse')) { // - отображаем
						// (i) для tagName a, чтобы сработал scrollIntoView() надо использовать отмену действия браузером по умолчанию - preventDefault(), см.событие keydown в lightbox, с использованием св-ва tabIndex = "0" элементов, не имеющих автофокусировку
						elem.scrollIntoView(); // - переход к элементу - не путать с фокусированием
						// elem.preventDefault(); // 'отменяем действия браузера по умолчанию
						toggleZoomer(imgItem); // - скрыть/отобразить кнопку масштабирование
						setCursorIcon(imgItem); // - установить значок курсора
						lbx.classList.remove('toggle-collapse');
						tgl.classList.remove('toggle-collapse');
						setReSizeViewerImg(lbx); // - переустановить размер элемента просмотра изо
						setFocus(lbx, 'focusIn'); // - фокусировка на lightbox
						setEventHandlersLightbox(lbx, 'add'); // - создание/удаление обработчиков событий для узла lightbox
						// *анимируем появление/переключение по изо
						imgItem.style.setProperty('animation-name', 'img-item-center'); // или так
						// imgItem.style.animationName = "img-item-center"; // или так
						// imgItem.setAttribute('style', 'animation-name: img-item-center');
					} else { // - скрываем
						setFocus(lbx, 'focusOut'); // - фокусировка на lightbox
						lbx.classList.add('toggle-collapse');
						tgl.classList.add('toggle-collapse');
						setEventHandlersLightbox(lbx, 'remove'); // - создание/удаление обработчиков событий для узла lightbox
					}
				}
			}
		}
	}
}
// (!) setToggleElement - установить элемент переключения скрытого контента - развернуть/свернуть скрытый контент
function setToggleElement(elem = null, btnChecked = null) {
	// 'elem - tagName a
	// ''elem - tagName img
	// '''elem - tagName input (checkbox)
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) { // *работаем по всем элементам на стр.
		if (btnChecked === null || typeof(btnChecked) !== "boolean" || btnChecked !== Boolean(btnChecked)) {
			console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked})`);
			alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
			return;
		}
		let elems; // 'toggle-content - tagName: div/span; lightbox's - tagName div; dropdown-toggle/inline-toggle - tagName a; toggle-icon - tagName img
		if (btnChecked) { // - отображаем
			elems = document.getElementById('idTopicBody').querySelectorAll('.toggle-content');
			if (elems.length < 1) {
				console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elems: typeof(${typeof(elems)}) / Object(${Object(elems)}) / ${elems}`);
				alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
			} else { // 'toggle-content: div/span
				elems.forEach(tgl => {
					tgl.classList.remove('toggle-collapse'); // - div/span
					if (tgl.tagName === "DIV") {
						let el = tgl.querySelectorAll('.lightbox'); // - NodeList lightbox's
						if (el.lengh < 1) {
							console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n el: typeof(${typeof(el)}) / Object(${Object(el)} / ${el})`);
							alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
						} else { // if (el instanceof(NodeList) || el.length > 0) {}
							el.forEach(lbx => {
								let imgItem = lbx.querySelector('.img-item');
								// 'проверяем существование (existence) элемента img для просмотра изображений
								if (typeof(imgItem) === "undefined" || imgItem === null && (imgItem === Object(imgItem) || typeof(imgItem) === "object")) {
									imgItem = writeImageElement(lbx); // - создать дочерний элемент изо
									setEventHandlersLightbox(lbx, 'add'); // - создание/удаление обработчиков событий для узла lightbox
								} else {
									// *анимируем появление/переключение по изо
									imgItem.style.setProperty('animation-name', 'img-item-center'); // или так
									// imgItem.style.animationName = "img-item-center"; // или так
									// imgItem.setAttribute('style', 'animation-name: img-item-center');
								}
								toggleZoomer(imgItem); // - скрыть/отобразить кнопку масштабирование
								setCursorIcon(imgItem); // - установить значок курсора
								lbx.classList.remove('toggle-collapse');
								setReSizeViewerImg(lbx); // - переустановить размер элемента просмотра изо
							});
						}
					}
				});
			}
			// 'link's - tagName a: dropdown-toggle/inline-toggle
			elems = document.getElementById('idTopicBody').querySelectorAll('.toggle-hidden');
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
			elems = document.getElementById('idTopicBody').querySelectorAll('.lightbox');
			if (elems.length < 1) {
				console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elems: typeof(${typeof(elems)}) / Object(${Object(elems)}) / ${elems}`);
				alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
			} else {
				elems.forEach(lbx => {
					lbx.classList.add('toggle-collapse');
					setEventHandlersLightbox(lbx, 'remove'); // - создание/удаление обработчиков событий для узла lightbox
				});
			}
			// 'toggle-content - tagName: div/span
			elems = document.getElementById('idTopicBody').querySelectorAll('.toggle-content');
			if (elems.length < 1) {
				console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elems: typeof(${typeof(elems)}) / Object(${Object(elems)}) / ${elems}`);
				alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
			} else {
				elems.forEach(tgl => {
					tgl.classList.add('toggle-collapse');
				});
			}
			// 'link's - tagName a: dropdown-toggle/inline-toggle
			elems = document.getElementById('idTopicBody').querySelectorAll('.toggle-shown');
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
		// 'icon's - tagName img: toggle-icon
		elems = document.getElementById('idTopicBody').querySelectorAll('.toggle-icon');
		if (elems.length < 1) {
			console.error(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elems: typeof(${typeof(elems)}) / Object(${Object(elems)}) / ${elems}`);
			alert(`(!) Косяк: не удалось выполнить переключение элементов скрытого контента - не найден элемент, см.консоль.`);
		} else {
			elems.forEach(icon => {
				setToggleIcon(icon, btnChecked); // - переключатель иконки в текущем абзаце для скрытого контента в теме топика
			});
		}
	} else { // *работаем с текущим элементом - на кот.кликнули
		if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
			console.error(`(!) Косяк: не удалось выполнить переключение элемента(-ов) скрытого контента - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked})`);
			alert(`(!) Косяк: не удалось выполнить переключение элемента(-ов) скрытого контента - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
			return;
		} else if (!(elem.classList.contains('toggle-hidden') || elem.classList.contains('toggle-shown'))) {
			console.error(`(!) Косяк: не удалось выполнить переключение элемента(-ов) скрытого контента - у элемента отсутствует класс, либо класс не установлен:\n function setToggleElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, btnChecked: ${btnChecked}):\n elem.classList.contains('toggle-hidden'): ${elem.classList.contains('toggle-hidden')}\n elem.classList.contains('toggle-shown'): ${elem.classList.contains('toggle-shown')}\n elem.classList: ${elem.classList}`);
			alert(`(!) Косяк: не удалось выполнить переключение элемента(-ов) скрытого контента - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
			return;
		}
		// 'elem - tagName a
		if (elem.classList.contains('inline-toggle')) { // - встроенный переключатель
			toggleInlineElement(elem); // - переключить встроенный элемент
		} else if (elem.classList.contains('dropdown-toggle')) { // - выпадающий переключатель
			toggleDropdownElement(elem); // - переключить выпадающий элемент
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
// (!) setImageCurrent - установить изо.текущим
function setImageCurrent(elem) {
	// 'elem - tagName img:.slider-item <=>.slider-item.slider-current
	let lbx;
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
		if (lbx === null) { return };
	} else {
		if (elem.classList.contains('lightbox')) {
			lbx = elem;
		} else {
			lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
			if (lbx === null) { return };
		}
	}
	lbx.scrollIntoView(); // - переход к элементу - не путать с фокусированием
	setFocus(lbx, 'focusIn'); // - фокусировка на lightbox
	let img = lbx.querySelector('.img-item'); // img-viewer>img - это slider-current в слайдере lightbox
	let txt = lbx.querySelector('.img-text');
	let sldr = lbx.querySelector('.slider-current');

	if (txt === null || img === null || sldr === null) {
		// x if (typeof(sldr) === "undefined" || sldr === null && (sldr === Object(sldr) || typeof(sldr) === "object")) {
		console.error(`(!) Косяк: не удалось установить изо.текущим - не найден элемент:\n function setImageCurrent(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n img: typeof(${typeof(img)}) / Object(${Object(img)}) / ${img}\n txt: typeof(${typeof(txt)}) / Object(${Object(txt)}) / ${txt}\n sldr: typeof(${typeof(sldr)}) / Object(${Object(sldr)}) / ${sldr}`);
		alert(`(!) Косяк: не удалось установить изображение текущим - не найден элемент, см.консоль.`);
		return;
	}
	// '
	if (img.src !== elem.src) {
		img.src = elem.src;
		img.alt = elem.alt;
		// *проверяем наличие аттрибута « cap »
		txt.innerHTML = "";
		if (elem.hasAttribute('cap')) {
			txt.innerHTML = elem.getAttribute('cap');
		} else {
			txt.innerHTML = elem.alt;
		}
		sldr.classList.remove('slider-current');
		elem.parentElement.classList.add('slider-current');
	}
	setReSizeViewerImg(lbx); // - переустановить размер элемента просмотра изо
	// *анимируем появление/переключение по изо
	img.style.setProperty('animation-name', 'img-item-center'); // или так
	// img.style.animationName = "img-item-center"; // или так
	// img.setAttribute('style', 'animation-name: img-item-center');
	setCursorIcon(img); // - установить значок курсора
	// 'проверяем натуральный размер изо, чтобы отобразить/скрыть элемент зумер
	let zoomer = lbx.querySelector('.zoomer');
	if (typeof(zoomer) !== "undefined" || zoomer !== null && (zoomer === Object(zoomer) || typeof(zoomer) === "object")) {
		if (elem.naturalWidth > 300) {
			if (zoomer.style.display === "none") {zoomer.removeAttribute('style');}
		} else {zoomer.style.display = "none"}
	}
}
// (!) goToImage-переключение по изо.в lightbox
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
		if (lbx === null) { return; }
	} else {
		if (elem.classList.contains('lightbox')) {
			lbx = elem;
		} else {
			lbx = getLightbox(elem); // - получить DOM-элемент - узел lightbox
			if (lbx === null) { return; }
		}
	}
	if (typeof(keyEvent) === "undefined" || keyEvent !== String(keyEvent) || typeof(keyEvent) !== "string") { // - может оставаться пустой строкой
		console.error(`(!) Косяк: не удалось осуществить переключение на другое изо - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function goToImage(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, keyEvent: "${keyEvent}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось осуществить переключение на другое изображение - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return;
	}
	// (i) для tagName a, чтобы сработал scrollIntoView() надо использовать отмену действия браузером по умолчанию - preventDefault(), см.событие keydown в lightbox, с использованием св-ва tabIndex = "0" элементов, не имеющих автофокусировку
	lbx.scrollIntoView(); // - переход к элементу - не путать с фокусированием
	setFocus(lbx, 'focusIn'); // - фокусировка на lightbox
	let img = lbx.querySelector('.img-item'); // - img-viewer>img - это slider-current в слайдере lightbox
	let txt = lbx.querySelector('.img-text');
	let sldr = lbx.querySelector('.slider-track');
	if (sldr === null) return; // - одиночное изо
	if (txt === null || img === null) {
		console.error(`(!) Косяк: не удалось совершить переключение на др.изо - не найден элемент:\n function goToImage(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, keyEvent: "${keyEvent}"): window."${window.name}", location.origin: ${location.origin}:\n img: typeof(${typeof(img)}) / Object(${Object(img)}) / ${img}\n txt: typeof(${typeof(txt)}) / Object(${Object(txt)}) / ${txt}`);
		alert(`(!) Косяк: не удалось совершить переключение на другое изображение - не найден элемент, см.консоль.`);
		return;
	}
	// *в slider-track перебираем slider-item ищем slider-current и переназначаем его в зависимости от условия перехода
	for (let i = 0; i < sldr.children.length; i++) {
		if (sldr.children[i].classList.contains('slider-current')) {
			if (keyEvent === "Home") {
				if (i === 0) { // - изо.первое
					animationOffset(sldr); // - анимационное смещение
					return;
				} else { // - изо.последнее или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[0].firstElementChild.src) {
						img.src = sldr.children[0].firstElementChild.src;
						img.alt = sldr.children[0].firstElementChild.alt;
						// *проверяем наличие пользовательского аттрибута « cap »
						txt.innerHTML = "";
						if (sldr.children[0].firstElementChild.hasAttribute('cap')) {
							txt.innerHTML = sldr.children[0].firstElementChild.getAttribute('cap');
						} else {
							txt.innerHTML = sldr.children[0].firstElementChild.alt;
						}
						// 'переназначаем класс
						sldr.children[i].classList.remove('slider-current');
						sldr.children[0].classList.add('slider-current');
					}
				}
			} else if (keyEvent === "End") {
				if (i === sldr.children.length - 1) { // - изо.последнее
					animationOffset(sldr); // - анимационное смещение
					return;
				} else { // - изо.первое или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[sldr.children.length - 1].firstElementChild.src) {
						img.src = sldr.children[sldr.children.length - 1].firstElementChild.src;
						img.alt = sldr.children[sldr.children.length - 1].firstElementChild.alt;
						// *проверяем наличие пользовательского аттрибута « cap »
						txt.innerHTML = "";
						if (sldr.children[sldr.children.length - 1].firstElementChild.hasAttribute('cap')) {
							txt.innerHTML = sldr.children[sldr.children.length - 1].firstElementChild.getAttribute('cap');
						} else {
							txt.innerHTML = sldr.children[sldr.children.length - 1].firstElementChild.alt;
						}
						// 'переназначаем класс
						sldr.children[i].classList.remove('slider-current');
						sldr.children[sldr.children.length - 1].classList.add('slider-current');
					}
				}
			} else if (elem.classList.contains('img-btn-prev') || keyEvent === "ArrowUp") {
				if (i === 0) { // - изо.первое
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[sldr.children.length - 1].firstElementChild.src) {
						img.src = sldr.children[sldr.children.length - 1].firstElementChild.src;
						img.alt = sldr.children[sldr.children.length - 1].firstElementChild.alt;
						// *проверяем наличие пользовательского аттрибута « cap »
						txt.innerHTML = "";
						if (sldr.children[sldr.children.length - 1].firstElementChild.hasAttribute('cap')) {
							txt.innerHTML = sldr.children[sldr.children.length - 1].firstElementChild.getAttribute('cap');
						} else {
							txt.innerHTML = sldr.children[sldr.children.length - 1].firstElementChild.alt;
						}
						// 'переназначаем класс
						sldr.children[i].classList.remove('slider-current');
						sldr.children[sldr.children.length - 1].classList.add('slider-current');
					}
				} else { // - изо.последнее или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[i - 1].firstElementChild.src) {
						img.src = sldr.children[i - 1].firstElementChild.src;
						img.alt = sldr.children[i - 1].firstElementChild.alt;
						// *проверяем наличие пользовательского аттрибута « cap »
						txt.innerHTML = "";
						if (sldr.children[i - 1].firstElementChild.hasAttribute('cap')) {
							txt.innerHTML = sldr.children[i - 1].firstElementChild.getAttribute('cap');
						} else {
							txt.innerHTML = sldr.children[i - 1].firstElementChild.alt;
						}
						// 'переназначаем класс
						sldr.children[i].classList.remove('slider-current');
						sldr.children[i - 1].classList.add('slider-current');
					}
				}
			} else if (elem.classList.contains('slider-btn-prev') || keyEvent === "ArrowLeft") {
				if (i === 0) { // - изо.первое
					animationOffset(sldr); // - анимационное смещение
					return;
				} else { // - изо.последнее или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[i - 1].firstElementChild.src) {
						img.src = sldr.children[i - 1].firstElementChild.src;
						img.alt = sldr.children[i - 1].firstElementChild.alt;
						// *проверяем наличие пользовательского аттрибута « cap »
						txt.innerHTML = "";
						if (sldr.children[i - 1].firstElementChild.hasAttribute('cap')) {
							txt.innerHTML = sldr.children[i - 1].firstElementChild.getAttribute('cap');
						} else {
							txt.innerHTML = sldr.children[i - 1].firstElementChild.alt;
						}
						// 'переназначаем класс
						sldr.children[i].classList.remove('slider-current');
						sldr.children[i - 1].classList.add('slider-current');
					}
				}
			} else if (elem.classList.contains('img-btn-next') || keyEvent === "ArrowDown") {
				if (i === sldr.children.length - 1) { // - изо.последнее
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[0].firstElementChild.src) {
						img.src = sldr.children[0].firstElementChild.src;
						img.alt = sldr.children[0].firstElementChild.alt;
						// *проверяем наличие пользовательского аттрибута « cap »
						txt.innerHTML = "";
						if (sldr.children[0].firstElementChild.hasAttribute('cap')) {
							txt.innerHTML = sldr.children[0].firstElementChild.getAttribute('cap');
						} else {
							txt.innerHTML = sldr.children[0].firstElementChild.alt;
						}
					}
					// 'переназначаем класс
					sldr.children[i].classList.remove('slider-current');
					sldr.children[0].classList.add('slider-current');
				} else { // - изо.первое или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[i + 1].firstElementChild.src) {
						img.src = sldr.children[i + 1].firstElementChild.src;
						img.alt = sldr.children[i + 1].firstElementChild.alt;
						// *проверяем наличие пользовательского аттрибута « cap »
						txt.innerHTML = "";
						if (sldr.children[i + 1].firstElementChild.hasAttribute('cap')) {
							txt.innerHTML = sldr.children[i + 1].firstElementChild.getAttribute('cap')
						} else {
							txt.innerHTML = sldr.children[i + 1].firstElementChild.alt;
						}
					}
					// 'переназначаем класс
					sldr.children[i].classList.remove('slider-current');
					sldr.children[i + 1].classList.add('slider-current');
				}
			} else if (elem.classList.contains('slider-btn-next') || keyEvent === "ArrowRight") {
				if (i === sldr.children.length - 1) { // - изо.последнее
					animationOffset(sldr); // - анимационное смещение
					return;
				} else { // - изо.первое или промежуточное
					// 'меняем изо.в окне просмотра
					if (img.src !== sldr.children[i + 1].firstElementChild.src) {
						img.src = sldr.children[i + 1].firstElementChild.src;
						img.alt = sldr.children[i + 1].firstElementChild.alt;
						// *проверяем наличие пользовательского аттрибута « cap »
						txt.innerHTML = "";
						if (sldr.children[i + 1].firstElementChild.hasAttribute('cap')) {
							txt.innerHTML = sldr.children[i + 1].firstElementChild.getAttribute('cap');
						} else {
							txt.innerHTML = sldr.children[i + 1].firstElementChild.alt;
						}
					}
					// 'переназначаем класс
					sldr.children[i].classList.remove('slider-current');
					sldr.children[i + 1].classList.add('slider-current');
				}
			}
			setReSizeViewerImg(lbx); // - переустановить размер элемента просмотра изо
			break;
		}
	}
	// *анимируем появление/переключение по изо
	if (elem.classList.contains('img-btn-prev') || elem.classList.contains('slider-btn-prev') || keyEvent === "ArrowLeft" || keyEvent === "Home") {
		img.style.setProperty('animation-name', 'img-item-right'); // или так
		// img.style.animationName = "img-item-right"; // или так
		// img.setAttribute('style', 'animation: img-item-right');
	} else if (elem.classList.contains('img-btn-next') || elem.classList.contains('slider-btn-next') || keyEvent === "ArrowRight" || keyEvent === "End") {
		img.style.setProperty('animation-name', 'img-item-left'); // или так
		// img.style.animationName = "img-item-left"; // или так
		// img.setAttribute('style', 'animation: img-item-left');
	} else {
		if (keyEvent === "ArrowUp") {
		img.style.setProperty('animation-name', 'img-item-up'); // или так
		// img.style.animationName = "img-item-up"; // или так
		// img.setAttribute('style', 'animation: img-item-up');
		} else if (keyEvent === "ArrowDown") {
			img.style.setProperty('animation-name', 'img-item-down'); // или так
			// img.style.animationName = "img-item-down"; // или так
			// img.setAttribute('style', 'animation: img-item-down');
		}
	}
	setCursorIcon(img); // - установить значок курсора
	// 'проверяем натуральный размер изо, чтобы отобразить/скрыть элемент зумер
	let zoomer = lbx.querySelector('.zoomer');
	if (typeof(zoomer) !== "undefined" || zoomer !== null && (zoomer === Object(zoomer) || typeof(zoomer) === "object")) {
		if (img.naturalWidth > 300) {
			if (zoomer.style.display === "none") {zoomer.removeAttribute('style');}
		} else {zoomer.style.display = "none"}
	}
}
// (!) setImageFullScreen - создать изо.во весь экран - вывод текущего lightbox в гл.окне
function setImageFullScreen(elem) {
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось создать изо.во весь экран - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось создать изображение во весь экран - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return;
	} else if (!(elem.classList.contains('zoom-in') || elem.classList.contains('lightbox'))) {
		console.error(`(!) Косяк: не удалось создать изо.во весь экран - у элемента отсутствует класс, либо класс не установлен:\n function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n elem.classList.contains('zoom-in'): ${elem.classList.contains('zoom-in')} / elem.classList.contains('lightbox'): ${elem.classList.contains('lightbox')}\n elem.classList: ${elem.classList}`);
		alert(`(!) Косяк: не удалось создать изображение во весь экран - у элемента отсутствует класс, либо класс не установлен, см.консоль.`);
		return;
	}
	// 'elem - zoomer>zoom-in - tagName img
	// ''elem - lightbox - tagName div
	let clone = getLightboxCopy(elem); // - создать и получить копию/клона DOM-элемента - узел lightbox
	if (typeof(clone) === "undefined" || clone === null && (clone === Object(clone) || typeof(clone) === "object")) {
		console.error(`(!) Косяк: не удалось создать изо.во весь экран - не найден элемент:\n function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n clone: typeof(${typeof(clone)}) / Object(${Object(clone)} / ${clone}`);
		alert(`(!) Косяк: не удалось создать изображение во весь экран - не найден элемент, см.консоль.`);
		return;
	}
	// *проверяем существование (existence) DOM-элемента - узел lightbox в гл.окне
	let lbx = window.top.document.body.querySelector('.lightbox');
		if (lbx !== null && (lbx === Object(lbx) || typeof(lbx) === "object")) { // x typeof(lbx) === "undefined"
		lbx.remove();
		lbx = null;
	}
	// *создаем клона lightbox в гл.окне и фокусируемся на нем
	window.top.document.body.prepend(clone); // - создаем DOM-элемент - узел lightbox
	setEventHandlersLightbox(clone, 'add'); // - создание/удаление обработчиков событий для узла lightbox
	setReSizeViewerImg(clone); // - переустановить размер элемента просмотра изо
	setFocus(clone, 'focusIn'); // - фокусировка на lightbox
	// (?)'странно, что срабатывает возможность фокусировки для клона, а не для созданного DOM-элемента
	// x // lbx = window.top.document.body.querySelector('.lightbox');
	// if (typeof(lbx) === "undefined" || lbx === null && (lbx === Object(lbx) || typeof(lbx) === "object")) {
	// 	console.error(`(!) Косяк: не удалось создать изо.во весь экран - не найден элемент:\n function setImageFullScreen(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n lbx.classList: ${lbx.classList}\n lbx: typeof(${typeof(lbx)}) / Object(${Object(lbx)})\n ${lbx}`);
	// 	alert(`(!) Косяк: не удалось создать изображение во весь экран - не найден элемент, см.консоль.`);
	// 	return;
	// }
	// setEventHandlersLightbox(clone, 'add'); // - создание/удаление обработчиков событий для узла lightbox
	// setFocus(clone, 'focusIn'); // - фокусировка на lightbox
}
// (!) setLightboxHide-скрыть окно просмотра изо - текущий lightbox
function setLightboxHide(elem) {
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк: не удалось закрыть окно просмотра изо - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки:\n setLightboxHide(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin})`);
		alert(`(!) Косяк: не удалось закрыть окно просмотра изображений - переменная аргумента не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return;
	}
	// 'elem - lightbox-btn-close
	let lbx = null;
	let tgl = elem;
	while (!tgl.classList.contains('toggle-content')) {
		tgl = tgl.parentElement;
		if (tgl.tagName === "BODY" || tgl.id === "idContentText") {
			console.error(`(!) Косяк: не удалось закрыть окно просмотра изо - не найден элемент:\n setLightboxHide(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}):\n tgl: 1) ${tgl}\n 2) typeof(tgl): ${typeof(tgl)}\n 3) Object(tgl): ${Object(tgl)}`);
			alert(`(!) Косяк: не удалось закрыть окно просмотра изображений - не найден элемент, см.консоль.`);
			return;
		} else if (tgl.classList.contains('lightbox')) {
			lbx = tgl;
			tgl.classList.add('toggle-collapse');
		}
	}
	if (lbx.hasAttribute('num')) {
		// *в tagName p перебираем tagName a, сверяея аттрибут "num" с аттрибутом элемента lightbox
		let el = tgl.previousElementSibling.querySelectorAll('.toggle-shown');
		if (typeof(el) !== "undefined" || el !== null && (el === Object(el) || typeof(el) === "object")) {
			for (let lnk of el) {
				if (lnk.hasAttribute("num")) {
					if (+lnk.getAttribute('num') === +lbx.getAttribute('num')) {
						lnk.classList.remove('toggle-shown');
						lnk.classList.add('toggle-hidden');
						break;
					}
				}
			}
		}
	} else { // - одиночное изо
		let lnk = tgl.previousElementSibling.querySelector('.toggle-shown');
		if (typeof(lnk) !== "undefined" || lnk !== null || (lnk === Object(lnk) || typeof(lnk) === "object")) {
			lnk.classList.remove('toggle-shown');
			lnk.classList.add('toggle-hidden');
		}
	}
	// *проверяем видимость др.lightbox's, кот.вложенны в toggle-content для текущего абзаца, если есть хотя бы 1 раскрытый lightbox, toggle-content остается видимым
	if (hasLightboxVisible(tgl)) {
		tgl.classList.remove('toggle-collapse'); // - отображаем div toggle-content
		setFocus(lbx, 'focusIn'); // - фокусировка на lightbox
	} else {
		tgl.classList.add('toggle-collapse'); // - скрываем div toggle-content
		setEventHandlersLightbox(lbx, 'remove'); // - создание/удаление обработчиков событий для узла lightbox
		setFocus(lbx, 'focusOut'); // - фокусировка на lightbox
	}
	// *проверяем существование (existence) элемента img - иконка в абзаце
	let icon = tgl.previousElementSibling.querySelector('.toggle-icon');
	if (icon !== null && icon === Object(icon)) setToggleIcon(icon); // - меняем иконку, если она есть
}