module.exports = {
    
    fesList : `select * from festival`
   ,

    // 등록
    fesInsert : `insert into festival set ?`,

    // 수정
    fesUpdate : `update festival set ? where f_code`,

    // 삭제
    fesDelete : `delete * from festival where f_code`
}