const multer = require("multer"); // 멀터
const path = require("path"); // path
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads/");
    },
    filename: function (req, file, cb){
        cb(null, new Date().valueOf + path.basename(file.originalname));
    }
});

const upload = multer({storage : storage});

router.post("/profile", upload.single("avatar"), (req,res) =>{
    //여기가 단일 처리
    console.log(req.file);
    console.log(req.body);
})


router.post("/photos", upload.array("photos", 12), (req,res) =>{
    for (let file of req.files){
        //여러건
        console.log(file);
    }
})

router.listen(5000, () =>{
    console.log("서버 시....ㅂ 작");
})