sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/proy/ejerciciointegrador/util/Common",
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "com/proy/ejerciciointegrador/util/Constants",
    "sap/ui/core/routing/HashChanger",
  ],
  function (BaseController, Common, Fragment, UIComponent, Constants) {
    "use strict";

    // PROBLEMA AL RE-RENDERIZAR NUEVO ITEM, BUSCAR PROBLEMA

    return BaseController.extend(
      "com.proy.ejerciciointegrador.controller.ItemDetail",
      {
        onInit: function () {
          // Get router info and get params from url
          // Esta parte sirve para obtener los detalles de la ruta
          var oRouter = UIComponent.getRouterFor(this);
          oRouter
            .getRoute("RouteItemDetail")
            .attachPatternMatched(this._onRouteMatched);

          // GET VALUES FROM MAIN VIEW
          const sValue = Common.getModelProperties({
            modelName: Constants.models.itemInfo,
            pageId: "Main",
            instance: this,
          });

          // SET VALUES FROM MAIN VIEW
          /*  Otra forma de hacer esto es obteniendo el ID del item mediante la URL
              y obtener la propiedad con el array de items.
              Luego filtrar el array y obtener el item por el ID. 
          */
          Common.onSuccess({
            oData: sValue,
            instance: this,
            modelName: Constants.models.itemDetail,
          });

          // SHOW FRAGMENT
          this._showFormFragment();
        },
        /**
         * Retrieve url params data
         * @param {*} oEvent data from button
         */
        _onRouteMatched: function (oEvent) {
          var oArgs = oEvent.getParameter("arguments");
          var paramValue = oArgs;
          console.log(paramValue);
        },
        /**
         * Show and manage fragment visualization
         */
        _showFormFragment: function () {
          let oView = this.getView(),
            oFragment = this.oFragment,
            oPage = this.byId("ItemDetail");

          if (!oFragment) {
            oFragment = Fragment.load({
              id: oView.getId(),
              name: Constants.fragments.itemDetailForm,
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
