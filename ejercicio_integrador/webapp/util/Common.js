sap.ui.define(
  [
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
  ],
  function (History, UIComponent, JSONModel) {
    "use strict";

    return {
      navToHome: function (instance) {
        const oRouter = UIComponent.getRouterFor(instance);
        oRouter.navTo("RouteMain");
      },
      navToView: function ({ instance, routeName, values }) {
        const oRouter = UIComponent.getRouterFor(instance);
        oRouter.navTo(routeName, values);
      },
      getModelProperties: function ({ modelName, pageId, instance }) {
        // No me dejaba por modelo. Lo intente y no lo encontraba, asi que busque por ID
        const oView = instance.getOwnerComponent().byId(pageId);
        return oView.getModel(modelName).getProperty("/");
      },
      onSuccess: function ({ oData, instance, modelName }) {
        const oModel = new JSONModel(oData);
        instance.getView().setModel(oModel, modelName);
      },
    };
  }
);
