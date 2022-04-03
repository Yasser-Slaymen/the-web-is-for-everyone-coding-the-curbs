const { request } = require('express');
const express = require('express')
const app = express();
const port =7000 ;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
// const Base_url = 'https://codingthecurbs.api.fdnd.nl/v1/smartzone'



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

app.get('/',(request,response) => {
    fetchJson(`https://codingthecurbs.api.fdnd.nl/v1/smartzone/${request.params.name}`)
    .then(function(JsonData){
          response.render('pages/namen',{
              title: 'Dit is sorteren bij name',
              naam:JsonData.data[0]

          })
    })
})

app.listen(port, () =>{
    console.log(`listening to the port ${port}`)
})
async function fetchJson(url) {
    return await fetch(url)
      .then((response) => response.json())
      .catch((error) => error)
  }