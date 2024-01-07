// 강현진 상품 CRUD
module.exports = {
    // 관리자 상품 리스트
    productList: `SELECT * FROM product`,
    // 관리자 상품 상세
    productInfo: `SELECT prod_code, prod_name, prod_price, prod_content, prod_count, prod_loc, prod_cate
                    FROM product
                    WHERE prod_code = ? `,

    // 등록
    productInsert: `INSERT INTO product SET ? `,

    //수정
    productUpdate: `UPDATE product SET ? WHERE prod_code = ? `,

    //삭제
    productDelete: `DELETE FROM product WHERE prod_code = ? `,

    // 사용자 상품 리스트 
    userProductList: `SELECT prod_code, prod_name, prod_price, prod_count, prod_loc, prod_cate,prod_date FROM product`,

    // 사용자 상품 상세
    userProductInfo: `SELECT prod_name, prod_price, prod_code , prod_loc, prod_cate, prod_state, prod_content, prod_count
                            FROM product WHERE prod_code = ? `,

    // 메인페이지 랜덤 6가지
    productRandomList: `SELECT * FROM product ORDER BY rand() limit 6`,

    // 상품검색 기능
    productSearch: `SELECT *
                    FROM product
                    WHERE
                    prod_name LIKE CONCAT(CONCAT('%',?),'%')
                    OR prod_loc LIKE CONCAT(CONCAT('%',?),'%')
                    OR prod_code LIKE CONCAT(CONCAT('%',?),'%')
                    OR prod_cate LIKE CONCAT(CONCAT('%',?),'%') `,

    // 관리자(사용자회원 리스트) 판매량 까지
    adminUserList: `SELECT user_id, user_pw, user_email, user_name, user_tel, user_addr, user_birth,
                    (SELECT COUNT(*) FROM order_detail WHERE order_detail.order_count = user.user_id) as sellcount from user order by sellcount `,

    // 관리자 재고 관리
    adminProdInven : `SELECT prod_code, prod_name, prod_price, prod_state,prod_count, prod_count - prod_sell_count AS count
                        FROM product
                        ORDER BY prod_code `,
    // 관리자 메인 리스트
    adminChartList : `SELECT * FROM product`,
    // 관리자 페이지 차트
    adminChart : `SELECT * FROM product ORDER BY prod_sell_count DESC LIMIT 6 `,
    //이미지 테스트
    ptinsert: `INSERT INTO prod_imgs SET ? `,
    ptlist: `SELECT * FROM prod_imgs`,
    ptinfo: `SELECT * FROM prod_imgs where prod_img_no = ?`,


    rsInsert : `insert into product set ?`,
    
    prodImgInsert: `insert into prod_imgs set prod_code = ?, prod_filename = ?`,

    prodImgDelete : `delete from prod_imgs where prod_code = ?`,

    prodImgSelect : `select * from prod_imgs where prod_code = ?`,
    
}