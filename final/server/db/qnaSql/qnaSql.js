module.exports = {
    //qna 게시판에서 나오는 list (상품문의 제외)
    qnaList:`SELECT q.qna_no, q.qna_title, q.qna_date, q.qna_category, q.prod_code, u.user_id, (SELECT COUNT(*) FROM qna_answer WHERE qna_answer.qna_no  = q.qna_no) as answerCount
             FROM qna q
             JOIN user u ON q.user_no = u.user_no
             WHERE q.qna_category <> 0
             ORDER BY q.qna_no DESC`,

    qnaProductLsit : `SELECT q.qna_no, q.qna_title, q.qna_content,q.qna_date, q.qna_category, q.prod_code, u.user_id, (SELECT COUNT(*) FROM qna_answer WHERE qna_answer.qna_no  = q.qna_no) as answerCount
                        FROM qna q
                        JOIN user u ON q.user_no = u.user_no
                        WHERE q.prod_code = ?
                        ORDER BY q.qna_no DESC`,

    qnaInfo:`select q.qna_no, q.qna_title, q.qna_content, q.qna_category, q.prod_code, u.user_id
             FROM qna q
             JOIN user u ON q.user_no = u.user_no  where qna_no = ?`,

    qnaInsert:`insert into qna set ?`,

    qnaUpdate:`update qna set ? where qna_no = ?`,

    qnaDelete:`delete from qna where qna_no = ?`,

    userNoForInsert : `select user_no from user where user_id =?`,

    qnaSearch : `SELECT * FROM qna 
    WHERE qna_category <> 0 
    AND (qna_category LIKE concat(concat('%', ?), '%') OR qna_title LIKE concat(concat('%', ?), '%')) 
    ORDER BY qna_no DESC`,

    qnaCateSearch : `SELECT * FROM qna WHERE qna_category = ? order by qna_no desc`,

//----------------------------------------------------------------------------------------------------------------
    qnaImgInsert: `insert into qna_imgs set qna_no = ?, qna_filename = ?`,

    qnaImgDelete : `delete from qna_imgs where qna_no = ?`,

    qnaImgSelect : `select * from qna_imgs where qna_no = ?`,

    reviewImgInsert: `insert into review_imgs set review_no = ?, review_filename = ?`,

    reviewImgDelete : `delete from review_imgs where review_no = ?`,

    reviewImgSelect : `select * from review_imgs where review_no = ?`,

//----------------------------------------------------------------------------------------------------------------
    qnaAnswerList : `select * from qna_answer where qna_no = ?`,

    qnaAnswerInsert : `insert into qna_answer set ? `,

    qnaAnswerDelete : `delete from qna_answer where qna_no = ?`,

//----------------------------------------------------------------------------------------------------------------

    reviewList : `SELECT
                    r.review_no,
                    r.review_content,
                    r.review_date,
                    r.review_star,
                    r.order_no,
                    r.review_title,
                    r.prod_code,
                    u.user_id
                    
                FROM
                    review r
                INNER JOIN
                    product p ON r.prod_code = p.prod_code
                INNER JOIN
                    prod_order po ON r.order_no = po.order_no
                INNER JOIN
                    user u ON po.user_no = u.user_no

                WHERE
                    p.prod_code = ?`,

    reviewInsert:`insert into review set ?`,

    reviewDelete :`delete from review where review_no = ?`,

//----------------------------------------------------------------------------------------------------------------

    orderList : `   SELECT
                        po.order_no,
                        po.order_date,
                        po.MER_UID,
                        p.prod_code,
                        p.prod_name,
                        od.order_count,
                        p.prod_price * od.order_count AS total_price,
                        po.order_total_amount,
                        u.user_id
                    FROM
                        prod_order po
                    INNER JOIN
                        order_detail od ON po.MER_UID = od.mer_uid
                    INNER JOIN
                        product p ON od.prod_code = p.prod_code
                    INNER JOIN
                        user u ON po.user_no = u.user_no -- user 테이블 조인
                    WHERE
                        u.user_id = ? order by po.MER_UID desc`
                    
    
}