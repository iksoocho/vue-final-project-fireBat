module.exports = {
    


    // 상세페이지 개별조회
    fesInfo : `select f_code, f_category, f_reg, f_name, f_number, f_loc
    FROM festival
    WHERE f_code = ?`,

    // 전체 리스트 조회
    fesList : `select * from festival`,

    // 단건 조회
    fesInfo : `select f_code from festival where f_name = ?`,


    // 등록
    fesInsert : `insert into festival set ?`,

    // 수정
    fesUpdate : `update festival set ? where f_code = ?`,

    // 삭제
    fesDelete : `delete from festival where f_code = ?`,

    // 메인페이지 랜덤 6가지
    fesRandomList : `select * from festival order by rand() limit 6`
}