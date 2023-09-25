sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/proy/ejerciciointegrador/util/Constants",
    "com/proy/ejerciciointegrador/util/Formatter",
    "com/proy/ejerciciointegrador/util/Common",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Constants, Formatter, Common) {
    "use strict";

    return Controller.extend("com.proy.ejerciciointegrador.controller.Main", {
      Formatter,
      onInit: function () {
        const { i18n, sPathURL } = Constants;

        sap.ui.loader.config({
          baseUrl: "/",
        });

        // Set i18n configuration
        var onResourceModel = this.getOwnerComponent().getModel("i18n");
        onResourceModel.enhance({ bundleName: i18n.de });

        sap.ui.getCore().getConfiguration().setLanguage("de");

        this._setInitialValues();

        const sPath = sap.ui.require.toUrl(sPathURL);
        var oModel = new JSONModel();
        oModel.loadData(sPath);

        this.getView().setModel(oModel, Constants.models.filterData);
        this._getInitialData();
      },
      /**
       * Alternate language between `en` and `de`
       */
      changeLanguage: function () {
        const currentLanguage = sap.ui
          .getCore()
          .getConfiguration()
          .getLanguage();
        const setLanguage = (language) =>
          sap.ui.getCore().getConfiguration().setLanguage(language);
        console.log(currentLanguage);
        setLanguage(currentLanguage === "de" ? "en" : "de");
      },
      _getInitialData: function () {
        const url =
          sap.ui.require.toUrl("com/proy/ejerciciointegrador") +
          "/northwind/northwind.svc";
        this._model = new sap.ui.model.odata.v2.ODataModel(
          url,
          Constants.oDataModelOptions
        );

        this._model.read("/Order_Details", {
          async: true,
          success: jQuery.proxy(
            (oData) =>
              Common.onSuccess({
                oData,
                instance: this,
                modelName: Constants.models.orderDetails,
              }),
            this
          ),
          error: jQuery.proxy(this._onError, this),
        });
      },
      _onError: function () {
        alert("error");
      },
      /**
       * Get item data from table and navigate to
       * itemDetail view
       * @param {*} oEvent
       */
      navigateToItemDetail: function (oEvent) {
        // Get items from the event and find values inside of orderDetails
        var oSelectedItem = oEvent.getParameter("listItem");
        var oContext = oSelectedItem.getBindingContext("orderDetails");
        const values = this.getView()
          .getModel(Constants.models.orderDetails)
          .getProperty(oContext.getPath());

        // Set model `itemInfo` or update it
        const itemInfoModel = this.getView().getModel("itemInfo");
        if (itemInfoModel === undefined) {
          Common.onSuccess({
            oData: values,
            instance: this,
            modelName: Constants.models.itemInfo,
          });
        } else {
          itemInfoModel.setData(values);
        }

        Common.navToView({
          instance: this,
          routeName: "RouteItemDetail",
          values: { id: values.OrderID },
        });
      },
      /**
       * Set initial values wich contains components
       * of the current view
       */
      _setInitialValues: function () {
        // Setea valores en la instancia `this`
        this.values = {
          comboBoxOrderId: this.byId("comboBoxOrderID"),
          comboBoxProductId: this.byId("comboBoxProductID"),
          oTable: this.byId("idTableItems"),
        };
      },
      /**
       * Clear filters for the table
       */
      clearFilters: function () {
        const { oTable, comboBoxOrderId, comboBoxProductId } = this.values;

        comboBoxOrderId.setValue("");
        comboBoxProductId.setValue("");

        const oBinding = oTable.getBinding("items");
        oBinding.filter([]);
      },
      /**
       * Retrieve values from inputs and filter the data
       */
      handleSearch: function () {
        const { comboBoxOrderId, comboBoxProductId, oTable } = this.values;
        const filters = [];

        const orderidboxvalue = comboBoxOrderId.getValue(),
          productidboxvalue = comboBoxProductId.getValue();

        if (orderidboxvalue !== undefined && orderidboxvalue !== "")
          filters.push(
            new sap.ui.model.Filter(
              "OrderID",
              sap.ui.model.FilterOperator.EQ,
              orderidboxvalue
            )
          );
        if (productidboxvalue !== undefined && productidboxvalue !== "")
          filters.push(
            new sap.ui.model.Filter(
              "ProductID",
              sap.ui.model.FilterOperator.EQ,
              productidboxvalue
            )
          );

        const oBinding = oTable.getBinding("items");
        oBinding.filter([...filters]);
      },
    });
  }
);
