module.exports = {
  noticeList : `select * from notice order by notice_no desc`,
  noticeInfo : `select * from notice where notice_no = ?`,
  noticeInsert : `insert into notice set ?`,
  noticeUpdate : `update notice set ? where notice_no = ?`,
  noticeDelete : `delete from notice where notice_no = ?`

}