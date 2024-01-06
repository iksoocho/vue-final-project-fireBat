<template>
  <div id="show">
    <div class="page-title">
      <h3 class="text-center">QnA</h3>
    </div>

    <table id="writetable">
      <tr>
        <td class="title"><p>작성자</p></td>
        <td>
          <span>{{ this.$store.getters.userName }}</span>
        </td>
      </tr>
      <tr>
        <td class="title"><p>카테고리</p></td>
        <td>{{ qnaCategory(qnaInfo.qna_category) }}</td>
      </tr>
      <tr>
        <td class="title"><p>제목</p></td>
        <td>{{ qnaInfo.qna_title }}</td>
      </tr>
      <tr>
        <td class="title"><p>첨부</p></td>
        <td>
          <span v-for="(img, idx) in qnaImgs" :key="idx" colspan="2">
            <img
              :src="`http://localhost:3000/qna/public/uploads/${img.qna_filename}`"
              width="150px"
              height="150px"
            />
          </span>
        </td>
      </tr>

      <!-- <tr v-for="(img, idx) in qnaImgs" :key="idx">
        <td colspan="2">
          <pre>{{ img.qna_filename }}</pre>
        </td>
        <td colspan="2">
          <img
            :src="`http://localhost:3000/qna/public/uploads/${img.qna_filename}`"
            width="200px"
            height="200px"
          />
        </td>
      </tr> -->
      <tr>
        <td colspan="2" id="textarea">
          <textarea
            id="textarea2"
            cols="130"
            rows="15"
            name="content"
            v-model="qnaInfo.qna_content"
            readonly
          ></textarea>
        </td>
      </tr>
    </table>
    <div style="text-align: center">
      <button
        type="button"
        class="btn btn-outline-danger me-2 mt-2"
        @click="goUpdate(qnaInfo.qna_no)"
      >
        수정
      </button>
      <button
        type="reset"
        class="btn btn-danger mt-2"
        @click="deleteInfo(qnaInfo.qna_no)"
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
      qnaInfo: {},
      qnaImgs: [],
    };
  },
  created() {
    this.searchNo = this.$route.query.qna_no;
    this.getQnaInfo();
    this.getQnaImg();
  },
  methods: {
    async getQnaInfo() {
      let result = await axios
        .get(`/api/qna/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.qnaInfo = result.data;
    },
    qnaCategory(data) {
      if (data == 1) {
        return "배송문의";
      } else if (data == 2) {
        return "축제문의";
      } else if (data == 3) {
        return "기타문의";
      }
    },
    async goUpdate(qna_no) {
      let response = await axios
        .delete(`/api/qna/deleteImg/${qna_no}`)
        .catch((err) => console.log(err));

      this.$router.push({ path: "/qnaUpdate", query: { qna_no: qna_no } });
    },
    async deleteInfo(qna_no) {
      let response = await axios
        .delete(`/api/qna/deleteImg/${qna_no}`)
        .catch((err) => console.log(err));
      let count2 = response.data.affectedRows;

      let result = await axios
        .delete(`/api/qna/${qna_no}`)
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
        this.$router.push({ name: "qnaList" });
      }
    },
    async getQnaImg() {
      console.log(this.searchNo);

      let result = await axios
        .get(`/api/qna/selectAllImg/${this.searchNo}`)
        .catch((err) => console.log(err));

      this.qnaImgs = result.data;
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
