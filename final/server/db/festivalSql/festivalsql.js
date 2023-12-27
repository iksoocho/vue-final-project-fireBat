module.exports = {
    
<<<<<<< HEAD
    // 전체리스트
    fesList : `select * from festival`,

    // 상세페이지 개별조회
    fesInfo : `select f_code, f_category, f_reg, f_name, f_number, f_loc
    FROM t_board_board
    WHERE f_code = ?`,
=======
    // 전체 리스트 조회
    fesList : `select * from festival`,

    // 단건 조회
    fesInfo : `select f_code from festival where f_name = ?`,
>>>>>>> c14076d5b5784099c8570f6c05c94484365c370b

    // 등록
    fesInsert : `insert into festival set ?`,

    // 수정
    fesUpdate : `update festival set ? where f_code = ?`,

    // 삭제
    fesDelete : `delete from festival where f_code = ?`,

    // 메인페이지 랜덤 6가지
    fesRandomList : `select * from festival order by rand() limit 6`
}