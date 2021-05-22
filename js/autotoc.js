/*! Auto-TOC script functions for HM Premium Pack Version 2.71
Copyright (c) 2008-2015 by Tim Green 
All rights reserved. */
function SearchCheck() {
	var c = window.location.search.lastIndexOf("zoom_highlight") > 0;
	if (!c) {
		var a = document.getElementsByTagName("FONT");
		if (a.length > 0) {
			var b = "";
			for (var d = 0; d < a.length; d++) {
				b = a[d].style.cssText;
				if (b.indexOf("BACKGROUND-COLOR") == 0) {
					c = true;
					break;
				}
			}
		}
	}
	return c;
}
function truncate(d, a) {
	var c, b;
	if (a == 0) {
		return d;
	}
	if (a > 0 && a <= 20) {
		a = 20;
	}
	c = d.split("");
	if (c.length > a) {
		for (b = c.length - 1; b > -1; --b) {
			if (b > a) {
				c.length = b;
			} else {
				if (" " === c[b]) {
					c.length = b;
					break;
				}
			}
		}
		c.push("...");
	}
	return c.join("");
}
function trim(a) {
	return a.replace(/^\s+|\s+$/g, "");
}
function htmlFix(a) {
	heading = a.replace(/\&/g, "&amp;");
	a = a.replace(/</g, "&lt;");
	a = a.replace(/>/g, "&gt;");
	return a;
}
function autoTOC() {
	var b = new Array();
	var n = new Array();
	var e = hmatocvars.atoc_tip;
	var d = hmatocvars.atoc_minHeaders;
	var v = hmatocvars.atoc_btntip_on;
	var j = hmatocvars.atoc_toptip;
	var g = hmatocvars.atoc_top;
	var x = hmatocvars.atoc_bg;
	var c = hmatocvars.atoc_border;
	var u = hmatocvars.atoc_linkcolor;
	var a = hmatocvars.atoc_linklimit;
	var m = hmatocvars.atoc_hovercolor;
	var p = hmatocvars.atoc_hoverbgcolor;
	var t,
		w,
		k,
		h,
		y,
		z,
		s,
		o,
		f,
		l = false;
	$("div#atocIcon")
		.bind("mouseover", function () {
			$("img#hmAtocLink").addClass("naviconH");
		})
		.bind("mouseout", function () {
			$("img#hmAtocLink").removeClass("naviconH");
		});
	$("img#hmAtocLink").attr({ src: "contents.png", title: v, alt: v });
	$("div#atocIcon, div#atocIcon span").css("color", "#000");
	$("span[class*='_atoc_']")
		.parent("td:not(:has(span[class='temp_atoc_']))")
		.each(function () {
			var i = $(this).html();
			i = '<span class="temp_atoc_">' + i + "</span>";
			$(this).html(i);
		});
	$("span[class*='_atocs_']")
		.parent("td:not(:has(span[class='temp_atocs_']))")
		.each(function () {
			var i = $(this).html();
			i = '<span class="temp_atocs_">' + i + "</span>";
			$(this).html(i);
		});
	b = $("[class*='_atoc_'],[class*='_atocs_']")
		.filter("[class^='p_']")
		.add("span[class='temp_atoc_'],span[class='temp_atocs_']");
	if (b.length >= d) {
		for (var q = 0; q < b.length; q++) {
			t = b[q];
			w = $(b[q]).text();
			w = trim(w);
			w = htmlFix(w);
			k = $(t).attr("class");
			h = k.indexOf("_atocs_") != -1;
			if (w.length == 1) {
				w = w.replace(/\xa0/, "");
			}
			if (w != "") {
				l = true;
				z = "autoTOC" + q;
				y = w.replace(/\"/g, "'");
				w = truncate(w, a);
				t.innerHTML = '<a id="' + z + '"></a>' + t.innerHTML;
				if (!h) {
					s =
						'<li class="autoTOC" id="src_' +
						z +
						'" title="' +
						e +
						y +
						'"><p class="autoTOC" style="color:' +
						u +
						';"><img src="atoc_bullet.png" class="menuicon" alt="' +
						e +
						y +
						'" border="0" />&nbsp;' +
						w +
						"</p></li>";
				} else {
					s =
						'<li class="autoTOC" id="src_' +
						z +
						'" title="' +
						e +
						y +
						'"><p class="autoTOC" style="font-size: 90%; font-weight: normal;color:' +
						u +
						';">&nbsp;&nbsp;<img src="atoc_bullet.png" class="menuicon" alt="' +
						e +
						y +
						'" border="0" />&nbsp;' +
						w +
						"</p></li>";
				}
				n.push(s);
			}
		}
	} else {
		return;
	}
	if (n[0] && n[0] != "") {
		o = "";
		f = document.getElementById("autoTocWrapper");
		for (var q = 0; q < n.length; q++) {
			o = o + n[q];
		}
		o =
			'<li id="toplink" title="' +
			j +
			'"><p class="autoTOC"><img src="atoc_gotop.png" class="menuicon" alt="' +
			j +
			'" border="0" />&nbsp;' +
			g +
			"</p></li>" +
			o;
		o =
			'<div id="autoTocMiddle"><div id="autoTocInner"><ul>' +
			o +
			"</ul></div></div>";
		f.innerHTML = o;
	}
	$.fn.tagName = function () {
		return this.get(0).tagName;
	};
	function r() {
		var i = $("div#hmheader").outerHeight();
		if (!parent.window.hmWebHelp && window.opener) {
			$("div#autoTocWrapper").css("right", "25px");
		}
		if (!parent.window.hmWebHelp && !window.opener) {
			$("div#autoTocWrapper").css("right", "30px");
		}
		$("div#autoTocWrapper").css("top", i + "px");
	}
	$("div#atocIcon")
		.bind("click", function (i) {
			i.stopPropagation();
			$(window).bind("resize.atocResize", function () {
				r();
			});
			if ($("div#autoTocWrapper").is(":hidden")) {
				r();
				$("div#autoTocWrapper").slideDown("fast");
				$("div#unclicker").show();
				$("div#hmheader")
					.bind("mousedown", function () {
						if ($("div#autoTocWrapper").is(":visible")) {
							$("#autoTocWrapper").slideUp("fast");
							$(window).unbind("resize.atocResize");
							$(this).css("cursor", "");
							$(this).unbind("mousedown");
						}
					})
					.css("cursor", "default");
			} else {
				$("div#autoTocWrapper").slideUp("fast");
				$(window).unbind("resize.atocResize");
				$("div#unclicker").hide();
				$("div#hmheader").unbind("click").css("cursor", "");
			}
		})
		.css("cursor", "pointer");
	$("li.autoTOC").click(function () {
		var A = SearchCheck();
		var i = $(this).attr("id");
		var B = i.replace(/src_/, "");
		var C = $("a[id='" + B + "']");
		if (HMToggles.length != null && !A) {
			HMToggleExpandAll(false);
		}
		aniScroll(C, "menu", false);
		return false;
	});
	$("#toplink").click(function () {
		var A = SearchCheck();
		if (HMToggles.length != null && !A) {
			HMToggleExpandAll(false);
		}
		var i = "div#idcontent";
		$(i).scrollTo(0, 600);
		return false;
	});
	$("div#unclicker").bind("mousedown", function (i) {
		i.stopPropagation();
		$("#autoTocWrapper").slideUp("fast");
		$("div#hmheader").css("cursor", "");
		$(this).hide();
	});
	$("#autoTocWrapper ul li").mouseover(function () {
		$(this).css("backgroundColor", p);
		$(this).children().filter("p.autoTOC").css("color", m);
	});
	$("#autoTocWrapper ul li").mouseout(function () {
		$(this).css("backgroundColor", x);
		$(this).children().filter("p.autoTOC").css("color", u);
	});
}
var atocLoaded = true;
