const list = async (signal) => {
  try {
    let response = await fetch('/api/books', {
      method: 'GET',
      signal: signal
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const create = async (credentials, book) => {
  try {
    let response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(book)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export { list, create }
