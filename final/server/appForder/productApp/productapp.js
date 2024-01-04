const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');
const multer = require('multer');
const path = require('path');


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



// app.post('/node/photos', upload.array('file'), (req, res) => {
// 	let filenames = req.files.map((file) => file.filename);
// 	res.json({ filenames });
// });

// 이미지 post 라우팅 처리
router.post("/ptupload", async (req,rep) =>{
    let result = await mysql.query("ptinsert", req.body.param);
    rep.send(result);
})

router.get("/ptlist", async (req,rep) =>{
    let result = await mysql.query("ptlist");
    rep.send(result);
})

router.get("/ptlist/:no", async(req,rep)=>{
    let result = await mysql.query("ptinfo", req.params.no);
    rep.send(result[0]);
})

// 사용자 상품 리스트
router.get('/user', async (req,res)=>{
    let list = await mysql.query('userProductList');
    res.send(list);
})

// 메인페이지 랜덤 6가지
router.get('/random', async (req, res) => {
    let list = await mysql.query('productRandomList');
    console.log("여기",list);
    res.send(list);
});

// 사용자 상품 단건
router.get('/user/:prod_code', async (req,res) =>{
    let data = req.params.prod_code;
    let userProdInfo = await mysql.query('userProductInfo',data);
    res.send(userProdInfo[0])
})

// 관리자 (사용자회원 리스트)
router.get('/adminUser', async (req,res)=>{
    let list = await mysql.query('adminUserList')
    res.send(list);
})

// 관리자 상품 리스트
router.get('/', async(req,res)=>{
    let list = await mysql.query('productList');
    res.send(list);
});

// 단건
router.get('/:prod_code', async(req,res) =>{
    let data = req.params.prod_code;
    let prodInfo = await mysql.query('productInfo',data);
    res.send(prodInfo[0]);
})


// 상품등록 insert
// router.post('/insert', async (req, res) => {
//     let data = req.body.param;
//     console.log(data);
//     let result = await mysql.query('productInsert', data);
//     res.send(result);

// })

// 상품수정
router.put('/update/:prod_code', async (req,res) =>{
    let data = [req.body.param, req.params.prod_code];
    let result = await mysql.query('productUpdate', data);
    res.send(result);
})

// 상품삭제 
router.delete('/delete/:prod_code', async (req,res) => {
    let data = req.params.prod_code;
    let result = await mysql.query('productDelete', data);
    res.send(result);
})



// 검색
router.get('/search/:prod_name', async (req,res) =>{
    let data = req.params.prod_name;
    let result = await mysql.query('productSearch' , data);
    res.send(result)
    
    // try{
    //     const productService = new ProductService();
    //     result = await productService.sellerDeliverySearchUserName(search);
    //     res.send(result)
    // }
    // catch(e){
    //     console.log(e);
    // }
})


router.post('/rsphotos', uploadRs.array('files'), async (req, res) => {
	try {
		let rsInfo = req.body.rsobj;
		rsInfo = JSON.parse(rsInfo);

		if (req.files && req.files.length >= 1) {
			rsInfo.prod_img = req.files[0].filename;
		
		} else {
			rsInfo.prod_img = null;
		}
		// console.log(rsInfo);
		

		let result = await mysql.query('rsInsert', rsInfo);

		console.log(result);
        if(result.affectedRows == 1){
            
            res.status(200).json({success : true});
        } else {
            res.status(500).json({success : false});
        }
		
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false });
	}
});
module.exports = router;