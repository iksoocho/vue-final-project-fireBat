const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');


router.get('/', async (req, res) => {
    let list = await mysql.query('fesList');
    res.send(list);
    
});



module.exports = router;