angular.module('app', [])

angular
  .module('app')
  .component('mainView', {
    bindings: {},
    controller: controller,
    controllerAs: 'vm',
    template: `
      <div>
        <p>
          Below are a list of tests we must pass before we can ship our product!
        </p>
      </div>

      <button-view reset-units="vm.resetUnitsDone"></button-view>

      <div class="pure-g">
        <h2 class="pure-u-1-2">Description</h2>
        <h2 class="pure-u-1-2">Status</h2>
      </div>

      <div
        class="pure-form"
        ng-repeat="unit in vm.units | orderBy: 'status'">
        <unit-view
          unit="unit"
          increment-units="vm.incrementUnitsDone">
        </unit-view>
      </div>

      <p style="{{ ::vm.statuses[3].style }}">
        {{ vm.statuses[3].msg }}: {{ vm.unitsFailed }}
      </p>
      <p style="{{ ::vm.statuses[2].style }}">
        {{ vm.statuses[2].msg }}: {{ vm.unitsPassed }}
      </p>
      <p style="{{ ::vm.statuses[1].style }}">
        {{ vm.statuses[1].msg }}: {{ vm.unitsRunning }}
      </p>
      <p>Total: {{ vm.unitsTotal }}</p>
      <h2 ng-show="vm.isDone()">FINISHED!</h2>
    `
  })

controller.$inject = ['$scope', 'statusesFactory', 'unitsFactory']

function controller($scope, statusesFactory, unitsFactory) {

  var vm = this

  vm.statuses = statusesFactory.getStatuses()
  vm.units = unitsFactory.getUnits()

  // Increment these when a unit is done running;
  // When the counter matches the units' length then we are done
  vm.unitsFailed = 0
  vm.unitsPassed = 0
  vm.unitsRunning = 0
  vm.unitsTotal = vm.units.length

  vm.incrementUnitsDone = function(unitStatusCode) {
    if (unitStatusCode === '2') {
      vm.unitsPassed += 1
    } else if (unitStatusCode === '3') {
      vm.unitsFailed += 1
    }
    vm.unitsRunning = vm.unitsTotal - (vm.unitsFailed + vm.unitsPassed)
    $scope.$digest()
  }

  vm.isDone = function() {
    return (vm.unitsFailed + vm.unitsPassed) >= vm.unitsTotal
  }

  vm.resetUnitsDone = function() {
    vm.unitsFailed = 0
    vm.unitsPassed = 0
    vm.unitsRunning = 0
  }

}

