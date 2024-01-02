<template>
<div class="container">


 <div id="app">
    <input type="text" v-model="keyword" placeholder="검색어를 입력하세요">
    <button @click="search">검색</button>
    <ul>
      <li v-for="product in searchResults" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
  </div>



    <h3>상품목록</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>상품코드</th>
                <th>상품명</th>
                <th>가격</th>
                <th>상품재고</th>
                <th>지역분류</th>
                <th>상품분류</th>
                <th>등록날짜</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(prod, i) in productList" @click="moveProductInfo(prod.prod_code)">
            <td>{{ prod.prod_code }}</td>
            <td>{{ prod.prod_name }}</td>
            <td>{{ prod.prod_price }}</td>
            <td>{{ prod.prod_count}}</td>
            <td>{{ prod.prod_loc}}</td>
            <td>{{ prod.prod_cate}}</td>
            <td>{{ $dateFormat(prod.prod_date, 'yyyy-MM-dd')}}</td>
            <td type="radio"></td>
            <td>
              <button type="button" calss="btn btn-info me-1" @click="deleteProduct(prod.prod_code)">삭제</button>
            </td>
          </tr>
        </tbody>
    </table>


    <div>
       <ul class="pagination-frame">
    <li @click="changeCurrentPage(
      (currentPage - pageCount) > 1 ? currentPage - pageCount : 1
    )">
      <a class="page-text">
        〈〈
      </a>
    </li>
    <li 
      class="page-left-btn"
      @click="changeCurrentPage(
        (currentPage - 1) > 1 ? currentPage - 1 : 1
      )"
    >
      <a class="page-text">
        〈
      </a>
    </li>
    
    <li 
      v-for="n in paginationUnits"
      :key="n"
      :class="[n === currentPage ? 'selected-page' : '', 'page-btn']"
      @click="changeCurrentPage(n)"
    >
      <a class="page-text">
        {{ n }}
      </a>
    </li>
    
    <li 
      class="page-right-btn"
      @click="changeCurrentPage(
        (currentPage + 1) < maxPage ? currentPage + 1 : maxPage
      )"
    >
      <a class="page-text">
        〉
      </a>
    </li>
    <li @click="changeCurrentPage(
      (currentPage + pageCount) < maxPage ? currentPage + pageCount : maxPage
    )">
      <a class="page-text">
        〉〉
      </a>
    </li>
  </ul>
</div>




  </div>
</template>
<script>
import axios from 'axios';


export default {
  data(){
    return {
      productList: [],
      keyword: '',
      name: 'PaginationComponent',
      props: {
        countOfTotal: {
          type : Number,
          required: true,
        },
        listSize: {
          type : Number,
          default: 10,
        }
      },
      computed: {
        // currentPage: get(`productList/currentPage`),
       
        
        maxPage(){
          return Math.ceil(this.countOfTotal / this.listSize)
        },
        startPage(){
          return (Math.trunc((this.currentPage -1) / this.pageCount) * this.pageCount) + 1
        },
        endPage() {
          let end = this.startPage + this.pageCount - 1
          return end < this.maxPage ? end : this.maxPage
        },

        paginationUnits(){
          let units = []
          for(let num = this.startPage; num <= this.endPage; num++){
            units.push(num)
          }
          return units
        }
      },
      data(){
        return {
          pageCount : 10,
        }
      }
    };
  },
  created(){
    this.getProductList();
  },
  methods : {
    async getProductList(){
      this.productList = (await axios.get('/api/product')
                                      .catch(err => console.log(err))).data;
    }, 
    moveProductInfo(prod_code){
        this.$router.push({ path: '/productInfo', query : { prod_code : prod_code}})
    },

    async deleteProduct(prod_code){
      
      let result = await axios.delete(`/api/product/delete/${prod_code}`)
                              .catch(err => console.log(err));
      
      console.log(result.data);
      let count = result.data.affectedRows;

      if(count == 0){
            alert('정상적으로 삭제 되지 않았습니다.')
        } else{
            alert('정상적으로 삭제 되었습니다.')
            this.$router.push({name: 'productList' })            
        }
     },
      search(){ // 검색
        fetch(`/api/product/search?keyword=${this.keyword}`)
          .then(response => response.json())
          .then(data =>{
            this.searchResult = data;
          })
          .catch(err => console.log(`검색 요청중 에러`, err));
      },
      changeCurrentPage(page){  //페이징
        if(this.currentPage !== page){
          this.$router.push({path: 'productList', query: {currentPage : page}})
          this.$emit("changePage", page)
        }
      }
  }
}
</script>
<style>
  .review-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #363636;
        padding: 10px;
        color: white;
        margin: 10px;
    }

    .total-reviews {
        font-weight: bold;
    }

    .search-bar {
        display: flex;
    }

    .search-bar input {
        margin-right: 10px;
        border-radius: 8px;
    }


    .sellerReview {}

    .display-options {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    .reviews-per-page {
        margin-left: 10px;
    }

    .Name {
        width: 100px;
    }

    .pName {
        width: 200px;
    }

    .likecnt {
        width: 150px;
    }

    .Del {
        width: 200px;
    }
    .pagination-frame {
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 1vh 0vw 0vh 0vw;
    padding: 0px;
 
    /* 드래그 막기 */
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  /* 페이지 이동 버튼 */
  .pagination-frame > li {
    width: 1.55vw;
    height: 3vh;
    background-color: #fff;
    border: 1px solid rgb(211, 210, 211);
    text-align: center;
    padding: 3px 0vw;
    cursor: pointer;
  }
  .page-btn {
    margin: 0px 1px;
  }
  .page-left-btn {
    margin-right: 5px;
  }
  .page-right-btn {
    margin-left: 5px;
  }
 
  li:hover:not(.selected-page) {
    background-color: rgba(222, 222, 222, 0.3);
  }
  li.selected-page {
    background-color: rgb(222, 222, 222);
  }
 
  .page-text {
    text-decoration: none;
    cursor: pointer;
  }
  .page-text:hover {
    color: #000;
  }
  .container{
  padding : 30px;

}
</style>