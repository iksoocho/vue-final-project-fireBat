<template>

<div class="popular_places_area">
 <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="section_title text-center mb_70">
                            <h3><img width="280" height="53" src="../image/logo/이런상품어때요.png" >
                        </h3>
                        <p>Suffered alteration in some form, by injected humour or good day randomised booth anim 8-bit hella wolf moon beard words.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                 <div v-for="(pro, i) in prodRandomList" :key="i" class="col-lg-4 col-md-6" @click="goProdInfo(pro.prod_code)">
                    <div class="single_place">
                            <div class="thumb">
                            <img :src="getProdImgUrl(pro.prod_code)" alt="" width="356px" height="350px" >
                            <a href="#" class="prise">₩{{pro.prod_price}}</a>
                    </div>
                         <div class="place_info">
                            <a href="destination_details.html"><h3>{{pro.prod_name}}</h3></a>
                            
                            <div class="rating_days d-flex justify-content-between">
                                
                                <div class="days">
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="more_place_btn text-center">
                    <a class="boxed-btn4" href="/userProductList">More Product</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data(){
        return{
            prodRandomList: [],
            prodImgs: {}
        }
    },
    created(){
            this.getProdRandomList();
    },
    methods : {
        async getProdRandomList(){
            this.prodRandomList = (await axios.get(`/api/product/random`)
                                .catch(err => console.log(err))).data;

            console.log(this.prodRandomList);
            
        },
        async getProdRandomList() {
        try {
          const productList = (await axios.get(`/api/product/random`)).data;
          this.prodRandomList = productList;
  
          // 각 제품에 대한 이미지 데이터 가져오기
          for (const prod of productList) {
            const response = await axios.get(`/api/product/selectImg/${prod.prod_code}`);
            const prodImages = response.data;
  
            // Vue.set 대신, JavaScript의 동적 속성 추가 방식으로 데이터 업데이트
            this.prodImgs[prod.prod_code] = prodImages;
          }
        } catch (error) {
          console.error(error);
        }
      },
      getProdImgUrl(prod_code) {
        const prodImages = this.prodImgs[prod_code];
        
        if (prodImages) {
          return `http://localhost:3000/product/public/uploads/${prodImages.prod_filename}`;
        }
        return ''; // 이미지가 없을 때 빈 문자열 반환
      },
      goProdInfo(prod_code){
        this.$router.push({ path: "/userProductInfo", query: { prod_code } });
      }
    }
}
</script>
