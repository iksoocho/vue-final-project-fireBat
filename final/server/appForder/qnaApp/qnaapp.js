const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');
const multer = require('multer');
const path = require('path');

//qna 전체 조회
router.get('/', async (req, res) => {
    let list = await mysql.query('qnaList');
    res.send(list);
});

//단건 조회
router.get('/:qna_no', async (req, res) => {
    let data = req.params.qna_no;
    let list = await mysql.query('qnaInfo', data);
    res.send(list[0]);
});


//해당 상품의 qna만 가져오기
router.get('/qnaProduct/:prod_code', async (req, res) => {
    let data = req.params.prod_code;
    let list = await mysql.query('qnaProductLsit', data);
    res.send(list);
});

//insert할때 회원 번호를 회원 아이디로 불러오기
router.get('/userNo/:user_id', async (req, res) => {
    let data = req.params.user_id;
    let list = await mysql.query('userNoForInsert', data);
    res.send(list[0]);
});

//등록
router.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.query('qnaInsert', data);
    res.send(result);
});

//수정
router.put('/:qna_no', async(req,res)=>{
    let datas = [req.body.param, req.params.qna_no];
    let result =  await mysql.query('qnaUpdate', datas)
    res.send(result);
});

//삭제
router.delete('/:qna_no', async(req,res)=>{
    let data = req.params.qna_no;
    let result = await mysql.query('qnaDelete', data);
    res.send(result);
});

//답변 list
router.get('/answer/:qna_no', async (req, res) => {
    let data = req.params.qna_no;
    let list = await mysql.query('qnaAnswerList', data);
    res.send(list);
});

//답변 등록 
router.post('/answer', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.query('qnaAnswerInsert', data);
    res.send(result);
});

//답변 삭제 
router.delete('/answer/:qna_no', async(req,res)=>{
    let data = req.params.qna_no;
    let result = await mysql.query('qnaAnswerDelete', data);
    res.send(result);
});

//리뷰 리스트
router.get('/review/:prod_code', async (req, res) => {
    let data = req.params.prod_code;
    let list = await mysql.query('reviewList', data);
    res.send(list);
});







//--------------------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "img/uploads/");
    } ,
    filename: function (req, file, cb){
      cb(null, new Date().valueOf() + path.basename(file.originalname));
    }
  });
  
const storage_rs = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'img/restaurant/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().valueOf() + path.basename(file.originalname));
	},
});

  const upload = multer({ storage: storage });
  
  const uploadRs = multer({ storage: storage_rs });
  // 이미지 사용
  router.use("/public", express.static("img/"));
  // 이미지 등록
  router.post("/photo", upload.single("file"), (req,res) =>{
    let file = req.file;
    console.log(file);
    res.status(200).json({message: "등록성공", filename: file.filename});
  });


  router.post('/qnaPhoto', upload.array('files'), async (req, res) => {
	let bno = req.body.bno;
	let filenames = req.files.map((file) => file.filename);
	console.log(filenames);
	for (let filename of filenames) {
		let result = await mysql.query('qnaImgInsert', [bno, filename]);
	}
	res.json({ filenames });
});


//qna 이미지 삭제
router.delete('/deleteImg/:qna_no', async (req,res) => {
    let data = req.params.qna_no;
    let result = await mysql.query('qnaImgDelete', data);
    res.send(result);
})



//qna 이미지  조회
router.get('/selectAllImg/:qna_no', async(req,res)=>{
    let data = req.params.qna_no;
    let prodImg = await mysql.query('qnaImgSelect',data);
    res.send(prodImg);
})

module.exports = router;
