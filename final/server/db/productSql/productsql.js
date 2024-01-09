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
    userProductList: `SELECT * FROM product`,

    // 사용자 상품 상세
    userProductInfo: `SELECT prod_name, prod_price, prod_code , prod_loc, prod_cate, prod_state, prod_content, prod_count
                            FROM product WHERE prod_code = ? `,

    // 메인페이지 랜덤 6가지
    productRandomList: `SELECT * FROM product ORDER BY rand() limit 6`,

    // 관리자 상품검색 기능
    productSearch: `SELECT *
                    FROM product
                    WHERE
                    prod_name LIKE CONCAT(CONCAT('%',?),'%')
                    OR prod_loc LIKE CONCAT(CONCAT('%',?),'%')
                    OR prod_code LIKE CONCAT(CONCAT('%',?),'%')
                    OR prod_cate LIKE CONCAT(CONCAT('%',?),'%') `,
    
    // 회원 검색
    userSearch : `SELECT *
                FROM user
                WHERE
                user_name LIKE CONCAT(CONCAT('%',?),'%') `,
    
    
    // 배송정보 검색
    delSearch : `SELECT o.order_detail_no, u.user_name, d.delivery_req, CONCAT(u.user_addr, ' ', u.user_detail_addr) AS sumAddr, d.delivery_state
                 FROM order_detail o
                 JOIN user u ON o.order_detail_no = u.user_no
                 JOIN delivery d ON o.order_detail_no = d.order_no
                 WHERE o.order_detail_no LIKE CONCAT(CONCAT('%', ?), '%')
                 OR u.user_name LIKE CONCAT(CONCAT('%', ?), '%')
                 OR d.delivery_req LIKE CONCAT(CONCAT('%', ?), '%')
                 OR CONCAT(u.user_addr, ' ', u.user_detail_addr) LIKE CONCAT(CONCAT('%', ?), '%')
                    `,
    // 주문정보 검색
    delSearch2 : `SELECT o.order_detail_no, u.user_id, u.user_name, u.user_tel, p.prod_name, d.order_date, d.order_total_amount
                  FROM order_detail o
                  JOIN prod_order d ON o.order_detail_no = d.order_no
                  JOIN user u ON d.user_no = u.user_no
                  JOIN product p ON o.prod_code = p.prod_code
                  WHERE o.order_detail_no LIKE CONCAT(CONCAT('%', ?), '%')
                  OR u.user_id LIKE CONCAT(CONCAT('%', ?), '%')
                  OR u.user_name LIKE CONCAT(CONCAT('%', ?), '%')
                  OR u.user_tel LIKE CONCAT(CONCAT('%', ?), '%')
                  OR p.prod_name LIKE CONCAT(CONCAT('%', ?), '%')
                  OR d.order_date LIKE CONCAT(CONCAT('%', ?), '%')
                  OR d.order_total_amount LIKE CONCAT(CONCAT('%', ?), '%');`,

    // 사용자 상품검색 기능
    userProductSearch: `SELECT p.*, i.prod_filename
                        FROM product p
                        LEFT JOIN prod_imgs i ON p.prod_code = i.prod_img_no
                        WHERE p.prod_name LIKE CONCAT(CONCAT('%', ?), '%') `,

    // 관리자(사용자회원 리스트) 판매량 까지
    adminUserList: `SELECT user_id, user_pw, user_email, user_name, user_tel, user_addr, user_birth,
                    (SELECT COUNT(*) FROM order_detail WHERE order_detail.order_count = user.user_id) as sellcount from user order by sellcount `,

    // 관리자 재고 관리
    adminProdInven : `SELECT
                      p.prod_code,
                      p.prod_name,
                      p.prod_price,
                      p.prod_state,
                      p.prod_count AS current_stock,
                      p.prod_count - COALESCE(SUM(od.order_count), 0) AS sold_stock,
                      p.prod_count - COALESCE(SUM(od.order_count), 0) - (p.prod_count - COALESCE(SUM(od.order_count), 0)) AS available_stock
                      FROM
                      product p
                      LEFT JOIN
                      order_detail od ON p.prod_code = od.prod_code
                      GROUP BY
                      p.prod_code,
                      p.prod_name,
                      p.prod_count `,
    // 관리자 메인 리스트
    adminChartList : `SELECT * FROM product ORDER BY prod_price DESC LIMIT 6`,
    // 관리자 페이지 차트
    adminChart : `SELECT * FROM product ORDER BY prod_sell_count DESC LIMIT 6 `,
    //이미지 테스트
    ptinsert: `INSERT INTO prod_imgs SET ? `,
    ptlist: `SELECT * FROM prod_imgs`,
    ptinfo: `SELECT * FROM prod_imgs where prod_img_no = ?`,


    rsInsert : `insert into product set ?`,
    
    prodImgInsert: `insert into prod_imgs set prod_code = ?, prod_filename = ?`,

    prodImgDelete : `delete from prod_imgs where prod_code = ?`,

    prodImgSelect: `select * from prod_imgs where prod_code = ?`,
    
    // 품절 판매가능 상태 쿼리
    prodState: `update product set prod_state = ? where prod_code = ?`,
    
    // 배송중 배송완료 상태
    delState: `update delivery set delivery_state = ? where delivery_no = ?`,
    
    // 배송정보
    deliveryList : `SELECT d.delivery_no,o.order_detail_no, u.user_name, d.delivery_req, CONCAT(u.user_addr, ' ', u.user_detail_addr) AS sumAddr, d.delivery_state
                    FROM order_detail o
                    JOIN user u ON o.order_detail_no = u.user_no
                    JOIN delivery d ON o.order_detail_no = d.order_no ORDER BY o.order_detail_no DESC `,
    // 주문 정보
    orderInfoList : `SELECT o.order_detail_no, u.user_id, u.user_name, u.user_tel, p.prod_name, d.order_date, d.order_total_amount
                     FROM order_detail o
                     JOIN prod_order d ON o.order_detail_no = d.order_no
                     JOIN user u ON d.user_no = u.user_no
                     JOIN product p ON o.prod_code = p.prod_code ORDER BY o.order_detail_no `,
    
}