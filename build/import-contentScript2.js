(function () {

	const importPath = /*@__PURE__*/ JSON.parse('"contentScript2.js"');

	import(chrome.runtime.getURL(importPath));

})();
