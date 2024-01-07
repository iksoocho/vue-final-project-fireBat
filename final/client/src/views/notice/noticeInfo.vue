<template>
  <div id="show">
    <div class="page-title">
      <h3 class="text-center">공지사항</h3>
    </div>

    <table id="writetable">
      <tr>
        <td class="title"><p>제목</p></td>
        <td>
          <span style="margin-left: 30px">{{ noticeInfo.notice_title }}</span>
        </td>
      </tr>

      <tr>
        <td colspan="2" id="textarea">
          <textarea
            id="textarea"
            cols="130"
            rows="15"
            name="content"
            v-model="noticeInfo.notice_content"
            readonly
          ></textarea>
        </td>
      </tr>
      <tr>
        <td class="title"><p>첨부</p></td>
        <td>
          <ul v-for="(img, idx) in noticeImgs" :key="idx">
            <li style="display: flex; align-items: center">
              <p style="margin-right: 20px; color: black; text-align: left">
                {{ img.notice_filename.slice(13) }}
              </p>

              <button @click="downloadImage(img.notice_filename)">
                파일 다운로드
              </button>
            </li>
          </ul>
        </td>
      </tr>
    </table>
    <div style="text-align: center" v-if="userId == 'admin'">
      <button
        type="button"
        class="btn btn-outline-danger me-2 mt-2"
        @click="goUpdate(noticeInfo.notice_no)"
      >
        수정
      </button>
      <button
        type="reset"
        class="btn btn-danger mt-2"
        @click="deleteInfo(noticeInfo.notice_no)"
      >
        삭제
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      searchNo: "",
      noticeInfo: {},
      noticeImgs: [],
    };
  },
  created() {
    this.searchNo = this.$route.query.notice_no;
    this.getNoticeInfo();
    this.getNoticeImg();
  },
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem("user") !== null;
    },
    userId() {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      console.log("userData:", userData); // 확인용 로그 추가
      return userData ? userData : null;
    },
  },
  methods: {
    async getNoticeInfo() {
      let result = await axios
        .get(`/api/notice/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.noticeInfo = result.data;
    },

    async goUpdate(notice_no) {
      let response = await axios
        .delete(`/api/notice/deleteImg/${notice_no}`)
        .catch((err) => console.log(err));

      this.$router.push({
        path: "/noticeUpdate",
        query: { notice_no: notice_no },
      });
    },
    async deleteInfo(notice_no) {
      let response = await axios
        .delete(`/api/notice/deleteImg/${notice_no}`)
        .catch((err) => console.log(err));
      let count2 = response.data.affectedRows;

      let result = await axios
        .delete(`/api/notice/${notice_no}`)
        .catch((err) => console.log(err));

      let count = result.data.affectedRows;
      if (count + count2 == 0) {
        Swal.fire({
          icon: "warning",
          title: "삭제실패!",
          confirmButtonText: "확인",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "삭제성공!!",
          confirmButtonText: "확인",
        });
        this.$router.push({ name: "noticeList" });
      }
    },
    async getNoticeImg() {
      console.log(this.searchNo);

      let result = await axios
        .get(`/api/notice/selectAllImg/${this.searchNo}`)
        .catch((err) => console.log(err));

      this.noticeImgs = result.data;
    },
    async downloadImage(img) {
      let imgname = img;
      let response = await axios.get(`/api/notice/download/${imgname}`, {
        responseType: "blob", // 서버에서 바이너리 데이터(Blob)로 응답받음
      });

      let url = window.URL.createObjectURL(new Blob([response.data]));

      // a 태그를 생성하여 다운로드 링크 생성
      let link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imgname); // 다운로드되는 파일의 이름
      document.body.appendChild(link);
      link.click();

      // 생성된 URL 및 a 태그를 해제
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Gowun Dodum";
}
#show {
  height: 850px;
  margin-bottom: 80px;
  width: 900px;
  margin: 0 auto;
}
#writetable {
  width: 900px;
  border: 1px;
  border: 1px solid;
}
.title {
  background-color: #dc3545;
  opacity: 0.89;
  width: 200px;
}
#textarea {
  /* margin-top: 10px;
  margin-bottom: 10px; */
}
p {
  text-align: center;
  margin: 15px;
  color: #ffffff;
  font-weight: bolder;
}
#select {
  margin: 10px;
}
#title {
  margin: 10px;
  width: 700px;
}
#avatar {
  margin: 10px;
}
span {
  margin-left: 10px;
}
.page-title {
  margin-bottom: 60px;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Adjust margin as needed */
}
tr {
  border: 1px solid;
}
</style>
