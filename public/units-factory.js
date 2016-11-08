angular
  .module('app')
  .factory('unitsFactory', factory)

function factory() {

  return {
    getUnits: getUnits
  }

  function getUnits() {
    return [
      {
        description: "commas are rotated properly",
      },
      {
        description: "exclamation points stand up straight",
      },
      {
        description: "run-on sentences don't run forever",
      },
      {
        description: "question marks curl down, not up",
      },
      {
        description: "semicolons are adequately waterproof",
      },
      {
        description: "capital letters can do yoga"
      }
    ]
  }

}
