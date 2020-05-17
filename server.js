const Clarifai = require('clarifai');
const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'Smart-Brain'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data)
})  

const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res) => {
    res.send("It is working")
})

//sign in
app.post('/signin',(req, res) => { signIn.handlesignIn(req, res, db, bcrypt)})

//register
app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})

//profile/userId
app.get('/profile/:id',(req,res) => { profile.handleProfileGet(req, res, db)})

//entries
app.put('/image',(req, res) => { image.handleImage(req, res , db)})

//imageUrl

app.post('/imageUrl',(req,res) => { image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})

//PLANNING -->
/*
/--> res = this is working
/signin --> POST = success/fail
/-register --> POST = user
/profile/:userId --> GET = user
/image --> PUT  --> user

*/