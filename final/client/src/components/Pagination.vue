<template>
  <div>
  <nav aria-label="...">
  <ul class="pagination justify-content-center">
    <li class="page-item" v-if="leftmostPage > PAGE_PER_SECTION">
      <a class="page-link" aria-label="Previous" @click="previousPage">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li class="page-item"  v-for="page in getPaginationArray(leftmostPage)" :key="page">
      <a class="page-link"  :class="{ active: page == curPage }" @click="onChangeCurPage(page)">{{ page }}</a>
    </li>
    
    <li class="page-item" v-if="leftmostPage + PAGE_PER_SECTION <= totalPage">
      <a class="page-link"  aria-label="Next" @click="nextPage">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
<p>{{ curPage }}</p>
</div>
</template>

<script>
export default {
  props: {
    list: Array,
    ITEM_PER_PAGE: Number,
    PAGE_PER_SECTION: Number,
    curPage: Number
  },
  data() {
    return {
      leftmostPage: 1,
      // curPage: 1,
    };
  },
  methods: {
    getPaginationArray(left) {
      const res = [];
      const totalPage = Math.ceil(this.list.length / (this.ITEM_PER_PAGE || 1));
      for (let i = left; i < Math.min(totalPage + 1, left + this.PAGE_PER_SECTION); i++) {
        res.push(i);
      }
      return res;
    },
    onChangeCurPage(page) {
      this.$emit('change-page', page);
    },
    previousPage() {
      this.leftmostPage -= this.PAGE_PER_SECTION;
      this.onChangeCurPage(this.leftmostPage);
    },
    nextPage() {
      this.leftmostPage += this.PAGE_PER_SECTION;
      this.onChangeCurPage(this.leftmostPage);
    },
  },
  
  computed: {
    totalPage() {
      return Math.ceil(this.list.length / (this.ITEM_PER_PAGE || 1));
    },
  },
  
};
</script>

<style>
.page-item {
  padding: 5px;
  cursor: pointer;
}


</style> 