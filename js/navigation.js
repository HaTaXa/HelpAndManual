// document.addEventListener('DOMContentLoaded', function(){} // - js. Дожидаемся, когда Объектная модель документа страницы (DOM) будет готова к выполнению кода JavaScript
//window.onload = function () {} // - js. Сработает, как только вся страница (изображения или встроенные фреймы), а не только DOM, будет готово
// $(window).load(function () {} // - jq
$(document).ready(function () { // - jq
	// (!) document.addEventListener('click')
	document.addEventListener('click', function (e) {
		if (e.target.tagName === "INPUT" && e.target.type === 'checkbox') {
			if (e.target.id === "idTocListMenuSwitch") {
				setListExpandCollapse(e.target);
			}
		} else if (e.target.tagName === "SPAN") {
			treeviewListSwitch(e.target);
		}
	});
}); // Ready end
// i Взято из файла hmcontent.htm, скрипты прописаны внутри страницы в хедере
// *Table of contents init functions - Содержание Функции инициализации
// X function nshResize
// function nshResize(test) {
// 	let bodyTop = $("div#idTocHeader").outerHeight() + 15;
// 	let bodyBottom = $("div#idTocFooter").outerHeight() + 5;
// 	$("div#idTocBody")
// 		.css("top", bodyTop + "px")
// 		.css("bottom", bodyBottom + "px");
// 	if (test) $("span#idOperaBug").html("bloop").hide();
// }
// X function tocScroller
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
// 					// Necessary for poor retarded Internet Explorer... - Необходимо для бедного отсталого Internet Explorer...
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
// 	// Cachefix - Исправление кэша
// 	$("a[target='hmcontent']").bind("click", function (event) {
// 		event.preventDefault();
// 		window.parent.document.getElementById(
// 			"hmcontent"
// 		).src = window.parent.hmCacheFix.getTarget($(this).attr("href"));
// 	});
// 	// Manage external files in TOC and tabs - Управление внешними файлами в TOC и вкладках
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
// 	} // TOC external links - Внешние ссылки TOC

// 	nshResize(false);
// 	$(window).bind("resize", function () {
// 		nshResize(true);
// 	});

// 	tocScroller(parent.hmnavpages.def); // Scroll down to default topic or URL-targeted topic - Прокрутить вниз до темы по умолчанию или темы, ориентированной на URL-адрес
// });
// ******************************************
// BUG: i браузер ругается на небезопасность политики одинакового происхождения
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
/* -
 X hmNavigationFrame
i взято из файла helpman_navigation.js */
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
// X hmNodeDblclicked
// function hmNodeDblclicked(node) {
// 	thisID = node.id;
// 	toggle("ul" + thisID.substring(1, thisID.length));
// }// i взято из файла helpman_navigation.js
// X loadicons
// function loadicons() {
// 	let icons = new Array();
// 	for (i = 0; i < arguments.length; i++) {
// 		icons[i] = new Image();
// 		icons[i].src = arguments[i];
// 	}
// }
// X loadtoc
// function loadtoc() {
// 	if (parentScope) parent.loadstate(document.getElementById("idToc"));
// 	else loadstate(document.getElementById("idToc"));
// }
// X savetoc
// function savetoc() {
// 	if (parentScope) parent.savestate(document.getElementById("idToc"));
// 	else savestate(document.getElementById("idToc"));
// }
// X clicked
// function clicked(node, event) {
// 	deselect();
// 	if (parentScope) parent.hmNodeClicked(node, event);
// 	else hmNodeClicked(node, event);
// }
// (!) setListExpand-развернуть все оглавление
function setListExpand () {
	// let ulFirstLevel = document.querySelector('ul:first-child'); // - ul самый 1-ый родитель - предок всех потомков
	// let list = document.querySelectorAll('ul:not(:first-child)'); // - ul все предки, кроме 1-го
	let list = document.querySelectorAll('ul'); // - ul все предки
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
// (!) setListCollapse-свернуть все оглавление
function setListCollapse () {
	let list = document.querySelectorAll('ul'); // - ul все предки
	for (let ul of list) {
		if (ul.hasAttribute("class")) {
			if (ul.classList.contains('icon-collapse')) {
				ul.classList.remove('icon-collapse');
				ul.classList.add('icon-expand');
			}
		}
		if (ul.id !== "idToc-ul") {
			if (ul.style.display !== "none") { ul.style.display = "none"; }
		}
	}
}
// (!) setListExpandCollapse-переключатель развернуть/свернуть все оглавление
function setListExpandCollapse (elem) {
	let idNavIcon = document.getElementById('idNavIcon');

	if (elem.checked) {
		setListExpand(); // Развернуть все оглавление
		// $('.nav-icon').attr('src', 'image/nav-pane-collapse.png'); // jq
		// document.querySelector('.nav-icon').setAttribute('src', 'image/nav-pane-collapse.png'); // js
	} else {
		setListCollapse(); // Свернуть все оглавление
		// $('.nav-icon').attr('src', 'image/nav-pane-expand.png'); // jq
		// document.querySelector('.nav-icon').setAttribute('src', 'image/nav-pane-expand.png'); // js
	}
	if (idNavIcon.classList.contains('nav-icon')) { // - замена первоначальной иконки на иконки-переключатели
		// idNavIcon.classList.remove('nav-icon');
		// idNavIcon.classList.add('nav-icon-toggle');
		idNavIcon.classList.replace('nav-icon', 'nav-icon-toggle');
	}
}
// (!) setTreeViewListDefault-опция древовидный вид списка в режиме "По умолчанию":
// i в древовидном виде списка скрытие/отображение будет применительно ко всем пунктам оглавления
// *jq/jQuery
function setTreeViewListDefault (elem) {
	if (elem.tagName !== "SPAN") return; // 'короткая запись if, если кликнули вне тега span
	// console.log(`elem.id: ${elem.id}`);
	// ! Предки - родительские узлы элементов:
	// let ulParents = $(elem).parents('ul'); // - все родительские узлы по селектору, вложенные по цепочке вверх
	let ulParent = $(elem).parents().eq(2); // - текущий узел предка - ul, на кот.кликнули
	// ! Потомки - дети:
	// let ulChildren = $(elem).parents('li').eq(0).children(); // - все узлы потомков по селектору предка li, внутри кот.находятся: а-шка и вложенные ul-ки
	// let ulChildren = $(elem).parents('li').children('ul'); // - узлы потомков по селектору по цепочке вверх
	// ! Узлы потомков по селектору:
	// let ulChildren = $(elem).parents('li').eq(0).children('ul'); // - вариант 1. Смотрим потомков через селектор li предка
	let ulChildren = $(elem).parents().eq(1).children('ul'); // - вариант 2
	// let ulChildren = $(ulParent[0]).children('li').children('ul'); // - вариант 3
	// ! Потомки текущего потомка - вложенность цепочки во внутрь
	let ulChildrensChildren = $(ulChildren).children('ul');

	if (ulChildren.length == 0) return; // 'короткая запись if, если нет вложенных детей
	// *если есть атрибут "класс" меняем иконку «+/-» текущего предка и отображаем/скрываем: потомков и потомков от потомков
	if (($(ulParent).attr('class') !== false) || (typeof ($(ulParent).attr('class')) !== "undefined")) {
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
// (!) setTreeViewListCurrent-опция древовидный вид списка в режиме "Текущий пункт":
// i в древовидном виде списка будет скрытие всех разделов/подразделов, кроме выбранного пункта оглавления
function setTreeViewListCurrent (elem) {
	if (elem.tagName !== "SPAN") return; // 'короткая запись if, если кликнули вне тега span
	// ! Предки - родительские узлы элементов:
	// x let ulAllParents = document.querySelectorAll('ul'); // - ul узлы всех предков
	let ulParents = $(elem).parents('ul'); // - все родительские узлы по селектору, вложенные по цепочке вверх
	let ulParent = $(elem).parents().eq(2); // - текущий узел предка - ul, на кот.кликнули
	// ! Потомки - дети:
	// let ulChildren = $(elem).parents('li').eq(0).children(); // - все узлы потомков по селектору предка li, внутри кот.находятся: а-шка и вложенные ul-ки
	// let ulChildren = $(elem).parents('li').children('ul'); // - все узлы потомков по селектору по цепочке вверх
	// ! Узлы потомков по селектору:
	// let ulChildren = $(elem).parents('li').eq(0).children('ul'); // - вариант 1. Смотрим потомков через селектор li предка
	let ulChildren = $(elem).parents().eq(1).children('ul'); // - вариант 2
	if (ulChildren.length == 0) { // - если вложенных детей ul нет, проверяем наличие ul среди детей li текущего предка
		ulChildren = $(ulParent).children('ul');
		// X let ulChildrensChildren = $(ulChildren).children().children('ul'); // в противном случае вернет "0" вместо "undefined"
	}
	// ! Потомки текущего потомка - вложенность цепочки во внутрь
	let ulChildrensChildren = $(ulChildren).children('ul'); // в противном случае вернет "0" вместо "undefined"
	/*
	! Соседи:
	i набор всех соседних узлов (тех, которые имеют того же родителя что и текущий) по селектору, вложенных по цепочке вверх */
	let ulSiblings = $(elem).parents('ul').siblings('ul'); // - в противном случае вернет "0" вместо "undefined"
	// *запоминаем имя текущего класса предка для переключения возможности скрыть/показать текущий пункт списка оглавления
	let className;
	for (let i = 0; i < ulParent[0].classList.length; i++) {
		if ((ulParent[0].classList[i] == "icon-expand") || (ulParent[0].classList[i] == "icon-collapse")) {
			className = ulParent[0].classList[i];
			break;
		}
	}
	// запоминаем имя текущего класса предка для переключения возможности скрыть/показать текущий пункт списка оглавления
	setListCollapse(); // - сворачиваем все оглавление
	// *Отображаем все соседние узлы, вложенные по цепочке вверх
	if (ulSiblings.length > 0) {
		for (let i = 0; i < ulSiblings.length; i++) {
			if ($(ulSiblings[i]).css(`display`) == "none") {
				$(ulSiblings[i]).removeAttr('style');
			}
		}
	}
	// *Отображаем всех потомков текущего потомка
	if (ulChildrensChildren.length > 0) {
		for (let i = 0; i < ulChildrensChildren.length; i++) {
			if ($(ulChildrensChildren[i]).css(`display`) == "none") {
				$(ulChildrensChildren[i]).removeAttr('style');
			}
		}
	}
	// *Отображаем/скрываем всех потомков
	if (ulChildren.length > 0) {
		if (className == "icon-collapse") {
			for (let i = 0; i < ulChildren.length; i++) {
				if ($(ulChildren[i]).css(`display`) !== "none") {
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
	// *Отображаем все родительские узлы, вложенные по цепочке вверх с учетом текущего родителя, для кот.предусмотрена возможность скрывать/отображать список
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
// (!) treeviewListSwitch-переключатель опций с режимами Default/Current для списка оглавления в пан.нав.
function treeviewListSwitch (elem) {
	if (elem.tagName !== "SPAN") return; // 'короткая запись if, если кликнули вне тега span
	let inputCheckboxNode = document.getElementById('idTreeView');
	if ((typeof(inputCheckboxNode) !== "undefined") && (typeof(inputCheckboxNode) === "object") && inputCheckboxNode !== null) {
		if (inputCheckboxNode.checked) {
			setTreeViewListCurrent(elem);
		} else {
			setTreeViewListDefault(elem);
		}
	} else { // *код оставлен для варианта классический
		if (elem.tagName !== "INPUT") return; // 'короткая запись if, если кликнули вне тега input
		let inputRadioNodes = document.getElementsByTagName('INPUT');
		if (inputRadioNodes.length > 0) {
			for (let r = 0; r < inputRadioNodes.length; r++) {
				if (inputRadioNodes[r].checked) {
					switch (inputRadioNodes[r].id) {
						case 'idTreeViewListDefault':
							setTreeViewListDefault(elem);
							return;
						case 'idTreeViewListCurrent':
							setTreeViewListCurrent(elem);
							return;
						default:
							console.error(`(i) inputRadioNodes[r].id: ${inputRadioNodes[r].id}`);
							alert(`(i) Опция режим древовидного вида списка не найдена.\nНастройка будет работать в режиме "По умолчанию".`);
							setTreeViewListDefault(elem);
							return;
					}
				}
			}
		} else {
			console.error(`(i) inputRadioNodes.length: ${inputRadioNodes.length}`);
			alert(`(i) Опция режим древовидного вида списка не найдена.\n Настройка будет работать в режиме "Текущий список".`);
		}
	}
}
// X dblclicked
// function dblclicked (node) {
// 	if (parentScope) parent.hmNodeDblclicked(node);
// 	else hmNodeDblclicked(node);
// }
// X deselect
// function deselect() {
// 	if (window.getSelection) window.getSelection().removeAllRanges();
// 	else if (document.selection) document.selection.empty();
// }
// X loadtoc & savetoc
// $(document).ready(function () {
// 	loadtoc();
// 	$(window).onunload = savetoc;
// });