/*! 
User comments script functions for Premium Pack Version 2.71 for Help & Manual 7
Support for Disqus and IntenseDebate commenting systems
Copyright (c) 2008-2015 by Tim Green 
All rights reserved. 
*/
var comments_off = false;
var comments_delay = 10;
var $cBox, $cLink1, $cLink2, comments_online;
var cCount = "0";
var pCount = 0;
var iOx = /ipad|iphone/gi;
var comments_intensedebate = comments_type.toLowerCase() == "intensedebate" ? true : false;
var comments_disqus = comments_type.toLowerCase() == "disqus" ? true : false;
var commentsWidth = function() { var a = $cBox.width(); var c = hmHeaderTopic ? "40px" : "60px"; var d = $(document).width(); var b = 0; if (a > 842 && d > 912) { b = a - 842;
		$cBox.css({ right: "", width: "842px" }) } else { if (d < 912) { $cBox.css({ right: c, width: "" }) } } };
comments_online = comments_path.substr(0, comments_path.lastIndexOf("/")) == location.href.substr(0, location.href.lastIndexOf("/"));
if (!comments_online) { comments_off = true }
$(document).ready(function() { $cBox = $("div#commentsWrapper");
	$cLink1 = $("a#commentToggle1");
	$cLink2 = $("a#commentToggle2");
	$("a[id^='commentToggle']").click(function(d) { d.preventDefault() }); if (window.frameElement) { if (window.frameElement.id != "hmcontent") { $("a.commentLink").hide() } } if ((iOx.test(navigator.platform) && comments_disqus) || comments_off) { $("p#commentLink1,p#commentLink2,div#commentsBox").hide() } else { if (comments_disqus) {} else { if (comments_intensedebate) { var a = "idc-commentcount"; var b = "idc-commentcount_label"; var c = window.setInterval(function() { if ($("#" + b).length > 0) { cCount = document.getElementById(a) ? document.getElementById(a).innerHTML : "0";
						$cLink1.html(document.getElementById(a) ? window.comments_link + ' (<span class="comments">' + cCount + "</span>)" : window.comments_link + ' (<span class="comments">0</span>)').attr("title", window.comments_showtip);
						$cLink2.html($cLink1.html()).attr("title", window.comments_showtip);
						window.clearInterval(c) } else { if (pCount > comments_delay * 5) { cCount = "?";
							$cLink1.html(window.comments_link + ' (<span class="comments">?</span>)');
							$cLink2.html($cLink1.html());
							$cBox.html("<h4>" + window.comments_offline + "</h4>");
							window.clearInterval(c) } }
					pCount++ }, 200) } } } });
$(window).bind("resize", commentsWidth);

function showComments() { var a; if ($cBox.css("visibility") == "visible") { $cBox.slideUp(400, function() { $("div#atocIcon").show();
			$cLink1.css("visibility", "visible");
			$cLink2.css("visibility", "visible");
			$cBox.css("visibility", "hidden"); if (comments_intensedebate) { window.location.reload() } }); return false } else { $cBox.hide();
		$cBox.css("visibility", "visible");
		$cBox.slideDown(400);
		$("div#atocIcon").hide();
		$cLink1.css("visibility", "hidden");
		$cLink2.css("visibility", "hidden");
		commentsWidth(); return false } }

function doDisqus() { document.write('<div id="disqus_thread"></div>'); if (!iOx.test(navigator.platform) && !comments_off) {
		(function() { var a = document.createElement("script");
			a.type = "text/javascript";
			a.async = true;
			a.src = "http://" + disqus_shortname + ".disqus.com/embed.js";
			(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(a) })();
		document.write('<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript" target="_blank">comments powered by Disqus.</a></noscript>');
		document.write('<a href="http://disqus.com" class="dsq-brlink" target="_blank">Commenting system powered by <span class="logo-disqus">Disqus</span></a>'); if (/AppleWebKit.+?KHTML.+?Gecko.+?Chrome/.test(navigator.userAgent)) { $("#commentsWrapper").hide() } } }

function writeCommentLink(a) { var b = "commentLink1"; var c = "commentToggle1"; if (a == "2") { b = "commentLink2";
		c = "commentToggle2" } if (comments_disqus) { document.write('<p id="' + b + '" class="commentPara"><a id="' + c + '" class="commentLink" title="' + comments_showtip + '" href="#disqus_thread" onclick="showComments();return false;" data-disqus-identifier="' + tVars.mailid + '">' + comments_link + "</a></p>"); if (a == "2") {
			(function() { var d = document.createElement("script");
				d.async = true;
				d.type = "text/javascript";
				d.src = "http://" + disqus_shortname + ".disqus.com/count.js";
				(document.getElementsByTagName("HEAD")[0] || document.getElementsByTagName("BODY")[0]).appendChild(d) }()) } } else { document.write('<p id="' + b + '" class="commentPara"><a id="' + c + '" class="commentLink" title="' + comments_showtip + '" href="javascript:void(0)" onclick="showComments();return false;">' + comments_link + "</a></p>") } }

function doIntenseDebate() { if (!comments_off) { var a = document.createElement("script");
		a.setAttribute("type", "text/javascript");
		a.setAttribute("src", "http://www.intensedebate.com/js/genericCommentWrapperV2.js");
		document.write('<span id="IDCommentsPostTitle" style="display:none"></span>');
		document.getElementById("commentsBox").appendChild(a) } };