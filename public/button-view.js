angular
  .module('app')
  .component('buttonView', {
    bindings: {},
    controller: controller,
    controllerAs: 'vm',
    template: `
      <button
        class="pure-button pure-button-primary"
        ng-disable="buttonState()">
        Run!
      </button>
    `
  })

function controller() {

  this.buttonState = function() {
    return false
  }

}
