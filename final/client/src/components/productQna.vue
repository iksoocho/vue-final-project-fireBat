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
                
                <th scope="col" class="th-date">등록일</th>
                
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(review) in qnaProductList.slice(
                  pageStartIdx,
                  pageStartIdx + ITEM_PER_PAGE
                )"
                :key="review.qna_no"
              >
                <td>{{ review.qna_no }}</td>
                <th>
                  <td>
                    <!-- 클릭하면 toggleDetail 함수를 호출하여 상세 내용 펼치기/접기 -->
                    <a href="#!" @click="toggleDetail(review, review.qna_no)">{{ review.qna_title }}</a>
                    <!-- 상세 내용 -->
                    <div v-if="review.showDetailIndex === review.qna_no">
                      <!-- 여기에 상세 내용을 표시하거나 컴포넌트를 추가하세요 -->
                      
                      <table id="writetable">
      
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
                              v-model="review.qna_content"
                              readonly
                            ></textarea>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </th>
                <td>{{ getDateFormat(review.qna_date) }}</td>
                
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
  },
  created(){
    this.getQnaProductList();
    
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
