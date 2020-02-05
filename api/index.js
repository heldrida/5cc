const port = 3000
const express = require('express')
const app = express()

const { jsonPostHandler } = require('../src/helpers')

app.use(express.json())

app.post('/', (request, response) => {
  const requestBody = request.body
  const computedResponse = jsonPostHandler(requestBody)
  response.send(computedResponse)
});

app.listen(port)
console.log(`<Public API> Listening on port ${port}...`)