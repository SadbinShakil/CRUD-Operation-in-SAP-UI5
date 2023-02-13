sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller,Sorter,Filter,FilterOperator,FilterType} Controller
     */
    function (Controller,History) {
        "use strict";

        return Controller.extend("NS.odatacrud.controller.Details", {
            onInit: function (evt) {
               

            },

            

		onNavBack: function (oEvent) {
            //alert("Hey");
            var oItem = oEvent.getSource();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("webapp/view/View1.view.xml",{
                
            });
			
		},

            





        });
    });
