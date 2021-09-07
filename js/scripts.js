// Дожидаемся полной загрузки страницы, (i) но проверка на null все равно получается нужна, (?) не пойму тогда для чего onload?

window.onload = function () {
	// Инициализация переменных
	// topictablink = document.getElementById('idTopicTab');
	// indextablink = document.getElementById('idIndexTab');
	// searchtablink = document.getElementById('idSearchTab');

	// события элементов вкладок
	// события вкладки Топик
	if ('#idTopicTab' != null) {
		// наведение курсора
		$('#idTopicTab').mouseover(function () {
			$('#idTopicTabLink span').addClass('topic-tab-hover');
			styleAddRemove("#idTopicTabLink", "add"); // доп.к стилю .topic-tab a:hover{}
		});
		$('#idTopicTab').mouseout(function () {
			$('#idTopicTabLink span').removeClass('topic-tab-hover');
			styleAddRemove("#idTopicTabLink", "del"); // доп.к стилю .topic-tab a{}
		});
		// событие клик
		$('#idTopicTab').on('click', function () {
			// ссылки во вкладках
			$('#idTopicTab').addClass('topic-tab-current');
			$('#idIndexTab').removeClass('topic-tab-current');
			$('#idSearchTab').removeClass('topic-tab-current');
			// контент-текст
			$('#idContentBox').css('display', 'block');
			$('#idIndexBox').css('display', 'none');
			$('#idSearchBox').css('display', 'none');
			// кнопки на панели инструментов
			// кнопка открепить нет доступа
			$('#idUndocTabOn').css('display', 'none');
			$('#idUndocTabOff').css('display', 'block');
			$('#idUndocTabText').addClass('nav-text-off');
			// кнопка новая вкладка доступна
			$('#idNewTabOn').css('display', 'block');
			$('#idNewTabOff').css('display', 'none');
			$('#idNewTabText').removeClass('nav-text-off');
			// кнопка развернуть/свернуть доступна
			$('#idExpandOn').css('display', 'block');
			$('#idExpandOff').css('display', 'none');
			$('#idExpandText').removeClass('nav-text-off');
			// кнопка постоянная ссылка доступна
			$('#idPermalinkOn').css('display', 'block');
			$('#idPermalinkOff').css('display', 'none');
			$('#idPermalinkText').removeClass('nav-text-off');
			// кнопка email доступна
			$('#idFeedBackOn').css('display', 'block');
			$('#idFeedBackOff').css('display', 'none');
			$('#idFeedBackText').removeClass('nav-text-off');
			// кнопка печать доступна
			$('#idPrinterOn').css('display', 'block');
			$('#idPrinterOff').css('display', 'none');
			$('#idPrinterText').removeClass('nav-text-off');
		});
	};
	// события вкладки Ключевые слова
	if ('#idIndexTab' != null) {
		// наведение курсора
		$('#idIndexTab').mouseover(function () {
			$('#idIndexTabLink').addClass('topic-tab-hover');
			$('#idIndexTabLink span').addClass('topic-tab-hover');
			$('#idIndexTab img').css('display', 'block');
			styleAddRemove("#idIndexTabLink", "add"); // доп.к стилю .topic-tab a:hover{}
		});
		$('#idIndexTab').mouseout(function () {
			$('#idIndexTabLink').removeClass('topic-tab-hover');
			$('#idIndexTabLink span').removeClass('topic-tab-hover');
			$('#idIndexTab img').css('display', 'none');
			styleAddRemove("#idIndexTabLink", "del"); // доп.к стилю .topic-tab a{}
		});
		// событие клик
		$('#idIndexTab').on('click', function () {
			// ссылки во вкладках
			$('#idIndexTab').addClass('topic-tab-current');
			$('#idTopicTab').removeClass('topic-tab-current');
			$('#idSearchTab').removeClass('topic-tab-current');
			// контент-текст
			$('#idIndexBox').css('display', 'block');
			$('#idContentBox').css('display', 'none');
			$('#idSearchBox').css('display', 'none');
			// кнопки на панели инструментов
			// кнопка открепить доступа
			$('#idUndocTabOn').css('display', 'block');
			$('#idUndocTabOff').css('display', 'none');
			$('#idUndocTabText').removeClass('nav-text-off');
			// кнопка новая вкладка нет доступа
			$('#idNewTabOn').css('display', 'none');
			$('#idNewTabOff').css('display', 'block');
			$('#idNewTabText').addClass('nav-text-off');
			// кнопка развернуть/свернуть нет доступа
			$('#idExpandOn').css('display', 'none');
			$('#idExpandOff').css('display', 'block');
			$('#idExpandText').addClass('nav-text-off');
			// кнопка постоянная ссылка нет доступа
			$('#idPermalinkOn').css('display', 'none');
			$('#idPermalinkOff').css('display', 'block');
			$('#idPermalinkText').addClass('nav-text-off');
			// кнопка email нет доступа
			$('#idFeedBackOn').css('display', 'none');
			$('#idFeedBackOff').css('display', 'block');
			$('#idFeedBackText').addClass('nav-text-off');
			// кнопка печать нет доступа
			$('#idPrinterOn').css('display', 'none');
			$('#idPrinterOff').css('display', 'block');
			$('#idPrinterText').addClass('nav-text-off');
		});
	};
	// события кнопки закрытия на вкладке Ключевые слова
	if ('#idIndexTab img' != null) {
		// наведение курсора
		// $('#idIndexTab img').mouseover(function () {
		// 	$('#idIndexTab img').css('cursor', 'pointer');
		// 	$('#idIndexTab img').css('display', 'block');
		// 	$('#idIndexTab img').attr('src', 'image/closetabon.png');
		// });
		// $('#idIndexTab img').mouseout(function () {
		// 	$('#idIndexTab img').css('cursor', 'default');
		// 	$('#idIndexTab img').css('display', 'none');
		// 	$('#idIndexTab img').attr('src', 'image/closetaboff.png');
		// });
		// событие клик
		$('#idIndexTab img').on('click', function () {
			// ссылки во вкладках
			$('#idTopicTab').addClass('topic-tab-current');
			$('#idIndexTab').removeClass('topic-tab-current');
			$('#idSearchTab').removeClass('topic-tab-current');
			// вкладки
			$('#idTopicTab').css('display', 'list-item');
			$('#idIndexTab').css('display', 'none');
			// $('#idSearchTab').css('display', 'none');
			// контент-текст
			$('#idContentBox').css('display', 'block');
			$('#idIndexBox').css('display', 'none');
			$('#idSearchBox').css('display', 'none');
			// кнопка на панели инструментов
			// кнопка открепить - нет доступа
			$('#idUndocTabOn').css('display', 'none');
			$('#idUndocTabOff').css('display', 'block');
			$('#idUndocTabText').addClass('nav-text-off');
			// кнопка новая вкладка доступна
			$('#idNewTabOn').css('display', 'block');
			$('#idNewTabOff').css('display', 'none');
			$('#idNewTabText').removeClass('nav-text-off');
			// кнопка развернуть/свернуть доступна
			$('#idExpandOn').css('display', 'block');
			$('#idExpandOff').css('display', 'none');
			$('#idExpandText').removeClass('nav-text-off');
			// кнопка постоянная ссылка доступна
			$('#idPermalinkOn').css('display', 'block');
			$('#idPermalinkOff').css('display', 'none');
			$('#idPermalinkText').removeClass('nav-text-off');
			// кнопка email доступна
			$('#idFeedBackOn').css('display', 'block');
			$('#idFeedBackOff').css('display', 'none');
			$('#idFeedBackText').removeClass('nav-text-off');
			// кнопка печать доступна
			$('#idPrinterOn').css('display', 'block');
			$('#idPrinterOff').css('display', 'none');
			$('#idPrinterText').removeClass('nav-text-off');
		});
	};
	// события вкладки Поиск
	if ('#idSearchTab' != null) {
		// наведение курсора
		$('#idSearchTab').mouseover(function () {
			$('#idSearchTabLink').addClass('topic-tab-hover');
			$('#idSearchTabLink span').addClass('topic-tab-hover');
			$('#idSearchTab img').css('display', 'block');
			styleAddRemove("#idSearchTabLink", "add"); // доп.к стилю .topic-tab a:hover{}
		});
		$('#idSearchTab').mouseout(function () {
			$('#idSearchTabLink').removeClass('topic-tab-hover');
			$('#idSearchTabLink span').removeClass('topic-tab-hover');
			$('#idSearchTab img').css('display', 'none');
			styleAddRemove("#idSearchTabLink", "del"); // доп.к стилю .topic-tab a{}
		});
		// событие клик
		$('#idSearchTab').on('click', function () {
			// ссылки во вкладках
			$('#idSearchTab').addClass('topic-tab-current');
			$('#idTopicTab').removeClass('topic-tab-current');
			$('#idIndexTab').removeClass('topic-tab-current');
			// контент-текст
			$('#idSearchBox').css('display', 'block');
			$('#idContentBox').css('display', 'none');
			$('#idIndexBox').css('display', 'none');
			// кнопки на панели инструментов
			// кнопка открепить доступна
			$('#idUndocTabOn').css('display', 'block');
			$('#idUndocTabOff').css('display', 'none');
			$('#idUndocTabText').removeClass('nav-text-off');
			// кнопка новая вкладка нет доступа
			$('#idNewTabOn').css('display', 'none');
			$('#idNewTabOff').css('display', 'block');
			$('#idNewTabText').addClass('nav-text-off');
			// кнопка развернуть/свернуть нет доступа
			$('#idExpandOn').css('display', 'none');
			$('#idExpandOff').css('display', 'block');
			$('#idExpandText').addClass('nav-text-off');
			// кнопка постоянная ссылка нет доступа
			$('#idPermalinkOn').css('display', 'none');
			$('#idPermalinkOff').css('display', 'block');
			$('#idPermalinkText').addClass('nav-text-off');
			// кнопка email нет доступа
			$('#idFeedBackOn').css('display', 'none');
			$('#idFeedBackOff').css('display', 'block');
			$('#idFeedBackText').addClass('nav-text-off');
			// кнопка печать нет доступа
			$('#idPrinterOn').css('display', 'none');
			$('#idPrinterOff').css('display', 'block');
			$('#idPrinterText').addClass('nav-text-off');
		});
	};
	// события кнопки закрытия на вкладке Поиск
	if ('#idSearchTab img' != null) {
		// наведение курсора
		// $('#idSearchTab img').mouseover(function () {
		// 	$('#idSearchTab img').css('cursor', 'pointer');
		// 	$('#idSearchTab img').css('display', 'block');
		// 	$('#idSearchTab img').attr('src', 'image/closetabon.png');
		// });
		// $('#idSearchTab img').mouseout(function () {
		// 	$('#idSearchTab img').css('cursor', 'default');
		// 	$('#idSearchTab img').css('display', 'none');
		// 	$('#idSearchTab img').attr('src', 'image/closetaboff.png');
		// });
		// событие клик
		$('#idSearchTab img').on('click', function () {
			// ссылки во вкладках
			$('#idTopicTab').addClass('topic-tab-current');
			$('#idIndexTab').removeClass('topic-tab-current');
			$('#idSearchTab').removeClass('topic-tab-current');
			// вкладки
			$('#idTopicTab').css('display', 'list-item');
			// $('#idIndexTab').css('display', 'none');
			$('#idSearchTab').css('display', 'none');
			// контент-текст
			$('#idContentBox').css('display', 'block');
			$('#idIndexBox').css('display', 'none');
			$('#idSearchBox').css('display', 'none');
			// кнопка на панели инструментов
			// кнопка открепить - нет доступа
			$('#idUndocTabOn').css('display', 'none');
			$('#idUndocTabOff').css('display', 'block');
			$('#idUndocTabText').addClass('nav-text-off');
			// кнопка новая вкладка доступна
			$('#idNewTabOn').css('display', 'block');
			$('#idNewTabOff').css('display', 'none');
			$('#idNewTabText').removeClass('nav-text-off');
			// кнопка развернуть/свернуть доступна
			$('#idExpandOn').css('display', 'block');
			$('#idExpandOff').css('display', 'none');
			$('#idExpandText').removeClass('nav-text-off');
			// кнопка постоянная ссылка доступна
			$('#idPermalinkOn').css('display', 'block');
			$('#idPermalinkOff').css('display', 'none');
			$('#idPermalinkText').removeClass('nav-text-off');
			// кнопка email доступна
			$('#idFeedBackOn').css('display', 'block');
			$('#idFeedBackOff').css('display', 'none');
			$('#idFeedBackText').removeClass('nav-text-off');
			// кнопка печать доступна
			$('#idPrinterOn').css('display', 'block');
			$('#idPrinterOff').css('display', 'none');
			$('#idPrinterText').removeClass('nav-text-off');
		});
	};
}
// доп.к стилю .topic-tab a/.topic-tab a:hover
function styleAddRemove(selectorName, value) {
	if (value == "add") {
		$(selectorName).css('top', '3px'); // доп.к стилю .topic-tab a:hover{}
	}
	if (value == "del") {
		$(selectorName).removeAttr('style'); // доп.к стилю .topic-tab a{}
	}
}

// Элементы панели инструментов - файл index.html

// кнопка Быстрый поиск
function quickSearch() {
	alert(`(i) Кнопка «Быстрый поиск» на панели пока что в разработке.`);
}
// кнопка Обзор
function topicsPane() {
	// alert(`(i) Кнопка «Обзор» на панели пока что в разработке`);
	// вкладки
	$('#idTopicTab').css('display', 'list-item');
	// $('#idIndexTab').css('display', 'list-item');
	// $('#idSearchTab').css('display', 'list-item');
	// ссылки во вкладках
	$('#idTopicTab').addClass('topic-tab-current');
	$('#idIndexTab').removeClass('topic-tab-current');
	$('#idSearchTab').removeClass('topic-tab-current');
	// контент-текст
	$('#idContentBox').css('display', 'block');
	$('#idIndexBox').css('display', 'none');
	$('#idSearchBox').css('display', 'none');
	// кнопки на панели инструментов
	// кнопка открепить нет доступа
	$('#idUndocTabOn').css('display', 'none');
	$('#idUndocTabOff').css('display', 'block');
	$('#idUndocTabText').addClass('nav-text-off');
	// кнопка новая вкладка доступна
	$('#idNewTabOn').css('display', 'block');
	$('#idNewTabOff').css('display', 'none');
	$('#idNewTabText').removeClass('nav-text-off');
	// кнопка развернуть/свернуть доступна
	$('#idExpandOn').css('display', 'block');
	$('#idExpandOff').css('display', 'none');
	$('#idExpandText').removeClass('nav-text-off');
	// кнопка постоянная ссылка доступна
	$('#idPermalinkOn').css('display', 'block');
	$('#idPermalinkOff').css('display', 'none');
	$('#idPermalinkText').removeClass('nav-text-off');
	// кнопка email доступна
	$('#idFeedBackOn').css('display', 'block');
	$('#idFeedBackOff').css('display', 'none');
	$('#idFeedBackText').removeClass('nav-text-off');
	// кнопка печать доступна
	$('#idPrinterOn').css('display', 'block');
	$('#idPrinterOff').css('display', 'none');
	$('#idPrinterText').removeClass('nav-text-off');
}
// кнопка Ключевые слова
function indexPane() {
	// alert(`(i) Кнопка «Ключевые слова» на панели пока что в разработке`);
	// вкладки
	$('#idIndexTab').css('display', 'list-item');
	// $('#idTopicTab').css('display', 'list-item');
	// $('#idSearchTab').css('display', 'list-item');
	// ссылки во вкладках
	$('#idIndexTab').addClass('topic-tab-current');
	$('#idTopicTab').removeClass('topic-tab-current');
	$('#idSearchTab').removeClass('topic-tab-current');
	// контент-текст
	$('#idIndexBox').css('display', 'block');
	$('#idContentBox').css('display', 'none');
	$('#idSearchBox').css('display', 'none');
	// кнопки на панели инструментов
	// кнопка открепить доступна
	$('#idUndocTabOn').css('display', 'block');
	$('#idUndocTabOff').css('display', 'none');
	$('#idUndocTabText').removeClass('nav-text-off');
	// кнопка новая вкладка нет доступа
	$('#idNewTabOn').css('display', 'none');
	$('#idNewTabOff').css('display', 'block');
	$('#idNewTabText').addClass('nav-text-off');
	// кнопка развернуть/свернуть нет доступа
	$('#idExpandOn').css('display', 'none');
	$('#idExpandOff').css('display', 'block');
	$('#idExpandText').addClass('nav-text-off');
	// кнопка постоянная ссылка нет доступа
	$('#idPermalinkOn').css('display', 'none');
	$('#idPermalinkOff').css('display', 'block');
	$('#idPermalinkText').addClass('nav-text-off');
	// кнопка email нет доступа
	$('#idFeedBackOn').css('display', 'none');
	$('#idFeedBackOff').css('display', 'block');
	$('#idFeedBackText').addClass('nav-text-off');
	// кнопка печать нет доступа
	$('#idPrinterOn').css('display', 'none');
	$('#idPrinterOff').css('display', 'block');
	$('#idPrinterText').addClass('nav-text-off');
}
// кнопка Поиск
function searchPane() {
	// alert(`(i) Кнопка «Поиск» на панели пока что в разработке`);
	// вкладки
	$('#idSearchTab').css('display', 'list-item');
	// $('#idTopicTab').css('display', 'list-item');
	// $('#idIndexTab').css('display', 'list-item');
	// ссылки во вкладках
	$('#idSearchTab').addClass('topic-tab-current');
	$('#idTopicTab').removeClass('topic-tab-current');
	$('#idIndexTab').removeClass('topic-tab-current');
	// контент-текст
	$('#idSearchBox').css('display', 'block');
	$('#idContentBox').css('display', 'none');
	$('#idIndexBox').css('display', 'none');
	// кнопки на панели инструментов
	// кнопка открепить доступна
	$('#idUndocTabOn').css('display', 'block');
	$('#idUndocTabOff').css('display', 'none');
	$('#idUndocTabText').removeClass('nav-text-off');
	// кнопка новая вкладка нет доступа
	$('#idNewTabOn').css('display', 'none');
	$('#idNewTabOff').css('display', 'block');
	$('#idNewTabText').addClass('nav-text-off');
	// кнопка развернуть/свернуть нет доступа
	$('#idExpandOn').css('display', 'none');
	$('#idExpandOff').css('display', 'block');
	$('#idExpandText').addClass('nav-text-off');
	// кнопка постоянная ссылка нет доступа
	$('#idPermalinkOn').css('display', 'none');
	$('#idPermalinkOff').css('display', 'block');
	$('#idPermalinkText').addClass('nav-text-off');
	// кнопка email нет доступа
	$('#idFeedBackOn').css('display', 'none');
	$('#idFeedBackOff').css('display', 'block');
	$('#idFeedBackText').addClass('nav-text-off');
	// кнопка печать нет доступа
	$('#idPrinterOn').css('display', 'none');
	$('#idPrinterOff').css('display', 'block');
	$('#idPrinterText').addClass('nav-text-off');
}
// кнопка Открепить
function undockTab() {
	alert(`(i) Кнопка «Открепить» на панели пока что в разработке.`);
	// unpinTab();
}
// кнопка Новая вкладка
function newTab() {
	alert(`(i) Кнопка «Новая вкладка» на панели пока что в разработке.`);
}
// кнопка Показать/Скрыть баннер
function bannerShowHide() {
	$("#idToolbar").toggleClass("toolbar-compact toolbar-banner");
	$('#idNavPane').toggleClass('nav-pane-banner-show');
	$('#idTopicPane').toggleClass('topic-pane-banner-show');
	if ($('#idBanner').css('display') == 'none') { // баннер скрыт
		$('#idBanner').removeAttr('style'); // отображаем
		// состояние навигационной панели
		if ($('#idNavPane').css('display') == 'none') { // нав.пан.скрыта
			$('#idTopicPane').removeClass('topic-pane-expand');
			$('#idTopicPane').addClass('topic-pane-extend'); // изм.высоту пан.топика
		}
		else { // нав.пан.открыта
			$('#idTopicPane').removeClass('topic-pane-expand');
			$('#idTopicPane').removeClass('topic-pane-extend');
		}
	}
	else { // баннер открыт
		$('#idBanner').css('display', 'none'); // скрываем
		// состояние навигационной панели
		if ($('#idNavPane').css('display') == 'none') { // нав.пан.скрыта
			$('#idTopicPane').removeClass('topic-pane-extend');
			$('#idTopicPane').addClass('topic-pane-expand'); // изм.высоту пан.топика
		}
		else { // нав.пан.открыта
			$('#idTopicPane').removeClass('topic-pane-expand');
			$('#idTopicPane').removeClass('topic-pane-extend');
		}
	}
}
// кнопка Развернуть/Свернуть
function textHiddenExpand() {
	alert(`(i) Кнопка «Развернуть/Свернуть» на панели пока что в разработке.\n` + `Кнопка должна сворачивать/разворачивать все скрытые элементы в тексте контента текущего топика.`);
}
// кнопка Постоянная ссылка
function setPermalink() {
	alert(`(i) Кнопка «Постоянная ссылка» на панели пока что в разработке.\n` + `Кнопка выводит окно с сылкой на текущую тему для добавления ее в закладки браузера.`);
}
// кнопка Печать
function printTopic() {
	alert(`(i) Кнопка «Печать» на панели пока что в разработке.`);
}
// кнопка Домой
function pageHome(hrefString) {
	let elemPageHome = document.getElementById('idNavIconHome');
	elemPageHome.activePage = elemPageHome.getAttribute('hrefString');
	alert(`(i) Кнопка «Домой» на панели пока что в разработке.\n` + `Как это реализовывается я пока НЕ знаю.\n` + `Ссылка должна переходить на страницу текущей главы, раздела...`);
}
// кнопка Назад
function pagePrevious(hrefString) {
	let elemPagePrevious = document.getElementById('idNavIconPrevious');
	elemPagePrevious.activePage = elemPagePrevious.getAttribute('hrefString');
	alert(`(i) Кнопка «Назад» на панели пока что в разработке.\n` + `Как это реализовывается я пока не знаю.`);
}
// кнопка Вперед
function pageNext(hrefString) {
	let elemPageNext = document.getElementById('idNavIconNext');
	elemPageNext.activePage = elemPageNext.getAttribute('hrefString');
	alert(`(i) Кнопка «Вперед» на панели пока что в разработке.\n` + `Как это реализовывается я пока не знаю.`);
}

// **************************************************************
// Элементы боковой панели навигации - файл navigation.htm

// данная функция указана как скрипт в теле блока div боковой панели навигации
function writeTOC() {
	// ??? надо искать что за функция и какова ее функция
	alert(`(i) Функция writeTOC пока что в разработке.`);
}
// кнопка Скрыть/Показать боковую панель навигации
function NavShowHide () {
	if ($('#idNavPane').css('display') == 'none') { // нав.пан.скрыта
		$('#idNavPane').removeAttr('style'); // отображаем
		$('img#idNavShowHide').attr('src', 'image/nav_hide.png');
		$('#idTopicPane').removeClass('topic-pane-expand');
		$('#idTopicPane').removeClass('topic-pane-extend');
	}
	else { // нав.пан.открыта
		$('#idNavPane').css('display', 'none'); // скрываем
		$('img#idNavShowHide').attr('src', 'image/nav_show.png');
		// состояние баннера
		if ($('#idBanner').css('display') == 'none') { // баннер скрыт
			$('#idTopicPane').addClass('topic-pane-expand'); // изм.высоту пан.топика
		}
		else { // банер открыт
			$('#idTopicPane').addClass('topic-pane-extend'); // изм.высоту пан.топика
		}
	}
}
// Отображение выбранного пункта оглавления и скрытие других пунктов
function toggleList() {
	// ondblclick="return dblclicked(this);" из файла navigation.html стр.56
	let elems = document.querySelectorAll('ul');
	// let ul = document.querySelector('ul'); // 'это не текущая ul, на кот.кликнули, это первый yfqltyysq селектор ul на странице.
	// console.log(ul.id);
	// let ul = document.querySelectorAll('ul > li:first-child');
	// когда кликаем 1-ю ul везде должны быть "+", кроме нее и ее первый ребенок ul должна отобразиться
	// $(ul).on('click', function () {
		// for (let elem of elems) {
		for (let i = 0; i < elems.length; i++) {
			if (elems[i].id == "idToc") {
				console.log('display, block: ' + elem[i].id);
				// $(elems[i]).addClass('image-collapse').removeClass('image-expand');
				$(elems[i]).css('display', 'block');
				$(elems[i]).toggleClass("image-expand image-collapse");
				//
				// $(elem.querySelector('ul')).css('display', 'block');
				// $(elem.querySelector('ul')).toggleClass("image-expand image-collapse");
				// console.log(elem.querySelector('ul'));
			}
			else {
				console.log('display, none: ' + elems[i].id);
				$(elems[i]).css('display', 'none');
				$(elems[i]).toggleClass("image-expand image-collapse");
			};
		};
	// });

	// else {
	// 	console.log(`ul != idToc`);
	// 	$('ul#idToc').addClass('image-collapse').removeClass('image-expand');
	// 	$(ul).css('display', 'block'); // текущей ul раскрываем
	// 	$(ul).addClass('image-collapse').removeClass('image-expand');
	// };

	// $(".dropdown > ul li").each(function(){
	// 	let txt = $(this).text();
	// 	console.log(txt);
	// });

	// let elemChildrens = document.querySelector("ul").children;
	// if (elemChildrens != null) {
	// 	for (let i = 0, child; child = elemChildrens[i]; i++) {
	// 		// elemChildrens - коллекция детей списка
	// 		// child - последовательно, каждый из элементов elemChildrens
	// 		alert(child.getAttribute('id'));
	// 	}
	// }

	// $("ul#ul1").toggleClass("image-expand image-collapse");
	// // $("a").toggleClass("list-hide list-show");
	// // alert(`(i) Функция отображения текущего оглавления и скрытие другого, пока что в разработке.`);
	// $('ul#idToc').css('display', 'block');
	// $('li#idToc_li').css('display', 'block');

	// $('ul#ul1').css('display', 'block');
	// // $('li#ul1').css('display', 'block');
};

// *************************************************
// Элементы вкладок топика - файл index.html

function unpinTab() {
	// WebHelp.undockTab() // строка из index.html
	alert(`(i) Функция открепить вкладку, пока что в разработке.`);
}

function topicTab() {
	// WebHelp.activePage = WebHelp.currentPage; // строка из index.html (235)
	// alert(`(i) Функция перейти на вкладку «Текущая вкладка» пока что в разработке.`);
	let elemTab = document.getElementById('idTopicTab');
	elemTab.activePage = elemTab.currentPage;
}

function keywordsTab() {
	// WebHelp.activePage ='index'; // строка из index.html (240)
	// alert(`(i) Функция перейти на вкладку «Ключевые слова» пока что в разработке.`);
	let elemTab = document.getElementById('idIndexTab');
	elemTab.activePage = 'index';
}

function searchTab() {
	// WebHelp.activePage='search'; // строка из index.html (246)
	// alert(`(i) Функция перейти на вкладку «Поиск» пока что в разработке.`);
	let elemTab = document.getElementById('idSearchTab');
	elemTab.activePage = 'search';
}

// *******************************************
// см.файл comments.js
function showComments() {
	// строка из файла esd_bss_glavbyx.htm (87)
	alert(`(i) Функция покать комментарии пока что в разработке.`);
}

// function writeCommentLink(params) {}

// *************************************************
// Элементы в топике контент-текста - файл index.html

// Версия редакций инструкций - открытие в новом окне браузера
function manualVersion() {
	{
		// let features = 'toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=yes,width=900,height=700';
		// let features = 'left=100,top=100,width=350,height=250,menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
		let features = 'width=350,height=350,left='+((screen.width-500)/2)+',top='+((screen.height-500)/2)+',menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
		// window.open("","","width=250,height=250"); /* пример открытия пустого окна */
		window.open('manual_version.htm', "", features);
	}
}
// ****************************************************
// модальное окно
// создание модального окна с настройками по умолчанию
// function modalWindow() {
// 	{
// 		modalWin();
// 	}
// }
// код, выполняющего создание модального окна без кнопок в нижней части, с заголовком «Новое сообщение» и пустым содержимым
/* setModalWindow(
	{// alert(`(i) Пока что в разработке`);
		title: "Test"
	}
);

modalWin(
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
// модальное окно
// *******************************************