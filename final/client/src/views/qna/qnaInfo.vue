<template>
  <div id="show">
    <div class="page-title">
        <h3 class="text-center">QnA</h3>
    </div>
	
		<table id="writetable" >
			
				<tr><td class="title"><p>작성자</p></td><td><span>{{ this.$store.getters.userName }}</span></td></tr>
				<tr><td class="title"><p>카테고리</p></td><td>{{ qnaCategory(qnaInfo.qna_category) }}</td></tr>
				<tr><td class="title"><p>제목</p></td><td>{{ qnaInfo.qna_title }}</td></tr>
				<tr><td class="title"><p>첨부</p></td><td><input type="file" id="avatar" name="file"></td></tr>
				<tr><td colspan="2" id="textarea"><textarea id="textarea2" cols="130" rows="15" name="content" v-model="qnaInfo.qna_content" readonly></textarea></td></tr>
				
		</table>
		<div style="text-align: center;">
					<button type="button" class="btn btn-outline-danger me-2 mt-2" @click="insertInfo">작성</button>
					<button type="reset" class="btn btn-danger mt-2">취소</button>
				</div>
		
		
	</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {       
        return {
            searchNo : '',
            qnaInfo: {
  
            },
        }
    },
    created() {
    this.searchNo = this.$route.query.qna_no;   
    this.getQnaInfo();
   },
   methods:{
    async getQnaInfo(){
        let result = await axios.get(`/api/qna/${this.searchNo}`).catch(err=>console.log(err))
        this.qnaInfo = result.data
    },
    qnaCategory(data){
            if(data == 1){
                return  '배송문의'
            }else if(data == 2){
                return  '축제문의'
            }else if(data == 3){
                return  '기타문의'
            }

        }
   }
}
</script>

<style scoped>
*{
		font-family: 'Gowun Dodum'; 
	}
	#show{
		
		height: 850px;
		margin-bottom: 80px;
        width: 900px;
        margin: 0 auto;
		
	}
	#writetable{
	width: 900px;
	border: 1px;
	border: 1px solid;
	
	}
	.title{
	background-color: #dc3545;
	opacity: 0.89;
    
	
	}
	#textarea{
		margin-top: 10px;
        
	}
	p{
		text-align: center;
		margin: 15px;
		color: #ffffff;
		font-weight: bolder;
	}
	#select{
		margin:10px;
	}
	#title{
		margin:10px;
		width : 700px
	}
	#avatar{
		margin:10px;
	}
	span{
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
</style>