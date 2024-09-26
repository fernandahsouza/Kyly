// Detail.controller.js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function(Controller, History, UIComponent) {
    "use strict";

    return Controller.extend("com.kyly.catalogo4.controller.Detail", {
        onInit: function() {

            sap.m.MessageToast.show("detail controller")

        },

    });
});
