sap.ui.define([], function () {
  "use strict";
  return {
    price: function (sStatus) {
      const price = +sStatus;
      return price.toFixed(2) + " USD";
    },
  };
});
