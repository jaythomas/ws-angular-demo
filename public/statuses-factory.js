angular
  .module('app')
  .factory('statusesFactory', factory)

function factory() {

  return {
    getStatuses
  }

  function getStatuses() {
    return {
      '0': {
        msg: "Not Started Yet",
        style: 'color:blue'
      },
      '1': {
        msg: "Running",
        style: 'color:gold'
      },
      '2': {
        msg: "Passed",
        style: 'color:green'
      },
      '3': {
        msg: "Failed",
        style: 'color:red'
      }
    }
  }

}
