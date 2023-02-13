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

        return Controller.extend("NS.odatacrud.controller.View1", {
            
            onInit: function (evt) {
                // Calling the fetch data function on runtime
                //this.onReadAll(evt);
                if(evt.getSource().data("mydata")=== "sort"){
                    this.onReadSorter();
                }
                if(evt.getSource().data("mydata")=== "advfilter"){
                    this.oReadParameters();

                }
                if(evt.getSource().data("mydata")=== "filterrating"){
                    this.onReadFilters();

                }
                if(evt.getSource().data("mydata")=== "all"){
                    this.onReadAll(evt);

                }
                if(evt.getSource().data("mydata") === "filterbykey"){
                    this.onReadKey();

                }
                if(evt.getSource().data("mydata")=== "add"){
                    this. onAdd();

                }
                if(evt.getSource().data("mydata")=== "delete"){
                    this. onDelete();

                }
                if(evt.getSource().data("mydata")=== "edit"){
                    this. onEdit();

                }

            },

            onCreate:function(oEvent){
                //alert("hey");
            var oItem = oEvent.getSource();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("CreateEntry",{
                
            });

             },

             onDel:function(oEvent){
                //alert("hey");
            var oItem = oEvent.getSource();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("check",{
                
            });

             },


            onReadAll: function () {
                var that = this;
                //Creating a model
                var oModel = this.getOwnerComponent().getModel();
                //Fetching data
                oModel.read("/Products", {
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                });
            },

            onAdd: function (oEvent) {
                // alert("hey");

                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);

                var oDuplicateData = oEvent.getSource().getBindingContext().getObject();
                oDuplicateData.ID = 101 + oDuplicateData.ID;
                oModel.create("/Products", oDuplicateData, {
                    success: function (odata) {
                        //that.onReadAll();
                        that.getView().byId("idProducts").getModel().refresh();
                    }, error: function (oError) {
                        console.log(oError);
                    }
                });
            },


            onReadFilters: function (a,b) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oFilter = new sap.ui.model.Filter('Rating', 'EQ', '3');
                oModel.read("/Products", {
                    filters: [oFilter],
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })

            },


            onReadSorter: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oSorter = new sap.ui.model.Sorter('Price', true);

                oModel.read("/Products", {
                    sorters: [oSorter],
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })

            },

            oReadParameters: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();


                oModel.read("/Products", {
                    urlParameters: { $skip: 0, $top: 5 },
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })


            },

            onReadKey: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                // var oKey = oEvent.getSource().getBindingContext().getObject();
                // oModel.setUseBatch(false);
                // alert("Hello I am here");


                oModel.read("/Products(3)", {

                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel({ results: [odata] });
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })


            },



            onCheck: function(){
    // get reference to the OData model
    var oModel = this.getView().getModel();

    // create new entry object
    var oNewProduct = {
        ID: "",
        Name: "",
        Description: "",
        Price: "",
        Rating: ""
    };

    // update properties of the new entry object with user input
    oNewProduct.ID = this.byId("idInputID").getValue();
    oNewProduct.Name = this.byId("idInputName").getValue();
    oNewProduct.Description = this.byId("idInputDescription").getValue();
    oNewProduct.Price = this.byId("idInputPrice").getValue();
    oNewProduct.Rating = this.byId("idInputRating").getValue();

    // create a new context
    var oContext = oModel.createEntry("/Products", {
        properties: oNewProduct,
        success: function(){
            // show success message to user
            sap.m.MessageToast.show("Data inserted successfully");

            // submit changes to the OData model
            oModel.submitChanges({
                success: function(){
                    // show success message to user
                    sap.m.MessageToast.show("Data submitted successfully");
                },
                error: function(oError){
                    // show error message to user
                    sap.m.MessageToast.show("Error submitting data: " + oError);
                }
                });
                },
                error: function(oError){
                // show error message to user
                sap.m.MessageToast.show("Error creating context: " + oError);
                }
                });
                },














            onEdit: function (oEvent) {
                // alert("hey");

                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);

                if (oEvent.getSource().getText() === "Edit") {
                    oEvent.getSource().setText("Submit");
                    
                     oEvent.getSource().getParent().getParent().getCells()[1].setEditable(true);
                    oEvent.getSource().getParent().getParent().getCells()[2].setEditable(true);
                     oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true);
                   // oEvent.getSource().getParent().getParent().getCells()[0].setEditable(false);
                    oEvent.getSource().getParent().getParent().getCells()[4].setEditable(true);




                }
                
                else {
                    oEvent.getSource().setText("Edit");
                    
                     oEvent.getSource().getParent().getParent().getCells()[1].setEditable(false);
                    oEvent.getSource().getParent().getParent().getCells()[2].setEditable(false);
                    oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
                    //oEvent.getSource().getParent().getParent().getCells()[0].setEditable(false);
                    oEvent.getSource().getParent().getParent().getCells()[4].setEditable(false);

                   
                    var oInput1 = oEvent.getSource().getParent().getParent().getCells()[1].getValue();
                    var oInput2 = oEvent.getSource().getParent().getParent().getCells()[2].getValue();
                     var oInput3 = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
                    var oInput4 = oEvent.getSource().getParent().getParent().getCells()[4].getValue();
                    //var oInput5 = oEvent.getSource().getParent().getParent().getCells()[0].getValue();
                    

                    
                 
                    



                    var oId = oEvent.getSource().getBindingContext().getProperty("ID");
                    oModel.update("/Products(" + oId + ")", {Description: oInput2, Name: oInput1, Price: oInput3, Rating: oInput4 }, {
                        success: function (odata) {
                            //that.onReadAll();
                            that.getView().byId("idProducts").getModel().refresh();
                        }, error: function (oError) {
                            console.log(oError);
                        }
                    })
                }


            },

            onDelete: function (oEvent) {
                // alert("hey");

                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);

                const oId = oEvent.getSource().getBindingContext().getProperty("ID");
                oModel.remove("/Products(" + oId + ")", {
                    success: function (odata) {
                        //that.onReadAll();
                        that.getView().byId("idProducts").getModel().refresh();
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })
            },

            doSomething: function(evt) {

                alert("data was: " + evt.getSource().data("mydata"));
                
                },





        });
    });
