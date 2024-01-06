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
        <td>
          <select id="select" name="category" v-model="qnaInfo.qna_category">
            <option value="1">배송 문의</option>
            <option value="2">축제 문의</option>
            <option value="3">기타 문의</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="title"><p>제목</p></td>
        <td>
          <input
            v-model="qnaInfo.qna_title"
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
            v-model="qnaInfo.qna_content"
          ></textarea>
        </td>
      </tr>
    </table>
    <div style="text-align: center">
      <button
        type="button"
        class="btn btn-outline-danger me-2 mt-2"
        @click="saveInfo(qnaInfo.qna_no)"
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
      qnaInfo: {},
      searchNo: "",
      bno: "",
      images: [],
    };
  },
  created() {
    this.searchNo = this.$route.query.qna_no;
    this.getQnaInfo();
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
    async updateInfo() {
      // if(!this.validation()) return;

      let data = {
        param: {
          qna_category: this.qnaInfo.qna_category,
          qna_title: this.qnaInfo.qna_title,
          qna_content: this.qnaInfo.qna_content,
        }, //"param" : 형태로 보내야됨
      };
      let result = await axios(`/api/qna/${this.qnaInfo.qna_no}`, {
        //경로 잘 확인!!!!
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      }).catch((err) => console.log(err));

      if (result.data.changedRows == 0) {
        alert(`수정 되지 않았습니다. `);
      } else {
        alert(`정상적으로 수정 되었습니다.`);
        this.$router.push({ name: "qnaList" });
      }
    },

    handleFileChange(event) {
      this.images = Array.from(event.target.files);
    },
    getInfo(qna_no) {
      let method = "";
      let url = "";
      let data = null;

      method = "put";
      url = `/api/qna/${qna_no}`;
      data = {
        param: {
          qna_category: this.qnaInfo.qna_category,
          qna_title: this.qnaInfo.qna_title,
          qna_content: this.qnaInfo.qna_content,
        },
      };
      this.$router.push({ path: "/qnaList" });

      return {
        method,
        data,
        url,
      };
    },
    async saveInfo(qna_no) {
      let formData = new FormData();
      this.images.forEach((file) => {
        formData.append(`files`, file);
      });
      try {
        let info = this.getInfo(qna_no);
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
        formData.append("bno", qna_no);
      } catch (err) {
        console.error(err);
      } finally {
        let res = await axios.post(`/api/qna/qnaPhoto`, formData);
        let uploadedImages = res.data.filenames;
        console.log(uploadedImages);

        this.images = uploadedImages;
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
</style>
