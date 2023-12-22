require('dotenv').config({ path : './db/mysql.env'});
const express = require('express');
const app = express();
const bookRouter = require('./appForder/exampleApp/bookapp.js');
const fesRouter = require('./appForder/festivalApp/festivalapp.js');

app.use(express.json({
    limit : '50mb'
}));

app.listen(3000, ()=>{
    console.log('server start');
});

app.use('/board', bookRouter);

app.use('/festival', fesRouter);

