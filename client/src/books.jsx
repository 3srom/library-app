import React, { useState, useEffect } from 'react'
import { list } from '../book/api-book.js'

export default function Books() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setBooks(data || [])
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      <h2>Books</h2>
      {books.length === 0 ? (
        <p>No books yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.available} / {book.copies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
