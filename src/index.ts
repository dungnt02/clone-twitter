import express from 'express'
const router = express.Router()
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/tweets', (req, res) => {
  res.send('Birds home page')
})
app.use('/api', router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
