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
    cells : [ new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input({
    showValueHelp : true
    
    }), new sap.m.Button({
    text : "Delete",
    press : [ this.remove, this ]
    }),

]
    });
    
    var oTable = this.getView().byId("tableId");
    oTable.addItem(oItem);
    },

    // Submitt: function(oEvent) {
    //     //alert("Hey");
    //     //get the event source which is the button
    //     var oButton = oEvent.getSource();
    //     //get the parent of the button which is row
    //     var oRow = oButton.getParent();
    //     //get the textarea which is the fourth of the cells of row
    //     var oTextArea = oRow.getCells()[1];
    //     //get the value of the new position
    //     var sNewPosition = oTextArea.getValue();
    
    //     //get the model 
    //     var oModel = oButton.getModel();
    //     //get the binding path of current row
    //     var oPath = oButton.getBindingContext().sPath;
    //     //set the Postion to the new Position
    //     oModel.setProperty(oPath + "/Name", sNewPosition);  
    // },


//     Submitt: function (oEvent) {
//          alert("hey");

//         var that = this;
//         //var oModel = this.getOwnerComponent().getModel();
//         //oModel.setUseBatch(false);

//         var oModel = this.getView().getModel();
//         oModel.setUseBatch(false);
//        var data = oModel.getData();
//        var newData = {
//              ID: "ID",
//              Name: "Name",
//              Rating: "3",
//              Price:"12",
//    };
//    data.push(newData);
//    oModel.refresh();

//         // var oNewData = oEvent.getSource().getBindingContext().getObject();
//         // oNewData.ID = oNewData.ID;
//         // oNewData.Name = oNewData.Name;

//         // oModel.create("/Products", oNewData, {
//         //     success: function (odata) {
//         //         //that.onReadAll();
//         //         that.getView().byId("idProducts").getModel().refresh();
//         //     }, error: function (oError) {
//         //         console.log(oError);
//         //     }
//         // });
//     },

Submitt: function () {
    var oDataModel = new sap.ui.model.json.JSONModel({
        value1: "9",
        value2: "sdf",
        value3: "sdffv",
        value4: "sdfsdcv",
        value5: "9xc",
        value6: "sddcvf",
        value7: "9",
        
     });
     
     this.getView().setModel(oDataModel, "data");

    var oData = this.getView().getModel("data").getData();
    var value1 = oData.value1;
    var value2 = oData.value2;
    var value3 = oData.value3;
    var value4 = oData.value4;
    var value5 = oData.value5;
    var value6 = oData.value6;
    var value7 = oData.value7;



        //get the table binding
        var that = this;
        var oModel = this.getOwnerComponent().getModel();
        oModel.setUseBatch(false);
        var oBinding = this.oTable.getBinding("items");
     
        //create a new data object
        var oData2 = {
           "ID": value1,
           "Name": value2,
           "Description": value3,
           "ReleaseDate": value4,
           "DiscontinuedDate": value5,
           "Rating": value6,
           "Price": value7
           
        };


//extra
// var oDataModel = new sap.ui.model.json.JSONModel({
//     value1: "",
//     value2: ""
//  });
 
//  this.getView().setModel(oDataModel, "data");


//  createData: function () {
//     var oData = this.getView().getModel("data").getData();
//     var value1 = oData.value1;
//     var value2 = oData.value2;
 
//     //rest of the code as before
//  }

//End

alert("Added Successful");
     
        //create a new entry in the OData model
           oModel.create("/Products", oData, {
           success: function (oResponse) {
              //refresh the table binding
              oBinding.refresh();
              alert("Added Successful");
           },
           error: function (oError) {
              //error handling
           }
        });
        
     },
     









    // Submit:function(){
    // alert("Data Added Successfully");

    // },

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