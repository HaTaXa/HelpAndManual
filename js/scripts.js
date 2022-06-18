// (!) isEmptyObject-проверка объекта на пустоту
function isEmptyObject (obj) {
	for(let prop in obj) {
		if(obj.hasOwnProperty(prop)) return false;
	}
	return true; // - объект пустой
}
// (!) writeTopic-создать фрейм с темой топика
function writeTopic () {
	if (window.location.search !== "") {
		hmtopicvars.currP = hmnavpages.def = window.location.search.substring(1).replace(/:/g, "");
	}
	let frame = document.getElementById('hmcontent');
	if (frame !== null && typeof (frame) !== "undefined" && typeof (frame) === "object") return;
	frame = document.createElement('iframe');
	frame.id = "hmcontent";
	frame.name = "hmcontent";
	frame.classList.add('scroll-pane');
	frame.setAttribute('src', hmtopicvars.currP);
	frame.title = "Вкладка Тема";
	document.getElementById('idTopicBox').appendChild(frame);
}
// (!) setUpdateVariables-обновление глобальных переменных variables.js в гл.окне
function setUpdateVariables ( in_hmtopicvars = {}, in_hmnavpages = {}, in_hmpermalink = {} ) {
	if (isEmptyObject(in_hmtopicvars) === false || Object.keys(in_hmtopicvars).length !== 0 || JSON.stringify(in_hmtopicvars) !== "{}") { // - если переменная аргумента внутри объекта содержит ключ(-и) со значением
		for (const key in window.top.hmtopicvars) {
			for (const k in in_hmtopicvars) {
				if (key === k) {
					if (window.top.hmtopicvars[key] !== in_hmtopicvars[k]) {
						window.top.hmtopicvars[key] = in_hmtopicvars[k];
					}
				}
			}
		}
	}
	if (isEmptyObject(in_hmnavpages) === false || Object.keys(in_hmnavpages).length !== 0 || JSON.stringify(in_hmnavpages) !== "{}") { // - если переменная аргумента внутри объекта содержит ключ(-и) со значением
		for (const key in window.top.hmnavpages) {
			for (const k in in_hmnavpages) {
				if (key === k) {
					if (window.top.hmnavpages[key] !== in_hmnavpages[k]) {
						window.top.hmnavpages[key] = in_hmnavpages[k];
					}
				}
			}
		}
	}
	if (isEmptyObject(in_hmpermalink) === false || Object.keys(in_hmpermalink).length !== 0 || JSON.stringify(in_hmpermalink) !== "{}") { // - если переменная аргумента внутри объекта содержит ключ(-и) со значением
		for (const key in window.top.hmpermalink) {
			for (const k in in_hmpermalink) {
				if (key === k) {
					if (window.top.hmpermalink[key] !== in_hmpermalink[k]) {
						window.top.hmpermalink[key] = in_hmpermalink[k];
					}
				}
			}
		}
	}
	// X первичный вариант
	// if (window.location.origin === "file://") { // - при локальном использовании
	// (i) в Firefox не работает
	// 	console.error(`function setUpdateVariables(window.name: ${window.name}):\n window.location.origin: ${window.location.origin}`);
	// 	alert(`(!) Косяк: function setUpdateVariables(window.name: ${window.name}):\n window.location.origin: ${window.location.origin}, см.консоль.`);
	// } else {
		// let win = [];
		// if (window !== top) { win.push(window.top); }
		// // (i) window.top.frames возвращает коллекцию окон фреймов, а не сами фреймы как таковые
		// for (let i = 0; i < window.top.frames.length; i++) {
		// 	if (window.top.frames[i].name !== "hmkeywords" && window.top.frames[i].name !== "hmsearch" && window.top.frames[i].name !== window.name) {
		// 		win.push(window.top.frames[i]);
		// 	}
		// }
		// for (let w = 0; w < win.length; w++) {
		// 	// *topic_Settings.js
		// 	for (const key in win[w].hmtopicvars) {
		// 		if (Object.keys(in_hmtopicvars).length === 0 && in_hmtopicvars.constructor === Object) { // - если переменная аргумента не содержит ключа со значением. В том числе проверка конструктора
		// 			if (key in win[w].hmtopicvars === key in window.hmtopicvars) {
		// 				if (win[w].hmtopicvars[key] !== window.hmtopicvars[key]) {
		// 					win[w].hmtopicvars[key] = window.hmtopicvars[key];
		// 				}
		// 			}
		// 		} else {
		// 			if (key in win[w].hmtopicvars === key in in_hmtopicvars) {
		// 				if (win[w].hmtopicvars[key] !== in_hmtopicvars[key]) {
		// 					win[w].hmtopicvars[key] = in_hmtopicvars[key];
		// 				}
		// 			}
		// 		}
		// 	}
		// 	// *index_settings.js
		// 	for (let key in win[w].hmpermalink) {
		// 		if (Object.keys(in_hmpermalink).length === 0 && in_hmpermalink.constructor === Object) { // - если переменная аргумента не содержит ключа со значением. В том числе проверка конструктора
		// 			if (key in win[w].hmpermalink === key in window.hmpermalink) {
		// 				if (win[w].hmpermalink[key] !== window.hmpermalink[key]) {
		// 					win[w].hmpermalink[key] = window.hmpermalink[key];
		// 				}
		// 			}
		// 		} else {
		// 			if (key in win[w].hmpermalink === key in in_hmpermalink) {
		// 				if (win[w].hmpermalink[key] !== in_hmpermalink[key]) {
		// 					win[w].hmpermalink[key] = in_hmpermalink[key];
		// 				}
		// 			}
		// 		}
		// 	}
		// 	for (let key in win[w].hmnavpages) {
		// 		if (Object.keys(in_hmpermalink).length === 0 && in_hmpermalink.constructor === Object) { // - если переменная аргумента не содержит ключа со значением. В том числе проверка конструктора
		// 			if (key in win[w].hmnavpages === key in window.hmnavpages) {
		// 				if (win[w].hmnavpages[key] !== window.hmnavpages[key]) {
		// 					win[w].hmnavpages[key] = window.hmnavpages[key];
		// 				}
		// 			}
		// 		} else {
		// 			if (key in win[w].hmnavpages === key in in_hmnavpages) {
		// 				if (win[w].hmnavpages[key] !== in_hmnavpages[key]) {
		// 					win[w].hmnavpages[key] = in_hmnavpages[key];
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	// }
}
// (!) setToggleToolbarElement-переключение элемента на панели инструментов
function setToggleToolbarElement (elem, classNameOn = "", classNameOff = "", valueOnOff = "") {
	// *если elem - это id элемента
	if (typeof(elem) !== "undefined" || elem !== "" && typeof(elem) === "string") {
		if (valueOnOff === "on") {
			window.top.document.getElementById(elem).classList.remove(classNameOff);
			window.top.document.getElementById(elem).classList.add(classNameOn);
		} else if (valueOnOff == "off") {
			window.top.document.getElementById(elem).classList.remove(classNameOn);
			window.top.document.getElementById(elem).classList.add(classNameOff);
		}
	} else if (typeof(elem) !== "undefined" || elem !== null || typeof(elem) === "object" || elem === Object(elem)) {
		if (valueOnOff === "on") {
			elem.classList.remove(classNameOff);
			elem.classList.add(classNameOn);
		} else if (valueOnOff == "off") {
			elem.classList.remove(classNameOn);
			elem.classList.add(classNameOff);
		}
	}
}
// (!) setToolbarButtonsOnOff-включить/отключить кнопку панели инструментов
function setToolbarButtonsOnOff (elemId = "") {
	if (elemId === null || typeof(elemId) === "undefined" || typeof(elemId) !== "string" || elemId === "") return;
	switch (elemId) {
		case 'idExpandOn':
			// *кнопка развернуть/свернуть скрытый текст - доступна
			setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "on");
			break;
		case 'idExpandOff':
			// *кнопка развернуть/свернуть скрытый текст - нет доступа
			setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "off");
			break;
		case 'idPagePreviousOn':
			// *кнопка назад - доступна
			setToggleToolbarElement("idPagePreviousOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPagePreviousOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPagePreviousText", "nav-text-on", "nav-text-off", "on");
			break;
		case 'idPagePreviousOff':
			// *кнопка назад - нет доступа
			setToggleToolbarElement("idPagePreviousOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPagePreviousOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPagePreviousText", "nav-text-on", "nav-text-off", "off");
			break;
		case 'idPageNextOn':
			// *кнопка вперед - доступна
			setToggleToolbarElement("idPageNextOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPageNextOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPageNextText", "nav-text-on", "nav-text-off", "on");
			break;
		case 'idPageNextOff':
			// *кнопка вперед - нет доступа
			setToggleToolbarElement("idPageNextOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPageNextOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPageNextText", "nav-text-on", "nav-text-off", "off");
			break;
		case 'idTopicTab':
			// *кнопка открепить - нет доступа
			setToggleToolbarElement("idUndockTabOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idUndockTabOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idUndockTabText", "nav-text-on", "nav-text-off", "off");
			// *кнопка новая вкладка - доступна
			setToggleToolbarElement("idNewTabOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idNewTabOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idNewTabText", "nav-text-on", "nav-text-off", "on");
			// *кнопка развернуть/свернуть скрытый текст - доступна, если в тексте текущей темы присутствует скрытый контент
			if (window.top.hmtopicvars.btnExpand === "idExpandOn") {
				setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "on");
				setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "off");
				setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "on");
			} else if (window.top.hmtopicvars.btnExpand === "idExpandOff") {
				setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "off");
				setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "on");
				setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "off");
			}
			// *кнопка постоянная ссылка - доступна
			setToggleToolbarElement("idPermalinkOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPermalinkOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPermalinkText", "nav-text-on", "nav-text-off", "on");
			// *кнопка email - доступна
			setToggleToolbarElement("idFeedBackOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idFeedBackOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idFeedBackText", "nav-text-on", "nav-text-off", "on");
			// *кнопка печать - доступна
			setToggleToolbarElement("idPrinterOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPrinterOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPrinterText", "nav-text-on", "nav-text-off", "on");
			break;
		case 'idIndexTab': case 'idSearchTab':
			// *кнопка открепить - доступна
			setToggleToolbarElement("idUndockTabOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idUndockTabOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idUndockTabText", "nav-text-on", "nav-text-off", "on");
			// *кнопка новая вкладка - нет доступа
			setToggleToolbarElement("idNewTabOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idNewTabOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idNewTabText", "nav-text-on", "nav-text-off", "off");
			// *кнопка развернуть/свернуть скрытый текст - нет доступа
			setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "off");
			// *кнопка постоянная ссылка - нет доступа
			setToggleToolbarElement("idPermalinkOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPermalinkOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPermalinkText", "nav-text-on", "nav-text-off", "off");
			// *кнопка email - нет доступа
			setToggleToolbarElement("idFeedBackOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idFeedBackOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idFeedBackText", "nav-text-on", "nav-text-off", "off");
			// *кнопка печать - нет доступа
			setToggleToolbarElement("idPrinterOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPrinterOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPrinterText", "nav-text-on", "nav-text-off", "off");
			break;
		// 'для остальных вкладок, кот.будут созданы как новые вкладки
		default:
			// *кнопка открепить - доступна
			setToggleToolbarElement("idUndockTabOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idUndockTabOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idUndockTabText", "nav-text-on", "nav-text-off", "on");
			// *кнопка новая вкладка - нет доступа
			setToggleToolbarElement("idNewTabOn", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idNewTabOff", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idNewTabText", "nav-text-on", "nav-text-off", "off");
			// *кнопка развернуть/свернуть скрытый текст - доступна, если в тексте текущей темы присутствует скрытый контент
			if (window.top.hmtopicvars.btnExpand === "idExpandOn") {
				setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "on");
				setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "off");
				setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "on");
			} else if (window.top.hmtopicvars.btnExpand === "idExpandOff") {
				setToggleToolbarElement("idExpandOn", "nav-icon", "nav-icon-H", "off");
				setToggleToolbarElement("idExpandOff", "nav-icon", "nav-icon-H", "on");
				setToggleToolbarElement("idExpandText", "nav-text-on", "nav-text-off", "off");
			}
			// *кнопка постоянная ссылка - доступна
			setToggleToolbarElement("idPermalinkOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPermalinkOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPermalinkText", "nav-text-on", "nav-text-off", "on");
			// *кнопка email - доступна
			setToggleToolbarElement("idFeedBackOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idFeedBackOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idFeedBackText", "nav-text-on", "nav-text-off", "on");
			// *кнопка печать - доступна
			setToggleToolbarElement("idPrinterOn", "nav-icon", "nav-icon-H", "on");
			setToggleToolbarElement("idPrinterOff", "nav-icon", "nav-icon-H", "off");
			setToggleToolbarElement("idPrinterText", "nav-text-on", "nav-text-off", "on");
		break;
	}
}
// (!) setUpdateElements-обновление некоторых элементов: ссылок в кнопках на пан.инструментов и наименование главной вкладки в пан.тема топика
function setUpdateElements () {
	// *обновляем адресс ссылок в кнопках на пан.инструментов
	let elem = window.top.document.getElementById('idLinkPageHome');
	if (elem !== null || typeof (elem) === "object" || elem === Object(elem)) {
		elem.setAttribute('href', window.top.hmtopicvars.homeP);
	}
	elem = window.top.document.getElementById('idLinkPagePrevious');
	if (elem !== null || typeof (elem) === "object" || elem === Object(elem)) {
		if (window.top.hmtopicvars.prevP === "") {
			elem.setAttribute('href', '#');
			setToolbarButtonsOnOff('idPagePreviousOff');
		} else {
			setToolbarButtonsOnOff('idPagePreviousOn');
			elem.setAttribute('href', window.top.hmtopicvars.prevP);
		}
	}
	elem = window.top.document.getElementById('idLinkPageNext');
	if (elem !== null || typeof (elem) === "object" || elem === Object(elem)) {
		if (window.top.hmtopicvars.nextP === "") {
			elem.setAttribute('href', '#');
			setToolbarButtonsOnOff('idPageNextOff');
		} else {
			setToolbarButtonsOnOff('idPageNextOn');
			elem.setAttribute('href', window.top.hmtopicvars.nextP);
		}
	}
	// *обновляем наименование главной вкладки
	elem = window.top.document.getElementById('idTopicTab');
	if (elem !== null || typeof (elem) === "object" || elem === Object(elem)) {
		elem.querySelector('a').setAttribute('data', window.top.hmtopicvars.titleP);
		elem.querySelector('a').setAttribute('title', window.top.hmtopicvars.titleP);
		elem.querySelector('span').textContent = window.top.hmtopicvars.titleP;
	}
	// *обновляем ссылку в меню вкладок
	elem = window.top.document.getElementById('idTabList0');
	if (elem !== null || typeof (elem) === "object" || elem === Object(elem)) {
		elem.innerHTML = "Актуальная Тема:&nbsp;" + window.top.hmtopicvars.titleP;
	}
}
// (!) setUpdateTabsMenuList-обновление списка Меню вкладок и выделение ссылки на текущую вкладку
function setUpdateTabsMenuList (tabs) {
	let tabsList = window.top.document.getElementById('idTabsList');
	let tabNum, tabList;
	// 'цикл for...of
	for (const tab of tabs.children) {
		tabNum = tab.getAttribute('tabnum');
		for (const list of tabsList.children) {
			tabList = list.getAttribute('tablist');
			if (tabNum === tabList) {
				// *для 1-х 3-х вкладок // HACK: пока что без учета создаваемых юзером вкладок
				if (((tabNum >= 0) && (tabNum < 3)) && ((tabList >= 0) && (tabList < 3))) {
					// *выделяем ссылку на текущую вкладку
					if (tab.classList.contains('topic-tab-current')) {
						list.children[0].style.fontWeight = "bold";
					} else {
						list.children[0].removeAttribute('style');
						// list.children[0].style.removeProperty('fontWeight'); // - удалить css св-во
					}
					// *сверяем скрытые вкладки
					if (tab.style.display === "none") {
						if (list.style.display !== "none") {
							list.style.display = "none";
						}
					} else if (tab.style.display !== "none") {
						if (list.style.display === "none") {
							list.removeAttribute('style');
							// list.style.removeProperty('display'); // - удалить css св-во
						}
					}
				}
			}
		}
	}
	// 'цикл for...in
	// for (let i = 0; i < tabs.children.length; i++) {
	// 	tabNum = +tabs.children[i].getAttribute('tabnum');
	// 	for (let k = 0; k < tabsList.children.length; k++) {
	// 		tabList = +tabsList.children[k].getAttribute('tablist');
	// 		if (tabNum === tabList) {
	// 			// *для 1-х 3-х вкладок
	// 			if (((tabNum >= 0) && (tabNum < 3)) && ((tabList >= 0) && (tabList < 3))) {
	// 				// *выделяем ссылку на текущую вкладку
	// 				if (tabs.children[i].classList.contains('topic-tab-current')) {
	// 					tabsList.children[k].children[0].style.fontWeight = "bold";
	// 				} else {
	// 					tabsList.children[k].children[0].removeAttribute('style');
	// 					// tabsList.children[k].children[0].style.removeProperty('fontWeight'); // - удалить css св-во
	// 				}
	// 				// *сверяем скрытые вкладки
	// 				if (tabs.children[i].style.display === "none") {
	// 					if (tabsList.children[k].style.display !== "none") {
	// 						tabsList.children[k].style.display = "none";
	// 					}
	// 				} else if (tabs.children[i].style.display !== "none") {
	// 					if (tabsList.children[k].style.display === "none") {
	// 						// tabsList.children[k].style.removeProperty('display'); // - удалить css св-во
	// 						tabsList.children[k].removeAttribute('style');
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
}
// (!) setTabShowHide-показать/скрыть текущую вкладку
function setTabShowHide (currentTab, valueShowHide = "") {
	if (currentTab === null || typeof (currentTab) === "undefined" || typeof (currentTab) !== "object" || currentTab !== Object(currentTab)) {
		console.error(`(!) Косяк - не удалось показать/скрыть текущую вкладку:\n function setTabShowHide (currentTab: ${currentTab} / ${typeof(currentTab)}, valueShowHide = "${valueShowHide}")`);
		alert(`(!) Косяк - не удалось показать/скрыть текущую вкладку, см.консоль`);
		return;
	}
	let tabs = currentTab.parentElement;
	let boxes = window.top.document.getElementById('idContentBox');
	let boxNum = +currentTab.getAttribute('tabnum');
	if (valueShowHide === "show") {
		if (currentTab.classList.contains('topic-tab-current')) return;
		// *делаем вкладку текущей и выводим ее контентную часть
		// currentTab.style.display = null; // - удаляем значение св-ва
		currentTab.removeAttribute('style'); // - удаляем атрибут "стиль"
		currentTab.classList.add('topic-tab-current');
		boxes.children[boxNum].removeAttribute('style');
		// boxes.children[boxNum].style.display = null;
		for (let i = 0; i < tabs.children.length; i++) {
			if (tabs.children[i].id !== currentTab.id) {
				tabs.children[i].classList.remove('topic-tab-current');
				boxes.children[i].style.display = "none";
			}
		}
		setToolbarButtonsOnOff(currentTab.id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
	} else if (valueShowHide === "hide") {
		// *переназначаем предыдущей вкладке значение на "текущая", если текущая вкладка была активной
		if (currentTab.classList.contains('topic-tab-current')) {
			let visibleTabs = [];
			let visibleBoxes = [];
			// *просматриваем все вкладки и исключаем скрытые
			for (let i = 0; i < tabs.children.length; i++) {
				if (tabs.children[i].style.display !== "none") {
					visibleTabs.push(tabs.children[i]);
					visibleBoxes.push(boxes.children[i]);
				}
			}
			for (let i = 0; i < visibleTabs.length; i++) {
				if (visibleTabs[i].id === currentTab.id) {
					visibleTabs[i].classList.remove('topic-tab-current');
					visibleTabs[i].style.display = "none";
					visibleBoxes[i].style.display = "none";
					// - делаем текущей предыдущую вкладку и ее контентную часть
					visibleTabs[i - 1].classList.add('topic-tab-current');
					visibleBoxes[i - 1].removeAttribute('style');
					setToolbarButtonsOnOff(visibleTabs[i - 1].id); // - меняем состояние вкл/выкл группы кнопок на панели инструментов
				} else {
					visibleTabs[i].classList.remove('topic-tab-current');
					visibleBoxes[i].style.display = "none";
				}
			}
		} else { // - делаем текущую вкладку не активной и скрываем ее, и ее контентную часть
			currentTab.style.display = "none";
			boxes.children[boxNum].style.display = "none";
		}
	}
	setUpdateTabsMenuList(tabs); // - обновляем список Меню вкладок и выделяем ссылку на текущую вкладку
}
// (!) setToggleIcon-изменение иконки при переключении скрытого текста в топике
function setToggleIcon (elem) {
	if (elem === null || typeof (elem) === "undefined" || typeof (elem) !== "object" || elem !== Object(elem)) {
		console.error(`(!) Косяк - не удалось выполнить изменение иконки при переключении скрытого текста в топике:\n function setToggleIcon (elem: ${elem} / ${typeof(elem)})`);
		alert(`(!) Косяк - не удалось выполнить изменение иконки при переключении скрытого текста в топике, см.консоль.`);
		return;
	}
	if (elem.classList.contains('toggle-icon')) {
		if (elem.getAttribute('src') === "image/tgl_gb0.png") {
			elem.setAttribute('src', 'image/tgl_gb1.png');
		} else if (elem.getAttribute('src') === "image/tgl_gb1.png") {
			elem.setAttribute('src', 'image/tgl_gb0.png');
		} else if (elem.getAttribute('src') === "image/tgl_expand1.gif") {
			elem.setAttribute('src', 'image/tgl_collapse1.gif');
		} else if (elem.getAttribute('src') === "image/tgl_collapse1.gif") {
			elem.setAttribute('src', 'image/tgl_expand1.gif');
		} else {
			console.error(`(!) Косяк: не удалось выполнить изменение иконки при переключении скрытого текста в топике:\n function setToggleIcon (elem: ${elem} / ${typeof(elem)}):\n не известен аттрибут: ${elem.tagName}, ${elem.id}.src: ${elem.getAttribute('src')}`);
			alert(`(!) Косяк: не удалось выполнить изменение иконки при переключении скрытого текста в топике - не известен аттрибут "src", см.консоль.`);
		}
	} else {
		console.error(`(!) Косяк: не удалось выполнить изменение иконки при переключении скрытого текста в топике:\n function setToggleIcon (elem: ${elem} / ${typeof(elem)}):\n в элементе отсутствует class: toggle-icon`);
		alert(`(!) Косяк: не удалось выполнить изменение иконки при переключении скрытого текста в топике - в элементе отсутствует class, см.консоль.`);
	}
}
// (!) setToggleElement-развернуть/свернуть скрытый текст
function setToggleElement (elem) {
	if (elem === null || typeof (elem) === "undefined" || typeof (elem) !== "object" || elem !== Object(elem)) {
		console.error(`(!) Косяк: не удалось развернуть/свернуть скрытый текст:\n function setToggleElement (elem: ${elem} / ${typeof(elem)}):\n отсутствует элемент <p></p>`);
		alert(`(!) Косяк: не удалось развернуть/свернуть скрытый текст - отсутствует элемент <p></p>, см.консоль.`);
		return;
	}
	if (elem.classList.contains('toggle-hidden') || elem.classList.contains('toggle-shown')) {
		for (let i = 0; i < elem.children.length; i++) {
			if (elem.children[i].tagName === "IMG" && elem.children[i].classList.contains('toggle-icon')) {
				setToggleIcon(elem.children[i]);
			} else if (elem.children[i].tagName === "SPAN" && elem.children[i].classList.contains('toggle-content')) {
				if (elem.children[i].classList.contains('toggle-collapse')) {
					elem.children[i].classList.remove('toggle-collapse');
					elem.classList.remove('toggle-hidden');
					elem.classList.add('toggle-shown');
				} else {
					elem.children[i].classList.add('toggle-collapse');
					elem.classList.add('toggle-hidden');
					elem.classList.remove('toggle-shown');
				}
			}
		}
		if (elem.nextElementSibling !== null && typeof (elem.nextElementSibling) === "object") {
			if (elem.nextElementSibling.tagName === "DIV" && elem.nextElementSibling.classList.contains('toggle-content')) {
				if (elem.nextElementSibling.classList.contains('toggle-collapse')) {
					elem.nextElementSibling.classList.remove('toggle-collapse');
					elem.classList.remove('toggle-hidden');
					elem.classList.add('toggle-shown');
				} else {
					elem.nextElementSibling.classList.add('toggle-collapse');
					elem.classList.remove('toggle-shown');
					elem.classList.add('toggle-hidden');
				}
			}
		}
	} else {
		console.error(`(!) Косяк: не удалось развернуть/свернуть скрытый текст:\n function setToggleElement (elem: ${elem} / ${typeof(elem)}):\n у элемента отсутствует class: toggle-hidden/toggle-shown`);
		alert(`(!) Косяк: не удалось развернуть/свернуть скрытый текст - у элемента отсутствует class, см.консоль.`);
	}
}
// (!) permaLinkDefault-очищение инфо-подсказок при закрытии окна Постоянная ссылка
function permaLinkDefault () {
	let elem = window.top.document.getElementById('idTextArea');
	if (elem !== null || typeof (elem) !== "undefined" || typeof (elem) === "object" || elem === Object(elem)) {
		if (elem.labels[0].innerHTML !== "") {
			elem.labels[0].innerHTML = "";
			elem.labels[0].classList.remove('permalink-error');
			elem.labels[0].classList.add('permalink-info');
		}
	}
}
// (!) setShowHideWindow-показать/скрыть всплывающее окно
function setShowHideWindow(elem, valueShowHide = "") {
	if (elem === null || typeof (elem) === "undefined" || typeof (elem) !== "object" || elem !== Object(elem)) {
		console.error(`(!) Косяк - не удалось показать/скрыть всплывающее окно:\n function setShowHideWindow (elem: ${elem} / ${typeof(elem)}, valueShowHide = "${valueShowHide}")`);
		alert(`(!) Косяк - не удалось показать/скрыть всплывающее окно, см.консоль.`);
		return;
	}
	if (typeof (valueShowHide) === "undefined" || typeof (valueShowHide) === "string" && valueShowHide === "") {
		if (elem.style.display === "none") { // - в качестве переключателя
			elem.removeAttribute('style');
			// elem.focus();
		} else {
			// document.activeElement.blur();
			elem.style.display = "none";
		}
	} else {
		if (valueShowHide === "show") {
			elem.removeAttribute('style');
		} else if (valueShowHide === "hide") {
			elem.style.display = "none";
		}
	}
}
// (!) windowOpen-открытие в новом окне браузера
function windowOpen (htmlFileName = "", winProp) {
	if (htmlFileName === null || typeof(htmlFileName) === "undefined" || typeof(htmlFileName) !== "string" || htmlFileName === "") {
		console.error(`(!) Косяк - не удалось выполнить открытие в новом окне браузера:\n function windowOpen (htmlFileName = "${htmlFileName}", winProp: ${winProp})`);
		alert(`(!) Косяк - не удалось выполнить открытие в новом окне браузера, см.консоль.`);
		return;
	}
	// window.open("","","width=250,height=250"); // - пример открытия пустого окна
	// // let windowProperties = 'toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=yes,width=900,height=700';
	// // let windowProperties = 'left=100,top=100,width=350,height=250,menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
	if (htmlFileName === "") {
		htmlFileName = window.top.hmtopicvars.currP;
	}
	window.open(htmlFileName, "", winProp);
}