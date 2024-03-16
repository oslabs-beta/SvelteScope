(function () {

	const importPath = /*@__PURE__*/ JSON.parse('"contentScript.js"');

	import(chrome.runtime.getURL(importPath));

})();
