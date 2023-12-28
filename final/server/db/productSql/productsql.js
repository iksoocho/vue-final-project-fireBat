// 강현진 상품 CRUD
module.exports = {
    // 관리자 상품 리스트
    productList : `SELECT prod_code, prod_name, prod_price, prod_count, prod_loc, prod_cate,prod_date FROM product`,

    productInfo : `SELECT prod_code, prod_name, prod_price, prod_content, prod_count, prod_loc, prod_cate
    FROM product
    WHERE prod_code = ?`,

    // 등록
    productInsert : `INSERT INTO product SET ? `,

    //수정
    productUpdate : `UPDATE product SET ? WHERE prod_code = ? `,

    //삭제
    productDelete : `DELETE FROM product WHERE prod_code = ? `,
}