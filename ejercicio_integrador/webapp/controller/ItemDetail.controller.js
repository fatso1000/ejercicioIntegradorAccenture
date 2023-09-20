sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/proy/ejerciciointegrador/util/Common",
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/HashChanger",
  ],
  function (BaseController, Common, Fragment, UIComponent) {
    "use strict";

    return BaseController.extend(
      "com.proy.ejerciciointegrador.controller.ItemDetail",
      {
        onInit() {
          var oRouter = UIComponent.getRouterFor(this);
          oRouter
            .getRoute("RouteItemDetail")
            .attachPatternMatched(this._onRouteMatched);

          this._showFormFragment("Display");
        },
        _onRouteMatched: function (oEvent) {
          var oArgs = oEvent.getParameter("arguments");
          var paramValue = oArgs;
          console.log(oArgs);
        },
        _showFormFragment: function (sFragmentName) {
          let oView = this.getView(),
            oFragment = this.oFragment,
            oPage = this.byId("ItemDetail");

          if (!oFragment) {
            oFragment = Fragment.load({
              id: oView.getId(),
              name: "com.proy.ejerciciointegrador.fragments.ItemDetailForm",
              controller: this,
            });
            this.oFragment = oFragment;
          }
          oFragment.then(function (oVBox) {
            oPage.insertContent(oVBox);
          });
        },
        navToHome: function () {
          Common.navToHome(this);
        },
      }
    );
  }
);
