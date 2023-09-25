sap.ui.define(
  [],
  function () {
    "use strict";
    return {
      baseURL: "/",
      i18n: {
        en: "com.proy.ejerciciointegrador.i18n.i18n_en",
        de: "com.proy.ejerciciointegrador.i18n.i18n_de",
      },
      sPathURL: "localService/Order_Details.json",
      models: {
        filterData: "filterData",
        orderDetails: "orderDetails",
        itemInfo: "itemInfo",
        itemDetail: "itemDetail",
      },
      oDataModelOptions: {
        json: true,
        headers: {
          DataServiceVersion: "2.0",
          "Cache-Control": "no-cache, no-store",
          Pragma: "no-cache",
        },
        useBatch: false,
      },
      languages: ["en", "de"],
      fragments: {
        itemDetailForm: "com.proy.ejerciciointegrador.fragments.ItemDetailForm",
      },
    };
  },
  true
);
