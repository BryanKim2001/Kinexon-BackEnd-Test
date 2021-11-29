const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://anaheim901:bryan0627@cluster0.ttqy4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
	const db = client.db('kinexon-test-data')
	const quotesCollection = db.collection('suicides')
	app.set('view engine', 'ejs')
	
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(express.static('public'))
	app.use(bodyParser.json())
	
	app.listen(3000, function() {
		console.log('listening on 3000')
	})
	
app.put('/suicides', (req, res) => {
  quotesCollection.findOneAndUpdate(
  { name: 'Zhong Xina' },
  {
    $set: {
      distance: req.body.distance,
      accum: req.body.accum
    }
  },
  {
    upsert: true
  }
)
  .then(result => {
	  res.redirect('/')
     })
  .catch(error => console.error(error))
})

app.post('/kinexon', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
	  res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.get('/', (req, res) => {
  db.collection('suicides').find().toArray()
    .then(results => {
      res.render('index.ejs', { stats: results })
    })
    .catch(/* ... */)
})
	

	
  })
  .catch(error => console.error(error))