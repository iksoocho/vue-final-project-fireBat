module.exports = {
    fesList : `SELECT p.*, COUNT(c.BNO) AS comment_count
    FROM T_BOARD_BOARD p
    LEFT JOIN T_COMMENT_BOARD c ON p.NO = c.BNO
    GROUP BY p.NO`,

    
}