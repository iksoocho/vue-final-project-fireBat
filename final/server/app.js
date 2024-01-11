require('dotenv').config({ path: './db/mysql.env' });
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const qnaRouter = require('./appForder/qnaApp/qnaapp.js');
const userRouter = require('./appForder/memberApp/memberapp.js');
const fesRouter = require('./appForder/festivalApp/festivalapp.js');
const productRouter = require('./appForder/productApp/productapp.js');
const noticeRouter = require('./appForder/noticeApp/noticeapp.js');
const paymentRouter = require('./appForder/paymentApp/paymentapp.js');



app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 3600000
  }
}))

app.use(cors());

app.use('/qna', qnaRouter);
app.use('/user', userRouter);
app.use('/festival', fesRouter);
app.use('/product', productRouter);
app.use('/notice', noticeRouter);
app.use('/pay', paymentRouter);

app.listen(3000, () => {
  console.log('server start');
});

