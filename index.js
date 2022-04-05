const { request } = require('express');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
// Create application/ form- urlen coded parser
const urlencodedParser = bodyParser.urlencoded({extended:false})
// test
// const smartzones = require('./pagnes/smatsones').smartzones;

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
// renderen home page in de link
app.get('/home',(request,response) =>{
    response.render('pages/home')
})

// Method:POST
app.post('/home', urlencodedParser, (req,res) =>{
    // Prepare output in JSON format
    response = {
        smartzonesId:req.body.smartzonesId,
        name:req.body.name,
        town:req.body.town,
        location:req.body.location,
        function:req.body.function,
        time: req.body.time,
        size:req.body.size,
        utilization:req.body.utilization,
        description:req.body.description,
        image:req.body.image
    }
    console.log(response)
    res.end(JSON.stringify(response))

})

// Method:DELETE
app.delete('/smartzones:smartzoneId',(request,response) =>{
    const smartzoneId = request.params.smartzoneId;
    smartzones.delete(smartzoneId,(err) =>{
        if(err)return next(err);
        response.send(pages/smartzones)
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

