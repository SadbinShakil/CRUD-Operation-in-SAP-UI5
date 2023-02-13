/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"NS/odata_crud/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
