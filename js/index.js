// document.addEventListener("DOMContentLoaded", function () {}, false); // - js. Дожидаемся, когда Объектная модель документа страницы (DOM) будет готова к выполнению кода JavaScript
// (!) *window
window.addEventListener("load", function () { // - js. Сработает, как только вся страница (изображения или встроенные фреймы), а не только DOM, будет готово
	// X обработчик события resize прописываем здесь, т.к.заранее не известно когда и как будут/были загружены панели idNavPane & idTopicPane
	// window.addEventListener('resize', reSizePanels);
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
			// console.log(`window.addEventListener("message", (event) гл.окно), location.origin: ${location.origin}:\n event.origin === 0: ${event.origin === 0}\n event.data: ${JSON.stringify(event.data, null, 1)}`); // x -
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
				console.log(`event.data: \n 1) .value: ${event.data.value}\n 2) .clone: ${event.data.clone}\n---\n event.data.clone.classList: ${event.data.clone.classList}\n event.data.clone === null: ${event.data.clone === null}\n typeof(event.data.clone): ${typeof(event.data.clone)}\n event.data.clone === Object(event.data.clone): ${event.data.clone === Object(event.data.clone)}\n (event.data.clone === null && typeof(event.data.clone) === "object"): ${event.data.clone === null && typeof(event.data.clone) === "object"}\n---`); // x -
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
			// console.log(`window.addEventListener("hashchange", () => {} гл.окно):\n .href: ${window.top.document.location.href}\n .hash: ${window.top.location.hash}\n .hash.length: ${window.top.location.hash.length}`); // x -
			// *убираем hash из адресной строки в главном окне при клике по вкладкам
			// if (window !== top) return;
			if (window.top.location.hash.length > 0) {
				if (window.top.location.hash === "#topictablink" || window.top.location.hash === "#indextablink" || window.top.location.hash === "#searchtablink") {
					// let url = window.top.location.href.substring(0, window.top.location.href.length - window.top.location.hash.length);
					let url = window.top.document.location.href.toString().replace(/\#.*$/, "");
					window.top.history.pushState("", "", url);
					// window.top.location.hash = "";
					// console.log(`window.addEventListener("hashchange", () => {} гл.окно):\n url: ${url}\n .hash: ${window.top.location.hash}\т --- the end ---`); // x -
				}
			}
		}, false); // false - фаза "всплытие"
		// (!) keyup
		document.addEventListener("keyup", function (event) {
			if (event.key === "Escape" || event.code === "Escape" || event.keyCode === 27 || event.which === 27) {
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
		// TEST: X - удалить после теста, т.к.перенесено в см.ф.permalink_onClick()
		// (!)*idPermaLink-всплывающее окно "Постоянная ссылка". Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
		// if (document.getElementById('idPermaLink') !== null || typeof(document.getElementById('idPermaLink')) !== "undefined" && document.getElementById('idPermaLink') === Object(document.getElementById('idPermaLink'))) {
		// 	// 'click
		// 	document.getElementById('idPermaLink').addEventListener("click", function (e) {
		// 		if (e.target.tagName === "DIV") {
		// 			// (!) idPermaLinkClose - кнопка закрыть всплывающее окно Постоянная ссылка
		// 			if (e.target.id === "idPermaLinkClose") {
		// 				let permalink = e.target;
		// 				while (permalink.id !== "idPermaLink") {
		// 					permalink = permalink.parentElement;
		// 					if (permalink.tagName === "BODY") {break;}
		// 				}
		// 				if (permalink.id === "idPermaLink") {
		// 					clearPermalink(); // - очищение инфо-подсказок при закрытии окна Постоянная ссылка
		// 					setShowHideWindow(permalink, 'hide');
		// 				}
		// 			}
		// 		} else if (e.target.tagName === "INPUT") {
		// 			// (!) idPermaLinkBookmark - кнопка в закладки
		// 			if (e.target.id === "idPermaLinkBookmark") {
		// 				let textArea = document.getElementById('idTextArea');
		// 				if (textArea !== null && typeof (textArea) === "object") {
		// 					if (textArea.value === "") {
		// 						e.target.value = "Bookmark failed";
		// 						textArea.labels[0].innerHTML = hmpermalink.bookmarkError;
		// 						textArea.labels[0].classList.remove('permalink-info');
		// 						textArea.labels[0].classList.add('permalink-error');
		// 					} else {
		// 						if (setPermaLinkBookmark(textArea)) {
		// 							e.target.value = "Добавлено";
		// 							textArea.labels[0].innerHTML = hmpermalink.bookmarkInfo;
		// 							textArea.labels[0].classList.remove('permalink-error');
		// 							textArea.labels[0].classList.add('permalink-info');
		// 						} else {
		// 							e.target.value = "Bookmark failed";
		// 							textArea.labels[0].innerHTML = hmpermalink.bookmarkError;
		// 							textArea.labels[0].classList.remove('permalink-info');
		// 							textArea.labels[0].classList.add('permalink-error');
		// 						}
		// 						setTimeout(() => {
		// 							e.target.value = "В закладки";
		// 						}, 2000);
		// 					}
		// 				}
		// 			}
		// 			// (!) idPermaLinkCopy - кнопка скопировать
		// 			else if (e.target.id === "idPermaLinkCopy") {
		// 				let textArea = document.getElementById('idTextArea');
		// 				if (textArea !== null && typeof (textArea) === "object" || textArea === Object(textArea)) {
		// 					if (textArea.value === "") {
		// 						e.target.value = "Copy failed";
		// 						textArea.labels[0].innerHTML = hmpermalink.copyError;
		// 						textArea.labels[0].classList.remove('permalink-info');
		// 						textArea.labels[0].classList.add('permalink-error');
		// 					} else {
		// 						if (setCopyToClipboard(textArea)) {
		// 							e.target.value = "Скопировано";
		// 							textArea.labels[0].innerHTML = hmpermalink.copyInfo;
		// 							textArea.labels[0].classList.remove('permalink-error');
		// 							textArea.labels[0].classList.add('permalink-info');
		// 						} else {
		// 							e.target.value = "Copy failed";
		// 							textArea.labels[0].innerHTML = hmpermalink.copyError;
		// 							textArea.labels[0].classList.remove('permalink-info');
		// 							textArea.labels[0].classList.add('permalink-error');
		// 						}
		// 						setTimeout(() => {
		// 							e.target.value = "Копировать";
		// 						}, 2000);
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}, false); // false - фаза "всплытие"
		// }
		// (i)*idToolbarPane-События на панеле инструментов. Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
		if (document.getElementById('idToolbarPane') !== null && typeof (document.getElementById('idToolbarPane')) === "object") {
			// (i) mouseover/mouseout-наведение курсора
			document.getElementById('idToolbarPane').addEventListener("mouseover", function (e) {
				if (e.target.tagName === "IMG") {
					// (!) idFeedBackOn - кнопка e-mail
					if (e.target.id === "idFeedBackOn") {
						// e.target.setAttribute('src', 'icon/support.gif');
						e.target.src = "icon/support.gif";
					}
				}
			}, false); // false - фаза "всплытие"
			document.getElementById('idToolbarPane').addEventListener("mouseout", function (e) {
				if (e.target.tagName === "IMG") {
					// ! idFeedBackOn-кнопка e-mail
					if (e.target.id === "idFeedBackOn") {
						// e.target.setAttribute('src', 'icon/emailon.png');
						e.target.src = "icon/emailon.png";
					}
				}
			}, false); // false - фаза "всплытие"
			// (i) change
			document.getElementById('idToolbarPane').addEventListener("change", function (e) {
				if (e.target.tagName === "INPUT") {
					// (i) toolbar-search
					// (!) idToolbarNavShowHide - кнопка-переключатель Скрыть/Показать панель навигации
					if (e.target.id === "idToolbarNavShowHide") {
						// $('#idTopicPaneNavShowHide').prop('checked', e.target.checked);
						document.getElementById('idTopicPaneNavShowHide').checked = e.target.checked; // - синхронизируем состояние checked
					}
				}
			}, false); // false - фаза "всплытие"
			// (i) click
			document.getElementById('idToolbarPane').addEventListener("click", function (e) {
				if (e.target.tagName === "INPUT") {
					// (i) toolbar-search
					// (!) idToolbarNavShowHide - кнопка-переключатель Скрыть/Показать панель навигации
					if (e.target.id === "idToolbarNavShowHide") {
						setNavPaneShowHide(!e.target.checked); // - делаем "инверсию" значения св-ва
					}
					// 'toolbar-center
					// (!) idBannerShowHide - кнопка-переключатель Показать/Скрыть баннер
					else if (e.target.id === "idBannerShowHide") {
						setBannerShowHide(!e.target.checked); // - делаем инверсию значения, т.к.на событии click значение e.target.checked уже изменено
					}
					// (!) idTextExpandCollapse - кнопка-переключатель Развернуть/Свернуть скрытый контент
					else if (e.target.id === "idTextExpandCollapse") {
						if (location.origin === "file://") { // - при локальном использовании
							// (i) в Firefox не работает
							let msg = {
								value: "setToggleElement",
								btnChecked: e.target.checked
							};
							frames.hmcontent.postMessage(msg, '*'); // (?) когда звездочка - это плохое использование в целях безопасности от взлома страниц
						} else {
							let js = getLightboxLink(frames.hmcontent); // - получить скрипт - ссылка на lightbox.js и вернуть DOM-элемент lightbox
							if (js === null){
								js = setLightboxLink(frames.hmcontent) // - создать скрипт - ссылка на lightbox.js и вернуть DOM-элемент lightbox
								if (js) {
									js.addEventListener("load", function (event) {
										frames.hmcontent.setToggleElement(null, e.target.checked); // развернуть/свернуть скрытый контент
									}, {once: true});
								}
							} else {
								frames.hmcontent.setToggleElement(null, e.target.checked); // - развернуть/свернуть скрытый контент
							}
						}
					}
				} else if (e.target.tagName === "IMG") {
					// 'toolbar-search
					// (!) idQuickSearchOn - кнопка Быстрый поиск - поиск разделов справки
					if (e.target.id === "idQuickSearchOn") {
						setQuickSearch();
					}
					// (i) toolbar-left
					// (!) idTopicOn - кнопка Обзор
					else if (e.target.id === "idTopicOn") {
						let tab = document.getElementById('idTopicTab');
						if (tab.classList.contains('topic-tab-current')) return;
						setTabShowHide(tab, 'show'); // - показать/скрыть текущую вкладку
					}
					// (!) idIndexOn - кнопка Ключевые слова
					else if (e.target.id === "idIndexOn") {
						let tab = document.getElementById('idIndexTab');
						if (tab.classList.contains('topic-tab-current')) return;
						setTabShowHide(tab, 'show'); // - показать/скрыть текущую вкладку
					}
					// (!) idSearchOn - кнопка Поиск
					else if (e.target.id === "idSearchOn") {
						let tab = document.getElementById('idSearchTab');
						if (tab.classList.contains('topic-tab-current')) return;
						setTabShowHide(tab, 'show'); // - показать/скрыть текущую вкладку
					}
					// (!) idUndockTabOn - кнопка Открепить
					else if (e.target.id === "idUndockTabOn") {
						alert(`(i) Кнопка «Открепить» на панели пока что в разработке.`);
						// setUndockTab(elem);
					}
					// (!) idNewTabOn - кнопка Новая вкладка
					else if (e.target.id === "idNewTabOn") {
						setNewTab();
					}
					// (i) toolbar-right
					// (!) idPermalinkOn - кнопка Постоянная ссылка
					else if (e.target.id === "idPermalinkOn") {
						let plnk = document.getElementById('idPermaLink');
						if (plnk !== null || typeof(plnk) !== "undefined" && plnk === Object(plnk)) {
							if (plnk.style.display === "none") {
								document.getElementById('idTextArea').innerHTML = hmpermalink.url + window.top.location.hash;
								// let src = document.getElementById('hmcontent').getAttribute('src');
								// document.getElementById('idTextArea').innerHTML = window.top.location.origin + window.top.location.pathname + "?" + src + window.top.location.hash;
								setEventHandlersPermalink(plnk, 'add'); // - создание/удаление обработчиков событий для узла permalink
							} else {
								clearPermalink(); // - очищение инфо-подсказок при закрытии окна Постоянная ссылка
								setEventHandlersPermalink(plnk, 'remove'); // - создание/удаление обработчиков событий для узла permalink
							}
							setShowHideWindow(plnk);
						}
					}
					// (!) idPrinterOn - кнопка Печать
					else if (e.target.id === "idPrinterOn") {
						setPrintTopic(e.target.parentElement);
					}
					// (!) idPageHome - кнопка Домой
					else if (e.target.id === "idPageHome") {
						goToPageHome(e.target.parentElement); // (i) если вариант 1
						// (i) если вариант 2 - при очень интенсивных кликах браузер может не успевать и будет срабатывать ошибка
						// setTimeout(() => { // - без задержки стр.загружается с опозданием
						// 	goToPageHome(e.target.parentElement);
						// }, 1000); // 'если вариант 2
					}
					// (!) idPagePreviousOn - кнопка Назад
					else if (e.target.id === "idPagePreviousOn") {
						goToPagePrevious(e.target.parentElement); // (i) если вариант 1
						// (i) если вариант 2 - при очень интенсивных кликах браузер может не успевать и будет срабатывать ошибка
						// setTimeout(() => { // - без задержки стр.загружается с опозданием
						// 	goToPagePrevious(e.target.parentElement);
						// }, 1000); // 'если вариант 2
					}
					// (!) idPageNextOn - кнопка Вперед
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
		// (i)*idTopicPane - События на панеле тема (топика)
		// (!) idTopicPaneNavShowHide - кнопка-переключатель Скрыть/Показать нав.пан.
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
		// (!) idTabsCtab - кнопки переключения между вкладками. Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
		if (document.getElementById('idTabsCtab') !== null && typeof (document.getElementById('idTabsCtab')) === "object") {
			// 'click
			document.getElementById('idTabsCtab').addEventListener("click", function (e) {
				if (e.target.tagName === "IMG") {
					// (!) idToggleMenuTab - показать/скрыть меню вкладок
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
		// (!) idTabsMenuBox - меню вкладок. Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
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
		// (!) idTopicTabs - События вкладок. Используем делегирование событий, прослушивая общий элемент для всех дочерних элементов
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
			// 'animationend - по окончанию анимации удаляем css св-во "animation", иначе она больше не будет воспроизводиться
			document.getElementById('idTopicTabs').addEventListener("animationend", function (e) {
				e.target.style.removeProperty('animation'); // удаляем css св-во
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
// x (!) animateNavPane - через CSS
// function animateNavPane (elem, animationName, valueShowHide) {
// 	if (elem.id === "idNavPane") {
// 		if (valueShowHide === "show") {
// 			elem.style.removeProperty('display'); // 'отображаем нав.пан.
// 		}
// 	}
// 	// x (?) test - удалить, если все работает
// 	elem.style.removeProperty('animation'); // удаляем css св-во
// 	// elem.style.animationFillMode = "backwards"; // Элемент сохранит стиль первого ключевого кадра на протяжении периода animation-delay. Первый ключевой кадр определяется значением animation-direction
// 	elem.style.animation = animationName; // имя @keyframes в файле styles.css
// 	elem.style.animationDuration = "2s"; // длительность анимации
// 	elem.style.animationDelay = "0ms"; // время задержки перед стартом анимации
// 	elem.style.willChange = "animation"; // (i) св-во will-change - экспериментальная технология, заранее передает браузеру инфу о возможном предстоящем изменении элемента
// 	// elem.style.animationFillMode = "both"; // Анимация будет вести себя так, как будто значения forwards и backwards заданы одновременно
// 	// elem.style.animationFillMode = "forwards"; // По окончании анимации элемент сохранит стили последнего ключевого кадра, который определяется значениями animation-direction и animation-iteration-count
// 	if (elem.id === "idNavPane") {
// 		if (valueShowHide === "hide") {
// 			setTimeout(() => {
// 				elem.style.display = "none"; // 'скрываем нав.пан.
// 			}, 2000);
// 		}
// 	}
// 	// x (?) test - удалить, если все работает
// 	elem.style.removeProperty('animation'); // удаляем css св-во
// 	elem.style.removeProperty('will-change'); // удаляем css св-во
// }
// (!) easeInOut
function easeInOut (x, direct = "") {
	// Переменная x это интервал, прогресс анимации, где 0 (начало анимации) и 1 (конец анимации)
	const c1 = 1.70158;
	const c2 = c1 * 1.525;

	if (direct === "backPositive") { // - назад положительный
		return x < 0.5
		? 1 + (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
		: 1 + (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
	} else if (direct === "backNegative") { // - назад отрицательный
		return x < 0.5
		? 1 - (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
		: 1 - (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
	} else { // оригинал
		return x < 0.5
		? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
		: (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
	}
}
// (!) animationNavPane - окно браузера > 500
function animationNavPane (duration = 1000, panels, valueShowHide = "show") {
	// (i) отключить анимацию в styles.css
	let newPosition = { navpane: null, topicpane: null };
	let distance = null; // - расстояние
	if (valueShowHide === "hide") {
		distance = parseInt(getComputedStyle(panels.topicpane, null).left, 10);
	} else if (valueShowHide === "show") {
		panels.navpane.style.removeProperty('display'); // удаляем css св-во - отображаем нав.пан.
		distance = parseInt(getComputedStyle(panels.navpane, null).left, 10);
	}
	const startTime = performance.now(); // - метод производительности выраженный в миллисекундах
	rafId = requestAnimationFrame(function animate(time) {
		if (!startTime) { startTime = time; } // - при первом вызове сохраняется время, если startTime не известно
		// *разница между текущим и начальным временем, поделенная на длиительность анимации (некое число - интервал от 0 до 1, где 0 - начало анимации, а 1 - конец анимации)
		let interval = (time - startTime) / duration;
		if (interval > 1) interval = 1;
		if (valueShowHide === "hide") { // (!) проверить вариант с упрощенной записью вычисления, но с условием для ф.easeInOut()
			newPosition.topicpane = easeInOut(interval, "backNegative") * distance;
			newPosition.navpane = newPosition.topicpane - distance;
		} else if (valueShowHide === "show") {
			newPosition.navpane = easeInOut(interval, "backNegative") * distance;
			newPosition.topicpane = newPosition.navpane - distance;
		}
		panels.navpane.style.left = newPosition.navpane + "px";
		panels.topicpane.style.left = newPosition.topicpane + "px";
		if (interval < 1) { // - планируем новый кадр
			rafId = requestAnimationFrame(animate);
		} else {
			cancelAnimationFrame(rafId);
			rafId = null;
			if (valueShowHide === "hide") {
				// setTimeout(() => {
					panels.navpane.style.display = "none"; // 'скрываем пан.нав.
				// }, duration);
				panels.topicpane.style.removeProperty('left'); // удаляем css св-во
			} else if (valueShowHide === "show") {
				panels.navpane.style.removeProperty('left'); // удаляем css св-во
				if (reSizes.topicpaneStyleLeft === 0 || reSizes.topicpaneStyleLeft === 304) {
					panels.topicpane.style.removeProperty('left'); // удаляем css св-во
				} else {
					panels.topicpane.style.left = reSizes.topicpaneStyleLeft + "px";
				}
			}
		}
	});
}
// (!) animationNavPane500 - окно браузера < 500
// (!) animationNavPane500 - вар.1
// function animationNavPane500 (duration = 1000, panels, valueShowHide = "show") {
// 	// (i) отключить анимацию в styles.css
// 	let newPosition = { navpane: null, topicpane: null };
// 	let startPos = null; // - начальная точка движения
// 	let endPos = null; // - конечная точка движения
// 	if (valueShowHide === "hide") {
// 		startPos = parseInt(getComputedStyle(panels.topicpane, null).top, 10);
// 		endPos = parseInt(getComputedStyle(panels.navpane, null).top, 10);
// 	} else if (valueShowHide === "show") {
// 		startPos = parseInt(getComputedStyle(panels.navpane, null).top, 10);
// 		endPos = parseInt(getComputedStyle(panels.topicpane, null).top, 10);
// 		navpane.style.removeProperty('display'); // - после получения значения отображаем нав.пан. - удаляем css св-во
// 	}
// 	const distance = startPos - endPos; // - расстояние
// 	const startTime = performance.now(); // - метод производительности выраженный в миллисекундах
// 	rafId = requestAnimationFrame(function animate(time) {
// 		if (!startTime) { startTime = time; } // - при первом вызове сохраняется время, если startTime не известно
// 		// *разница между текущим и начальным временем, поделенная на длиительность анимации (некое число - интервал от 0 до 1, где 0 - начало анимации, а 1 - конец анимации)
// 		let interval = (time - startTime) / duration;
// 		if (interval > 1) interval = 1;
// 		let progress = easeInOut(interval, "backNegative");
// 		if (valueShowHide === "hide") {
// 			newPosition.navpane = ((distance * progress) - (startPos - endPos)) + endPos + panels.banner.offsetHeight;
// 			newPosition.topicpane = (distance * progress) + endPos + panels.banner.offsetHeight;
// 		} else if (valueShowHide === "show") {
// 			newPosition.navpane = (distance * progress) + endPos;
// 			newPosition.topicpane = ((distance * progress) - (startPos - endPos)) + endPos;
// 		}
// 		panels.navpane.style.top = newPosition.navpane + "px";
// 		panels.topicpane.style.top = newPosition.topicpane + "px";

// 		if (interval < 1) { // - планируем новый кадр
// 			rafId = requestAnimationFrame(animate);
// 		} else {
// 			cancelAnimationFrame(rafId);
// 			rafId = null;
// 			if (valueShowHide === "hide") {
// 				// setTimeout(() => {
// 					panels.navpane.style.display = "none"; // 'скрываем нав.пан.
// 				// }, duration);
// 			} else if (valueShowHide === "show") {
// 				panels.navpane.style.removeProperty('top'); // удаляем css св-во
// 			}
// 			panels.topicpane.style.removeProperty('top'); // удаляем css св-во
// 		}
// 	});
// }
function animationNavPane500 (duration = 1000, panels, valueShowHide = "show") {
	// (i) отключить анимацию в styles.css
	let newPosition = { navpane: null, topicpane: null };
	if (valueShowHide === "show") { // пан.нав.скрыта, отображаем
		panels.navpane.style.removeProperty('display'); // удаляем css св-во
	}
	// (i) дистанция равная ширине пан.нав.не дает правильного вычисления
	const distance = parseInt(getComputedStyle(panels.topicpane, null).top, 10) - parseInt(getComputedStyle(panels.navpane, null).top, 10); // - расстояние (354)
	const startTime = performance.now(); // - метод производительности выраженный в миллисекундах
	rafId = requestAnimationFrame(function animate(time) {
		if (!startTime) { startTime = time; } // - при первом вызове сохраняется время, если startTime не известно
		// *разница между текущим и начальным временем, поделенная на длиительность анимации (некое число - интервал от 0 до 1, где 0 - начало анимации, а 1 - конец анимации)
		let interval = (time - startTime) / duration;
		if (interval > 1) interval = 1;
		let progress;
		if (valueShowHide === "show") {
			progress = easeInOut(interval);
			// progress = easeInOut(interval, "backPositive");
		} else if (valueShowHide === "hide") {
			progress = easeInOut(interval, "backNegative");
		}
		newPosition.navpane = ((distance * progress) - distance) + panels.banner.offsetHeight + panels.toolbar.offsetHeight + parseInt(getComputedStyle(panels.toolbar, null).marginTop, 10);
		if (valueShowHide === "show") {
			if (document.body.clientHeight <= parseInt(getComputedStyle(panels.topicpane, null).top, 10) + parseInt(getComputedStyle(panels.topicpane, null).marginTop, 10)) { // - пан.нав.притянута к низу
				panels.navpane.style.height = (document.body.clientHeight - newPosition.navpane - parseInt(getComputedStyle(panels.navpane, null).paddingTop, 10) - parseInt(getComputedStyle(panels.navpane, null).paddingBottom, 10) - parseInt(getComputedStyle(panels.navpane, null).borderTop, 10) - parseInt(getComputedStyle(panels.navpane, null).borderBottom, 10) - parseInt(getComputedStyle(panels.navpane, null).marginTop, 10) - parseInt(getComputedStyle(panels.navpane, null).marginBottom, 10)) + "px";
				newPosition.topicpane = parseInt(getComputedStyle(panels.topicpane, null).top, 10);
			} else {
				newPosition.topicpane = (distance * progress) + panels.banner.offsetHeight + panels.toolbar.offsetHeight + parseInt(getComputedStyle(panels.toolbar, null).marginTop, 10);
			}
		} else {
			newPosition.topicpane = (distance * progress) + panels.banner.offsetHeight + panels.toolbar.offsetHeight + parseInt(getComputedStyle(panels.toolbar, null).marginTop, 10);
		}
		panels.navpane.style.top = newPosition.navpane + "px";
		panels.topicpane.style.top = newPosition.topicpane + "px";
		if (interval < 1) { // - планируем новый кадр
			rafId = requestAnimationFrame(animate);
		} else {
			cancelAnimationFrame(rafId);
			rafId = null;
			if (valueShowHide === "hide") {
				// setTimeout(() => {
					panels.navpane.style.display = "none"; // 'скрываем нав.пан.
					panels.topicpane.style.removeProperty('top'); // удаляем css св-во
				// }, duration);
			} else if (valueShowHide === "show") {
				panels.navpane.style.removeProperty('top'); // удаляем css св-во
				// panels.topicpane.style.removeProperty('top'); // удаляем css св-во // (?)'не получается учесть случай когда значение top по умолчанию, т.е.не изменено splitterBottom
			}
		}
	});
}
// (!) setNavPaneShowHide - скрыть/показать боковую панель навигации
function setNavPaneShowHide (panelShowHide = true) {
	let imgNavHandle = document.getElementById('idTopicPaneNavShowHideIcon'); // - трансформации иконки на панели тема топика
	let panels = {
		banner: document.getElementById('idBanner'),
		toolbar: document.getElementById('idToolbarPane'),
		navpane: document.getElementById('idNavPane'),
		topicpane: document.getElementById('idTopicPane')
	};
	const duration = 2000; // - длительность анимации
	// (i) использовалось при ф.animateNavPane() - анимация через css
	// // *создаем обработчики события, чтобы удалить css св-во "animation" по окончанию воспроизведения анимации, иначе она больше не будет воспроизводиться
	// panels.banner.addEventListener("animationend", (event) => {
	// 	event.target.style.removeProperty('animation'); // удаляем css св-во
	// 	event.target.style.removeProperty('will-change'); // удаляем css св-во
	// }, false); // false - фаза "всплытие"
	// panels.toolbar.addEventListener("animationend", (event) => {
	// 	event.target.style.removeProperty('animation'); // удаляем css св-во
	// 	event.target.style.removeProperty('will-change'); // удаляем css св-во
	// }, false); // false - фаза "всплытие"
	// panels.navpane.addEventListener("animationend", (event) => {
	// 	event.target.style.removeProperty('animation'); // удаляем css св-во
	// 	event.target.style.removeProperty('will-change'); // удаляем css св-во
	// }, false); // false - фаза "всплытие"
	// panels.topicpane.addEventListener("animationend", (event) => {
	// 	event.target.style.removeProperty('animation'); // удаляем css св-во
	// 	event.target.style.removeProperty('will-change'); // удаляем css св-во
	// }, false); // false - фаза "всплытие"
	document.getElementById('idToolbarNavShowHide').disabled = true; // 'делаем кнопку НЕдоступной для нажатия, пока не выполнится анимация
	// *оба checkbox должны работать синхронно
	if (panelShowHide) { // - нав.пан.раскрыта
		if (panels.banner.style.display === "none") {
			// *проверяем внутренний размер окна без полос прокрутки
			if (document.documentElement.clientWidth > 500) {
				animationNavPane(duration, panels, "hide");
				// animateNavPane(panels.navpane, "navpaneHide", "hide"); // x не используется
				// animateNavPane(panels.topicpane, "topicpaneNavPaneHide", "hide"); // x не используется
			} else if (document.documentElement.clientWidth < 501) {
				animationNavPane500(duration, panels, "hide");
				// animateNavPane(panels.navpane, "navpaneHide", "hide"); // x не используется
				// animateNavPane(panels.topicpane, "topicpaneExtend", "hide"); // x не используется
			}
			panels.topicpane.classList.remove('topic-pane-expand');
			panels.topicpane.classList.add('topic-pane-extend'); // - изм.одну высоту пан.топика на др.
		} else {
			// *проверяем внутренний размер окна без полос прокрутки
			if (document.documentElement.clientWidth > 500) {
				animationNavPane(duration, panels, "hide");
				// animateNavPane(panels.navpane, "navpaneHide", "hide"); // x не используется
				// animateNavPane(panels.topicpane, "topicpaneNavPaneHide", "hide"); // x не используется
			} else if (document.documentElement.clientWidth < 501) {
				animationNavPane500(duration, panels, "hide");
				// animateNavPane(panels.navpane, "navpaneHideBanner", "hide"); // x не используется
				// animateNavPane(panels.topicpane, "topicpaneExpand", "hide"); // x не используется
			}
			panels.topicpane.classList.remove('topic-pane-extend');
			panels.topicpane.classList.add('topic-pane-expand'); // - изм.одну высоту пан.топика на др.
		}
		// *трансформация иконки на кнопке в панели тема топика
		imgNavHandle.classList.remove('navhandle-navpane-show');
		imgNavHandle.classList.add('navhandle-navpane-hide');
		// (i) использовалось при ф.animateNavPane() - анимация через css
		// // *удаляем css св-во, т.к.событие animationend не сработает, если пан.в скрытом состоянии
		// panels.navpane.style.removeProperty('animation');
		// panels.navpane.style.removeProperty('will-change');
	} else { // - нав.пан.скрыта
		// *проверяем внутренний размер окна без полос прокрутки
		if (document.documentElement.clientWidth > 500) {
			animationNavPane(duration, panels, "show");
		// 	animateNavPane(panels.navpane, "navpaneShow", "show"); // x не используется
		// 	animateNavPane(panels.topicpane, "topicpaneNavPaneShow", "show"); // x не используется
		} else if (document.documentElement.clientWidth < 501) {
			animationNavPane500(duration, panels, "show");
		// 	if (document.getElementById('idBanner').style.display === "none") { // x не используется
		// 		animateNavPane(panels.navpane, "navpaneShow", "show");
		// 		animateNavPane(panels.topicpane, "topicpaneNavPaneShow", "show");
		// 	} else {
		// 		animateNavPane(panels.navpane, "navpaneShowBanner", "show");
		// 		animateNavPane(panels.topicpane, "topicpaneNavPaneShowBanner", "show");
		// 	}
		}
		panels.topicpane.classList.remove('topic-pane-extend');
		panels.topicpane.classList.remove('topic-pane-expand');
		// *трансформация иконки на кнопке в панели тема топика
		imgNavHandle.classList.remove('navhandle-navpane-hide');
		imgNavHandle.classList.add('navhandle-navpane-show');
	}
	document.getElementById('idToolbarNavShowHide').disabled = false; // 'делаем кнопку доступной для нажатия
	// (i) использовалось при ф.animateNavPane() - анимация через css
	// // *удаляем css св-во, т.к.событие animationend не сработает, если пан.в скрытом состоянии
	// if (panels.banner.style.display === "none" || panels.banner.style.visibility === "hidden") {
	// 	panels.banner.style.removeProperty('animation');
	// 	panels.banner.style.removeProperty('will-change');
	// }
}
// (!) setQuickSearch - быстрый поиск - поиск разделов справки
function setQuickSearch () {
	alert(`(i) Кнопка «Быстрый поиск» на панели пока что в разработке.`);
}
// (!) setUndockTab - открепить текущую вкладку
function setUndockTab (elem) {
	// console.log(elem.getAttribute('tabnum')); // x -
	if (+elem.getAttribute('tabnum') === 0) {
		alert(`(i) Нельзя открепить вкладку «Главная».\n    Создайте новую вкладку и нажмите кнопку «Открепить».`);
	} else if (+elem.getAttribute('tabnum') > 0) { // - открепляем текущую вкладку
		alert(`(i) Функция открепить вкладку, пока что в разработке.`);
	}
}
// (!) setNewTab - создать новую вкладку
function setNewTab () {
	alert(`(i) Кнопка «Новая вкладка» на панели пока что в разработке.`);
}
// x (!) animateBanner - через CSS
// function animateBanner (elem, animationName, valueShowHide) { // TODO: переделать анимацию через js
// 	if (elem.id === "idBanner") {
// 		if (valueShowHide === "show") {
// 			elem.style.removeProperty('display'); // 'отображаем баннер
// 		}
// 	}
// 	// x (?) test - удалить, если все работает
// 	// elem.style.removeProperty('animation'); // удаляем css св-во
// 	// 'временно изм.стиль, чтобы не возникала ошибка при изменении размера окна браузера
// 	// let isDisplayNone = false;
// 	// if (elem.id === "idNavPane") {
// 	// 	if (elem.style.display === "none" || elem.style.visibility === "hidden") {
// 	// 		elem.style.removeProperty('display'); // удаляем css св-во
// 	// 		isDisplayNone = true;
// 	// 	}
// 	// } // 'временно изм.стиль, чтобы не возникала ошибка при изменении размера окна браузера
// 	// elem.style.animationFillMode = "backwards"; // Элемент сохранит стиль первого ключевого кадра на протяжении периода animation-delay. Первый ключевой кадр определяется значением animation-direction
// 	elem.style.animation = animationName; // имя @keyframes в файле styles.css
// 	elem.style.animationDuration = "1.5s"; // длительность анимации
// 	elem.style.animationDelay = "0ms"; // время задержки перед стартом анимации
// 	elem.style.willChange = "animation"; // (i) св-во will-change - экспериментальная технология, заранее передает браузеру инфу о возможном предстоящем изменении элемента
// 	// elem.style.animationFillMode = "both"; // Анимация будет вести себя так, как будто значения forwards и backwards заданы одновременно
// 	// elem.style.animationFillMode = "forwards"; // По окончании анимации элемент сохранит стили последнего ключевого кадра, который определяется значениями animation-direction и animation-iteration-count

// 	// if (isDisplayNone) { // 'возвращаем стиль обратно
// 	// 	elem.style.display = "none";
// 	// 	isDisplayNone = false;
// 	// } // 'возвращаем стиль обратно

// 	// if (elem.id === "idNavPane") {
// 	// 	if (valueShowHide === "show") {
// 	// 		elem.style.top
// 	// 	} else if (valueShowHide === "hide") {
// 	// 	}
// 	// }
// 	// x (?) test - удалить, если все работает
// 	// elem.style.removeProperty('animation'); // удаляем css св-во
// 	// elem.style.removeProperty('will-change'); // удаляем css св-во
// 	if (elem.id === "idBanner") {
// 		if (valueShowHide === "hide") {
// 			setTimeout(() => {
// 				elem.style.display = "none"; // 'скрываем баннер
// 			}, 1500);
// 		}
// 	}
// }
// (!) easeInOutLiner
function easeInOutLiner (time, valueShowHide = "") {
	if (valueShowHide === "show") {
		return 0.5 * (1 - Math.cos(Math.PI * time));
	} else if (valueShowHide === "hide") {
		return 0.5 * (1 + Math.cos(Math.PI * time));
	} else {
		return 0.5 * (Math.cos(Math.PI * time));
	}
}
// (!) animationBanner
function animationBanner (duration = 1000, panels, valueShowHide = "hide") {
	// (i) отключить анимацию в styles.css
	let newPosition = { banner: null, toolbar: null, navpane: null, topicpane: null };
	if (valueShowHide === "show") { // баннер скрыт, отображаем
		panels.banner.style.removeProperty('display'); // удаляем css св-во
	}
	// console.log(panels.navpane.getBoundingClientRect()); // - вернет координаты элемента
	let distance = panels.banner.offsetHeight; // - расстояние
	const startTime = performance.now(); // - метод производительности выраженный в миллисекундах
	rafId = requestAnimationFrame(function animate(time) {
		if (!startTime) { startTime = time; } // - при первом вызове сохраняется время, если startTime не известно
		// *разница между текущим и начальным временем, поделенная на длиительность анимации (некое число - интервал от 0 до 1, где 0 - начало анимации, а 1 - конец анимации)
		let interval = (time - startTime) / duration;
		if (interval > 1) interval = 1;
		let progress = easeInOutLiner(interval, valueShowHide);
		newPosition.toolbar = newPosition.banner = (progress * distance) - distance;
		if (document.documentElement.clientWidth > 500) {
			newPosition.topicpane = newPosition.navpane = (progress * distance) + panels.toolbar.offsetHeight + parseInt(getComputedStyle(panels.toolbar, null).marginTop, 10);
		} else if (document.documentElement.clientWidth < 501) {
			if (panels.navpane.style.display === "none") {
				panels.navpane.style.removeProperty('display'); // для получения св-тв элемента
				newPosition.navpane = ((newPosition.toolbar + panels.toolbar.offsetHeight + parseInt(getComputedStyle(panels.toolbar, null).marginTop, 10) + distance) - panels.navpane.offsetHeight - parseInt(getComputedStyle(panels.navpane, null).marginTop, 10));
				newPosition.topicpane = newPosition.navpane + panels.navpane.offsetHeight + parseInt(getComputedStyle(panels.navpane, null).marginBottom, 10);
				panels.navpane.style.display = "none";
			} else {
				// newPosition.navpane = distance + newPosition.toolbar + panels.toolbar.offsetHeight + parseInt(getComputedStyle(panels.toolbar, null).marginTop, 10); // или
				newPosition.navpane = (progress * distance) + panels.toolbar.offsetHeight + parseInt(getComputedStyle(panels.toolbar, null).marginTop, 10);
				if (document.body.clientHeight === (parseInt(getComputedStyle(panels.topicpane, null).top, 10) + parseInt(getComputedStyle(panels.topicpane, null).marginTop, 10))) { // - пан.нав.притянута к низу
					panels.navpane.style.height = (document.body.clientHeight - newPosition.navpane - parseInt(getComputedStyle(panels.navpane, null).paddingTop, 10) - parseInt(getComputedStyle(panels.navpane, null).paddingBottom, 10) - parseInt(getComputedStyle(panels.navpane, null).borderTop, 10) - parseInt(getComputedStyle(panels.navpane, null).borderBottom, 10) - parseInt(getComputedStyle(panels.navpane, null).marginTop, 10) - parseInt(getComputedStyle(panels.navpane, null).marginBottom, 10)) + "px";
					newPosition.topicpane = parseInt(getComputedStyle(panels.topicpane, null).top, 10);
				} else {
					newPosition.topicpane = newPosition.navpane + panels.navpane.offsetHeight + parseInt(getComputedStyle(panels.navpane, null).marginBottom, 10);
				}
			}
		}
		// *
		panels.banner.style.top = newPosition.banner + "px";
		panels.toolbar.style.top = newPosition.toolbar + "px";
		panels.navpane.style.top = newPosition.navpane + "px";
		panels.topicpane.style.top = newPosition.topicpane + "px";
		if (interval < 1) { // - планируем новый кадр
			rafId = requestAnimationFrame(animate);
		} else {
			cancelAnimationFrame(rafId);
			rafId = null;
			if (valueShowHide === "hide") {
				panels.banner.style.display = "none"; // 'скрываем баннер
			}
			panels.banner.style.removeProperty('top');
			panels.toolbar.style.removeProperty('top');
			if (panels.navpane.style.display !== "none") {
				panels.navpane.style.removeProperty('top');
			} else {
				panels.topicpane.style.removeProperty('top');
			}
		}
	});
}
// (!) setBannerShowHide - показать/скрыть баннер
// *js/JavaScript
function setBannerShowHide (bannerShowHide = false) {
	let panels = {
		banner: document.getElementById('idBanner'),
		toolbar: document.getElementById('idToolbarPane'),
		navpane: document.getElementById('idNavPane'),
		topicpane: document.getElementById('idTopicPane')
	};
	// console.log(panels.navpane.getBoundingClientRect()); // - вернет координаты элемента
	const duration = 1500; // - длительность анимации
	// (i) использовалось при ф.animateBanner() - анимация через css
	// // *создаем обработчики события, чтобы удалить css св-во "animation" по окончанию воспроизведения анимации, иначе она больше не будет воспроизводиться
	// panels.banner.addEventListener("animationend", (event) => {
	// 	event.target.style.removeProperty('animation'); // удаляем css св-во
	// 	event.target.style.removeProperty('will-change'); // удаляем css св-во
	// }, false); // false - фаза "всплытие"
	// panels.toolbar.addEventListener("animationend", (event) => {
	// 	event.target.style.removeProperty('animation'); // удаляем css св-во
	// 	event.target.style.removeProperty('will-change'); // удаляем css св-во
	// }, false); // false - фаза "всплытие"
	// panels.navpane.addEventListener("animationend", (event) => {
	// 	event.target.style.removeProperty('animation'); // удаляем css св-во
	// 	event.target.style.removeProperty('will-change'); // удаляем css св-во
	// }, false); // false - фаза "всплытие"
	// panels.topicpane.addEventListener("animationend", (event) => {
	// 	event.target.style.removeProperty('animation'); // удаляем css св-во
	// 	event.target.style.removeProperty('will-change'); // удаляем css св-во
	// }, false); // false - фаза "всплытие"
	// *переключение классов и стилей
	// panels.banner.style.display == "none" ? panels.banner.style.display = "" : panels.banner.style.display = "none"; // однострочная запись - переключатель toggle через условный тернарный оператор (?:) с тремя операндами в JavaScript
	if (bannerShowHide) { // - баннер раскрыт - скрываем его
		animationBanner(duration, panels, "hide");
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
		// // *проверяем внутренний размер окна без полос прокрутки
		// if (document.documentElement.clientWidth > 500) {
			// animateBanner(panels.banner, "bannerHide", "hide"); // x не используется
			// animateBanner(panels.toolbar, "bannerHide", "hide"); // x не используется
			// animateBanner(panels.navpane, "panelBannerHide", "hide"); // x не используется
			// animateBanner(panels.topicpane, "panelBannerHide", "hide"); // x не используется
		// } else if (document.documentElement.clientWidth < 501) {
			// animateBanner(panels.banner, "bannerHide", "hide"); // x не используется
			// animateBanner(panels.toolbar, "bannerHide", "hide"); // x не используется
			// animateBanner(panels.navpane, "panelBannerHide", "hide"); // x не используется
			// if (panels.navpane.style.display === "none" || panels.navpane.style.visibility === "hidden") {
			// 	// *корректируем высоту
			// 	panels.navpane.style.top = (parseInt(getComputedStyle(panels.navpane, null).top, 10) - (panels.banner.offsetHeight - parseInt(getComputedStyle(panels.navpane, null).marginBottom, 10))) + "px";
			// 	animateBanner(panels.topicpane, "panelBannerHide", "hide"); // x не используется
			// } else {
			// 	animateBanner(panels.topicpane, "topicpaneBannerHide", "hide"); // x не используется
			// }
		// }
		// (i) использовалось при ф.animateNavPane() - анимация через css
		// // *удаляем css св-во, т.к.событие animationend не сработает, если пан.в скрытом состоянии
		// let intId = setInterval(() => {
		// 	if (panels.banner.style.display === "none" || panels.banner.style.visibility === "hidden") {
		// 		clearInterval(intId);
		// 		panels.banner.style.removeProperty('animation');
		// 		panels.banner.style.removeProperty('will-change');
		// 	}
		// }, 500);
	} else { // - баннер скрыт - отображаем его
		animationBanner(duration, panels, "show");
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
		// // *проверяем внутренний размер окна без полос прокрутки
		// if (document.documentElement.clientWidth > 500) {
			// animateBanner(panels.banner, "bannerShow", "show"); // x не используется
			// animateBanner(panels.toolbar, "bannerShow", "show"); // x не используется
			// animateBanner(panels.navpane, "panelBannerShow", "show"); // x не используется
			// animateBanner(panels.topicpane, "panelBannerShow", "show"); // x не используется
		// } else if (document.documentElement.clientWidth < 501) {
			// animateBanner(panels.banner, "bannerShow", "show"); // x не используется
			// animateBanner(panels.toolbar, "bannerShow", "show"); // x не используется
			// animateBanner(panels.navpane, "panelBannerShow", "show"); // x не используется
			// if (panels.navpane.style.display === "none" || panels.navpane.style.visibility === "hidden") {
			// 	// *корректируем высоту
			// 	panels.navpane.style.top = (parseInt(getComputedStyle(panels.navpane, null).top, 10) + (panels.banner.offsetHeight - parseInt(getComputedStyle(panels.navpane, null).marginBottom, 10))) + "px";
			// 	animateBanner(panels.topicpane, "panelBannerShow", "show"); // x не используется
			// } else {
			// 	animateBanner(panels.topicpane, "topicpaneBannerShow", "show"); // x не используется
			// }
		// }
	}
	// (i) использовалось при ф.animateNavPane() - анимация через css
	// // *удаляем css св-во, т.к.событие animationend не сработает, если пан.в скрытом состоянии
	// if (panels.navpane.style.display === "none" || panels.navpane.style.visibility === "hidden") {
	// 	panels.navpane.style.removeProperty('animation');
	// 	panels.navpane.style.removeProperty('will-change');
	// }
}
// *jq/jQuery
// function setBannerShowHide () {
// 	let banner = document.getElementById('idBanner'); // js, удобнее использовать
// 	let toolbar = document.getElementById('idToolbarPane'); // js, удобнее использовать
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
// (!) setPrintTopic - распечатать
function setPrintTopic (elem) {
	let wndProp = "width=960,height=970,left=" + ((screen.width - 960) / 2) + ",top=0,toolbar=1,scrollbars=1,location=0,status=1,menubar=1,titlebar=1,resizable=1"; // - menubar=0 - отд.окно
	windowOpen(hmtopicvars.currP, wndProp);
	// print();
	alert(`(i) Кнопка «Печать» на панели пока что в разработке.`);
}
// (!) setGoToPage - установка перехода на страницу
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
// (!) goToPageHome - перейти на вкладку главная
function goToPageHome (elem) {
	setGoToPage(elem); // - установка перехода на страницу
	hmtopicvars.currP = hmnavpages.def = hmnavpages.query = hmtopicvars.homeP; // - обновляем глобальные переменные в variables.js
}
// (!) goToPagePrevious - перейти назад
function goToPagePrevious (elem) {
	setGoToPage(elem); // - установка перехода на страницу
	// *обновляем глобальные переменные в variables.js
	hmtopicvars.nextP = hmtopicvars.currP;
	hmtopicvars.currP = hmnavpages.def = hmnavpages.query = hmtopicvars.prevP;
}
// (!) goToPageNext - перейти вперед
function goToPageNext (elem) {
	setGoToPage(elem); // - установка перехода на страницу
	// *обновляем глобальные переменные в variables.js
	hmtopicvars.prevP = hmtopicvars.currP;
	if (location.search === "") { // (i) чтобы не грузить 2-жды одну и ту же страницу, если сайт загружен первично
		hmtopicvars.currP = hmnavpages.def = hmnavpages.query = hmtopicvars.nextP;
	}
}
// (i)*idTopicPane - элементы для панели тема топика
// (!) goToTab - переход между вкладками
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