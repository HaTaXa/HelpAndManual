// // document.addEventListener('DOMContentLoaded', function(){ // - jQuery. Дожидаемся, когда Объектная модель документа страницы (DOM) будет готова к выполнению кода JavaScript
// $(document).ready(function () { // - jq
// 	// window.onload = function () { // - jQuery. Сработает, как только вся страница (изображения или встроенные фреймы), а не только DOM, будет готова
// 	// // $(window).load(function () { // - jq
// 		// (i) Отображение выбранного пункта оглавления и скрытие других пунктов
// 		// if ('li' != null) {
// 			// *событие 2-ой клик для ul

// 			// $('li').click(function (e) {
// 			$("ul").dblclick(function() { // (i) задаем функцию при двойном клике на элементе
// 				// let parentId = $(e).parent().attr('id');
// 				// // let parentId = $(`li`).parent().attr('id');
// 				// console.log(`parentId: ${parentId}`);
// 				$('ul').toggleClass("icon-expand icon-collapse");

// 				// e.preventDefault(); // (i) отмена действия браузера по умолчанию
// 				// return false; // (i) эквивалентная запись отмены действия браузера по умолчанию
// 				// e.preventDefault ? e.preventDefault() : (e.returnValue = false) // (i) сокращенная кроссбраузерная запись остановки события

// 				// let stepList = $('.icon-collapse');// Ищем все элементы, получаем список элементов
// 				// 	stepList.each(function() {// Проходим по каждому элементу циклом
// 				// 	let current = $(this);// Получаем текущий элемент в цикле
// 				// 	$(current).toggleClass("icon-expand icon-collapse");
// 				// 	console.log(current);
// 				// });

// 				// let elem = document.querySelector('ul');
// 				// console.log(elem);
// 				// $(elem).toggleClass("icon-expand icon-collapse");
// 				// if ($(elem).css('display', 'none')) {
// 				// 	$(elem).css('display', 'block');
// 				// }
// 				// else if ($(elem).css('display', 'block')) {
// 				// 	$(elem).css('display', 'none');
// 				// }

// 				// let elems = document.querySelectorAll('ul');
// 				// // let ul = document.querySelector('ul'); // 'это не текущая ul, на кот.кликнули, это первый найденный селектор ul на странице.
// 				// // console.log(ul.id);
// 				// // let ul = document.querySelectorAll('ul > li:first-child');
// 				// // когда кликаем 1-ю ul везде должны быть "+", кроме нее и ее первый ребенок ul должна отобразиться
// 				// // $(ul).on('click', function () {
// 				// 	// for (let elem of elems) {
// 				// 	for (let i = 0; i < elems.length; i++) {
// 				// 		if (elems[i].id == "idToc") {
// 				// 			console.log('display, block: ' + elem[i].id);
// 				// 			// $(elems[i]).addClass('icon-collapse').removeClass('icon-expand');
// 				// 			$(elems[i]).css('display', 'block');
// 				// 			$(elems[i]).toggleClass("icon-expand icon-collapse");
// 				// 			//
// 				// 			// $(elem.querySelector('ul')).css('display', 'block');
// 				// 			// $(elem.querySelector('ul')).toggleClass("icon-expand icon-collapse");
// 				// 			// console.log(elem.querySelector('ul'));
// 				// 		}
// 				// 		else {
// 				// 			console.log('display, none: ' + elems[i].id);
// 				// 			$(elems[i]).css('display', 'none');
// 				// 			$(elems[i]).toggleClass("icon-expand icon-collapse");
// 				// 		};
// 				// 	};
// 				// // });

// 				// else {
// 				// 	console.log(`ul != idToc`);
// 				// 	$('ul#idToc').addClass('icon-collapse').removeClass('icon-expand');
// 				// 	$(ul).css('display', 'block'); // текущей ul раскрываем
// 				// 	$(ul).addClass('icon-collapse').removeClass('icon-expand');
// 				// };

// 				// $(".dropdown > ul li").each(function(){
// 				// 	let txt = $(this).text();
// 				// 	console.log(txt);
// 				// });

// 				// let elemChildrens = document.querySelector("ul").children;
// 				// if (elemChildrens != null) {
// 				// 	for (let i = 0, child; child = elemChildrens[i]; i++) {
// 				// 		// elemChildrens - коллекция детей списка
// 				// 		// child - последовательно, каждый из элементов elemChildrens
// 				// 		alert(child.getAttribute('id'));
// 				// 	}
// 				// }

// 				// $("ul#ul1").toggleClass("icon-expand icon-collapse");
// 				// // $("a").toggleClass("list-hide list-show");
// 				// // alert(`(i) Функция отображения текущего оглавления и скрытие другого, пока что в разработке.`);
// 				// $('ul#idToc').css('display', 'block');
// 				// $('li#idToc_li').css('display', 'block');

// 				// $('ul#ul1').css('display', 'block');
// 				// // $('li#ul1').css('display', 'block');
// 			});
// 		// };
// 	// });
// });
// (i) Взято из файла hmcontent.htm, скрипты прописаны внутри страницы в хедере
// ! Table of contents init functions - Содержание Функции инициализации

// function nshResize(test) {
// 	let bodyTop = $("div#idTocHeader").outerHeight() + 15;
// 	let bodyBottom = $("div#idTocFooter").outerHeight() + 5;
// 	$("div#idTocBody")
// 		.css("top", bodyTop + "px")
// 		.css("bottom", bodyBottom + "px");
// 	if (test) $("span#idOperaBug").html("bloop").hide();
// }
// function tocScroller(target) {
// 	if (target.lastIndexOf("/") > -1) {
// 		target = target.substr(target.lastIndexOf("/") + 1);
// 	}
// 	if (target.lastIndexOf("#") > -1) {
// 		target = target.substr(0, target.lastIndexOf("#"));
// 	}
// 	if (target.lastIndexOf("?") > -1) {
// 		target = target.substr(0, target.lastIndexOf("?"));
// 	}
// 	let scrollTarget = $("a[href*='" + target + "']");
// 	let scrollTimer = setInterval(function () {
// 		if ($(scrollTarget).is(":visible")) {
// 			$("div#idTocBody").scrollTo(scrollTarget, 400, {
// 				offset: { top: -10, left: 0 },
// 				onAfter:
// 					// - Necessary for poor retarded Internet Explorer... - Необходимо для бедного отсталого Internet Explorer...
// 					function () {
// 						if ($(scrollTarget).position().top > $("#idTocBody").height())
// 							$("div#idTocBody").scrollTo(scrollTarget, 400, {
// 								offset: { top: -10, left: 0 },
// 							});
// 					},
// 			});
// 			clearInterval(scrollTimer);
// 			if ($(scrollTarget).position().top > $("#idTocBody").height());
// 		}
// 	}, 100);
// }

// $(document).ready(function () {
// 	$(".no-js-title").hide();
// 	$(".nav-subtitle").show();
// 	let tocExtLinks = false;
// 	// - Cachefix - Исправление кэша
// 	$("a[target='hmcontent']").bind("click", function (event) {
// 		event.preventDefault();
// 		window.parent.document.getElementById(
// 			"hmcontent"
// 		).src = window.parent.hmCacheFix.getTarget($(this).attr("href"));
// 	});
// 	// - Manage external files in TOC and tabs - Управление внешними файлами в TOC и вкладках
// 	if (tocExtLinks) {
// 		let topicExtn = parent.WebHelp.textn;
// 		topicExtn = topicExtn.replace(".", "");
// 		let $filelinks = $("a[target='hmcontent']").not(
// 			"[href^='http'], [href$='" + topicExtn + "']"
// 		);
// 		let $weblinks = $("a[target='hmcontent']").filter("[href^='http']");
// 		$.merge($filelinks, $weblinks);
// 		$filelinks.each(function () {
// 			$(this).click(function () {
// 				let caption = $(this).children("span").text();
// 				$("a#idTopicTabLink", parent.document).html(
// 					"<span>" + caption + "</span>"
// 				);
// 				parent.WebHelp.external = $(this).attr("href");
// 			});
// 		});
// 	} // - TOC external links - Внешние ссылки TOC

// 	nshResize(false);
// 	$(window).bind("resize", function () {
// 		nshResize(true);
// 	});

// 	tocScroller(parent.hmnavpages.def); // - Scroll down to default topic or URL-targeted topic - Прокрутите вниз до темы по умолчанию или темы, ориентированной на URL-адрес
// });
// ******************************************
// BUG: браузер ругается на небезопасность политики одинакового происхождения
// // let parentScope = parent.hmNavigationFrame;
// let thisID = node.id;

// if (!parentScope) {
// 	let s = document.createElement("script");
// 	s.setAttribute("type", "text/javascript");
// 	s.setAttribute("src", "js/helpman_navigation.js");
// 	document.getElementsByTagName("head")[0].appendChild(s);
// } else {
// 	if (initialtocstate != "expandall")
// 		parent.hmAddCss(document, "#idToc li ul { display: none }");
// }
// (i) --> взято из файла helpman_navigation.js
// function hmNavigationFrame() {
// 	let actFrames = new Array(
// 		window.frames["hmnavigation"],
// 		window.frames["hmcontent"]
// 	);
// 	for (let i = 0; i < actFrames.length; i++) {
// 		if (actFrames[i].name == "hmnavigation") return actFrames[i];
// 	}
// 	return self;
// }
// function hmNodeDblclicked(node) {
// 	thisID = node.id;
// 	toggle("ul" + thisID.substring(1, thisID.length));
// }
// (i) <-- взято из файла helpman_navigation.js
// function loadicons() {
// 	let icons = new Array();
// 	for (i = 0; i < arguments.length; i++) {
// 		icons[i] = new Image();
// 		icons[i].src = arguments[i];
// 	}
// }
// function loadtoc() {
// 	if (parentScope) parent.loadstate(document.getElementById("idToc"));
// 	else loadstate(document.getElementById("idToc"));
// }
// function savetoc() {
// 	if (parentScope) parent.savestate(document.getElementById("idToc"));
// 	else savestate(document.getElementById("idToc"));
// }
// function clicked(node, event) {
// 	deselect();
// 	if (parentScope) parent.hmNodeClicked(node, event);
// 	else hmNodeClicked(node, event);
// }
// ! // FIX: function listExpand. Развернуть все оглавление
function listExpand () {
	// let ulFirstLevel = document.querySelector('ul:first-child'); // (i) ul самый 1-ый родитель - предок всех потомков
	// let list = document.querySelectorAll('ul:not(:first-child)'); // (i) ul все предки, кроме 1-го
	let list = document.querySelectorAll('ul'); // (i) ul все предки
	for (let ul of list) {
		if (ul.hasAttribute("class")) {
			if (ul.classList.contains('icon-expand')) {
				ul.classList.remove('icon-expand');
				ul.classList.add('icon-collapse');
			}
		}
		if (ul.style.display == "none") { ul.removeAttribute('style'); }
	}
}
// ! // FIX: function listCollapse. Свернуть все оглавление
function listCollapse () {
	let list = document.querySelectorAll('ul'); // (i) ul все предки
	for (let ul of list) {
		if (ul.hasAttribute("class")) {
			if (ul.classList.contains('icon-collapse')) {
				ul.classList.remove('icon-collapse');
				ul.classList.add('icon-expand');
			}
		}
		if (ul.id != "idToc-ul") {
			if (ul.style.display != "none") { ul.style.display = "none"; }
		}
	}
}
// ! // FIX: function allListExpandCollapse. Переключатель развернуть/свернуть все оглавление
function allListExpandCollapse (event) {
	let inputMenuListSwitch = document.getElementById('idTocListMenuSwitch');
	if (inputMenuListSwitch.checked) {
		listCollapse(); // Свернуть все оглавление
	} else {
		listExpand(); // Развернуть все оглавление
	}
	// (i) 1-ый вариант, когда не было checkbox
	// let firstLevel = document.querySelector('ul:first-child');
	// if (firstLevel.classList.contains('icon-expand')) {
	// 	listExpand();
	// 	$(event.target).attr('title', 'Свернуть все оглавление');
	// } else {
	// 	if (firstLevel.classList.contains('icon-collapse')) {
	// 		listCollapse();
	// 		$(event.target).attr('title', 'Развернуть все оглавление');
	// 	}
	// }
}
/*
! // FIX: function treeviewListDefault. Опция древовидный вид списка в режиме "По умолчанию" (переключатель): (i) в древовидном виде списка скрытие/отображение будет применительно ко всем пунктам оглавления
*jq/jQuery
*/
function treeviewListDefault (event) {
	if (event.target.tagName != 'SPAN') return; // (i) короткая запись if, если кликнули вне тега span
	// console.log(event);
	// console.log(`event.target.id: ${event.target.id}`);
	// ! Предки - родительские узлы элементов:
	// let ulParents = $(event.target).parents('ul'); // (i) все родительские узлы по селектору, вложенные по цепочке вверх
	let ulParent = $(event.target).parents().eq(2); // (i) текущий узел предка - ul, на кот.кликнули
	// ! Потомки - дети:
	// let ulChildren = $(event.target).parents('li').eq(0).children(); // (i) все узлы потомков по селектору предка li, внутри кот.находятся: а-шка и вложенные ul-ки
	// let ulChildren = $(event.target).parents('li').children('ul'); // (i) узлы потомков по селектору по цепочке вверх
	// (i) узлы потомков по селектору:
	// let ulChildren = $(event.target).parents('li').eq(0).children('ul'); // - вариант 1. Смотрим потомков через селектор li предка
	let ulChildren = $(event.target).parents().eq(1).children('ul'); // - вариант 2
	// let ulChildren = $(ulParent[0]).children('li').children('ul'); // - вариант 3
	// ! Потомки текущего потомка - вложенность цепочки во внутрь
	let ulChildrensChildren = $(ulChildren).children('ul');

	if (ulChildren.length == 0) return; // (i) короткая запись if, если нет вложенных детей
	if ($(ulParent).attr('class')) { // - если есть атрибут "класс" меняем иконку «+/-» текущего предка и отображаем/скрываем: потомков и потомков от потомков
		if ($(ulParent).hasClass('icon-expand')) {
			for (let i = 0; i < ulChildren.length; i++) {
				if ($(ulChildren[i]).css(`display`) == "none") {
					$(ulChildren[i]).removeAttr('style'); // - отображаем
				}
			}
			if (ulChildrensChildren.length > 0) {
				for (let i = 0; i < ulChildrensChildren.length; i++) {
					if ($(ulChildrensChildren[i]).css(`display`) == "none") {
						$(ulChildrensChildren[i]).removeAttr('style'); // - отображаем
					}
				}
			}
			$(ulParent).removeClass('icon-expand');
			$(ulParent).addClass('icon-collapse');
		}
		else if ($(ulParent).hasClass('icon-collapse')) {
			for (let i = 0; i < ulChildren.length; i++) {
				$(ulChildren[i]).css('display', 'none'); // - скрываем
			}
			if (ulChildrensChildren.length > 0) {
				for (let i = 0; i < ulChildrensChildren.length; i++) {
					$(ulChildrensChildren[i]).css('display', 'none'); // - скрываем
				}
			}
			$(ulParent).removeClass('icon-collapse');
			$(ulParent).addClass('icon-expand');
		}
	} else {
		for (let i = 0; i < ulChildren.length; i++) {
			if ($(ulChildren[i]).css(`display`) == "none") {
				$(ulChildren[i]).removeAttr('style'); // - отображаем
			} else {
				$(ulChildren[i]).css('display', 'none'); // - скрываем
			}
		}
		if (ulChildrensChildren.length > 0) {
			for (let i = 0; i < ulChildrensChildren.length; i++) {
				if ($(ulChildrensChildren[i]).css(`display`) == "none") {
					$(ulChildrensChildren[i]).removeAttr('style'); // - отображаем
				} else {
					$(ulChildrensChildren[i]).css('display', 'none'); // - скрываем
				}
			}
		}
	}
}
// ! // FIX: function treeviewListCurrent. Опция древовидный вид списка в режиме "Текущий пункт" (переключатель): (i) в древовидном виде списка будет скрытие всех разделов/подразделов, кроме выбранного пункта оглавления
function treeviewListCurrent (event) {
	if (event.target.tagName != 'SPAN') return; // (i) короткая запись if, если кликнули вне тега span
	// ! Предки - родительские узлы элементов:
	// xxx let ulAllParents = document.querySelectorAll('ul'); // (i) ul узлы всех предков
	let ulParents = $(event.target).parents('ul'); // (i) все родительские узлы по селектору, вложенные по цепочке вверх
	let ulParent = $(event.target).parents().eq(2); // (i) текущий узел предка - ul, на кот.кликнули
	// ! Потомки - дети:
	// let ulChildren = $(event.target).parents('li').eq(0).children(); // (i) все узлы потомков по селектору предка li, внутри кот.находятся: а-шка и вложенные ul-ки
	// let ulChildren = $(event.target).parents('li').children('ul'); // (i) все узлы потомков по селектору по цепочке вверх
	// (i) узлы потомков по селектору:
	// let ulChildren = $(event.target).parents('li').eq(0).children('ul'); // - вариант 1. Смотрим потомков через селектор li предка
	let ulChildren = $(event.target).parents().eq(1).children('ul'); // - вариант 2
	if (ulChildren.length == 0) { // (i) если вложенных детей ul нет, проверяем наличие ul среди детей li текущего предка
		ulChildren = $(ulParent).children('ul');
		// XXX let ulChildrensChildren = $(ulChildren).children().children('ul'); // в противном случае вернет "0" вместо "undefined"
	}
	// ! Потомки текущего потомка - вложенность цепочки во внутрь
	let ulChildrensChildren = $(ulChildren).children('ul'); // в противном случае вернет "0" вместо "undefined"
	// ! Соседи:
	// (i) набор всех соседних узлов (тех, которые имеют того же родителя что и текущий) по селектору, вложенных по цепочке вверх
	let ulSiblings = $(event.target).parents('ul').siblings('ul'); // в противном случае вернет "0" вместо "undefined"
	// (i) запоминаем имя текущего класса предка для переключения возможности скрыть/показать текущий пункт списка оглавления
	let className;
	for (let i = 0; i < ulParent[0].classList.length; i++) {
		if ((ulParent[0].classList[i] == "icon-expand") || (ulParent[0].classList[i] == "icon-collapse")) {
			className = ulParent[0].classList[i];
			break;
		}
	}// (i) запоминаем имя текущего класса предка для переключения возможности скрыть/показать текущий пункт списка оглавления
	listCollapse(); // - сворачиваем все оглавление
	// ! Отображаем все соседние узлы, вложенные по цепочке вверх
	if (ulSiblings.length > 0) {
		for (let i = 0; i < ulSiblings.length; i++) {
			if ($(ulSiblings[i]).css(`display`) == "none") {
				$(ulSiblings[i]).removeAttr('style');
			}
		}
	}
	// ! Отображаем всех потомков текущего потомка
	if (ulChildrensChildren.length > 0) {
		for (let i = 0; i < ulChildrensChildren.length; i++) {
			if ($(ulChildrensChildren[i]).css(`display`) == "none") {
				$(ulChildrensChildren[i]).removeAttr('style');
			}
		}
	}
	// ! Отображаем/скрываем всех потомков
	if (ulChildren.length > 0) {
		if (className == "icon-collapse") {
			for (let i = 0; i < ulChildren.length; i++) {
				if ($(ulChildren[i]).css(`display`) != "none") {
					$(ulChildren).attr(`display`, `none`);
				}
			}
		} else {
			for (let i = 0; i < ulChildren.length; i++) {
				if ($(ulChildren[i]).css(`display`) == "none") {
					$(ulChildren[i]).removeAttr('style');
				}
			}
		}
	}
	// ! Отображаем все родительские узлы, вложенные по цепочке вверх с учетом текущего родителя, для кот.предусмотрена возможность скрывать/отображать список
	for (let i = 0; i < ulParents.length; i++) {
		if ($(ulParents[i]).css(`display`) == "none") {
			$(ulParents[i]).removeAttr('style');
		}
		if (ulParents[i].id == ulParent[0].id) {
			// *проверяем наличие атрибута "класс"
			if (($(ulParents[i]).attr('class') !== false) || (typeof ($(ulParents[i]).attr('class')) !== "undefined")) {
				if (className == "icon-collapse") {
					if ($(ulParents[i]).hasClass('icon-collapse')) {
						$(ulParents[i]).removeClass('icon-collapse');
						$(ulParents[i]).addClass('icon-expand');
					}
				} else {
					if ($(ulParents[i]).hasClass('icon-expand')) {
						$(ulParents[i]).removeClass('icon-expand');
						$(ulParents[i]).addClass('icon-collapse');
					}
				}
			}
		} else {
			if ($(ulParents[i]).hasClass('icon-expand')) {
				$(ulParents[i]).removeClass('icon-expand');
				$(ulParents[i]).addClass('icon-collapse');
			}
		}
	}
}
// ! // FIX: function clicked. Скрыть/Показать раздел/подраздел оглавления в пан.нав.
function clicked (event) {
	if (event.target.tagName != 'SPAN') return; // (i) короткая запись if, если кликнули вне тега span
	let inputCheckboxNode = document.getElementById('idTreeView');
	if ((typeof(inputCheckboxNode) !== "undefined") && (typeof(inputCheckboxNode) === "object") && inputCheckboxNode !== null) {
		if (inputCheckboxNode.checked) {
			treeviewListCurrent(event);
			return;
		} else {
			treeviewListDefault(event);
			return;
		}
	} else {
		if (event.target.tagName != 'INPUT') return; // (i) короткая запись if, если кликнули вне тега input
		let inputRadioNodes = document.getElementsByTagName('INPUT');
		if (inputRadioNodes.length > 0) {
			for (let r = 0; r < inputRadioNodes.length; r++) {
				if (inputRadioNodes[r].checked) {
					switch (inputRadioNodes[r].id) {
						case 'idTreeViewListDefault':
							treeviewListDefault(event);
							return;
						case 'idTreeViewListCurrent':
							treeviewListCurrent(event);
							return;
						default:
							console.error(`(i) inputRadioNodes[r].id: ${inputRadioNodes[r].id}`);
							alert(`(i) Опция режим древовидного вида списка не найдена.\nНастройка будет работать в режиме "По умолчанию".`);
							treeviewListDefault(event);
							return;
					}
				}
			}
		} else {
			console.error(`(i) inputRadioNodes.length: ${inputRadioNodes.length}`);
			alert(`(i) Опция режим древовидного вида списка не найдена.\nНастройка будет работать в режиме "Текущий список".`);
		}
	}
}
// function dblclicked (node) {
// 	if (parentScope) parent.hmNodeDblclicked(node);
// 	else hmNodeDblclicked(node);
// }
// function deselect() {
// 	if (window.getSelection) window.getSelection().removeAllRanges();
// 	else if (document.selection) document.selection.empty();
// }
// $(document).ready(function () {
// 	loadtoc();
// 	$(window).onunload = savetoc;
// });