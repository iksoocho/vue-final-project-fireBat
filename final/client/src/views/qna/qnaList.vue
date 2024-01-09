<template>
  <div>
    <section class="notice">
      <div class="page-title">
        <div class="container">
          <h3>QnA</h3>
        </div>
      </div>

      <!-- board seach area -->
      <div id="board-search">
        <div class="container">
            <div class="search-window">
                
                    <div class="search-wrap">
                        <label for="search" class="blind">내용 검색</label>
                        <input id="search" type="search" name="" placeholder="검색어를 입력해주세요." v-model="searchTerm" @keyup.enter="goToSearch">
                        <button class="btn btn-dark" @click="goToSearch">검색</button>
                    </div>
                
            </div>
        </div>
    </div>

      <!-- board list area -->
      <div id="board-list">
        <div class="container">
          <table class="board-table">
            <thead>
              <tr>
                <th scope="col" class="th-num">번호</th>
                <th scope="col" class="th-num">문의 유형</th>
                <th scope="col" class="th-title">제목</th>
                <th scope="col" class="th-title">작성자</th>
                <th scope="col" class="th-date">등록일</th>
                <th scope="col" class="th-num">답변 상태</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(qna, idx) in qnaList.slice(
                  pageStartIdx,
                  pageStartIdx + ITEM_PER_PAGE
                )"
                :key="idx"
              >
                <td>{{ qna.qna_no }}</td>
                <td>{{ qnaCategory(qna.qna_category) }}</td>
                <th>
                  <a href="#!" @click="goQnaInfo(qna.qna_no)">{{
                    qna.qna_title
                  }}</a>
                </th>
                <td>{{ qna.user_id }}</td>
                <td>{{ getDateFormat(qna.qna_date) }}</td>
                <td>{{ answerState(qna.answerCount) }}</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            class="btn btn-outline-danger float-right mt-3"
            @click="goQnaInsert"
          >
            글쓰기
          </button>
        </div>
      </div>
    </section>

    <Paginate
      class="justify-content-center"
      :list="qnaList"
      v-bind="{ ITEM_PER_PAGE, PAGE_PER_SECTION, curPage }"
      @change-page="onChangePage"
    />
  </div>
</template>

<script>
import axios from "axios";
import Paginate from "../../components/Pagination.vue";

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      qnaList: [],
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
      selectedOption: '',
      searchTerm:""
    };
  },
  created() {
    this.getQnaList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
  },
  methods: {
    async getQnaList() {
      this.qnaList = (
        await axios.get("/api/qna").catch((err) => console.log(err))
      ).data;
    },
    getDateFormat(date) {
      return this.$dateFormat(date); // 날짜 변환
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
    answerState(data) {
      if (data == 0) {
        return "답변 대기";
      } else {
        return "답변 완료";
      }
    },
    onChangePage(data) {
      this.curPage = data;
    },
    goQnaInsert() {
      this.$router.push("/qnaInsert");
    },
    goQnaInfo(qna_no) {
      this.$router.push({ path: "/qnaInfo", query: { qna_no: qna_no } });
    },
    async goToSearch() {
      if (this.searchTerm.trim() === "") {
        this.getQnaList();
      } else {
        this.qnaList = (
          await axios.get(`/api/qna/search/${this.searchTerm.trim()}`)
        ).data;
      }
    },
  },
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
