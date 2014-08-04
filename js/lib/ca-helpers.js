angular.module("ca-helpers", []);

angular.module("ca-helpers")

.factory("caHelpersApply", function($rootScope, $log) {

  var apply = function(scope) {
    if (!scope) { return; }
    switch (scope.$$phase) {
      case "$digest":
      case "$apply":
        $log.info("Apply not applied, current phase: ", scope.$$phase);
        break;
      default:
        try {
          scope.$apply();
        } catch (e) {
          $log.info("Attempted to apply, but received exception: ", e)
        }
    }
  }

  $rootScope.apply = function() {
    return apply($rootScope);
  }

  return apply;

})

.run(function(caHelpersApply) {
  caHelpersApply();
});
