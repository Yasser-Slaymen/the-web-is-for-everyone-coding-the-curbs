// const  express = require('express');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const BaseUrl = 'https://codingthecurbs.api.fdnd.nl/v1/smartzone'
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
// Create application/ form- urlen coded parser
const urlencodedParser = bodyParser.urlencoded({extended:false})


// serve public files
app.use(express.static('public'))
app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({ extended: true }));


// hook up tamplats engine
app.set('view engine', 'ejs')
app.set('views', './views')



// Method:GET

// identification route
app.get('/',(request, response) =>{

    fetchJson(BaseUrl)
    .then(function(JsonData) {
        response.render('pages/smartzones', {
            title:'Smart Zones',
            smartzones: JsonData.data
        })
    })
})

app.get('/zones/:smartzonesId',(request,response) => {
    fetchJson(`${BaseUrl}/${request.params.smartzonesId}`)
    .then(function(JsonData){
          response.render('pages/namen',{
              title: 'Dit is sorteren bij name',
              zones:JsonData.data[0]

          })
    })
})


// Method:POST
app.post('/add', urlencodedParser, (request,response) =>{

    const postData = {
        method:'POST',
        body:JSON.stringify(request.body),
        headers:  {'Content-Type': 'application/json'}

    }

    fetchJson(BaseUrl, postData).then(function () {
        response.render('pages/add', {
          title: 'add new post',
        })
      })

})

//  Post renderen add page in de link
app.get('/add',(request,response) => {
    response.render('pages/add', {
        title: 'add new post',
    })
})

// Methode: Delete


app.post('/delete', urlencodedParser, (request,response) =>{
    const postData = {
        method:'DELETE',
        body:JSON.stringify(request.body),
        headers:  {'Content-Type': 'application/json'}

    }

    fetchJson(BaseUrl, postData).then(function () {
        response.render('pages/delete', {
          title: 'delete ',
        })
      })

})

//  renderen  page Delete in de link
app.get('/delete',(request,response) => {
    response.render('pages/delete', {
        title: 'delete',
    })
})


// Start Server
const port = process.env.PORT || 7000
app.listen(port, () =>{
    console.log(`listening to the port ${port}`)

})

async function fetchJson(BaseUrl, postData = {}) {
    return await fetch(BaseUrl, postData)
      .then((response) => response.json())
      .catch((error) => error)
}
