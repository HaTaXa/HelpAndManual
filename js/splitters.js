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
	// 'eVent.type - onMouseup
	// 'eVent.target - splitterRight/splitterBottom
	let toolbarHeight = getValueFullSizeProperty(toolbarPane).height; // - получить полноразмерное значение св-ва
	let navpaneStyles = getComputedStyle(navPane, null);
	let topicpaneStyles = getComputedStyle(topicPane, null);
	reSizes = {
		navpaneWidth: (eVent.clientX + getValueFullSizeProperty(splitterRight).width - parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.paddingRight, 10)) - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.borderLeft, 10) - parseInt(navpaneStyles.marginLeft, 10),
		topicpaneLeft: eVent.clientX + parseInt(navpaneStyles.marginRight, 10),
		topicpaneWidth: document.body.offsetWidth - (eVent.clientX + parseInt(navpaneStyles.marginRight, 10)),
		navpaneTop: (reSizes.navpaneHeight < 250) ? (eVent.clientY + getValueFullSizeProperty(splitterBottom).height) - parseInt(navpaneStyles.height, 10) - parseInt(navpaneStyles.paddingTop, 10) - parseInt(navpaneStyles.borderTop, 10) - parseInt(navpaneStyles.marginTop, 10) - parseInt(navpaneStyles.marginBottom, 10) : (banner.offsetHeight + toolbarHeight) - parseInt(navpaneStyles.marginTop, 10),
		navpaneHeight: (eVent.clientY + getValueFullSizeProperty(splitterBottom).height) - parseInt(navpaneStyles.paddingTop, 10) - parseInt(navpaneStyles.borderTop, 10) - parseInt(navpaneStyles.marginTop, 10) - banner.offsetHeight - toolbarHeight,
		topicpaneTop: (eVent.clientY + getValueFullSizeProperty(splitterBottom).height) + parseInt(navpaneStyles.paddingBottom, 10) + parseInt(navpaneStyles.borderBottom, 10) - parseInt(navpaneStyles.marginBottom, 10),
		topicpaneHeight: document.body.offsetHeight - (eVent.clientY + getValueFullSizeProperty(splitterBottom).height + parseInt(navpaneStyles.paddingBottom, 10) + parseInt(navpaneStyles.borderBottom, 10) - parseInt(navpaneStyles.marginBottom, 10)) - parseInt(topicpaneStyles.paddingTop, 10) - parseInt(topicpaneStyles.paddingBottom, 10) - parseInt(topicpaneStyles.borderTop, 10) - parseInt(topicpaneStyles.borderBottom, 10) - parseInt(topicpaneStyles.marginTop, 10) - parseInt(topicpaneStyles.marginBottom, 10)
	}
}
// (!) setSizes - установить значения и обновить глобальную переменную reSizes
function setSizes(eVent) {
	// 'eVent.type - onResize, onMouseup
	// 'eVent.target - window, splitterRight/splitterBottom
	let toolbarHeight = getValueFullSizeProperty(toolbarPane).height; // - получить полноразмерное значение св-ва
	let navpaneStyles = getComputedStyle(navPane, null);
	let topicpaneStyles = getComputedStyle(topicPane, null);
	// *проверяем внутренний размер окна без полос прокрутки
	if (document.documentElement.clientWidth > 501) { // (i) ограничение размеров - лимит width
		if (eVent.type === "mouseup") {
			if (reSizes.navpaneWidth < 294) {
				navPane.style.removeProperty('width'); // удаляем css св-во
				topicPane.style.removeProperty('left'); // удаляем css св-во
				// *частично обновляем значения по ширине в глобальной переменной reSizes
				reSizes.navpaneWidth = 294;
				reSizes.topicpaneLeft = reSizes.navpaneWidth + parseInt(navpaneStyles.paddingLeft, 10) + parseInt(navpaneStyles.paddingRight, 10) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10) + parseInt(navpaneStyles.marginRight, 10); // = 304px
				reSizes.topicpaneWidth = document.body.offsetWidth - reSizes.topicpaneLeft;
			} else if (reSizes.topicpaneWidth < 500) {
				// *частично обновляем значения по ширине в глобальной переменной reSizes
				reSizes.topicpaneWidth = 500;
				reSizes.topicpaneLeft = document.body.offsetWidth - reSizes.topicpaneWidth;
				reSizes.navpaneWidth = reSizes.topicpaneLeft - parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.paddingRight, 10) - parseInt(navpaneStyles.borderLeft, 10) - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.marginLeft, 10);
				navPane.style.width = reSizes.navpaneWidth + "px";
				topicPane.style.left = reSizes.topicpaneLeft + "px";
			} else {
				navPane.style.width = reSizes.navpaneWidth + "px";
				topicPane.style.left = reSizes.topicpaneLeft + "px";
			}
		} else if (eVent.type === "resize") {
			if (oldClientWidth > document.documentElement.clientWidth) { // - уменьшаем размер окна браузера
				if (parseInt(navpaneStyles.width, 10) <= 294) {
					navPane.style.removeProperty('width');
					topicPane.style.removeProperty('left');
				} else { // - если применялся splitterRight
					// (?)'не получается вычислить, чтобы каждая пан.уменьшались/увеличивались на % от разницы всей ширины окна браузера
					// let timeId = null;
					// clearTimeout(timeId);
					// let diff = oldClientWidth - document.documentElement.clientWidth; // - разница от ширины окна браузера
					// setTimeout(() => {
					// 	let diffNavpane = diff / parseInt(navpaneStyles.width, 10); // - разница от ширины пан.
					// 	let diffTopicPane = diff / parseInt(topicpaneStyles.width, 10); // - разница от ширины пан.
					// 	let resultNavpane = parseInt(navpaneStyles.width, 10) - diffNavpane;
					// 	let resultTopicpane = parseInt(topicpaneStyles.width, 10) - diffTopicPane;
					// 	resultNavpane = resultNavpane + parseInt(navpaneStyles.paddingLeft, 10) + parseInt(navpaneStyles.paddingRight, 10) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.marginLeft, 10) - parseInt(navpaneStyles.marginRight, 10);
					// 	resultTopicpane = document.body.offsetWidth - (resultTopicpane - parseInt(navpaneStyles.marginRight, 10));

					// 	navPane.style.width = resultNavpane + "px";
					// 	topicPane.style.left = resultTopicpane + "px";

					// 	console.warn(`1) diff: ${oldClientWidth} - ${document.documentElement.clientWidth} = ${diff}\n 2) diffNavpane: ${diff} / ${parseInt(navpaneStyles.width, 10)} = ${diff / parseInt(navpaneStyles.width, 10)}\n 3) diffTopicPane: ${diff} / ${parseInt(topicpaneStyles.width, 10)} = ${diff / parseInt(topicpaneStyles.width, 10)}\n 4) resultNavpane: ${resultNavpane}: ${parseInt(navpaneStyles.width, 10)} - ${diffNavpane} = ${parseInt(navpaneStyles.width, 10) - diffNavpane}\n 5) resultTopicpane: ${resultTopicpane}: ${parseInt(topicpaneStyles.width, 10)} - ${diffTopicPane} = ${parseInt(topicpaneStyles.width, 10) - diffTopicPane}\n---\n oldClientWidth: ${oldClientWidth}`); // x -

					// }, 500);

					// (!) неправильно вычислять тупо 1
					navPane.style.width = ((parseInt(navpaneStyles.width, 10) - 1) + parseInt(navpaneStyles.paddingLeft, 10) + parseInt(navpaneStyles.paddingRight, 10) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10) - parseInt(navpaneStyles.marginLeft, 10) - parseInt(navpaneStyles.marginRight, 10)) + "px";
					topicPane.style.left = (document.body.offsetWidth - ((parseInt(topicpaneStyles.width, 10) - 1) + parseInt(navpaneStyles.marginRight, 10))) + "px";
					}
			} else if (oldClientWidth < document.documentElement.clientWidth) { // - увеличиваем размер окна браузера
				if (parseInt(navpaneStyles.width, 10) < reSizes.navpaneWidth) { // - если применялся splitterRight
					// let timeId = null;
					// clearTimeout(timeId);
					// let diff = oldClientWidth - document.documentElement.clientWidth; // - разница от ширины окна браузера
					// setTimeout(() => {
					// 	let diffNavpane = diff / parseInt(navpaneStyles.width, 10); // - разница от ширины пан.
					// 	let diffTopicPane = diff / parseInt(topicpaneStyles.width, 10); // - разница от ширины пан.
					// 	let resultNavpane = parseInt(navpaneStyles.width, 10) - diffNavpane;
					// 	resultNavpane = resultNavpane - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.paddingRight, 10) - parseInt(navpaneStyles.borderLeft, 10) - parseInt(navpaneStyles.borderRight, 10) + parseInt(navpaneStyles.marginLeft, 10) + parseInt(navpaneStyles.marginRight, 10);
					// 	let resultTopicpane = parseInt(topicpaneStyles.width, 10) - diffTopicPane;
					// 	resultTopicpane = document.body.offsetWidth - (resultTopicpane + parseInt(navpaneStyles.marginRight, 10));

					// 	navPane.style.width = resultNavpane + "px";
					// 	topicPane.style.left = resultTopicpane + "px";

					// 	console.warn(`1) diff: ${oldClientWidth} - ${document.documentElement.clientWidth} = ${diff}\n 2) diffNavpane: ${diff} / ${parseInt(navpaneStyles.width, 10)} = ${diff / parseInt(navpaneStyles.width, 10)}\n 3) diffTopicPane: ${diff} / ${parseInt(topicpaneStyles.width, 10)} = ${diff / parseInt(topicpaneStyles.width, 10)}\n 4) resultNavpane: ${resultNavpane}: ${parseInt(navpaneStyles.width, 10)} - ${diffNavpane} = ${parseInt(navpaneStyles.width, 10) - diffNavpane}\n 5) resultTopicpane: ${resultTopicpane}: ${parseInt(topicpaneStyles.width, 10)} - ${diffTopicPane} = ${parseInt(topicpaneStyles.width, 10) - diffTopicPane}\n---\n oldClientWidth: ${oldClientWidth}`); // x -

					// }, 500);

					// (!) неправильно вычислять тупо 1
					navPane.style.width = ((parseInt(navpaneStyles.width, 10) + 1) - parseInt(navpaneStyles.paddingLeft, 10) - parseInt(navpaneStyles.paddingRight, 10) - parseInt(navpaneStyles.borderLeft, 10) - parseInt(navpaneStyles.borderRight, 10) + parseInt(navpaneStyles.marginLeft, 10) + parseInt(navpaneStyles.marginRight, 10)) + "px";
					topicPane.style.left = (document.body.offsetWidth - ((parseInt(topicpaneStyles.width, 10) + 1) - parseInt(navpaneStyles.marginRight, 10))) + "px";
				} else {
					navPane.style.width = reSizes.navpaneWidth + "px";
					topicPane.style.left = (reSizes.navpaneWidth + parseInt(navpaneStyles.paddingLeft, 10) + parseInt(navpaneStyles.paddingRight, 10) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10) + parseInt(navpaneStyles.marginLeft, 10)) + "px";
				}
			}
			oldClientWidth = document.documentElement.clientWidth;
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
				reSizes.navpaneHeight = 294;
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
				reSizes.topicpaneTop = banner.offsetHeight + toolbarHeight + reSizes.navpaneHeight + parseInt(navpaneStyles.paddingTop, 10) + parseInt(navpaneStyles.paddingBottom, 10) + parseInt(navpaneStyles.borderTop, 10) + parseInt(navpaneStyles.borderBottom, 10); // = 927px, а не 931px // x - (?)parseInt(topicpaneStyles.marginTop, 10)
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
	// let topicpaneStyles = getComputedStyle(topicPane, null);
	navPane.style.removeProperty('top'); // удаляем css св-во
	topicPane.style.removeProperty('top'); // удаляем css св-во
	// navPane.style.top = null; // удаляем значение св-ва
	// topicPane.style.top = null; // удаляем значение св-ва
	// *проверяем внутренний размер окна без полос прокрутки
	if (document.documentElement.clientWidth >= 501) {
		if (navpaneStyles.display === "none" || navpaneStyles.visibility === "hidden") { // - нав.пан.скрыта
			navPane.style.removeProperty('display'); // удаляем css св-во
			navPane.style.removeProperty('visibility'); // удаляем css св-во
			setSizes(eVent); // - установить значения и обновить глобальную переменную reSizes
			navPane.style.left = 0 - (navPane.offsetWidth + parseInt(navpaneStyles.marginRight, 10)) + "px";
			navPane.style.display = "none";
			topicPane.style.removeProperty('left'); // удаляем css св-во
		} else { // - нав.пан.раскрыта
			navPane.style.removeProperty('left'); // удаляем css св-во
			navPane.style.removeProperty('height'); // удаляем css св-во
			// if (reSizes.topicpaneLeft === 0 || reSizes.topicpaneLeft === 304) { // x (?)
			// 	topicPane.style.removeProperty('left'); // удаляем css св-во
			// } else {
			// 	topicPane.style.left = reSizes.topicpaneLeft + "px";
			// }
			setSizes(eVent); // - установить значения и обновить глобальную переменную reSizes
		}
	} else if (document.documentElement.clientWidth <= 500) {
		navPane.style.removeProperty('left'); // удаляем css св-во
		navPane.style.removeProperty('width'); // удаляем css св-во
		topicPane.style.removeProperty('left'); // удаляем css св-во
		if (navpaneStyles.display === "none" || navpaneStyles.visibility === "hidden") {
			navPane.style.removeProperty('display'); // - удаляем css св-во
			navPane.style.removeProperty('visibility'); // - удаляем css св-во
			navPane.style.top = (parseInt(navpaneStyles.top, 10) - (navPane.offsetHeight + parseInt(navpaneStyles.marginBottom, 10))) + "px"; // или
			// navPane.style.top = (parseInt(navpaneStyles.top, 10) - ((parseInt(navpaneStyles.height, 10) + parseInt(navpaneStyles.paddingTop, 10) + parseInt(navpaneStyles.paddingBottom, 10) + parseInt(navpaneStyles.borderTop, 10) + parseInt(navpaneStyles.borderBottom, 10)) + parseInt(navpaneStyles.marginTop, 10))) + "px";
			navPane.style.display = "none";
		}
		setSizes(eVent); // - установить значения и обновить глобальную переменную reSizes
	}
}