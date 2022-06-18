// document.addEventListener("DOMContentLoaded", function () {}); // - js. Дожидаемся, когда Объектная модель документа страницы (DOM) будет готова к выполнению кода JavaScript
// (!) *window
window.addEventListener("load", function () { // - js. Сработает, как только вся страница (изображения или встроенные фреймы), а не только DOM, будет готово
	if (window === top || window.name === "") { // (i) при запуске отдельной страницей (ctrl+клик), т.к.в этом случае окно уже будет являться главным
		writeBreadCrumbs([]); // - заполнение топика навигационными ссылками
	} else {
		let vrs = {
			currP: location.href.slice(location.href.lastIndexOf("/") + 1),
			titleP: document.title,
			btnExpand: document.getElementById('idContentText').querySelector('.toggle-hidden') || document.getElementById('idContentText').querySelector('.toggle-shown') ? "idExpandOn" : "idExpandOff", // - если есть скрытый контент получаем и обновляем состояние кнопки развернуть/свернуть скрытый текст
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
			// (i) если вариант 2, то эта часть кода переносится в гл.окно - index.js
			if (window.top.location.search === "") {
				window.top.document.getElementById('hmnavigation').contentWindow.setVariables(null, vrs.currP); // - обновление глобальных переменных в variables.js
			} else {
				window.top.document.getElementById('hmnavigation').contentWindow.goToPage(null, vrs.currP); // - перейти на страницу выполнив обновление глобальных переменных в variables.js
			} // 'если вариант 2, то эта часть кода переносится в гл.окно - index.js
		}
	}
}, false); // - false - фаза "всплытие"
// (!) *document
$(document).ready(function () { // - jq
	if (document !== null && typeof(document) === "object") {
		// (!) message
		window.addEventListener("message", (event) => {
			if (event.data.value === "writeBreadCrumbs") {
				writeBreadCrumbs(event.data.breadCrumbs); // - заполнение топика навигационными ссылками
			} else if (event.data.value === "setToggleElement") {
				// *развернуть/свернуть скрытый текст
				let elements = null;
				if (event.data.btnChecked) {
					elements = document.getElementsByClassName('toggle-hidden');
				} else {
					elements = document.getElementsByClassName('toggle-shown');
				}
				if (elements !== null && typeof (elements) !== "undefined" && typeof (elements) === "object") {
					for (let i = elements.length - 1; i >= 0; i--) {
						setToggleElement(elements[i]);
					}
				}
			}
		}, false); // - false - фаза "всплытие"
		// (!) keyup
		document.addEventListener("keyup", function (event) {
			if (event.key === "Escape" || event.code === "Escape" || event.keyCode === 27 || event.which === 27) {
				// console.log(`document.addEventListener("keyup", function (event):\n window.location.origin: ${window.location.origin}`); // X -
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
							if (item.id === "idPermaLink") { permaLinkDefault(); } // - очищение инфо-подсказок при закрытии окна Постоянная ссылка
							setShowHideWindow(item, 'hide');
						}
					});
				}
			}
		}, false); // - false - фаза "всплытие"
		// (!) idBreadCrumbs-навигационные ссылки
		if (document.getElementById('idBreadCrumbs') !== null && typeof (document.getElementById('idBreadCrumbs')) === "object") {
			// 'click
			document.getElementById('idBreadCrumbs').addEventListener("click", function (e) {
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
		// (!) idContentText
		if (document.getElementById('idContentText') !== null && typeof (document.getElementById('idContentText')) === "object") {
			// 'click
			document.getElementById('idContentText').addEventListener("click", function (e) {
				if (e.target.tagName === "A") {
					if (e.target.classList.contains('popuplink')) {
						let winProp = 'width=350,height=350,left=' + ((screen.width - 500) / 2) + ',top=' + ((screen.height - 500) / 2) + ',menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
						windowOpen('manualVersion.html', winProp);
					} else if (e.target.classList.contains('dropdown-toggle') || e.target.classList.contains('inline-toggle')) {
						setToggleElement(e.target.parentElement);
					}
				} else if (e.target.tagName === "IMG") {
					if (e.target.classList.contains('toggle-icon')) {
						setToggleElement(e.target.parentElement);
					}
				}
			}, false); // - false - фаза "всплытие"
		}
	}
}); // ready end
// (!) writeBreadCrumbs-заполнение топика навигационными ссылками
function writeBreadCrumbs (navlinks = []) {
	let elem = document.getElementById('idBreadCrumbs').querySelector('.sync-toc-off');
	if (elem === null || typeof (elem) === "undefined" || typeof(elem) !== "object" || elem !== Object(elem)) { // 'не объект/не объект HTMLSpanElement
		console.error(`function writeBreadCrumbs (navlinks.length: ${navlinks.length}), window.name: ${window.name}:\n 1) elem === null: ${elem === null}\n 2) typeof(elem) === "undefined": ${typeof (elem) === "undefined"}\n 3) typeof(elem) !== "object": ${typeof(elem) !== "object"}\n 4) elem !== Object(elem): ${elem !== Object(elem)}`);
		alert(`(!) Косяк - не удалось создать навигационные ссылки, см.консоль.`);
		return;
	}
	if (navlinks.length === 0) {
		elem.insertAdjacentHTML('afterend', '<span class="sync-toc-off">»Нет темы выше этого уровня«</span>');
	} else if (navlinks.length > 0) {
		let strHTML = "";
		for (let i = 0; i < navlinks.length; i++) {
			if (navlinks.length === i + 1) {
				strHTML = strHTML + '<span class="sync-toc-off"><a href="' + navlinks[i][0] + '" target="hmcontent">' + navlinks[i][1] + '</a></span>';
			} else {
				strHTML = strHTML + '<span class="sync-toc-off"><a href="' + navlinks[i][0] + '" target="hmcontent">' + navlinks[i][1] + '</a>&nbsp;&#47;&nbsp;</span>';
			}
			// (i) если массив был заполнен добавлением в конец, см.ф.getBreadCrumbs()
			// if (i === 0) {
			// 	strHTML = '<span class="sync-toc-off"><a href="' + navlinks[i][0] + '" target="hmcontent">' + navlinks[i][1] + '</a></span>' + strHTML;
			// } else {
			// 	strHTML = '<span class="sync-toc-off"><a href="' + navlinks[i][0] + '" target="hmcontent">' + navlinks[i][1] + '</a>&nbsp;&#47;&nbsp;</span>' + strHTML;
			// }
		}
		elem.insertAdjacentHTML('afterend', strHTML);
	}
}
// (!) showComments-см.файл comments.js
function showComments (params) {
	alert(`(i) Функция показать комментарий(-и) пока что в разработке.`);
}
// (!) writeCommentLink-см.файл comments.js
function writeCommentLink (params) {}