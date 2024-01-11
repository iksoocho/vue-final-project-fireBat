<template>
  <div id="show">
    <div class="page-title">
      <h3 class="text-center">QnA</h3>
    </div>

    <table id="writetable">
      <tr>
        <td class="title"><p>작성자</p></td>
        <td>
          <span>{{ userId }}</span>
        </td>
      </tr>
      <tr>
        <td class="title"><p>카테고리</p></td>
        <td>
          <select id="select" name="category" v-model="qnaInfo.qna_category">
            <option value="1" selected>배송 문의</option>
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
      qnaInfo: {
        qna_title: "",
        qna_content: "",
        user_no: 0,
        qna_category: 0,
        
      },
      userNo: "",
      bno: "",
      images: [],
    };
  },
  created() {
    this.getUserNo();

    console.log("user_no : ", this.userNo);
    // this.qnaInfo.user_no = this.userNo;
  },
  methods: {
    getToday() {
      let today = new Date();
      let year = today.getFullYear();
      let month = ("0" + (today.getMonth() + 1)).slice(-2);
      let day = ("0" + today.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },

    validation() {
      if (this.qnaInfo.qna_category == "") {
        
        Swal.fire({
          icon: "warning",
          title: "문의 유형이 되지 않았습니다.",
          confirmButtonText: "확인",
        });
        return false;
      }
      if (this.qnaInfo.qna_title == "") {
       
        Swal.fire({
          icon: "warning",
          title: "제목이 입력되지 않았습니다.",
          confirmButtonText: "확인",
        });
        return false;
      }
      if (this.qnaInfo.qna_content == "") {
        
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
      url = `/api/qna`;
      let info = this.qnaInfo;
      info.user_no = this.userNo;
      console.log(info);
      
      
     
      data = {
        param: this.qnaInfo,
      };
    

        this.$router.push({ path: "/qnaList" });
      

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
        let res = await axios.post(`/api/qna/qnaPhoto`, formData);
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
