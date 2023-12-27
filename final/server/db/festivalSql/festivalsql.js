module.exports = {
    
    // 전체리스트
    fesList : `select * from festival`,

    // 상세페이지 개별조회
    fesInfo : `select f_code, f_category, f_reg, f_name, f_number, f_loc
    FROM t_board_board
    WHERE f_code = ?`,

    // 등록
    fesInsert : `insert into festival set ?`,

    // 수정
    fesUpdate : `update festival set ? where f_code`,

    // 삭제
    fesDelete : `delete * from festival where f_code`
}