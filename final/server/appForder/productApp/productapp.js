const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

// 사용자 상품 리스트
router.get('/user', async (req,res)=>{
    let list = await mysql.query('userProductList');
    res.send(list);
})

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

// 상품삭제 
router.delete('/delete/:prod_code', async (req,res) => {
    let data = req.params.prod_code;
    let result = await mysql.query('productDelete', data);
    res.send(result);
})

// 메인페이지 랜덤 6가지
router.get('/random', async (req, res) => {
    let list = await mysql.query('productRandomList');
    console.log("여기",list);
    res.send(list);
});

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


// router.get('/search', (req, res) => {
//     const keyword = req.query.keyword; // 검색어를 쿼리 파라미터로 받음
  
//     // 검색 결과 필터링
//     const searchResults = products.filter(product =>
//       product.name.toLowerCase().includes(keyword.toLowerCase())
//     );
  
//     res.json(searchResults);
//   });

module.exports = router;