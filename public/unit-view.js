angular
  .module('app')
  .component('unitView', {
    bindings: {
      description: '@'
    },
    controller: controller,
    controllerAs: 'vm',
    template: `
      <div class="pure-g">
        <div class="pure-u-1-2">{{ vm.description }}</div>
        <div class="pure-u-1-2">{{ vm.status }}</div>
      </div>
    `
  })

function controller() {

  var statuses = [
    "Not Yet Started",
    "Running",
    "Passed",
    "Failed"
  ]

  this.status = statuses[0]

}
