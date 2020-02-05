// helpers

const IMG_SIZE_MINIMUM = 16*16
const IMG_SIZE_MAXIMUM = 128*128

const isValidImageSize = (size) => {
  const total = size.split('x').reduce((acc, curr) => Number(acc) * Number(curr))
  return total > IMG_SIZE_MINIMUM && total <= IMG_SIZE_MAXIMUM 
}

const extractImageFromValidated = (validLogos) => Array.isArray(validLogos) && validLogos.pop().url

module.exports = {
  isValidImageSize,
  extractImageFromValidated
}