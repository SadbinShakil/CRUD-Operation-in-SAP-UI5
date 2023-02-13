sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller,Sorter,Filter,FilterOperator,FilterType} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("NS.odatacrud.controller.Create", {
            onInit: function (evt) {
               

            },

            onNavBack: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Demo",{
                
            });
            }





        });
    });
