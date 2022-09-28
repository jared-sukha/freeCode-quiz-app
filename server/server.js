const path = require('path')
const express = require('express')
const server = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '..', 'build')

server.use(express.static(publicPath))

server.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})
