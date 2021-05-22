document.write(
	'<script language="JavaScript" src="zoom_index.js" charset="' +
		Charset + '"></script>'
);
document.write(
	'<script language="JavaScript" src="zoom_pageinfo.js" charset="' +
		Charset + '"></script>'
);
document.write(
	'<meta http-equiv="content-type" content="text/html; charset=' +
		Charset + '">'
);
var PerPageOptions = new Array(10, 20, 50, 100);
var SkippedWords = 0;
var searchWords = new Array();
var RegExpSearchWords = new Array();
var SkippedOutputStr = "";
var CatCounter = new Array();
var CatCounterFilled = 0;
var months = new Array(
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
);
var PAGEDATA_URL = 0;
var PAGEDATA_TITLE = 1;
var PAGEDATA_DESC = 2;
var PAGEDATA_IMG = 3;
var PAGEINFO_DATETIME = 0;
var PAGEINFO_FILESIZE = 1;
var PAGEINFO_BOOST = 2;
var PAGEINFO_LINKACTION = 3;
var PAGEINFO_CAT = 4;
var PAGEINFO_METAFIRST = 5;
var METAFIELD_TYPE = 0;
var METAFIELD_NAME = 1;
var METAFIELD_SHOW = 2;
var METAFIELD_FORM = 3;
var METAFIELD_METHOD = 4;
var METAFIELD_DROPDOWN = 5;
var METAFIELD_TYPE_NUMERIC = 0;
var METAFIELD_TYPE_TEXT = 1;
var METAFIELD_TYPE_DROPDOWN = 2;
var METAFIELD_TYPE_MULTI = 3;
var METAFIELD_TYPE_MONEY = 4;
var METAFIELD_METHOD_EXACT = 0;
var METAFIELD_METHOD_LESSTHAN = 1;
var METAFIELD_METHOD_LESSTHANORE = 2;
var METAFIELD_METHOD_GREATERTHAN = 3;
var METAFIELD_METHOD_GREATERTHANORE = 4;
var METAFIELD_METHOD_SUBSTRING = 5;
function getParam(a) {
	paramStr = document.location.search;
	if (paramStr == "") {
		return "";
	}
	if (paramStr.charAt(0) == "?") {
		paramStr = paramStr.substr(1);
	}
	arg = paramStr.split("&");
	for (i = 0; i < arg.length; i++) {
		arg_values = arg[i].split("=");
		if (unescape(arg_values[0]) == a) {
			if (a == "zoom_query") {
				arg_values[1] = arg_values[1].replace(/[\+]/g, " ");
			}
			if (UseUTF8 == 1 && self.decodeURIComponent) {
				ret = decodeURIComponent(arg_values[1]);
			} else {
				ret = unescape(arg_values[1]);
			}
			return ret;
		}
	}
	return "";
}
function getParamArrayInt(c) {
	paramStr = document.location.search;
	var a = new Array();
	var b = 0;
	if (paramStr == "") {
		return a;
	}
	if (paramStr.charAt(0) == "?") {
		paramStr = paramStr.substr(1);
	}
	arg = paramStr.split("&");
	for (i = 0; i < arg.length; i++) {
		arg_values = arg[i].split("=");
		if (unescape(arg_values[0]) == c) {
			if (UseUTF8 == 1 && self.decodeURIComponent) {
				ret = decodeURIComponent(arg_values[1]);
			} else {
				ret = unescape(arg_values[1]);
			}
			if (isNaN(ret) == false) {
				a[b] = ret;
				b++;
			}
		}
	}
	return a;
}
function SortCompare(d, c) {
	if (d[2] < c[2]) {
		return 1;
	} else {
		if (d[2] > c[2]) {
			return -1;
		} else {
			if (d[1] < c[1]) {
				return 1;
			} else {
				if (d[1] > c[1]) {
					return -1;
				} else {
					return 0;
				}
			}
		}
	}
}
function SortByDate(d, c) {
	if (pageinfo[d[0]][PAGEINFO_DATETIME] < pageinfo[c[0]][PAGEINFO_DATETIME]) {
		return 1;
	} else {
		if (pageinfo[d[0]][PAGEINFO_DATETIME] > pageinfo[c[0]][PAGEINFO_DATETIME]) {
			return -1;
		} else {
			return SortCompare(d, c);
		}
	}
}
function sw_compare(d, c) {
	if (d.charAt(0) == "-") {
		return 1;
	}
	if (c.charAt(0) == "-") {
		return -1;
	}
	return 0;
}
function pattern2regexp(a) {
	a = a.replace(/\#/g, "\\#");
	a = a.replace(/\$/g, "\\$");
	a = a.replace(/\./g, "\\.");
	a = a.replace(/\*/g, "[\\d\\S]*");
	a = a.replace(/\?/g, ".?");
	return a;
}
function PrintHighlightDescription(a) {
	if (Highlighting == 0) {
		document.writeln(a);
		return;
	}
	res = " " + a + " ";
	for (i = 0; i < NumSearchWords; i++) {
		if (RegExpSearchWords[i] == "") {
			continue;
		}
		if (SearchAsSubstring == 1) {
			res = res.replace(
				new RegExp("(" + RegExpSearchWords[i] + ")", "gi"),
				"[;:]$1[:;]"
			);
		} else {
			res = res.replace(
				new RegExp(
					"(\\W|^|\\b)(" + RegExpSearchWords[i] + ")(\\W|$|\\b)",
					"gi"
				),
				"$1[;:]$2[:;]$3"
			);
		}
	}
	res = res.replace(/\[;:\]/g, '<span class="highlight">');
	res = res.replace(/\[:;\]/g, "</span>");
	document.writeln(res);
}
function PrintNumResults(a) {
	if (a == 0) {
		return STR_NO_RESULTS;
	} else {
		if (a == 1) {
			return a + " " + STR_RESULT;
		} else {
			return a + " " + STR_RESULTS;
		}
	}
}
function RecLinkAddParamToURL(a, b) {
	if (a.indexOf("?") > -1) {
		return a + "&amp;" + b;
	} else {
		hashPos = a.indexOf("#");
		if (hashPos > -1) {
			return a.substr(0, hashPos) + "?" + b + a.substr(hashPos);
		} else {
			return a + "?" + b;
		}
	}
}
function AddParamToURL(a, b) {
	if (a.indexOf("?") > -1) {
		return a + "&amp;" + b;
	} else {
		return a + "?" + b;
	}
}
function SkipSearchWord(a) {
	if (searchWords[a] != "") {
		if (SkippedWords > 0) {
			SkippedOutputStr += ", ";
		}
		SkippedOutputStr += '"<b>' + searchWords[a] + '</b>"';
		searchWords[a] = "";
		SkippedWords++;
	}
}
function wordcasecmp(b, a) {
	if (b == a) {
		return 0;
	} else {
		return -1;
	}
}
function htmlspecialchars(a) {
	a = a.replace(/\&/g, "&#38;");
	a = a.replace(/\</g, "&#60;");
	a = a.replace(/\>/g, "&#62;");
	a = a.replace(/\"/g, "&#34;");
	a = a.replace(/\'/g, "&#39;");
	return a;
}
function QueryEntities(a) {
	a = a.replace(/\&/g, "&#38;");
	a = a.replace(/\</g, "&#60;");
	a = a.replace(/\>/g, "&#62;");
	a = a.replace(/\'/g, "&#39;");
	return a;
}
function FixQueryForAsianWords(a) {
	currCharType = 0;
	lastCharType = 0;
	newquery = "";
	for (i = 0; i < a.length; i++) {
		ch = a.charAt(i);
		chVal = a.charCodeAt(i);
		if (chVal >= 12352 && chVal <= 12447) {
			currCharType = 1;
		} else {
			if (chVal >= 12448 && chVal <= 12543) {
				currCharType = 2;
			} else {
				if (chVal >= 13312 && chVal <= 44031) {
					currCharType = 3;
				} else {
					currCharType = 0;
				}
			}
		}
		if (lastCharType != currCharType && ch != " ") {
			newquery += " ";
		}
		lastCharType = currCharType;
		newquery += ch;
	}
	return newquery;
}
function GetMetaValues(a, b) {
	return pageinfo[a][PAGEINFO_METAFIRST + b];
}
var query = getParam("zoom_query");
SearchAsSubstring = query == query.replace(/[\"+]/g, " ");
query = query.replace(/[\"]/g, " ");
var IsZoomQuery = 0;
if (query.length == 0) {
	if (document.location.search.indexOf("zoom_query") != -1) {
		IsZoomQuery = 1;
	}
}
var per_page = parseInt(getParam("zoom_per_page"));
if (isNaN(per_page)) {
	per_page = 10;
}
if (per_page < 1) {
	per_page = 1;
}
var page = parseInt(getParam("zoom_page"));
if (isNaN(page)) {
	page = 1;
}
var andq = parseInt(getParam("zoom_and"));
if (isNaN(andq)) {
	if (typeof DefaultToAnd != "undefined" && DefaultToAnd == 1) {
		andq = 1;
	} else {
		andq = 0;
	}
}
var cat = getParamArrayInt("zoom_cat[]");
if (cat.length == 0) {
	cat[0] = parseInt(getParam("zoom_cat"));
	if (isNaN(cat[0])) {
		cat[0] = -1;
	}
}
var num_zoom_cats = cat.length;
var meta_query = new Array();
if (UseMetaFields == 1) {
	for (fieldnum = 0; fieldnum < NumMetaFields; fieldnum++) {
		if (
			metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_NUMERIC ||
			metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_MONEY
		) {
			meta_query[fieldnum] = parseInt(
				getParam(metafields[fieldnum][METAFIELD_NAME])
			);
			if (isNaN(meta_query[fieldnum])) {
				meta_query[fieldnum] = "";
			}
		} else {
			if (metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_TEXT) {
				meta_query[fieldnum] = getParam(metafields[fieldnum][METAFIELD_NAME]);
				meta_query[fieldnum] = meta_query[fieldnum].replace(/[\+]/g, " ");
			} else {
				if (metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_MULTI) {
					var mqarray = new Array();
					mqarray = getParamArrayInt(
						metafields[fieldnum][METAFIELD_NAME] + "[]"
					);
					if (mqarray.length == 0) {
						mqarray[0] = parseInt(
							getParam(metafields[fieldnum][METAFIELD_NAME])
						);
						if (isNaN(mqarray[0])) {
							mqarray[0] = -1;
						}
					}
					meta_query[fieldnum] = mqarray;
				} else {
					meta_query[fieldnum] = getParam(metafields[fieldnum][METAFIELD_NAME]);
				}
			}
		}
	}
}
var sort = parseInt(getParam("zoom_sort"));
if (isNaN(sort)) {
	sort = 0;
}
var SelfURL = "";
var LinkBackJoinChar = "?";
if (typeof LinkBackURL == "undefined") {
	SelfURL = document.location.href;
	var paramIndex;
	paramIndex = SelfURL.indexOf("?");
	if (paramIndex > -1) {
		SelfURL = SelfURL.substr(0, paramIndex);
	}
	paramIndex = SelfURL.indexOf("#");
	if (paramIndex > -1) {
		SelfURL = SelfURL.substr(0, paramIndex);
	}
} else {
	SelfURL = LinkBackURL;
}
if (SelfURL.indexOf("?") != -1) {
	LinkBackJoinChar = "&amp;";
}
SelfURL = SelfURL.replace(/\</g, "&lt;");
SelfURL = SelfURL.replace(/\"/g, "&quot;");
var data = new Array();
var output = new Array();
var zoom_target = "";
if (UseLinkTarget == 1) {
	zoom_target = ' target="' + LinkTarget + '" ';
}
if (UseCats) {
	NumCats = catnames.length;
}
var query_zoom_cats = "";
var queryForHTML, queryForURL, queryForSearch;
var metaParams;
var UseWildCards;
var matches = 0;
var InitSearchCalled = false;
var IsWarningGiven = false;
var IsEmptyMetaQuery = false;
var IsNoSearch = false;
function ZoomInitSearch() {
	IsWarningGiven = true;
	if (Timing == 1) {
		timeStart = new Date();
	}
	InitSearchCalled = true;
	IsEmptyMetaQuery = false;
	if (query.length == 0) {
		if (UseMetaFields == 1) {
			if (IsZoomQuery == 1) {
				IsEmptyMetaQuery = true;
			} else {
				IsNoSearch = true;
			}
		} else {
			IsNoSearch = true;
		}
		if (IsNoSearch) {
			return;
		}
	}
	if (MapAccents == 1) {
		for (i = 0; i < NormalChars.length; i++) {
			query = query.replace(new RegExp(AccentChars[i], "g"), NormalChars[i]);
		}
	}
	if (SearchAsSubstring == 1 && UseUTF8 == 1) {
		query = FixQueryForAsianWords(query);
	}
	if (WordJoinChars.indexOf(".") == -1) {
		query = query.replace(/[\.]/g, " ");
	}
	if (WordJoinChars.indexOf("-") == -1) {
		query = query.replace(/(\S)\-/g, "$1 ");
	}
	if (WordJoinChars.indexOf("#") == -1) {
		query = query.replace(/\#(\S)/g, " $1");
	}
	if (WordJoinChars.indexOf("+") == -1) {
		query = query.replace(/[\+]+([^\+\s])/g, " $1");
		query = query.replace(/([^\+\s])\+\s/g, "$1 ");
	}
	if (WordJoinChars.indexOf("_") == -1) {
		query = query.replace(/[\_]/g, " ");
	}
	if (WordJoinChars.indexOf("'") == -1) {
		query = query.replace(/[\']/g, " ");
	}
	if (WordJoinChars.indexOf("$") == -1) {
		query = query.replace(/[\$]/g, " ");
	}
	if (WordJoinChars.indexOf("&") == -1) {
		query = query.replace(/[\&]/g, " ");
	}
	if (WordJoinChars.indexOf(":") == -1) {
		query = query.replace(/[\:]/g, " ");
	}
	if (WordJoinChars.indexOf(",") == -1) {
		query = query.replace(/[\,]/g, " ");
	}
	if (WordJoinChars.indexOf("/") == -1) {
		query = query.replace(/[\/]/g, " ");
	}
	if (WordJoinChars.indexOf("\\") == -1) {
		query = query.replace(/[\\]/g, " ");
	}
	query = query.replace(
		/[\s\(\)\^\[\]\|\{\}\%\�\!]+|[\-._',:&\/\\\\](\s|$)/g,
		" "
	);
	query = query.replace(/^\s*|\s*$/g, "");
	queryForHTML = htmlspecialchars(query);
	if (ToLowerSearchWords == 1) {
		queryForSearch = query.toLowerCase();
	} else {
		queryForSearch = query;
	}
	queryForSearch = htmlspecialchars(queryForSearch);
	searchWords = queryForSearch.split(" ");
	if (queryForSearch.indexOf("-") != -1) {
		searchWords.sort(sw_compare);
	}
	NumSearchWords = searchWords.length;
	if (searchWords[0].length == 0) {
		NumSearchWords = 0;
	}
	kw_ptr = 0;
	outputline = 0;
	ipage = 0;
	matches = 0;
	pagesCount = NumPages;
	exclude_count = 0;
	ExcludeTerm = 0;
	res_table = new Array(pagesCount);
	for (i = 0; i < pagesCount; i++) {
		res_table[i] = new Array(4);
		res_table[i][0] = 0;
		res_table[i][1] = 0;
		res_table[i][2] = 0;
		res_table[i][3] = 0;
	}
	UseWildCards = new Array(NumSearchWords);
	for (sw = 0; sw < NumSearchWords; sw++) {
		UseWildCards[sw] = 0;
		if (typeof window.skipwords != "undefined") {
			if (searchWords[sw].length < MinWordLen) {
				SkipSearchWord(sw);
				continue;
			}
			for (i = 0; i < skipwords.length; i++) {
				if (searchWords[sw] == skipwords[i]) {
					SkipSearchWord(sw);
					break;
				}
			}
		}
		if (
			searchWords[sw].indexOf("*") == -1 &&
			searchWords[sw].indexOf("?") == -1
		) {
			UseWildCards[sw] = 0;
		} else {
			UseWildCards[sw] = 1;
			RegExpSearchWords[sw] = pattern2regexp(searchWords[sw]);
		}
		if (Highlighting == 1 && UseWildCards[sw] == 0) {
			RegExpSearchWords[sw] = searchWords[sw];
		}
	}
	if (DictArrayCount > 0) {
		for (dci = 0; dci < DictArrayCount; dci++) {
			eval("dictwords = dictwords.concat(dictwords" + dci + ");");
		}
	}
	if (PageInfoArrayCount > 0) {
		for (dci = 0; dci < PageInfoArrayCount; dci++) {
			eval("pageinfo = pageinfo.concat(pageinfo" + dci + ");");
		}
	}
	if (PageDataArrayCount > 0) {
		for (dci = 0; dci < PageDataArrayCount; dci++) {
			eval("pagedata = pagedata.concat(pagedata" + dci + ");");
		}
	}
	if (DictArrayCount > 0) {
		for (dci = 0; dci < DictArrayCount; dci++) {
			dictwords = dictwords.concat(window["dictwords" + dci]);
		}
	}
	if (PageInfoArrayCount > 0) {
		for (dci = 0; dci < PageInfoArrayCount; dci++) {
			pageinfo = pageinfo.concat(window["pageinfo" + dci]);
		}
	}
	if (PageDataArrayCount > 0) {
		for (dci = 0; dci < PageDataArrayCount; dci++) {
			pagedata = pagedata.concat(window["pagedata" + dci]);
		}
	}
	for (sw = 0; sw < NumSearchWords; sw++) {
		if (searchWords[sw] == "") {
			continue;
		}
		if (searchWords[sw].charAt(0) == "-") {
			searchWords[sw] = searchWords[sw].substr(1);
			ExcludeTerm = 1;
			exclude_count++;
		}
		if (UseWildCards[sw] == 1) {
			if (SearchAsSubstring == 0) {
				pattern = "^" + RegExpSearchWords[sw] + "$";
			} else {
				pattern = RegExpSearchWords[sw];
			}
			re = new RegExp(pattern, "g");
		}
		for (kw_ptr = 0; kw_ptr < dictwords.length; kw_ptr++) {
			data = dictwords[kw_ptr].split(" ");
			if (UseWildCards[sw] == 0) {
				if (SearchAsSubstring == 0) {
					match_result = wordcasecmp(data[0], searchWords[sw]);
				} else {
					match_result = data[0].indexOf(searchWords[sw]);
				}
			} else {
				match_result = data[0].search(re);
			}
			if (match_result != -1) {
				for (kw = 1; kw < data.length; kw += 3) {
					pageexists = 0;
					ipage = data[kw];
					score = parseInt(data[kw + 1]);
					prox = parseInt(data[kw + 2]);
					if (pageinfo[ipage][PAGEINFO_BOOST] != 0) {
						score *= pageinfo[ipage][PAGEINFO_BOOST] / 10;
						score = Math.floor(score + 0.5);
					}
					if (ExcludeTerm == 1) {
						res_table[ipage][0] = 0;
					} else {
						if (res_table[ipage][0] == 0) {
							matches++;
							res_table[ipage][0] = score;
							res_table[ipage][3] = prox;
						} else {
							if (res_table[ipage][0] > 10000) {
								res_table[ipage][0] += 1;
							} else {
								res_table[ipage][0] += score;
							}
							res_table[ipage][3] &= prox;
						}
					}
					res_table[ipage][1] += 1;
					if (
						res_table[ipage][2] == sw ||
						res_table[ipage][2] == sw - SkippedWords - exclude_count
					) {
						res_table[ipage][2] += 1;
					}
				}
				if (UseWildCards[sw] == 0 && SearchAsSubstring == 0) {
					break;
				}
			}
		}
	}
	oline = 0;
	fullmatches = 0;
	output = new Array();
	if (UseCats == 1 && DisplayCatSummary == 1) {
		if (cat[0] == -1 || num_zoom_cats > 1) {
			for (cati = 0; cati < NumCats; cati++) {
				CatCounter[cati] = 0;
			}
		} else {
			DisplayCatSummary = 0;
		}
	}
	var IsAnyDropdown = false;
	var full_numwords = NumSearchWords - SkippedWords - exclude_count;
	for (i = 0; i < pageinfo.length; i++) {
		IsFiltered = false;
		if (res_table[i][0] > 0 || IsEmptyMetaQuery) {
			if (UseMetaFields && IsFiltered == false) {
				for (
					fieldnum = 0;
					fieldnum < NumMetaFields && !IsFiltered;
					fieldnum++
				) {
					IsAnyDropdown = false;
					if (
						metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_DROPDOWN ||
						metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_MULTI
					) {
						if (meta_query[fieldnum] == -1) {
							IsAnyDropdown = true;
						}
					}
					if (meta_query[fieldnum] !== "" && IsAnyDropdown == false) {
						if (GetMetaValues(i, fieldnum) == null) {
							IsFiltered = true;
						} else {
							if (metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_TEXT) {
								if (
									metafields[fieldnum][METAFIELD_METHOD] ==
									METAFIELD_METHOD_SUBSTRING
								) {
									if (
										GetMetaValues(i, fieldnum)
											.toLowerCase()
											.indexOf(meta_query[fieldnum].toLowerCase()) == -1
									) {
										IsFiltered = true;
									}
								} else {
									if (
										wordcasecmp(
											GetMetaValues(i, fieldnum).toLowerCase(),
											meta_query[fieldnum].toLowerCase()
										) == -1
									) {
										IsFiltered = true;
									}
								}
							} else {
								if (
									metafields[fieldnum][METAFIELD_TYPE] ==
									METAFIELD_TYPE_DROPDOWN
								) {
									if (GetMetaValues(i, fieldnum) != meta_query[fieldnum]) {
										IsFiltered = true;
									}
								} else {
									if (
										metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_MULTI
									) {
										IsFiltered = true;
										var metaVal = GetMetaValues(i, fieldnum);
										if (metaVal.length > 0) {
											for (
												mqi = 0;
												mqi < meta_query[fieldnum].length && IsFiltered;
												mqi++
											) {
												for (mvi = 0; mvi < metaVal.length; mvi++) {
													if (metaVal[mvi] == meta_query[fieldnum][mqi]) {
														IsFiltered = false;
														break;
													}
												}
											}
										}
									} else {
										var tmpQueryVal = meta_query[fieldnum];
										if (
											UseMetaFields == 1 &&
											MetaMoneyShowDec == 1 &&
											metafields[fieldnum][METAFIELD_TYPE] ==
												METAFIELD_TYPE_MONEY
										) {
											tmpQueryVal = tmpQueryVal * 100;
										}
										if (
											metafields[fieldnum][METAFIELD_METHOD] ==
											METAFIELD_METHOD_LESSTHAN
										) {
											bRet = GetMetaValues(i, fieldnum) < tmpQueryVal;
										} else {
											if (
												metafields[fieldnum][METAFIELD_METHOD] ==
												METAFIELD_METHOD_LESSTHANORE
											) {
												bRet = GetMetaValues(i, fieldnum) <= tmpQueryVal;
											} else {
												if (
													metafields[fieldnum][METAFIELD_METHOD] ==
													METAFIELD_METHOD_GREATERTHAN
												) {
													bRet = GetMetaValues(i, fieldnum) > tmpQueryVal;
												} else {
													if (
														metafields[fieldnum][METAFIELD_METHOD] ==
														METAFIELD_METHOD_GREATERTHANORE
													) {
														bRet = GetMetaValues(i, fieldnum) >= tmpQueryVal;
													} else {
														bRet = GetMetaValues(i, fieldnum) == tmpQueryVal;
													}
												}
											}
										}
										if (bRet == false) {
											IsFiltered = true;
										}
									}
								}
							}
						}
					}
				}
				if (IsEmptyMetaQuery == true && IsFiltered == false) {
					res_table[i][0]++;
					res_table[i][1]++;
				}
			}
			if (IsFiltered == false) {
				if (res_table[i][2] < full_numwords && andq == 1) {
					IsFiltered = true;
				}
			}
			if (UseCats && cat[0] != -1 && IsFiltered == false) {
				if (SearchMultiCats) {
					var bFoundCat = false;
					for (cati = 0; cati < num_zoom_cats; cati++) {
						if (pageinfo[i][PAGEINFO_CAT].charAt(cat[cati]) == "1") {
							if (DisplayCatSummary == 1) {
								CatCounter[cat[cati]]++;
								CatCounterFilled = 1;
							}
							bFoundCat = true;
						}
					}
					if (bFoundCat == false) {
						IsFiltered = true;
					}
				} else {
					if (pageinfo[i][PAGEINFO_CAT].charAt(cat[0]) == "0") {
						IsFiltered = true;
					}
				}
			}
			if (IsFiltered == false) {
				if (res_table[i][2] >= full_numwords) {
					fullmatches++;
				}
				output[oline] = new Array(3);
				output[oline][0] = i;
				baseScale = 1.3;
				finalScale = (res_table[i][3] / 255) * 1.7 + baseScale;
				if (res_table[i][1] > 1) {
					if (res_table[i][1] <= 10) {
						finalScale = Math.pow(finalScale, res_table[i][1] - 1);
					} else {
						finalScale = Math.pow(finalScale, 10);
						finalScale += res_table[i][1] - 10;
					}
				}
				if (UseCats == 1 && DisplayCatSummary == 1 && cat[0] == -1) {
					if (pageinfo[i][PAGEINFO_CAT] != null) {
						for (cati = 0; cati < NumCats; cati++) {
							if (pageinfo[i][PAGEINFO_CAT].charAt(cati) == "1") {
								CatCounter[cati]++;
								CatCounterFilled = 1;
							}
						}
					}
				}
				output[oline][1] = Math.floor(res_table[i][0] * finalScale + 0.5);
				output[oline][2] = res_table[i][1];
				oline++;
			}
		}
	}
	matches = oline;
	if (matches > 1) {
		if (sort == 1 && UseDateTime == 1) {
			output.sort(SortByDate);
		} else {
			output.sort(SortCompare);
		}
	}
	if (UseUTF8 == 1 && self.encodeURIComponent) {
		queryForURL = encodeURIComponent(query);
		queryForURL = queryForURL.replace(/%20/g, "+");
	} else {
		queryForURL = query.replace(/\s/g, "+");
		queryForURL = escape(queryForURL);
	}
	metaParams = "";
	if (UseMetaFields == 1) {
		for (fieldnum = 0; fieldnum < NumMetaFields; fieldnum++) {
			if (meta_query[fieldnum] != "") {
				metaParams =
					metaParams +
					"&amp;" +
					metafields[fieldnum][METAFIELD_NAME] +
					"=" +
					meta_query[fieldnum];
			}
		}
	}
	if (Timing == 1) {
		timeEnd = new Date();
		timeDifference = timeEnd - timeStart;
	}
	num_pages = Math.ceil(matches / per_page);
}
function ZoomShowFormStart() {
	document.writeln(
		'<form method="get" action="' + SelfURL + '" class="zoom_searchform">'
	);
}
function ZoomShowSearchBox() {
	document.writeln(
		'<input type="text" name="zoom_query" size="70" value="' +
			htmlspecialchars(query) +
			'" id="zoom_searchbox" class="zoom_searchbox" autocorrect="off" autocapitalize="off" />'
	);
}
function ZoomShowSearchButton() {
	document.writeln(
		'<input type="submit" value="' +
			STR_FORM_SUBMIT_BUTTON +
			'" class="zoom_button" /><br />'
	);
}
function ZoomShowResultsPerPage() {
	document.writeln(
		'<span class="zoom_results_per_page">' + STR_FORM_RESULTS_PER_PAGE + "\n"
	);
	document.writeln('<select name="zoom_per_page">');
	for (i = 0; i < PerPageOptions.length; i++) {
		document.write("<option");
		if (PerPageOptions[i] == per_page) {
			document.write(' selected="selected"');
		}
		document.writeln(">" + PerPageOptions[i] + "</option>");
	}
	document.writeln("</select></span>");
}
function ZoomShowCategories() {
	if (UseCats) {
		document.writeln('<span class="zoom_categories">');
		document.write(STR_FORM_CATEGORY + " ");
		if (SearchMultiCats) {
			document.writeln("<ul>");
			document.write('<li><input type="checkbox" name="zoom_cat[]" value="-1"');
			if (cat[0] == -1) {
				document.write(' checked="checked"');
			}
			document.writeln(">" + STR_FORM_CATEGORY_ALL + "</input></li>");
			for (i = 0; i < NumCats; i++) {
				document.write(
					'<li><input type="checkbox" name="zoom_cat[]" value="' + i + '"'
				);
				if (cat[0] != -1) {
					for (catit = 0; catit < num_zoom_cats; catit++) {
						if (i == cat[catit]) {
							document.write(' checked="checked"');
							break;
						}
					}
				}
				document.writeln(">" + catnames[i] + "</input></li>");
			}
			document.writeln("</ul><br />");
		} else {
			document.write("<select name='zoom_cat[]'>");
			document.write(
				'<option value="-1">' + STR_FORM_CATEGORY_ALL + "</option>"
			);
			for (i = 0; i < NumCats; i++) {
				document.write('<option value="' + i + '"');
				if (i == cat[0]) {
					document.write(' selected="selected"');
				}
				document.writeln(">" + catnames[i] + "</option>");
			}
			document.writeln("</select>&nbsp;&nbsp;");
		}
		document.writeln("</span>");
	}
}
function ZoomShowMetaFields() {
	if (UseMetaFields) {
		document.writeln('<span class="zoom_metaform">');
		for (fieldnum = 0; fieldnum < NumMetaFields; fieldnum++) {
			if (metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_NUMERIC) {
				document.writeln(
					metafields[fieldnum][METAFIELD_FORM] +
						': <input type="text" name="' +
						metafields[fieldnum][METAFIELD_NAME] +
						'" size="20" value="' +
						meta_query[fieldnum] +
						'" class="zoom_metaform_numeric" />\n'
				);
			} else {
				if (metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_DROPDOWN) {
					document.writeln(
						metafields[fieldnum][METAFIELD_FORM] +
							': <select name="' +
							metafields[fieldnum][METAFIELD_NAME] +
							'" class="zoom_metaform_dropdown">\n'
					);
					document.writeln(
						'<option value="-1">' + STR_FORM_CATEGORY_ALL + "</option>"
					);
					for (
						ddi = 0;
						ddi < metafields[fieldnum][METAFIELD_DROPDOWN].length;
						ddi++
					) {
						document.writeln('<option value="' + ddi + '"');
						if (meta_query[fieldnum] != "" && ddi == meta_query[fieldnum]) {
							document.writeln(' selected="selected"');
						}
						document.writeln(
							">" +
								metafields[fieldnum][METAFIELD_DROPDOWN][ddi] +
								"</option>\n"
						);
					}
					document.writeln("</select>\n");
				} else {
					if (metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_MULTI) {
						document.writeln(
							metafields[fieldnum][METAFIELD_FORM] +
								': <select multiple name="' +
								metafields[fieldnum][METAFIELD_NAME] +
								'[]" class="zoom_metaform_multi">\n'
						);
						document.writeln(
							'<option value="-1">' + STR_FORM_CATEGORY_ALL + "</option>"
						);
						var b, a;
						b = meta_query[fieldnum].length;
						for (
							ddi = 0;
							ddi < metafields[fieldnum][METAFIELD_DROPDOWN].length;
							ddi++
						) {
							document.writeln('<option value="' + ddi + '"');
							for (a = 0; a < b; a++) {
								if (ddi == meta_query[fieldnum][a]) {
									document.writeln(' selected="selected"');
								}
							}
							document.writeln(
								">" +
									metafields[fieldnum][METAFIELD_DROPDOWN][ddi] +
									"</option>\n"
							);
						}
						document.writeln("</select>\n");
					} else {
						if (metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_MONEY) {
							document.writeln(
								metafields[fieldnum][METAFIELD_FORM] +
									": " +
									MetaMoneyCurrency +
									'<input type="text" name="' +
									metafields[fieldnum][METAFIELD_NAME] +
									'" size="7" value="' +
									meta_query[fieldnum] +
									'" class="zoom_metaform_money" />\n'
							);
						} else {
							document.writeln(
								metafields[fieldnum][METAFIELD_FORM] +
									': <input type="text" name="' +
									metafields[fieldnum][METAFIELD_NAME] +
									'" size="20" value="' +
									meta_query[fieldnum] +
									'" class="zoom_metaform_text" />\n'
							);
						}
					}
				}
			}
		}
		document.writeln("</span>\n");
	}
}
function ZoomShowMatchOptions() {
	document.writeln('<span class="zoom_match">' + STR_FORM_MATCH + " ");
	if (andq == 0) {
		document.writeln(
			'<input type="radio" name="zoom_and" value="0" checked="checked" />' +
				STR_FORM_ANY_SEARCH_WORDS
		);
		document.writeln(
			'<input type="radio" name="zoom_and" value="1" />' +
				STR_FORM_ALL_SEARCH_WORDS
		);
	} else {
		document.writeln(
			'<input type="radio" name="zoom_and" value="0" />' +
				STR_FORM_ANY_SEARCH_WORDS
		);
		document.writeln(
			'<input type="radio" name="zoom_and" value="1" checked="checked" />' +
				STR_FORM_ALL_SEARCH_WORDS
		);
	}
	document.writeln("<br /></span>");
}
function ZoomShowFormEnd() {
	document.writeln(
		'<input type="hidden" name="zoom_sort" value="' + sort + '" />'
	);
	if (FormFormat != 2) {
		document.writeln(
			'<input type="hidden" name="zoom_per_page" value="' + per_page + '" />'
		);
		document.writeln(
			'<input type="hidden" name="zoom_and" value="' + andq + '" />'
		);
	}
	document.writeln("</form>");
}
function ZoomShowSearchForm() {
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (FormFormat > 0) {
		ZoomShowFormStart();
		ZoomShowSearchBox();
		ZoomShowSearchButton();
		if (FormFormat == 2) {
			ZoomShowResultsPerPage();
			ZoomShowMatchOptions();
			ZoomShowCategories();
			ZoomShowMetaFields();
		}
		ZoomShowFormEnd();
	}
}
function ZoomShowHeading() {
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch) {
		return;
	}
	document.write(
		'<div class="searchheading">' + STR_RESULTS_FOR + " <i>" + queryForHTML
	);
	if (UseCats) {
		if (cat[0] == -1) {
			document.writeln(" " + STR_RESULTS_IN_ALL_CATEGORIES);
			query_zoom_cats = "&amp;zoom_cat%5B%5D=-1";
		} else {
			document.writeln(" " + STR_RESULTS_IN_CATEGORY + " ");
			for (catit = 0; catit < num_zoom_cats; catit++) {
				if (catit > 0) {
					document.write(", ");
				}
				document.write('"' + catnames[cat[catit]] + '"');
				query_zoom_cats += "&amp;zoom_cat%5B%5D=" + cat[catit];
			}
		}
	}
	document.writeln("</i><br /></div>");
}
function ZoomShowResults() {
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch) {
		if (ZoomInfo == 1) {
			document.writeln(
				'<center><p class="zoom_advertising"><small>' +
					STR_POWEREDBY +
					' <a href="http://www.wrensoft.com/zoom/" zoom_target="_blank"><b>Zoom Search Engine</b></a></small></p></center>'
			);
		}
		return;
	}
	document.writeln('<div class="results">');
	if (page == 1) {
		arrayline = 0;
	} else {
		arrayline = (page - 1) * per_page;
	}
	result_limit = arrayline + per_page;
	while (arrayline < matches && arrayline < result_limit) {
		ipage = output[arrayline][0];
		score = output[arrayline][1];
		pgurl = pagedata[ipage][PAGEDATA_URL];
		pgtitle = pagedata[ipage][PAGEDATA_TITLE];
		pgdesc = pagedata[ipage][PAGEDATA_DESC];
		pgimage = pagedata[ipage][PAGEDATA_IMG];
		urlLink = pgurl;
		if (GotoHighlight == 1) {
			if (SearchAsSubstring == 1) {
				urlLink = AddParamToURL(urlLink, "zoom_highlightsub=" + queryForURL);
			} else {
				urlLink = AddParamToURL(urlLink, "zoom_highlight=" + queryForURL);
			}
		}
		if (PdfHighlight == 1) {
			if (urlLink.toLowerCase().indexOf(".pdf") != -1) {
				urlLink = urlLink + "#search=&quot;" + query + "&quot;";
			}
		}
		if (arrayline % 2 == 0) {
			document.writeln('<div class="result_block">');
		} else {
			document.writeln('<div class="result_altblock">');
		}
		if (pageinfo[ipage][PAGEINFO_LINKACTION] == 1) {
			target = ' target="_blank"';
		} else {
			target = zoom_target;
		}
		if (UseZoomImage == 1) {
			if (pgimage.length > 1) {
				document.writeln('<div class="result_image">');
				document.writeln(
					'<a href="' +
						urlLink +
						'"' +
						target +
						'><img src="' +
						pgimage +
						'" alt="" class="result_image" /></a>'
				);
				document.writeln("</div>");
			}
		}
		document.writeln('<div class="result_title">');
		if (DisplayNumber == 1) {
			document.writeln("<b>" + (arrayline + 1) + ".</b>&nbsp;");
		}
		if (DisplayTitle == 1) {
			document.writeln('<a href="' + urlLink + '"' + target + ">");
			PrintHighlightDescription(pgtitle);
			document.writeln("</a>");
		} else {
			document.writeln(
				'<a href="' + urlLink + '"' + target + ">" + pgurl + "</a>"
			);
		}
		if (UseCats) {
			catpage = pageinfo[ipage][PAGEINFO_CAT];
			document.write('<span class="category">');
			for (cati = 0; cati < NumCats; cati++) {
				if (catpage.charAt(cati) == "1") {
					document.write(" [" + catnames[cati] + "]");
				}
			}
			document.writeln("</span>");
		}
		document.writeln("</div>");
		if (UseMetaFields == 1 && DisplayMetaFields == 1) {
			var d, a;
			for (fieldnum = 0; fieldnum < NumMetaFields; fieldnum++) {
				d = "result_metaname_" + metafields[fieldnum][METAFIELD_NAME];
				a = "result_metavalue_" + metafields[fieldnum][METAFIELD_NAME];
				if (GetMetaValues(ipage, fieldnum) != null) {
					if (metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_DROPDOWN) {
						document.writeln('<div class ="result_custommeta">');
						document.writeln(
							'<span class="' +
								d +
								'">' +
								metafields[fieldnum][METAFIELD_SHOW] +
								": </span>"
						);
						document.write('<span class="' + a + '">');
						var b = GetMetaValues(ipage, fieldnum);
						document.writeln(
							metafields[fieldnum][METAFIELD_DROPDOWN][b] + "</span></div>"
						);
					} else {
						if (metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_MULTI) {
							var c = GetMetaValues(ipage, fieldnum);
							if (c.length > 0) {
								document.writeln('<div class ="result_custommeta">');
								document.writeln(
									'<span class="' +
										d +
										'">' +
										metafields[fieldnum][METAFIELD_SHOW] +
										": </span>"
								);
								document.write('<span class="' + a + '">');
								var e = metafields[fieldnum][METAFIELD_DROPDOWN];
								for (mvi = 0; mvi < c.length; mvi++) {
									if (mvi > 0) {
										document.write(", ");
									}
									document.write(e[c[mvi]]);
								}
								document.write("</span></div>");
							}
						} else {
							if (
								metafields[fieldnum][METAFIELD_TYPE] == METAFIELD_TYPE_MONEY
							) {
								document.writeln('<div class ="result_custommeta">');
								document.writeln(
									'<span class="' +
										d +
										'">' +
										metafields[fieldnum][METAFIELD_SHOW] +
										": </span>"
								);
								var f = "";
								if (MetaMoneyShowDec == 1) {
									f = (GetMetaValues(ipage, fieldnum) / 100).toFixed(2);
								} else {
									f = GetMetaValues(ipage, fieldnum);
								}
								document.writeln(
									'<span class="' +
										a +
										'">' +
										MetaMoneyCurrency +
										f +
										"</span></div>"
								);
							} else {
								document.writeln('<div class ="result_custommeta">');
								document.writeln(
									'<span class="' +
										d +
										'">' +
										metafields[fieldnum][METAFIELD_SHOW] +
										": </span>"
								);
								document.writeln(
									'<span class="' +
										a +
										'">' +
										GetMetaValues(ipage, fieldnum) +
										"</span></div>"
								);
							}
						}
					}
				}
			}
		}
		if (DisplayMetaDesc == 1) {
			document.writeln('<div class="description">');
			PrintHighlightDescription(pgdesc);
			document.writeln("</div>\n");
		}
		info_str = "";
		if (DisplayTerms == 1) {
			info_str += STR_RESULT_TERMS_MATCHED + " " + output[arrayline][2];
		}
		if (DisplayScore == 1) {
			if (info_str.length > 0) {
				info_str += "&nbsp; - &nbsp;";
			}
			info_str += STR_RESULT_SCORE + " " + score;
		}
		if (DisplayDate == 1) {
			pgdate = pageinfo[ipage][PAGEINFO_DATETIME];
			if (pgdate > 0) {
				datetime = new Date(pgdate * 1000);
				if (info_str.length > 0) {
					info_str += "&nbsp; - &nbsp;";
				}
				info_str +=
					datetime.getDate() +
					" " +
					months[datetime.getMonth()] +
					" " +
					datetime.getFullYear();
			}
		}
		if (DisplayFilesize == 1) {
			filesize = pageinfo[ipage][PAGEINFO_FILESIZE];
			filesize = Math.ceil(filesize / 1024);
			if (filesize < 1) {
				filesize = 1;
			}
			if (info_str.length > 0) {
				info_str += "&nbsp; - &nbsp;";
			}
			info_str += filesize + "k";
		}
		if (DisplayURL == 1) {
			if (info_str.length > 0) {
				info_str += "&nbsp; - &nbsp;";
			}
			if (TruncateShowURL > 0) {
				if (pgurl.length > TruncateShowURL) {
					pgurl = pgurl.substr(0, TruncateShowURL) + "...";
				}
			}
			info_str += STR_RESULT_URL + " " + pgurl;
		}
		document.writeln('<div class="infoline">');
		document.writeln(info_str);
		document.writeln("</div></div>\n");
		arrayline++;
	}
	document.writeln("</div>");
}
function ZoomShowSummary() {
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch) {
		return;
	}
	if (SkippedWords > 0) {
		document.writeln(
			'<div class="summary">' +
				STR_SKIPPED_FOLLOWING_WORDS +
				" " +
				SkippedOutputStr +
				".<br /></div>"
		);
	}
	document.writeln('<div class="summary">');
	if (matches == 0) {
		document.writeln(STR_SUMMARY_NO_RESULTS_FOUND + "<br />");
	} else {
		if (NumSearchWords > 1 && andq == 0) {
			SomeTermMatches = matches - fullmatches;
			document.writeln(
				PrintNumResults(fullmatches) +
					" " +
					STR_SUMMARY_FOUND_CONTAINING_ALL_TERMS +
					" "
			);
			if (SomeTermMatches > 0) {
				document.writeln(
					PrintNumResults(SomeTermMatches) +
						" " +
						STR_SUMMARY_FOUND_CONTAINING_SOME_TERMS
				);
			}
			document.writeln("<br />");
		} else {
			if (NumSearchWords > 1 && andq == 1) {
				document.writeln(
					PrintNumResults(fullmatches) +
						" " +
						STR_SUMMARY_FOUND_CONTAINING_ALL_TERMS +
						"<br />"
				);
			} else {
				document.writeln(
					PrintNumResults(matches) + " " + STR_SUMMARY_FOUND + "<br />"
				);
			}
		}
	}
	document.writeln("</div>\n");
}
function ZoomShowCatSummary() {
	if (UseCats == 0 || DisplayCatSummary == 0 || CatCounterFilled == 0) {
		return;
	}
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch) {
		return;
	}
	var b = true;
	var a = false;
	for (catit = 0; catit < NumCats; catit++) {
		if (CatCounter[catit] > 0) {
			if (CatCounter[catit] != matches) {
				if (b == true) {
					document.writeln(
						'<div class="cat_summary"><br />' + STR_CAT_SUMMARY + "<ul>"
					);
					b = false;
					a = true;
				}
				document.writeln(
					'<li><a href="' +
						SelfURL +
						LinkBackJoinChar +
						"zoom_query=" +
						queryForURL +
						metaParams +
						"&amp;zoom_cat%5B%5D=" +
						catit +
						"&amp;zoom_per_page=" +
						per_page +
						"&amp;zoom_and=" +
						andq +
						"&amp;zoom_sort=" +
						sort +
						'">' +
						catnames[catit]
				);
				document.writeln("</a> (" + CatCounter[catit] + ")</li>");
			}
		}
	}
	if (DisplayCatSummary == 1 && a == true) {
		document.writeln("</ul></div>");
	}
}
function ZoomShowPagesCount() {
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch) {
		return;
	}
	if (num_pages > 1) {
		document.writeln(
			'<div class="result_pagescount">' +
				num_pages +
				" " +
				STR_PAGES_OF_RESULTS +
				"</div>\n"
		);
	}
}
function RecLinkWordMatch(d, c) {
	var a = false;
	for (sw = 0; sw <= NumSearchWords; sw++) {
		if (sw == NumSearchWords) {
			match_result = wordcasecmp(d, queryForSearch);
		} else {
			if (UseWildCards[sw] == 1) {
				if (SearchAsSubstring == 0) {
					pattern = "^" + RegExpSearchWords[sw] + "$";
				} else {
					pattern = RegExpSearchWords[sw];
				}
				re = new RegExp(pattern, "g");
				match_result = d.search(re);
			} else {
				if (SearchAsSubstring == 0) {
					match_result = wordcasecmp(d, searchWords[sw]);
				} else {
					match_result = d.indexOf(searchWords[sw]);
				}
			}
			if (match_result == -1) {
				if (d.indexOf("*") != -1 || d.indexOf("?") != -1) {
					var b = "^" + pattern2regexp(d) + "$";
					re = new RegExp(b, "g");
					match_result = searchWords[sw].search(re);
				}
			}
		}
		if (match_result != -1) {
			a = true;
			if (num_recs_found == 0) {
				document.writeln('<div class="recommended">');
				document.writeln(
					'<div class="recommended_heading">' + STR_RECOMMENDED + "</div>"
				);
			}
			pgurl = pagedata[c][PAGEDATA_URL];
			pgtitle = pagedata[c][PAGEDATA_TITLE];
			pgdesc = pagedata[c][PAGEDATA_DESC];
			pgimage = pagedata[c][PAGEDATA_IMG];
			urlLink = pgurl;
			if (GotoHighlight == 1) {
				if (SearchAsSubstring == 1) {
					urlLink = RecLinkAddParamToURL(
						urlLink,
						"zoom_highlightsub=" + queryForURL
					);
				} else {
					urlLink = RecLinkAddParamToURL(
						urlLink,
						"zoom_highlight=" + queryForURL
					);
				}
			}
			if (PdfHighlight == 1) {
				if (urlLink.toLowerCase().indexOf(".pdf") != -1) {
					urlLink = urlLink + "#search=&quot;" + query + "&quot;";
				}
			}
			document.writeln('<div class="recommend_block">');
			if (UseZoomImage == 1) {
				if (pgimage.length > 1) {
					document.writeln('<div class="recommend_image">');
					document.writeln(
						'<a href="' +
							urlLink +
							'"' +
							zoom_target +
							'><img src="' +
							pgimage +
							'" alt="" class="recommend_image"></a>'
					);
					document.writeln("</div>");
				}
			}
			document.writeln('<div class="recommend_title">');
			document.writeln('<a href="' + urlLink + '"' + zoom_target + ">");
			if (pgtitle.length > 1) {
				PrintHighlightDescription(pgtitle);
			} else {
				PrintHighlightDescription(pgurl);
			}
			document.writeln("</a></div>");
			document.writeln('<div class="recommend_description">');
			PrintHighlightDescription(pgdesc);
			document.writeln("</div>");
			document.writeln('<div class="recommend_infoline">' + pgurl + "</div>");
			document.writeln("</div>");
			num_recs_found++;
			break;
		}
	}
	return a;
}
function ZoomShowRecommended() {
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch) {
		return;
	}
	if (Recommended == 1) {
		num_recs_found = 0;
		rec_count = recommended.length;
		for (rl = 0; rl < rec_count && num_recs_found < RecommendedMax; rl++) {
			sep = recommended[rl].lastIndexOf(" ");
			if (sep > -1) {
				rec_word = recommended[rl].slice(0, sep);
				rec_idx = parseInt(recommended[rl].slice(sep));
				if (rec_word.indexOf(",") != -1) {
					rec_multiwords = rec_word.split(",");
					for (rlm = 0; rlm < rec_multiwords.length; rlm++) {
						if (RecLinkWordMatch(rec_multiwords[rlm], rec_idx)) {
							break;
						}
					}
				} else {
					RecLinkWordMatch(rec_word, rec_idx);
				}
			}
		}
		if (num_recs_found > 0) {
			document.writeln("</div>");
		}
	}
}
function ZoomShowSorting() {
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch) {
		return;
	}
	if (matches > 1) {
		if (UseDateTime == 1) {
			document.writeln('<div class="sorting">');
			if (sort == 1) {
				document.writeln(
					'<a href="' +
						SelfURL +
						LinkBackJoinChar +
						"zoom_query=" +
						queryForURL +
						metaParams +
						"&amp;zoom_page=" +
						page +
						"&amp;zoom_per_page=" +
						per_page +
						query_zoom_cats +
						"&amp;zoom_and=" +
						andq +
						'&amp;zoom_sort=0">' +
						STR_SORTBY_RELEVANCE +
						"</a> / <b>" +
						STR_SORTEDBY_DATE +
						"</b>"
				);
			} else {
				document.writeln(
					"<b>" +
						STR_SORTEDBY_RELEVANCE +
						'</b> / <a href="' +
						SelfURL +
						LinkBackJoinChar +
						"zoom_query=" +
						queryForURL +
						metaParams +
						"&amp;zoom_page=" +
						page +
						"&amp;zoom_per_page=" +
						per_page +
						query_zoom_cats +
						"&amp;zoom_and=" +
						andq +
						'&amp;zoom_sort=1">' +
						STR_SORTBY_DATE +
						"</a>"
				);
			}
			document.writeln("</div>");
		}
	}
}
function ZoomShowPageNumbers() {
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch) {
		return;
	}
	if (num_pages > 1) {
		start_range = page - 10;
		if (start_range < 1) {
			start_range = 1;
		}
		end_range = page + 10;
		if (end_range > num_pages) {
			end_range = num_pages;
		}
		document.writeln(
			'<div class="result_pages"><b>' + STR_RESULT_PAGES + "</b> "
		);
		if (page > 1) {
			document.writeln(
				'<a href="' +
					SelfURL +
					LinkBackJoinChar +
					"zoom_query=" +
					queryForURL +
					metaParams +
					"&amp;zoom_page=" +
					(page - 1) +
					"&amp;zoom_per_page=" +
					per_page +
					query_zoom_cats +
					"&amp;zoom_and=" +
					andq +
					"&amp;zoom_sort=" +
					sort +
					'">&lt;&lt; ' +
					STR_RESULT_PAGES_PREVIOUS +
					"</a> "
			);
		}
		for (i = start_range; i <= end_range; i++) {
			if (i == page) {
				document.writeln(page + " ");
			} else {
				document.writeln(
					'<a href="' +
						SelfURL +
						LinkBackJoinChar +
						"zoom_query=" +
						queryForURL +
						metaParams +
						"&amp;zoom_page=" +
						i +
						"&amp;zoom_per_page=" +
						per_page +
						query_zoom_cats +
						"&amp;zoom_and=" +
						andq +
						"&amp;zoom_sort=" +
						sort +
						'">' +
						i +
						"</a> "
				);
			}
		}
		if (page != num_pages) {
			document.writeln(
				'<a href="' +
					SelfURL +
					LinkBackJoinChar +
					"zoom_query=" +
					queryForURL +
					metaParams +
					"&amp;zoom_page=" +
					(page + 1) +
					"&amp;zoom_per_page=" +
					per_page +
					query_zoom_cats +
					"&amp;zoom_and=" +
					andq +
					"&amp;zoom_sort=" +
					sort +
					'">' +
					STR_RESULT_PAGES_NEXT +
					" &gt;&gt;</a> "
			);
		}
		document.writeln("</div>");
	}
	if (ZoomInfo == 1) {
		document.writeln(
			'<center><p class="zoom_advertising">' +
				STR_POWEREDBY +
				' <a href="http://www.wrensoft.com/zoom/" target="_blank"><b>Zoom Search Engine</b></a></small></p></center>'
		);
	}
}
function ZoomShowSearchTime() {
	if (InitSearchCalled == false) {
		if (IsWarningGiven == false) {
			document.writeln(
				'<div class="results">This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.</div>'
			);
		}
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch) {
		return;
	}
	if (Timing == 1) {
		document.writeln(
			'<div class="searchtime"><br />' +
				STR_SEARCH_TOOK +
				" " +
				timeDifference / 1000 +
				" " +
				STR_SECONDS +
				".</div>\n"
		);
	}
}
function ZoomSearch() {
	var a = document.getElementById("loadingmsg");
	if (a) {
		a.style.display = "None";
	}
	ZoomInitSearch();
	ZoomShowSearchForm();
	ZoomShowHeading();
	ZoomShowSummary();
	ZoomShowCatSummary();
	ZoomShowPagesCount();
	ZoomShowRecommended();
	ZoomShowSorting();
	ZoomShowResults();
	ZoomShowPageNumbers();
	ZoomShowSearchTime();
}