const express = require('express');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const DB = require("./database.js");
const mongoose= require("mongoose");
require('dotenv').config();

var kittySchema = new mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

const kitten1 = new Kitten({
    name: "red cat 2"
});


const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0-5x1uj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URL)
    .then (() => {
        console.log("database success");
        kitten1.save(err => {
           if(err){
               console.error("we had an error");
           }
           else{
               console.log("success save");
           }
        });
    })
    .catch(err =>{
        console.error("error happened",err);
    });


/* get all items*/
app.get("/api/items", (req, res)=>{
    res.json(DB.getItems())
});

/*get item ID järgi*/
app.get("/api/items/:itemId", (req, res)=>{
    res.send(DB.getItem(req.params.itemId));
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get('/items/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static('dist'));

// heroku vajab process.env.PORT
app.listen(PORT, () => {
    console.log("Server started", PORT);
    console.log(`http://localhost:${PORT}`);
});