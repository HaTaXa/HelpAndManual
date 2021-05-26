/* Было в хеде файла hmkwindex.htm */

/*! Keyword index init functions for HM Premium Pack Version 2.71
Copyright (c) 2008-2015 by Tim Green
All rights reserved. */

var clicked = [],
	idxTMP = "",
	idxCount = 0,
	idxMin = 3 < 3 ? 3 : 3,
	idxSearchType = function(){return (document.getElementById("fullsearch").checked ? "" : document.getElementById("wordsearch").checked ? "\\b" : "^" )},
	currentMode = null,
	instantMode = null,
	Parent;
// Check for parent and reload UI if no parent
try {
	Parent = parent.window && parent.hmWebHelp ? parent.window : window.opener && window.opener.hmWebHelp ? window.opener : false;
	} catch(err) {
	Parent = false;
	document.location.replace("index.html");
	}

// Escape special regex characters in search terms
function rxFix(cString) {
	var testChrs = ["\\","^","$",".","|","?","*","+","(",")","[","{"],
	newString = "",
	testChr = "";

	for (var str = 0; str < cString.length; str++) {
		testChr = cString.charAt(str);
		for (var chr = 0; chr < testChrs.length; chr++ ) {
		if (testChr==testChrs[chr]) {
			testChr = "\\" + testChr;
			break;
		}
	}
	newString += testChr;
	}
	return newString;
}

// Scroll to index separator letter header
function gotoIndex(target) {
if ($(target).length > 0) {
	$("span.idxkeyword,span.idxkeyword2").css("backgroundColor","transparent");
	$("div#idxbody").scrollTo($(target), 400);
} else {
	alert("Не индексируюмые записи, начинающиеся с " + target.replace("#",""));
}
}
// Scroll to search term
function hmScrollToKey() {
	var pOffset = $("div#idxbody").height();
	var idx = $("#idxSearch").val();
	var rxIdx = new RegExp(idxSearchType() + rxFix(idx), "i");
	var idxSearch = $("span.idxkeyword,span.idxkeyword2").filter(function(){
		return (rxIdx.test($(this).text()));
	});
	if ($(idxSearch[idxCount]).offset() && idx != "") {
		var pos = $(idxSearch[idxCount]).offset();
		while (pos && pos.top < (pOffset + $("#idxSearch").scrollTop())) {
			idxCount++;
			pos = $(idxSearch[idxCount]).offset();
		}
		if ($(idxSearch[idxCount]).html() != null) {
		$("div#idxbody").scrollTo(idxSearch[idxCount],400,{offset: -10});
	}else
		// Reset search after last entry
		{
			idxCount = 0;
			// $("div#idxbody").scrollTo({top:'0px', left:'0px'}, 400);
			$("div#idxbody").scrollTo(idxSearch[idxCount],400,{offset: -10});
		}
	}
}
// Find and highlight search term
function hmFindKey() {
	var idx = $("#idxSearch").val();
	$("span.idxkeyword,span.idxkeyword2").css("backgroundColor","transparent");
	var rxIdx = new RegExp(idxSearchType() + rxFix(idx), "i");
	var idxSearch = $("span.idxkeyword,span.idxkeyword2").filter(function(){
		return (rxIdx.test($(this).text()));
	});
	var target = $(idxSearch)[0];
	if (idxSearch.length > 0 && idx.length > 0) {
		$(idxSearch).css("background-color","yellow");
		$("div#idxbody").scrollTo(target,400,{offset: -10});
	} else if (idx.length == 0) {
		$("div#idxbody").scrollTo({ top: '0px', left: '0px' }, 400);
	}
}
// Index tracking counter
function idxIncr(idx) {
	if ((idxTMP == idx) && (idx != "")) {
	idxCount++;
	} else {
		idxCount = 0;
		idxTMP = idx;
	}
}
// Search in index, container function
function indexSearch() {
	var lengthCheck = $("#idxSearch").val().length;
	if (lengthCheck < idxMin && lengthCheck > 0 && document.getElementById("instantsearch").checked) return;
	var idx = $("#idxSearch").val();
	idxIncr(idx);
	if (idx == "") hmFindKey();
	if (idxCount > 0 && idx != "") {
		hmScrollToKey();
	}
	else {
		hmFindKey();
	}
}
// Non-scrolling header in index
function nsHeader() {
	var headHeight = $("div#idxheader").outerHeight()+10;
	$("div#idxbody").css("top",headHeight+"px");
}
// Page init
$(document).ready(function() {
	// Script init
	$("div#hmidxheader").hide();
	$("div#idxbody").css("margin","5px 0px 2px 0px");
	$("div#idxheader").css("display","block");
	$("table.idxtable").css("position","absolute");
	nsHeader();
	$(window).bind("resize", function() {
		nsHeader();
		});
	// Disable Instant search?
	if (false) {
		$("input#instantsearch").attr("disabled","true").removeAttr("checked").parent("label").hide();
	}

	// Index window is undocked
	if (window.opener) {
		// Display tab box for undocked window
		$("ul.tabs").show();
		$("ul.tabs a").css("cursor","default");
		// $("body").css("background-color","#f1f1f1");
		$("div#hmbox").css("padding", "10px");

		// Match skin to main window
		$("link#tabscheme").attr("href","hm_webhelp_undocked.css");
		$("body,html").css("backgroundImage", "url('blackpaisley.jpeg')");

		// Poller to close undocked index window if main window closes, reloads or goes elsewhere
		var closeCheck = setInterval(function(){
			function closeIt() {clearInterval(closeCheck); window.close();}
			try { var windowsOpen = window.opener.hmWebHelp.openWindows.length;
				} catch(err) { closeIt();}
				if(!window.opener || windowsOpen < 1) {
					closeIt();
				}
		},500);
	} // End if window.opener

	// Scroll target topic into view when link is clicked, cachefix management, reload as indication if target topic is already loaded
	$("a[target='hmcontent']").on("click", function(event) {
		var target = $(this).attr("href"),
		targetTest = target.substr(0,target.indexOf("#")),
		Parent = parent.window && parent.hmWebHelp ? parent.window : window.opener && window.opener.hmWebHelp ? window.opener : false;

		if (Parent && Parent.hmnavpages.cachefix) {
			event.preventDefault();
			Parent.document.getElementById("hmcontent").src = Parent.hmCacheFix.getTarget(target);
		}
		if (Parent) {
			Parent.hmWebHelp.tocWin.tocScroller(target);
			if (targetTest == Parent.hmWebHelp.currentPage) {
				Parent.hmWebHelp.tabsapi.click(0);
			}
		}
	});

	// Listener for index search
	$("#idxSearch").keydown(function(event){
		var doInstant = document.getElementById("instantsearch").checked;
		if (event.keyCode == 13) {
			event.preventDefault();
			indexSearch();
		}
		else if (doInstant) {
			setTimeout(function(){indexSearch()},50);
		}
	});

	// Generic search reset function
	function resetSearch() {
		if ($("#idxSearch").val().length > 0) {
			$("#idxSearch").val("");
			indexSearch();
		}
	}

	// Reset search when any of the mode settings are changed
	$("input#startsearch, input#fullsearch, input#wordsearch, input#instantsearch").on("click",function(event){
		var thisButton = $(this).attr("id");
		isChecked = $(this)[0].checked;

		switch (thisButton) {
			case "instantsearch":
				if (isChecked !== instantMode)
					resetSearch();
				instantMode = isChecked;
			break;
			default:
				if ((isChecked && currentMode !== thisButton) || (!isChecked && currentMode === thisButton))
					resetSearch();
				currentMode = thisButton;
		}
	});

	// Index args listener for index term stored in parent page
	if (window.frameElement && Parent.hmLayout.hmIndexArg != "") {
		var indexCheck = setInterval(function() {
			var box = document.getElementById("idxSearch");
			try {
				if (box.name) {
					clearInterval(indexCheck);
					box.value = Parent.hmLayout.hmIndexArg;
					Parent.hmLayout.hmIndexArg = "";
					setTimeout(function() {
						indexSearch();
					},200);
				}
			} catch(err) {}
		},100);
	} // Index args listener
});