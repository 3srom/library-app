import app from './server/express.js'

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Library app.' })
})

app.listen(3000, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port 3000.')
})
