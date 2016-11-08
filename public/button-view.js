angular
  .module('app')
  .component('buttonView', {
    bindings: {
      resetUnits: '<'
    },
    controller: controller,
    controllerAs: 'vm',
    template: `
      <button
        class="pure-button pure-button-primary"
        ng-click="vm.onClick()"
        ng-disabled="vm.isDisabled()">
        Start Tests
      </button>
    `
  })

controller.$inject = ['callbackHandlerFactory']

function controller(callbackHandlerFactory) {

  var vm = this

  // Initialize state
  var buttonState = false

  vm.onClick = function() {
    buttonState = true
    vm.resetUnits()
    callbackHandlerFactory.emitButtonClick()
  }

  vm.isDisabled = function() {
    return buttonState
  }

}
