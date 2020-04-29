const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Multipassify = require('multipassify')
require('dotenv').config()


const multipassify = new Multipassify(process.env.MULTIPASS_SECRET)

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.post('/multipass', (req,res)=> {
  const { firstName,lastName, email } = req.body
  const multipassIdentifier = 'multipassNode'

  const customerData = {
    first_name: firstName,
    last_name: lastName,
    email,
    identifier: multipassIdentifier
  }
  const url = multipassify.generateUrl(customerData, "bowes-guitars.myshopify.com")
  return res.redirect(url)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})