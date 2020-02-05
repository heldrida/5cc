// helpers

const IMG_SIZE_MINIMUM = 16*16
const IMG_SIZE_MAXIMUM = 128*128

const isValidImageSize = (size) => {
  let isValid
  const sizeValues = size.split('x')
  if (sizeValues.every((num, i, list) => num === list[0] )) {
    const total = sizeValues.reduce((acc, curr) => Number(acc) * Number(curr))
    isValid = total > IMG_SIZE_MINIMUM && total <= IMG_SIZE_MAXIMUM
  }
  return isValid
}

const extractImageFromValidated = (validLogos) => Array.isArray(validLogos) && validLogos.pop().url

const getFilteredPayload = (payload) => {
  const filtered = payload.filter(data => data.count > 0)
  return filtered.length > 0 && filtered
}

const jsonPostHandler = (payload) => {
  const filteredData = getFilteredPayload(payload)
  const data = Array.isArray(filteredData) && filteredData.map(data => {
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
  return computedResponse
}

const hasPayloadDataCorrectFormat = (payloadData) => {
  const requiredProps = ['name', 'count', 'logos']
  const hasAllProps = requiredProps.every(prop => payloadData.hasOwnProperty(prop))
  return hasAllProps
}

const isPayloadValid = (payload) => payload.every(hasPayloadDataCorrectFormat)

const isUserRequestValid = (requestBody) => {
  const hasPayload = requestBody.hasOwnProperty('payload')
  const hasData = requestBody.payload.length > 0
  const hasPayloadValidData = hasPayload && hasData && isPayloadValid(requestBody.payload)
  return hasPayloadValidData
}

module.exports = {
  isValidImageSize,
  extractImageFromValidated,
  jsonPostHandler,
  getFilteredPayload,
  hasPayloadDataCorrectFormat,
  isPayloadValid,
  isUserRequestValid
}