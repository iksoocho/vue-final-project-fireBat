// 강현진 상품 CRUD
module.exports = {
    productList : `SELECT p.*, COUNT(c.BNO) AS comment_count
                    FROM T_BOARD_BOARD p
                    LEFT JOIN T_COMMENT_BOARD c ON p.NO = c.BNO
                    GROUP BY p.NO`,
    // 등록
    productInsert : `INSERT INTO product SET
                     prod_code, prod_name, prod_content, prod_price, prod_count, prod_loc, prod_cate`,

    //수정
    productUpdate : `UPDATE product SET ? WHERE prod_code = ? `,

    //삭제
    productDelete : `DELETE * FROM product WHERE prod_code = ? `,
}