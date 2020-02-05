const request = require('./data/request.js')
const response = require('./data/response.js')
const { jsonPostHandler } = require('./helpers')

test('name and count match their respective properties from the payload', () => {
  const computedResponse = jsonPostHandler(request.payload)
  expect(computedResponse).toEqual(response)
})