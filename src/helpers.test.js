const request = require('./data/request.js')
const response = require('./data/response.js')
const { jsonPostHandler, isValidImageSize, getFilteredPayload } = require('./helpers')

test('name and count match their respective properties from the payload', () => {
  const computedResponse = jsonPostHandler(request.payload)
  expect(computedResponse).toEqual(response)
})

test('should get logo no larger than 128x128 but no smaller than 64x64', () => {
  const inputImgSizeTooSmall = '16x16'
  const inputImgSizeValid = '80x80'
  const inputImgSizeTooBig = '256x256'
  const inputImgSizeInvalid = 'foobar'
  expect(isValidImageSize(inputImgSizeTooSmall)).toBe(false)
  expect(isValidImageSize(inputImgSizeValid)).toBe(true)
  expect(isValidImageSize(inputImgSizeTooBig)).toBe(false)
  expect(isValidImageSize(inputImgSizeInvalid)).toBe(false)
})

test('only items with a count greater that 1 are returned', () => {
  const dataCountIsZero = [{
    'name': 'Robert',
    'count': 0
  }]
  const dataCountIsBiggerZero = [{
    'name': 'Peter',
    'count': 20
  }]
  expect(getFilteredPayload(dataCountIsZero)).toBe(false)
  expect(getFilteredPayload(dataCountIsBiggerZero)).toBeTruthy()
})