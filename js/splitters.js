// (i) Инициализация переменных
const navbox = document.getElementById('idNavBox');
const topicpane = document.getElementById('idTopicPane');
const splitterRight = document.getElementById('idSplitterRight');
let lastPoint = { x: null, y: null }; // X не используется
let unlockResize = false; // флаг, определяющий предотвращение изменения размеров панелей
let reSizesWidth = {
	navpaneStyleWidth: 300,
	// navpaneStyleWidth: parseInt(getComputedStyle(navbox.offsetParent, null).width, 10),
	topicpaneStyleLeft: 310,
	// topicpaneStyleLeft: parseInt(getComputedStyle(topicpane, null).left, 10),
	topicpaneStyleWidth: parseInt(getComputedStyle(topicpane, null).width, 10)
};
// ***
$(document).ready(function () { // - jq
	// (!) splitterRight.addEventListener('mousedown')
	splitterRight.addEventListener('mousedown', function (e) {
		unlockResize = true;
		// lastPoint.x = e.clientX;
		// splitterRight.style.pointerEvents = "none"; // - св-во позволяет управлять тем, как элементы будут реагировать на события мыши или прикосновения к сенсорному экрану. Применяется для взаимодействия с нижележащими элементами, игнорируя вышележащие.
		// // i временно, только для вывода в консоли
		// X -
		// let navpaneWidth = getComputedStyle(navbox.offsetParent, null);
		// navpaneWidth = parseInt(navpaneWidth.getPropertyValue('width'));
		// let topicpaneWidth = getComputedStyle(topicpane, null);
		// topicpaneWidth = parseInt(topicpaneWidth.getPropertyValue('width'));

		// console.log(`--- start ---\n 1) splitterRight.addEventListener('mousedown'):\n e.target.id: ${e.target.id}\n e.clientX: ${e.clientX}\n navbox.clientWidth: ${navbox.clientWidth}\n navbox.offsetWidth: ${navbox.offsetWidth}\n navpaneWidth: ${navpaneWidth}\n navbox.offsetParent.clientWidth: ${navbox.offsetParent.clientWidth}\n navbox.offsetParent.offsetWidth: ${navbox.offsetParent.offsetWidth}\n topicpaneWidth: ${topicpaneWidth}\n topicpane.clientWidth: ${topicpane.clientWidth}\n topicpane.offsetWidth: ${topicpane.offsetWidth}\n topicpane.offsetLeft: ${topicpane.offsetLeft}\n reSizesWidth.navpaneStyleWidth: ${reSizesWidth.navpaneStyleWidth}\n reSizesWidth.topicpaneStyleLeft: ${reSizesWidth.topicpaneStyleLeft}\n reSizesWidth.topicpaneStyleWidth: ${reSizesWidth.topicpaneStyleWidth}`); // X -
		document.onmousemove = (event) => { // слушаем событие по всему объекту document
			if (unlockResize === true) {
				getSizesWidth(event); // - получаем размеры в глобальную переменную
				navbox.offsetParent.style.width = reSizesWidth.navpaneStyleWidth + "px";
				topicpane.style.left = reSizesWidth.topicpaneStyleLeft + "px";
				// (i) Отменяем действия браузера по умолчанию - без этого на локальном ПК событие безумно тормозит при изменении размеров элементов
				return false; // - если через обработчик on<событие>
				// event.preventDefault(); // - если через обработчик addEventListener
			}
		};
		// console.log(`2) splitterRight.addEventListener('mousedown'):\n e.target.id: ${e.target.id}\n e.clientX: ${e.clientX}\n navbox.clientWidth: ${navbox.clientWidth}\n navbox.offsetWidth: ${navbox.offsetWidth}\n navpaneWidth: ${navpaneWidth}\n navbox.offsetParent.clientWidth: ${navbox.offsetParent.clientWidth}\n navbox.offsetParent.offsetWidth: ${navbox.offsetParent.offsetWidth}\n topicpaneWidth: ${topicpaneWidth}\n topicpane.clientWidth: ${topicpane.clientWidth}\n topicpane.offsetWidth: ${topicpane.offsetWidth}\n topicpane.offsetLeft: ${topicpane.offsetLeft}\n reSizesWidth.navpaneStyleWidth: ${reSizesWidth.navpaneStyleWidth}\n reSizesWidth.topicpaneStyleLeft: ${reSizesWidth.topicpaneStyleLeft}\n reSizesWidth.topicpaneStyleWidth: ${reSizesWidth.topicpaneStyleWidth}`); // X -
	}, false); // - false - фаза "всплытие"
	// (!) document.addEventListener('mouseup')
	document.addEventListener('mouseup', function (e) {
		if (unlockResize === true) {
			unlockResize = false;
			if (reSizesWidth.navpaneStyleWidth < 300) {
				navbox.offsetParent.style.removeProperty('width'); // - удаляем css св-во
				topicpane.style.removeProperty('left'); // - удаляем css св-во
				// *обновляем значения в переменных
				reSizesWidth.navpaneStyleWidth = 300;
				reSizesWidth.topicpaneStyleLeft = 310;
				reSizesWidth.topicpaneStyleWidth = document.body.offsetWidth - reSizesWidth.topicpaneStyleLeft;
			} else {
				if (reSizesWidth.topicpaneStyleWidth < 500) {
					// *обновляем значения в переменных
					reSizesWidth.navpaneStyleWidth = document.body.offsetWidth - 510;
					reSizesWidth.topicpaneStyleLeft = document.body.offsetWidth - 500;
					reSizesWidth.topicpaneStyleWidth = 500;
				}
				navbox.offsetParent.style.width = reSizesWidth.navpaneStyleWidth + "px";
				topicpane.style.left = reSizesWidth.topicpaneStyleLeft + "px";
			}
			// splitterRight.style.pointerEvents = "initial"; // - св-во позволяет управлять тем, как элементы будут реагировать на события мыши или прикосновения к сенсорному экрану. Применяется для взаимодействия с нижележащими элементами, игнорируя вышележащие.
			/* (?) в1) Не понимаю где правильно прописывать здесь внутри обработчика splitterRight.addEventListener('mouseup') или же вынести за пределы текущего обработчика
			*в2) Почему document.onmouseup срабатывает только при условии если/когда курсор превышает указанные в условии минимальные размеры */
			document.onmouseup = function (event) {
				document.onmousemove = null;
				document.onmouseup = null;
				// console.log(`document.addEventListener('mouseup') --> document.onmouseup:\n event.target.id: ${event.target.id}\n--- the end ---`); // X -
			};
		}
		// console.log(`document.addEventListener('mouseup'):\n e.target.id: ${e.target.id}\n--- the end ---`); // X -
	}, false); // - false - фаза "всплытие"
}); // ready end
// (!) getSizesWidth
function getSizesWidth (event) {
	// *левая панель
	// - получаем ширину внеш.отступа справа
	let navboxMarginRight = parseInt(getComputedStyle(navbox, null).marginRight, 10);
	// отбрасываем "px"
	// navboxMarginRight = parseInt(navboxMarginRight, 10);
	// // navboxMarginRight = parseFloat(navboxMarginRight, 10);
	// // navboxMarginRight = navboxMarginRight.substring(0, navboxMarginRight.length - 2);
	// - получаем ширину внеш.отступа справа
	let navpaneMarginRight = parseInt(getComputedStyle(navbox.offsetParent, null).marginRight, 10);
	// *решение вычисления
	reSizesWidth = {
		navpaneStyleWidth: event.clientX - (navboxMarginRight + (splitterRight.clientWidth / 2)),
		topicpaneStyleLeft: event.clientX + navpaneMarginRight,
		topicpaneStyleWidth: document.body.offsetWidth - (event.clientX + navpaneMarginRight)
	};
	// console.log(`function getSizesWidth:\n event.clientX: ${event.clientX}\n navbox.clientWidth: ${navbox.clientWidth}\n navbox.offsetWidth: ${navbox.offsetWidth}\n navpaneWidth: ${navpaneWidth}\n navbox.offsetParent.clientWidth: ${navbox.offsetParent.clientWidth}\n navbox.offsetParent.offsetWidth: ${navbox.offsetParent.offsetWidth}\n topicpaneWidth: ${topicpaneWidth}\n topicpane.clientWidth: ${topicpane.clientWidth}\n topicpane.offsetWidth: ${topicpane.offsetWidth}\n topicpane.offsetLeft: ${topicpane.offsetLeft}`); // X -

	// console.log(` navboxPaddingRight: ${navboxPaddingRight}\n navboxBorderRight: ${navboxBorderRight}\n navboxMarginRight: ${navboxMarginRight}\n navpanePaddingRight: ${navpanePaddingRight}\n navpaneBorderRight: ${navpaneBorderRight}\n navpaneMarginRight: ${navpaneMarginRight}`); // X -

	// console.log(`reSizesWidth.navpaneStyleWidth: event.clientX - (navboxMarginRight + (splitterRight.clientWidth / 2)):\n reSizesWidth.navpaneStyleWidth: ${event.clientX} - (${navboxMarginRight} + ${splitterRight.clientWidth / 2}) = ${reSizesWidth.navpaneStyleWidth}`); // X -

	// console.log(`reSizesWidth.topicpaneStyleLeft: event.clientX + navpaneMarginRight:\n reSizesWidth.topicpaneStyleLeft: ${event.clientX} + ${navpaneMarginRight} = ${reSizesWidth.topicpaneStyleLeft}`); // X -

	// console.log(`reSizesWidth.topicpaneStyleWidth: document.body.offsetWidth - (event.clientX + navpaneMarginRight):\n reSizesWidth.topicpaneStyleWidth: ${document.body.offsetWidth} - (${event.clientX} + ${navpaneMarginRight}) = ${reSizesWidth.topicpaneStyleWidth}`); // X -
}
// (!) setSizesWidth
function setSizesWidth (navpaneWidth, topicpaneLeft, topicpaneWidth) {
	// console.log(`1) function setSizesWidth(navpaneWidth: ${navpaneWidth}, topicpaneLeft: ${topicpaneLeft}, topicpaneWidth: ${topicpaneWidth}):\n reSizesWidth: ${JSON.stringify(reSizesWidth, null, 1)}\n document.body.offsetWidth: ${document.body.offsetWidth}\n document.body.clientWidth: ${document.body.clientWidth}\n document.documentElement.clientWidth: ${document.documentElement.clientWidth}`); // X -
	if (navpaneWidth < 300) {
		navbox.offsetParent.style.removeProperty('width'); // - удаляем css св-во
		topicpane.style.removeProperty('left'); // - удаляем css св-во
		// *обновляем значения в переменных
		reSizesWidth.navpaneStyleWidth = 300;
		reSizesWidth.topicpaneStyleLeft = 310;
		reSizesWidth.topicpaneStyleWidth = document.documentElement.clientWidth - reSizesWidth.topicpaneStyleLeft;
	} else if (topicpaneWidth < 499) {
		// *обновляем значения в переменных
		reSizesWidth.navpaneStyleWidth = document.documentElement.clientWidth - 510;
		reSizesWidth.topicpaneStyleLeft = document.documentElement.clientWidth - 500;
		reSizesWidth.topicpaneStyleWidth = 500;

		navbox.offsetParent.style.width = reSizesWidth.navpaneStyleWidth + "px";
		topicpane.style.left = reSizesWidth.topicpaneStyleLeft + "px";
	} else {
		navbox.offsetParent.style.width = navpaneWidth + "px";
		topicpane.style.left = topicpaneLeft + "px";
	}

	// console.log(`if (${topicpaneWidth} < 499):\n ф1) reSizesWidth.navpaneStyleWidth = document.body.offsetWidth - 510:\n reSizesWidth.navpaneStyleWidth = ${document.body.offsetWidth} - 510 = ${reSizesWidth.navpaneStyleWidth}\n ф2) reSizesWidth.topicpaneStyleLeft = document.body.offsetWidth - 500: \n reSizesWidth.topicpaneStyleLeft = ${document.body.offsetWidth} - 500 = ${reSizesWidth.topicpaneStyleLeft}\n ф3) reSizesWidth.topicpaneStyleWidth = 500:\n reSizesWidth.topicpaneStyleWidth = ${reSizesWidth.topicpaneStyleWidth}`); // X -

	// console.log(`2) function setSizesWidth(navpaneWidth: ${navpaneWidth}, topicpaneLeft: ${topicpaneLeft}, topicpaneWidth: ${topicpaneWidth}):\n reSizesWidth: ${JSON.stringify(reSizesWidth, null, 1)}\n document.body.offsetWidth: ${document.body.offsetWidth}\n document.body.clientWidth: ${document.body.clientWidth}\n document.documentElement.clientWidth: ${document.documentElement.clientWidth}`); // X -
}