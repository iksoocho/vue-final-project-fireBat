module.exports = {
    boardList : `SELECT p.*, COUNT(c.BNO) AS comment_count
                    FROM T_BOARD_BOARD p
                    LEFT JOIN T_COMMENT_BOARD c ON p.NO = c.BNO
                    GROUP BY p.NO`,
   
    boardInsert : `insert into t_board_board set ?`,
    boardDelete : ` DELETE FROM t_board_board WHERE no = ? `,
    boardUpdate : `UPDATE t_board_board SET ? WHERE no = ?`,
    commentList : 'select * from T_COMMENT_BOARD where BNO = ?'

} 