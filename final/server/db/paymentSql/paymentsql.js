//[김준성]
//커밋테스트용
module.exports = {
   payList : `SELECT p.*, COUNT(c.BNO) AS comment_count
                   FROM T_BOARD_BOARD p
                   LEFT JOIN T_COMMENT_BOARD c ON p.NO = c.BNO
                   GROUP BY p.NO`,
   noticeList : `select * from notice`,
   orderInsert : `insert into prod_order set ?`
}