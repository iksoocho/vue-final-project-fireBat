module.exports = {
    //qna 게시판에서 나오는 list (상품문의 제외)
    qnaList:`SELECT q.qna_no, q.qna_title, q.qna_date, q.qna_category, u.user_id, (SELECT COUNT(*) FROM qna_answer WHERE qna_answer.qna_no  = q.qna_no) as answerCount
             FROM qna q
             JOIN user u ON q.user_no = u.user_no
             WHERE q.qna_category <> 0
             ORDER BY q.qna_no DESC`,
    qnaInfo:`select q.qna_no, q.qna_title, q.qna_content, q.qna_category, u.user_id
             FROM qna q
             JOIN user u ON q.user_no = u.user_no  where qna_no = ?`,
    qnaInsert:`insert into qna set ?`,
    qnaUpdate:`update qna set ? where qna_no = ?`,
    qnaDelete:`delete from qna where qna_no = ?`,
    userNoForInsert : `select user_no from user where user_id =?`,

    qnaImgInsert: `insert into qna_imgs set qna_no = ?, qna_filename = ?`,

    qnaImgDelete : `delete from qna_imgs where qna_no = ?`,

    qnaImgSelect : `select * from qna_imgs where qna_no = ?`,


    qnaAnswerList : `select * from qna_answer where qna_no = ?`,

    qnaAnswerInsert : `insert into qna_answer set ? `,

    qnaAnswerDelete : `delete from qna_answer where qna_no = ?`


 
}