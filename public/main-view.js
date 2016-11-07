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

      <button-view></button-view>

      <div class="pure-g">
        <h2 class="pure-u-1-2">Description</h2>
        <h2 class="pure-u-1-2">Status</h2>
      </div>

      <div
        class="pure-form"
        ng-repeat="unit in vm.units">
        <unit-view description="{{ ::unit }}"></unit-view>
      </div>
    `
  })

function controller() {

  this.units = [
    "commas are rotated properly",
    "exclamation points stand up straight",
    "run-on sentences don't run forever",
    "question marks curl down, not up",
    "semicolons are adequately waterproof",
    "capital letters can do yoga"
  ]

}

