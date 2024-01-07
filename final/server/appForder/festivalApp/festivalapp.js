const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');
const multer = require('multer');
const path = require('path');


// 축제 전체리스트
// router.get('/', async (req, res) => {
//     let list = await mysql.query('fesList');
//     res.send(list);
// });

// 축제 리스트 - 테스트
router.get('/', async (req,res)=>{
    let list = await mysql.query('fesList');
      // 각 제품에 대한 이미지 데이터 가져오기
     for (const fes of list) {
         let fesImg = (await mysql.query('fesImgSelect',fes.f_code))[0];
        //  fes.fesImg = fesImg.f_filename;
         fes.fesImg = fesImg ? fesImg.f_filename : '';
     }
    res.send(list);
})

// 메인페이지 랜덤 6가지
router.get('/random', async (req, res) => {
    let list = await mysql.query('fesRandomList');
    res.send(list);
});


// 달력 일별 조회
router.get('/calender/:date', async (req, res) => {
    let date = req.params.date;
    let list = await mysql.query('fesCalList',date);
    for (const fes of list) {
         let fesImg = (await mysql.query('fesImgSelect',fes.f_code))[0];
        //  fes.fesImg = fesImg.f_filename;
         fes.fesImg = fesImg ? fesImg.f_filename : '';
     }
    res.send(list);
})

// 단건 조회
router.get('/:f_code', async(req, res)=>{
    let data = req.params.f_code;
    let list = await mysql.query('fesInfo', data);
    res.send(list[0]); //mysql에서 select는 무조건 배열로 넘오 오기 때문에 단건 조회일 경우 list[0]로 해줘야됨
});

// 축제 등록
router.post('/insert', async (req, res) => {
    let data = req.body.param;   // 데이터를 넘길때 req body에 들어감
    let result = await mysql.query('fesInsert', data);
    res.send(result);
});

// 축제 수정
router.put('/update/:f_code', async (req,res) =>{
    let data = [req.body.param, req.params.f_code];
    let result = await mysql.query('fesUpdate', data);
    res.send(result);
});
// 축제 삭제
router.delete('/delete/:f_code', async (req,res) =>{
    let data = req.params.f_code;
    let result = await mysql.query('fesDelete', data);
    res.send(result);
});

// 축제 검색
router.get('/search/:f_name', async (req,res) =>{
  let data = req.params.f_name;
  let result = await mysql.query('fesSearch' , [data,data,data,data,data,data,data,data,data]);
  res.send(result)
});






//////////////////////////////////////////////////////////////////////////////////////
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


  //축제 이미지 등록
  router.post('/fesPhoto', upload.array('files'), async (req, res) => {
	let bno = req.body.bno;
	let filenames = req.files.map((file) => file.filename);
	console.log(filenames);
	for (let filename of filenames) {
		let result = await mysql.query('fesImgInsert', [bno, filename]);
	}
	res.json({ filenames });
});


//축제 이미지 삭제
router.delete('/deleteImg/:f_code', async (req,res) => {
    let data = req.params.f_code;
    let result = await mysql.query('fesImgDelete', data);
    res.send(result);
})

//축제 대표 이미지  조회
router.get('/selectImg/:f_code', async(req,res)=>{
    let data = req.params.f_code;
    let fesImg = await mysql.query('fesImgSelect',data);
    res.send(fesImg[0]);
})

//축제  이미지  조회
router.get('/selectAllImg/:f_code', async(req,res)=>{
    let data = req.params.f_code;
    let fesImg = await mysql.query('fesImgSelect',data);
    res.send(fesImg);
});

// 축제 코드 중복 체크
// router.get('/fesCheckCode/:f_code', async (req, res) => {
//   try {
//     let data = req.params.f_code;
//     let result = await mysql.query('fesCheckCode', data);
//     let isDuplicate = result[0].count > 0; // 결과가 있으면 중복, 없으면 중복 아님

//     res.send({ isDuplicate });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });


//조익수 테스트
router.get('/fesCheckCode/:f_code', async (req, res) => {
  let data = req.params.f_code;
  let list = await mysql.query('fesCheckCode', data);
  res.send(list[0]); //mysql에서 select는 무조건 배열로 넘오 오기 때문에 단건 조회일 경우 list[0]로 해줘야됨
});
module.exports = router;
