<template>
  <template>
    <div>
      <section class="notice">
        <div class="page-title">
          <div class="container">
            <h3>review</h3>
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
</template>

<script>
import axios from "axios";
import Paginate from "./Pagination.vue";

export default {
  props: {},
  components: {
    Paginate,
  },
  data() {
    return {
      reviewList: [],
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
  methods: {
    getDateFormat(date) {
      return this.$dateFormat(date); // 날짜 변환
    },
    onChangePage(data) {
      this.curPage = data;
    },
  },
};
</script>

<style></style>
