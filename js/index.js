// HM WebHelp Configuration Variables

// Layout control variables
var hmLayout = {
	// Show/hide speed for banner header
	bannerSpeed: 250
	// Permalink option in toolbar
	// permalink: true
}

// Permalink function
var hmpldata = {
	show: true,
	auto: true,
	copy: "Скопируйте постоянную ссылку на актуальную тему",
	hurl: "http://www.1gl.ru/",
	sorry: "К сожалению, ваш браузер не может добавить в закладки страницу с помощью этой функции. Щелкните правой кнопкой мыши, чтобы скопировать постоянную ссылку, затем нажмите сочетание клавиш Ctrl+D, чтобы добавить в закладки тему с скопированной ссылки.",
	noserver: "Сервер не отвечает. Кликните правой кнопкой мыши на выбранной ниже ссылке для копирования.",
	manualcopy: "В Вашей конфигурации браузера не поддерживается функция Auto-Copy. Кликните правой кнопкой мыши на постоянную ссылку скопировать.",
	select: "Скопировать",
	bookmark: "В закладки",
	close: "Закрыть",
	copied: "Постоянная ссылка скопирована в буфер обмена:",
	title: "Постоянная ссылка"
}

// Navigation pages
var hmnavpages = {
	toc: "hmcontent.htm",
	tocWidth: 275,
	idx: "hmkwindex.htm",
	sch: "hmftsearch.htm",
	top: "index.html",
	def: "esdbssGlavbyx.htm",
	query: window.location.search.substring(1).replace(/:/g,""),
	hash: window.location.hash,
	cachefix: 30,
	autoTabs: "<%AUTO_TABS%>",
	fb_unicode: true,
	userReload: false && window.location.search == "" && window.location.hash == "",
	checkChrome: true,
	printHL: true,
	share: false,
	banneroff: true,
	loadCount: 0,
	mainWindowName: "",
	isEWriter: false
}

// Mobile device redirects
var mobRe = {
	smart: "",
	ipad: ""
}

// General messages
var hminfo = {
	tabopen: "Эта тема уже открыта в дополнительной вкладке!",
	tabclose: "Закрыть эту вкладку",
	noundock: "Нельзя откреплять вкладку «Главная»!",
	webfile: "Веб-Файл",
	hidenav: "Скрыть содержимое панели",
	shownav: "Показать содержимое панели",
 	currtopic: "Актуальная Тема"
}

// Feedback addresses
var hmfb = {
	mailrecipient: "user231082@gmail.com",
	simplerecipient: "solanina@yandex.ru"
}

// Storage variable for last search arg
lastSearch = "";