<template>
     <div class="container"> 
      <h3>상품등록</h3>
        <div class="row">
            <table class="table">
                <tr>
                    <th class="text-right table-primary">상품이름</th>
                    <td>
                         <input type="text" product.prod_name>
                    </td>
                   
                </tr>
                <tr>
                    <th class="text-right table-primary" style="width:150px;">상품내용</th>
                    <td>
                        <textarea type="content" product.prod_content></textarea>
                    </td>
                    
                </tr>
                <tr>
                    <th class="text-right table-primary">상품이미지</th>
                    <td>
                        <input type="file" @change="productImage">
                    </td>
                    
                </tr>
                <tr>
                    <th class="text-right table-primary">상품가격</th>
                    <td>
                        <input type="text" product.prod_price>
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">상품재고</th>
                    <td>
                        <input type="number" product.prod_count>
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">지역분류</th>
                    <td>
                        <input type="text" product.prod_loc>
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">상품분류</th>
                    <td>
                        <input type="text" product.prod_cate>
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">상품상태</th>
                    <td>
                        <input type="text" product.prod_state>
                    </td>
                    
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-success" @click="insertInfo">등록</button>
        </div>
    </div>
</template>



<script>
import axios from 'axios';

export default {
      data(){
      return{
        product : {
          prod_name : "",
          prod_content : "",
          prod_price : 0,
          prod_count : 0,
          prod_loc : "",
          prod_cate : "",
          prod_state : 0
        },

        productImage : {
          prod_code : 0,
          prod_filename : "",
          prod_db_name : "",
          prod_sequence : "",
        }
      }
    },
    created(){
    
    },
    methods : {
      async insertInto(){

        let data = {
          "param" : this.product
        };
        let result = await axios.post('/api/product', data)
                                .catch(err => console.log(err))
        
        console.log(result.data);
        if(result.data.insertId > 0){
            alert(`등록되지 않았습니다.\n메세지를 확인하세요.\n${result.data.message}`)
        } else {
            alter(`정상적으로 등록되었습니다.\nNo.${result.data.insertId}`)
        }
      }
    }
}
</script>

<style>

</style>