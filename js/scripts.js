// document.addEventListener('DOMContentLoaded', function(){ // - jQuery. Дожидаемся, когда Объектная модель документа страницы (DOM) будет готова к выполнению кода JavaScript
$(document).ready(function () { // - jq
	// window.onload = function () { // - jQuery. Сработает, как только вся страница (изображения или встроенные фреймы), а не только DOM, будет готова
	// // $(window).load(function () { // - jq
	// (!) Инициализация переменных
	// topictablink = document.getElementById('idTopicTab');
	// indextablink = document.getElementById('idIndexTab');
	// searchtablink = document.getElementById('idSearchTab');
	// ******************************************
	// (i) EVENTS
	// (i)*idToolbar-События на панеле инструментов
	// (!) idToolbarNavShowHide-checkbox Скрыть/Показать панель навигации
	if ($('#idToolbarNavShowHide') != null) {
		$('#idToolbarNavShowHide').on('change', function () { // 'синхронизируем состояние checked
			$('#idTopicPaneNavShowHide').prop('checked', $('#idToolbarNavShowHide').prop('checked'));
		});
	}
	// (i)*idNavPane-События на панеле навигации
	// (!) idTopicPaneNavShowHide-checkbox Скрыть/Показать панель навигации
	if ($('#idTopicPaneNavShowHide') != null) {
		$('#idTopicPaneNavShowHide').on('change', function () { // 'синхронизируем состояние checked
			$('#idToolbarNavShowHide').prop('checked', $('#idTopicPaneNavShowHide').prop('checked'));
		});
	}
	// (i)*idTopicPane-События на панеле тема (топика)
	// (!) idTopicTab-События вкладки Топик
	if ($('#idTopicTab') != null) {
		// *наведение курсора
		$('#idTopicTab').mouseover(function () {
			setStyleAddRemove("idTopicTabLink", "add"); // - доп.к стилю .topic-tab a:hover{}
		});
		$('#idTopicTab').mouseout(function () {
			setStyleAddRemove("idTopicTabLink", "del"); // - доп.к стилю .topic-tab a{}
		});
		// *событие клик
		$('#idTopicTab').on('click', function (event) {
			setTabShowHide("idTopicTab", "idTopicBox", "show"); // - отображаем вкладку
			setToolbarButtonOnOff("TopicTab"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
		});
	};
	// (!) idIndexTab-События вкладки Ключевые слова
	if ($('#idIndexTab') != null) {
		// *наведение курсора
		$('#idIndexTab').mouseover(function () {
			$('#idIndexTab img').css('display', 'block');
			setStyleAddRemove("idIndexTabLink", "add"); // - доп.к стилю .topic-tab a:hover{}
		});
		$('#idIndexTab').mouseout(function () {
			$('#idIndexTab img').removeAttr('style');
			setStyleAddRemove("idIndexTabLink", "del"); // - доп.к стилю .topic-tab a{}
		});
		// *событие клик
		$('#idIndexTab').on('click', function (event) {
			if (event.target.tagName == "IMG") return; // 'короткая запись if, если кликнули на тег img
			setTabShowHide("idIndexTab", "idIndexBox", "show"); // - отображаем вкладку
			setToolbarButtonOnOff("IndexTab"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
		});
	};
	// (!) idIndexTab img-События мини кнопки закрытия на вкладке Ключевые слова
	if ($('#idIndexTab img') != null) {
		// *событие клик
		$('#idIndexTab img').on('click', function (event) {
			if (event.target.tagName != "IMG") return; // 'короткая запись if, если кликнули вне тега img
			setTabShowHide("idIndexTab", "idIndexBox", "hide"); // - скрываем вкладку
			setToolbarButtonOnOff("IndexTabClosed"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
		});
	};
	// (!) idSearchTab-События вкладки Поиск
	if ($('#idSearchTab') != null) {
		// *наведение курсора
		$('#idSearchTab').mouseover(function () {
			$('#idSearchTab img').css('display', 'block');
			setStyleAddRemove("idSearchTabLink", "add"); // - доп.к стилю .topic-tab a:hover{}
		});
		$('#idSearchTab').mouseout(function () {
			$('#idSearchTab img').removeAttr('style');
			setStyleAddRemove("idSearchTabLink", "del"); // - доп.к стилю .topic-tab a{}
		});
		// *событие клик
		$('#idSearchTab').on('click', function (event) {
			if (event.target.tagName == "IMG") return; // 'короткая запись if, если кликнули на тег img
			setTabShowHide("idSearchTab", "idSearchBox", "show"); // - отображаем вкладку
			setToolbarButtonOnOff("SearchTab"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
		});
	};
	// (!) idSearchTab img-События мини кнопки закрытия на вкладке Поиск
	if ($('#idSearchTab img') != null) {
		// *событие клик
		$('#idSearchTab img').on('click', function (event) {
			if (event.target.tagName != "IMG") return; // 'короткая запись if, если кликнули вне тега img
			setTabShowHide("idSearchTab", "idSearchBox", "hide"); // - скрываем вкладку
			setToolbarButtonOnOff("SearchTabClosed"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
		});
	};
	// });
});
// ******************************************
// (i) FUNCTIONS
// (!) setStyleAddRemove-доп.к стилю .topic-tab a/.topic-tab a:hover
function setStyleAddRemove (prop, valueAddDel) {
	if (valueAddDel == "add") {
		$(`#${prop}`).css('top', '3px'); // -.topic-tab a:hover{}
	}
	if (valueAddDel == "del") {
		$(`#${prop}`).removeAttr('style'); // -.topic-tab a{}
	}
}
// (!) setToggleToolbarElement-переключение элемента панели инструментов
function setToggleToolbarElement(elem, classNameOn, classNameOff, valueOnOff) {
	if (valueOnOff == "on") {
		$(`#${elem}`).removeClass(classNameOff);
		$(`#${elem}`).addClass(classNameOn);
	} else if (valueOnOff == "off") {
		$(`#${elem}`).removeClass(classNameOn);
		$(`#${elem}`).addClass(classNameOff);
	}
}
// (!) setToolbarButtonOnOff-включить/отключить кнопку панели инструментов
function setToolbarButtonOnOff(value) {
	switch (value) {
		case 'TopicTab': case 'IndexTabClosed': case 'SearchTabClosed':
			// *кнопка открепить - нет доступа
			setToggleToolbarElement("idUndocTabOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idUndocTabOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idUndocTabText", "nav-text-on", "nav-text-off", "off");
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
		case 'IndexTab': case 'SearchTab':
			// *кнопка открепить - доступна
			setToggleToolbarElement("idUndocTabOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idUndocTabOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idUndocTabText", "nav-text-on", "nav-text-off", "on");
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
			console.log(`(i) Косяк - значение: ${value} не найдено`);
			// *кнопка открепить - доступна
			setToggleToolbarElement("idUndocTabOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idUndocTabOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idUndocTabText", "nav-text-on", "nav-text-off", "on");

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
			alert(`(i) Косяк - значение: ${value} не найдено`);
		break;
	}
}
// (!) setTabShowHide-показать/скрыть текущей вкладку
function setTabShowHide(currentTab, currentContentTab, valueShowHide) {
	let tabs = document.getElementById(currentTab).parentElement;
	let contents = document.getElementById(currentContentTab).parentElement;

	if (valueShowHide == "show") {
		// document.getElementById(currentTab).style.display = null; // - удаляем значение св-ва
		document.getElementById(currentTab).removeAttribute('style'); // - удаляем атрибут "стиль"
		// *делаем вкладку текущей и выводим ее контентную часть
		for (let i = 0; i < tabs.children.length && i < contents.children.length; i++) {
			if (tabs.children[i].id == currentTab && contents.children[i].id == currentContentTab) {
				tabs.children[i].classList.add('topic-tab-current');
				// contents.children[i].style.display = null;
				contents.children[i].removeAttribute('style');
			} else {
				tabs.children[i].classList.remove('topic-tab-current');
				contents.children[i].style.display = "none";
			}
		}
	} else if (valueShowHide == "hide") {
		// *переназначаем предыдущей вкладке значение "текущая", если текущая вкладка была активной
		// if ($(`#${currentTab}`).hasClass('topic-tab-current')) {
		if (document.getElementById(currentTab).classList.contains('topic-tab-current')) {
			let visibleTabs = [];
			let visibleContents = [];
			// *просматриваем все вкладки и исключаем скрытые
			for (let i = 0; i < tabs.children.length && i < contents.children.length; i++) {
				if (tabs.children[i].style.display != "none") {
					visibleTabs.push(tabs.children[i]);
					visibleContents.push(contents.children[i]);
				}
			}
			for (let i = 0; i < visibleTabs.length && visibleContents.length; i++) {
				if (visibleTabs[i].id == currentTab && visibleContents[i].id == currentContentTab) {
					visibleTabs[i].classList.remove('topic-tab-current');
					visibleTabs[i].style.display = "none";
					visibleContents[i].style.display = "none";
					// - делаем предыдущую вкладку и ее контентную часть текущей
					visibleTabs[i - 1].classList.add('topic-tab-current');
					visibleContents[i - 1].removeAttribute('style');
				} else {
					visibleTabs[i].classList.remove('topic-tab-current');
					visibleContents[i].style.display = "none";
				}
			}
		} else { // - делаем текущую вкладку не активной и скрываем ее, и ее контентную часть
			document.getElementById(currentTab).classList.remove('topic-tab-current');
			document.getElementById(currentTab).style.display = "none";
			document.getElementById(currentContentTab).style.display = "none";
		}
	}
}
// (!) setNavPaneShowHide-Скрыть/Показать боковую панель навигации
function setNavPaneShowHide() {
	let navpane = document.getElementById('idNavPane');
	let topicpane = document.getElementById('idTopicPane');
	let navhandle = document.getElementById('idTopicPaneNavShowHideIcon');
	// *оба checkbox должны работать синхронно
	if (($('#idToolbarNavShowHide').prop('checked')) || ($('#idTopicPaneNavShowHide').prop('checked'))) { // - нав.пан.раскрыта
		if (document.getElementById('idBanner').style.display == "none") {
			topicpane.classList.remove('topic-pane-expand');
			topicpane.classList.add('topic-pane-extend');
			// *проверка размера внешнего окна браузера
			if (window.outerWidth > 699) {
				animateNavPane(navpane, "navpaneHide");
				animateNavPane(topicpane, "topicpaneNavPaneHide");
			} else if (window.outerWidth < 699) {
				animateNavPane(navpane, "navpaneHide");
				animateNavPane(topicpane, "topicpaneExtend");
			}
		} else {
			topicpane.classList.remove('topic-pane-extend');
			topicpane.classList.add('topic-pane-expand');
			// *проверка размера внешнего окна браузера
			if (window.outerWidth > 699) {
				animateNavPane(navpane, "navpaneHide");
				animateNavPane(topicpane, "topicpaneNavPaneHide");
			} else if (window.outerWidth < 699) {
				animateNavPane(navpane, "navpaneHideBanner");
				animateNavPane(topicpane, "topicpaneExpand");
			}
		}
		// *трансформация иконки на кнопке в панели топика
		navhandle.classList.remove('navhandle-navpane-show');
		navhandle.classList.add('navhandle-navpane-hide');
		setTimeout(() => {
			navpane.style.display = "none"; // - скрываем нав.пан.
		}, "1500");
	} else { // - нав.пан.скрыта
		// navpane.removeAttribute("style"); // - удаляем атрибут "стиль"
		navpane.style.display = null; // - удаляем значение св-ва - отображаем нав.пан.
		topicpane.classList.remove('topic-pane-expand');
		topicpane.classList.remove('topic-pane-extend');
		// *проверка размера внешнего окна браузера
		if (window.outerWidth > 699) {
			animateNavPane(navpane, "navpaneShow");
			animateNavPane(topicpane, "topicpaneNavPaneShow");
		} else if (window.outerWidth < 699) {
			if (document.getElementById('idBanner').style.display == "none") {
				animateNavPane(navpane, "navpaneShow");
				animateNavPane(topicpane, "topicpaneNavPaneShow");
			} else {
				animateNavPane(navpane, "navpaneShowBanner");
				animateNavPane(topicpane, "topicpaneNavPaneShowBanner");
			}
		}
		// *трансформация иконки на кнопке в панели топика
		navhandle.classList.remove('navhandle-navpane-hide');
		navhandle.classList.add('navhandle-navpane-show');
	}
}
// (!) animateBanner-анимация баннера
function animateBanner (animatedElem, animationName) {
	// animatedElem.style.animationFillMode = "backwards"; // - Элемент сохранит стиль первого ключевого кадра на протяжении периода animation-delay. Первый ключевой кадр определяется значением animation-direction
	animatedElem.style.animation = animationName;
	animatedElem.style.animationDuration = "1.5s";
	animatedElem.style.animationDelay = "0ms"; // - Время задержки перед стартом анимации
	// animatedElem.style.animationFillMode = "both"; // - Анимация будет вести себя так, как будто значения forwards и backwards заданы одновременно
	// animatedElem.style.animationFillMode = "forwards"; // - По окончании анимации элемент сохранит стили последнего ключевого кадра, который определяется значениями animation-direction и animation-iteration-count
}
// (!) animateNavPane-анимация панели навигации
function animateNavPane (animatedElem, animationName) {
	// animatedElem.style.animationFillMode = "backwards"; // - Элемент сохранит стиль первого ключевого кадра на протяжении периода animation-delay. Первый ключевой кадр определяется значением animation-direction
	animatedElem.style.animation = animationName;
	animatedElem.style.animationDuration = "2s";
	animatedElem.style.animationDelay = "0ms"; // - Время задержки перед стартом анимации
	// animatedElem.style.animationFillMode = "both"; // - Анимация будет вести себя так, как будто значения forwards и backwards заданы одновременно
	// animatedElem.style.animationFillMode = "forwards"; // - По окончании анимации элемент сохранит стили последнего ключевого кадра, который определяется значениями animation-direction и animation-iteration-count
}
// ******************************************
// (i) ELEMENTS
// (i)*idToolbar-Элементы панели инструментов, см.файл index.html
// (!) quickSearch-кнопка Быстрый поиск
function quickSearch () {
	alert(`(i) Кнопка «Быстрый поиск» на панели пока что в разработке.`);
}
// (!) topicsPane-кнопка Обзор
function topicsPane () {
	setTabShowHide("idTopicTab", "idTopicBox", "show"); // - отображаем вкладку
	setToolbarButtonOnOff("TopicTab"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
}
// (!) indexPane-кнопка Ключевые слова
function indexPane () {
	setTabShowHide("idIndexTab", "idIndexBox", "show"); // - отображаем вкладку
	setToolbarButtonOnOff("IndexTab"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
}
// (!) searchPane-кнопка Поиск
function searchPane () {
	setTabShowHide("idSearchTab", "idSearchBox", "show"); // - отображаем вкладку
	setToolbarButtonOnOff("SearchTab"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
}
// (!) undockTab-кнопка Открепить
function undockTab () {
	alert(`(i) Кнопка «Открепить» на панели пока что в разработке.`);
	// unpinTab();
}
// (!) newTab-кнопка Новая вкладка
function newTab () {
	alert(`(i) Кнопка «Новая вкладка» на панели пока что в разработке.`);
}
// (!) bannerShowHide-кнопка Показать/Скрыть баннер
// *js/JavaScript
function bannerShowHide () {
	// let inputBunner = document.getElementById('idBannerShowHide');
	let banner = document.getElementById('idBanner');
	let toolbar = document.getElementById('idToolbar');
	let navpane = document.getElementById('idNavPane');
	let topicpane = document.getElementById('idTopicPane');
	// *переключение классов и стилей
	toolbar.classList.replace('toolbar', 'toolbar-banner');
	// $(`#${toolbar.id}`).toggleClass('toolbar toolbar-banner');
	// banner.style.display == "none" ? banner.style.display = "" : banner.style.display = "none"; // однострочная запись - переключатель toggle через условный тернарный оператор (?:) с тремя операндами в JavaScript
	if (document.getElementById('idBannerShowHide').checked) { // - баннер раскрыт
		if (navpane.classList.contains('nav-pane-banner')) {
			navpane.classList.remove('nav-pane-banner');
		}
		if (topicpane.classList.contains('topic-pane-banner')) {
			topicpane.classList.remove('topic-pane-banner');
		}
		if (navpane.style.display == "none") {
			topicpane.classList.remove('topic-pane-expand');
			topicpane.classList.add('topic-pane-extend'); // - изм.одну высоту пан.топика на др.
		} else {
			topicpane.classList.remove('topic-pane-expand');
			topicpane.classList.remove('topic-pane-extend');
		}
		// *проверка размера внешнего окна браузера
		if (window.outerWidth > 699) {
			animateBanner(banner, "bannerHide");
			animateBanner(toolbar, "bannerHide");
			animateBanner(navpane, "panelBannerHide");
			animateBanner(topicpane, "panelBannerHide");
		} else if (window.outerWidth < 699) {
			animateBanner(banner, "bannerHide");
			animateBanner(toolbar, "bannerHide");
			animateBanner(navpane, "panelBannerHide");
			if (navpane.style.display == "none") {
				animateBanner(topicpane, "panelBannerHide");
			} else {
				animateBanner(topicpane, "topicpaneBannerHide");
			}
		}
		setTimeout(() => {
			banner.style.display = "none"; // - скрываем баннер
		}, 1500);
	} else { // - баннер скрыт
		banner.style.display = null; // - удаляем значение св-ва - отображаем баннер
		// if (banner.style.display == "none") {
		// 	// banner.removeAttribute('style'); // удаляем атрибут "стиль"
		// 	// banner.style.display = ""; // удаляем значение св-ва или
		// 	// banner.style.display = null; // удаляем значение св-ва
		// }
		if (!navpane.classList.contains('nav-pane-banner')) { // - класс отсутствует
			navpane.classList.add('nav-pane-banner');
		}
		if (!topicpane.classList.contains('topic-pane-banner')) { // - класс отсутствует
			topicpane.classList.add('topic-pane-banner');
		}
		if (navpane.style.display == "none") {
			topicpane.classList.remove('topic-pane-extend');
			topicpane.classList.add('topic-pane-expand'); // - изм.одну высоту пан.топика на др.
		} else {
			topicpane.classList.remove('topic-pane-expand');
			topicpane.classList.remove('topic-pane-extend');
		}
		// *проверка размера внешнего окна браузера
		if (window.outerWidth > 699) {
			animateBanner(banner, "bannerShow");
			animateBanner(toolbar, "bannerShow");
			animateBanner(navpane, "panelBannerShow");
			animateBanner(topicpane, "panelBannerShow");
		} else if (window.outerWidth < 699) {
			animateBanner(banner, "bannerShow");
			animateBanner(toolbar, "bannerShow");
			animateBanner(navpane, "panelBannerShow");
			if (navpane.style.display == "none") {
				animateBanner(topicpane, "panelBannerShow");
			} else {
				animateBanner(topicpane, "topicpaneBannerShow");
			}
		}
	}
}
// *jq/jQuery
// function bannerShowHide () {
// 	// let inputBunner = $('#idBannerShowHide');
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
// (!) textExpandCollapse-кнопка Развернуть/Свернуть
function textExpandCollapse () {
	alert(`(i) Кнопка «Развернуть/Свернуть» на панели пока что в разработке.\n` + `Кнопка должна сворачивать/разворачивать все скрытые элементы в тексте контента текущего топика.`);
}
// (!) permanentLink-кнопка Постоянная ссылка
function permanentLink () {
	alert(`(i) Кнопка «Постоянная ссылка» на панели пока что в разработке.\n` + `Кнопка выводит окно с сылкой на текущую тему для добавления ее в закладки браузера.`);
}
// (!) printTopic-кнопка Печать
function printTopic () {
	alert(`(i) Кнопка «Печать» на панели пока что в разработке.`);
}
// (!) pageHome-кнопка Домой
function pageHome (hrefString) {
	let elemPageHome = document.getElementById('idNavIconHome');
	elemPageHome.activePage = elemPageHome.getAttribute('hrefString');
	alert(`(i) Кнопка «Домой» на панели пока что в разработке.\n` + `Как это реализовывается я пока НЕ знаю.\n` + `Ссылка должна переходить на страницу текущей главы, раздела...`);
}
// (!) pagePrevious-кнопка Назад
function pagePrevious (hrefString) {
	let elemPagePrevious = document.getElementById('idNavIconPrevious');
	elemPagePrevious.activePage = elemPagePrevious.getAttribute('hrefString');
	alert(`(i) Кнопка «Назад» на панели пока что в разработке.\n` + `Как это реализовывается я пока не знаю.`);
}
// (!) pageNext-кнопка Вперед
function pageNext (hrefString) {
	let elemPageNext = document.getElementById('idNavIconNext');
	elemPageNext.activePage = elemPageNext.getAttribute('hrefString');
	alert(`(i) Кнопка «Вперед» на панели пока что в разработке.\n` + `Как это реализовывается я пока не знаю.`);
}
// (i)*idNavPane-Элементы панели навигации, см.файл navigation.html

// (i)*idTopicPane-Элементы панели тема топика, см.файл index.html
// (i) idTopicControls-контролы
/* (!) writeTOC
'данная функция указана как скрипт в теле блока div панели навигации
(?) надо искать что за функция и какова ее функция */
function writeTOC () {
	alert(`(i) Функция writeTOC пока что в разработке.`);
}
// (!) tabNavigation-кнопка перехода между вкладками
function tabNavigation (event) {
	let tabs = document.getElementById('idTopicTabs');
	let contents = document.getElementById('idContentBox');

	if (event.target.id == "idTabFirst") {
		if (tabs.children[0].classList.contains('topic-tab-current')) {
			alert(`Эта вкладка уже активна`);
		} else {
			for (let i = 0; i < tabs.children.length && i < contents.children.length; i++) {
				if (i == 0) {
					tabs.children[i].classList.add('topic-tab-current');
					contents.children[i].removeAttribute("style");
				} else {
					if (tabs.children[i].style.display != "none") {
						tabs.children[i].classList.remove('topic-tab-current');
						contents.children[i].style.display = "none";
					}
				}
			}
		}
	} else {
		let visibleTabs = []; // - видимые вкладки
		let visibleContents = []; // - контентная часть видимых вкладок
		// *просматриваем все вкладки и исключаем скрытые
		for (let i = 0; i < tabs.children.length; i++) {
			if (tabs.children[i].style.display != "none") {
				visibleTabs.push(tabs.children[i]);
				visibleContents.push(contents.children[i]);
			}
		}
		if (visibleTabs.length == 1) { // - скрыты все вкладки, кроме 1-ой, т.е.главной
			if (tabs.children[0].classList.contains('topic-tab-current')) {
				alert(`Эта вкладка уже активна`);
			} else {
				tabs.children[0].classList.add('topic-tab-current');
				contents.children[0].removeAttribute('style');
			}
		} else {
			if (event.target.id == "idTabPrevious") {
				for (let i = visibleTabs.length - 1; i >= 0; i--) {
					if (i == 0) { // - если вкладка 1-ая, т.е.главная
						if (visibleTabs[i].classList.contains('topic-tab-current')) {
							alert(`Эта вкладка уже активна`);
						} else {
							visibleTabs[i].classList.add('topic-tab-current');
							visibleContents[i].removeAttribute('style');
						}
					} else {
						if (visibleTabs[i].classList.contains('topic-tab-current')) {
							visibleTabs[i].classList.remove('topic-tab-current');
							visibleContents[i].style.display = "none";
							visibleTabs[i - 1].classList.add('topic-tab-current');
							visibleContents[i - 1].removeAttribute('style');
							break;
						}
					}
				}
			} else if (event.target.id == "idTabNext") {
				for (let i = 0; i < visibleTabs.length, i < visibleContents.length; i++) {
					if (i == visibleTabs.length - 1) { // - если видимая вкладка последняя
						if (visibleTabs[i].classList.contains('topic-tab-current')) {
							alert(`Эта вкладка уже активна`);
						} else {
							visibleTabs[0].classList.add('topic-tab-current');
							visibleContents[0].removeAttribute('style');
						}
					} else {
						if (visibleTabs[i].classList.contains('topic-tab-current')) {
							visibleTabs[i].classList.remove('topic-tab-current');
							visibleContents[i].style.display = "none";
							visibleTabs[i + 1].classList.add('topic-tab-current');
							visibleContents[i + 1].removeAttribute('style');
							break;
						}
					}
				}
			} else if (event.target.id == "idTabLast") {
				if (visibleTabs[visibleTabs.length - 1].classList.contains('topic-tab-current')) { // - если последняя видимая вкладка уже активна
					alert(`Эта вкладка уже активна`);
				} else {
					for (let i = 0; i < visibleTabs.length, i < visibleContents.length; i++) {
						if (i == visibleTabs.length - 1) { // - если видимая вкладка последняя
							visibleTabs[i].classList.add('topic-tab-current');
							visibleContents[i].removeAttribute('style');
						} else {
							visibleTabs[i].classList.remove('topic-tab-current');
							visibleContents[i].style.display = "none";
						}
					}
				}
			}
		}
	}
}
// (!) tabsMenu-показать/скрыть меню вкладок
function tabsMenu () {
	let tabsMenuBox = document.getElementById('idTabsMenuBox');
	if (tabsMenuBox.style.display == "none") {
		tabsMenuBox.removeAttribute('style');
	} else {
		tabsMenuBox.style.display = "none";
	}
}
function goToTab (tabNum, valueTrueFalse) {
	// TabSlider.goToTab(0, true); // *строка из index.html
	// TabSlider.goToTab(1, true); // *строка из index.html
	// TabSlider.goToTab(2, true); // *строка из index.html
	if (tabNum == 0) {
		setTabShowHide("idTopicTab", "idTopicBox", "show"); // - отображаем вкладку
		setToolbarButtonOnOff("TopicTab"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
	} else if (tabNum == 1) {
		setTabShowHide("idIndexTab", "idIndexBox", "show"); // - отображаем вкладку
		setToolbarButtonOnOff("IndexTab"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
	} else if (tabNum == 2) {
		setTabShowHide("idSearchTab", "idSearchBox", "show"); // - отображаем вкладку
		setToolbarButtonOnOff("SearchTab"); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
	}
	alert(`(i) Функция перейти на вкладку, пока что в разработке.`);
}
// (!) topicTab
function topicTab () {
	// WebHelp.activePage = WebHelp.currentPage; // *строка из index.html
	let elemTab = document.getElementById('idTopicTab');
	elemTab.activePage = elemTab.currentPage;
}
// (!) keywordsTab
function keywordsTab () {
	// WebHelp.activePage ='index'; // *строка из index.html
	let elemTab = document.getElementById('idIndexTab');
	elemTab.activePage = 'index';
}
// (!) searchTab
function searchTab () {
	// WebHelp.activePage='search'; // *строка из index.html
	let elemTab = document.getElementById('idSearchTab');
	elemTab.activePage = 'search';
}
// (!) unpinTab-открепить вкладку
function unpinTab () {
	// WebHelp.undockTab() // *строка из index.html
	alert(`(i) Функция открепить вкладку, пока что в разработке.`);
}
// (i) idContentBox-Элементы контента топиков - страницы для каждой вкладки
// (!) showComments
// *см.файл comments.js
function showComments () {
	// *строка из файла esd_bss_glavbyx.html
	alert(`(i) Функция покать комментарии пока что в разработке.`);
}
// (!) writeCommentLink
// *см.файл comments.js
// function writeCommentLink (params) {}
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
/* setModalWindow (
	{// alert(`(i) Пока что в разработке`);
		title: "Test"
	}
);

modalWin (
	{
		title: "Текст заголовка",
		content: "Содержимое модального окна",
		buttonClose: [
			{
				class: "btn btn-close",
				text: "Закрыть окно",
				handler: "modalHandlerClose"
			}
		]
	}
); */
