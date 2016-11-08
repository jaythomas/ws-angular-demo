angular
  .module('app')
  .factory('wsFactory', factory)

factory.$inject = []

function factory() {

  return {
    open: open
  }

  function open() {
    var host = window.location.hostname
    host = '127.0.0.1'
    var ws = new WebSocket('ws://' + host + ':8001')

    return ws
  }

}
