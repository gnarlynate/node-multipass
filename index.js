var express = require('express')
var app = express()
require('dotenv').config()

const bodyParser = require('body-parser')
const Multipassify = require('multipassify')
const multipassify = new Multipassify(process.env.MULTIPASS_SECRET)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.post('/multipass', (req,res)=> {
  const { firstName,lastName, email } = req.body
  const multipassIdentifier = 'multipassNode'

  var customerData = {
    first_name: firstName,
    last_name: lastName,
    email,
    identifier: multipassIdentifier
  }
  var token = multipassify.encode(customerData)
  var url = multipassify.generateUrl(customerData, "bowes-guitars.myshopify.com")
  return res.redirect(url)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})