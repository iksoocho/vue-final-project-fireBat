//[김준성]
module.exports = {
   payList : `SELECT p.*, COUNT(c.BNO) AS comment_count
               FROM T_BOARD_BOARD p
               LEFT JOIN T_COMMENT_BOARD c ON p.NO = c.BNO
               GROUP BY p.NO`,
   noticeList : `select * from notice`,
   orderInsert : `insert into prod_order set ?`,
   cartList : `select c.* , p.prod_name, p.prod_price, p.prod_count
               from cart c join product p on c.prod_code = p.prod_code
               where user_no=(select user_no from user where user_id= ?)`,
   cartUpdate : `update cart set prod_order_count = ? where cart_no = ?`,
   cartInsert : `insert into cart set ?`,
   cartSearch : `select * from cart where user_no=? and prod_code=?`,
}