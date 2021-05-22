// Элементы панели инструментов - файл index.html

// кнопка Быстрый поиск
function remoteSearch() {
	alert(`(i) Кнопка «Быстрый поиск» на панели пока что в разработке`);
}
// кнопка Обзор
function topicsPane() {
	alert(`(i) Кнопка «Обзор» на панели пока что в разработке`);
}
// кнопка Ключевые слова
function indexPane() {
	alert(`(i) Кнопка «Ключевые слова» на панели пока что в разработке`);
}
// кнопка Поиск
function searchPane() {
	alert(`(i) Кнопка «Поиск» на панели пока что в разработке`);
}
// кнопка Открепить
function undockTab() {
	alert(`(i) Кнопка «Открепить» на панели пока что в разработке`);
	// unpinTab();
}
// кнопка Новая вкладка
function newTab() {
	alert(`(i) Кнопка «Новая вкладка» на панели пока что в разработке`);
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
	alert(`(i) Кнопка «Развернуть/Свернуть» на панели пока что в разработке`);
}
// кнопка Постоянная ссылка
function setPermalink() {
	alert(`(i) Кнопка «Постоянная ссылка» на панели пока что в разработке`);
}
// кнопка Печать
function printTopic() {
	alert(`(i) Кнопка «Печать» на панели пока что в разработке`);
}
// кнопка Домой
function pageHome(hrefString) {
	alert(`(i) Кнопка «Домой» на панели пока что в разработке`);
}
// кнопка Назад
function pagePrevious(hrefString) {
	alert(`(i) Кнопка «Назад» на панели пока что в разработке`);
}
// кнопка Вперед
function pageNext(hrefString) {
	alert(`(i) Кнопка «Вперед» на панели пока что в разработке`);
}

// ****************************************************
// Элементы боковой панели навигации - файл navigationPane.htm

function NavShowHide() {
	// alert(`(i) Пока что в разработке`);
	$("div#idNavBox").toggleClass("nav-box-show nav-box-hide");
	if ($("div#idDragDivider").css('cursor') == 'col-resize') {
		$("div#idDragDivider").css('cursor', 'default');
	}
	else if ($("div#idDragDivider").css('cursor') == 'default') {
		$("div#idDragDivider").css('cursor', 'col-resize');
	}
	$("div#idTopicPane").toggleClass("topic-pane-right topic-pane-left");
}
// данная функция указана как скрипт в теле блока div боковой панели навигации
function writeTOC() {
	alert(`(i) Функция writeTOC пока что в разработке`);
}
// Отображение текущего оглавления и скрытие другого
function toggleList() {
	// ondblclick="return dblclicked(this);" из файла navigationPane.html стр.56

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
	alert(`(i) Функция отображения текущего оглавления и скрытие другого, пока что в разработке`);
}

// *************************************************
// Элементы вкладок топика - файл index.html

function unpinTab() {
	// WebHelp.undockTab() // строка из index.html
	alert(`(i) Функция открепить вкладку, пока что в разработке`);
}

function topicTab() {
	// WebHelp.activePage = WebHelp.currentPage; // строка из index.html (235)
	// alert(`(i) Функция перейти на вкладку «Текущая вкладка» пока что в разработке`);
	let elemTab = document.getElementById('idTopicTab');
	elemTab.activePage = elemTab.currentPage;
}

function keywordsTab() {
	// WebHelp.activePage ='index'; // строка из index.html (240)
	// alert(`(i) Функция перейти на вкладку «Ключевые слова» пока что в разработке`);

	let elemTab = document.getElementById('idIndexTab');
	elemTab.activePage = 'index';
}

function searchTab() {
	// WebHelp.activePage='search'; // строка из index.html (246)
	alert(`(i) Функция перейти на вкладку «Поиск» пока что в разработке`);
	let elemTab = document.getElementById('idSearchTab');
	elemTab.activePage = 'search';
}

// *******************************************
// см.файл comments.js
function showComments() {
	// строка из файла esdbssGlavbyx.htm (87)
	alert(`(i) Функция покать комментарии пока что в разработке`);
}

// function writeCommentLink(params) {}

// *************************************************
// Элементы в топике контента - файл index.html
// Версия редакций инструкций - открытие в новом окне браузера
function manualVersion() {
	{
		// let features = 'toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=yes,width=900,height=700';
		// let features = 'left=100,top=100,width=350,height=250,menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
		let features = 'width=350,height=300,left='+((screen.width-500)/2)+',top='+((screen.height-500)/2)+',menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
		// window.open("","","width=250,height=250"); /* пример открытия пустого окна */
		window.open('manualVersion.htm', "", features);
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