// Было прописано внутри тега хед файла hmftsearch.htm

/*! Full-text search init functions for HM Premium Pack Version 2.71
Copyright (c) 2008-2015 by Tim Green
All rights reserved. */

// Make form resize function accessible from outside
var resizeForm;

$(document).ready(function() { /* ??? почему ругается на эту строку */
		/* $(function() { */

	/* var browserOK = (function() {
		if (!(document.all && !window.opera)) return true;
		var rv = -1;
		var ua = navigator.userAgent;
		var re = new RegExp("Trident\/([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) {
			rv = parseFloat(RegExp.$1);
		}
		var ie = /msie 9|msie 10/gi.test(ua);
		return (ie && (rv >= 4));
	})(); */
	// Keep width of input form matched to pane width
	resizeForm = function(){
		// if (!browserOK) return;
		if (parent.window || (parent.window.TabSlider && parent.window.TabSlider.currentTab != 2)) return;
		var size = $("input#zoom_searchbox").attr("size");
		var buttonUp = $(".zoom_button").width() + 90;
		var buttonDown = $(".zoom_button").width() + 80;
		var docwidth = $(document).width();

		while ( ($("input#zoom_searchbox").width() + buttonUp) > docwidth) {
			$("input#zoom_searchbox").attr("size",size--);
		}
		while (($("input#zoom_searchbox").width() + buttonDown) < docwidth) {
			$("input#zoom_searchbox").attr("size",size++);
		}
	}

	// Check for parent and reload UI if no parent
	try {
	var Parent = parent.WebHelp ? parent : window.opener.WebHelp ? window.opener : false;
	} catch(err) {
	document.location.replace("index.html");
	}
	var searchForm = $("form.zoom_searchform")[0];
	$(searchForm).attr("id", "idFormSearch");
	$("body").css("visibility","hidden");
	// Search init delay for retarded browsers
	setTimeout(function() {
	if ($('div.results').length < 1) {
		// No results
		if ($("input#zoom_searchbox").width() > 10 && $(document).width() > 10) {
			resizeForm();
			}
		$("span br, div.searchheading br").remove();
	} else if ($('div.results').children().length > 0) {
		// Results found...
		// $("span br, div.searchheading br, div.result_pagescount br").remove();

		(function() {
			var summary = "";
			var pcount = $("div.result_pagescount").html() ? $("div.result_pagescount").html() : "";
			var suggestion = $("div.suggestion").html() ? $("div.suggestion").html() : "";
			var searchtime = $("div.searchtime").html() ? (" " + $("div.searchtime").html()) : "";
			var zoomad = $("p.zoom_advertising").html() ? ("<p class=\"zoom_ad\">" + $("p.zoom_advertising").html() + "</p><p>&nbsp;</p>") : "";
			$("div.summary").each(function(index) {
				if ($(this).html())	{
					summary+= $(this).html() + " ";
					}
				if (index > 0) $(this).remove();
			});
			summary += pcount + suggestion + searchtime;

			summary = summary.replace(/<br\s?\/?>/gi,"");
			// summary += zoomad;
			$("div.summary").html(summary);
			$("div.result_pagescount, div.suggestion, div.searchtime, p.zoom_advertising").remove();
			$($("div.results")[0]).append(zoomad);
		})();

		var results = $("div.results")[0];
		var resultsNav = ($("div.result_pages").length > 0); // ? $("div.result_pages").html() : false;

		if (resultsNav) {
			$(results).css("top",($("div.result_pages").position().top + $("div.result_pages").height() + 7) + "px").css("border-top","1px solid silver");
			$(window).bind("resize",function() {$(results).css("top",($("div.result_pages").position().top + $("div.result_pages").height() + 7) + "px")});
		} else {
		$(results).css("top",($("div.summary").position().top + $("div.summary").height() + 7) + "px").css("border-top","1px solid silver");
		$(window).bind("resize",function() {$(results).css("top",($("div.summary").position().top + $("div.summary").height() + 7) + "px")});
		}
		$("#dummy").remove();
		$("div.results a[target='hmcontent']").on("click", function(event) {
			var target = $(this).attr("href");

			if (Parent && Parent.hmnavpages.cachefix) {
					event.preventDefault();
					Parent.document.getElementById("hmcontent").src = Parent.hmCacheFix.getTarget(target);
			}
			if (Parent)
			Parent.WebHelp.tocWin.tocScroller(target);
		});
		resizeForm();
	} else {
		// No results yet, init the empty pane...
		var results = $("div.results")[0];
		$("span br, div.searchheading br").remove();
		$(results).css("overflow","hidden");
		}
		$("body").css("visibility","visible");

		// Search args checker for search terms stored in main page
		if (Parent.hmLayout.hmSearchArg != "") {
			var searchCheck = setInterval(function(){
			var box = document.getElementById("zoom_searchbox");
				try {if (box.name) {
						clearInterval(searchCheck);
						box.value = Parent.hmLayout.hmSearchArg;
						Parent.hmLayout.hmSearchArg = "";
						document.forms[0].submit();
					}
				} catch(err) {}
			},100);
		} // Search args checker

	},100); // End search init timeout

	// Search page is undocked
	if (window.opener) {
	// Display tab box for undocked window
	$("ul.tabs").show();
	$("ul.tabs a").css("cursor","default");
	// $("body").css("background-color","#f1f1f1");
	$("div#idBox").css("padding", "10px");
	$("div.results").css("padding","5px 2px 5px 5px");
	// Get the current search args from the main window
	var args = window.opener.window.WebHelp.searchArgs;
	// Store the search args used here in the main page for redocking
	$("form#idFormSearch").submit(function() {
		window.opener.window.WebHelp.searchReturnArgs = $("input#zoom_searchbox").val();
		});
	if (args) {
		// Prevent endless reload loop... ;-)
		window.opener.window.WebHelp.searchArgs = null;
		$("input#zoom_searchbox").val(args);
		$("form#idFormSearch").submit();
		}

	// Match skin to main window
	$("link#tabscheme").attr("href","css/hm_webhelp_undocked.css");
	$("body,html").css("backgroundImage", "url('blackpaisley.jpeg')");

	// Close undocked search window if main window closes, reloads or goes elsewhere
	var closeCheck = setInterval(function(){
		function closeIt() {clearInterval(closeCheck); window.close();}
		try { var windowsOpen = window.opener.WebHelp.openWindows.length;
			} catch(err) { closeIt();}
			if(!window.opener || windowsOpen < 1) {
				closeIt();
				}
				},500);
	} // End if window.opener

	$(window).bind("resize",resizeForm);

}); // End document.ready()