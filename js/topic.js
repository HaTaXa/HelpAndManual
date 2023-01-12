// 'Инициализация переменных
// X // let navToc = false; // - для отслеживания создания навигационных ссылок
// document.addEventListener("DOMContentLoaded", function () {}); // - js. Дожидаемся, когда Объектная модель документа страницы (DOM) будет готова к выполнению кода JavaScript
// (!) *window
window.addEventListener('resize', function (e) {
	resizeTopicContent(); // - изменение размера положения контент-текста
}, false); // - false - фаза "всплытие"
window.addEventListener("load", function () { // - js. Сработает, как только вся страница (изображения или встроенные фреймы), а не только DOM, будет готово
	if (window === top || window.name === "") { // (i) окно элемента яв-ся главным, например, при запуске отдельной страницей или через ctrl+клик из общего проекта
		writeBreadCrumbs([]); // - заполнение топика навигационными ссылками
	} else {
		let vrs = {
			currP: location.href.slice(location.href.lastIndexOf("/") + 1),
			titleP: document.title,
			btnExpand: document.getElementById('idContentText').querySelector('.toggle-hidden') || document.getElementById('idContentText').querySelector('.toggle-shown') ? "idExpandOn" : "idExpandOff", // - если есть скрытый контент, получаем и обновляем состояние кнопки развернуть/свернуть скрытый текст
		};
		if (window.location.origin === "file://") { // - при локальном использовании
			// (i) в Firefox не работает
			let msg = {
				value: "setToolbarButtonsOnOff",
				hmtopicvars: vrs
			};
			window.top.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
		} else {
			setToolbarButtonsOnOff(vrs.btnExpand);
			setUpdateVariables(vrs); // - обновляем некоторые глобальные переменные в variables.js
			let timerId = setInterval(() => {
				let frame = window.top.document.getElementById('hmnavigation').contentWindow || window.top.frames.hmnavigation.contentWindow;
				if (frame !== null || typeof(frame) !== "undefined" || typeof(frame) === "object" || frame === Object(frame)) {
					clearInterval(timerId);
					// (i) если вариант 2, то эта часть кода переносится в гл.окно - index.js
					if (window.top.location.search === "") {
						frame.setVariables(null, vrs.currP); // - обновление глобальных переменных в variables.js
					} else {
						frame.goToPage(null, vrs.currP); // - перейти на страницу выполнив обновление глобальных переменных в variables.js
					} // 'если вариант 2, то эта часть кода переносится в гл.окно - index.js
				}
			}, 500);
			if (window.top.hmtopicvars.msgBox === "enable") {
				setMsgBox(null, window.top.hmtopicvars.msgBtn, window.top.hmtopicvars.msgText); // - заполнение всплывающего окна сообщения
			}
		}
	}
}, false); // - false - фаза "всплытие"
// (!) *document
$(document).ready(function () { // - jq
	if (document !== null && typeof(document) === "object") {
		// 'message
		window.addEventListener("message", (event) => {
			// console.log(`window.addEventListener("message", (event) window.name: ${window.name}):\n location.origin: "${location.origin}" <=> event.origin: "${event.origin}": ${location.origin === event.origin}\n event.origin === 0: ${event.origin === 0}\n event.data: ${JSON.stringify(event.data, null, 1)}`); // X -
			if (event.data.value === "writeBreadCrumbs") {
				writeBreadCrumbs(event.data.breadCrumbs); // - заполнение топика навигационными ссылками
			} else if (event.data.value === "setMsgBox") {
				setMsgBox(event.data.msgBox, event.data.msgBtn, event.data.msgText); // - заполнение всплывающего окна сообщения
				// X // 'через глобальную переменную проверяем созданы ли уже навигационные ссылки, они влияют на вычисление общей высоты idTopicHeader
				// let timerId = setInterval(() => {
				// 	if (navToc) {
				// 		clearInterval(timerId);
				// 		setMsgBox(event.data.msgBox, event.data.msgBtn, event.data.msgText); // - заполнение всплывающего окна сообщения
				// 	} else {
				// 		if (timerId > 25) {
				// 			clearInterval(timerId);
				// 			console.error(`(!) Косяк - не удалось создать всплывающее окно сообщения:\n timerId > ${timerId}`);
				// 			alert(`(!) Косяк - не удалось создать всплывающее окно сообщения, см.консоль.`);
				// 		}
				// 	}
				// }, 100);
			} else if (event.data.value === "setToggleElement") {
				// *развернуть/свернуть скрытый текст
				setToggleElement(null, event.data.btnChecked);
			}
		}, false); // false - фаза "всплытие"
		// 'keyup
		document.addEventListener("keyup", function (event) {
			// console.log(`document.addEventListener("keyup", function (event: ${typeof(event)} / ${event}):\n window.«${window.name}».document.${document.activeElement}\n event:\n 1) event.key: ${event.key}\n event.code: ${event.code}\n event.keyCode: ${event.keyCode}\n event.which: ${event.which}\n 2) typeof(event.target): ${typeof(event.target)}\n event.target: ${event.target})\n Object(event.target): ${Object(event.target)}\n 3) event.target.tagName: ${event.target.tagName}\n event.target.classList: ${event.target.classList}\n document.activeElement: ${document.activeElement}`); // X -

			if (event.key === "Escape" || event.code === "Escape" || event.keyCode === 27 || event.which === 27) {
				if (window.location.origin === "file://") { // - при локальном использовании
					// (i) в Firefox не работает
					let msg = {
						value: "setShowHideWindow",
						winId: ["idPermaLink", "idTabsMenuBox"],
						winHide: "hide"
					};
					window.top.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
				} else {
					let elems = [
						window.top.document.getElementById('idPermaLink'),
						window.top.document.getElementById('idTabsMenuBox')
					];
					elems.forEach(item => {
						if (item.style.display !== "none") {
							if (item.id === "idPermaLink") { clearPermalink(); } // - очищение инфо-подсказок при закрытии окна Постоянная ссылка
							setShowHideWindow(item, 'hide');
						}
					});
				}
			}
		}, false); // false - фаза "всплытие"
		// (!) idNavLinks-навигационные ссылки
		if (document.getElementById('idNavLinks') !== null && typeof (document.getElementById('idNavLinks')) === "object") {
			// 'click
			document.getElementById('idNavLinks').addEventListener("click", function (e) {
				if (e.target.tagName === "A") {
					if (e.target.parentElement.classList.contains('sync-toc-off')) {
						if (location.origin === "file://") {
							let msg = {
								value: "setPushState",
								currP: e.target.getAttribute('href')
							};
							window.top.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
						} else {
							if (window.top.location.search === "") {
								window.top.hmpermalink.url = window.top.location.href + "?" + e.target.getAttribute('href');
							} else {
								window.top.hmpermalink.url = window.top.location.href.replace(window.top.hmtopicvars.currP, e.target.getAttribute('href'));
							}
							window.top.history.pushState('', '', window.top.hmpermalink.url);
						}
					}
				}
			}, false); // - false - фаза "всплытие"
		}
		// (!) idLinksComment
		if (document.getElementById('idLinksComment') !== null && typeof (document.getElementById('idLinksComment')) === "object") {
			// 'click
			document.getElementById('idLinksComment').addEventListener("click", function (e) {
				if (e.target.tagName === "A") {
					if (e.target.id === "idCommentToggle1") {
						showComments();
					}
				}
			}, false); // - false - фаза "всплытие"
		}
		// (!) idMsgBox-всплывающее окно сообщения
		if (document.getElementById('idMsgBox') !== null && typeof (document.getElementById('idMsgBox')) === "object") {
			// 'click
			document.getElementById('idMsgBox').addEventListener("click", function (e) {
				if (e.target.tagName === "DIV") {
					if (e.target.id === "idMsgBtn") {
						toggleMsgBox(e.target); // - переключить всплывающее окно сообщения
					}
				}
			}, false); // - false - фаза "всплытие"
		}
		// (!) idContentText
		if (document.getElementById('idContentText') !== null && typeof (document.getElementById('idContentText')) === "object") {
			// 'click
			document.getElementById('idContentText').addEventListener("click", function (e) {
				if (e.target.tagName === "A") {
					if (e.target.classList.contains('popuplink')) {
						let winProp = 'width=350,height=350,left=' + ((screen.width - 500) / 2) + ',top=' + ((screen.height - 500) / 2) + ',menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
						windowOpen('manualVersion.html', winProp);
					} else if (e.target.classList.contains('dropdown-toggle') || e.target.classList.contains('inline-toggle')) {
						setToggleElement(e.target); // - отображаем/скрываем скрытый контент
					}
				} else if (e.target.tagName === "IMG") {
					if (e.target.classList.contains('toggle-icon')) {
						// *в текущем абзаце отображаем/скрываем каждый скрытый контент
						// **для неск-их сгруппированных скрытых контентов в одном текущем абзаце работает принцип переключателя
						let elem = e.target.parentElement;
						for (let i = 0; i < elem.children.length; i++) {
							if (elem.children[i].classList.contains('toggle-hidden') || elem.children[i].classList.contains('toggle-shown')) {
								if (elem.children[i] !== null && elem.children[i] === Object(elem.children[i])) {
									setToggleElement(elem.children[i]); // - отображаем/скрываем скрытый контент
								}
							}
						}
					}
				}
			}, false); // false - фаза "всплытие"
		}
	}
}); // ready end
// (!) writeBreadCrumbs-заполнение топика навигационными ссылками
function writeBreadCrumbs (navlinks = []) {
	// let elem = document.getElementById('idNavLinks').querySelector('.sync-toc-off');
	let elem = document.getElementById('idNavLinks').querySelector('noscript');
	if (elem === null || typeof (elem) === "undefined" || typeof(elem) !== "object" || elem !== Object(elem)) { // 'не объект/не объект HTMLSpanElement
		console.error(`(!) Косяк - не удалось создать навигационные ссылки:\n function writeBreadCrumbs (navlinks.length: ${navlinks.length}), window.name: ${window.name}:\n 1) elem === null: ${elem === null}\n 2) typeof(elem) === "undefined": ${typeof (elem) === "undefined"}\n 3) typeof(elem) !== "object": ${typeof(elem) !== "object"}\n 4) elem !== Object(elem): ${elem !== Object(elem)}`);
		alert(`(!) Косяк - не удалось создать навигационные ссылки, см.консоль.`);
		return;
	}
	if (navlinks.length === 0) {
		elem.insertAdjacentHTML('afterend', '<span class="sync-toc-off">»Нет темы выше этого уровня«</span>');
		// navToc = true; // X -
	} else if (navlinks.length > 0) {
		let strHTML = "";
		for (let i = 0; i < navlinks.length; i++) {
			if (navlinks.length === i + 1) {
				strHTML = strHTML + '<span class="sync-toc-off"><a href="' + navlinks[i][0] + '" target="hmcontent">' + navlinks[i][1] + '</a>:</span>';
			} else {
				strHTML = strHTML + '<span class="sync-toc-off"><a href="' + navlinks[i][0] + '" target="hmcontent">' + navlinks[i][1] + '</a>&nbsp;&#47;&ensp;</span>';
			}
			// (i) если массив был заполнен добавлением в конец, см.ф.getBreadCrumbs()
			// if (i === 0) {
			// 	strHTML = '<span class="sync-toc-off"><a href="' + navlinks[i][0] + '" target="hmcontent">' + navlinks[i][1] + '</a>:</span>' + strHTML;
			// } else {
			// 	strHTML = '<span class="sync-toc-off"><a href="' + navlinks[i][0] + '" target="hmcontent">' + navlinks[i][1] + '</a>&nbsp;&#47;&ensp;</span>' + strHTML;
			// }
		}
		elem.insertAdjacentHTML('afterend', strHTML);
		// navToc = true; // X -
	}
}
// (!) showComments-см.файл comments.js
function showComments (params) {
	alert(`(i) Функция показать комментарий(-и) пока что в разработке.`);
}
// (!) writeCommentLink-см.файл comments.js
function writeCommentLink (params) { }
// (!) getValElemProp-получить значения св-ва элемента
function getValElemProp (elem) {
	if (elem === null || typeof (elem) === "undefined" && typeof (elem) !== "object" || elem !== Object(elem)) {
		console.error(`(!) Косяк - не удалось получить значения св-ва элемента:\n function getValElemProp (elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк - не удалось получить значения св-ва элемента, см.консоль.`);
		return;
	}
	let elemValues = {
		height: parseInt(getComputedStyle(elem, null).height, 10),
		margin: {
			top: parseInt(getComputedStyle(elem, null).marginTop, 10),
			bottom: parseInt(getComputedStyle(elem, null).marginBottom, 10),
		},
		padding: {
			top: parseInt(getComputedStyle(elem, null).paddingTop, 10),
			bottom: parseInt (getComputedStyle(elem, null).paddingBottom, 10),
		},
		border: {
			top: parseInt(getComputedStyle(elem, null).borderTop, 10),
			bottom: parseInt(getComputedStyle(elem, null).borderBottom, 10),
		},
	};
	// console.log(`function getValElemProp (elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem} / ${elem.id}):\n elemValues: ${JSON.stringify(elemValues, null, 1)}`); // X -
	return elemValues.height + elemValues.margin.top + elemValues.margin.bottom + elemValues.padding.top + elemValues.padding.bottom + elemValues.border.top + elemValues.border.bottom;
}
// (!) resizeTopicContent-изменение размера положения контент-текста
function resizeTopicContent () {
	let elem = document.getElementById('idTopicHeader');
	let headerHeight = getValElemProp(elem);
	if (typeof (headerHeight) === "undefined") {
		headerHeight = 0;
	}
	elem = document.getElementById('idMsgBox');
	let msgHeight = getValElemProp(elem);
	// console.log(`function resizeTopicContent ():\n elem: ${typeof (elem)} / ${elem}\n msgHeight: isNaN(${isNaN(msgHeight)} / typeof(${typeof (msgHeight)}) / msgHeight = null: ${msgHeight === null})`); // X -
	// *важно проверять на isNaN, т.к.может оказаться NAN
	if (isNaN(msgHeight) && typeof (msgHeight) === "number" || typeof (msgHeight) === "undefined") {
		msgHeight = 0;
	}
	elem = document.getElementById('idTopicFooter');
	let footerHeight = getValElemProp(elem);
	if (typeof (footerHeight) === "undefined") {
		footerHeight = 0;
	}
	let topicContent = {
		top: headerHeight + msgHeight,
		bottom: footerHeight
	};
	// console.log(`function resizeTopicContent ():\n headerHeight: ${headerHeight}\n msgHeight: ${msgHeight}\n footerHeight: ${footerHeight}\n--- итого ---\n topicContent: ${JSON.stringify(topicContent, null, 1)}`); // X -
	if (JSON.stringify(topicContent) === {}) {
		console.error(`(!) Косяк - не удалось изменить размеры положения контент-текста:\n function resizeTopicContent ()\n topicContent: ${JSON.stringify(topicContent, null, 1)}`);
		alert(`(!) Косяк - не удалось изменить размеры положения контент-текста, см.консоль.`);
		return;
	}
	elem = document.getElementById('idTopicContent');
	// console.log(`parseInt(getComputedStyle(elem, null).top, 10)): ${parseInt(getComputedStyle(elem, null).top, 10)}\n parseInt(getComputedStyle(elem, null).bottom, 10)): ${parseInt(getComputedStyle(elem, null).bottom, 10)}`); // X -
	elem.style.top = topicContent.top + "px";
	elem.style.bottom = topicContent.bottom + "px";
}
// (!) setMsgBox-заполнение всплывающего окна сообщения
function setMsgBox(msgBox = "enable", msgBtn = false, msgText = "") {
	if (msgBox === "disable") return; // (i) в условии намеренно не используется проверка на null/""/undefined, чтобы в переменной аргумента этот параметр можно было опускать как необязательный
	if (msgText === "") {
		console.error(`(!) Косяк - не удалось создать всплывающее окно сообщения:\n function setMsgBox (msgBox = "${msgBox}", msgText = "${msgText}", msgBtn = ${msgBtn})`);
		alert(`(!) Косяк - не удалось создать всплывающее окно сообщения. Отсутствует информационный текст, см.консоль.`);
		return;
	}
	let elem = document.getElementById('idMsgBox');
	if (elem !== null && elem === Object(elem)) { // 'объект HTMLDivElement
		document.getElementById('idMsgText').innerHTML = msgText;
		document.getElementById('idMsgBtn').innerHTML = "«";
		if (msgBtn) {
			document.getElementById('idMsgContent').removeAttribute('style');
			document.getElementById('idMsgBtn').classList.add('msg-show');
			document.getElementById('idMsgBtn').classList.remove('msg-hide');
		} else {
			document.getElementById('idMsgContent').style.display = "none";
			document.getElementById('idMsgBtn').classList.add('msg-hide');
			document.getElementById('idMsgBtn').classList.remove('msg-show');
		}
		elem.removeAttribute('style');
		resizeTopicContent(); // - изменение размера положения контент-текста
	}
}
// X writeMsgBox-создать всплывающее окно сообщения
function writeMsgBox (msgBox = "enable", msgBtn = false, msgText = "") {
	if (msgBox === "disable") return; // (i) в условии намеренно не используется проверка на null/""/undefined, чтобы в переменной аргумента этот параметр можно было опускать как необязательный
	if (msgText === "") {
		console.error(`(!) Косяк - не удалось создать всплывающее окно сообщения:\n function writeMessage (msgText = "${msgText}")`);
		alert(`(!) Косяк - не удалось создать всплывающее окно сообщения. Отсутствует информационный текст, см.консоль.`);
		return;
	}
	// *проверяем существование узла, если он существует, назначаем ему обработчик события, если нет, создаем его.
	if (document.getElementById('idMsgBox') === null && document.getElementById('idMsgBox') !== Object(document.getElementById('idMsgBox'))) { // 'НЕ объект HTMLDivElement
		let elem = document.getElementById('idTopicContent');
		if (elem === null || typeof (elem) === "undefined" || typeof (elem) !== "object" || elem !== Object(elem)) {
			console.error(`(!) Косяк - не удалось определить положение для вставки всплывающего окна сообщения:\n function writeMsgBox (msgBox = "${msgBox}", msgBtn = ${msgBtn}, msgText = "${msgText}"):\n elem: ${elem} / typeof(${typeof (elem)}) / ${Object(elem)}`);
			alert(`(!) Косяк - не удалось определить положение для вставки всплывающего окна сообщения, см.консоль.`);
			return;
		}
		// *добавляем узел
		if (msgBtn) {
			elem.insertAdjacentHTML('beforebegin', '<div id="idMsgBox" class="msg-box"><div id="idMsgContent" class="msg-content"><div id="idMsgImg" class="msg-info"></div><div id="idMsgText" class="msg-text"><p>' + msgText + '</p></div></div><div id="idMsgBtn" class="msg-btn msg-show" title="Скрыть/Показать информационное сообщение">«</div></div>');
		} else {
			elem.insertAdjacentHTML('beforebegin', '<div id="idMsgBox" class="msg-box"><div id="idMsgContent" class="msg-content" style="display: none;"><div id="idMsgImg" class="msg-info"></div><div id="idMsgText" class="msg-text"><p>' + msgText + '</p></div></div><div id="idMsgBtn" class="msg-btn msg-hide" title="Скрыть/Показать информационное сообщение">«</div></div>');
		}
	}
	// *создаем обработчик события
	document.getElementById('idMsgBox').addEventListener("click", function (e) {
		if (e.target.tagName === "DIV") {
			if (e.target.id === "idMsgBtn") {
				toggleMsgBox(e.target); // - переключить всплывающее окно сообщения
			}
		}
	}, false); // - false - фаза "всплытие"
	resizeTopicContent(); // - изменение размера положения контент-текста
}
// (!) toggleMsgBox-переключить всплывающее окно сообщения
function toggleMsgBox (elem) {
	if (elem === null || typeof (elem) === "undefined" && typeof (elem) !== "object" || elem !== Object(elem)) {
		console.error(`(!) Косяк - не удалось скрыть/показать всплывающее окно сообщения:\n function toggleMsgBox (elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})`);
		alert(`(!) Косяк - не удалось скрыть/показать всплывающее окно сообщения, см.консоль.`);
		return;
	}
	if (elem.classList.contains('msg-show')) {
		elem.classList.replace('msg-show', 'msg-hide');
		setShowHideWindow(document.getElementById('idMsgContent'), 'hide');
		// *обновление глобальной переменной в variables.js
		if (window.location.origin === "file://") { // - при локальном использовании
			// (i) в Firefox не работает
			let msg = {
				value: "msgBtnUpdate",
				msgBtn: false
			};
			window.top.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
		} else {
			window.top.hmtopicvars.msgBtn = false;
		}
	} else if (elem.classList.contains('msg-hide')) {
		elem.classList.replace('msg-hide', 'msg-show');
		setShowHideWindow(document.getElementById('idMsgContent'), 'show');
		// *обновление глобальной переменной в variables.js
		if (window.location.origin === "file://") { // - при локальном использовании
			// (i) в Firefox не работает
			let msg = {
				value: "msgBtnUpdate",
				msgBtn: true
			};
			window.top.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
		} else {
			window.top.hmtopicvars.msgBtn = true;
		}
	} else {
		console.error(`(!) Косяк - не удалось изменить элементу класс:\n function toggleMsgBox (elem: ${elem.tagName}, ${elem.id}):\n elem.classList: ${JSON.stringify(elem.classList, null, 1)}`);
		alert(`(!) Косяк - не удалось изменить элементу класс, см.консоль.`);
		return;
	}
	resizeTopicContent(); // - изменение размера положения контент-текста
}
// (!) setHideLightbox-скрыть окно просмотра изо - текущий lightbox
function setHideLightbox(elem) {
	if (elem === null || typeof(elem) === "undefined" || elem !== Object(elem) || typeof(elem) !== "object" || elem === null && typeof(elem) === "object") {
		console.error(`(!) Косяк: не удалось закрыть окно просмотра изо - переменная аргумента не определена:\n setHideLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window.name: ${window.name})`);
		alert(`(!) Косяк: не удалось закрыть окно просмотра изображений - переменная аргумента не определена, см.консоль.`);
		return;
	}
	// 'elem - lightbox-btn-close
	let lbx = null;
	let tgl = elem;
	while (!tgl.classList.contains('toggle-content')) {
		tgl = tgl.parentElement;
		if (tgl.tagName === "BODY" || tgl.id === "idContentText") {
			console.error(`(!) Косяк: не удалось закрыть окно просмотра изо - не найден элемент:\n setHideLightbox(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window.name: ${window.name}):\n tgl: 1) ${tgl}\n 2) typeof(tgl): ${typeof(tgl)}\n 3) Object(tgl): ${Object(tgl)}`);
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
		if (el !== null || typeof(el) !== "undefined" || el === Object(el) || typeof(el) === "object" || el === null && typeof(el) === "object") {
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
		if (lnk !== null || typeof(lnk) !== "undefined" || lnk === Object(lnk) || typeof(lnk) === "object" || lnk === null && typeof(lnk) === "object") {
			lnk.classList.remove('toggle-shown');
			lnk.classList.add('toggle-hidden');
		}
	}
	// *проверяем видимость др.lightbox's, кот.вложенны в toggle-content для текущего абзаца, если есть хотя бы 1 раскрытый lightbox, toggle-content остается видимым
	if (getLightboxVisible(tgl)) {
		tgl.classList.remove('toggle-collapse'); // - отображаем div toggle-content
		lbx.focus();
		// setFocusLightbox(lbx, "add"); // - фокусировка на lightbox
	} else {
		tgl.classList.add('toggle-collapse'); // - скрываем div toggle-content
		setEventHandlersLightbox(lbx, "remove"); // - создание/удаление обработчиков событий для узла lightbox
		lbx.blur();
		// setFocusLightbox(lbx, "remove"); // - фокусировка на lightbox
	}
	// *проверяем существование (existence) элемента img - иконка в абзаце
	let icon = tgl.previousElementSibling.querySelector('.toggle-icon');
	if (icon !== null && icon === Object(icon)) setToggleIcon(icon); // - меняем иконку, если она есть
}