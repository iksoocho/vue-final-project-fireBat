module.exports = {
    

    // 전체 리스트 조회
    fesList : `select * from festival`,

    // 단건 조회
    fesInfo : `select * from festival where f_code = ?`,

    // 등록
    fesInsert : `insert into festival set ?`,

    // 수정
    fesUpdate : `update festival set ? where f_code = ?`,

    // 삭제
    fesDelete : `delete from festival where f_code = ?`,
    
    // 메인페이지 랜덤 6가지
    fesRandomList : `select * from festival order by rand() limit 6`,

    // 달력 일별 조회
    fesCalList : `select * from festival where ? between f_firstday and f_lastday;`,


    fesSearch : `select * from festival where f_name like concat(concat('%',?),'%')`,

    // 축제목록 검색 조회
    fesSearch : `select * from festival where f_name like concat(concat('%',?),'%') `,

    fesImgInsert: `insert into f_imgs set f_code = ?, f_filename = ?`,

    fesImgDelete : `delete from f_imgs where f_code = ?`,

    fesImgSelect : `select * from f_imgs where f_code = ?`, 
}