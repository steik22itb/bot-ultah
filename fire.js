const { initializeApp } = require('firebase/app')
require('firebase/database')
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyDyCg4AybmN02PLwbZRtQ2Al7PDQOX4ww0",
  authDomain: "data-angkatan.firebaseapp.com",
  databaseURL: "https://data-angkatan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "data-angkatan",
  storageBucket: "data-angkatan.appspot.com",
  messagingSenderId: "262183343988",
  appId: "1:262183343988:web:5d8192d5e5cceabab13e21",
  measurementId: "G-PJ46R2B3QS"
};

// Initialize Firebase
var fire = initializeApp(firebaseConfig);
console.log(fire)

var router = require('express').Router()
var bodyParser = require('body-parser')
var db = fire.database()
router.use(bodyParser.json())

router.get('/data', (req, res)=>{
    res.rend("hello!")
})

module.exports = route
