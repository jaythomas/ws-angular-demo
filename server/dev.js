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

  function runTests(tests) {
    tests.forEach(function(test) {
      function emitRunning(description) {
        var statusCode = "1"
        conn.sendText(description + ":" + statusCode)
      }

      function emitDone(description, testRun) {
        testRun(function(passFailBool) {
          var statusCode
          if (passFailBool) {
            statusCode = "2"
          } else {
            statusCode = "3"
          }
          conn.sendText(description + ":" + statusCode)
        })
      }

      emitRunning(test.description)
      emitDone(test.description, test.run)
    })
  }

  console.log("[WS] Connection open on port " + port)

  conn.on("text", function(str) {
    console.log("[WS] Received message: \"" + str + "\"")
    runTests(tests)
  })

  conn.on("close", function (/*code, reason*/) {
    console.log("[WS] Connection closed")
  })

}


ws
  .createServer(server)
  .listen(port)
