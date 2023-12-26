module.exports = {
    
    fesList : `SELECT p.*, COUNT(c.BNO) AS comment_count
    FROM T_BOARD_BOARD p
    LEFT JOIN T_COMMENT_BOARD c ON p.NO = c.BNO
    GROUP BY p.NO`,

    // 등록
    fesInsert : `insert into festival set ?`,

    // 수정
    fesUpdate : `update festival set ? where f_code`,

    // 삭제
    fesDelete : `delete * from festival where f_code`
}