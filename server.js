const line = require('@line/bot-sdk');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express');
const axios = require('axios');

// LINE APP
const config = {
    channelAccessToken: process.env.TOKEN || "L5J/lwEeHb7ygRkbdyXKZVZqTN2tYHeivNY15spwtYc7VyPe6qdNgIXFRBqOGTIZSUKVHlA/OnJuwbXHCnTMUWrHyex0Jzu1R3angEF29A/efbWnLeNVBSvXJSwwraN2rEWxgYBFDQnN2sUN9soYQgdB04t89/1O/w1cDnyilFU=",
    channelSecret: process.env.SECRET || "098384b2228d8dc2f1bc1df821aca255",
};
const client = new line.Client(config);
const app = express();

// app.get('/', (req, res) => {
//     // res.send('There\'s nothing here...');
//     res.send(200);
// });
app.post('/', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(mainProgram))
        .then((result) => res.json(result))
        .catch((error) => {
            console.error(`Promise error ${error}`);
        });
});


setInterval(() => {
  var a = Date();
  command.$date = a;
  // if(){
  //   client.pushMessage("Ub53f2be76e9253cdbd54ec9dd81bcf58", {type: 'text', text: "lolski lmao!"});
  // }
}, 1000)

var today = [];
setInterval(() => {
  var temp = new Date();
  today = temp.toString().split(" ");
  filterPpl();
}, 5000)

function filterPpl(){
  var fkey = {
    date: today[2],
    month: today[1]
  };

  arrayList.tdyUltah = command['$ultah'].filter((obj) => {
    if(obj.ttl[2] == fkey.date && obj.ttl[1] == fkey.month){
      return true;
    } else {
      return false;
    }
  }).map((item) => item)
}

var arrayList = {
  tdyUltah: []
}

// command list
var command = {
  $help : "Halo!\nIni bot doang kok\nList of commands:\n- $ceker\n- $date\n- $ultah",
  $ceker : "comand_prompt",
  $date : new Date(),
  $ultah : []
}

function mainProgram(event){
  var args = event.message.text.split(" ");
  if(event.message.text == "$ultah all"){
    var ans = ""
    command.$ultah.map((obj, key) => {
      console.log(obj.nama);
      ans = ans.concat(`${obj.nama}\n${obj.ttl}\n\n`)
    })
    console.log(ans)
    return client.replyMessage(event.replyToken, {type:'text', text: ans});
  } else if(event.message.text == "$ultah"){
    var ans = "none"
    // command.$ultah.map((obj, key) => {
    //   console.log(obj.nama);
    //   ans = ans.concat(`${obj.nama}\n${obj.ttl}\n\n`)
    // })
    // console.log(ans)
    // console.log(arrayList.tdyUltah);
    arrayList.tdyUltah.map((obj, key) => {
      ans = ans.concat(`${obj.nama}\n${obj.ttl[0]} ${obj.ttl[1]}\n\n`)
    })
    return client.replyMessage(event.replyToken, {type:'text', text: ans});
  } else if(command[event.message.text]) { //jika user tidak mengirimkan pesan berupa teks (bukan gambar, lokasi, atau sejenisnya)
    return client.replyMessage(event.replyToken, {type:'text', text: command[event.message.text]}); //balas dengan pesan "Hello, world"
  } else {
    console.log(event)
    return Promise.resolve(null) // ignore messages
  }
}
// END OF LINE app

// FIREBASE APP
const { initializeApp } = require('firebase/app')
const { getDatabase, ref, onValue } = require('firebase/database')

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

const app2 = initializeApp(firebaseConfig)
// const db = getDatabase(app)
const db = getDatabase()
const starCountRef = ref(db, "1zGgK6P_brBC5FW2-p643h6uPxNrWbgyS16iUeF_92lA/Form Responses 1/");
onValue(starCountRef, (snapshot) => {
  // const data = snapshot.val();
  // up$dateStarCount(postElement, data);
  var result = snapshot.val()
  var size = Object.keys(result).length -1
  for(var i=1;i<=size; i++){
    result[i]['Tanggal Lahir'] = new Date(result[i]['Tanggal Lahir']).toString().split(" ");
    command.$ultah.push({nama: result[i]['Nama Lengkap sesuai ktp atau ijazah'], ttl: (result[i]['Tanggal Lahir'])})
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log("Running on 3000")});
