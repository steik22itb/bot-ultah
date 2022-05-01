const express = require ('express');
const https = require('https');
const app = express();

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  app.sendStatus(200);
})

app.post("/webhook", (req, res) => {
  res.send("HTTP send to webhook");
})



const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN

app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`);
})
