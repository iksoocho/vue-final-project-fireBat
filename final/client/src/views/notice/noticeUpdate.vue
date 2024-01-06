<template>
  <div id="show">
    <div class="page-title">
      <h3 class="text-center">공지사항</h3>
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
        <td><input type="file" id="avatar" name="file" /></td>
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
        @click="updateInfo"
      >
        수정
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
      noticeInfo: {},
      searchNo: "",
    };
  },
  created() {
    this.searchNo = this.$route.query.notice_no;
    this.getNoticeInfo();
  },
  methods: {
    async getNoticeInfo() {
      let result = await axios
        .get(`/api/notice/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.noticeInfo = result.data;
    },

    async updateInfo() {
      // if(!this.validation()) return;

      let data = {
        param: {
          notice_title: this.noticeInfo.notice_title,
          notice_content: this.noticeInfo.notice_content,
        }, //"param" : 형태로 보내야됨
      };
      let result = await axios(`/api/notice/${this.noticeInfo.notice_no}`, {
        //경로 잘 확인!!!!
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      }).catch((err) => console.log(err));

      if (result.data.changedRows == 0) {
        Swal.fire(`수정 되지 않았습니다. `);
      } else {
        Swal.fire(`정상적으로 수정 되었습니다.`);
        this.$router.push({ name: "noticeList" });
      }
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
