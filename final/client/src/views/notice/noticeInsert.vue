<template>
  <div id="show">
    <div class="page-title">
      <h3 class="text-center">QnA</h3>
    </div>

    <table id="writetable">
      <tr>
        <td class="title"><p>제목</p></td>
        <td>
          <input
            v-model="noticeInfo.notice_title"
            type="text"
            id="title"
            name="title"
            required
          />
        </td>
      </tr>
      <tr>
        <td class="title"><p>첨부</p></td>
        <td>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            multiple
          />
        </td>
      </tr>
      <tr>
        <td colspan="2" id="textarea">
          <textarea
            id="textarea2"
            cols="130"
            rows="15"
            name="content"
            v-model="noticeInfo.notice_content"
          ></textarea>
        </td>
      </tr>
    </table>
    <div style="text-align: center">
      <button
        type="button"
        class="btn btn-outline-danger me-2 mt-2"
        @click="saveInfo"
      >
        작성
      </button>
      <button type="reset" class="btn btn-danger mt-2">취소</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      noticeInfo: {
        notice_title: "",
        notice_content: "",
      },
      bno: "",
      images: [],
    };
  },
  created() {},
  methods: {
    getToday() {
      let today = new Date();
      let year = today.getFullYear();
      let month = ("0" + (today.getMonth() + 1)).slice(-2);
      let day = ("0" + today.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },
    async insertNotice() {
      if (!this.validation()) return; //아예 아래 전체를 감싸도 됨

      let data = {
        param: this.noticeInfo, //"param" : 형태로 보내야됨
      };

      let result = await axios
        .post("/api/notice", data)
        .catch((err) => console.log(err));

      if (result.data.message == "") {
        Swal.fire(`정상적으로 등록 되었습니다.`);
        this.$router.push({ path: "/noticeList" });
      } else {
        Swal.fire(`등록 실패.`);
      }
    },
    validation() {
      if (this.noticeInfo.notice_title == "") {
        Swal.fire(`제목이 입력되지 않았습니다.`);
        return false;
      }
      if (this.noticeInfo.notice_content == "") {
        Swal.fire(`내용이 입력되지 않았습니다.`);
        return false;
      }

      return true;
    },
    validation() {
      if (this.noticeInfo.notice_title == "") {
        Swal.fire({
          icon: "warning",
          title: "제목이 입력되지 않았습니다.",
          confirmButtonText: "확인",
        });
        return false;
      }
      if (this.noticeInfo.notice_content == "") {
        Swal.fire({
          icon: "warning",
          title: "내용이 입력되지 않았습니다.",
          confirmButtonText: "확인",
        });
        return false;
      }

      return true;
    },
    async getUserNo() {
      this.userNo = (
        await axios
          .get(`/api/qna/userNo/${this.userId}`)
          .catch((err) => console.log(err))
      ).data.user_no;
      console.log("user_no :", this.userNo);
    },
    handleFileChange(event) {
      this.images = Array.from(event.target.files);
    },
    getInfo(comCode) {
      let method = "";
      let url = "";
      let data = null;

      method = "post";
      url = `/api/notice`;
      let info = this.noticeInfo;

      console.log(info);
      // info.from_date = this.comInfo.write_date;

      data = {
        param: this.noticeInfo,
      };
      this.$router.push({ path: "/noticeList" });

      return {
        method,
        data,
        url,
      };
    },
    async saveInfo() {
      if (!this.validation()) return;

      let formData = new FormData();
      this.images.forEach((file) => {
        formData.append(`files`, file);
      });
      try {
        let info = this.getInfo();
        let result = await axios(info);
        if (result.data.affectedRows > 0) {
          Swal.fire({
            icon: "success",
            title: "정상 처리",
            text: "정상적으로 처리되었습니다.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "처리 실패",
            text: "정상적으로 처리되지 않았습니다.",
          });
        }
        this.bno = result.data.insertId;
        formData.append("bno", this.bno);
      } catch (err) {
        console.error(err);
      } finally {
        let res = await axios.post(`/api/notice/noticePhoto`, formData);
        let uploadedImages = res.data.filenames;
        console.log(uploadedImages);

        this.images = uploadedImages;
      }
    },
  },
  computed: {
    userId() {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      console.log("userData:", userData); // 확인용 로그 추가
      return userData ? userData : null;
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
}
#textarea {
  margin-top: 10px;
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
