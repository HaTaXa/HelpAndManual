/*
Взято из файла hmcontent.htm, скрипты прописаны внутри страницы в хедере
*/

/*! Table of contents init functions for HM Premium Pack Version 2.71 Copyright (c) 2008-2015 by Tim Green All rights reserved. */
function nshResize(test) {
	var bodyTop = $("div#idTocHeader").outerHeight() + 15;
	var bodyBottom = $("div#idTocFooter").outerHeight() + 5;
	$("div#idTocBody")
		.css("top", bodyTop + "px")
		.css("bottom", bodyBottom + "px");
	if (test) $("span#idOperaBug").html("bloop").hide();
}
function tocScroller(target) {
	if (target.lastIndexOf("/") > -1) {
		target = target.substr(target.lastIndexOf("/") + 1);
	}
	if (target.lastIndexOf("#") > -1) {
		target = target.substr(0, target.lastIndexOf("#"));
	}
	if (target.lastIndexOf("?") > -1) {
		target = target.substr(0, target.lastIndexOf("?"));
	}
	var scrollTarget = $("a[href*='" + target + "']");
	var scrollTimer = setInterval(function () {
		if ($(scrollTarget).is(":visible")) {
			$("div#idTocBody").scrollTo(scrollTarget, 400, {
				offset: { top: -10, left: 0 },
				onAfter:
					// Necessary for poor retarded Internet Explorer...
					function () {
						if ($(scrollTarget).position().top > $("#idTocBody").height())
							$("div#idTocBody").scrollTo(scrollTarget, 400, {
								offset: { top: -10, left: 0 },
							});
					},
			});
			clearInterval(scrollTimer);
			if ($(scrollTarget).position().top > $("#idTocBody").height());
		}
	}, 100);
}

$(document).ready(function () {
	$(".no-js-title").hide();
	$(".nav-subtitle").show();
	var tocExtLinks = false;
	// Cachefix
	$("a[target='hmcontent']").bind("click", function (event) {
		event.preventDefault();
		window.parent.document.getElementById(
			"hmcontent"
		).src = window.parent.hmCacheFix.getTarget($(this).attr("href"));
	});

	// Manage external files in TOC and tabs
	if (tocExtLinks) {
		var topicExtn = parent.WebHelp.textn;
		topicExtn = topicExtn.replace(".", "");
		var $filelinks = $("a[target='hmcontent']").not(
			"[href^='http'], [href$='" + topicExtn + "']"
		);
		var $weblinks = $("a[target='hmcontent']").filter("[href^='http']");
		$.merge($filelinks, $weblinks);
		$filelinks.each(function () {
			$(this).click(function () {
				var caption = $(this).children("span").text();
				$("a#idTopicTabLink", parent.document).html(
					"<span>" + caption + "</span>"
				);
				parent.WebHelp.external = $(this).attr("href");
			});
		});
	} // TOC external links

	nshResize(false);
	$(window).bind("resize", function () {
		nshResize(true);
	});

	// Scroll down to default topic or URL-targeted topic
	tocScroller(parent.hmnavpages.def);
});

// ***************************************

var parentScope = parent.hmNavigationFrame;
if (!parentScope) {
	var s = document.createElement("script");
	s.setAttribute("type", "text/javascript");
	s.setAttribute("src", "js/helpman_navigation.js");
	document.getElementsByTagName("head")[0].appendChild(s);
} else {
	if (initialtocstate != "expandall")
		parent.hmAddCss(document, "#idToc li ul { display: none }");
}
function loadicons() {
	var icons = new Array();
	for (i = 0; i < arguments.length; i++) {
		icons[i] = new Image();
		icons[i].src = arguments[i];
	}
}
function loadtoc() {
	if (parentScope) parent.loadstate(document.getElementById("idToc"));
	else loadstate(document.getElementById("idToc"));
}
function savetoc() {
	if (parentScope) parent.savestate(document.getElementById("idToc"));
	else savestate(document.getElementById("idToc"));
}
function clicked(node, event) {
	deselect();
	if (parentScope) parent.hmNodeClicked(node, event);
	else hmNodeClicked(node, event);
}
function dblclicked(node) {
	if (parentScope) parent.hmNodeDblclicked(node);
	else hmNodeDblclicked(node);
}
function deselect() {
	if (window.getSelection) window.getSelection().removeAllRanges();
	else if (document.selection) document.selection.empty();
}
$(document).ready(function () {
	loadtoc();
	$(window).onunload = savetoc;
});