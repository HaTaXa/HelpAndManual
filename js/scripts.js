//дожидаемся полной загрузки страницы, (i) но проверка на null все равно получается нужна, не пойму тогда для чего onload?
window.onload = function () {
	// Инициализация переменных
	// topictablink = document.getElementById('idTopicTabLink');
	// indextablink = document.getElementById('idIndexTabLink');
	// searchtablink = document.getElementById('idSearchTabLink');

	// события элементов вкладок
	// события вкладки топик
	if ('#idTopicTabLink' != null) {
		// наведение курсора
		$('#idTopicTabLink').mouseover(function () {
			$('ul.tabs a#idTopicTabLink span').addClass('hover');
		});
		$('#idTopicTabLink').mouseout(function () {
			$('ul.tabs a#idTopicTabLink span').removeClass('hover');
		});
		// событие клик
		$('#idTopicTabLink').on('click', function () {
			// ссылки во вкладках
			$('#idTopicTabLink').addClass('current');
			$('#idIndexTabLink').removeClass('current');
			$('#idSearchTabLink').removeClass('current');
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
	// события вкладки ключевые слова
	if ('#idIndexTabLink' != null) {
		// наведение курсора
		$('#idIndexTabLink').mouseover(function () {
			$('ul.tabs li#idIndexTab img').css('display', 'block');
			$('ul.tabs a#idIndexTabLink span').addClass('hover');
		});
		$('#idIndexTabLink').mouseout(function () {
			$('ul.tabs li#idIndexTab img').css('display', 'none');
			$('ul.tabs a#idIndexTabLink span').removeClass('hover');
		});
		// событие клик
		$('#idIndexTabLink').on('click', function () {
			// ссылки во вкладках
			$('#idIndexTabLink').addClass('current');
			$('#idTopicTabLink').removeClass('current');
			$('#idSearchTabLink').removeClass('current');
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
	// события кнопки закрытия вкладки ключевые слова
	if ('ul.tabs li#idIndexTab img' != null) {
		// наведение курсора
		$('ul.tabs li#idIndexTab img').mouseover(function () {
			$('ul.tabs li#idIndexTab img').css('cursor', 'pointer');
			$('ul.tabs li#idIndexTab img').css('display', 'block');
			$('ul.tabs li#idIndexTab img').attr('src', 'image/closetabon.png');
		});
		$('ul.tabs li#idIndexTab img').mouseout(function () {
			$('ul.tabs li#idIndexTab img').css('cursor', 'default');
			$('ul.tabs li#idIndexTab img').css('display', 'none');
			$('ul.tabs li#idIndexTab img').attr('src', 'image/closetaboff.png');
		});
		// событие клик
		$('ul.tabs li#idIndexTab img').on('click', function () {
			// ссылки во вкладках
			$('#idTopicTabLink').addClass('current');
			$('#idIndexTabLink').removeClass('current');
			$('#idSearchTabLink').removeClass('current');
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
	// события вкладки поиск
	if ('#idSearchTabLink' != null) {
		// наведение курсора
		$('#idSearchTabLink').mouseover(function () {
			$('ul.tabs li#idSearchTab img').css('display', 'block');
			$('ul.tabs a#idSearchTabLink span').addClass('hover');
		});
		$('#idSearchTabLink').mouseout(function () {
			$('ul.tabs li#idSearchTab img').css('display', 'none');
			$('ul.tabs a#idSearchTabLink span').removeClass('hover');
		});
		// событие клик
		$('#idSearchTabLink').on('click', function () {
			// ссылки во вкладках
			$('#idSearchTabLink').addClass('current');
			$('#idTopicTabLink').removeClass('current');
			$('#idIndexTabLink').removeClass('current');
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
	// события кнопки закрытия вкладки поиск
	if ('ul.tabs li#idSearchTab img' != null) {
		// наведение курсора
		$('ul.tabs li#idSearchTab img').mouseover(function () {
			$('ul.tabs li#idSearchTab img').css('cursor', 'pointer');
			$('ul.tabs li#idSearchTab img').css('display', 'block');
			$('ul.tabs li#idSearchTab img').attr('src', 'image/closetabon.png');
		});
		$('ul.tabs li#idSearchTab img').mouseout(function () {
			$('ul.tabs li#idSearchTab img').css('cursor', 'default');
			$('ul.tabs li#idSearchTab img').css('display', 'none');
			$('ul.tabs li#idSearchTab img').attr('src', 'image/closetaboff.png');
		});
		// событие клик
		$('ul.tabs li#idSearchTab img').on('click', function () {
			// ссылки во вкладках
			$('#idTopicTabLink').addClass('current');
			$('#idIndexTabLink').removeClass('current');
			$('#idSearchTabLink').removeClass('current');
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
	$('#idTopicTabLink').addClass('current');
	$('#idIndexTabLink').removeClass('current');
	$('#idSearchTabLink').removeClass('current');
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
	$('#idIndexTabLink').addClass('current');
	$('#idTopicTabLink').removeClass('current');
	$('#idSearchTabLink').removeClass('current');
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
	$('#idSearchTabLink').addClass('current');
	$('#idTopicTabLink').removeClass('current');
	$('#idIndexTabLink').removeClass('current');
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
// кнопка Показать/Скрыть
function bannerShowHide() {
	// let elemBanner = document.getElementById("idBanner");
	// let elemToolbar = document.getElementById('idToolbar');

	/* if ((elemBanner.style.display == 'none') && $(elemToolbar).hasClass('compact-toolbar')) { */
	if ($("div#idBanner").css('display') == 'none') {
		// console.log(`стиль`);
		// elemBanner.style.display = 'block';
		$("div#idBanner").css('display', 'block');
	}
	else if ($("div#idBanner").css('display') == 'block') {
		$("div#idBanner").css('display', 'none');
	}

	if ($("div#idToolbar").hasClass('compact-toolbar')) {
		// console.log(`класс`);
		$("div#idToolbar").removeClass('compact-toolbar').addClass('banner-toolbar');
	}
	else if ($("div#idToolbar").hasClass('banner-toolbar')) {
		$("div#idToolbar").removeClass('banner-toolbar').addClass('compact-toolbar');
	}
	$("div#idToolbar").toggleClass("toolbar-up toolbar-down");
	$("div#idNavBox").toggleClass("nav-box-up nav-box-down");
	$("div#idTopicPane").toggleClass("topic-pane-up topic-pane-down");
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
// скрыть/показать боковую панель навигации
function NavShowHide () {
	// alert(`(i) Пока что в разработке`);
	$('div#idNavBox').toggleClass("nav-box-right nav-box-left");
	$('div#idTopicPane').toggleClass("topic-pane-right topic-pane-left");
	// img на кнопке
	if ($('div#idNavBox').hasClass('nav-box-left')) {
		$('img#idNavShowHide').attr('src', 'image/nav_open.png');
	}
	else if ($('div#idNavBox').hasClass('nav-box-right')) {
		$('img#idNavShowHide').attr('src', 'image/nav_close.png');
	};
	// вертикальный разделитель
	if ($("div#idDragDivider").css('cursor') == 'col-resize') {
		$("div#idDragDivider").css('cursor', 'default');
	}
	else if ($('div#idDragDivider').css('cursor') == 'default') {
		$('div#idDragDivider').css('cursor', 'col-resize');
	};
}
// Отображение текущего оглавления и скрытие другого
function toggleList() {
	// ondblclick="return dblclicked(this);" из файла navigation.html стр.56

// let elemChildrens = document.querySelector("ul").children;
// if (elemChildrens != null) {
// 	for (let i = 0, child; child = elemChildrens[i]; i++) {
// 		// elemChildrens - коллекция детей списка
// 		// child - последовательно, каждый из элементов elemChildrens
// 		alert(child.getAttribute('id'));
// 	}
// }
	$("ul").toggleClass("image-expand image-collapse");
	// $("a").toggleClass("list-hide list-show");
	alert(`(i) Функция отображения текущего оглавления и скрытие другого, пока что в разработке.`);
}

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
// Элементы в топике контента - файл index.html
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