(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingList)
;


function ShoppingList() {

  var ddo = {
    templateUrl: 'shoppingList1.html',
    scope: {
      listDirective: '<myList',
      titleDirective: '@myTitle',
      badRemove: '=',
      onRemove: '&'
    },
    controller: ShoppingListDirectiveController,
    controllerAs: "listDirectiveController",
    bindToController: true
  };
  return ddo;
};



function ShoppingListDirectiveController() {

  var list_temps = this;

  list_temps.FindCookies = function () {

    for(var i=0; i < list_temps.listDirective.getItems.length; i++ )
    {
      var name = list_temps.listDirective.getItems[i].name;

      if(name.toLowerCase().indexOf("cookies") !== -1)
      return true;
    }

    return false;
  };


};




ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory();

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = "Shopping List 1 ";
  list.TitleController = Org_Title + "("+ list.getItems.length +")";


  list.addItem = function () {
    try {
      ShoppingList.addItem(list.ItemName , list.ItemQuantity );
      list.TitleController = Org_Title + "("+ list.getItems.length +")";
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }
  };

  list.RemoveItem = function (indexItem) {
    console.log("this is :", this);
    this.LastRemoved = "Last item removed was " + list.getItems[indexItem].name;
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
    this.TitleController = Org_Title + "("+ list.getItems.length +")";
  };

};





function ShoppingList_Service(maxItems) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {

    if( ( maxItems === undefined ) ||
        ( maxItems !== undefined && Items.length < maxItems )
    )
    {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);
    }
    else {
      throw new Error("Max items ("+ Items.length +") was reached");
    }

  };

  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem , 1 );
  };

};


function ShoppingListFactory() {

  var factory = function (maxItems) {
    return new ShoppingList_Service(maxItems);
  };
  return factory;
};





})();
