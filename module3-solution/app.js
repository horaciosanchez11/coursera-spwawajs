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
      items: '<',
      onRemove: '&',
      myTitle: '@title',
      badRemove: "="
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  var menu_items = [];

  list.search = function(searchTerm) {
    console.log(searchTerm);
  };

}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;

  service.getAllMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    });

    return response;
  };

  service.getMatchedMenuItems = function(searchTerm) {
    var promise = service.getAllMenuItems();
    var params = [];

    promise.then(function(response) {
      params = response.data.menu_items;
      while (params.length--) {
        if (!params[i].description.includes(searchTerm)) {
          params.splice(i, 1);
        }
      }
    })
    .catch(function(error) {
      console.log(error);
    });

    return promise;
  };
}



})();
