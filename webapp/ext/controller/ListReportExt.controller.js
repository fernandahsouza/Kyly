sap.ui.define([
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    'sap/ui/core/Fragment',
    'sap/m/MessageToast',
    'sap/m/Input',
    'sap/ui/model/json/JSONModel',
    'sap/m/Button',
    "sap/m/Label",
    "sap/gantt/shape/Line",
    "sap/ui/core/VerticalAlign"
], function (Filter,
    SmartFilterBar,
    ComboBox,
    History,
    UIComponent,
    Fragment,
    MessageToast,
    Input,
    JSONModel,
    Button,
    Label,
    Line,
    VerticalAlign) {
    "use strict";
    return {

        onLinkClick: function (oEvent) {

            //    sap.m.MessageToast.show("Pressed")
            // Fragment para exibir a imagem das Partes da Combinação
            //debugger;
            var oCtx = oEvent.getSource().getBindingContext(),
                oControl = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.kyly.catalogo4.view.Detail",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.attachAfterOpen(function () {
                        this.disablePointerEvents();
                    }, this);
                    oPopover.attachAfterClose(function () {
                        this.enablePointerEvents();
                    }, this);
                    return oPopover;
                }.bind(this));
            }
            this._pPopover.then(function (oPopover) {
                oPopover.bindElement(oCtx.getPath());
                oPopover.openBy(oControl);
            });

        },

        onMatnrClick: function (oEvent) {

            //  sap.m.MessageToast.show("Pressed")

            //debugger;
            var oCtx2 = oEvent.getSource().getBindingContext(),
                oControl2 = oEvent.getSource(),
                oView2 = this.getView();

            // create popover
            if (!this._pPopover2) {
                this._pPopover2 = Fragment.load({
                    id: oView2.getId(),
                    name: "com.kyly.catalogo4.view.MatnrList",
                    controller: this
                }).then(function (oPopover2) {
                    oView2.addDependent(oPopover2);
                    oPopover2.attachAfterOpen(function () {
                        this.disablePointerEvents();
                    }, this);
                    oPopover2.attachAfterClose(function () {
                        this.enablePointerEvents();
                    }, this);
                    return oPopover2;
                }.bind(this));
            }
            this._pPopover2.then(function (oPopover2) {
                oPopover2.bindElement(oCtx2.getPath());
                oPopover2.openBy(oControl2);
            });

        },

        onCloseDialog: function () {
            if (this._oDialog) {
                this._oDialog.close();
            }
        },
        // Function to check if a field should be visible based on its value
        isFieldVisible: function (sValue) {
            // debugger;
            return !!sValue;  // Returns true if the value is not initial (non-empty string)
        },

        onInit: function () {

            this.getView().setModel(new JSONModel({ qtdCar: 3 }), 'props')

            this.getView().getContent()[0].getHeader().addContent(new sap.m.VBox("vbox1", {
                items: [
                    new Label({ text: 'Colunas:' })
                ]
            }))

            this.getView().getContent()[0].getHeader().addContent(new Input({
                placeholder: 'Quantidade colunas',
                type: 'Number',
                width: '10%',
                value: '{props>/qtdCar}',
                liveChange: oEvent => {
                    const val = oEvent.getParameter('value')
                    oEvent.getSource().getParent().getParent().getContent().getTable().getItems().forEach(e => {
                        e.getCells()[1].getItems()[0].getCustomLayout().setVisiblePagesCount(parseInt(val))
                    })
                }
            }))

            debugger
        },

        onObjectListItemPress: function (oEvent) {

            //    MessageToast.show("onObjectListItemPress");

            //debugger;

            var oCtx3 = oEvent.getSource().getBindingContext(),
                oControl3 = oEvent.getSource(),
                oView3 = this.getView();

            // create popover
            if (!this._pPopover3) {
                this._pPopover3 = Fragment.load({
                    id: oView3.getId(),
                    name: "com.kyly.catalogo4.view.MatnrImage",
                    controller: this
                }).then(function (oPopover3) {
                    oView3.addDependent(oPopover3);
                    oPopover3.attachAfterOpen(function () {
                        this.disablePointerEvents();
                    }, this);
                    oPopover3.attachAfterClose(function () {
                        this.enablePointerEvents();
                    }, this);
                    return oPopover3;
                }.bind(this));
            }
            this._pPopover3.then(function (oPopover3) {
                oPopover3.bindElement(oCtx3.getPath());
                oPopover3.openBy(oControl3);
            });

        },

        onCloseFragment: function () {
            //      MessageToast.show("Close");
            this._pPopover3.close();
        },

        goToMaintain: function (oEvent, mat) {

            debugger;
    
            var sHash = sap.ushell.Container?.getService('CrossApplicationNavigation').hrefForExternal({
                target: {
                    semanticObject: 'Material',
                    action: 'manage'
                }
            }) || '#Material-manage';

            const url = window.location.href.split('/')[0] + "//" + 
            window.location.href.split('/')[2] + "/sap/bc/ui2/flp" + 
            window.location.search +  sHash + "&/C_Product(Product='"
            + mat + "',DraftUUID=guid'00000000-0000-0000-0000-000000000000',IsActiveEntity=true)/"

            sap.m.URLHelper.redirect(url, true)

        },

        goToDetail: function () {
            //  MessageToast.show("GotoDetailalt");
        },

        isCarVisible: function (sValue) {

            debugger
            return !!sValue;
        },

    };
});