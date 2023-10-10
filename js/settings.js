// (!) принудительная переадрессация
let forceReDirect = function () {
	if (window === top || window.name === "") {
		// *при локальном использовании или http://127.0.0.1
		if (location.origin === "file://" || location.origin === "http://127.0.0.1") return;
		let htmlPage = location.href.slice(location.href.lastIndexOf("/") + 1);
		if (htmlPage === "navigation.html") {
			location.href = location.href.replace(htmlPage, "index.html");
			// window.history.pushState('', '', pageName);
		} else {
			location.href = location.href.replace(htmlPage, "index.html") + "?" + htmlPage;
		}
	}
}