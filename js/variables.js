// (i) Configuration Variables - Конфигурации переменных

// (!) General topic variables
var hmtopicvars = {
	indexP: "index.html",
	homeP: "esd_bss_glavbyx.html",
	prevP: "",
	currP: "esd_bss_glavbyx.html",
	nextP: "standartNPAbssGlavbyx.html",
	titleP: "ЕСД БСС «Главбух»",
	btnExpand: "idExpandOn",
	keys: "HaTaXa",
	msgBox: "enable", // "disable",
	msgBtn: true,
	msgText: "Текст инструкций принадлежит правообладателю.",
}
// (!) Navigation pages
var hmnavpages = {
	toc: "navigation.html",
	kwd: "keywords.html",
	sch: "search.html",
	top: "index.html",
	def: "esd_bss_glavbyx.html",
	breadCrumbs: [],
	query: window.location.search.substring(1).replace(/:/g, ""),
	hash: window.location.hash,
	cachefix: 30,
	userReload: false && window.location.search == "" && window.location.hash == "",
}
// (!) Permalink function
var hmpermalink = {
	url: "http://www.1gl.ru/",
	copyInfo: "(i) Ссылка успешно скопирована в буфер обмена.",
	copyError: "(!) Не удалось скопировать ссылку в буфер обмена. Скопируйте ссылку стандартным способом вручную. Чтобы скопировать ссылку, выделите ее и нажмите сочетание клавиш Ctrl+C или Ctrl+Insert.",
	bookmarkInfo: "(i) Закладка создана успешно.",
	bookmarkError: "(!) Не удалось создать закладку. Сделайте это стандартным способом вручную. Для добавления страницы в закладки нажмите сочетание клавиш Ctrl+D.",
}
// (!) Feedback addresses
var hmfb = {
	mailrecipient: "user231082@gmail.com",
	simplerecipient: "solanina@yandex.ru",
}
// (!) Weblinks
var hmweblinks = {
	website: "http://www.1gl.ru/",
	websitecompany: "https://www.action-mcfr.ru/",
	email: "region@action-media.ru",
}
var lastSearch = ""; // (!) Storage variable for last search arg - Переменная памяти для последнего поиска