angular
  .module('app')
  .component('unitView', {
    bindings: {
      incrementUnits: '<',
      unit: '='
    },
    controller: controller,
    controllerAs: 'vm',
    template: `
      <div class="pure-g">
        <div class="pure-u-1-2">
          {{ vm.unit.description }}
        </div>
        <div
          class="pure-u-1-2"
          style="{{ vm.style }}">
          {{ vm.unit.status }}
        </div>
      </div>
    `
  })

controller.$inject = ['$scope', 'callbackHandlerFactory', 'statusesFactory']

function controller($scope, callbackHandlerFactory, statusesFactory) {

  callbackHandlerFactory.register(callback)

  var vm = this

  var statuses = statusesFactory.getStatuses()

  setStatus(0)

  function setStatus(idx) {
    vm.unit.status = statuses[idx].msg
    vm.style = statuses[idx].style
  }

  function callback(payload) {
    var unitDescription = payload.data.split(':')[0]
    var unitStatusCode = payload.data.split(':')[1]
    if (unitDescription === vm.unit.description) {
      setStatus(unitStatusCode)
      vm.incrementUnits(unitStatusCode)
      $scope.$digest()
    }
  }

}
