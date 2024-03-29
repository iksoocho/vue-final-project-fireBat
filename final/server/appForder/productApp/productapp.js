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


  router.post('/prodPhoto', upload.array('files'), async (req, res) => {
	let bno = req.body.bno;
	let filenames = req.files.map((file) => file.filename);
	console.log(filenames);
	for (let filename of filenames) {
		let result = await mysql.query('prodImgInsert', [bno, filename]);
	}
	res.json({ filenames });
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
// router.get('/user', async (req,res)=>{
//     let list = await mysql.query('userProductList');
//     res.send(list);
// })

// 사용자 상품 리스트 - 테스트
router.get('/user', async (req,res)=>{
    let list = await mysql.query('userProductList');

      // 각 제품에 대한 이미지 데이터 가져오기
    for (const prod of list) {
        let prodImg = (await mysql.query('prodImgSelect',prod.prod_code))[0];
        prod.prodImg = prodImg ? prodImg.prod_filename : '';
    }
    res.send(list);
})

// 메인페이지 랜덤 6가지
router.get('/random', async (req, res) => {
    let list = await mysql.query('productRandomList');
    for (const prod of list) {
        let prodImg = (await mysql.query('prodImgSelect',prod.prod_code))[0];
        prod.prodImg = prodImg ? prodImg.prod_filename : '';
    }
    res.send(list);
});

// 사용자 상품 단건
router.get('/user/:prod_code', async (req,res) =>{
    let data = req.params.prod_code;
    let userProdInfo = await mysql.query('userProductInfo',data);
    res.send(userProdInfo[0])
})

// 관리자 (사용자회원 리스트)
router.get('/adminUser/user', async (req,res)=>{
    let list = await mysql.query('adminUserList')
    console.log(list)
    res.send(list);
})

// 관리자 상품 리스트
router.get('/', async(req,res)=>{
    let list = await mysql.query('productList');
    res.send(list);
});

// 관리자 차트 리스트
router.get('/adminList', async(req,res)=>{
    let list = await mysql.query('adminChartList');
    res.send(list)
})

// 관리자 상품 리스트 차트
router.get('/chart/:prodNo/:period/:minPrice/:maxPrice', async (req, res) => {
        let period = req.params.period;
        let minPrice = req.params.minPrice;
        let maxPrice = req.params.maxPrice;
        

    let list = await mysql.query('adminChart');
    res.send(list);
});

// 단건
router.get('/:prod_code', async(req,res) =>{
    let data = req.params.prod_code;
    let prodInfo = await mysql.query('productInfo',data);
    res.send(prodInfo[0]);
})


// 상품등록 insert
router.post('/insert', async (req, res) => {
    let data = req.body.param;
    console.log(data);
    let result = await mysql.query('productInsert', data);
    res.send(result);

})

// 상품수정
router.put('/update/:prod_code', async (req,res) =>{
    let data = [req.body.param, req.params.prod_code];
    let result = await mysql.query('productUpdate', data);
    res.send(result);
})

// 품절 or 판매가능
router.put("/state/:prod_state/:prod_code", async (req, res) => {
    let data = [req.params.prod_state, req.params.prod_code]
    let list = await mysql.query('prodState', data);
    res.send(list);
});

// 배송중 or 배송완료
router.put("/state1/:delivery_state/:delivery_no", async (req, res) => {
    let data = [req.params.delivery_state, req.params.delivery_no]
    console.log(data);
    let list = await mysql.query('delState', data);
    res.send(list);
});

// 상품삭제 
router.delete('/delete/:prod_code', async (req,res) => {
    let data = req.params.prod_code;
    let result = await mysql.query('productDelete', data);
    res.send(result);
})

//상품 이미지 삭제
router.delete('/deleteImg/:prod_code', async (req,res) => {
    let data = req.params.prod_code;
    let result = await mysql.query('prodImgDelete', data);
    res.send(result);
})

//상품 대표 이미지  조회
router.get('/selectImg/:prod_code', async(req,res)=>{
    let data = req.params.prod_code;
    let prodImg = await mysql.query('prodImgSelect',data);
    res.send(prodImg[0]);
})

//상품  이미지  조회
router.get('/selectAllImg/:prod_code', async(req,res)=>{
    let data = req.params.prod_code;
    let prodImg = await mysql.query('prodImgSelect',data);
    res.send(prodImg);
})

// 관리자 상품 재고 관리
router.get('/prodInven/Inventory', async(req,res) =>{
    let prodInvent = await mysql.query('adminProdInven')
    res.send(prodInvent);
})

// 검색 관리자 상품리스트
router.get('/search/:prod_name', async (req,res) =>{
    let data = req.params.prod_name;
    let result = await mysql.query('productSearch' , [data,data,data,data]);
    res.send(result)
})
// 검색 관리자 회원 검색
router.get('/search2/:user_name', async (req,res) =>{
    let data = req.params.user_name;
    let result = await mysql.query('userSearch', [data,data]);
    
    res.send(result);
})

// 관리자 배송정보 검색
router.get('/search3/:user_name', async (req,res) =>{
    let data = req.params.user_name;
    let result = await mysql.query('delSearch', [data,data,data,data,data]);
    console.log(result)
    res.send(result);
})

// 관리자 주문정보 검색
router.get('/search4/:user_name', async (req,res) =>{
    let data = req.params.user_name;
    let result = await mysql.query('delSearch2', [data,data,data,data,data,data,data]);
    console.log(result)
    res.send(result);
})

// 사용자 상품 리스트 검색 이건 이름으로만
router.get('/search1/:prod_name', async(req,res)=>{
    let data = req.params.prod_name;
    let list = await mysql.query('userProductSearch', data)
    for (const prod of list) {
        console.log('prod.f_code :',prod.prod_code)
        let prodImg = (await mysql.query('prodImgSelect',prod.prod_code))[0];
        console.log('prod.prodImg :',prodImg)
        prod.prodImg = prodImg ? prodImg.prod_filename : '';
    }
    res.send(list)
})

// 배송정보 불러오기
router.get('/delivery/delList', async(req,res)=>{
    let list = await mysql.query('deliveryList')
    res.send(list);
})

// 주문정보 불러오기
router.get('/deliveryList/delInfoList', async(req,res)=>{
    let list = await mysql.query('orderInfoList')
    res.send(list);
})


//지역 같은 축제 리스트
router.get('/prodInFes/:prod_loc', async (req, res) => {
  let data = req.params.prod_loc;
  let list = await mysql.query('prodInFes', data);

  for (const fes of list) {
        let fesImg = (await mysql.query('fesImgSelect',fes.f_code))[0];
        //  fes.fesImg = fesImg.f_filename;
        fes.fesImg = fesImg ? fesImg.f_filename : '';
    }
    res.send(list);
})


module.exports = router;