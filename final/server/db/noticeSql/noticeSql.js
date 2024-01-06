module.exports = {
  noticeList : `select * from notice`,
  noticeInfo : `select * from notice where notice_no = ?`,
  noticeInsert : `insert into notice set ?`,
  noticeUpdate : `update notice set ? where notice_no = ?`,
  noticeDelete : `delete from notice where notice_no = ?`,

  noticeImgInsert: `insert into notice_files set notice_no = ?, notice_filename = ?`,

  noticeImgDelete : `delete from notice_files where notice_no = ?`,

  noticeImgSelect : `select * from notice_files where notice_no = ?`,

}