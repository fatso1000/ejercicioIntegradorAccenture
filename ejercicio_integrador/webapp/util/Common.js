sap.ui.define(
  ["sap/ui/core/routing/History", "sap/ui/core/UIComponent"],
  function (History, UIComponent) {
    "use strict";

    return {
      navToHome: function (x) {
        const oRouter = UIComponent.getRouterFor(x);
        oRouter.navTo("RouteMain");
      },
    };
  }
);
