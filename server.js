const express = require('express')
const path = require("path");
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "static", "index.html"));
})

app.use(express.static('static'));

// heroku vajab process.env.PORT
app.listen(process.env.PORT || PORT, () => {
    console.log("Server started", PORT);
});