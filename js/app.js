var launcher = angular.module("launcher", ["ca-helpers"]);

launcher.controller("launcher", function($log, $scope) {

  var storageScope = "launcher";

  $scope.launchers = [];

  $scope.addEnabled = false;

  var save = function() {
    localStorage[storageScope] = JSON.stringify($scope.launchers);
  }

  var load = function() {
    try {
      $scope.launchers = JSON.parse(localStorage[storageScope]);
    } catch (e) {
      $log.error(e);
      $scope.launchers = [];
    }
    $scope.apply();
  }
  load();

  window.addEventListener("storage", load, false);

  $scope.delete = function(launcherId) {
    $scope.launchers.splice(launcherId, 1);
    save();
  }

  $scope.add = function(name, url, icon) {
    if (!name.length || !url.length) {
      return;
    }
    $scope.launchers.push({
      "name": name,
      "url": url,
      "icon": icon
    });
    save();
    $scope.addEnabled = false;
  }

  $scope.enableAdd = function() {
    $scope.addEnabled = true;
  }

});
