var ws = require("nodejs-websocket")
var port = 8001


function generateDummyTest() {
  var delay = 7000 + Math.random() * 7000
  var testPassed = Math.random() > 0.5

  return function(callback) {
    setTimeout(function() {
      callback(testPassed)
    }, delay)
  }
}

var tests = [
  {
    description: "commas are rotated properly",
    run: generateDummyTest()
  },
  {
    description: "exclamation points stand up straight",
    run: generateDummyTest()
  },
  {
    description: "run-on sentences don't run forever",
    run: generateDummyTest()
  },
  {
    description: "question marks curl down, not up",
    run: generateDummyTest()
  },
  {
    description: "semicolons are adequately waterproof",
    run: generateDummyTest()
  },
  {
    description: "capital letters can do yoga",
    run: generateDummyTest()
  }
]

function server(conn) {
  function runTests(tests, idx) {

    function emitRunning(description) {
      conn.sendText(description + ":running")
    }

    function emitDone(description, passFailBool) {
      conn.sendText(description + ":" + passFailBool.toString())
    }

    // No more recursion
    if (tests.length <= idx) {
      return
    }

    if (idx === undefined) {
      runTests(tests, 0)
    } else {
      var test = tests[idx]
      emitRunning(test.description)
      emitDone(test.description, test.run)
      runTests(tests, idx + 1)
    }

  }

  console.log("WS server open")

  conn.on("text", function(str) {
    console.log("Received button click: " + str)
    runTests(tests)
  })

  conn.on("close", function (/*code, reason*/) {
    console.log("Connection closed")
  })

}


ws.createServer(server).listen(port)
