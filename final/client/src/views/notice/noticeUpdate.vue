<template>
   <div id="show">
    <div class="page-title">
        <h3 class="text-center">QnA</h3>
    </div>
	
		<table id="writetable" >
			
				<tr><td class="title"><p>작성자</p></td><td><span>{{ this.$store.getters.userName }}</span></td></tr>
				<tr><td class="title"><p>카테고리</p></td><td><select id="select" name="category" v-model="qnaInfo.qna_category">
							<option value="1">배송 문의</option>
							<option value="2">축제 문의</option>
							<option value="3">기타 문의</option>
						</select></td></tr>
				<tr><td class="title"><p>제목</p></td><td><input v-model="qnaInfo.qna_title" type="text" id="title" name="title" required 
					></td></tr>
				<tr><td class="title"><p>첨부</p></td><td><input type="file" id="avatar" name="file"></td></tr>
				<tr><td colspan="2" id="textarea"><textarea id="textarea2" cols="130" rows="15" name="content" v-model="qnaInfo.qna_content"></textarea></td></tr>
				
		</table>
		<div style="text-align: center;">
					<button type="button" class="btn btn-outline-danger me-2 mt-2" @click="updateInfo">수정</button>
					<button type="reset" class="btn btn-danger mt-2">취소</button>
				</div>
		
		
	</div>
</template>

<script>
import axios from 'axios'


export default {
  data(){
    return {
      qnaInfo:{},
      searchNo:''
    }
  },
  created(){
    this.searchNo = this.$route.query.qna_no;
    this.getQnaInfo();
  },
  methods:{
    async getQnaInfo(){
      let result = await axios.get(`/api/qna/${this.searchNo}`).catch(err => console.log(err))
      this.qnaInfo = result.data;
    },
    qnaCategory(data){
            if(data == 1){
                return  '배송문의'
            }else if(data == 2){
                return  '축제문의'
            }else if(data == 3){
                return  '기타문의'
            }
    },
    async updateInfo(){
            // if(!this.validation()) return;

            let data = {
                param : {
                    qna_category : this.qnaInfo.qna_category,
                    qna_title : this.qnaInfo.qna_title,
                    qna_content : this.qnaInfo.qna_content
                    }                    //"param" : 형태로 보내야됨
            };
            let result = await axios(`/api/qna/${this.qnaInfo.qna_no}`,  {              //경로 잘 확인!!!!
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : JSON.stringify(data)
            })
            .catch(err=>console.log(err))   

            

            if(result.data.changedRows == 0){
                alert(`수정 되지 않았습니다. `)
            }else{
                alert(`정상적으로 수정 되었습니다.`)
                this.$router.push({ name : 'qnaList'});

            }
        },

  }
}
</script>

<style scoped>

</style>