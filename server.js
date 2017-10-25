import request from 'request'
import express from 'express'
import bodyparser from 'body-parser'
import fs from 'fs'

global.__base = __dirname;

var app = express();
var port = process.env.PORT || 5656;

app.use(bodyparser.json());
app.use(bodyparser({ urlencoded: true }));



app.listen(port, () => console.log(`App started on port ${port}`))