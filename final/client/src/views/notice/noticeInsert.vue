<template>
	
  <div id="show">
    <div class="page-title">
        <h3 class="text-center">QnA</h3>
    </div>
	
		<table id="writetable" >
			<tr><td class="title"><p>제목</p></td><td><input v-model="noticeInfo.notice_title" type="text" id="title" name="title" required 
				></td></tr>
			<tr><td class="title"><p>첨부</p></td><td><input type="file" id="avatar" name="file"></td></tr>
			<tr><td colspan="2" id="textarea"><textarea id="textarea2" cols="130" rows="15" name="content" v-model="noticeInfo.notice_content"></textarea></td></tr>
			
		</table>
		<div style="text-align: center;">
			<button type="button" class="btn btn-outline-danger me-2 mt-2" @click="insertNotice">작성</button>
			<button type="reset" class="btn btn-danger mt-2">취소</button>
		</div>
		
		
	</div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
	data(){
		return {
			noticeInfo:{
				notice_title:'',
				notice_content:'',
			
			},
			
		}
	},
	created(){
		
	},
	methods:{
		getToday(){
            let today = new Date();
            let year = today.getFullYear();
            let month = ('0'+(today.getMonth()+1)).slice(-2);
            let day = ('0'+(today.getDate())).slice(-2);
            
            return `${year}-${month}-${day}`
        },
		async insertNotice(){
			
            if(!this.validation()) return;       //아예 아래 전체를 감싸도 됨

            let data = {
                param : this.noticeInfo                    //"param" : 형태로 보내야됨
            };
            
            let result = await axios.post("/api/notice", data)
                               .catch(err => console.log(err));   

               
            if(result.data.message == ''){
                Swal.fire(`정상적으로 등록 되었습니다.`)
                this.$router.push({ path: '/noticeList' });
            }else{
                Swal.fire(`등록 실패.`)
                

            }

        },
		validation(){
            if(this.noticeInfo.notice_title == ''){
                Swal.fire(`제목이 입력되지 않았습니다.`)
                return false;
            }
            if(this.noticeInfo.notice_content== ''){
                Swal.fire(`내용이 입력되지 않았습니다.`)
                return false;
            }

            return true;
        },
		
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