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
    fesCalList : `select * from festival where ? between f_firstday and f_lastday`,

    // 축제목록 검색 조회
    fesSearch : `select * from festival where f_code LIKE CONCAT(CONCAT('%',?),'%')
                                            or f_category LIKE CONCAT(CONCAT('%',?),'%')
                                            or f_reg LIKE CONCAT(CONCAT('%',?),'%')
                                            or f_name LIKE CONCAT(CONCAT('%',?),'%')
                                            or f_number LIKE CONCAT(CONCAT('%',?),'%')
                                            or f_firstday LIKE CONCAT(CONCAT('%',?),'%')
                                            or f_lastday LIKE CONCAT(CONCAT('%',?),'%')
                                            or f_price LIKE CONCAT(CONCAT('%',?),'%')
                                            or f_url LIKE CONCAT(CONCAT('%',?),'%')`,

    fesImgInsert: `insert into f_imgs set f_code = ?, f_filename = ?`,

    fesImgDelete : `delete from f_imgs where f_code = ?`,

    fesImgSelect : `select * from f_imgs where f_code = ?`,

    fesCheckCode : `select count(*) as count from festival where f_code = ?`,

    fesInProduct : `select * from product where prod_loc = ? order by rand() limit 3`,

    fesCate : `  SELECT * FROM festival WHERE (f_firstday >= ? OR ? IS NULL)
                                            AND (f_lastday <= ? OR ? IS NULL)
                                            AND (f_reg = ? OR ? IS NULL)
                                            AND (f_category = ? OR ? IS NULL);`

}