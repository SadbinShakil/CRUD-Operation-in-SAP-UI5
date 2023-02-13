sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"
    ], function(Controller,ODataModel,Filter,FilterOperator) {
    "use strict";
    
    return Controller.extend("NS.odatacrud.controller.check", {

        onInit: function () {
            this.oTable = this.byId("tableId");
            this.oModel = this.getOwnerComponent().getModel();
         },
    
    onAdd : function(oEvent) {
    var oItem = new sap.m.ColumnListItem({
    cells : [  new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input({
    
    }), new sap.m.Button({
    text : "Delete",
    press : [ this.remove, this ]
    }),
]
    });
    
    var oTable = this.getView().byId("tableId");
    oTable.addItem(oItem);
    },


    onCheck: function(){
        // get reference to the OData model
        var oModel = this.getView().getModel();
    
        // create new entry object
        var oNewProduct = {
            ID: "",
            Name: "",
            Description: "",
            ReleaseDate: "",
            DiscontinuedDate: "",
            Rating: "",
            Price: ""
           
            
        };
var maxID = 0;
var aProducts = oModel.getProperty("/Products");
if (aProducts) {
    maxID = Math.max.apply(Math, aProducts.map(function (o) { return o.ID; })) + 1;
}
else{
   // sap.m.MessageToast.show("aproducts not defined");
}

// // retrieve the maximum ID value

// //var maxID = Math.max.apply(Math, aProducts.map(function (o) { return o.ID; })) + 1;
// // update the ID property of the new entry object with the calculated value
oNewProduct.ID = maxID;


        // Get references to the UI5 controls
  var oIdControl = this.byId("id1");
  var oNameControl = this.byId("name1");
  var oDescriptionControl = this.byId("des1");
  var oReleaseDateControl = this.byId("rdate1");
  var oDiscontinuedDateControl = this.byId("ddate1");
  var oRatingControl = this.byId("rating1");
  var oPriceControl = this.byId("price1");


    
        // update properties of the new entry object with user input
        // oNewProduct.ID = this.byId("_IDGenText1").getValue();
        // oNewProduct.Name = this.byId("_IDGenText2").getValue();
        // oNewProduct.Description = this.byId("_IDGenText22").getValue();
        // oNewProduct.Price = this.byId("_IDGenText2222").getValue();
        // oNewProduct.Rating = this.byId("_IDGenText224").getValue();
        // oNewProduct.ReleaseDate = this.byId("_IDGenText12").getValue();
        // oNewProduct.DiscontinuedDate = this.byId("_IDGenText23").getValue();

 // Check if the controls were retrieved correctly
 if (!oIdControl || !oNameControl || !oDescriptionControl || !oPriceControl || !oRatingControl || !oReleaseDateControl || !oDiscontinuedDateControl) {
    //sap.m.MessageToast.show("Error retrieving UI5 controls");
    alert("Data Added Successfully");
    return;
  }

  // Check if the controls have a getValue method
  if (!oIdControl.getValue || !oNameControl.getValue || !oDescriptionControl.getValue || !oPriceControl.getValue || !oRatingControl.getValue || !oReleaseDateControl.getValue || !oDiscontinuedDateControl.getValue) {
    sap.m.MessageToast.show("Error: some of the controls do not have a getValue method");
    return;
  }

    // Update properties of the new entry object with user input
    oNewProduct.ID = oIdControl.getValue();
    oNewProduct.Name = oNameControl.getValue();
    oNewProduct.Description = oDescriptionControl.getValue();
    oNewProduct.ReleaseDate = oReleaseDateControl.getValue();
    oNewProduct.DiscontinuedDate = oDiscontinuedDateControl.getValue();
    oNewProduct.Rating = oRatingControl.getValue();
    oNewProduct.Price = oPriceControl.getValue();
    
    



    
        // create a new context
        //alert("I am here1");
        oModel.createEntry("/Products", {        
            properties: oNewProduct,
            success: function(){
                alert("I am here at succ");
                // show success message to user
                sap.m.MessageToast.show("Data inserted successfully");
                //that.getView().byId("idProducts").getModel().refresh();
      
                    },
                    error: function(oError){
                        alert("I am here32");
                    // show error message to user
                    sap.m.MessageToast.show("Error creating context: " + oError);
                    }
                    });
                    },
    

    Back:function(oEvent){
        var oItem = oEvent.getSource();
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("Demo",{
            
        });

    },


    deleteRow : function(oEvent) {
    var oTable = this.getView().byId("tableId");
    oTable.removeItem(oEvent.getParameter("listItem"));
    },
    
    remove : function(oEvent) {
    var oTable = this.getView().byId("tableId");
    oTable.removeItem(oEvent.getSource().getParent());
    }


    })
    });