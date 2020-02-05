// helpers

const IMG_SIZE_MINIMUM = 16*16
const IMG_SIZE_MAXIMUM = 128*128

const isValidImageSize = (size) => {
  const total = size.split('x').reduce((acc, curr) => Number(acc) * Number(curr))
  return total > IMG_SIZE_MINIMUM && total <= IMG_SIZE_MAXIMUM 
}

const extractImageFromValidated = (validLogos) => Array.isArray(validLogos) && validLogos.pop().url

const jsonPostHandler = (payload) => {
  const filteredData = payload.filter(data => data.count > 0)
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
  return computedResponse
}

module.exports = {
  isValidImageSize,
  extractImageFromValidated,
  jsonPostHandler
}