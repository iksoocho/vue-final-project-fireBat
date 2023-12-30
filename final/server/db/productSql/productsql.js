// 강현진 상품 CRUD
module.exports = {
    // 관리자 상품 리스트
    productList : `SELECT * FROM product`,

    productInfo : `SELECT prod_code, prod_name, prod_price, prod_content, prod_count, prod_loc, prod_cate
                    FROM product
                    WHERE prod_code = ? `,

    // 등록
    productInsert : `INSERT INTO product SET ? `,

    //수정
    productUpdate : `UPDATE product SET ? WHERE prod_code = ? `,

    //삭제
    productDelete : `DELETE FROM product WHERE prod_code = ? `,

    // 메인페이지 랜덤 6가지
    productRandomList : `SELECT * FROM product ORDER BY rand() limit 6`,

    // 사용자 상품 리스트 
    userProductList : `SELECT prod_code, prod_name, prod_price, prod_count, prod_loc, prod_cate,prod_date FROM product`,

    // 사용자 상품 상세
    userProductInfo : `SELECT prod_name, prod_price, prod_code , prod_loc, prod_cate, prod_state
                        FROM product WHERE prod_code = ? `,
}