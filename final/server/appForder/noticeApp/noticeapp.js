const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');
const multer = require('multer');
const path = require('path');

//전체 조회
router.get('/', async (req, res) => {
    let list = await mysql.query('noticeList');
    res.send(list);
});

//단건 조회
router.get('/:notice_no', async (req, res) => {
    let data = req.params.notice_no;
    let list = await mysql.query('noticeInfo', data);
    res.send(list[0]);
});




//수정
router.put('/:notice_no', async(req,res)=>{
    let datas = [req.body.param, req.params.notice_no];
    let result =  await mysql.query('noticeUpdate', datas)
    res.send(result);
});

//삭제
router.delete('/:notice_no', async(req,res)=>{
    let data = req.params.notice_no;
    let result = await mysql.query('noticeDelete', data);
    res.send(result);
});

//등록
router.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.query('noticeInsert', data);
    res.send(result);
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



//이미지 or 파일 등록
  router.post('/noticePhoto', upload.array('files'), async (req, res) => {
	let bno = req.body.bno;
	let filenames = req.files.map((file) => file.filename);
	console.log(filenames);
	for (let filename of filenames) {
		let result = await mysql.query('noticeImgInsert', [bno, filename]);
	}
	res.json({ filenames });
});


//qna 이미지 삭제
router.delete('/deleteImg/:notice_no', async (req,res) => {
    let data = req.params.notice_no;
    let result = await mysql.query('noticeImgDelete', data);
    res.send(result);
})



//qna 이미지  조회
router.get('/selectAllImg/:notice_no', async(req,res)=>{
    let data = req.params.notice_no;
    let prodImg = await mysql.query('noticeImgSelect',data);
    res.send(prodImg);
})

//파일 다운
router.get('/download/:filename', (req, res) => {
    let filename = req.params.filename; // 실제 이미지 파일의 이름
    let customPath = path.resolve(__dirname, '..', '..'); // 원하는 디렉토리의 경로

    let imagePath = path.join(customPath, 'img', 'uploads', filename); // 이미지 전송
    res.download(imagePath);
});

module.exports = router;
