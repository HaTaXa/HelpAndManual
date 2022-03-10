// document.addEventListener('DOMContentLoaded', function(){} // - js. Дожидаемся, когда Объектная модель документа страницы (DOM) будет готова к выполнению кода JavaScript
window.onload = function () { // - js. Сработает, как только вся страница (изображения или встроенные фреймы), а не только DOM, будет готово
	window.onresize = function () {
		setPositionPanels(document.getElementById('idNavPane'), document.getElementById('idTopicPane'));
	}
}
// $(window).load(function () {} // - jq
$(document).ready(function () { // - jq
	// (i) EVENTS
	// (!)*document
	if ($(document) !== null) {
		$(document).click(function (e) {
			// console.log(`$(document).click(function (${e.target.tagName}, ${e.target.id})\n e.target.classList: ${e.target.classList}\n 1) document.getElementById('idPermaLink'): ${document.getElementById('idPermaLink')}\n 2) document.getElementById('idNavPane'): ${document.getElementById('idNavPane')}\n 3) document.getElementById('idContentBox'): ${document.getElementById('idContentBox')}`); // X удалить после теста
			// (!) закрыть окно "Постоянная ссылка"
			if (document.getElementById('idPermaLink') === null) {
				// (?) как обратиться к другому dom документу
			} else {
				if ((e.target.id !== "idPermalinkOn") && (e.target.id !== "idTextArea") && (e.target.id !== "idPermaLinkCopy") && (e.target.id !== "idPermaLinkBookmark")) {
					if ((!e.target.classList.contains('popups')) && (!e.target.classList.contains('permalink'))) {
						if (document.getElementById('idPermaLink').style.display !== "none") {
							document.getElementById('idPermaLink').style.display = "none";
						}
					}
				}
			}
			// (!) закрыть окно "Меню вкладок"
			if (document.getElementById('idTabsMenuBox') === null) {
				// (?) как обратиться к другому dom документу
			} else {
				if ((e.target.id !== "idToggleMenuTab") && (e.target.id !== "idTabsList") && (e.target.id !== "idTabsMenu") && (e.target.id !== "idTabsMenuBox")) {
					let elements = document.querySelectorAll('#idTabsList>li');
					if (document.getElementById('idTabsMenuBox').style.display !== "none") {
						document.getElementById('idTabsMenuBox').style.display = "none";
					}
				}
			}
		});
	}
	// (!)*idPermaLink-всплывающее окно "Постоянная ссылка". Используем делегирование событий, прослушивая общий элемент для всех вкладок
	if ($('#idPermaLink') !== null) {
		// 'keyup
		$('#idPermaLink').keyup(function (e) {
			if (e.key === "Escape" || e.keyCode === 27) {
				// console.log(`1) $('#idPermaLink').keyup(function (${e.target.tagName}, ${e.target.id}):\n e.key: ${e.key}, e.keyCode: ${e.keyCode}\n document.activeElement (tagName: ${document.activeElement.tagName}, id: ${document.activeElement.id})`); // X удалить после теста
				if (e.target.tagName === "TEXTAREA") {
					setShowHideWindow(e.target.parentElement.parentElement);
				} else if (e.target.tagName === "INPUT") {
					setShowHideWindow(e.target.parentElement.parentElement);
				} else if (e.target.tagName === "DIV") {
					if (e.target.id === "idPermaLink") {
						setShowHideWindow(e.target);
					} else {
						setShowHideWindow(e.target.parentElement);
					}
				}
				// console.log(`2) $('#idPermaLink').keyup(function (${e.target.tagName}, ${e.target.id}):\n e.key: ${e.key}, e.keyCode: ${e.keyCode}\n document.activeElement (tagName: ${document.activeElement.tagName}, id: ${document.activeElement.id})`); // X удалить после теста
			}
		});
		// 'click
		$('#idPermaLink').on('click', function (e) {
			if (e.target.tagName === "INPUT") {
				// (!) idPermaLinkCopy-кнопка скопировать
				if (e.target.id === "idPermaLinkCopy") {
					setPermaLinkBtnCopy();
				}
				// (!) idPermaLinkBookmark-кнопка в закладки
				else if (e.target.id === "idPermaLinkBookmark") {
					setPermaLinkBtnBookmark();
				}
				// (!) idPermaLinkClose-кнопка закрыть всплывающее окно Постоянная ссылка
				else if (e.target.id === "idPermaLinkClose") {
					setShowHideWindow(e.target.parentElement.parentElement);
				}
			}
		});
	}
	// (i)---
	// (i)*idToolbar-События на панеле инструментов. Используем делегирование событий, прослушивая общий элемент для всех вкладок
	if ($('#idToolbar') != null) {
		// (i) mouseover/mouseout-наведение курсора
		$('#idToolbar').mouseover(function (e) {
			if (e.target.tagName === "IMG") {
				// (!) idFeedBackOn-кнопка e-mail
				if (e.target.id === "idFeedBackOn") {
					// e.target.setAttribute('src', 'image/support.gif');
					e.target.src = "image/support.gif";
				}
			}
		});
		$('#idToolbar').mouseout(function (e) {
			if (e.target.tagName === "IMG") {
				// ! idFeedBackOn-кнопка e-mail
				if (e.target.id === "idFeedBackOn") {
					// e.target.setAttribute('src', 'image/emailon.png');
					e.target.src = "image/emailon.png";
				}
			}
		});
		// (i) change
		$('#idToolbar').on('change', function (e) {
			if (e.target.tagName === "INPUT") {
				// (i) toolbar-search
				// (!) idToolbarNavShowHide-checkbox Скрыть/Показать панель навигации
				if (e.target.id === "idToolbarNavShowHide") {

					// console.log(`1) $('#idToolbar').on('change', function (${e.target.tagName, e.target.id})\n e.target.checked: ${e.target.checked}\n e.target.getAttribute('checked'): ${e.target.getAttribute('checked')}\n document.getElementById('idTopicPaneNavShowHide').checked: ${document.getElementById('idTopicPaneNavShowHide').checked}\n document.getElementById('idTopicPaneNavShowHide').getAttribute('checked'): ${document.getElementById('idTopicPaneNavShowHide').getAttribute('checked')}`); // X удалить после теста

					// $('#idTopicPaneNavShowHide').prop('checked', e.target.checked);
					document.getElementById('idTopicPaneNavShowHide').checked = e.target.checked; // - синхронизируем состояние checked

					// console.log(`2) $('#idToolbar').on('change', function (${e.target.tagName, e.target.id})\n e.target.checked: ${e.target.checked}\n e.target.getAttribute('checked'): ${e.target.getAttribute('checked')}\n document.getElementById('idTopicPaneNavShowHide').checked: ${document.getElementById('idTopicPaneNavShowHide').checked}\n document.getElementById('idTopicPaneNavShowHide').getAttribute('checked'): ${document.getElementById('idTopicPaneNavShowHide').getAttribute('checked')}`); // X удалить после теста
				}
			}
		});
		// (i) click
		$('#idToolbar').on('click', function (e) {
			// console.log(`$('#idToolbar').on('click', function (${e.target.tagName}, ${e.target.id})`); // X удалить после теста

			if (e.target.tagName === "INPUT") {
				// (i) toolbar-search
				// (!) idToolbarNavShowHide-checkbox Скрыть/Показать панель навигации
				if (e.target.id === "idToolbarNavShowHide") {
					// console.log(`$('#idToolbar').on('click', function (${e.target.tagName, e.target.id})\n setNavPaneShowHide(${!e.target.checked})`); // X удалить после теста

					setNavPaneShowHide(!e.target.checked); // - делаем "инверсию" значения св-ва
				}
				// 'toolbar-center
				// (!) idBannerShowHide-кнопка Показать/Скрыть баннер
				else if (e.target.id === "idBannerShowHide") {
					setBannerShowHide(!e.target.checked); // - делаем инверсию значения, т.к.на событии click значение e.target.checked уже изменено
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
					setTabShowHide(document.getElementById('idTopicTab'), 'show');
				}
				// (!) idIndexOn-кнопка Ключевые слова
				else if (e.target.id === "idIndexOn") {
					setTabShowHide(document.getElementById('idIndexTab'), 'show');
				}
				// (!) idSearchOn-кнопка Поиск
				else if (e.target.id === "idSearchOn") {
					setTabShowHide(document.getElementById('idSearchTab'), 'show');
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
				// (i) toolbar-center
				// (!) idExpandOn-кнопка Развернуть/Свернуть
				else if (e.target.id === "idExpandOn") {
					setTextExpandCollapse($(e.target).parents().children('input').checked);
					// if ($(e.target).parents().children('input').checked) {
					// 	setTextExpandCollapse(true);
					// } else {
					// 	setTextExpandCollapse(false);
					// }
				}
				// (i) toolbar-right
				// (!) idPermalinkOn-кнопка Постоянная ссылка
				else if (e.target.id === "idPermalinkOn") {
					// document.getElementById('idTextArea').innerHTML = window.location.href;

					// let iFrame;
					// let iFrame1 = document.getElementById('hmcontent');
					// let iFrame2 = iFrame1.contentWindow;
					// if (iFrame2.readyState === "complete") {
					// 	console.log(`iFrame2.readyState: ${iFrame2.readyState}`);
					// 	iFrame = iFrame2;
					// }
					// iFrame1.onload = function() {
					// 	console.log(`iFrame1.onload = загрузился`);
					// 	iFrame = iFrame1;
					// }
					// document.getElementById('idTextArea').innerHTML = iFrame.contentWindow.location.href;

					// document.getElementById('hmcontent').setAttribute('src', 'vvodnaya_chast.html'); // - меняется src
					let url = window.location.href;
					let urlFrame = document.getElementById('hmcontent').getAttribute('src');
					url = url + "/" + urlFrame;



					document.getElementById('idTextArea').innerHTML = url;
					setShowHideWindow(document.getElementById('idPermaLink'));
				}
				// (!) idPrinterOn-кнопка Печать
				else if (e.target.id === "idPrinterOn") {
					setPrintTopic(e.target.parentElement);
				}
				// (!) idPageHome-кнопка Домой
				else if (e.target.id === "idPageHome") {
					setPageHome(e.target.parentElement);
				}
				// (!) idPagePrevious-кнопка Назад
				else if (e.target.id === "idPagePrevious") {
					setPagePrevious(e.target.parentElement);
				}
				// (!) idPageNext-кнопка Вперед
				else if (e.target.id === "idPageNext") {
					setPageNext(e.target.parentElement);
				}
			}
		});
	}
	// (i)---
	// (i)*idTopicPane-События на панеле тема (топика)
	// (!) idTopicPaneNavShowHide-кнопка Скрыть/Показать нав.пан.
	if ($('#idTopicPaneNavShowHide') != null) {
		// 'change
		$('#idTopicPaneNavShowHide').on('change', function (e) {

			// console.log(`1) $('#idTopicPaneNavShowHideIcon').on('change', function (${e.target.tagName, e.target.id})\n e.target.checked: ${e.target.checked}\n e.target.getAttribute('checked'): ${e.target.getAttribute('checked')}\n document.getElementById('idToolbarNavShowHide').checked: ${document.getElementById('idToolbarNavShowHide').checked}\n document.getElementById('idToolbarNavShowHide').getAttribute('checked'): ${document.getElementById('idToolbarNavShowHide').getAttribute('checked')}`); // X удалить после теста

			// $('#idToolbarNavShowHide').prop('checked', e.target.checked);
			document.getElementById('idToolbarNavShowHide').checked = e.target.checked // - синхронизируем состояние checked

			// console.log(`2) $('#idTopicPaneNavShowHideIcon').on('change', function (${e.target.tagName, e.target.id})\n e.target.checked: ${e.target.checked}\n e.target.getAttribute('checked'): ${e.target.getAttribute('checked')}\n document.getElementById('idToolbarNavShowHide').checked: ${document.getElementById('idToolbarNavShowHide').checked}\n document.getElementById('idToolbarNavShowHide').getAttribute('checked'): ${document.getElementById('idToolbarNavShowHide').getAttribute('checked')}`); // X удалить после теста
		});
		// 'click
		$('#idTopicPaneNavShowHide').on('click', function (e) {
			// console.log(`$('#idTopicPaneNavShowHide').on('click', function (${e.target.tagName, e.target.id})\n setNavPaneShowHide(${!e.target.checked})`); // X удалить после теста

			setNavPaneShowHide(!e.target.checked); // - делаем "инверсию" значения св-ва
		});
	}
	// (!) idTabsCtab-кнопки переключения между вкладками. Используем делегирование событий, прослушивая общий элемент для всех вкладок
	if ($('#idTabsCtab') != null) {
		// 'click
		$('#idTabsCtab').on('click', function (e) {
			if (e.target.tagName === "IMG") {
				// (!) idToggleMenuTab-показать/скрыть меню вкладок
				if (e.target.id === "idToggleMenuTab") {
					setShowHideWindow(document.getElementById('idTabsMenuBox'));
				}
				// (!) idTabFirst, idTabPrevious, idTabNext, idTabLast
				else {
					goToTab(e.target);
				}
			}
		});
	}
	// (!) idTabsMenuBox-меню вкладок. Используем делегирование событий, прослушивая общий элемент для всех вкладок
	if ($('#idTabsMenuBox') != null) {
		// 'keyup
		$('#idTabsMenuBox').keyup(function (e) {
			if (e.key === "Escape" || e.keyCode === 27) {
				// console.log(`1) $('#idTabsMenuBox').keyup(function (${e.target.tagName}, ${e.target.id}):\n e.key: ${e.key}, e.keyCode: ${e.keyCode}\n document.activeElement (tagName: ${document.activeElement.tagName}, id: ${document.activeElement.id})`); // X удалить после теста
				if (e.target.tagName === "A") {
					setShowHideWindow(e.target.parentElement.parentElement.parentElement.parentElement);
				} else if (e.target.tagName === "LI") {
					setShowHideWindow(e.target.parentElement.parentElement.parentElement);
				} else if (e.target.tagName === "UL") {
					setShowHideWindow(e.target.parentElement.parentElement);
				} else if (e.target.tagName === "DIV") {
					if (e.target.id === "idTabsMenu") {
						setShowHideWindow(e.target.parentElement);
					} else {
						setShowHideWindow(e.target);
					}
				}
				// console.log(`2) $('#idTabsMenuBox').keyup(function (${e.target.tagName}, ${e.target.id}):\n e.key: ${e.key}, e.keyCode: ${e.keyCode}\n document.activeElement (tagName: ${document.activeElement.tagName}, id: ${document.activeElement.id})`); // X удалить после теста
			}
		});
		// 'click
		$('#idTabsMenuBox').on('click', function (e) {
			if (e.target.tagName !== "A") return;
			let tabs = document.getElementById('idTopicTabs');
			for (let i = 0; i < tabs.children.length; i++) {
				if (+tabs.children[i].getAttribute('tabnum') === +e.target.parentElement.getAttribute('tablist')) {
					setTabShowHide(tabs.children[i], 'show'); // - отображаем вкладку
					break;
				}
			}
		});
	}
	// (i) idTabsWindow-вкладки панели Тема топиков
	// (!) idTopicTabs-События вкладок. Используем делегирование событий, прослушивая общий элемент для всех вкладок
	if ($('#idTopicTabs') != null) {
		// 'mouseover/mouseout-наведение курсора
		$('#idTopicTabs').mouseover(function (e) {
			if (e.target.tagName === "SPAN") {
				e.target.parentElement.style.top = "3px"; // - доп.к стилю .topic-tab a/.topic-tab a:hover
				$(e.target).parents('li').children('img').css('display', 'block');
			} else if (e.target.tagName === "A") {
				e.target.style.top = "3px"; // - доп.к стилю .topic-tab a/.topic-tab a:hover
				$(e.target).siblings('img').css('display', 'block');
			} else if (e.target.tagName === "IMG") {
				$(e.target).siblings('a').css('top', '3px'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
				e.target.style.display = "block";
				e.target.src = "image/closetabon.png";
				// e.target.setAttribute('src', 'image/closetabon.png');
			} else if (e.target.tagName === "LI") {
				$(e.target).children('a').css('top', '3px'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
				$(e.target).children('img').css('display', 'block');
			}
		});
		$('#idTopicTabs').mouseout(function (e) {
			if (e.target.tagName === "SPAN") {
				e.target.parentElement.removeAttribute('style'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
				$(e.target).parents('li').children('img').removeAttr('style');
			} else if (e.target.tagName === "A") {
				e.target.removeAttribute('style'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
				$(e.target).siblings('img').removeAttr('style');
			} else if (e.target.tagName === "IMG") {
				$(e.target).siblings('a').removeAttr('style'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
				e.target.removeAttribute('style');
				e.target.src = "image/closetaboff.png";
				// e.target.setAttribute('src', 'image/closetaboff.png');
			} else if (e.target.tagName === "LI") {
				$(e.target).children('a').removeAttr('style'); // - доп.к стилю .topic-tab a/.topic-tab a:hover
				$(e.target).children('img').removeAttr('style');
			}
		});
		// 'click
		$('#idTopicTabs').on('click', function (e) {
			// console.log(`$('#idTopicTabs').click(function (${e.target.tagName}, ${e.target.id})`); // X удалить после теста
			if (e.target.tagName === "SPAN") {
				setTabShowHide(e.target.parentElement.parentElement, 'show');
				goToPage(e.target.parentElement.parentElement); // - переход на страницу // (?)
			} else if (e.target.tagName === "A") {
				setTabShowHide(e.target.parentElement, 'show');
				goToPage(e.target.parentElement); // - переход на страницу // (?)
			} else if (e.target.tagName === "IMG") {
				setTabShowHide(e.target.parentElement, 'hide');
			} else if (e.target.tagName === "LI") {
				setTabShowHide(e.target, 'show');
				goToPage(e.target); // - переход на страницу // (?)
			} else if (e.target.tagName === "UL") { return; }
		});
		// 'dblclick
		$('#idTopicTabs').on('dblclick', function (e) {
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
					console.error(`$('#idTopicTabs').on('dblclick', function (${e.target.id}):\n (i) Косяк - на текущей вкладке тег: «${e.target.tagName}» отсутствует`);
					alert(`(i) Косяк - на текущей вкладке тег: «${e.target.tagName}» отсутствует, см.консоль`);
				break;
			}
		});
	}
}); // Ready end
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
// (!) setToggleToolbarElement-переключение элемента на панели инструментов
function setToggleToolbarElement(elem, classNameOn, classNameOff, valueOnOff) {
	if (valueOnOff == "on") {
		$(`#${elem}`).removeClass(classNameOff);
		$(`#${elem}`).addClass(classNameOn);
	} else if (valueOnOff == "off") {
		$(`#${elem}`).removeClass(classNameOn);
		$(`#${elem}`).addClass(classNameOff);
	}
}
// (!) setToolbarButtonsOnOff-включить/отключить кнопку панели инструментов
function setToolbarButtonsOnOff(value) {
	switch (value) {
		case 'idTopicTab':
			// *кнопка открепить - нет доступа
			setToggleToolbarElement("idUndockTabOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idUndockTabOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idUndockTabText", "nav-text-on", "nav-text-off", "off");
			// *кнопка новая вкладка - доступна
			setToggleToolbarElement("idNewTabOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idNewTabOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idNewTabText", "nav-text-on", "nav-text-off", "on");
			// *кнопка развернуть/свернуть - доступна
			setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "on");
			// *кнопка постоянная ссылка - доступна
			setToggleToolbarElement("idPermalinkOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPermalinkOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPermalinkText", "nav-text-on", "nav-text-off", "on");
			// *кнопка email - доступна
			setToggleToolbarElement("idFeedBackOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idFeedBackOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idFeedBackText", "nav-text-on", "nav-text-off", "on");
			// *кнопка печать - доступна
			setToggleToolbarElement("idPrinterOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPrinterOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPrinterText", "nav-text-on", "nav-text-off", "on");
			break;
		case 'idIndexTab': case 'idSearchTab':
			// *кнопка открепить - доступна
			setToggleToolbarElement("idUndockTabOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idUndockTabOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idUndockTabText", "nav-text-on", "nav-text-off", "on");
			// *кнопка новая вкладка - нет доступа
			setToggleToolbarElement("idNewTabOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idNewTabOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idNewTabText", "nav-text-on", "nav-text-off", "off");
			// *кнопка развернуть/свернуть - нет доступа
			setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "off");
			// *кнопка постоянная ссылка - нет доступа
			setToggleToolbarElement("idPermalinkOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPermalinkOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPermalinkText", "nav-text-on", "nav-text-off", "off");
			// *кнопка email - нет доступа
			setToggleToolbarElement("idFeedBackOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idFeedBackOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idFeedBackText", "nav-text-on", "nav-text-off", "off");
			// *кнопка печать - нет доступа
			setToggleToolbarElement("idPrinterOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPrinterOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPrinterText", "nav-text-on", "nav-text-off", "off");
			break;
		default:
			// *кнопка открепить - доступна
			setToggleToolbarElement("idUndockTabOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idUndockTabOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idUndockTabText", "nav-text-on", "nav-text-off", "on");
			// *кнопка новая вкладка - доступна
			setToggleToolbarElement("idNewTabOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idNewTabOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idNewTabText", "nav-text-on", "nav-text-off", "on");
			// *кнопка развернуть/свернуть - доступна
			setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "on");
			// *кнопка постоянная ссылка - доступна
			setToggleToolbarElement("idPermalinkOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPermalinkOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPermalinkText", "nav-text-on", "nav-text-off", "on");
			// *кнопка email - доступна
			setToggleToolbarElement("idFeedBackOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idFeedBackOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idFeedBackText", "nav-text-on", "nav-text-off", "on");
			// *кнопка печать - доступна
			setToggleToolbarElement("idPrinterOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPrinterOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPrinterText", "nav-text-on", "nav-text-off", "on");
			// ***
			console.log(`(i) Косяк - значение: ${value} не найдено`);
			alert(`(i) Косяк - значение: ${value} не найдено`);
		break;
	}
}
// (!) setPositionPanels-установка позиционирования панелей
function setPositionPanels (navpane, topicpane) {
	if (typeof(navpane) === "object" && navpane !== null && typeof(topicpane) === "object" && topicpane !== null) {
		let navpaneStyles = getComputedStyle(navpane);
		// let topicpaneStyles = getComputedStyle(topicpane);
		// console.log(`--- start ---\nfunction setPositionPanels:\n navpaneStyles.display: ${navpaneStyles.display}\n navpaneStyles.left: ${navpaneStyles.left}\n navpaneStyles.top: ${navpaneStyles.top}\n navpaneStyles.width: ${navpaneStyles.width}`); // X удалить после теста
		// tmp
		navpane.style.removeProperty('animation'); // - удаляем css св-во
		topicpane.style.removeProperty('animation'); // - удаляем css св-во
		if (window.outerWidth > 699) {
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

				// console.log(`function setPositionPanels:\n navpane.style.left: 0 - (${navpane.offsetWidth} + ${parseInt(navpaneStyles.marginRight, 10)}) = ${navpane.style.left}`); // X удалить после теста

			} else { // - нав.пан.раскрыта
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
					// console.log(`function setPositionPanels:\n reSizesWidth.topicpaneStyleLeft: ${reSizesWidth.topicpaneStyleLeft}`); // X удалить после теста
				} else {
					topicpane.style.left = reSizesWidth.topicpaneStyleLeft + "px";
					// console.log(`function setPositionPanels:\n topicpane.style.left: ${topicpane.style.left}\n reSizesWidth.topicpaneStyleLeft: ${reSizesWidth.topicpaneStyleLeft}`); // X удалить после теста
				}
			}
		} else if (window.outerWidth < 699) {
			navpane.style.removeProperty('left'); // - удаляем css св-во
			navpane.style.removeProperty('width'); // - удаляем css св-во
			topicpane.style.removeProperty('left'); // - удаляем css св-во
			let value = parseInt(navpaneStyles.top, 10); // X '
			if (navpaneStyles.display === "none" || navpaneStyles.visibility === "hidden") {
				navpane.style.removeProperty('display'); // - удаляем css св-во
				navpane.style.top = parseInt(navpaneStyles.top, 10) - (navpane.offsetHeight + parseInt(navpaneStyles.marginBottom, 10)) + "px";
				navpane.style.display = "none";
			}
			// console.log(`function setPositionPanels:\n navpaneStyles.display: ${navpaneStyles.display}\n navpane.style.top: ${value} - (${navpane.offsetHeight} + ${parseInt(navpaneStyles.marginBottom, 10)}) = ${navpane.style.top}`); // X удалить после теста
		}
		// console.log(`function setPositionPanels:\n navpaneStyles.display: ${navpaneStyles.display}\n navpaneStyles.left: ${navpaneStyles.left}\n navpaneStyles.top: ${navpaneStyles.top}\n navpaneStyles.width: ${navpaneStyles.width}\n --- the end ---`); // X удалить после теста
	}
}

// (!) animationNavPane - окно браузера > 699
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
	// console.log(`animationNavPane(${valueShowHide}):\n distance: ${distance}`); // X удалить после теста
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

			// console.log(`${rafId} = requestAnimationFrame(function animate (${time}):\n startTime: ${startTime}\n interval: (${time} - ${startTime}) / ${duration} = ${interval}\n newPosition.topicpane: ${easeInOutBack(interval)} * ${distance} = ${newPosition.topicpane}\n newPosition.navpane = ${newPosition.topicpane} - ${distance} = ${newPosition.navpane}`); // X удалить после теста

		} else if (valueShowHide === "show") {
			newPosition.navpane = easeInOutBack(interval) * distance;
			newPosition.topicpane = newPosition.navpane - distance;

			// console.log(`${rafId} = requestAnimationFrame(function animate (${time}):\n startTime: ${startTime}\n interval: (${time} - ${startTime}) / ${duration} = ${interval}\n newPosition.navpane: (${easeInOutBack(interval)} * ${distance}) = ${newPosition.navpane}\n newPosition.topicpane: ${newPosition.navpane} - ${distance} = ${newPosition.topicpane}`); // X удалить после теста
		}
		navpane.style.left = newPosition.navpane + "px";
		topicpane.style.left = newPosition.topicpane + "px";
		if (interval < 1) { // - планируем новый кадр
			rafId = requestAnimationFrame(animate);
		} else {
			// console.log(`${rafId} = requestAnimationFrame(function animate (${time}):\n cancelAnimationFrame(${rafId})\n --- stop ---`); // X удалить после теста
			if (valueShowHide === "hide") { // tmp
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
			// console.log(`${rafId} = requestAnimationFrame(function animate (${time}):\n --- the end animate ---`); // X удалить после теста
		}
	});
}
// (!) animationNavPane2 - окно браузера < 699
function animationNavPane2 (duration, navpane, topicpane, valueShowHide) {
	let newPosition = { navpane: null, topicpane: null };
	let startPos = null; // - начальная точка движения
	let endPos = null; // - конечная точка движения
	navpane.style.removeProperty('animation'); // - удаляем css св-во
	topicpane.style.removeProperty('animation'); // - удаляем css св-во
	if (valueShowHide === "hide") {
		startPos = parseInt(getComputedStyle(topicpane, null).top, 10);
		endPos = parseInt(getComputedStyle(navpane, null).top, 10);
	} else if (valueShowHide === "show") { // tmp - 2
		startPos = parseInt(getComputedStyle(navpane, null).top, 10);
		endPos = parseInt(getComputedStyle(topicpane, null).top, 10);
		navpane.style.removeProperty('display'); // - после получения значения отображаем нав.пан. - удаляем css св-во
	}
	const distance = startPos - endPos; // - расстояние

	// console.log(`animationNavPane2(${valueShowHide}):\n startPos: ${startPos}\n endPos: ${endPos}\n distance: ${startPos} - ${endPos} = ${distance}`); // X удалить после теста

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

			// console.log(`${rafId} = requestAnimationFrame(function animate (${time}):\n startTime: ${startTime}\n interval: (${time} - ${startTime}) / ${duration} = ${interval}\n newPosition.navpane: ((${distance} * ${progress}) - (${distance} - ${endPos})) + ${endPos} = ${newPosition.navpane}\n newPosition.topicpane: (${distance} * ${progress}) + ${endPos} = ${newPosition.topicpane}\n progress: ${progress}\n value: ${distance} * ${interval} = ${value}`); // X удалить после теста

		} else if (valueShowHide === "show") {
			newPosition.navpane = (distance * progress) + endPos;
			newPosition.topicpane = ((distance * progress) - (startPos - endPos)) + endPos;

			// console.log(`${rafId} = requestAnimationFrame(function animate (${time}):\n startTime: ${startTime}\n interval: (${time} - ${startTime}) / ${duration} = ${interval}\n newPosition.navpane: (${distance} * ${progress}) + ${endPos} = ${newPosition.navpane}\n newPosition.topicpane: ((${distance} * ${progress}) - (${distance} - ${endPos})) + ${endPos} = ${newPosition.topicpane}\n progress: ${progress}\n value: ${distance} * ${interval} = ${value}`); // X удалить после теста

		}
		navpane.style.top = newPosition.navpane + "px";
		topicpane.style.top = newPosition.topicpane + "px";

		if (interval < 1) { // - планируем новый кадр
			rafId = requestAnimationFrame(animate);
		} else {
			// console.log(`${rafId} = requestAnimationFrame(function animate (${time}):\n cancelAnimationFrame(${rafId})\n --- stop ---`); // X удалить после теста
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

			// console.log(`${rafId} = requestAnimationFrame(function animate (${time}):\n --- the end animate ---`); // X удалить после теста
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
function animateNavPane (animatedElem, animationName, valueShowHide) {
	if (animatedElem.id === "idNavPane") {
		if (valueShowHide === "show") {
			animatedElem.style.removeProperty('display'); // 'отображаем нав.пан.
		}
	}
	// animatedElem.style.animationFillMode = "backwards"; // Элемент сохранит стиль первого ключевого кадра на протяжении периода animation-delay. Первый ключевой кадр определяется значением animation-direction
	animatedElem.style.animation = animationName; // имя @keyframes в файле styles.css
	animatedElem.style.animationDuration = "2s"; // длительность анимации
	animatedElem.style.animationDelay = "0ms"; // Время задержки перед стартом анимации
	// animatedElem.style.willChange = "left"; // *св-во will-change - экспериментальная технология, заранее передает браузеру инфу о возможном предстоящем изменении элемента
	// animatedElem.style.animationFillMode = "both"; // Анимация будет вести себя так, как будто значения forwards и backwards заданы одновременно
	// animatedElem.style.animationFillMode = "forwards"; // По окончании анимации элемент сохранит стили последнего ключевого кадра, который определяется значениями animation-direction и animation-iteration-count
	if (animatedElem.id === "idNavPane") {
		if (valueShowHide === "hide") {
			setTimeout(() => {
				animatedElem.style.display = "none"; // 'скрываем нав.пан.
			}, 2000);
		}
	}
}
// X animateBanner-через CSS, анимация баннера
function animateBanner (animatedElem, animationName, valueShowHide) {
	if (animatedElem.id === "idBanner") {
		if (valueShowHide === "show") {
			animatedElem.style.removeProperty('display'); // 'отображаем баннер
		}
	}
	// 'временно изм.стиль, чтобы не возникала ошибка при изменении размера окна браузера
	// let isDisplayNone = false;
	// if (animatedElem.id === "idNavPane") {
	// 	if (animatedElem.style.display === "none" || animatedElem.style.visibility === "hidden") {
	// 		animatedElem.style.removeProperty('display'); // - удаляем css св-во
	// 		isDisplayNone = true;
	// 	}
	// } // 'временно изм.стиль, чтобы не возникала ошибка при изменении размера окна браузера

	// animatedElem.style.animationFillMode = "backwards"; // Элемент сохранит стиль первого ключевого кадра на протяжении периода animation-delay. Первый ключевой кадр определяется значением animation-direction
	animatedElem.style.animation = animationName; // имя @keyframes в файле styles.css
	animatedElem.style.animationDuration = "1.5s"; // длительность анимации
	animatedElem.style.animationDelay = "0ms"; // Время задержки перед стартом анимации
	// animatedElem.style.willChange = "top"; // *св-во will-change - экспериментальная технология, заранее передает браузеру инфу о возможном предстоящем изменении элемента
	// animatedElem.style.animationFillMode = "both"; // Анимация будет вести себя так, как будто значения forwards и backwards заданы одновременно
	// animatedElem.style.animationFillMode = "forwards"; // По окончании анимации элемент сохранит стили последнего ключевого кадра, который определяется значениями animation-direction и animation-iteration-count

	// if (isDisplayNone) { // 'возвращаем стиль обратно
	// 	animatedElem.style.display = "none";
	// 	isDisplayNone = false;
	// } // 'возвращаем стиль обратно

	// if (animatedElem.id === "idNavPane") {
	// 	if (valueShowHide === "show") {
	// 		animatedElem.style.top
	// 	} else if (valueShowHide === "hide") {

	// 	}
	// }

	if (animatedElem.id === "idBanner") {
		if (valueShowHide === "hide") {
			setTimeout(() => {
				animatedElem.style.display = "none"; // 'скрываем баннер
			}, 1500);
		}
	}
}
// (!) setShowHideWindow
function setShowHideWindow(elem) {
	// console.log(`1) function setShowHideWindow (${elem.tagName}, ${elem.id})\n document.activeElement.tagName: ${document.activeElement.tagName}\n document.activeElement.id: ${document.activeElement.id}`); // X удалить после теста
	if (elem.style.display === "none") {
		elem.removeAttribute('style');
		elem.focus();
	} else {
		document.activeElement.blur();
		elem.style.display = "none";
	}
	// console.log(`2) function setShowHideWindow (${elem.tagName}, ${elem.id})\n document.activeElement.tagName: ${document.activeElement.tagName}\n document.activeElement.id: ${document.activeElement.id}`); // X удалить после теста
}
// (!) setUpdateTabsMenuList-обновление списка Меню вкладок и выделение ссылки на текущую вкладку
function setUpdateTabsMenuList (tabs) {
	let tabsList = document.getElementById('idTabsList');
	let tabNum, tabList;
	// 'цикл for...of
	for (const tab of tabs.children) {
		tabNum = tab.getAttribute('tabnum');
		for (const list of tabsList.children) {
			tabList = list.getAttribute('tablist');
			if (tabNum === tabList) {
				// *для 1-х 3-х вкладок // HACK: пока что без учета создаваемых юзером вкладок
				if (((tabNum >= 0) && (tabNum < 3)) && ((tabList >= 0) && (tabList < 3))) {
					// *выделяем ссылку на текущую вкладку
					if (tab.classList.contains('topic-tab-current')) {
						list.children[0].style.fontWeight = "bold";
					} else {
						list.children[0].removeAttribute('style');
						// list.children[0].style.removeProperty('fontWeight'); // - удалить css св-во
					}
					// *сверяем скрытые вкладки
					if (tab.style.display === "none") {
						if (list.style.display !== "none") {
							list.style.display = "none";
						}
					} else if (tab.style.display !== "none") {
						if (list.style.display === "none") {
							list.removeAttribute('style');
							// list.style.removeProperty('display'); // - удалить css св-во
						}
					}
				}
			}
		}
	}
	// 'цикл for...in
	// for (let i = 0; i < tabs.children.length; i++) {
	// 	tabNum = +tabs.children[i].getAttribute('tabnum');
	// 	for (let k = 0; k < tabsList.children.length; k++) {
	// 		tabList = +tabsList.children[k].getAttribute('tablist');
	// 		if (tabNum === tabList) {
	// 			// *для 1-х 3-х вкладок
	// 			if (((tabNum >= 0) && (tabNum < 3)) && ((tabList >= 0) && (tabList < 3))) {
	// 				// *выделяем ссылку на текущую вкладку
	// 				if (tabs.children[i].classList.contains('topic-tab-current')) {
	// 					tabsList.children[k].children[0].style.fontWeight = "bold";
	// 				} else {
	// 					tabsList.children[k].children[0].removeAttribute('style');
	// 					// tabsList.children[k].children[0].style.removeProperty('fontWeight'); // - удалить css св-во
	// 				}
	// 				// *сверяем скрытые вкладки
	// 				if (tabs.children[i].style.display === "none") {
	// 					if (tabsList.children[k].style.display !== "none") {
	// 						tabsList.children[k].style.display = "none";
	// 					}
	// 				} else if (tabs.children[i].style.display !== "none") {
	// 					if (tabsList.children[k].style.display === "none") {
	// 						// tabsList.children[k].style.removeProperty('display'); // - удалить css св-во
	// 						tabsList.children[k].removeAttribute('style');
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
}
// (i)---
// (i)*idToolbar-Элементы панели инструментов
// (!) setNavPaneShowHide-Скрыть/Показать боковую панель навигации
function setNavPaneShowHide (valueTrueFalse) {
	let imgNavHandle = document.getElementById('idTopicPaneNavShowHideIcon'); // - трансформации иконки на панели тема топика
	let navpane = document.getElementById('idNavPane');
	let topicpane = document.getElementById('idTopicPane');
	const duration = 2000; // - длительность анимации
	document.getElementById('idToolbarNavShowHide').disabled = true; // 'делаем кнопку НЕдоступной для нажатия, пока не выполнится анимация
	// *оба checkbox должны работать синхронно
	if (valueTrueFalse) { // - нав.пан.раскрыта
		if (document.getElementById('idBanner').style.display == "none") {
			// *проверка размера внешнего окна браузера
			if (window.outerWidth > 699) {
				animationNavPane(duration, navpane, topicpane, "hide");
				// animateNavPane(navpane, "navpaneHide", "hide"); // X не используется
				// animateNavPane(topicpane, "topicpaneNavPaneHide", "hide"); // X не используется
			} else if (window.outerWidth < 699) {
				animationNavPane2(duration, navpane, topicpane, "hide");
				// animateNavPane(navpane, "navpaneHide", "hide");
				// animateNavPane(topicpane, "topicpaneExtend", "hide");
			}
			topicpane.classList.remove('topic-pane-expand');
			topicpane.classList.add('topic-pane-extend'); // - изм.одну высоту пан.топика на др.
		} else {
			// *проверка размера внешнего окна браузера
			if (window.outerWidth > 699) {
				animationNavPane(duration, navpane, topicpane, "hide");
				// animateNavPane(navpane, "navpaneHide", "hide"); // X не используется
				// animateNavPane(topicpane, "topicpaneNavPaneHide", "hide"); // X не используется
			} else if (window.outerWidth < 699) {
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
		// *проверка размера внешнего окна браузера
		if (window.outerWidth > 699) {
			animationNavPane(duration, navpane, topicpane, "show");
		// 	animateNavPane(navpane, "navpaneShow", "show"); // X не используется
		// 	animateNavPane(topicpane, "topicpaneNavPaneShow", "show"); // X не используется
		} else if (window.outerWidth < 699) {
			animationNavPane2(duration, navpane, topicpane, "show");
		// 	if (document.getElementById('idBanner').style.display === "none") {
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
// (!) setTabShowHide-показать/скрыть текущую вкладку
function setTabShowHide(currentTab, valueShowHide) {
	let tabs = currentTab.parentElement;
	let tabNum = currentTab.getAttribute('tabnum');
	let boxes = document.getElementById('idContentBox');

	if (valueShowHide === "show") {
		// *делаем вкладку текущей и выводим ее контентную часть
		// currentTab.style.display = null; // - удаляем значение св-ва
		currentTab.removeAttribute('style'); // - удаляем атрибут "стиль"
		currentTab.classList.add('topic-tab-current');
		boxes.children[tabNum].removeAttribute('style');
		// boxes.children[tabNum].style.display = null;
		for (let i = 0; i < tabs.children.length; i++) {
			if (tabs.children[i].id !== currentTab.id) {
				tabs.children[i].classList.remove('topic-tab-current');
				boxes.children[i].style.display = "none";
			}
		}
		setToolbarButtonsOnOff(currentTab.id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
	} else if (valueShowHide === "hide") {
		// *переназначаем предыдущей вкладке значение на "текущая", если текущая вкладка была активной
		if (currentTab.classList.contains('topic-tab-current')) {
			let visibleTabs = [];
			let visibleBoxes = [];
			// *просматриваем все вкладки и исключаем скрытые
			for (let i = 0; i < tabs.children.length; i++) {
				if (tabs.children[i].style.display !== "none") {
					visibleTabs.push(tabs.children[i]);
					visibleBoxes.push(boxes.children[i]);
				}
			}
			for (let i = 0; i < visibleTabs.length; i++) {
				if (visibleTabs[i].id === currentTab.id) {
					visibleTabs[i].classList.remove('topic-tab-current');
					visibleTabs[i].style.display = "none";
					visibleBoxes[i].style.display = "none";
					// - делаем текущей предыдущую вкладку и ее контентную часть
					visibleTabs[i - 1].classList.add('topic-tab-current');
					visibleBoxes[i - 1].removeAttribute('style');
					setToolbarButtonsOnOff(visibleTabs[i - 1].id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
				} else {
					visibleTabs[i].classList.remove('topic-tab-current');
					visibleBoxes[i].style.display = "none";
				}
			}
		} else { // - делаем текущую вкладку не активной и скрываем ее, и ее контентную часть
			currentTab.style.display = "none";
			boxes.children[tabNum].style.display = "none";
		}
	}
	setUpdateTabsMenuList(tabs); // - обновляем список Меню вкладок и выделяем ссылку на текущую вкладку
}
// (!) setUndockTab-открепить текущую вкладку
function setUndockTab (elem) {
	// console.log(elem.getAttribute('tabnum')); // X удалить после теста
	if (+elem.getAttribute('tabnum') === 0) {
		alert(`(i) Нельзя открепить вкладку «Главная».\n    Создайте новую вкладку и нажмите кнопку «Открепить».`);
	} else if (+elem.getAttribute('tabnum') > 0) { // - открепляем текущую вкладку
		// WebHelp.undockTab() // *строка из index.html
		alert(`(i) Функция открепить вкладку, пока что в разработке.`);
	}
}
// (!) setNewTab-кнопка Новая вкладка
function setNewTab () {
	alert(`(i) Кнопка «Новая вкладка» на панели пока что в разработке.`);
}
// (!) setBannerShowHide-кнопка Показать/Скрыть баннер
// *js/JavaScript
function setBannerShowHide (valueTrueFalse) {
	let panels = {
		banner: document.getElementById('idBanner'),
		toolbar: document.getElementById('idToolbar'),
		navpane: document.getElementById('idNavPane'),
		topicpane: document.getElementById('idTopicPane')
	};
	let navpaneTop = parseInt(getComputedStyle(panels.navpane).top, 10);
	// *переключение классов и стилей
	// panels.banner.style.display == "none" ? panels.banner.style.display = "" : panels.banner.style.display = "none"; // однострочная запись - переключатель toggle через условный тернарный оператор (?:) с тремя операндами в JavaScript
	if (valueTrueFalse) { // - баннер раскрыт
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
		// *проверка размера внешнего окна браузера
		if (window.outerWidth > 699) {
			animateBanner(panels.banner, "bannerHide", "hide");
			animateBanner(panels.toolbar, "bannerHide", "hide");
			animateBanner(panels.navpane, "panelBannerHide", "hide");
			animateBanner(panels.topicpane, "panelBannerHide", "hide");
		} else if (window.outerWidth < 699) {
			animateBanner(panels.banner, "bannerHide", "hide");
			animateBanner(panels.toolbar, "bannerHide", "hide");
			animateBanner(panels.navpane, "panelBannerHide", "hide");
			if (panels.navpane.style.display === "none" || panels.navpane.style.visibility === "hidden") {
				// *корректируем высоту
				panels.navpane.style.removeProperty('display'); // - удаляем css св-во
				panels.navpane.style.top = navpaneTop - (panels.banner.offsetHeight - parseInt(getComputedStyle(panels.navpane).marginBottom, 10)) + "px";
				panels.navpane.style.display = "none";
				animateBanner(panels.topicpane, "panelBannerHide", "hide");
			} else {
				animateBanner(panels.topicpane, "topicpaneBannerHide", "hide");
			}
		}
	} else { // - баннер скрыт
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
		// *проверка размера внешнего окна браузера
		if (window.outerWidth > 699) {
			animateBanner(panels.banner, "bannerShow", "show");
			animateBanner(panels.toolbar, "bannerShow", "show");
			animateBanner(panels.navpane, "panelBannerShow", "show");
			animateBanner(panels.topicpane, "panelBannerShow", "show");
		} else if (window.outerWidth < 699) {
			animateBanner(panels.banner, "bannerShow", "show");
			animateBanner(panels.toolbar, "bannerShow", "show");
			animateBanner(panels.navpane, "panelBannerShow", "show"); // tmp - 3
			if (panels.navpane.style.display === "none" || panels.navpane.style.visibility === "hidden") {
				// *корректируем высоту
				panels.navpane.style.removeProperty('display'); // - удаляем css св-во
				panels.navpane.style.top = navpaneTop + (panels.banner.offsetHeight - parseInt(getComputedStyle(panels.navpane).marginBottom, 10)) + "px";
				panels.navpane.style.display = "none";
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
// (!) setTextExpandCollapse-кнопка Развернуть/Свернуть
function setTextExpandCollapse (valueTrueFalse) {
	alert(`(i) Кнопка «Развернуть/Свернуть» на панели пока что в разработке.\n` + `Кнопка должна сворачивать/разворачивать все скрытые элементы в тексте контента текущего топика.`);
}
// (!) setPermaLinkBtnCopy-кнопка скопировать
function setPermaLinkBtnCopy (params) {
	alert(`(i) Кнопка «Скопировать ссылку» пока что в разработке.`);
}
// (!) setPermaLinkBtnBookmark-кнопка в закладки
function setPermaLinkBtnBookmark (params) {
	alert(`(i) Кнопка «В Закладки» пока что в разработке.`);
}
// (!) setPrintTopic-кнопка Печать
function setPrintTopic (elem) {
	alert(`(i) Кнопка «Печать» на панели пока что в разработке.`);
}
// (!) setPageHome-кнопка Домой
function setPageHome (elem) {
	let tab = document.getElementById('idTopicTab');
	if (!tab.classList.contains('topic-tab-current')) {
		setTabShowHide(tab, 'show');
	}
	elem.activePage = elem.getAttribute('href');
	alert(`(i) Кнопка «Домой: домашняя страница» на панели пока что в разработке.\n` + `Ссылка должна переходить на страницу текущей главы, раздела...`);
}
// (!) setPagePrevious-кнопка Назад
function setPagePrevious (elem) {
	let tab = document.getElementById('idTopicTab');
	if (!tab.classList.contains('topic-tab-current')) {
		setTabShowHide(tab, 'show');
	}
	elem.activePage = elem.getAttribute('href');
	alert(`(i) Кнопка «Назад: на предыдущую страницу» на панели пока что в разработке.`);
}
// (!) setPageNext-кнопка Вперед
function setPageNext (elem) {
	let tab = document.getElementById('idTopicTab');
	if (!tab.classList.contains('topic-tab-current')) {
		setTabShowHide(tab, 'show');
	}
	elem.activePage = elem.getAttribute('href');
	alert(`(i) Кнопка «Вперед: на следующую страницу» на панели пока что в разработке.`);
}
// (i)---
// (i)*idTopicPane-Элементы панели тема топика
// (!) writeTOC
// 'данная функция указана как скрипт в теле блока div панели навигации
// (?) надо искать что за функция и какова ее функция
function writeTOC () {
	alert(`(i) Функция writeTOC пока что в разработке.`);
}
// (!) goToTab-кнопка перехода между вкладками
function goToTab (currentTab) {
	let tabs = document.getElementById('idTopicTabs');
	let boxes = document.getElementById('idContentBox');

	if (currentTab.id === "idTabFirst") {
		if (tabs.children[0].classList.contains('topic-tab-current')) {
			alert(`Эта вкладка уже активна`);
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
				alert(`Эта вкладка уже активна`);
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
							alert(`Эта вкладка уже активна`);
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
							alert(`Эта вкладка уже активна`);
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
					alert(`Эта вкладка уже активна`);
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
// (!) goToPage-переход на страницу
function goToPage (tab) { // (?) пока не понятно нужна ли функция или достаточно только сделать видимость для соответствующих вкладок
	if (+tab.getAttribute('tabnum') === 0) { // - переход на текущую страницу вкладки Тема топика
		// WebHelp.activePage = WebHelp.currentPage; // *строка из index.html
		tab.activePage = tab.currentPage;
	} else if (+tab.getAttribute('tabnum') > 0) { // - переход на страницу вкладок: "Ключевые слова"/"Поиск" и др.новые вкладки, кот.будут создаваться как новые вкладки
		// WebHelp.activePage ='index'; // *строка из index.html
		// WebHelp.activePage='search'; // *строка из index.html
		tab.activePage = tab.getAttribute('tabpage');
	}
}
// (i) idContentBox-Элементы контента топиков - страницы для каждой вкладки
// (!) showComments
function showComments () {
	// см.файл comments.js
	alert(`(i) Функция показать комментарий(-и) пока что в разработке.`);
}
// (!) writeCommentLink
// function writeCommentLink (params) {
// 	// см.файл comments.js
// }
// (i)*idTopicBox-Элементы в топике Тема - контент-текста, см.файл index.html
// (!) manualVersion-версия редакций инструкций - открытие в новом окне браузера
function manualVersion () {
	// window.open("","","width=250,height=250"); // - пример открытия пустого окна
	// // let features = 'toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=yes,width=900,height=700';
	// // let features = 'left=100,top=100,width=350,height=250,menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
	let features = 'width=350,height=350,left='+((screen.width-500)/2)+',top='+((screen.height-500)/2)+',menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
	window.open('manual_version.html', "", features);
}
// X modalWindow-модальное окно
// *создание модального окна с настройками по умолчанию
// function modalWindow () {
// 	{
// 		modalWin();
// 	}
// }
// *код, выполняющего создание модального окна без кнопок в нижней части, с заголовком «Новое сообщение» и пустым содержимым
// setModalWindow (
// 	{// alert(`(i) Пока что в разработке`);
// 		title: "Test"
// 	}
// );

// modalWin (
// 	{
// 		title: "Текст заголовка",
// 		content: "Содержимое модального окна",
// 		buttonClose: [
// 			{
// 				class: "btn btn-close",
// 				text: "Закрыть окно",
// 				handler: "modalHandlerClose"
// 			}
// 		]
// 	}
// );
