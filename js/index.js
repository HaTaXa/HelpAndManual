// document.addEventListener("DOMContentLoaded", function () {}, false); // - js. Дожидаемся, когда Объектная модель документа страницы (DOM) будет готова к выполнению кода JavaScript
// (!) *window
window.addEventListener('resize', function (e) {
	resizePanels(); // BUG: нет стабильности положения ширины - панели все время дергаются
}, false); // - false - фаза "всплытие"
window.addEventListener("load", function () { // - js. Сработает, как только вся страница (изображения или встроенные фреймы), а не только DOM, будет готово
	// X обработчик события resize прописываем здесь, т.к.заранее не известно когда и как будут/были загружены панели idNavPane & idTopicPane
	// window.addEventListener('resize', resizePanels);
	// *обновляем глобальные переменные в variables.js
	// (i) если вариант 1
	if (hmpermalink.url !== location.href) { // 'перестраховка
		hmpermalink.url = location.href;
	}
	if (location.search !== "") {
		if (hmtopicvars.currP !== location.search.replace("?", "")) {
			hmtopicvars.currP = hmnavpages.def = hmnavpages.query = window.location.search.substring(1).replace(/:/g, "");
		}
	}
	// (i) если вариант 2
	// if (hmpermalink.url !== location.href) {
	// 	hmpermalink.url = location.href;
	// }
	// if (location.origin === "file://") {
	// 	let msg = {
	// 		value: location.search === "" ? "setVariables" : "goToPage",
	// 		currP: hmtopicvars.currP
	// 	};
	// 	frames.hmnavigation.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
	// } else {
	// 	if (location.search === "") {
	// 		document.getElementById('hmnavigation').contentWindow.setVariables(null, hmtopicvars.currP); // - обновление глобальных переменных в variables.js
	// 	} else {
	// 		if (hmtopicvars.currP !== location.search.replace("?", "")) {
	// 			hmtopicvars.currP = hmnavpages.def = hmnavpages.query = window.location.search.substring(1).replace(/:/g, "");
	// 		}
	// 		document.getElementById('hmnavigation').contentWindow.goToPage(null, hmtopicvars.currP); // - перейти на страницу выполнив обновление глобальных переменных в variables.js
	// 	}
	// }
}, false); // false - фаза "всплытие"
// (!) *document
$(document).ready(function () { // - jq
	if (document !== null && typeof (document) === "object") {
		// (!) message
		window.addEventListener("message", (event) => {
			// console.log(`window.addEventListener("message", (event) гл.окно), location.origin: ${location.origin}:\n event.origin === 0: ${event.origin === 0}\n event.data: ${JSON.stringify(event.data, null, 1)}`); // X -
			if (event.data.value === "setPushState") {
				if (location.search === "") {
					hmpermalink.url = location.href + "?" + event.data.currP;
				} else {
					hmpermalink.url = location.href.replace(hmtopicvars.currP, event.data.currP);
				}
				window.history.pushState("", "", hmpermalink.url);
			} else if (event.data.value === "setToolbarButtonsOnOff") {
				// *обновляем некоторые глобальные переменные в variables.js из hmcontent
				setUpdateVariables(event.data.hmtopicvars);
				setToolbarButtonsOnOff(event.data.hmtopicvars.btnExpand);
				// (i) если вариант 1
				// *обновляем остальную часть глобальных переменных в variables.js через hmnavigation
				let msg = {
					value: location.search === "" ? "setVariables" : "goToPage",
					currP: hmtopicvars.currP || event.data.hmtopicvars.currP
				};
				frames.hmnavigation.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
				if (hmtopicvars.msgBox === "enable") {
					// *возвращаемся обратно в источник hmcontent, передаем значения глобальных переменных из variables.js и создаем информационное сообщение
					delete msg.currP; // - удаляем св-во в объекте
					msg.value = "setMsgBox"; // - изменяем значение св-ва в объекте
					// *создаем/добавляем новое св-во в объекте - 2 способа:
					msg.msgBox = hmtopicvars.msgBox;
					msg.msgBtn = hmtopicvars.msgBtn;
					msg["msgText"] = hmtopicvars.msgText;
					event.source.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
				}
			} else if (event.data.value === "setUpdateVariables") {
				// *обновляем глобальные переменные из hmnavigation
				if (location.search === "") {
					setToolbarButtonsOnOff(hmtopicvars.btnExpand);
				} else {
					setUpdateVariables(
						event.data.hmtopicvars,
						event.data.hmnavpages,
						event.data.hmpermalink
					);
					let tab = document.getElementById('idTopicTab');
					if (tab !== null && typeof (tab) === "object") {
						if (tab.classList.contains('topic-tab-current')) {
							setToolbarButtonsOnOff(hmtopicvars.btnExpand);
						} else {
							setTabShowHide(tab, 'show'); // - показать/скрыть текущую вкладку
						}
					}
				}
				setUpdateElements(); // - обновляем группу кнопок навигации на пан.инструментов (домой/назад/вперед), вкладку главная и ссылку на актуальную тему в меню вкладок на пан.тема топика
				// *идем в hmcontent создавать навигационные ссылки
				let msg = {
					value: "writeBreadCrumbs",
					breadCrumbs: hmnavpages.breadCrumbs
				};
				frames.hmcontent.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
			} else if (event.data.value === "msgBtnUpdate") {
				hmtopicvars.msgBtn = event.data.msgBtn; // - обновляем глобальную переменную в variables.js
			} else if (event.data.value === "setImageFullScreen") {
				// 'image full screen - вывод текущего lightbox в гл.окне
				console.log(`event.data: \n 1) .value: ${event.data.value}\n 2) .clone: ${event.data.clone}\n---\n event.data.clone.classList: ${event.data.clone.classList}\n event.data.clone === null: ${event.data.clone === null}\n typeof(event.data.clone): ${typeof(event.data.clone)}\n event.data.clone === Object(event.data.clone): ${event.data.clone === Object(event.data.clone)}\n (event.data.clone === null && typeof(event.data.clone) === "object"): ${event.data.clone === null && typeof(event.data.clone) === "object"}\n---`); // X -
				// (i) нельзя передать узел/копию DOM-элемента в другое окно/фрейм, см.спецификацию
				setImageFullScreen(event.data.clone); // - создать изо.во весь экран
			} else if (event.data.value === "setShowHideWindow") {
				// *по нажатию на esc скрываем всплывающие окна permalink/tabsmenubox
				// for (let i = 0; i < event.data.msg1.length; i++) {
				// 	setShowHideWindow(document.getElementById(event.data.msg1[i]), event.data.msg2);
				// }
				event.data.winId.forEach((itemId) => {
					if (document.getElementById(itemId).style.display !== "none") {
						if (itemId === "idPermaLink") { clearPermalink(); } // - очищение инфо-подсказок при закрытии окна Постоянная ссылка
						setShowHideWindow(document.getElementById(itemId), event.data.winHide);
					}
				});
			}
		}, false); // false - фаза "всплытие"
		// (!) hashchange
		window.addEventListener("hashchange", () => {
			// console.log(`window.addEventListener("hashchange", () => {} гл.окно):\n .href: ${window.top.document.location.href}\n .hash: ${window.top.location.hash}\n .hash.length: ${window.top.location.hash.length}`); // X -
			// *убираем hash из адресной строки в главном окне при клике по вкладкам
			// if (window !== top) return;
			if (window.top.location.hash.length > 0) {
				if (window.top.location.hash === "#topictablink" || window.top.location.hash === "#indextablink" || window.top.location.hash === "#searchtablink") {
					// let url = window.top.location.href.substring(0, window.top.location.href.length - window.top.location.hash.length);
					let url = window.top.document.location.href.toString().replace(/\#.*$/, "");
					window.top.history.pushState("", "", url);
					// window.top.location.hash = "";
					// console.log(`window.addEventListener("hashchange", () => {} гл.окно):\n url: ${url}\n .hash: ${window.top.location.hash}\т --- the end ---`); // X -
				}
			}
		}, false); // false - фаза "всплытие"
		// (!) keyup
		document.addEventListener("keyup", function (event) {
			if (event.key === "Escape" || event.code === "Escape" || event.keyCode === 27 || event.which === 27) {
				// console.log(`document.addEventListener("keyup", function (event: ${typeof(event)} / ${event}):\n window.«${window.name}».document.${document.activeElement}\n event:\n 1) event.key: ${event.key}\n event.code: ${event.code}\n event.keyCode: ${event.keyCode}\n event.which: ${event.which}\n 2) typeof(event.target): ${typeof(event.target)}\n event.target: ${event.target})\n Object(event.target): ${Object(event.target)}\n 3) event.target.tagName: ${event.target.tagName}\n event.target.classList: ${event.target.classList}`); // X -

				// (!) закрыть окно "Постоянная ссылка"
				let permalink = document.getElementById('idPermaLink');
				if (permalink !== null && typeof(permalink) !== "undefined" && permalink === Object(permalink)) {
					if (permalink.style.display !== "none") {
						clearPermalink(); // - очищение инфо-подсказок при закрытии окна Постоянная ссылка
						setShowHideWindow(permalink, 'hide');
					}
				}
				// (!) закрыть окно "Меню вкладок"
				let tabsMenuBox = document.getElementById('idTabsMenuBox');
				if (tabsMenuBox !== null && typeof(tabsMenuBox) !== "undefined" && tabsMenuBox === Object(tabsMenuBox)) {
					if (tabsMenuBox.style.display !== "none") {
						// TODO: 'сделать плавно
						setShowHideWindow(tabsMenuBox, 'hide');
					}
				}
			}
		}, false); // false - фаза "всплытие"
		// (i)---
		// (!)*idPermaLink-всплывающее окно "Постоянная ссылка". Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
		if (document.getElementById('idPermaLink') !== null || typeof(document.getElementById('idPermaLink')) !== "undefined" && document.getElementById('idPermaLink') === Object(document.getElementById('idPermaLink'))) {
			// 'click
			document.getElementById('idPermaLink').addEventListener("click", function (e) {
				if (e.target.tagName === "DIV") {
					// (!) idPermaLinkClose-кнопка закрыть всплывающее окно Постоянная ссылка
					if (e.target.id === "idPermaLinkClose") {
						let permalink = e.target;
						while (permalink.id !== "idPermaLink") {
							permalink = permalink.parentElement;
							if (permalink.tagName === "BODY") {break;}
						}
						if (permalink.id === "idPermaLink") {
							clearPermalink(); // - очищение инфо-подсказок при закрытии окна Постоянная ссылка
							setShowHideWindow(permalink, 'hide');
						}
					}
				} else if (e.target.tagName === "INPUT") {
					// (!) idPermaLinkCopy-кнопка скопировать
					if (e.target.id === "idPermaLinkCopy") {
						let textArea = document.getElementById('idTextArea');
						if (textArea !== null && typeof (textArea) === "object" || textArea === Object(textArea)) {
							if (textArea.value === "") {
								e.target.value = "Copy failed";
								textArea.labels[0].innerHTML = hmpermalink.copyError;
								textArea.labels[0].classList.remove('permalink-info');
								textArea.labels[0].classList.add('permalink-error');
							} else {
								if (setCopyToClipboard(textArea)) {
									e.target.value = "Скопировано";
									textArea.labels[0].innerHTML = hmpermalink.copyInfo;
									textArea.labels[0].classList.remove('permalink-error');
									textArea.labels[0].classList.add('permalink-info');
								} else {
									e.target.value = "Copy failed";
									textArea.labels[0].innerHTML = hmpermalink.copyError;
									textArea.labels[0].classList.remove('permalink-info');
									textArea.labels[0].classList.add('permalink-error');
								}
								setTimeout(() => {
									e.target.value = "Копировать";
								}, 2000);
							}
						}
					}
					// (!) idPermaLinkBookmark-кнопка в закладки
					else if (e.target.id === "idPermaLinkBookmark") {
						let textArea = document.getElementById('idTextArea');
						if (textArea !== null && typeof (textArea) === "object") {
							if (textArea.value === "") {
								e.target.value = "Bookmark failed";
								textArea.labels[0].innerHTML = hmpermalink.bookmarkError;
								textArea.labels[0].classList.remove('permalink-info');
								textArea.labels[0].classList.add('permalink-error');
							} else {
								if (setPermaLinkBtnBookmark(textArea)) {
									e.target.value = "Добавлено";
									textArea.labels[0].innerHTML = hmpermalink.bookmarkInfo;
									textArea.labels[0].classList.remove('permalink-error');
									textArea.labels[0].classList.add('permalink-info');
								} else {
									e.target.value = "Bookmark failed";
									textArea.labels[0].innerHTML = hmpermalink.bookmarkError;
									textArea.labels[0].classList.remove('permalink-info');
									textArea.labels[0].classList.add('permalink-error');
								}
								setTimeout(() => {
									e.target.value = "В закладки";
								}, 2000);
							}
						}
					}
				}
			}, false); // false - фаза "всплытие"
		}
		// (i)---
		// (i)*idToolbar-События на панеле инструментов. Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
		if (document.getElementById('idToolbar') !== null && typeof (document.getElementById('idToolbar')) === "object") {
			// (i) mouseover/mouseout-наведение курсора
			document.getElementById('idToolbar').addEventListener("mouseover", function (e) {
				if (e.target.tagName === "IMG") {
					// (!) idFeedBackOn-кнопка e-mail
					if (e.target.id === "idFeedBackOn") {
						// e.target.setAttribute('src', 'icon/support.gif');
						e.target.src = "icon/support.gif";
					}
				}
			}, false); // false - фаза "всплытие"
			document.getElementById('idToolbar').addEventListener("mouseout", function (e) {
				if (e.target.tagName === "IMG") {
					// ! idFeedBackOn-кнопка e-mail
					if (e.target.id === "idFeedBackOn") {
						// e.target.setAttribute('src', 'icon/emailon.png');
						e.target.src = "icon/emailon.png";
					}
				}
			}, false); // false - фаза "всплытие"
			// (i) change
			document.getElementById('idToolbar').addEventListener("change", function (e) {
				if (e.target.tagName === "INPUT") {
					// (i) toolbar-search
					// (!) idToolbarNavShowHide-checkbox Скрыть/Показать панель навигации
					if (e.target.id === "idToolbarNavShowHide") {
						// $('#idTopicPaneNavShowHide').prop('checked', e.target.checked);
						document.getElementById('idTopicPaneNavShowHide').checked = e.target.checked; // - синхронизируем состояние checked
					}
				}
			}, false); // false - фаза "всплытие"
			// (i) click
			document.getElementById('idToolbar').addEventListener("click", function (e) {
				if (e.target.tagName === "INPUT") {
					// (i) toolbar-search
					// (!) idToolbarNavShowHide-checkbox Скрыть/Показать панель навигации
					if (e.target.id === "idToolbarNavShowHide") {
						setNavPaneShowHide(!e.target.checked); // - делаем "инверсию" значения св-ва
					}
					// 'toolbar-center
					// (!) idBannerShowHide-кнопка Показать/Скрыть баннер
					else if (e.target.id === "idBannerShowHide") {
						setBannerShowHide(!e.target.checked); // - делаем инверсию значения, т.к.на событии click значение e.target.checked уже изменено
						// *создаем обработчик события, чтобы удалить css св-во "animation" по окончанию воспроизведения анимации, иначе она больше не будет воспроизводиться
						// 'idBanner
						let banner = document.getElementById('idBanner');
						if (banner !== null || typeof(banner) !== "undefined" && typeof(banner) === "object" || banner === Object(banner)) {
							banner.addEventListener("animationend", (event) => {
								event.target.style.removeProperty('animation'); // - удаляем css св-во
							}, false); // false - фаза "всплытие"
						}
						// 'idToolbar
						let toolbar = document.getElementById('idToolbar');
						if (toolbar !== null || typeof(toolbar) !== "undefined" && typeof(toolbar) === "object" || toolbar === Object(toolbar)) {
							toolbar.addEventListener("animationend", (event) => {
								event.target.style.removeProperty('animation'); // - удаляем css св-во
							}, false); // false - фаза "всплытие"
						}
						// 'idNavPane
						let navpane = document.getElementById('idNavPane');
						if (navpane !== null || typeof(navpane) !== "undefined" && typeof(navpane) === "object" || navpane === Object(navpane)) {
							navpane.addEventListener("animationend", (event) => {
								event.target.style.removeProperty('animation'); // - удаляем css св-во
							}, false); // false - фаза "всплытие"
						}
						// 'idTopicPane
						let topicpane = document.getElementById('idTopicPane');
						if (topicpane !== null || typeof(topicpane) !== "undefined" && typeof(topicpane) === "object" || topicpane === Object(topicpane)) {
							topicpane.addEventListener("animationend", (event) => {
								event.target.style.removeProperty('animation'); // - удаляем css св-во
							}, false); // false - фаза "всплытие"
						}
					}
					// (!) idTextExpandCollapse-кнопка Развернуть/Свернуть скрытый контент
					else if (e.target.id === "idTextExpandCollapse") {
						if (location.origin === "file://") { // - при локальном использовании
							// (i) в Firefox не работает
							let msg = {
								value: "setToggleElement",
								btnChecked: e.target.checked
							};
							frames.hmcontent.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
						} else {
							document.getElementById('hmcontent').contentWindow.setToggleElement(null, e.target.checked);
						}
					}
				} else if (e.target.tagName === "IMG") {
					// 'toolbar-search
					// (!) idQuickSearchOn-кнопка Быстрый поиск - поиск разделов справки
					if (e.target.id === "idQuickSearchOn") {
						setQuickSearch();
					}
					// (i) toolbar-left
					// (!) idTopicOn-кнопка Обзор
					else if (e.target.id === "idTopicOn") {
						let tab = document.getElementById('idTopicTab');
						if (tab.classList.contains('topic-tab-current')) return;
						setTabShowHide(tab, 'show'); // - показать/скрыть текущую вкладку
					}
					// (!) idIndexOn-кнопка Ключевые слова
					else if (e.target.id === "idIndexOn") {
						let tab = document.getElementById('idIndexTab');
						if (tab.classList.contains('topic-tab-current')) return;
						setTabShowHide(tab, 'show'); // - показать/скрыть текущую вкладку
					}
					// (!) idSearchOn-кнопка Поиск
					else if (e.target.id === "idSearchOn") {
						let tab = document.getElementById('idSearchTab');
						if (tab.classList.contains('topic-tab-current')) return;
						setTabShowHide(tab, 'show'); // - показать/скрыть текущую вкладку
					}
					// (!) idUndockTabOn-кнопка Открепить
					else if (e.target.id === "idUndockTabOn") {
						alert(`(i) Кнопка «Открепить» на панели пока что в разработке.`);
						// setUndockTab(elem);
					}
					// (!) idNewTabOn-кнопка Новая вкладка
					else if (e.target.id === "idNewTabOn") {
						setNewTab();
					}
					// (i) toolbar-right
					// (!) idPermalinkOn-кнопка Постоянная ссылка
					else if (e.target.id === "idPermalinkOn") {
						let permalink = document.getElementById('idPermaLink');
						if (permalink !== null || typeof(permalink) !== "undefined" && permalink === Object(permalink)) {
							if (permalink.style.display === "none") {
								document.getElementById('idTextArea').innerHTML = hmpermalink.url + window.top.location.hash;
								// let src = document.getElementById('hmcontent').getAttribute('src');
								// document.getElementById('idTextArea').innerHTML = window.top.location.origin + window.top.location.pathname + "?" + src + window.top.location.hash;

							} else { clearPermalink(); } // - очищение инфо-подсказок при закрытии окна Постоянная ссылка
							setShowHideWindow(permalink);
						}
					}
					// (!) idPrinterOn-кнопка Печать
					else if (e.target.id === "idPrinterOn") {
						setPrintTopic(e.target.parentElement);
					}
					// (!) idPageHome-кнопка Домой
					else if (e.target.id === "idPageHome") {
						goToPageHome(e.target.parentElement); // (i) если вариант 1
						// (i) если вариант 2 - при очень интенсивных кликах браузер может не успевать и будет срабатывать ошибка
						// setTimeout(() => { // - без задержки стр.загружается с опозданием
						// 	goToPageHome(e.target.parentElement);
						// }, 1000); // 'если вариант 2
					}
					// (!) idPagePreviousOn-кнопка Назад
					else if (e.target.id === "idPagePreviousOn") {
						goToPagePrevious(e.target.parentElement); // (i) если вариант 1
						// (i) если вариант 2 - при очень интенсивных кликах браузер может не успевать и будет срабатывать ошибка
						// setTimeout(() => { // - без задержки стр.загружается с опозданием
						// 	goToPagePrevious(e.target.parentElement);
						// }, 1000); // 'если вариант 2
					}
					// (!) idPageNextOn-кнопка Вперед
					else if (e.target.id === "idPageNextOn") {
						goToPageNext(e.target.parentElement); // (i) если вариант 1
						// (i) если вариант 2 - при очень интенсивных кликах браузер может не успевать и будет срабатывать ошибка
						// setTimeout(() => { // - без задержки стр.загружается с опозданием
						// 	goToPageNext(e.target.parentElement);
						// }, 1000); // 'если вариант 2
					}
				}
			}, false); // false - фаза "всплытие"
		}
		// (i)---
		// (i)*idTopicPane-События на панеле тема (топика)
		// (!) idTopicPaneNavShowHide-кнопка Скрыть/Показать нав.пан.
		if (document.getElementById('idTopicPaneNavShowHide') !== null && typeof (document.getElementById('idTopicPaneNavShowHide')) === "object") {
			// 'change
			document.getElementById('idTopicPaneNavShowHide').addEventListener("change", function (e) {
				// $('#idToolbarNavShowHide').prop('checked', e.target.checked);
				document.getElementById('idToolbarNavShowHide').checked = e.target.checked; // - синхронизируем состояние checked
			}, false); // false - фаза "всплытие"
			// 'click
			document.getElementById('idTopicPaneNavShowHide').addEventListener("click", function (e) {
				setNavPaneShowHide(!e.target.checked); // - делаем "инверсию" значения св-ва
			}, false); // false - фаза "всплытие"
		}
		// (!) idTabsCtab-кнопки переключения между вкладками. Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
		if (document.getElementById('idTabsCtab') !== null && typeof (document.getElementById('idTabsCtab')) === "object") {
			// 'click
			document.getElementById('idTabsCtab').addEventListener("click", function (e) {
				if (e.target.tagName === "IMG") {
					// (!) idToggleMenuTab-показать/скрыть меню вкладок
					if (e.target.id === "idToggleMenuTab") {
						let tabsMenuBox = document.getElementById('idTabsMenuBox');
						if (tabsMenuBox !== null && typeof (tabsMenuBox) !== "undefined" && typeof (tabsMenuBox) === "object") {
							// TODO: 'сделать плавно
							setShowHideWindow(tabsMenuBox);
						}
					}
					// (!) idTabFirst, idTabPrevious, idTabNext, idTabLast
					else {
						goToTab(e.target);
					}
				}
			}, false); // false - фаза "всплытие"
		}
		// (!) idTabsMenuBox-меню вкладок. Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
		if (document.getElementById('idTabsMenuBox') !== null && typeof (document.getElementById('idTabsMenuBox')) === "object") {
			// 'click
			// TODO: 'сделать плавно
			document.getElementById('idTabsMenuBox').addEventListener("click", function (e) {
				if (e.target.tagName !== "A") return;
				let tabs = document.getElementById('idTopicTabs');
				for (let i = 0; i < tabs.children.length; i++) {
					if (+tabs.children[i].getAttribute('tabnum') === +e.target.parentElement.getAttribute('tablist')) {
						setTabShowHide(tabs.children[i], 'show'); // - показать/скрыть текущую вкладку
						break;
					}
				}
			}, false); // false - фаза "всплытие"
		}
		// (i) idTabsWindow-вкладки панели Тема топиков
		// (!) idTopicTabs-События вкладок. Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
		if (document.getElementById('idTopicTabs') !== null && typeof (document.getElementById('idTopicTabs')) === "object") {
			// 'mouseover/mouseout-наведение курсора
			document.getElementById('idTopicTabs').addEventListener("mouseover", function (e) {
				if (e.target.tagName === "SPAN") {
					e.target.parentElement.style.top = "3px"; // - доп.к стилю .topic-tab a/.topic-tab a:hover
					$(e.target).parents('li').children('img').css('display', 'block');
				} else if (e.target.tagName === "A") {
					e.target.style.top = "3px"; // - доп.к стилю .topic-tab a/.topic-tab a:hover
					$(e.target).siblings('img').css('display', 'block');
				} else if (e.target.tagName === "IMG") {
					$(e.target).siblings('a').css('top', '3px'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
					e.target.style.display = "block";
					e.target.src = "icon/closetabon.png";
					// e.target.setAttribute('src', 'icon/closetabon.png');
				} else if (e.target.tagName === "LI") {
					$(e.target).children('a').css('top', '3px'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
					$(e.target).children('img').css('display', 'block');
				}
			}, false); // false - фаза "всплытие"
			// 'mouseout
			document.getElementById('idTopicTabs').addEventListener("mouseout", function (e) {
				if (e.target.tagName === "SPAN") {
					e.target.parentElement.removeAttribute('style'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
					$(e.target).parents('li').children('img').removeAttr('style');
				} else if (e.target.tagName === "A") {
					e.target.removeAttribute('style'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
					$(e.target).siblings('img').removeAttr('style');
				} else if (e.target.tagName === "IMG") {
					$(e.target).siblings('a').removeAttr('style'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
					e.target.removeAttribute('style');
					e.target.src = "icon/closetaboff.png";
					// e.target.setAttribute('src', 'icon/closetaboff.png');
				} else if (e.target.tagName === "LI") {
					$(e.target).children('a').removeAttr('style'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
					$(e.target).children('img').removeAttr('style');
				}
			}, false); // false - фаза "всплытие"
			// 'click
			document.getElementById('idTopicTabs').addEventListener("click", function (e) {
				let tab;
				if (e.target.tagName === "SPAN") {
					tab = e.target.parentElement.parentElement;
					if (tab.classList.contains('topic-tab-current')) return;
				} else if (e.target.tagName === "A") {
					tab = e.target.parentElement;
					if (tab.classList.contains('topic-tab-current')) return;
				} else if (e.target.tagName === "IMG") {
					tab = e.target.parentElement;
					setTabShowHide(tab, 'hide'); // - показать/скрыть текущую вкладку
					return;
				} else if (e.target.tagName === "LI") {
					tab = e.target;
					if (tab.classList.contains('topic-tab-current')) return;
				} else if (e.target.tagName === "UL") { return; }
				setTabShowHide(tab, 'show'); // - показать/скрыть текущую вкладку
			}, false); // false - фаза "всплытие"
			// 'dblclick
			document.getElementById('idTopicTabs').addEventListener("dblclick", function (e) {
				switch (e.target.tagName) {
					case 'SPAN':
						setUndockTab(e.target.parentElement.parentElement);
						break;
					case 'A':
						setUndockTab(e.target.parentElement);
						break;
					case 'IMG':
						setUndockTab(e.target.parentElement);
						break;
					case 'LI':
						setUndockTab(e.target);
						break;
					case 'UL': break;
					default:
						console.error(`document.getElementById('idTopicTabs').addEventListener("dblclick", function (${e.target.id}):\n (!) Косяк - на текущей вкладке не учтен тег: «${e.target.tagName}»`);
						alert(`(!) Косяк - на текущей вкладке не учтен тег: «${e.target.tagName}», см.консоль`);
						break;
				}
			}, false); // false - фаза "всплытие"
			// 'animationend-по окончанию анимации удаляем css св-во "animation", иначе она больше не будет воспроизводиться
			document.getElementById('idTopicTabs').addEventListener("animationend", function (e) {
				e.target.style.removeProperty('animation'); // - удаляем css св-во
			}, false); // false - фаза "всплытие"
		}
	}
}); // ready end
// ******************************************
// (i) FUNCTIONS
// X setAdditionToStyle-доп.к стилю .topic-tab a/.topic-tab a:hover
function setAdditionToStyle (elem, valueAddDel) {
	if (valueAddDel == "add") {
		// elem.style.top = "3px";
		$(`${elem}`).css('top', '3px'); // -.topic-tab a:hover{}
	}
	if (valueAddDel == "del") {
		// elem.removeAttribute('style');
		$(`${elem}`).removeAttr('style'); // -.topic-tab a{}
	}
}
// (!) resizePanels-изменение размера панелей
function resizePanels () {
	let navpane = document.getElementById('idNavPane');
	let topicpane = document.getElementById('idTopicPane');
	if (navpane === null || typeof (navpane) === "undefined" && typeof (navpane) !== "object" || navpane !== Object(navpane)) {
		console.error(`(!) Косяк: не удалось установить позиционирование панелей:\n function resizePanels (navpane: ${navpane} / ${typeof(navpane)}, topicpane: ${topicpane} / ${typeof(topicpane)}):\n переменная аргумента не определена`);
		alert(`(!) Косяк: не удалось установить позиционирование панелей - переменная аргумента не определена, см.консоль.`);
		return;
	}
	if (topicpane === null || typeof (topicpane) === "undefined" || typeof (topicpane) !== "object" || topicpane !== Object(topicpane)) {
		console.error(`(!) Косяк: не удалось установить позиционирование панелей:\n function resizePanels (navpane: ${navpane} / ${typeof(navpane)}, topicpane: ${topicpane} / ${typeof(topicpane)}):\n переменная аргумента не определена`);
		alert(`(!) Косяк: не удалось установить позиционирование панелей - переменная аргумента не определена, см.консоль.`);
		return;
	}
	let navpaneStyles = getComputedStyle(navpane);
	// let topicpaneStyles = getComputedStyle(topicpane); // X -
	navpane.style.removeProperty('animation'); // - удаляем css св-во
	topicpane.style.removeProperty('animation'); // - удаляем css св-во
	// *проверяем внутренний размер окна без полос прокрутки
	if (document.documentElement.clientWidth > 500) {
		// navpane.style.top = null; // удаляем значение св-ва
		// topicpane.style.top = null; // удаляем значение св-ва
		navpane.style.removeProperty('top'); // - удаляем css св-во
		topicpane.style.removeProperty('top'); // - удаляем css св-во
		if (navpaneStyles.display === "none" || navpaneStyles.visibility === "hidden") { // - нав.пан.скрыта
			navpane.style.removeProperty('display'); // - удаляем css св-во
			setSizesWidth(
				reSizesWidth.navpaneStyleWidth,
				reSizesWidth.topicpaneStyleLeft,
				reSizesWidth.topicpaneStyleWidth
			);
			if (reSizesWidth.navpaneStyleWidth === 300) {
				navpane.style.removeProperty('width'); // - удаляем css св-во
			}
			navpane.style.left = 0 - (navpane.offsetWidth + parseInt(navpaneStyles.marginRight, 10)) + "px";
			navpane.style.display = "none";
			topicpane.style.removeProperty('left'); // - удаляем css св-во
		} else { // - нав.пан.раскрыта
			if (parseInt(navpaneStyles.width, 10) >= document.documentElement.clientWidth) { // - если ширина нав.пан.превышает ширину внутреннего размера окна
				navpane.style.width = Math.round((document.documentElement.clientWidth / 2) - (parseInt(navpaneStyles.marginLeft, 10) + parseInt(navpaneStyles.marginRight, 10) + parseInt(navpaneStyles.borderLeft, 10) + parseInt(navpaneStyles.borderRight, 10))) + "px";
				topicpane.style.left = (document.documentElement.clientWidth / 2) + "px";
			} else {
				setSizesWidth(
					reSizesWidth.navpaneStyleWidth,
					reSizesWidth.topicpaneStyleLeft,
					reSizesWidth.topicpaneStyleWidth
				);
				if (reSizesWidth.navpaneStyleWidth === 300) {
					navpane.style.removeProperty('width'); // - удаляем css св-во
				}
				navpane.style.removeProperty('left'); // - удаляем css св-во
				if (reSizesWidth.topicpaneStyleLeft === 0 || reSizesWidth.topicpaneStyleLeft === 310) {
					topicpane.style.removeProperty('left'); // - удаляем css св-во // (?) происходит не всегда
				} else {
					topicpane.style.left = reSizesWidth.topicpaneStyleLeft + "px";
				}
			}
		}
	} else if (document.documentElement.clientWidth < 501) {
		navpane.style.removeProperty('left'); // - удаляем css св-во
		navpane.style.removeProperty('width'); // - удаляем css св-во
		topicpane.style.removeProperty('left'); // - удаляем css св-во
		if (navpaneStyles.display === "none" || navpaneStyles.visibility === "hidden") {
			navpane.style.removeProperty('display'); // - удаляем css св-во
			navpane.style.top = parseInt(navpaneStyles.top, 10) - (navpane.offsetHeight + parseInt(navpaneStyles.marginBottom, 10)) + "px";
			navpane.style.display = "none";
		}
	}
}
// (!) animationNavPane - окно браузера > 500
function animationNavPane (duration, navpane, topicpane, valueShowHide) {
	let newPosition = { navpane: null, topicpane: null };
	let distance = null; // - расстояние
	navpane.style.removeProperty('animation'); // - удаляем css св-во
	topicpane.style.removeProperty('animation'); // - удаляем css св-во
	if (valueShowHide === "hide") {
		distance = parseInt(getComputedStyle(topicpane, null).left, 10);
	} else if (valueShowHide === "show") {
		distance = parseInt(getComputedStyle(navpane, null).left, 10);
		navpane.style.removeProperty('display'); // - удаляем css св-во - отображаем нав.пан.
	}
	const startTime = performance.now();
	rafId = requestAnimationFrame(function animate (time) {
		if (!startTime) { startTime = time; } // - при первом вызове сохраняется время, если startTime не известно
		// *разница между текущим и начальным временем, поделенная на длиительность анимации (некое число - интервал от 0 до 1, где 0 - начало анимации, а 1 - конец анимации)
		let interval = (time - startTime) / duration;
		if (interval > 1) interval = 1;
		// let progress = easeInOut(interval);
		// let progress = 0.5 * (1 + Math.cos(Math.PI * interval)); // easeInOut
		// let progress = easeInOutBack(interval);
		if (valueShowHide === "hide") {
			newPosition.topicpane = easeInOutBack(interval) * distance;
			newPosition.navpane = newPosition.topicpane - distance;
		} else if (valueShowHide === "show") {
			newPosition.navpane = easeInOutBack(interval) * distance;
			newPosition.topicpane = newPosition.navpane - distance;
		}
		navpane.style.left = newPosition.navpane + "px";
		topicpane.style.left = newPosition.topicpane + "px";
		if (interval < 1) { // - планируем новый кадр
			rafId = requestAnimationFrame(animate);
		} else {
			if (valueShowHide === "hide") {
				// setTimeout(() => {
					navpane.style.display = "none"; // 'скрываем нав.пан.
				// }, duration);
				topicpane.style.removeProperty('left'); // - удаляем css св-во
			} else if (valueShowHide === "show") {
				navpane.style.removeProperty('left'); // - удаляем css св-во
				if (reSizesWidth.topicpaneStyleLeft === 0 || reSizesWidth.topicpaneStyleLeft === 310) {
					topicpane.style.removeProperty('left'); // - удаляем css св-во
				} else {
					topicpane.style.left = reSizesWidth.topicpaneStyleLeft + "px";
				}
			}
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	});
}
// (!) animationNavPane2 - окно браузера < 500
function animationNavPane2 (duration, navpane, topicpane, valueShowHide) {
	let newPosition = { navpane: null, topicpane: null };
	let startPos = null; // - начальная точка движения
	let endPos = null; // - конечная точка движения
	navpane.style.removeProperty('animation'); // - удаляем css св-во
	topicpane.style.removeProperty('animation'); // - удаляем css св-во
	if (valueShowHide === "hide") {
		startPos = parseInt(getComputedStyle(topicpane, null).top, 10);
		endPos = parseInt(getComputedStyle(navpane, null).top, 10);
	} else if (valueShowHide === "show") {
		startPos = parseInt(getComputedStyle(navpane, null).top, 10);
		endPos = parseInt(getComputedStyle(topicpane, null).top, 10);
		navpane.style.removeProperty('display'); // - после получения значения отображаем нав.пан. - удаляем css св-во
	}
	const distance = startPos - endPos; // - расстояние
	const startTime = performance.now();
	rafId = requestAnimationFrame(function animate (time) {
		if (!startTime) { startTime = time; } // - при первом вызове сохраняется время, если startTime не известно
		// *разница между текущим и начальным временем, поделенная на длиительность анимации (некое число - интервал от 0 до 1, где 0 - начало анимации, а 1 - конец анимации)
		let interval = (time - startTime) / duration;
		if (interval > 1) interval = 1;
		// let progress = easeInOut(interval);
		// let progress = 0.5 * (1 + Math.cos(Math.PI * interval)); // easeInOut
		let progress = easeInOutBack(interval);
		let value = distance * progress;
		if (valueShowHide === "hide") {
			newPosition.navpane = ((distance * progress) - (startPos - endPos)) + endPos;
			newPosition.topicpane = (distance * progress) + endPos;
		} else if (valueShowHide === "show") {
			newPosition.navpane = (distance * progress) + endPos;
			newPosition.topicpane = ((distance * progress) - (startPos - endPos)) + endPos;
		}
		navpane.style.top = newPosition.navpane + "px";
		topicpane.style.top = newPosition.topicpane + "px";

		if (interval < 1) { // - планируем новый кадр
			rafId = requestAnimationFrame(animate);
		} else {
			if (valueShowHide === "hide") {
				// setTimeout(() => {
					navpane.style.display = "none"; // 'скрываем нав.пан.
				// }, duration);
				topicpane.style.removeProperty('top'); // - удаляем css св-во
			} else if (valueShowHide === "show") {
				navpane.style.removeProperty('top'); // - удаляем css св-во
				topicpane.style.removeProperty('top'); // - удаляем css св-во
			}
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	});
}
// (!) easeInOut
function easeInOut (time) {
	return 0.5 * (1 + Math.cos(Math.PI * time));
}
// X easeInOutRight-не используется
function easeInOutRight (time) {
	return 0.5 * (1 - Math.cos(Math.PI * time));
}
// (!) easeInOutBack
function easeInOutBack (x) {
	// Переменная x это интервал, прогресс анимации, где 0 (начало анимации) и 1 (конец анимации)
	const c1 = 1.70158;
	const c2 = c1 * 1.525;

	return x < 0.5
	? 1 - (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
	: 1 - (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
	// оригинал
	// ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
	// : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}
// X animateNavPane-через CSS, анимация панели навигации
// function animateNavPane (elem, animationName, valueShowHide) {
// 	if (elem.id === "idNavPane") {
// 		if (valueShowHide === "show") {
// 			elem.style.removeProperty('display'); // 'отображаем нав.пан.
// 		}
// 	}
// 	// elem.style.animationFillMode = "backwards"; // Элемент сохранит стиль первого ключевого кадра на протяжении периода animation-delay. Первый ключевой кадр определяется значением animation-direction
// 	elem.style.animation = animationName; // имя @keyframes в файле styles.css
// 	elem.style.animationDuration = "2s"; // длительность анимации
// 	elem.style.animationDelay = "0ms"; // время задержки перед стартом анимации
// 	// elem.style.willChange = "left"; // (i) - св-во will-change - экспериментальная технология, заранее передает браузеру инфу о возможном предстоящем изменении элемента
// 	// elem.style.animationFillMode = "both"; // Анимация будет вести себя так, как будто значения forwards и backwards заданы одновременно
// 	// elem.style.animationFillMode = "forwards"; // По окончании анимации элемент сохранит стили последнего ключевого кадра, который определяется значениями animation-direction и animation-iteration-count
// 	if (elem.id === "idNavPane") {
// 		if (valueShowHide === "hide") {
// 			setTimeout(() => {
// 				elem.style.display = "none"; // 'скрываем нав.пан.
// 			}, 2000);
// 		}
// 	}
// }
// (!) animateBanner-через CSS, анимация баннера
function animateBanner (elem, animationName, valueShowHide) { // TODO: переделать анимацию через js
	if (elem.id === "idBanner") {
		if (valueShowHide === "show") {
			elem.style.removeProperty('display'); // 'отображаем баннер
		}
	}
	// 'временно изм.стиль, чтобы не возникала ошибка при изменении размера окна браузера
	// let isDisplayNone = false;
	// if (elem.id === "idNavPane") {
	// 	if (elem.style.display === "none" || elem.style.visibility === "hidden") {
	// 		elem.style.removeProperty('display'); // - удаляем css св-во
	// 		isDisplayNone = true;
	// 	}
	// } // 'временно изм.стиль, чтобы не возникала ошибка при изменении размера окна браузера
	// elem.style.animationFillMode = "backwards"; // Элемент сохранит стиль первого ключевого кадра на протяжении периода animation-delay. Первый ключевой кадр определяется значением animation-direction
	elem.style.animation = animationName; // имя @keyframes в файле styles.css
	elem.style.animationDuration = "1.5s"; // длительность анимации
	elem.style.animationDelay = "0ms"; // время задержки перед стартом анимации
	elem.style.willChange = "top"; // (i) - св-во will-change - экспериментальная технология, заранее передает браузеру инфу о возможном предстоящем изменении элемента
	// elem.style.animationFillMode = "both"; // Анимация будет вести себя так, как будто значения forwards и backwards заданы одновременно
	// elem.style.animationFillMode = "forwards"; // По окончании анимации элемент сохранит стили последнего ключевого кадра, который определяется значениями animation-direction и animation-iteration-count

	// if (isDisplayNone) { // 'возвращаем стиль обратно
	// 	elem.style.display = "none";
	// 	isDisplayNone = false;
	// } // 'возвращаем стиль обратно

	// if (elem.id === "idNavPane") {
	// 	if (valueShowHide === "show") {
	// 		elem.style.top
	// 	} else if (valueShowHide === "hide") {

	// 	}
	// }

	if (elem.id === "idBanner") {
		if (valueShowHide === "hide") {
			setTimeout(() => {
				elem.style.display = "none"; // 'скрываем баннер
			}, 1500);
		}
	}
}
// (!) setCopyToClipboard-кнопка скопировать в буфер обмена
function setCopyToClipboard (elem) {
	let msg;
	if (elem.value === "") {
		msg = false;
	} else {
		// if (navigator.clipboard) { // - поддержка API clipboard имеется
		// 	console.log(`function setCopyToClipboard (elem.tagName: ${elem.tagName}, elem.id: ${elem.id}):\n 1) navigator.clipboard\n document.activeElement.id: ${document.activeElement.id}`); // X -
		// 	let value = navigator.clipboard.writeText(elem.value)
		// 		.then(() => { // - метод then() возвращает Promise
		// 			msg = true;
		// 			console.log(`function setCopyToClipboard (elem.tagName: ${elem.tagName}, elem.id: ${elem.id}):\n 2) navigator.clipboard\n document.activeElement.id: ${document.activeElement.id}\n msg: ${msg}\n value: ${value}`); // X -
		// 		})
		// 		.catch(err => { // (?) непонятно почему - NotAllowedError: Document is not focused
		// 			msg = false;
		// 			console.error(`function setCopyToClipboard (elem.tagName: ${elem.tagName}, elem.id: ${elem.id}):\n 3) navigator.clipboard\n document.activeElement.id: ${document.activeElement.id}\n msg: ${msg}\n value: ${value}\n err: ${err}`); // X -
		// 		});
		// } else { // - поддержки нет, используем метод execCommand
			try {
				elem.select();
				msg = document.execCommand("copy");
				// console.log(`function setCopyToClipboard (elem.tagName: ${elem.tagName}, elem.id: ${elem.id}):\n msg: ${msg}`); // X -
			} catch (error) {
				console.error(`error: ${error}`);
				alert(`(!) ${error}, см.консоль.`);
				// console.error(`function setCopyToClipboard (elem.tagName: ${elem.tagName}, elem.id: ${elem.id}):\n msg: ${msg}\n error: ${error}`); // X -
			}
		// }
	}
	return msg;
}
// (i)---
// (i)*idToolbar-Элементы панели инструментов
// (!) setNavPaneShowHide-Скрыть/Показать боковую панель навигации
function setNavPaneShowHide (panelShowHide = true) {
	let imgNavHandle = document.getElementById('idTopicPaneNavShowHideIcon'); // - трансформации иконки на панели тема топика
	let navpane = document.getElementById('idNavPane');
	let topicpane = document.getElementById('idTopicPane');
	const duration = 2000; // - длительность анимации
	document.getElementById('idToolbarNavShowHide').disabled = true; // 'делаем кнопку НЕдоступной для нажатия, пока не выполнится анимация
	// *оба checkbox должны работать синхронно
	if (panelShowHide) { // - нав.пан.раскрыта
		if (document.getElementById('idBanner').style.display == "none") {
			// *проверяем внутренний размер окна без полос прокрутки
			if (document.documentElement.clientWidth > 500) {
				animationNavPane(duration, navpane, topicpane, "hide");
				// animateNavPane(navpane, "navpaneHide", "hide"); // X не используется
				// animateNavPane(topicpane, "topicpaneNavPaneHide", "hide"); // X не используется
			} else if (document.documentElement.clientWidth < 501) {
				animationNavPane2(duration, navpane, topicpane, "hide");
				// animateNavPane(navpane, "navpaneHide", "hide");
				// animateNavPane(topicpane, "topicpaneExtend", "hide");
			}
			topicpane.classList.remove('topic-pane-expand');
			topicpane.classList.add('topic-pane-extend'); // - изм.одну высоту пан.топика на др.
		} else {
			// *проверяем внутренний размер окна без полос прокрутки
			if (document.documentElement.clientWidth > 500) {
				animationNavPane(duration, navpane, topicpane, "hide");
				// animateNavPane(navpane, "navpaneHide", "hide"); // X не используется
				// animateNavPane(topicpane, "topicpaneNavPaneHide", "hide"); // X не используется
			} else if (document.documentElement.clientWidth < 501) {
				animationNavPane2(duration, navpane, topicpane, "hide");
				// animateNavPane(navpane, "navpaneHideBanner", "hide");
				// animateNavPane(topicpane, "topicpaneExpand", "hide");
			}
			topicpane.classList.remove('topic-pane-extend');
			topicpane.classList.add('topic-pane-expand'); // - изм.одну высоту пан.топика на др.
		}
		// *трансформация иконки на кнопке в панели тема топика
		imgNavHandle.classList.remove('navhandle-navpane-show');
		imgNavHandle.classList.add('navhandle-navpane-hide');
	} else { // - нав.пан.скрыта
		// *проверяем внутренний размер окна без полос прокрутки
		if (document.documentElement.clientWidth > 500) {
			animationNavPane(duration, navpane, topicpane, "show");
		// 	animateNavPane(navpane, "navpaneShow", "show"); // X не используется
		// 	animateNavPane(topicpane, "topicpaneNavPaneShow", "show"); // X не используется
		} else if (document.documentElement.clientWidth < 501) {
			animationNavPane2(duration, navpane, topicpane, "show");
		// 	if (document.getElementById('idBanner').style.display === "none") { // X не используется
		// 		animateNavPane(navpane, "navpaneShow", "show");
		// 		animateNavPane(topicpane, "topicpaneNavPaneShow", "show");
		// 	} else {
		// 		animateNavPane(navpane, "navpaneShowBanner", "show");
		// 		animateNavPane(topicpane, "topicpaneNavPaneShowBanner", "show");
		// 	}
		}
		topicpane.classList.remove('topic-pane-extend');
		topicpane.classList.remove('topic-pane-expand');
		// *трансформация иконки на кнопке в панели тема топика
		imgNavHandle.classList.remove('navhandle-navpane-hide');
		imgNavHandle.classList.add('navhandle-navpane-show');
	}
	document.getElementById('idToolbarNavShowHide').disabled = false; // 'делаем кнопку доступной для нажатия
}
// (!) setQuickSearch-кнопка Быстрый поиск-поиск разделов справки
function setQuickSearch () {
	alert(`(i) Кнопка «Быстрый поиск» на панели пока что в разработке.`);
}
// (!) setUndockTab-открепить текущую вкладку
function setUndockTab (elem) {
	// console.log(elem.getAttribute('tabnum')); // X -
	if (+elem.getAttribute('tabnum') === 0) {
		alert(`(i) Нельзя открепить вкладку «Главная».\n    Создайте новую вкладку и нажмите кнопку «Открепить».`);
	} else if (+elem.getAttribute('tabnum') > 0) { // - открепляем текущую вкладку
		alert(`(i) Функция открепить вкладку, пока что в разработке.`);
	}
}
// (!) setNewTab-кнопка Новая вкладка
function setNewTab () {
	alert(`(i) Кнопка «Новая вкладка» на панели пока что в разработке.`);
}
// (!) setBannerShowHide-кнопка Показать/Скрыть баннер
// *js/JavaScript
function setBannerShowHide (bannerShowHide = false) {
	let panels = {
		banner: document.getElementById('idBanner'),
		toolbar: document.getElementById('idToolbar'),
		navpane: document.getElementById('idNavPane'),
		topicpane: document.getElementById('idTopicPane')
	};
	let navpaneTop = parseInt(getComputedStyle(panels.navpane).top, 10);
	// *переключение классов и стилей
	// panels.banner.style.display == "none" ? panels.banner.style.display = "" : panels.banner.style.display = "none"; // однострочная запись - переключатель toggle через условный тернарный оператор (?:) с тремя операндами в JavaScript
	if (bannerShowHide) { // - баннер раскрыт - скрываем его
		panels.toolbar.classList.replace('toolbar-banner', 'toolbar');
		if (panels.navpane.classList.contains('nav-pane-banner')) {
			panels.navpane.classList.remove('nav-pane-banner');
		}
		if (panels.topicpane.classList.contains('topic-pane-banner')) {
			panels.topicpane.classList.remove('topic-pane-banner');
		}
		if (panels.navpane.style.display === "none" || panels.navpane.style.visibility === "hidden") {
			panels.topicpane.classList.remove('topic-pane-expand');
			panels.topicpane.classList.add('topic-pane-extend'); // - изм.одну высоту пан.топика на др.
		} else {
			panels.topicpane.classList.remove('topic-pane-expand');
			panels.topicpane.classList.remove('topic-pane-extend');
		}
		// *проверяем внутренний размер окна без полос прокрутки
		if (document.documentElement.clientWidth > 500) {
			animateBanner(panels.banner, "bannerHide", "hide");
			animateBanner(panels.toolbar, "bannerHide", "hide");
			animateBanner(panels.navpane, "panelBannerHide", "hide");
			animateBanner(panels.topicpane, "panelBannerHide", "hide");
		} else if (document.documentElement.clientWidth < 501) {
			animateBanner(panels.banner, "bannerHide", "hide");
			animateBanner(panels.toolbar, "bannerHide", "hide");
			animateBanner(panels.navpane, "panelBannerHide", "hide");
			if (panels.navpane.style.display === "none" || panels.navpane.style.visibility === "hidden") {
				// *корректируем высоту
				// panels.navpane.style.removeProperty('display'); // удаляем css св-во // TEST: - если все ок-удалить
				panels.navpane.style.top = navpaneTop - (panels.banner.offsetHeight - parseInt(getComputedStyle(panels.navpane).marginBottom, 10)) + "px";
				// panels.navpane.style.display = "none"; // TEST: - если все ок-удалить
				animateBanner(panels.topicpane, "panelBannerHide", "hide");
			} else {
				animateBanner(panels.topicpane, "topicpaneBannerHide", "hide");
			}
		}
	} else { // - баннер скрыт - отображаем его
		panels.toolbar.classList.replace('toolbar', 'toolbar-banner');
		if (!panels.navpane.classList.contains('nav-pane-banner')) { // - класс отсутствует
			panels.navpane.classList.add('nav-pane-banner');
		}
		if (!panels.topicpane.classList.contains('topic-pane-banner')) { // - класс отсутствует
			panels.topicpane.classList.add('topic-pane-banner');
		}
		if (panels.navpane.style.display === "none" || panels.navpane.style.visibility === "hidden") {
			panels.topicpane.classList.remove('topic-pane-extend');
			panels.topicpane.classList.add('topic-pane-expand'); // - изм.одну высоту пан.топика на др.
		} else {
			panels.topicpane.classList.remove('topic-pane-expand');
			panels.topicpane.classList.remove('topic-pane-extend');
		}
		// *проверяем внутренний размер окна без полос прокрутки
		if (document.documentElement.clientWidth > 500) {
			animateBanner(panels.banner, "bannerShow", "show");
			animateBanner(panels.toolbar, "bannerShow", "show");
			animateBanner(panels.navpane, "panelBannerShow", "show");
			animateBanner(panels.topicpane, "panelBannerShow", "show");
		} else if (document.documentElement.clientWidth < 501) {
			animateBanner(panels.banner, "bannerShow", "show");
			animateBanner(panels.toolbar, "bannerShow", "show");
			animateBanner(panels.navpane, "panelBannerShow", "show");
			if (panels.navpane.style.display === "none" || panels.navpane.style.visibility === "hidden") {
				// *корректируем высоту
				// panels.navpane.style.removeProperty('display'); // удаляем css св-во // TEST: - если все ок-удалить
				panels.navpane.style.top = navpaneTop + (panels.banner.offsetHeight - parseInt(getComputedStyle(panels.navpane).marginBottom, 10)) + "px";
				// panels.navpane.style.display = "none"; // TEST: - если все ок-удалить
				animateBanner(panels.topicpane, "panelBannerShow", "show");
			} else {
				animateBanner(panels.topicpane, "topicpaneBannerShow", "show");
			}
		}
	}
}
// *jq/jQuery
// function setBannerShowHide () {
// 	let banner = document.getElementById('idBanner'); // js, удобнее использовать
// 	let toolbar = document.getElementById('idToolbar'); // js, удобнее использовать
// 	let navpane = document.getElementById('idNavPane'); // js, удобнее использовать
// 	let topicpane = document.getElementById('idTopicPane'); // js, удобнее использовать
// 	// *переключение классов
// 	$(`#${toolbar.id}`).toggleClass('toolbar toolbar-banner');
// 	if (!$('#idBannerShowHide').prop('checked')) { // - баннер скрыт
// 		if ($(`#${banner.id}`).css('display') == "none") {
// 			// $(`#${banner.id}`).removeAttr('style'); // удаляем атрибут "стиль"
// 			$(`#${banner.id}`).css('display', ''); // удаляем значение св-ва
// 		}
// 		if (!$(`#${navpane.id}`).hasClass('nav-pane-banner')) { // - класс отсутствует
// 			$(`#${navpane.id}`).addClass('nav-pane-banner');
// 		}
// 		if (!$(`#${topicpane.id}`).hasClass('topic-pane-banner')) { // - класс отсутствует
// 			$(`#${topicpane.id}`).addClass('topic-pane-banner');
// 		}
// 	} else { // - баннер раскрыт
// 		if ($(`#${navpane.id}`).hasClass('nav-pane-banner')) {
// 			$(`#${navpane.id}`).removeClass('nav-pane-banner');
// 		}
// 		if ($(`#${topicpane.id}`).hasClass('topic-pane-banner')) {
// 			$(`#${topicpane.id}`).removeClass('topic-pane-banner');
// 		}
// 	}
// 	// *анимация
// 	if ($('#idBannerShowHide').prop('checked')) { // - баннер скрыт
// 		animateBanner(banner, "bannerHide");
// 		animateBanner(toolbar, "bannerHide");
// 		animateBanner(navpane, "navpaneBannerHide");
// 		animateBanner(topicpane, "topicpaneBannerHide");
// 	} else { // - банер раскрыт
// 		animateBanner(banner, "bannerShow");
// 		animateBanner(toolbar, "bannerShow");
// 		animateBanner(navpane, "navpaneBannerShow");
// 		animateBanner(topicpane, "topicpaneBannerShow");
// 	}
// }
// (!) setPermaLinkBtnBookmark-кнопка в закладки
function setPermaLinkBtnBookmark (elem) { // TODO
	let msg;
	// let title = "Закладка";
	// let UA = navigator.userAgent.toLowerCase();
	// let isFF = UA.indexOf('firefox') != -1;
	// let isWebkit = UA.indexOf('webkit') != -1;
	// let isMac = UA.indexOf('mac') != -1;
	// let isIE = UA.indexOf('msie') != -1;

	// let navig = "";
	// for (let property in navigator) {
	// navig += `${property}: ${navigator[property]}\n`;
	// }

	console.log(`function setPermaLinkBtnBookmark (elem: ${elem.tagName}, ${elem.id}\n navigator.userAgent: ${navigator.userAgent}`); // X -

	// if ((isIE) && window.external) { // IE
	// 	window.external.AddFavorite(elem.value, title);
	// 	msg = true;
	// } else if ((isFF) && window.external) { // Firefox
	// 	window.sidebar.addPanel(title, elem.value, "");
	// 	msg = true;
	// } else if (isMac || isWebkit) { // Webkit (Chrome, Opera), Mac
	// 	msg = false;
	// } else { msg = false; }
	return msg;
}
// (!) setPrintTopic-кнопка Печать
function setPrintTopic (elem) {
	let wndProp = "width=960,height=970,left=" + ((screen.width - 960) / 2) + ",top=0,toolbar=1,scrollbars=1,location=0,status=1,menubar=1,titlebar=1,resizable=1"; // - menubar=0 - отд.окно
	windowOpen(hmtopicvars.currP, wndProp);
	// print();
	alert(`(i) Кнопка «Печать» на панели пока что в разработке.`);
}
// (!) setGoToPage-установка перехода на страницу
function setGoToPage (elem) {
	// (i) если вариант 1
	// *обновляем глобальную переменную в hmnavigation
	if (location.origin === "file://") {
		let msg = {
			value: "setCollapse",
			collapse: false
		};
		frames.hmnavigation.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
	} else {
		document.getElementById('hmnavigation').contentWindow.setCollapse(false);
	}
	let currP = elem.getAttribute('href');
	if (location.search === "") {
		hmpermalink.url = location.href + "?" + currP;
	} else {
		hmpermalink.url = location.href.replace(hmtopicvars.currP, currP);
	}
	window.history.pushState('', '', hmpermalink.url);
	// (i) если вариант 2
	// let currP = elem.getAttribute('href');
	// if (location.search === "") {
	// 	hmpermalink.url = location.href + "?" + currP;
	// } else {
	// 	hmpermalink.url = location.href.replace(hmtopicvars.currP, currP);
	// }
	// window.history.pushState('', '', hmpermalink.url);
	// if (location.origin === "file://") {
	// 	let msg = {
	// 		value: "goToPage",
	// 		currP: currP,
	// 		collapse: false
	// 	};
	// 	frames.hmnavigation.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
	// } else {
	// 	document.getElementById('hmnavigation').contentWindow.goToPage(null, currP, false); // - перейти на страницу выполнив обновление глобальных переменных в variables.js
	// } // 'если вариант 2
	// X let tab = document.getElementById('idTopicTab');
	// if (!tab.classList.contains('topic-tab-current')) {
	// 	setTabShowHide(tab, 'show'); // показать/скрыть текущую вкладку
	// }
}
// (!) goToPageHome-кнопка Домой
function goToPageHome (elem) {
	setGoToPage(elem); // - установка перехода на страницу
	hmtopicvars.currP = hmnavpages.def = hmnavpages.query = hmtopicvars.homeP; // - обновляем глобальные переменные в variables.js
}
// (!) goToPagePrevious-кнопка Назад
function goToPagePrevious (elem) {
	setGoToPage(elem); // - установка перехода на страницу
	// *обновляем глобальные переменные в variables.js
	hmtopicvars.nextP = hmtopicvars.currP;
	hmtopicvars.currP = hmnavpages.def = hmnavpages.query = hmtopicvars.prevP;
}
// (!) goToPageNext-кнопка Вперед
function goToPageNext (elem) {
	setGoToPage(elem); // - установка перехода на страницу
	// *обновляем глобальные переменные в variables.js
	hmtopicvars.prevP = hmtopicvars.currP;
	hmtopicvars.currP = hmnavpages.def = hmnavpages.query = hmtopicvars.nextP;
}
// (i)*idTopicPane-Элементы для панели тема топика
// (!) goToTab-кнопка перехода между вкладками
function goToTab (currentTab) {
	let tabs = document.getElementById('idTopicTabs');
	let boxes = document.getElementById('idContentBox');

	if (currentTab.id === "idTabFirst") {
		if (tabs.children[0].classList.contains('topic-tab-current')) {
			animationOffset(currentTab); // - анимационное смещение
		} else {
			for (let i = 0; i < tabs.children.length && i < boxes.children.length; i++) {
				if (i === 0) {
					tabs.children[i].classList.add('topic-tab-current');
					boxes.children[i].removeAttribute("style");
					setToolbarButtonsOnOff(tabs.children[i].id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
				} else {
					if (tabs.children[i].style.display != "none") {
						tabs.children[i].classList.remove('topic-tab-current');
						boxes.children[i].style.display = "none";
					}
				}
			}
		}
	} else {
		let visibleTabs = []; // - видимые вкладки
		let visibleBoxes = []; // - контентная часть видимых вкладок
		// *просматриваем все вкладки и исключаем скрытые
		for (let i = 0; i < tabs.children.length; i++) {
			if (tabs.children[i].style.display != "none") {
				visibleTabs.push(tabs.children[i]);
				visibleBoxes.push(boxes.children[i]);
			}
		}
		if (visibleTabs.length === 1) { // - скрыты все вкладки, кроме 1-ой, т.е.главной
			if (tabs.children[0].classList.contains('topic-tab-current')) {
				animationOffset(currentTab); // - анимационное смещение
			} else {
				tabs.children[0].classList.add('topic-tab-current');
				boxes.children[0].removeAttribute('style');
				setToolbarButtonsOnOff(tabs.children[0].id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
			}
		} else {
			if (currentTab.id === "idTabPrevious") {
				for (let i = visibleTabs.length - 1; i >= 0; i--) {
					if (i === 0) { // - если вкладка 1-ая, т.е.главная
						if (visibleTabs[i].classList.contains('topic-tab-current')) {
							animationOffset(currentTab); // - анимационное смещение
						} else {
							visibleTabs[i].classList.add('topic-tab-current');
							visibleBoxes[i].removeAttribute('style');
							setToolbarButtonsOnOff(visibleTabs[i].id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
						}
					} else {
						if (visibleTabs[i].classList.contains('topic-tab-current')) {
							visibleTabs[i].classList.remove('topic-tab-current');
							visibleBoxes[i].style.display = "none";
							visibleTabs[i - 1].classList.add('topic-tab-current');
							visibleBoxes[i - 1].removeAttribute('style');
							setToolbarButtonsOnOff(visibleTabs[i - 1].id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
							break;
						}
					}
				}
			} else if (currentTab.id === "idTabNext") {
				for (let i = 0; i < visibleTabs.length, i < visibleBoxes.length; i++) {
					if (i === visibleTabs.length - 1) { // - если видимая вкладка последняя
						if (visibleTabs[i].classList.contains('topic-tab-current')) {
							animationOffset(currentTab); // - анимационное смещение
						} else {
							visibleTabs[0].classList.add('topic-tab-current');
							visibleBoxes[0].removeAttribute('style');
							setToolbarButtonsOnOff(visibleTabs[0].id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
						}
					} else {
						if (visibleTabs[i].classList.contains('topic-tab-current')) {
							visibleTabs[i].classList.remove('topic-tab-current');
							visibleBoxes[i].style.display = "none";
							visibleTabs[i + 1].classList.add('topic-tab-current');
							visibleBoxes[i + 1].removeAttribute('style');
							setToolbarButtonsOnOff(visibleTabs[i + 1].id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
							break;
						}
					}
				}
			} else if (currentTab.id === "idTabLast") {
				if (visibleTabs[visibleTabs.length - 1].classList.contains('topic-tab-current')) { // - если последняя видимая вкладка уже активна
					animationOffset(currentTab); // - анимационное смещение
				} else {
					for (let i = 0; i < visibleTabs.length, i < visibleBoxes.length; i++) {
						if (i === visibleTabs.length - 1) { // - если видимая вкладка последняя
							visibleTabs[i].classList.add('topic-tab-current');
							visibleBoxes[i].removeAttribute('style');
							setToolbarButtonsOnOff(visibleTabs[i].id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
						} else {
							visibleTabs[i].classList.remove('topic-tab-current');
							visibleBoxes[i].style.display = "none";
						}
					}
				}
			}
		}
	}
	setUpdateTabsMenuList(tabs); // - обновляем список Меню вкладок и выделяем ссылку на текущую вкладку
}