angular
  .module('app')
  .factory('callbackHandlerFactory', factory)

factory.$inject = ['wsFactory']

function factory(wsFactory) {

  // STATES
  // Intialize the websocket connection
  var ws = wsFactory.open()
  var wsReady = false
  var callbacks = []

  ws.onmessage = function(payload) {
    push(payload)
  }

  ws.onopen = function() {
    wsReady = true
  }

  return {
    emitButtonClick: emitButtonClick,
    push: push,
    register: register,
    resetState: resetState
  }

  function emitButtonClick() {
    if (wsReady) {
      ws.send('button:click')
    } else {
      // TODO: throw an error or disable the button instead
      console.log('Connection not established yet!')
    }
  }

  function push(payload) {
    function invokeCallback(callbacks, payload, idx) {
      // Invoke first callback if none specified
      if (idx === undefined) {
        invokeCallback(callbacks, payload, 0)
      }

      if (callbacks.length && callbacks.length > idx) {
        callbacks[idx](payload)
        invokeCallback(callbacks, payload, idx + 1)
      }
    }

    invokeCallback(callbacks, payload)
  }

  function register(callback) {
    callbacks.push(callback)
  }

  function resetState() {
    callbacks = []
  }

}
