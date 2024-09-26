// Detail.controller.js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function(Controller, History, UIComponent) {
    "use strict";

    return Controller.extend("com.kyly.catalogo4.ext.controller.Detail", {
        onInit: function() {

            sap.m.MessageToast.show("detail controller")

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            var sObjectId = oEvent.getParameter("arguments").objectId;
            // Bind the view to the object path
            this.getView().bindElement({
                path: "/YourEntitySet(" + sObjectId + ")",
                model: "yourModel"
            });
        },

        onNavBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("main", {}, true);
            }
        },

        onObjectListItemPress: function (oEvent) {
            MessageToast.show("Pressed");
        }
    });
});
