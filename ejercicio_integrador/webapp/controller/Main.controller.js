sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/proy/ejerciciointegrador/util/Constants",
    "com/proy/ejerciciointegrador/util/Formatter",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/HashChanger",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    JSONModel,
    Constants,
    Formatter,
    UIComponent,
    HashChanger
  ) {
    "use strict";

    return Controller.extend("com.proy.ejerciciointegrador.controller.Main", {
      Formatter,
      onInit: function () {
        const { i18nDEBundleName: bundleName, sPathURL } = Constants;

        sap.ui.loader.config({
          baseUrl: "/",
        });

        var onResourceModel = this.getOwnerComponent().getModel("i18n");
        onResourceModel.enhance({ bundleName });

        sap.ui.getCore().getConfiguration().setLanguage("de");
        sap.ui.getCore().getConfiguration().getLanguage();

        const sPath = sap.ui.require.toUrl(sPathURL);
        var oModel = new JSONModel();
        oModel.loadData(sPath);
        this.getView().setModel(oModel, "filterData");
        this.getInitialData();
      },
      getInitialData: function () {
        const url =
          sap.ui.require.toUrl("com/proy/ejerciciointegrador") +
          "/northwind/northwind.svc";
        this._model = new sap.ui.model.odata.v2.ODataModel(url, {
          json: true,
          headers: {
            DataServiceVersion: "2.0",
            "Cache-Control": "no-cache, no-store",
            Pragma: "no-cache",
          },
          useBatch: false,
        });

        this._model.read("/Order_Details", {
          async: true,
          success: jQuery.proxy(this.onSuccess, this),
          error: jQuery.proxy(this.onError, this),
        });
      },
      onSuccess: function (oData) {
        const oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "orderUnfiltered");
        this.getView().setModel(oModel, "orderDetails");
        console.log(oModel)
      },
      onError: function () {
        alert("error");
      },
      navigateToItemDetail: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("listItem");

        var oContext = oSelectedItem.getBindingContext("orderDetails");
        const values = this.getView()
          .getModel("orderDetails")
          .getProperty(oContext.getPath());

        var oModel1 = new JSONModel();
        oModel1.loadData(values);
        this.getOwnerComponent().setModel(oModel1, "test");
        console.log(this.getView().getModel("test"));

        const oRouter = UIComponent.getRouterFor(this);
        oRouter.navTo("RouteItemDetail");
      },
      filterProductID: function (params) {},
      handleSearch: function (oEvent) {
        const orderidbox = this.byId("comboBoxOrderID"),
          productidbox = this.byId("comboBoxProductID");
        console.log(orderidbox, productidbox);
      },
    });
  }
);
