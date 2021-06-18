const { request } = require("http");

const express = request('express');
const path = require('path');

const app = express();


app.use(express.stactic('./dist/client'));

app.get("/*", (req,res)=>
    res.sendFile('index.html', {root:'dist/front-end-app/'}),

);

app.listen(process.env.PORT || 8080);

