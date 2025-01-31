const port = 3000
const express = require('express')
const app = express()
const { jsonPostHandler, isUserRequestValid } = require('../src/helpers')

app.use(express.json())

app.post('/', (request, response) => {
  const requestBody = request.body
  const hasValidUserRequest = isUserRequestValid(requestBody)
  if (hasValidUserRequest) {
    const computedResponse = jsonPostHandler(requestBody.payload)
    response.send(computedResponse)
  } else {
    response.status(400).send(new Error('Oops! Are you sending the correct payload?'));
  }
})

app.listen(port)
console.log(`<Public API> Listening on port ${port}...`)