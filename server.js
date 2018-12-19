const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const apiKey = '################'
// giving permissions to use the public folder
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
// set ejs as the rendering engine to use templates
app.set('view engine', 'ejs')
app.locals.weather = ''
app.locals.error = ''
app.get('/', function (req, res) {
  // to print hello world
  // res.send('Hello world!')

  // render() is used to render the index.ejs from the ejs templating engine
  res.render('index', { weather: null, error: null })
})

app.post('/', function (req, res) {
  // console.log(req.body.city)
  let city = req.body.city
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again' })
    } else {
      let weather = JSON.parse(body)
      if (weather.main === undefined) {
        res.render('index', { weather: null, error: 'Error, please try again' })
      } else {
        let weatherText = `It is ${weather.main.temp} degress in ${weather.name}`
        res.render('index', { weather: weatherText, error: null })
      }
    }
  })
})

app.listen(3000, function () {
  console.log('express app is listening on port 3000')
})
