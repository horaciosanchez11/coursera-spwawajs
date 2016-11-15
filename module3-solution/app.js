(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.searchTerm = "";

  list.search = function() {
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
    console.log("Search: ", list.searchTerm);
    promise.then(function(response) {
      list.found = response;
      if (response.length === 0) {
        list.nothingFound = true;
      } else {
        list.nothingFound = false;
      }
    });
  };

  list.removeItem = function(itemIndex) {
    list.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;


  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    })
    .then(function(result) {
      var menuItems = result.data.menu_items;
      var foundItems = [];

      for (var i = 0; i < menuItems.length; i++) {
        if (searchTerm.length === 0) {
          break;
        }
        if (menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(menuItems[i]);
        }
      }
      return foundItems;
    });
  };
}



})();
