const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

router.get('/api/', async (req, res) => {
   let list = await mysql.query('payList');
   res.send(list);
});

router.get('/notice', async (req, res) => {
   let list = await mysql.query('noticeList');
   res.send(list);
});

router.post('/orderInsert', async (req, res) => {  //prod_order테이블 입력
   let data = req.body.param;
   let result = await mysql.query('orderInsert', data);
   res.send(result);
});

router.post('/orderDetailInsert', async (req, res) => {  //order_detail테이블 입력
   let data = req.body.param;
   let result = await mysql.query('orderDetailInsert', data);
   res.send(result);
});

router.get('/cart/:userId', async (req, res) => { //유저의 장바구니 리스트
   let data = req.params.userId;
   let list = await mysql.query('cartList', data);
   res.send(list);
});

router.get('/cart/:uid/:pco', async (req, res) => { //장바구니에 상품존재유무체크
   let data = [req.params.uid, req.params.pco];
   let list = await mysql.query('cartSearch', data);
   res.send(list);
});


router.put("/cart/:poc/:cno", async (req, res) => { // 장바구니 수량 변경
   let data = [req.params.poc, req.params.cno];
   let list = await mysql.query("cartUpdate", data);
   res.send(list);
 });

 router.put("/cartSelect/:sel/:cno", async (req, res) => { // 개별 상품선택상태(체크박스상태)변경
   let data = [req.params.sel, req.params.cno];
   let list = await mysql.query("cartSelectUpdate", data);
   res.send(list);
 });

 router.put("/cartAllSelect/:sel/:uid", async (req, res) => { // 전체 상품선택상태(체크박스상태)변경
   let data = [req.params.sel, req.params.uid];
   let list = await mysql.query("cartAllSelectUpdate", data);
   res.send(list);
 });

router.post("/cart", async (req, res) => { // 장바구니 추가
   let data = req.body.param;
   let result = await mysql.query("cartInsert", data);
   res.send(result);
 });

router.delete("/cart/:uid/", async (req, res) => {
   let data = req.params.uid;
   let result = await mysql.query("cartDelete", data);
   res.send(result);
});

router.get('/cartOrder/:uid', async (req, res) => { //유저의 선택된 장바구니 리스트
   let data = req.params.uid;
   let list = await mysql.query('cartOrderList', data);
   res.send(list);
});

router.get('/orderList/:mid', async (req, res) => { //유저의 선택된 장바구니 리스트
   let data = req.params.mid;
   let list = await mysql.query('orderList', data);
   res.send(list[0]);
});

router.get('/orderDetailList/:mid', async (req, res) => { //유저의 선택된 장바구니 리스트
   let data = req.params.mid;
   let list = await mysql.query('orderDetailList', data);
   res.send(list);
});

module.exports = router;