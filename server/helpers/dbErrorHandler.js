const getErrorMessage = (err) => {
  let message = ''
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err)
        break
      default:
        message = 'Something went wrong'
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message)
        message = err.errors[errName].message
    }
  }
  return message
}

// newer mongo puts the field in err.keyValue, the old substring trick gave garbage
const getUniqueErrorMessage = (err) => {
  let output
  try {
    let fieldName = Object.keys(err.keyValue)[0]
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
  } catch (ex) {
    output = 'Unique field already exists'
  }
  return output
}

export default { getErrorMessage }
