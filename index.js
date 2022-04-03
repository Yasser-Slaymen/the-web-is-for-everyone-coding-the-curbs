const { request } = require('express');
const express = require('express')
const app = express();
// const port =7000 ;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))



// serve public files
app.use(express.static('public'))
app.use('/assets', express.static('assets'))

// hook up tamplats engine
app.set('view engine', 'ejs')
app.set('views', './views')




// identification route
app.get('/',(request, response) =>{

    fetchJson('https://codingthecurbs.api.fdnd.nl/v1/smartzone')
    .then(function(JsonData) {
        response.render('pages/smartzones', {
            title:'Smart Zones',
            smartzones: JsonData.data
        })
    })
    // response.render('pages/home')
})

app.get('/zones/:smartzonesId',(request,response) => {
    fetchJson(`https://codingthecurbs.api.fdnd.nl/v1/smartzone/${request.params.smartzonesId}`)
    .then(function(JsonData){
          response.render('pages/namen',{
              title: 'Dit is sorteren bij name',
              zones:JsonData.data[0]

          })
    })
})

const port = process.env.PORT || 7000
app.listen(port, () =>{
    console.log(`listening to the port ${port}`)
})
async function fetchJson(url) {
    return await fetch(url)
      .then((response) => response.json())
      .catch((error) => error)
  }