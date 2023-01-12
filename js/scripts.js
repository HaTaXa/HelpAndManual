// (!) isEmptyObject-проверка объекта на пустоту. Не очень большое доверие - взято с просторов интернета
function isEmptyObject(obj) {
	for(let prop in obj) {
		if(obj.hasOwnProperty(prop)) return false; // 'The hasOwnProperty() метод возвращает true, если объект содержит указанное свойство, которое является прямым свойством этого объекта, а не унаследованным
	}
	return true; // - объект пустой
}
// (!) writeTopic-создать фрейм с темой топика
function writeTopic() {
	if (window.location.search !== "") {
		hmtopicvars.currP = hmnavpages.def = window.location.search.substring(1).replace(/:/g, "");
	}
	let frame = document.getElementById('hmcontent');
	if (frame !== null && typeof (frame) !== "undefined" && typeof (frame) === "object" || frame === Object(frame)) return;
	frame = document.createElement('iframe');
	frame.id = "hmcontent";
	frame.name = "hmcontent";
	frame.classList.add('scroll-pane');
	frame.setAttribute('src', hmtopicvars.currP);
	frame.title = "Вкладка Тема";
	document.getElementById('idTopicBox').appendChild(frame);
}
// (!) jsLightboxLink-Ссылка на лайтбокс js
function jsLightboxLink() { // TODO: 'ссылки временно прописаны статически в файлах: standartNPAbssGlavbyx.html и index.js
	// <script src="js/lightbox.js"></script>
	if (window === top || window.name === "") {

	} else if (window === self || self !== top && window.name === "hmcontent") {

	} else {

	}
}
// (!) setUpdateVariables-обновление глобальных переменных variables.js в гл.окне
function setUpdateVariables(in_hmtopicvars = {}, in_hmnavpages = {}, in_hmpermalink = {}) {
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
// (!) setToggleToolbarElement-переключение элемента на пан.инструментов
function setToggleToolbarElement(elem, classNameOn = "", classNameOff = "", valueOnOff = "") {
	if (typeof(classNameOn) === "undefined" || classNameOn === "" && (classNameOn === String(classNameOn) || typeof(classNameOn) === "string")) {
		console.error(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена:\n function setToggleToolbarElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, classNameOn: "${classNameOn}", classNameOff: "${classNameOff}", valueOnOff: "${valueOnOff}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена, см.консоль.`);
		return;
	} else if (typeof(classNameOff) === "undefined" || classNameOff === "" && (classNameOff === String(classNameOff) || typeof(classNameOff) === "string")) {
		console.error(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена:\n function setToggleToolbarElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, classNameOn: "${classNameOn}", classNameOff: "${classNameOff}", valueOnOff: "${valueOnOff}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена, см.консоль.`);
		return;
	}
	// *если elem - это строка, например id элемента
	if (typeof(elem) !== "undefined" || elem !== "" && (elem === String(elem) || typeof(elem) === "string")) {
		if (valueOnOff === "on") {
			window.top.document.getElementById(elem).classList.remove(classNameOff);
			window.top.document.getElementById(elem).classList.add(classNameOn);
		} else if (valueOnOff == "off") {
			window.top.document.getElementById(elem).classList.remove(classNameOn);
			window.top.document.getElementById(elem).classList.add(classNameOff);
		} else {
			console.error(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена:\n function setToggleToolbarElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, classNameOn: "${classNameOn}", classNameOff: "${classNameOff}", valueOnOff: "${valueOnOff}"): window."${window.name}", location.origin: ${location.origin}`);
			alert(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена, см.консоль.`);
			return;
		}
	} else if (typeof(elem) !== "undefined" || elem !== null && (elem === Object(elem) || typeof(elem) === "object")) {
		if (valueOnOff === "on") {
			elem.classList.remove(classNameOff);
			elem.classList.add(classNameOn);
		} else if (valueOnOff == "off") {
			elem.classList.remove(classNameOn);
			elem.classList.add(classNameOff);
		} else {
			console.error(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена:\n function setToggleToolbarElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, classNameOn: "${classNameOn}", classNameOff: "${classNameOff}", valueOnOff: "${valueOnOff}"): window."${window.name}", location.origin: ${location.origin}`);
			alert(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена, см.консоль.`);
			return;
		}
	} else {
		console.error(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена:\n function setToggleToolbarElement(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, classNameOn: "${classNameOn}", classNameOff: "${classNameOff}", valueOnOff: "${valueOnOff}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена, см.консоль.`);
		return;
	}
}
// (!) setToolbarButtonsOnOff-включить/отключить кнопку пан.инструментов
function setToolbarButtonsOnOff (elemId = "") {
	if (typeof(elemId) === "undefined" || elemId === "" && (elemId === String(elemId) || typeof(elemId) === "string")) {
		console.error(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена:\n function setToolbarButtonsOnOff(elemId: typeof(${typeof(elemId)}), Object(${Object(elemId)}), ${elemId}): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось осуществить переключение элемента(-ов) - переменная аргумента не определена, см.консоль.`);
		return;
	}
	switch (elemId) {
		case 'idExpandOn':
			// *кнопка развернуть/свернуть скрытый контент - доступна
			setToggleToolbarElement("idExpandOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idExpandOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idExpandText", "btn-text-on", "btn-text-off", "on");
			break;
		case 'idExpandOff':
			// *кнопка развернуть/свернуть скрытый контент - нет доступа
			setToggleToolbarElement("idExpandOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idExpandOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idExpandText", "btn-text-on", "btn-text-off", "off");
			break;
		case 'idPagePreviousOn':
			// *кнопка назад - доступна
			setToggleToolbarElement("idPagePreviousOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPagePreviousOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPagePreviousText", "btn-text-on", "btn-text-off", "on");
			break;
		case 'idPagePreviousOff':
			// *кнопка назад - нет доступа
			setToggleToolbarElement("idPagePreviousOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPagePreviousOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPagePreviousText", "btn-text-on", "btn-text-off", "off");
			break;
		case 'idPageNextOn':
			// *кнопка вперед - доступна
			setToggleToolbarElement("idPageNextOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPageNextOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPageNextText", "btn-text-on", "btn-text-off", "on");
			break;
		case 'idPageNextOff':
			// *кнопка вперед - нет доступа
			setToggleToolbarElement("idPageNextOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPageNextOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPageNextText", "btn-text-on", "btn-text-off", "off");
			break;
		case 'idTopicTab':
			// *кнопка открепить - нет доступа
			setToggleToolbarElement("idUndockTabOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idUndockTabOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idUndockTabText", "btn-text-on", "btn-text-off", "off");
			// *кнопка новая вкладка - доступна
			setToggleToolbarElement("idNewTabOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idNewTabOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idNewTabText", "btn-text-on", "btn-text-off", "on");
			// *кнопка развернуть/свернуть скрытый контент - доступна, если в тексте текущей темы присутствует скрытый контент
			if (window.top.hmtopicvars.btnExpand === "idExpandOn") {
				setToggleToolbarElement("idExpandOn", "btn-icon", "btn-icon-H", "on");
				setToggleToolbarElement("idExpandOff", "btn-icon", "btn-icon-H", "off");
				setToggleToolbarElement("idExpandText", "btn-text-on", "btn-text-off", "on");
			} else if (window.top.hmtopicvars.btnExpand === "idExpandOff") {
				setToggleToolbarElement("idExpandOn", "btn-icon", "btn-icon-H", "off");
				setToggleToolbarElement("idExpandOff", "btn-icon", "btn-icon-H", "on");
				setToggleToolbarElement("idExpandText", "btn-text-on", "btn-text-off", "off");
			}
			// *кнопка постоянная ссылка - доступна
			setToggleToolbarElement("idPermalinkOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPermalinkOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPermalinkText", "btn-text-on", "btn-text-off", "on");
			// *кнопка email - доступна
			setToggleToolbarElement("idFeedBackOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idFeedBackOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idFeedBackText", "btn-text-on", "btn-text-off", "on");
			// *кнопка печать - доступна
			setToggleToolbarElement("idPrinterOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPrinterOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPrinterText", "btn-text-on", "btn-text-off", "on");
			break;
		case 'idIndexTab': case 'idSearchTab':
			// *кнопка открепить - доступна
			setToggleToolbarElement("idUndockTabOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idUndockTabOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idUndockTabText", "btn-text-on", "btn-text-off", "on");
			// *кнопка новая вкладка - нет доступа
			setToggleToolbarElement("idNewTabOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idNewTabOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idNewTabText", "btn-text-on", "btn-text-off", "off");
			// *кнопка развернуть/свернуть скрытый контент - нет доступа
			setToggleToolbarElement("idExpandOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idExpandOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idExpandText", "btn-text-on", "btn-text-off", "off");
			// *кнопка постоянная ссылка - нет доступа
			setToggleToolbarElement("idPermalinkOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPermalinkOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPermalinkText", "btn-text-on", "btn-text-off", "off");
			// *кнопка email - нет доступа
			setToggleToolbarElement("idFeedBackOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idFeedBackOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idFeedBackText", "btn-text-on", "btn-text-off", "off");
			// *кнопка печать - нет доступа
			setToggleToolbarElement("idPrinterOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPrinterOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPrinterText", "btn-text-on", "btn-text-off", "off");
			break;
		// 'для остальных вкладок, кот.будут созданы как новые вкладки
		default:
			// *кнопка открепить - доступна
			setToggleToolbarElement("idUndockTabOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idUndockTabOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idUndockTabText", "btn-text-on", "btn-text-off", "on");
			// *кнопка новая вкладка - нет доступа
			setToggleToolbarElement("idNewTabOn", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idNewTabOff", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idNewTabText", "btn-text-on", "btn-text-off", "off");
			// *кнопка развернуть/свернуть скрытый контент - доступна, если в тексте текущей темы присутствует скрытый контент
			if (window.top.hmtopicvars.btnExpand === "idExpandOn") {
				setToggleToolbarElement("idExpandOn", "btn-icon", "btn-icon-H", "on");
				setToggleToolbarElement("idExpandOff", "btn-icon", "btn-icon-H", "off");
				setToggleToolbarElement("idExpandText", "btn-text-on", "btn-text-off", "on");
			} else if (window.top.hmtopicvars.btnExpand === "idExpandOff") {
				setToggleToolbarElement("idExpandOn", "btn-icon", "btn-icon-H", "off");
				setToggleToolbarElement("idExpandOff", "btn-icon", "btn-icon-H", "on");
				setToggleToolbarElement("idExpandText", "btn-text-on", "btn-text-off", "off");
			}
			// *кнопка постоянная ссылка - доступна
			setToggleToolbarElement("idPermalinkOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPermalinkOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPermalinkText", "btn-text-on", "btn-text-off", "on");
			// *кнопка email - доступна
			setToggleToolbarElement("idFeedBackOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idFeedBackOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idFeedBackText", "btn-text-on", "btn-text-off", "on");
			// *кнопка печать - доступна
			setToggleToolbarElement("idPrinterOn", "btn-icon", "btn-icon-H", "on");
			setToggleToolbarElement("idPrinterOff", "btn-icon", "btn-icon-H", "off");
			setToggleToolbarElement("idPrinterText", "btn-text-on", "btn-text-off", "on");
		break;
	}
}
// (!) setUpdateElements-обновление некоторых элементов: кнопки на пан.инструментов и наименование гл.вкладки в пан.тема топика, ссылку на текущую вкладку в меню вкладок
function setUpdateElements () {
	// *обновляем адресс ссылок в кнопках на пан.инструментов
	let elem = window.top.document.getElementById('idLinkPageHome');
	if (typeof(elem) !== "undefined" || elem !== null && (elem === Object(elem) || typeof (elem) === "object")) {
		elem.setAttribute('href', window.top.hmtopicvars.homeP);
	}
	elem = window.top.document.getElementById('idLinkPagePrevious');
	if (typeof(elem) !== "undefined" || elem !== null && (elem === Object(elem) || typeof (elem) === "object")) {
		if (window.top.hmtopicvars.prevP === "") {
			elem.setAttribute('href', '#');
			setToolbarButtonsOnOff('idPagePreviousOff');
		} else {
			setToolbarButtonsOnOff('idPagePreviousOn');
			elem.setAttribute('href', window.top.hmtopicvars.prevP);
		}
	}
	elem = window.top.document.getElementById('idLinkPageNext');
	if (typeof(elem) !== "undefined" || elem !== null && (elem === Object(elem) || typeof (elem) === "object")) {
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
	if (typeof(elem) !== "undefined" || elem !== null && (elem === Object(elem) || typeof (elem) === "object")) {
		elem.querySelector('a').setAttribute('data', window.top.hmtopicvars.titleP);
		elem.querySelector('a').setAttribute('title', window.top.hmtopicvars.titleP);
		elem.querySelector('span').textContent = window.top.hmtopicvars.titleP;
	}
	// *обновляем ссылку на текущую вкладку в меню вкладок
	elem = window.top.document.getElementById('idTabList0');
	if (typeof(elem) !== "undefined" || elem !== null && (elem === Object(elem) || typeof (elem) === "object")) {
		elem.innerHTML = "Актуальная Тема:&nbsp;" + window.top.hmtopicvars.titleP;
	}
}
// (!) setUpdateTabsMenuList-обновление списка Меню вкладок и выделение ссылки на текущую вкладку
function setUpdateTabsMenuList (tabs) {
	if (typeof(tabs) === "undefined" || tabs === null && (tabs === Object(tabs) || typeof(tabs) === "object")) {
		console.error(`(!) Косяк: не удалось создать изо.во весь экран - переменная аргумента не определена:\n function setUpdateTabsMenuList(tabs: typeof(${typeof(tabs)}), Object(${Object(tabs)}), ${tabs}): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось создать изображение во весь экран - переменная аргумента не определена, см.консоль.`);
		return;
	}
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
	if (typeof (currentTab) === "undefined" || currentTab === null && (currentTab === Object(currentTab) || typeof (currentTab) === "object")) {
		console.error(`(!) Косяк - не удалось показать/скрыть текущую вкладку - переменная аргумента не определена:\n function setTabShowHide (currentTab: typeof(${typeof(currentTab)}), Object(${Object(currentTab)}), ${currentTab}, valueShowHide: "${valueShowHide}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк - не удалось показать/скрыть текущую вкладку - переменная аргумента не определена, см.консоль`);
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
	} else {
		console.error(`(!) Косяк - не удалось показать/скрыть текущую вкладку - переменная аргумента не определена:\n function setTabShowHide (currentTab: typeof(${typeof(currentTab)}), Object(${Object(currentTab)}), ${currentTab}, valueShowHide: "${valueShowHide}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк - не удалось показать/скрыть текущую вкладку - переменная аргумента не определена, см.консоль`);
		return;
	}
	setUpdateTabsMenuList(tabs); // - обновляем список Меню вкладок и выделяем ссылку на текущую вкладку
}
// (!) animationOffset-анимационное смещение для: 1) вкладок на панели тема топика, 2) слайдера изо в скрытом контенте
function animationOffset(elem) {
	// 'elem - slider-track
	if (typeof(elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк - не удалось воспроизвести анимацию - переменная аргумента не определена:\n function animationOffset(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк: не удалось воспроизвести анимацию - переменная аргумента не определена, см.консоль.`);
		return;
	}
	if (elem.hasAttribute('id') || elem.hasOwnProperty('id') || elem.getAttribute('id') !== null) { // *для вкладок на панели тема топика
		let topicTabs = document.getElementById('idTopicTabs');
		if (typeof(topicTabs) === "undefined" || topicTabs === null && (topicTabs === Object(topicTabs) || typeof(topicTabs) === "object")) {
			console.error(`(!) Косяк - не удалось воспроизвести анимацию - не найден элемент:\n function animationOffset(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n topicTabs: typeof(${typeof(topicTabs)}) / Object(${Object(topicTabs)}) / ${topicTabs}`);
			alert(`(!) Косяк: не удалось воспроизвести анимацию - не найден элемент, см.консоль.`);
			return;
		}
		// topicTabs.style.animationFillMode = "backwards"; // Элемент сохранит стиль первого ключевого кадра на протяжении периода animation-delay. Первый ключевой кадр определяется значением animation-direction
		switch (elem.id) {
			case 'idTabFirst': case 'idTabPrevious':
				topicTabs.style.animation = "jumpToRight"; // имя @keyframes в файле styles.css
				break;
			case 'idTabNext': case 'idTabLast':
				topicTabs.style.animation = "jumpToLeft"; // имя @keyframes в файле styles.css
				break;
			default:
				console.error(`(!) Косяк - не удалось воспроизвести анимацию - текущая вкладка не определена:\n function animationOffset(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}): window."${window.name}", location.origin: ${location.origin}:\n elem.id: ${elem.id}`);
				alert(`(!) Косяк: не удалось воспроизвести анимацию - текущая вкладка не определена, см.консоль.`);
				return;
		}
		topicTabs.style.animationDuration = ".1s"; // продолжительность одного цикла анимации
		topicTabs.style.animationTimingFunction = "cubic-bezier(0.18, 0.89, 0.32, 1.28)"; // временнАя функция - описывает, как будет развиваться анимация между каждой парой ключевых кадров. *Во время задержки анимации временные функции не применяются
		topicTabs.style.animationIterationCount = 1; // повтор - сколько раз проигрывается цикл анимации
		// topicTabs.style.animationDirection = "alternate"; // alternate-reverse // направление - определяет, должна ли анимация воспроизводиться в обратном порядке в некоторых или во всех циклах. *Когда анимация воспроизводится в обратном порядке, временные функции также меняются местами. Например, при воспроизведении в обратном порядке функция ease-in будет вести себя как ease-out
		topicTabs.style.animationDelay = "0ms"; // задержка - определяет, когда анимация начнется. *Задается в секундах s или миллисекундах ms
		// topicTabs.style.animationFillMode = "both"; // Анимация будет вести себя так, как будто значения forwards и backwards заданы одновременно
		// topicTabs.style.animationFillMode = "forwards"; // По окончании анимации элемент сохранит стили последнего ключевого кадра, который определяется значениями animation-direction и animation-iteration-count. Определяет, какие значения применяются анимацией вне времени ее выполнения. Когда анимация завершается, элемент возвращается к своим исходным стилям. По умолчанию анимация не влияет на значения свойств animation-name и animation-delay, когда анимация применяется к элементу. Кроме того, по умолчанию анимация не влияет на значения свойств animation-duration и animation-iteration-count после ее завершения. Свойство animation-fill-mode может переопределить это поведение
		// topicTabs.style.willChange = "transform"; // (i) - св-во will-change - экспериментальная технология, заранее передает браузеру инфу о возможном предстоящем изменении элемента
	} else if (elem.classList.contains('slider-track')) { // *для слайдера изо.в скрытом контенте
		if (elem.firstElementChild.classList.contains('slider-current')) {
			elem.style.animation = "jumpToRight"; // имя @keyframes в файле styles.css
		} else if (elem.lastElementChild.classList.contains('slider-current')) {
			elem.style.animation = "jumpToLeft"; // имя @keyframes в файле styles.css
		} else {
			console.error(`(!) Косяк - не удалось воспроизвести анимацию - текущее изо.не определено:\n function animationOffset(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem})\n elem.classList: ${JSON.stringify(elem.classList, null, 1)}`);
			alert(`(!) Косяк: не удалось воспроизвести анимацию - текущее изображение не определено, см.консоль.`);
		}
		elem.style.animationDuration = ".1s"; // продолжительность одного цикла анимации
		elem.style.animationTimingFunction = "cubic-bezier(0.18, 0.89, 0.32, 1.28)"; // временнАя функция - описывает, как будет развиваться анимация между каждой парой ключевых кадров. *Во время задержки анимации временные функции не применяются
		elem.style.animationIterationCount = 1; // повтор - сколько раз проигрывается цикл анимации
		elem.style.animationDelay = "0ms"; // задержка - определяет, когда анимация начнется. *Задается в секундах s или миллисекундах ms
	}
}
// (!) clearPermalink-очистить окно Постоянная ссылка
function clearPermalink() {
	let elem = window.top.document.getElementById('idTextArea');
	if (typeof(elem) !== "undefined" || elem !== null && (elem === Object(elem) || typeof(elem) === "object")) {
		if (elem.labels[0].innerHTML !== "") {
			elem.labels[0].innerHTML = "";
			elem.labels[0].classList.remove('permalink-error');
			elem.labels[0].classList.add('permalink-info');
		}
	}
}
// (!) setShowHideWindow-показать/скрыть всплывающее окно
function setShowHideWindow(elem, valueShowHide = "") {
	if (typeof (elem) === "undefined" || elem === null && (elem === Object(elem) || typeof(elem) === "object")) {
		console.error(`(!) Косяк - не удалось показать/скрыть всплывающее окно - переменная аргумента не определена:\n function setShowHideWindow(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, valueShowHide: "${valueShowHide}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк - не удалось показать/скрыть всплывающее окно - переменная аргумента не определена, см.консоль.`);
		return;
	}
	if (typeof(valueShowHide) === "undefined" || valueShowHide === null || valueShowHide === "" && (valueShowHide === String(valueShowHide) || typeof(valueShowHide) === "string")) {
		if (elem.style.display === "none") { // переключатель
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
		} else {
			console.error(`(!) Косяк - не удалось показать/скрыть всплывающее окно - переменная аргумента не определена:\n function setShowHideWindow(elem: typeof(${typeof(elem)}) / Object(${Object(elem)}) / ${elem}, valueShowHide: "${valueShowHide}"): window."${window.name}", location.origin: ${location.origin}`);
			alert(`(!) Косяк - не удалось показать/скрыть всплывающее окно - переменная аргумента не определена, см.консоль.`);
		}
	}
}
// (!) windowOpen-открытие в новом окне браузера
function windowOpen(htmlFileName = "", winProp = "") {
	if (typeof(htmlFileName) === "undefined" || htmlFileName !== String(htmlFileName) || typeof(htmlFileName) !== "string") {
		console.error(`(!) Косяк - не удалось выполнить открытие в новом окне браузера - переменная аргумента не определена:\n function windowOpen (htmlFileName: "${htmlFileName}", winProp: "${winProp}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк - не удалось выполнить открытие в новом окне браузера - переменная аргумента не определена, см.консоль.`);
		return;
	}
	if (typeof(winProp) === "undefined" || winProp !== String(winProp) || typeof(winProp) !== "string") {
		console.error(`(!) Косяк - не удалось выполнить открытие в новом окне браузера - переменная аргумента не определена:\n function windowOpen (htmlFileName: "${htmlFileName}", winProp: "${winProp}"): window."${window.name}", location.origin: ${location.origin}`);
		alert(`(!) Косяк - не удалось выполнить открытие в новом окне браузера - переменная аргумента не определена, см.консоль.`);
		return;
	}
	// window.open("","","width=250,height=250"); // пример открытия пустого окна
	// // let windowProperties = 'toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=yes,width=900,height=700';
	// // let windowProperties = 'left=100,top=100,width=350,height=250,menubar=false,toolbar=false,location=false,resizabie=no,scrollbars=yes,status=false';
	if (htmlFileName === "") {
		htmlFileName = window.top.hmtopicvars.currP;
	}
	window.open(htmlFileName, "", winProp);
}