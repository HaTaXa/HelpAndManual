// (i) Инициализация переменных
const banner = document.getElementById('idBanner');
const toolbarPane = document.getElementById('idToolbar');
const navPane = document.getElementById('idNavPane');
const topicPane = document.getElementById('idTopicPane');
const splitterRight = document.getElementById('idSplitterRight');
const splitterBottom = document.getElementById('idSplitterBottom');
// '
let unlockResize = false; // флаг, определяющий предотвращение изменения размеров панелей
let oldClientWidth = document.documentElement.clientWidth;
let reSizes = {
	navpaneMinWidth: 294,
	topicpaneMinWidth: 500,
	navpaneWidth: parseInt(getComputedStyle(navPane, null).width, 10),
	topicpaneLeft: parseInt(getComputedStyle(topicPane, null).left, 10),
	topicpaneWidth: parseInt(getComputedStyle(topicPane, null).width, 10),
	navpaneTop: getValueFullSizeProperty(toolbarPane).height - parseInt(getComputedStyle(navPane, null).marginTop, 10),
	navpaneHeight: parseInt(getComputedStyle(navPane, null).height, 10),
	topicpaneTop: parseInt(getComputedStyle(topicPane, null).top, 10),
	topicpaneHeight: parseInt(getComputedStyle(topicPane, null).height, 10),
};
// '
window.addEventListener('resize', reSizePanels, false); // false - фаза "всплытие"
$(document).ready(function () { // - jq
	// (!) splitterRight
	splitterRight.addEventListener('mousedown', function (e) {
		unlockResize = true;
		// splitterBottom.style.pointerEvents = "none"; // (?) св-во позволяет управлять тем, как элементы будут реагировать на события мыши или прикосновения к сенсорному экрану. Применяется для взаимодействия с нижележащими элементами, игнорируя вышележащие.
		function splitterRight_onMousemove(eVent) {
			if (unlockResize) {
				putSizes(eVent); // - получить размеры в глобальную переменную reSizes
				navPane.style.width = reSizes.navpaneWidth + "px";
				topicPane.style.left = reSizes.topicpaneLeft + "px";
				// (i)*отменяем действия браузера по умолчанию - без этого на локальном ПК событие безумно тормозит при изменении размеров элементов
				eVent.preventDefault(); // если через обработчик addEventListener
				// eVent.stopPropagation();
				// return false; // если через обработчик on<событие>
			}
		}
		document.addEventListener('mousemove', splitterRight_onMousemove, false);
		function splitterRight_onMouseup(eVent) {
			// 'eVent - tagName div splitterRight, но может быть и другим элементом предположительно из-за делегирования через наследование на основе прототипов (.prototype)
			if (unlockResize) {
				unlockResize = false;
				setSizes(eVent); // - установить значения и обновить глобальную переменную reSizes
				// splitterRight.style.pointerEvents = "initial"; // (?) св-во позволяет управлять тем, как элементы будут реагировать на события мыши или прикосновения к сенсорному экрану. Применяется для взаимодействия с нижележащими элементами, игнорируя вышележащие.
				document.removeEventListener('mousemove', splitterRight_onMousemove, false);
				document.removeEventListener('mouseup', splitterRight_onMouseup, false);
			}
		}
		document.addEventListener('mouseup', splitterRight_onMouseup, false);
	}, false); // false - фаза "всплытие"
	// (!) splitterBottom
	splitterBottom.addEventListener('mousedown', function (e) {
		unlockResize = true;
		splitterBottom.classList.add('icon-grab'); // (!) иногда срабатывает инверсионно + не всеми браузерами поддерживается (IE)
		// splitterBottom.style.pointerEvents = "none"; // (?) св-во позволяет управлять тем, как элементы будут реагировать на события мыши или прикосновения к сенсорному экрану. Применяется для взаимодействия с нижележащими элементами, игнорируя вышележащие.
		if (reSizes.navpaneHeight === 0) {
			navPane.style.removeProperty('min-height');
			navPane.style.top = ((banner.offsetHeight + getValueFullSizeProperty(toolbarPane).height) - (parseInt(getComputedStyle(navPane, null).height, 10) + parseInt(getComputedStyle(navPane, null).paddingTop, 10) + parseInt(getComputedStyle(navPane, null).paddingBottom, 10) + parseInt(getComputedStyle(navPane, null).borderTop, 10) + parseInt(getComputedStyle(navPane, null).borderBottom, 10))) + "px";
		}
		function splitterBottom_onMousemove(eVent) {
			if (unlockResize) {
				putSizes(eVent); // - получить размеры в глобальную переменную reSizes
				navPane.style.top = reSizes.navpaneTop + "px";
				navPane.style.height = reSizes.navpaneHeight + "px";
				topicPane.style.top = reSizes.topicpaneTop + "px";
				// (i)*отменяем действия браузера по умолчанию - без этого на локальном ПК событие безумно тормозит при изменении размеров элементов
				eVent.preventDefault(); // если через обработчик addEventListener
				// eVent.stopPropagation();
				// return false; // если через обработчик on<событие>
			}
		}
		document.addEventListener('mousemove', splitterBottom_onMousemove, false);
		function splitterBottom_onMouseup(eVent) {
			// 'eVent - tagName div splitterBottom, но может быть и другим элементом предположительно из-за делегирования через наследование на основе прототипов (.prototype)
			if (unlockResize) {
				unlockResize = false;
				setSizes(eVent); // - установить значения и обновить глобальную переменную reSizes
				splitterBottom.classList.remove('icon-grab'); // (!) иногда срабатывает инверсионно + не всеми браузерами поддерживается, например IE
				// splitterBottom.style.pointerEvents = "initial"; // (?) св-во позволяет управлять тем, как элементы будут реагировать на события мыши или прикосновения к сенсорному экрану. Применяется для взаимодействия с нижележащими элементами, игнорируя вышележащие.
				document.removeEventListener('mousemove', splitterBottom_onMousemove, false);
				document.removeEventListener('mouseup', splitterBottom_onMouseup, false);
			}
		}
		document.addEventListener('mouseup', splitterBottom_onMouseup, false);
	}, false); // false - фаза "всплытие"
}); // ready end
// (!) putSizes - получить размеры в глобальную переменную reSizes
function putSizes(eVent) {
	// 'eVent.type - onMousemove
	// 'eVent.target - splitterRight/splitterBottom
	let toolbarHeight = getValueFullSizeProperty(toolbarPane).height; // - получить полноразмерное значение св-ва
	let navpaneStyles = getComputedStyle(navPane, null);
	let topicpaneStyles = getComputedStyle(topicPane, null);
	if (document.documentElement.clientWidth > 501) {
		reSizes.navpaneWidth = (eVent.clientX + getValueFullSizeProperty(splitterRight).width - parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.paddingRight, 10)) - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.borderLeft, 10) - parseInt(navpaneStyles.marginLeft, 10);
		reSizes.topicpaneLeft = eVent.clientX + parseInt(navpaneStyles.marginRight, 10);
		reSizes.topicpaneWidth = document.body.offsetWidth - (eVent.clientX + parseInt(navpaneStyles.marginRight, 10));
	} else if (document.documentElement.clientWidth <= 500) {
		reSizes.navpaneTop = (reSizes.navpaneHeight < 250) ? (eVent.clientY + getValueFullSizeProperty(splitterBottom).height) - parseInt(navpaneStyles.height, 10) - parseInt(navpaneStyles.paddingTop, 10) - parseInt(navpaneStyles.borderTop, 10) - parseInt(navpaneStyles.marginTop, 10) - parseInt(navpaneStyles.marginBottom, 10) : (banner.offsetHeight + toolbarHeight) - parseInt(navpaneStyles.marginTop, 10);
		reSizes.navpaneHeight = (eVent.clientY + getValueFullSizeProperty(splitterBottom).height) - parseInt(navpaneStyles.paddingTop, 10) - parseInt(navpaneStyles.borderTop, 10) - parseInt(navpaneStyles.marginTop, 10) - banner.offsetHeight - toolbarHeight;
		reSizes.topicpaneTop = (eVent.clientY + getValueFullSizeProperty(splitterBottom).height) + parseInt(navpaneStyles.paddingBottom, 10) + parseInt(navpaneStyles.borderBottom, 10) - parseInt(navpaneStyles.marginBottom, 10);
		reSizes.topicpaneHeight = document.body.offsetHeight - (eVent.clientY + getValueFullSizeProperty(splitterBottom).height + parseInt(navpaneStyles.paddingBottom, 10) + parseInt(navpaneStyles.borderBottom, 10) - parseInt(navpaneStyles.marginBottom, 10)) - parseInt(topicpaneStyles.paddingTop, 10) - parseInt(topicpaneStyles.paddingBottom, 10) - parseInt(topicpaneStyles.borderTop, 10) - parseInt(topicpaneStyles.borderBottom, 10) - parseInt(topicpaneStyles.marginTop, 10) - parseInt(topicpaneStyles.marginBottom, 10);
	}
}
// (!) setSizes - установить значения и обновить глобальную переменную reSizes
function setSizes(eVent) {
	// 'eVent.type - onMouseup
	// 'eVent.target - splitterRight/splitterBottom
	let toolbarHeight = getValueFullSizeProperty(toolbarPane).height; // - получить полноразмерное значение св-ва
	let navpaneStyles = getComputedStyle(navPane, null);
	let topicpaneStyles = getComputedStyle(topicPane, null);
	// *проверяем внутренний размер окна без полос прокрутки
	if (document.documentElement.clientWidth > 501) { // (i) ограничение размеров - лимит width
		if (reSizes.navpaneWidth < reSizes.navpaneMinWidth) {
			navPane.style.removeProperty('width'); // удаляем css св-во
			topicPane.style.removeProperty('left'); // удаляем css св-во
			// *частично обновляем значения по ширине в глобальной переменной reSizes
			reSizes.navpaneWidth = reSizes.navpaneMinWidth;
			reSizes.topicpaneLeft = reSizes.navpaneWidth + parseInt(navpaneStyles.paddingLeft, 10) + parseInt(navpaneStyles.paddingRight, 10) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10) + parseInt(navpaneStyles.marginRight, 10); // = 304px
			reSizes.topicpaneWidth = document.body.offsetWidth - reSizes.topicpaneLeft;
		} else if (reSizes.topicpaneWidth < reSizes.topicpaneMinWidth) {
			// *частично обновляем значения по ширине в глобальной переменной reSizes
			reSizes.topicpaneWidth = reSizes.topicpaneMinWidth;
			reSizes.topicpaneLeft = document.body.offsetWidth - reSizes.topicpaneWidth;
			reSizes.navpaneWidth = reSizes.topicpaneLeft - parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.paddingRight, 10) - parseInt(navpaneStyles.borderLeft, 10) - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.marginLeft, 10);
			navPane.style.width = reSizes.navpaneWidth + "px";
			topicPane.style.left = reSizes.topicpaneLeft + "px";
		} else {
			navPane.style.width = reSizes.navpaneWidth + "px";
			topicPane.style.left = reSizes.topicpaneLeft + "px";
		}
	} else if (document.documentElement.clientWidth <= 500) { // (i) ограничение размеров - лимит height + min-height по умолчанию, см.в правилах: .nav-pane/.topic-pane в styles.css
		// *частично обновляем значения по высоте в глобальной переменной reSizes
		reSizes.navpaneTop = banner.offsetHeight + toolbarHeight - parseInt(navpaneStyles.marginTop, 10);
		navPane.style.top = reSizes.navpaneTop + "px";
		if (reSizes.navpaneHeight < 300) {
			if (reSizes.navpaneHeight < parseInt(navpaneStyles.minHeight, 10)) { // - "притягиваем" пан.топика к пан.инструментов
				navPane.style.minHeight = "0"; // - отменяем лимит - минимальную высоту по умолчанию в styles.css
				reSizes.navpaneHeight = 0;
				// reSizes.topicpaneTop = banner.offsetHeight - toolbarHeight - reSizes.navpaneHeight - parseInt(navpaneStyles.paddingTop, 10) - parseInt(navpaneStyles.paddingBottom, 10) - parseInt(navpaneStyles.borderTop, 10) - parseInt(navpaneStyles.borderBottom, 10) + parseInt(navpaneStyles.marginTop, 10) + parseInt(navpaneStyles.marginBottom, 10) + parseInt(topicpaneStyles.marginTop, 10); // только здесь // = 114px
			} else {
				navPane.style.removeProperty('min-height');
				reSizes.navpaneHeight = reSizes.navpaneMinWidth;
			}
			reSizes.topicpaneTop = banner.offsetHeight + toolbarHeight + reSizes.navpaneHeight + parseInt(navpaneStyles.paddingTop, 10) + parseInt(navpaneStyles.paddingBottom, 10) + parseInt(navpaneStyles.borderTop, 10) + parseInt(navpaneStyles.borderBottom, 10); // для обоих вариантов // = 408px
			reSizes.topicpaneHeight = document.body.offsetHeight - reSizes.topicpaneTop - parseInt(topicpaneStyles.marginTop, 10); // = 525px

			navPane.style.height = reSizes.navpaneHeight + "px";
			topicPane.style.top = reSizes.topicpaneTop + "px";

		} else if (reSizes.topicpaneHeight < 300) {
			navPane.style.removeProperty('min-height');
			if (reSizes.topicpaneHeight < parseInt(topicpaneStyles.minHeight, 10)) { // - "притягиваем" пан.нав.к низу
				reSizes.topicpaneHeight = parseInt(topicpaneStyles.minHeight, 10);
				reSizes.navpaneHeight = document.body.offsetHeight - banner.offsetHeight - toolbarHeight - parseInt(navpaneStyles.marginTop, 10) - parseInt(navpaneStyles.paddingTop, 10) - parseInt(navpaneStyles.paddingBottom, 10) - parseInt(navpaneStyles.borderTop, 10) - parseInt(navpaneStyles.borderBottom, 10); // = 819px
				reSizes.topicpaneTop = banner.offsetHeight + toolbarHeight + reSizes.navpaneHeight + parseInt(navpaneStyles.paddingTop, 10) + parseInt(navpaneStyles.paddingBottom, 10) + parseInt(navpaneStyles.borderTop, 10) + parseInt(navpaneStyles.borderBottom, 10); // = 927px, а не 931px // x parseInt(topicpaneStyles.marginTop, 10)
			} else {
				reSizes.topicpaneHeight = 250;
				reSizes.topicpaneTop = document.body.offsetHeight - reSizes.topicpaneHeight - parseInt(topicpaneStyles.marginTop, 10); // = 683px
				reSizes.navpaneHeight = reSizes.topicpaneTop - banner.offsetHeight - toolbarHeight - parseInt(navpaneStyles.marginTop, 10) + parseInt(navpaneStyles.marginBottom, 10) - parseInt(navpaneStyles.paddingTop, 10) - parseInt(navpaneStyles.paddingBottom, 10) - parseInt(navpaneStyles.borderTop, 10) - parseInt(navpaneStyles.borderBottom, 10); // = 569px
			}
			navPane.style.height = reSizes.navpaneHeight + "px";
			topicPane.style.top = reSizes.topicpaneTop + "px";
		} else {
			navPane.style.removeProperty('min-height');
			// (i) reSizes.navpaneHeight определится ф.putSizes()
			// reSizes.topicpaneTop = toolbarHeight + reSizes.navpaneHeight + parseInt(navpaneStyles.paddingTop, 10) + parseInt(navpaneStyles.paddingBottom, 10) + parseInt(navpaneStyles.borderTop, 10) + parseInt(navpaneStyles.borderBottom, 10);
		}
	}
}
// (!) reSizePanels-изменение размера панелей
function reSizePanels(eVent) {
	// 'eVent.type - onResize
	// 'eVent.target - window
	if (navPane === null || typeof(navPane) === "undefined" && typeof(navPane) !== "object" || navPane !== Object(navPane)) {
		console.error(`(!) Косяк: не удалось установить позиционирование панелей - переменная не определена или значение переменной не соответствует условию(-ям) проверки:\n function reSizePanels ():\n 1) navPane: Object(${Object(navPane)}) / typeof(${typeof(navPane)}) / ${navPane}\n 2) topicPane: Object(${Object(topicPane)}) / typeof(${typeof(topicPane)}) / ${topicPane}`);
		alert(`(!) Косяк: не удалось установить позиционирование панелей - переменная не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return;
	}
	if (topicPane === null || typeof(topicPane) === "undefined" || typeof(topicPane) !== "object" || topicPane !== Object(topicPane)) {
		console.error(`(!) Косяк: не удалось установить позиционирование панелей - переменная не определена или значение переменной не соответствует условию(-ям) проверки:\n function reSizePanels ():\n 1) navPane: Object(${Object(navPane)}) / typeof(${typeof(navPane)}) / ${navPane}\n 2) topicPane: Object(${Object(topicPane)}) / typeof(${typeof(topicPane)}) / ${topicPane}`);
		alert(`(!) Косяк: не удалось установить позиционирование панелей - переменная не определена или значение переменной не соответствует условию(-ям) проверки, см.консоль.`);
		return;
	}
	// (!) нужно учесть, что когда нав.пан.скрывается (.style.display:"none"), то getComputedStyle образует ошибку, следовательно в этом случае должна быть альтернатива для получения св-тв элемента
	let navpaneStyles = getComputedStyle(navPane, null);
	let topicpaneStyles = getComputedStyle(topicPane, null);
	navPane.style.removeProperty('top'); // удаляем css св-во
	topicPane.style.removeProperty('top'); // удаляем css св-во
	// navPane.style.top = null; // удаляем значение св-ва
	// topicPane.style.top = null; // удаляем значение св-ва
	// *проверяем внутренний размер окна без полос прокрутки
	if (document.documentElement.clientWidth >= 501) {
		navPane.style.removeProperty('height');
		if (navpaneStyles.display === "none" || navpaneStyles.visibility === "hidden") { // нав.пан.скрыта
			// (!) чтобы не образовывалась ошибка на getComputedStyle
			navPane.style.removeProperty('display');
			navPane.style.removeProperty('visibility');
			navPane.style.left = 0 - (navPane.offsetWidth + parseInt(navpaneStyles.marginRight, 10)) + "px";
			if (reSizes.navpaneWidth > reSizes.navpaneMinWidth) { // - применялся splitterRight
				if (oldClientWidth > document.documentElement.clientWidth) { // - уменьшаем размер окна браузера
					if (parseInt(navpaneStyles.width, 10) <= reSizes.navpaneMinWidth) {
						navPane.style.removeProperty('width');
					} else if (parseInt(topicpaneStyles.width, 10) < reSizes.topicpaneMinWidth) {
						navPane.style.width = (document.body.offsetWidth - reSizes.topicpaneMinWidth) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.paddingRight, 10) - parseInt(navpaneStyles.marginLeft, 10) - parseInt(navpaneStyles.marginRight, 10) + "px";
					} else { // < 1
						navPane.style.width = ((parseInt(navpaneStyles.width, 10) - 1) + parseInt(navpaneStyles.paddingLeft, 10) + parseInt(navpaneStyles.paddingRight, 10) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.marginLeft, 10) - parseInt(navpaneStyles.marginRight, 10)) + "px";
					}
				} else if (oldClientWidth < document.documentElement.clientWidth) { // - увеличиваем размер окна браузера
					if (parseInt(navpaneStyles.width, 10) > reSizes.navpaneWidth) {
						navPane.style.width = reSizes.navpaneWidth + "px";
					} else { // > 1
						navPane.style.width = ((parseInt(navpaneStyles.width, 10) + 1) - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.paddingRight, 10) - parseInt(navpaneStyles.borderLeft, 10) - parseInt(navpaneStyles.borderRight, 10) + parseInt(navpaneStyles.marginLeft, 10) + parseInt(navpaneStyles.marginRight, 10)) + "px";
					}
				}
				oldClientWidth = document.documentElement.clientWidth;
			}
			navPane.style.display = "none";
		} else { // - нав.пан.раскрыта
			navPane.style.removeProperty('left');
			if (reSizes.navpaneWidth > reSizes.navpaneMinWidth) { // - применялся splitterRight
				if (oldClientWidth > document.documentElement.clientWidth) { // - уменьшаем размер окна браузера
					if (parseInt(navpaneStyles.width, 10) <= reSizes.navpaneMinWidth) {
						navPane.style.removeProperty('width');
						topicPane.style.removeProperty('left');
					} else if (parseInt(topicpaneStyles.width, 10) < reSizes.topicpaneMinWidth) {
						navPane.style.width = (document.body.offsetWidth - reSizes.topicpaneMinWidth) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.paddingRight, 10) - parseInt(navpaneStyles.marginLeft, 10) - parseInt(navpaneStyles.marginRight, 10) + "px";
						topicPane.style.left = document.body.offsetWidth - reSizes.topicpaneMinWidth + "px";
					} else { // < 1
						navPane.style.width = ((parseInt(navpaneStyles.width, 10) - 1) + parseInt(navpaneStyles.paddingLeft, 10) + parseInt(navpaneStyles.paddingRight, 10) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.marginLeft, 10) - parseInt(navpaneStyles.marginRight, 10)) + "px";
						topicPane.style.left = (document.body.offsetWidth - ((parseInt(topicpaneStyles.width, 10) - 1) + parseInt(navpaneStyles.marginRight, 10))) + "px";
					}
				} else if (oldClientWidth < document.documentElement.clientWidth) { // - увеличиваем размер окна браузера
					if (parseInt(navpaneStyles.width, 10) > reSizes.navpaneWidth) {
						navPane.style.width = reSizes.navpaneWidth + "px";
						topicPane.style.left = reSizes.navpaneWidth + parseInt(navpaneStyles.paddingLeft, 10) + parseInt(navpaneStyles.paddingRight, 10) - parseInt(navpaneStyles.borderLeft, 10) - parseInt(navpaneStyles.borderRight, 10) + parseInt(navpaneStyles.marginLeft, 10) + parseInt(navpaneStyles.marginRight, 10) + "px";
					} else { // > 1
						navPane.style.width = ((parseInt(navpaneStyles.width, 10) + 1) - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.paddingRight, 10) - parseInt(navpaneStyles.borderLeft, 10) - parseInt(navpaneStyles.borderRight, 10) + parseInt(navpaneStyles.marginLeft, 10) + parseInt(navpaneStyles.marginRight, 10)) + "px";
						topicPane.style.left = (document.body.offsetWidth - ((parseInt(topicpaneStyles.width, 10) + 1) - parseInt(navpaneStyles.marginRight, 10))) + "px";
					}
				}
				oldClientWidth = document.documentElement.clientWidth;
			}
		}
	} else if (document.documentElement.clientWidth <= 500) {
		navPane.style.removeProperty('left');
		navPane.style.removeProperty('width');
		topicPane.style.removeProperty('left');
		if (navpaneStyles.display === "none" || navpaneStyles.visibility === "hidden") { // нав.пан.скрыта
			navPane.style.removeProperty('display');
			navPane.style.removeProperty('visibility');
			// (!) чтобы не образовывалась ошибка на getComputedStyle
			navPane.style.top = parseInt(getComputedStyle(topicPane).top, 10) - parseInt(navpaneStyles.height, 10) - parseInt(navpaneStyles.paddingTop, 10) - parseInt(navpaneStyles.paddingBottom, 10) - parseInt(navpaneStyles.borderTop, 10) - parseInt(navpaneStyles.borderBottom, 10) - parseInt(navpaneStyles.marginTop, 10) - parseInt(navpaneStyles.marginBottom, 10) + "px";
			navPane.style.display = "none";
		} else {
			navPane.style.removeProperty('top');
		}
	}
}