import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <h1>Library</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/books">Books</Link>
      </nav>
      <hr />
    </div>
  )
}
