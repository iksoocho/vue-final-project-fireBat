<template>
  <div>
    <section class="notice">
      <div class="page-title">
        <div class="container">
          <h3>상품문의</h3>
        </div>
      </div>

      <!-- board seach area -->
      <!-- <div id="board-search">
        <div class="container">
            <div class="search-window">
                <form action="">
                    <div class="search-wrap">
                        <label for="search" class="blind">공지사항 내용 검색</label>
                        <input id="search" type="search" name="" placeholder="검색어를 입력해주세요." value="">
                        <button type="submit" class="btn btn-dark">검색</button>
                    </div>
                </form>
            </div>
        </div>
    </div> -->

      <!-- board list area -->
      <div id="board-list">
        <div class="container">
          <table class="board-table">
            <thead>
              <tr>
                <th scope="col" class="th-num">번호</th>
                
                <th scope="col" class="th-title">제목</th>
                <th scope="col" class="th-title">작성자</th>
                <th scope="col" class="th-date">등록일</th>
                
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(qna) in qnaProductList.slice(
                  pageStartIdx,
                  pageStartIdx + ITEM_PER_PAGE
                )"
                :key="qna.qna_no"
              >
                <td>{{ qna.qna_no }}</td>
                <th>
                  
                    <!-- 클릭하면 toggleDetail 함수를 호출하여 상세 내용 펼치기/접기 -->
                    <a href="#!" @click="toggleDetail(qna, qna.qna_no)">{{ qna.qna_title }}</a>
                    <!-- 상세 내용 -->
                    <div v-if="qna.showDetailIndex === qna.qna_no">
                      <!-- 여기에 상세 내용을 표시하거나 컴포넌트를 추가하세요 -->
                      
                      <table id="writetable">
      
                        <tr>
                          <td class="title"><p>첨부</p></td>
                          <td>
                            <span v-for="(img, idx) in qnaImgs" :key="idx" colspan="2">
                              <img
                                :src="`/api/qna/public/uploads/${img.qna_filename}`"
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
                              v-model="qna.qna_content"
                              readonly
                            ></textarea>
                          </td>
                        </tr>
                      </table>
                      
                      <div
                        style="text-align: center"
                        v-if="isLoggedIn && qna.user_id == userId"
                      >
                        <button
                          type="button"
                          class="btn btn-outline-danger me-2 mt-2"
                          @click="goUpdate(qna.qna_no)"
                        >
                          수정
                        </button>
                        <button
                          type="reset"
                          class="btn btn-danger-outline mt-2"
                          @click="deleteInfo(qna.qna_no)"
                        >
                          삭제
                        </button>
                      </div>
                      <div v-else></div>
                      <div>
                        <br>
      <h4 class="col text-center">답변</h4>

      <div v-for="(answer, index) in qnaAnswer" :key="index">
        <table id="writetable">
          <tr>
            <td class="title"><p>답변 일자</p></td>
            <td>
              <span>{{ getDateFormat(answer.qna_answer_date) }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" id="textarea">
              <textarea
                id="textarea2"
                cols="130"
                rows="5"
                name="content"
                v-model="answer.qna_answer_content"
                readonly
              ></textarea>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div style="text-align: center" v-if="qnaAnswer.length == 0 && isLoggedIn && userId == 'admin'">
      <textarea
            id="textarea2"
            cols="130"
            rows="15"
            name="content"
        v-model="qnaAnswerInfo.qna_answer_content"
        placeholder="답변 작성"
      ></textarea>
      <button @click="answerInsert(qna.qna_no)">답변 추가</button>
    </div>
    <div v-else></div>

    <div style="text-align: center" v-if="isLoggedIn && userId == 'admin' && qnaAnswer.length > 0">
      <button
        type="reset"
        class="btn btn-danger-outline mt-2"
        @click="deleteAnswer(qna.qna_no)"
      >
        삭제
      </button>
    </div>
    <div v-else></div>
                    </div>

                    
                  
                </th>
                <td>{{ qna.user_id }}</td>
                <td>{{ getDateFormat(qna.qna_date) }}</td>
                
              </tr>
            </tbody>
          </table>

          <button
            type="button"
            class="btn btn-outline-danger float-right mt-3"
            @click="goQnaProductInsert(this.searchProd)"
          >
            글쓰기
          </button>
          
        </div>
      </div>


      
    
  
    </section>

    <Paginate
      class="justify-content-center"
      :list="qnaProductList"
      v-bind="{ ITEM_PER_PAGE, PAGE_PER_SECTION, curPage }"
      @change-page="onChangePage"
    />
  </div>
  
</template>

<script>
import axios from "axios";
import Paginate from "./Pagination.vue";
import Swal from "sweetalert2";

export default {
  props: {
    searchProd:Number
  },
  components: {
    Paginate,
  },
  data() {
    return {
      qnaProductList: [],
      qnaImgs: [],
      qnaAnswer: [],
      qnaAnswerInfo: {
        qna_answer_content: "",
        qna_no: 0,
      },
      qnaNo:0,
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
    };
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
    isLoggedIn() {
      return sessionStorage.getItem("user") !== null;
    },
    userId() {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      console.log("userData:", userData); // 확인용 로그 추가
      return userData ? userData : null;
    },
  },
  created(){
    this.getQnaProductList();
    this.getAnswer();
  },
  methods: {
  getDateFormat(date) {
      return this.$dateFormat(date); // 날짜 변환
    },
    onChangePage(data) {
      this.curPage = data;
    },
    async getQnaProductList(){
      this.qnaProductList = (
        await axios.get(`/api/qna/qnaProduct/${this.searchProd}`).catch((err) => console.log(err))
      ).data;
    },
    async toggleDetail(review, idx) {

      this.qnaProductList.forEach((item) => {
          if (item.showDetailIndex !== null && item.showDetailIndex !== idx) {
            item.showDetailIndex = null;
          }
        });
        // 클릭한 항목의 상세 내용 펼치기/접기
        if (review.showDetailIndex === idx) {
          review.showDetailIndex = null;
          
        } else {
          this.qnaNo = idx
          console.log(' this.qnaNo2 : ',this.qnaNo)
          await this.getQnaImg(this.qnaNo)
          await this.getAnswer(this.qnaNo)
          review.showDetailIndex = idx;
          
        }
      },
      goQnaProductInsert(prod_code) {
      this.$router.push({ path: "/qnaProductInsert", query: { prod_code: prod_code } });
    },
    async getQnaImg(qnaNo) {
      console.log(this.searchNo);

      let result = await axios
        .get(`/api/qna/selectAllImg/${qnaNo}`)
        .catch((err) => console.log(err));

      this.qnaImgs = result.data;
    },
    async goUpdate(qna_no) {
      let response = await axios
        .delete(`/api/qna/deleteImg/${qna_no}`)
        .catch((err) => console.log(err));

      this.$router.push({ path: "/qnaUpdate", query: { qna_no: qna_no } });
    },
    async deleteInfo(qna_no) {
      let result2 = await axios
        .delete(`/api/qna/answer/${qna_no}`)
        .catch((err) => console.log(err));
      let count3 = result2.data.affectedRows;

      let response = await axios
        .delete(`/api/qna/deleteImg/${qna_no}`)
        .catch((err) => console.log(err));
      let count2 = response.data.affectedRows;

      let result = await axios
        .delete(`/api/qna/${qna_no}`)
        .catch((err) => console.log(err));

      let count = result.data.affectedRows;
      if (count + count2 + count3 == 0) {
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
        this.$router.go();
      }
    },
    async getAnswer(qna_no) {
      
      let result = await axios
        .get(`/api/qna/answer/${qna_no}`)
        .catch((err) => console.log(err));

      this.qnaAnswer = result.data;
    },
    async answerInsert(qnaNo) {
      let data = {
        param: {
          qna_answer_content: this.qnaAnswerInfo.qna_answer_content,
          qna_no: qnaNo,
        },
      };

      console.log("data : ", data);
      let result = await axios
        .post("/api/qna/answer", data)
        .catch((err) => console.log(err));

      if (result.data.message == "") {
        
        Swal.fire({
          icon: "warning",
          title: "정상적으로 등록 되었습니다.",
          confirmButtonText: "확인",
        });
        this.$router.go();
      } else {
        
        Swal.fire({
          icon: "warning",
          title: "등록 실패.",
          confirmButtonText: "확인",
        });
      }
    },
    async deleteAnswer(qna_no) {
      let result = await axios
        .delete(`/api/qna/answer/${qna_no}`)
        .catch((err) => console.log(err));

      console.log("data : ", result.data);
      let count = result.data.affectedRows;

      if (count == 0) {
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
        setTimeout(() => {
          this.$router.go();
        }, 2000);
      }
    },
    }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
section.notice {
  padding: 80px 0;
}

.page-title {
  margin-bottom: 60px;
}
.page-title h3 {
  font-size: 28px;
  color: #333333;
  font-weight: 400;
  text-align: center;
}

#board-search .search-window {
  padding: 15px 0;
  background-color: #f9f7f9;
}
#board-search .search-window .search-wrap {
  position: relative;
  /*   padding-right: 124px; */
  margin: 0 auto;
  width: 80%;
  max-width: 564px;
}
#board-search .search-window .search-wrap input {
  height: 40px;
  width: 100%;
  font-size: 14px;
  padding: 7px 14px;
  border: 1px solid #ccc;
}
#board-search .search-window .search-wrap input:focus {
  border-color: #333;
  outline: 0;
  border-width: 1px;
}
#board-search .search-window .search-wrap .btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 108px;
  padding: 0;
  font-size: 16px;
}

.board-table {
  font-size: 13px;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.board-table a {
  color: #333;
  display: inline-block;
  line-height: 1.4;
  word-break: break-all;
  vertical-align: middle;
}
.board-table a:hover {
  text-decoration: underline;
}
.board-table th {
  text-align: center;
}

.board-table .th-num {
  width: 100px;
  text-align: center;
}

.board-table .th-date {
  width: 200px;
}

.board-table th,
.board-table td {
  padding: 14px 0;
}

.board-table tbody td {
  border-top: 1px solid #e7e7e7;
  text-align: center;
}

.board-table tbody th {
  padding-left: 28px;
  padding-right: 14px;
  border-top: 1px solid #e7e7e7;
  text-align: left;
}

.board-table tbody th p {
  display: none;
}

.btn {
  display: inline-block;
  padding: 0 30px;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  text-transform: uppercase;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover,
.btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover,
.btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

/* reset */

* {
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.container {
  width: 1100px;
  margin: 0 auto;
}
.blind {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  margin: -1px;
  width: 1px;
  height: 1px;
}
</style>
