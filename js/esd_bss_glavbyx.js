/*
Взято из хедера файла, на кот.делается переадресация с главной стр.index.html
*/

// General topic variables
var tVars = {
	hmHelpPage: "index.html",
	nextP: "standart_npa_bss_glavbyx.htm",
	prevP: "",
	currP: "esd_bss_glavbyx.htm",
	descr: "",
	keys: "HaTaXa",
	defP: "esd_bss_glavbyx.htm",
	mailUrl: "",
	mailUrlQuery: "",
	projectTitle: "ЕСД БСС «Главбух»",
	titleP: "ЕСД БСС «Главбух»",
	mailsubject: "Отзывы на: ЕСД БСС «Главбух»",
	sharesubject: "ЕСД БСС «Главбух»",
	simplesubject: "Тема письма???",
	mailid: "esd_bss_glavbyx",
	mailpath: "ЕСД БСС «Главбух» /",
	mailbody: "Введите сюда текст Вашего письма",
	fbtype: false,
	header: true,
	background: "bg_body.jpeg",
	/* background: "blackpaisley.jpeg", */
	tablesReady: false,
	togglesReady: false,
	webRedirect: true,
	topicTitleBar: true,
	titleBarContent: "тема",
	printFooter: true,
	zoomTip: "Нажмите, чтобы посмотреть изображение в полном размере",
	autoPrint: true,
	printButton: "Печать",
	printButtonTip: "Распечатать текущую тему"
}
// Popup configuration
var hmpBShadow = true;
var hmPopSmallDim = 500;
var hmPopKillVideo = true;
// AutoTOC variables
var hmatocvars = {
	atoc_show: true,
	atoc_title: "Содержание",
	atoc_tip: "Перейти к:&nbsp;",
	atoc_minHeaders: 3,
	atoc_btntip_off: "На этой странице отсутствует содержание записей",
	atoc_btntip_on: "Отобразить/скрыть раздел каталога",
	atoc_toptip: "Перейти к началу страницы",
	atoc_top: "Наверх страницы",
	atoc_bg: "#f6f6f6",
	atoc_border: "#c0c0c0",
	atoc_linkcolor: "#444",
	atoc_linklimit: 45,
	atoc_hovercolor: "#000",
	atoc_hoverbgcolor: "#e0e0e0"
}
// Sortable tables
var sortVars = {
	europeandate: false,
	germanNumbers: false,
	imagePath: "",
	image_up: "arrow-up.gif",
	image_down: "arrow-down.gif",
	image_empty: "arrow-empty.gif",
	image_none: "arrow-none.gif",
	sort_tip: "Нажмите для сортировки по этой колонке",
	umlauts: "false"
}

var disqus_developer = 0;
var idcomments_acct, idcomments_post_id, idcomments_post_url, idcomments_post_title;
var disqus_shortname = idcomments_acct = '';
var disqus_identifier = idcomments_post_id = 'index';
var disqus_url = idcomments_post_url = 'http://www.1gl.ru';
var disqus_title = idcomments_post_title = "ЕСД БСС «Главбух»";
var comments_type = "";
var comments_link = "Комментарии";
var comments_offline = "Комментарии сервер работает в автономном режиме";
var comments_showtip = "Просмотр и добавление комментариев";
var comments_path = "http://www.1gl.ru/";
var comments_type = "";
var comments_link = "Комментарии";
var comments_offline = "Комментарии сервер работает в автономном режиме";
var comments_pages = "Страницы";