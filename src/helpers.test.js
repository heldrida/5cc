const request = require('./data/request.js')
const response = require('./data/response.js')
const { isValidImageSize, extractImageFromValidated } = require('./helpers')

test('name and count match their respective properties from the payload', () => {
  const filteredData = request.payload.filter(data => data.count > 0)
  const data = filteredData.map(data => {
    const { name, count, logos } = data
    const validLogos = logos.filter(lData => isValidImageSize(lData.size) && lData.url)
    const thumbnail = extractImageFromValidated(validLogos)
    return {
      name,
      count,
      thumbnail
    }
  })
  const computedResponse = {
    response: data
  }
  expect(computedResponse).toEqual(response)
})