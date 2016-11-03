(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemBuyer = this;

  itemBuyer.list = ShoppingListCheckOffService.getToBuyList();

  itemBuyer.buyItem = function(itemIndex) {
    try {
        ShoppingListCheckOffService.buyItem(itemIndex);
    } catch (error) {
        itemBuyer.errorMessage = error.message;
    }

  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemBought = this;

  itemBought.list = ShoppingListCheckOffService.getAlreadyBoughtList();
  itemBought.errorMessage = ShoppingListCheckOffService.getErrorMessage();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyList = [
     {
       name: "cookies",
       quantity: 10
     },
     {
        name: "chips",
        quantity: 5
     },
     {
       name: "Soda",
       quantity: 10
     },
     {
       name: "Donuts",
       quantity: 5
     },
     {
       name: "tequila",
       quantity: 5
     }
  ];

  var alreadyBoughtList = [];
  var list2ErrorMessage = [{message: "Nothing bought yet"}];

  service.getToBuyList = function () {
    return toBuyList;
  };

  service.getAlreadyBoughtList = function () {
    return alreadyBoughtList;
  };

  service.getErrorMessage = function() {
    return list2ErrorMessage;
  }

  service.buyItem = function(itemIndex) {
    var itemBought = toBuyList.splice(itemIndex, 1);
    alreadyBoughtList.push(itemBought[0]);
    list2ErrorMessage.splice(0,1);
    console.log(list2ErrorMessage);

    if (toBuyList.length === 0) {
      throw new Error("Everything is bought!");
    }

  };
}
})();
